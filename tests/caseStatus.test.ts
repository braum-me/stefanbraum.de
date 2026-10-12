import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  caseStatusPill,
  currentYear,
  parsePeriod,
  resolveCaseStatus,
} from "../src/lib/caseStatus.ts";

// Feste Referenzzeitpunkte (UTC); Jahresbestimmung erfolgt in Europe/Berlin.
const mid2026 = new Date("2026-10-12T10:00:00Z");
const lastMinute2026 = new Date("2026-12-31T22:59:00Z"); // 23:59 Berlin
const newYear2027 = new Date("2026-12-31T23:30:00Z"); // 00:30 Berlin, 01.01.2027
const jan2027 = new Date("2027-01-15T12:00:00Z");
const jan2028 = new Date("2028-01-02T12:00:00Z");

describe("parsePeriod", () => {
  it("parses closed ranges", () => {
    assert.deepEqual(parsePeriod("2025 - 2027"), { startYear: 2025, endYear: 2027 });
    assert.deepEqual(parsePeriod("2019-2020"), { startYear: 2019, endYear: 2020 });
    assert.deepEqual(parsePeriod("2019 – 2020"), { startYear: 2019, endYear: 2020 });
  });
  it("parses open ranges", () => {
    assert.deepEqual(parsePeriod("2026 - laufend"), { startYear: 2026, endYear: null });
    assert.deepEqual(parsePeriod("2018 - Laufend"), { startYear: 2018, endYear: null });
    assert.deepEqual(parsePeriod("2024 - ongoing"), { startYear: 2024, endYear: null });
  });
  it("parses single years", () => {
    assert.deepEqual(parsePeriod("2025"), { startYear: 2025, endYear: 2025 });
  });
  it("returns null for unparseable input", () => {
    assert.equal(parsePeriod(""), null);
    assert.equal(parsePeriod("Q3 2025"), null);
    assert.equal(parsePeriod("2025 - irgendwann"), null);
  });
});

describe("currentYear", () => {
  it("uses Europe/Berlin around new year", () => {
    assert.equal(currentYear(lastMinute2026), 2026);
    assert.equal(currentYear(newYear2027), 2027);
  });
});

describe("resolveCaseStatus", () => {
  it("keeps open-ended projects ongoing across any year change", () => {
    const c = { period: "2026 - laufend" };
    for (const now of [mid2026, newYear2027, jan2028]) {
      assert.equal(resolveCaseStatus(c, now), "ongoing");
    }
  });

  it("does not complete a project on entering its end year", () => {
    const c = { period: "2025 - 2027" };
    assert.equal(resolveCaseStatus(c, mid2026), "ongoing");
    assert.equal(resolveCaseStatus(c, jan2027), "ongoing");
    assert.equal(resolveCaseStatus(c, jan2028), "completed");
  });

  it("completes a project only after its end year has passed", () => {
    const c = { period: "2025 - 2026" };
    assert.equal(resolveCaseStatus(c, lastMinute2026), "ongoing");
    assert.equal(resolveCaseStatus(c, newYear2027), "completed");
  });

  it("treats past ranges and single past years as completed", () => {
    assert.equal(resolveCaseStatus({ period: "2019 - 2020" }, mid2026), "completed");
    assert.equal(resolveCaseStatus({ period: "2025" }, mid2026), "completed");
    assert.equal(resolveCaseStatus({ period: "2026" }, mid2026), "ongoing");
  });

  it("falls back to completed for unparseable periods", () => {
    assert.equal(resolveCaseStatus({ period: "tbd" }, mid2026), "completed");
  });

  it("explicit status always wins", () => {
    assert.equal(
      resolveCaseStatus({ period: "2019 - 2020", status: "ongoing" }, mid2026),
      "ongoing",
    );
    assert.equal(
      resolveCaseStatus({ period: "2026 - laufend", status: "completed" }, mid2026),
      "completed",
    );
    assert.equal(
      resolveCaseStatus({ period: "2026 - laufend", status: "concept" }, jan2028),
      "concept",
    );
  });
});

describe("caseStatusPill", () => {
  it("hides the pill for completed projects", () => {
    assert.equal(caseStatusPill({ period: "2019 - 2020" }, mid2026), null);
  });
  it("respects hidePill even for ongoing and explicit statuses", () => {
    assert.equal(caseStatusPill({ period: "2021 - laufend", hidePill: true }, mid2026), null);
    assert.equal(
      caseStatusPill({ period: "2021", status: "concept", hidePill: true }, mid2026),
      null,
    );
  });
  it("shows ongoing and concept pills", () => {
    assert.equal(caseStatusPill({ period: "2026 - laufend" }, mid2026), "ongoing");
    assert.equal(caseStatusPill({ period: "2025", status: "concept" }, mid2026), "concept");
  });
});
