import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const imprints = {
  de: read("src/pages/impressum.astro"),
  en: read("src/pages/en/impressum.astro"),
};

describe("imprint (legal)", () => {
  it("no longer references the EU ODR platform (discontinued 20.07.2025)", () => {
    for (const [lang, src] of Object.entries(imprints)) {
      assert.doesNotMatch(src, /ec\.europa\.eu\/consumers\/odr/i, `${lang}: ODR link`);
      assert.doesNotMatch(src, /Plattform zur Online-Streitbeilegung/i, `${lang}: ODR platform`);
      assert.doesNotMatch(src, /online dispute resolution platform/i, `${lang}: ODR platform`);
    }
  });

  it("keeps the consumer dispute resolution notice (§ 36 VSBG) in DE and EN", () => {
    assert.match(imprints.de, /nicht bereit und nicht verpflichtet/);
    assert.match(imprints.de, /Verbraucherschlichtungsstelle/);
    assert.match(imprints.en, /neither willing nor obligated/);
    assert.match(imprints.en, /consumer arbitration board/);
  });
});
