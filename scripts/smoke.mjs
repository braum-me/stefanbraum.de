#!/usr/bin/env node
/**
 * Smoke-Tests gegen den gebauten Production-Server (dist/server/entry.mjs).
 * Keine Dependencies: Node 22 fetch + Regex-basiertes HTML-Parsing.
 *
 *   pnpm build && pnpm test:smoke
 *
 * Prüft: Kernrouten, Blog-Detailseiten, interne Links (Crawl), Anker der
 * Startseite inkl. Kapitelreihenfolge, Canonical/hreflang-Konsistenz,
 * Sprachumschalter, JSON-LD, Sitemap und 404-Verhalten.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { findConfidentialTerms } from "./confidential-terms.mjs";

const PORT = Number(process.env.SMOKE_PORT ?? 4399);
const HOST = "127.0.0.1";
const BASE = `http://${HOST}:${PORT}`;
const ENTRY = "dist/server/entry.mjs";
/** Prerenderte Seiten tragen die Build-Zeit-URL (astro.config `site`), SSR-Seiten die Laufzeit-URL. */
const ALLOWED_ORIGINS = new Set([BASE, "https://stefanbraum.de"]);

const EXPECTED_SECTIONS = [
  "kernschwerpunkte",
  "stationen",
  "portfolio",
  "skills",
  "schreiben",
  "kontakt",
];
const TRANSLATED = ["/", "/blog/", "/impressum/", "/datenschutz/"];
/** Begriffe, die in Phase 1 nirgends im ausgelieferten HTML stehen dürfen. */
const FORBIDDEN_TERMS = [/eissmann/i, /tacto/i];
const EXPECTED_CASES = 29;

const failures = [];
const fail = (msg) => failures.push(msg);
const check = (cond, msg) => {
  if (!cond) fail(msg);
};

/* ── Server ─────────────────────────────────────────────────── */
if (!existsSync(ENTRY)) {
  console.error(`✗ ${ENTRY} fehlt. Erst 'pnpm build' ausführen.`);
  process.exit(1);
}
const server = spawn(process.execPath, [ENTRY], {
  env: { ...process.env, HOST, PORT: String(PORT), PUBLIC_SITE_URL: BASE },
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));
const stop = () => server.kill("SIGTERM");
process.on("exit", stop);

async function waitForServer() {
  for (let i = 0; i < 100; i++) {
    try {
      const res = await fetch(`${BASE}/robots.txt`);
      if (res.ok) return;
    } catch {
      // noch nicht bereit
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`Server nicht erreichbar.\n${serverLog}`);
}

/* ── HTML-Helfer ────────────────────────────────────────────── */
const cache = new Map();
async function get(path) {
  if (cache.has(path)) return cache.get(path);
  const res = await fetch(new URL(path, BASE), { redirect: "manual" });
  const type = res.headers.get("content-type") ?? "";
  const body = /text|xml|json/.test(type) ? await res.text() : "";
  const result = { status: res.status, body, location: res.headers.get("location") };
  cache.set(path, result);
  return result;
}

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "g")) ?? [];
const decode = (s) => s.replaceAll("&amp;", "&");

function links(html) {
  return tags(html, "a")
    .map((t) => attr(t, "href"))
    .filter(Boolean)
    .map(decode);
}
function canonicals(html) {
  return tags(html, "link")
    .filter((t) => attr(t, "rel") === "canonical")
    .map((t) => attr(t, "href"));
}
function hreflangs(html) {
  return tags(html, "link")
    .filter((t) => attr(t, "rel") === "alternate" && attr(t, "hreflang"))
    .map((t) => ({ lang: attr(t, "hreflang"), href: attr(t, "href") }));
}
function ids(html) {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
}
function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]),
  );
}
const pathOf = (href) => new URL(href, BASE).pathname;
/** Absolute URL auf eine erlaubte Origin prüfen und auf den Pfad reduzieren. */
const sitePath = (href) => {
  if (!href) return undefined;
  const url = new URL(href, BASE);
  return ALLOWED_ORIGINS.has(url.origin) ? url.pathname : `INVALID-ORIGIN:${url.origin}`;
};
const isInternal = (href) =>
  href.startsWith("/") ? !href.startsWith("//") : href.startsWith(BASE);

/* ── Tests ──────────────────────────────────────────────────── */
async function main() {
  await waitForServer();

  // 1. Sitemap -> alle indexierbaren URLs
  const index = await get("/sitemap-index.xml");
  check(index.status === 200, "sitemap-index.xml nicht erreichbar");
  const sitemapFiles = [...index.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pathOf(m[1]));
  const sitemapPaths = [];
  for (const file of sitemapFiles) {
    const sm = await get(file);
    sitemapPaths.push(...[...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pathOf(m[1])));
  }
  const blogPosts = sitemapPaths.filter((p) => /^\/blog\/[^/]+\/$/.test(p));
  check(blogPosts.length > 0, "Keine Blogartikel in der Sitemap gefunden");
  check(!sitemapPaths.some((p) => p.includes("404")), "404-Seite steht in der Sitemap");
  check(!sitemapPaths.some((p) => /^\/en\/blog\/.+/.test(p)), "Sitemap enthält /en/blog/<slug>");

  // 2. Kernrouten
  const core = [
    ...TRANSLATED,
    ...TRANSLATED.map((p) => `/en${p}`),
    "/rss.xml",
    "/robots.txt",
    ...blogPosts,
  ];
  const pages = [...new Set([...core, ...sitemapPaths])];
  for (const p of pages) {
    const res = await get(p);
    check(res.status === 200, `${p} -> ${res.status} (erwartet 200)`);
  }

  // 3. 404-Verhalten
  const missing = [
    "/does-not-exist/",
    "/en/does-not-exist/",
    "/blog/does-not-exist/",
    `/en${blogPosts[0] ?? "/blog/x/"}`,
  ];
  for (const p of missing) {
    const res = await get(p);
    check(res.status === 404, `${p} -> ${res.status} (erwartet 404)`);
  }

  // 4. Pro HTML-Seite: Links, Canonical, hreflang, JSON-LD, verbotene Begriffe
  const htmlPages = pages.filter((p) => p.endsWith("/"));
  const linkTargets = new Set();
  for (const p of htmlPages) {
    const { body } = await get(p);

    for (const re of FORBIDDEN_TERMS) check(!re.test(body), `${p}: enthält ${re}`);
    const confidential = findConfidentialTerms(body);
    check(confidential.length === 0, `${p}: vertraulicher Anbietername (Hash ${confidential})`);
    check(!/\d\s*(Mio|Mrd)\.?\s*€|€\s*\d|\d\s*€/.test(body), `${p}: Geldbetrag im Inhalt`);
    check(!body.includes("entry-boot"), `${p}: Boot-Splash ist noch vorhanden`);

    for (const href of links(body)) {
      if (href.startsWith("#")) continue;
      if (!isInternal(href)) continue;
      const url = new URL(href, BASE);
      linkTargets.add(url.pathname);
      check(
        !/^\/en\/blog\/.+/.test(url.pathname),
        `${p}: Link auf nicht existierende ${url.pathname}`,
      );
    }

    const canon = canonicals(body);
    check(canon.length === 1, `${p}: ${canon.length} Canonicals (erwartet 1)`);
    check(sitePath(canon[0]) === p, `${p}: Canonical ${canon[0]} zeigt nicht auf ${p}`);

    const alt = hreflangs(body);
    const stripped = p.startsWith("/en/") ? p.slice(3) : p;
    if (TRANSLATED.includes(stripped)) {
      const map = Object.fromEntries(alt.map((a) => [a.lang, a.href]));
      check(sitePath(map.de) === stripped, `${p}: hreflang de falsch (${map.de})`);
      check(sitePath(map.en) === `/en${stripped}`, `${p}: hreflang en falsch (${map.en})`);
      check(sitePath(map["x-default"]) === stripped, `${p}: hreflang x-default falsch`);
      for (const a of alt) {
        const target = await get(pathOf(a.href));
        check(target.status === 200, `${p}: hreflang-Ziel ${a.href} -> ${target.status}`);
        // Reziprozität: Ziel verweist auf dieselben Alternates
        const back = hreflangs(target.body)
          .map((x) => `${x.lang}=${sitePath(x.href)}`)
          .sort();
        const here = alt.map((x) => `${x.lang}=${sitePath(x.href)}`).sort();
        check(back.join() === here.join(), `${p}: hreflang nicht reziprok mit ${a.href}`);
      }
    } else {
      check(alt.length === 0, `${p}: hreflang ohne echte Sprach-Entsprechung`);
    }

    try {
      const blocks = jsonLd(body);
      const person = blocks.find((b) => b["@type"] === "Person");
      check(Boolean(person?.jobTitle), `${p}: Person-JSON-LD ohne jobTitle`);
      check(person?.worksFor?.name === "ODW-Elektrik", `${p}: Person.worksFor != ODW-Elektrik`);
    } catch (e) {
      fail(`${p}: JSON-LD nicht parsebar (${e.message})`);
    }
  }

  // 5. Alle intern verlinkten Ziele erreichbar
  for (const target of linkTargets) {
    const res = await get(target);
    check(
      res.status === 200 || (res.status >= 300 && res.status < 400),
      `Interner Link ${target} -> ${res.status}`,
    );
  }

  // 6. Startseiten: Anker, Kapitelreihenfolge, Hero-Headline
  const headlines = { "/": "IT-Führung. Architektur.", "/en/": "IT Leadership. Architecture." };
  for (const home of ["/", "/en/"]) {
    const { body } = await get(home);
    const present = ids(body);
    for (const href of links(body)) {
      const hash = href.startsWith("#") ? href.slice(1) : href.match(/^\/(?:en\/)?#(.+)$/)?.[1];
      if (hash) check(present.has(hash), `${home}: Anker #${hash} ohne Ziel`);
    }
    const sectionOrder = [...body.matchAll(/<section[^>]*\sid="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((id) => EXPECTED_SECTIONS.includes(id));
    check(
      sectionOrder.join() === EXPECTED_SECTIONS.join(),
      `${home}: Sektionsreihenfolge ${sectionOrder.join()}`,
    );
    const navOrder = [...body.matchAll(/class="nav-link[^"]*"[^>]*data-target="([^"]+)"/g)].map(
      (m) => m[1],
    );
    check(navOrder.join() === EXPECTED_SECTIONS.join(), `${home}: Nav-Reihenfolge ${navOrder}`);
    const chapterNums = [...body.matchAll(/class="chapter-num"[^>]*>(\d+)</g)].map((m) => m[1]);
    check(chapterNums.join() === "01,02,03,04,05,06", `${home}: Kapitelnummern ${chapterNums}`);
    check(body.includes(headlines[home]), `${home}: Hero-Headline fehlt`);

    // Portfolio: Anzahl, Status-Labels, Mehrfachkategorien, Legacy-Aliase
    const rows = [...body.matchAll(/<details[^>]*class="pf-row"[^>]*>/g)].map((m) => m[0]);
    check(
      rows.length === EXPECTED_CASES,
      `${home}: ${rows.length} Cases (erwartet ${EXPECTED_CASES})`,
    );
    check(
      rows.some((r) => /data-cats="engineering transformation"/.test(r)),
      `${home}: Mehrfachkategorie (engineering transformation) fehlt`,
    );
    const statusLabels =
      home === "/"
        ? [
            "Im Betrieb",
            "Pilot",
            "Vorbereitung",
            "Abgeschlossen &amp; übergeben",
            "Vorevaluierung abgeschlossen",
          ]
        : [
            "In operation",
            "Pilot",
            "Preparation",
            "Completed &amp; handed over",
            "Pre-evaluation completed",
          ];
    for (const label of statusLabels)
      check(body.includes(label), `${home}: Status-Label "${label}" fehlt`);
    check(body.includes("data-case-aliases="), `${home}: Legacy-Alias-Daten fehlen`);
    check(!body.includes('id="case-tacto'), `${home}: entfernter Case gerendert`);
  }

  // OG-Endpoint rendert keinen frei wählbaren Text (Content-Spoofing)
  {
    const size = async (q) => {
      const res = await fetch(`${BASE}/api/og.png${q}`);
      return { status: res.status, bytes: (await res.arrayBuffer()).byteLength };
    };
    const plain = await size("");
    const spoof = await size("?title=Fake&subtitle=Injected%20text");
    check(plain.status === 200, `/api/og.png -> ${plain.status}`);
    check(plain.bytes === spoof.bytes, "/api/og.png übernimmt Text aus Query-Parametern");
  }

  // 7. Sprachumschalter auf Blogartikeln -> existierendes englisches Ziel
  for (const post of blogPosts) {
    const { body } = await get(post);
    const enChip = tags(body, "a").find(
      (t) => attr(t, "class")?.includes("nav-lang-chip") && attr(t, "hreflang") === "en",
    );
    check(attr(enChip ?? "", "href") === "/en/blog/", `${post}: EN-Umschalter != /en/blog/`);
  }
}

main()
  .catch((e) => fail(`Abbruch: ${e.stack ?? e}`))
  .finally(() => {
    stop();
    const checked = cache.size;
    if (failures.length > 0) {
      console.error(`✗ Smoke-Tests: ${failures.length} Fehler (${checked} URLs geprüft)`);
      for (const f of failures) console.error(`  - ${f}`);
      process.exit(1);
    }
    console.log(`✓ Smoke-Tests bestanden (${checked} URLs geprüft)`);
    process.exit(0);
  });
