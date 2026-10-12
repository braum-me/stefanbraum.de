import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  blogPostPath,
  canonicalPath,
  getHreflangLinks,
  getLocaleAlternates,
  languageSwitchTarget,
} from "../src/i18n/routes.ts";

describe("canonicalPath", () => {
  it("normalizes to trailing slash", () => {
    assert.equal(canonicalPath("/"), "/");
    assert.equal(canonicalPath("/en"), "/en/");
    assert.equal(canonicalPath("/impressum"), "/impressum/");
    assert.equal(canonicalPath("/blog/foo/"), "/blog/foo/");
    assert.equal(canonicalPath("/rss.xml"), "/rss.xml");
  });
});

describe("getLocaleAlternates", () => {
  it("maps translated pages both ways", () => {
    assert.deepEqual(getLocaleAlternates("/"), { de: "/", en: "/en/" });
    assert.deepEqual(getLocaleAlternates("/en"), { de: "/", en: "/en/" });
    assert.deepEqual(getLocaleAlternates("/blog/"), { de: "/blog/", en: "/en/blog/" });
    assert.deepEqual(getLocaleAlternates("/en/impressum"), {
      de: "/impressum/",
      en: "/en/impressum/",
    });
  });
  it("has no English counterpart for German blog posts", () => {
    assert.deepEqual(getLocaleAlternates("/blog/some-post/"), {
      de: "/blog/some-post/",
      en: null,
    });
  });
});

describe("getHreflangLinks", () => {
  it("emits de/en/x-default for translated pages", () => {
    assert.deepEqual(getHreflangLinks("/en/blog/"), [
      { hreflang: "de", path: "/blog/" },
      { hreflang: "en", path: "/en/blog/" },
      { hreflang: "x-default", path: "/blog/" },
    ]);
  });
  it("emits nothing without a real counterpart", () => {
    assert.deepEqual(getHreflangLinks("/blog/some-post/"), []);
    assert.deepEqual(getHreflangLinks("/404"), []);
    assert.deepEqual(getHreflangLinks("/en/404/"), []);
  });
});

describe("languageSwitchTarget", () => {
  it("switches between existing counterparts", () => {
    assert.equal(languageSwitchTarget("/", "en"), "/en/");
    assert.equal(languageSwitchTarget("/en/", "de"), "/");
    assert.equal(languageSwitchTarget("/datenschutz/", "en"), "/en/datenschutz/");
  });
  it("sends German blog posts to the English blog index", () => {
    assert.equal(languageSwitchTarget("/blog/some-post/", "en"), "/en/blog/");
    assert.equal(languageSwitchTarget("/blog/some-post/", "de"), "/blog/some-post/");
  });
  it("falls back to the localized home page for unknown paths", () => {
    assert.equal(languageSwitchTarget("/does-not-exist", "en"), "/en/");
  });
});

describe("blogPostPath", () => {
  it("always points to the German route", () => {
    assert.equal(blogPostPath("abc"), "/blog/abc/");
  });
});
