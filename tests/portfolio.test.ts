import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  type CaseStudy,
  caseMatchesCategory,
  caseStatusPill,
  cases,
  formatCasePeriod,
  LEGACY_CASE_ID_PREFIXES,
  LEGACY_CASE_IDS,
  portfolioOrder,
  resolveCaseId,
  resolveCaseStatus,
  sortCasesChronologically,
} from "../src/data/cases.ts";
import { skills } from "../src/data/skills.ts";
import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";
import { CASE_STATUSES, isActiveStatus, parsePeriod } from "../src/lib/caseStatus.ts";

const publication = new Date("2026-10-12T10:00:00Z");
const byId = (id: string): CaseStudy => {
  const c = cases.find((x) => x.id === id);
  assert.ok(c, `case ${id} missing`);
  return c;
};

describe("portfolio content (Phase 2)", () => {
  it("contains exactly 29 cases: 27 employer + 2 own", () => {
    assert.equal(cases.length, 29);
    assert.equal(cases.filter((c) => c.origin === "employer").length, 27);
    assert.deepEqual(
      cases.filter((c) => c.origin === "own").map((c) => c.id),
      ["aboutexport-saas", "braum-x-hub"],
    );
  });

  it("has unique ids", () => {
    assert.equal(new Set(cases.map((c) => c.id)).size, cases.length);
  });

  it("no longer contains removed or merged ids", () => {
    const gone = [
      "tacto-ai-purchasing",
      "odw-central-eigenentwicklung",
      "copilot-agents-rollout",
      "kpi-restructuring-data-automation",
      "team-data-analytics",
      "hr-successfactors",
    ];
    for (const id of gone)
      assert.equal(
        cases.some((c) => c.id === id),
        false,
        id,
      );
  });

  it("contains the four new projects", () => {
    for (const id of [
      "microsoft-places-hybrid-workplace",
      "plm-web-client-evolution",
      "catena-x-preparation",
      "global-it-governance-service-management",
    ]) {
      byId(id);
    }
  });

  it("keeps public case texts free of obvious internals", () => {
    const text = JSON.stringify(cases);
    assert.doesNotMatch(text, /\b\d{1,3}(\.\d{1,3}){3}\b/, "IP address");
    assert.doesNotMatch(text, /CVE-\d/i, "CVE");
    assert.doesNotMatch(text, /€|\bMio\b|\bEUR\b/, "budget figures");
    assert.doesNotMatch(text, /tacto/i);
    assert.doesNotMatch(text, /\b[56] DR\b/, "unconfirmed direct-report count");
  });
});

describe("ordering", () => {
  it("source order equals chronological display order", () => {
    assert.deepEqual(
      portfolioOrder(cases, publication).map((c) => c.id),
      cases.map((c) => c.id),
    );
  });

  it("sorts by start year desc, active before completed, deterministically", () => {
    const sorted = sortCasesChronologically(cases, publication);
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1] as CaseStudy;
      const cur = sorted[i] as CaseStudy;
      const py = parsePeriod(prev.period)?.startYear ?? 0;
      const cy = parsePeriod(cur.period)?.startYear ?? 0;
      assert.ok(py >= cy, `${prev.id} before ${cur.id}`);
      if (py === cy) {
        const pa = isActiveStatus(resolveCaseStatus(prev, publication));
        const ca = isActiveStatus(resolveCaseStatus(cur, publication));
        assert.ok(pa || !ca, `active ${cur.id} sorted after completed ${prev.id}`);
      }
    }
    const shuffled = [...cases].reverse();
    assert.deepEqual(
      sortCasesChronologically(shuffled, publication).map((c) => c.id),
      sortCasesChronologically([...shuffled], publication).map((c) => c.id),
    );
  });

  it("sets no featured cases without an editorial decision", () => {
    assert.ok(cases.every((c) => !c.featured && c.priority === undefined));
  });
});

describe("status", () => {
  const expected: Record<string, string> = {
    "aboutexport-saas": "ongoing",
    "braum-x-hub": "ongoing",
    "outline-knowledge-base": "ongoing",
    "modern-intranet-ai-knowledge-agent": "handed-over",
    "power-platform-coe": "ongoing",
    "hr-transformation-evaluation": "pre-evaluation-completed",
    "sap-modernization-azure": "ongoing",
    "copilot-adoption-program": "ongoing",
    "adobe-sign-digital-signature": "completed",
    "lexisnexis-patent-analytics": "completed",
    "global-bi-platform": "ongoing",
    "sosafe-security-awareness": "in-operation",
    "ai-elearning-platform": "in-operation",
    "managed-soc-endpoint-security": "in-operation",
    "cyber-risk-bcm-framework": "completed",
    "it-due-diligence": "completed",
    "microsoft-places-hybrid-workplace": "pilot",
    "plm-web-client-evolution": "ongoing",
    "catena-x-preparation": "preparation",
    "global-it-governance-service-management": "ongoing",
  };

  it("uses the editorial status from the hand-over", () => {
    for (const [id, status] of Object.entries(expected)) {
      assert.equal(byId(id).status, status, id);
    }
  });

  it("keeps explicit statuses across year boundaries", () => {
    const later = new Date("2028-06-01T10:00:00Z");
    for (const id of [
      "power-platform-coe",
      "global-bi-platform",
      "copilot-adoption-program",
      "sap-modernization-azure",
    ]) {
      assert.equal(resolveCaseStatus(byId(id), later), "ongoing", id);
    }
    assert.equal(resolveCaseStatus(byId("adobe-sign-digital-signature"), later), "completed");
  });

  it("renders pills that do not overstate progress", () => {
    const pill = (id: string) => caseStatusPill(byId(id), publication);
    assert.equal(pill("managed-soc-endpoint-security"), "in-operation");
    assert.equal(pill("microsoft-places-hybrid-workplace"), "pilot");
    assert.equal(pill("catena-x-preparation"), "preparation");
    assert.equal(pill("modern-intranet-ai-knowledge-agent"), "handed-over");
    assert.equal(pill("hr-transformation-evaluation"), "pre-evaluation-completed");
    assert.equal(pill("adobe-sign-digital-signature"), null);
    assert.equal(pill("team-aufbau-apps"), null, "hidePill");
    assert.equal(pill("it-strategie-odw-gesamtlaufzeit"), null, "hidePill");
  });

  it("has DE and EN labels and hints for every status", () => {
    for (const s of CASE_STATUSES) {
      for (const t of [de, en]) {
        assert.ok(t.cases.status[s], `${t.htmlLang} label ${s}`);
        assert.ok(t.cases.statusHint[s], `${t.htmlLang} hint ${s}`);
      }
    }
    assert.equal(de.cases.status["in-operation"], "Im Betrieb");
    assert.equal(en.cases.status["handed-over"], "Completed & handed over");
  });

  it("formats visible periods per language", () => {
    const de_ = { ongoing: de.cases.periodOngoing, since: de.cases.periodSince };
    const en_ = { ongoing: en.cases.periodOngoing, since: en.cases.periodSince };
    assert.equal(formatCasePeriod("seit 2024", de_), "seit 2024");
    assert.equal(formatCasePeriod("seit 2024", en_), "since 2024");
    assert.equal(formatCasePeriod("2026 - laufend", en_), "2026 - ongoing");
    assert.equal(formatCasePeriod("2019 - 2026", en_), "2019 - 2026");
    assert.equal(byId("sosafe-security-awareness").period, "seit 2024");
  });
});

describe("categories", () => {
  it("supports secondary categories for filtering", () => {
    const process = byId("power-platform-coe");
    assert.ok(caseMatchesCategory(process, "engineering"));
    assert.ok(caseMatchesCategory(process, "transformation"));
    assert.ok(!caseMatchesCategory(process, "ai"));
    const data = byId("global-bi-platform");
    assert.ok(caseMatchesCategory(data, "transformation"));
    assert.ok(caseMatchesCategory(data, "leadership"));
    assert.ok(caseMatchesCategory(data, null));
  });

  it("shows Modern Workplace as a domain tag, not as a new filter", () => {
    const places = byId("microsoft-places-hybrid-workplace");
    assert.equal(places.category, "enterprise");
    assert.deepEqual(places.domainTags, ["modern-workplace"]);
    assert.ok(de.cases.domainTags["modern-workplace"]);
  });
});

describe("references and deep links", () => {
  it("skills only reference existing cases, without duplicates", () => {
    const ids = new Set(cases.map((c) => c.id));
    for (const s of skills) {
      for (const p of s.projects) assert.ok(ids.has(p), `${s.id} -> ${p}`);
      assert.equal(new Set(s.projects).size, s.projects.length, `${s.id} duplicates`);
    }
  });

  it("resolves legacy ids of merged and renamed cases", () => {
    assert.equal(resolveCaseId("odw-central-eigenentwicklung"), "power-platform-coe");
    assert.equal(resolveCaseId("copilot-agents-rollout"), "copilot-adoption-program");
    assert.equal(resolveCaseId("kpi-restructuring-data-automation"), "global-bi-platform");
    assert.equal(resolveCaseId("team-data-analytics"), "global-bi-platform");
    assert.equal(resolveCaseId("hr-successfactors"), "hr-transformation-evaluation");
    assert.equal(resolveCaseId("managed-soc-legacy-name"), "managed-soc-endpoint-security");
    assert.equal(resolveCaseId("outline-knowledge-base"), "outline-knowledge-base");
    assert.equal(resolveCaseId("tacto-ai-purchasing"), null);
  });

  it("only maps legacy ids to existing cases", () => {
    const ids = new Set(cases.map((c) => c.id));
    for (const target of Object.values(LEGACY_CASE_IDS)) assert.ok(ids.has(target), target);
    for (const { id } of LEGACY_CASE_ID_PREFIXES) assert.ok(ids.has(id), id);
    // Präfix-Aliase dürfen keine aktuelle ID eines anderen Cases verschlucken
    for (const c of cases) assert.equal(resolveCaseId(c.id), c.id);
  });

  it("keeps blog links intact", () => {
    assert.equal(
      byId("outline-knowledge-base").blogSlug,
      "2026-03-29-full-microsoft-stack-open-source-doku",
    );
    assert.equal(byId("aboutexport-saas").blogSlug, "2026-04-20-warum-ich-aboutexport-baue");
    assert.equal(byId("braum-x-hub").blogSlug, "2026-05-10-vier-websites-mit-claude-code");
  });
});
