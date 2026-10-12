#!/usr/bin/env node
/**
 * Browser-Regressionstests gegen den gebauten Production-Server (Playwright + axe-core).
 *
 *   pnpm build && pnpm test:e2e
 *
 * Deckt Fehler ab, die Unit-/Smoke-Tests nicht sehen: Layout (Overflow), dynamisch
 * erzeugte Elemente (Pagination), Fokus-Reihenfolge (unsichtbare Skill-Panels),
 * Deep-Links inkl. Legacy-IDs, Filter mit Zweitkategorien, Accessibility (axe),
 * Darstellung ohne JavaScript und mit reduzierter Bewegung.
 */
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const AXE_SOURCE = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const PORT = Number(process.env.E2E_PORT ?? 4398);
const BASE = `http://127.0.0.1:${PORT}`;
const ENTRY = "dist/server/entry.mjs";

const results = [];
const check = (name, ok, info = "") => results.push({ name, ok: Boolean(ok), info });

if (!existsSync(ENTRY)) {
  console.error(`✗ ${ENTRY} fehlt. Erst 'pnpm build' ausführen.`);
  process.exit(1);
}
const server = spawn(process.execPath, [ENTRY], {
  env: { ...process.env, HOST: "127.0.0.1", PORT: String(PORT), PUBLIC_SITE_URL: BASE },
  stdio: "ignore",
});
const stop = () => server.kill("SIGTERM");
process.on("exit", stop);

async function waitForServer() {
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(`${BASE}/robots.txt`)).ok) return;
    } catch {
      // noch nicht bereit
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("Server nicht erreichbar");
}

/** Frische Navigation (verhindert reine Hash-Wechsel ohne Reload). */
async function open(page, path) {
  await page.goto("about:blank");
  await page.goto(BASE + path);
  await page.waitForTimeout(1300);
}

async function main() {
  await waitForServer();
  const browser = await chromium.launch();
  const jsErrors = [];
  const newPage = async (opts = {}) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => jsErrors.push(e.message));
    return page;
  };

  // 1. Kein horizontales Scrollen auf Mobile/Tablet/Desktop, DE + EN
  for (const [width, height] of [
    [375, 812],
    [768, 1024],
    [1440, 900],
  ]) {
    const page = await newPage({ viewport: { width, height } });
    for (const path of ["/", "/en/"]) {
      await open(page, path);
      const { sw, iw } = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        iw: window.innerWidth,
      }));
      check(`kein Overflow ${width}px ${path}`, sw <= iw, `${sw}/${iw}`);
    }
    await page.context().close();
  }

  const page = await newPage();

  // 2. Pagination: dynamisch erzeugte Buttons sind gestylt (scoped CSS greift nicht)
  await open(page, "/");
  const sizes = await page.$$eval(".pf-page-num", (els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect();
      return Math.min(r.width, r.height);
    }),
  );
  check("Pagination-Buttons ≥ 24px", sizes.length > 0 && sizes.every((s) => s >= 24), `${sizes}`);
  const visibleRows = () =>
    page.$$eval(".pf-row", (rows) => rows.filter((r) => r.offsetParent !== null).length);
  check("Seite 1 zeigt 6 Cases", (await visibleRows()) === 6);

  // 3. Filter inkl. Zweitkategorie, aria-pressed
  await page.click('.pf-pill[data-pill="leadership"]');
  await page.waitForTimeout(300);
  check(
    "Filter Leadership enthält Zweitkategorie (Data/BI)",
    await page.$eval("#case-global-bi-platform", (d) => d.offsetParent !== null),
  );
  check(
    "Filter aria-pressed",
    (await page.$eval('.pf-pill[data-pill="leadership"]', (e) =>
      e.getAttribute("aria-pressed"),
    )) === "true",
  );

  // 4. Deep-Links inkl. Legacy-IDs (auch auf späteren Seiten)
  const deepLinks = [
    ["it-strategie-odw-gesamtlaufzeit", "it-strategie-odw-gesamtlaufzeit"],
    ["team-data-analytics", "global-bi-platform"],
    ["copilot-agents-rollout", "copilot-adoption-program"],
    ["managed-soc-legacy", "managed-soc-endpoint-security"],
    ["legacy-iam-rollout", "enterprise-iam-self-service"],
  ];
  for (const [hash, id] of deepLinks) {
    await open(page, `/#case-${hash}`);
    const st = await page.$eval(`#case-${id}`, (d) => ({
      open: d.open,
      top: Math.round(d.getBoundingClientRect().top),
    }));
    check(`Deep-Link #case-${hash}`, st.open && st.top >= 0 && st.top < 300, JSON.stringify(st));
  }

  // 5. Skills: inaktive Panels nicht fokussierbar, Projektlink öffnet Case
  const mobile = await newPage({ viewport: { width: 375, height: 812 } });
  await open(mobile, "/en/");
  await mobile.$eval("#skills", (e) => e.scrollIntoView());
  await mobile.click('.skill-tag-static[data-skill-id="security-isms"]');
  await mobile.waitForTimeout(500);
  const hiddenFocusable = await mobile.$$eval(
    ".panel-state:not(.is-active) button",
    (els) => els.filter((e) => getComputedStyle(e).visibility !== "hidden").length,
  );
  check("inaktive Skill-Panels nicht fokussierbar", hiddenFocusable === 0, `${hiddenFocusable}`);
  const target = await mobile.$eval(
    ".panel-state.is-active [data-target-case]",
    (e) => e.dataset.targetCase,
  );
  await mobile.click(`.panel-state.is-active [data-target-case="${target}"]`);
  await mobile.waitForTimeout(1500);
  check(
    "Skills → Case öffnet Projekt",
    await mobile.$eval(`#case-${target}`, (d) => d.open),
    target,
  );

  // 6. Accessibility (axe, WCAG 2.1 AA)
  for (const path of [
    "/",
    "/en/",
    "/blog/",
    "/blog/2026-03-29-full-microsoft-stack-open-source-doku/",
  ]) {
    const a11y = await newPage({ reducedMotion: "reduce" });
    await open(a11y, path);
    await a11y.addScriptTag({ content: AXE_SOURCE });
    const violations = await a11y.evaluate(async () => {
      const r = await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
      return r.violations.map((v) => `${v.id}(${v.nodes.length})`);
    });
    check(`axe ${path}`, violations.length === 0, violations.join(", "));
    await a11y.context().close();
  }

  // 7. Ohne JavaScript: Inhalte sichtbar
  const noJs = await newPage({ javaScriptEnabled: false });
  for (const path of ["/", "/en/"]) {
    await noJs.goto(BASE + path);
    check(
      `ohne JS ${path}: Hero sichtbar`,
      (await noJs.$eval("h1", (e) => getComputedStyle(e).opacity)) === "1",
    );
    check(`ohne JS ${path}: 29 Cases`, (await noJs.$$eval(".pf-row", (r) => r.length)) === 29);
  }

  // 8. Reduzierte Bewegung: keine Char-Animation, Inhalt sofort sichtbar
  const reduced = await newPage({ reducedMotion: "reduce" });
  await reduced.goto(`${BASE}/`);
  await reduced.waitForTimeout(200);
  check(
    "prefers-reduced-motion respektiert",
    (await reduced.$$eval(".split-char", (e) => e.length)) === 0 &&
      (await reduced.$eval("h1", (e) => getComputedStyle(e).opacity)) === "1",
  );

  check("keine JavaScript-Fehler", jsErrors.length === 0, jsErrors.join("; "));
  await browser.close();
}

main()
  .catch((e) => check("Abbruch", false, e.stack ?? String(e)))
  .finally(() => {
    stop();
    const failed = results.filter((r) => !r.ok);
    for (const r of results)
      console.log(`${r.ok ? "✓" : "✗"} ${r.name}${r.info ? ` (${r.info})` : ""}`);
    console.log(`\n${results.length - failed.length}/${results.length} Browser-Checks bestanden`);
    process.exit(failed.length ? 1 : 0);
  });
