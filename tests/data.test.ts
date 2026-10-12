import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";
import { cases, localizeCase, orderCasesForDisplay } from "../src/data/cases.ts";
import { chapterNumber, HOME_SECTIONS } from "../src/data/sections.ts";
import { formatPeriod, timeline } from "../src/data/timeline.ts";

describe("cases", () => {
  it("have unique ids", () => {
    const ids = cases.map((c) => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("reference existing blog posts only", () => {
    for (const c of cases) {
      if (!c.blogSlug) continue;
      assert.ok(
        existsSync(new URL(`../src/content/blog/${c.blogSlug}.md`, import.meta.url)),
        `${c.id}: blog post ${c.blogSlug} not found`,
      );
    }
  });

  it("keep their source order (Phase 1: nothing featured yet)", () => {
    assert.ok(cases.every((c) => !c.featured && c.priority === undefined));
    assert.deepEqual(
      orderCasesForDisplay(cases).map((c) => c.id),
      cases.map((c) => c.id),
    );
  });

  it("put featured cases first, ordered by priority, stable otherwise", () => {
    const list: { id: string; featured?: boolean; priority?: number }[] = [
      { id: "a" },
      { id: "b", featured: true },
      { id: "c", featured: true, priority: 1 },
      { id: "d" },
      { id: "e", featured: true },
    ];
    assert.deepEqual(
      orderCasesForDisplay(list).map((c) => c.id),
      ["c", "b", "e", "a", "d"],
    );
  });

  it("fall back to German with language marker when no translation exists", () => {
    const first = cases[0];
    assert.ok(first);
    const en = localizeCase({ ...first, en: { title: "English title" } }, "en");
    assert.deepEqual(en.title, { value: "English title", lang: "en", isFallback: false });
    assert.equal(en.context.value, first.context);
    assert.equal(en.context.lang, "de");
    assert.equal(en.context.isFallback, true);
  });
});

describe("timeline", () => {
  it("renders the same period labels as before the refactor", () => {
    const de = timeline.map((e) => formatPeriod(e, "de", "Heute"));
    const en = timeline.map((e) => formatPeriod(e, "en", "Today"));
    assert.deepEqual(de, [
      "Jun 2023 - Heute",
      "Jul 2022 - Heute",
      "Apr 2021 - Heute",
      "Aug 2018 - Mär 2021",
      "Sep 2014 - Jun 2018",
    ]);
    assert.deepEqual(en, [
      "Jun 2023 - Today",
      "Jul 2022 - Today",
      "Apr 2021 - Today",
      "Aug 2018 - Mar 2021",
      "Sep 2014 - Jun 2018",
    ]);
  });
});

describe("home sections", () => {
  it("follow the agreed order", () => {
    assert.deepEqual(
      [...HOME_SECTIONS],
      ["kernschwerpunkte", "stationen", "portfolio", "skills", "schreiben", "kontakt"],
    );
    assert.equal(chapterNumber("kernschwerpunkte"), "01");
    assert.equal(chapterNumber("stationen"), "02");
    assert.equal(chapterNumber("kontakt"), "06");
  });
});
