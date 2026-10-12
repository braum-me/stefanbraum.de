/**
 * Sprach-Entsprechungen von Routen.
 *
 * Nur Seiten mit echter DE/EN-Entsprechung bekommen hreflang-Alternates.
 * Blogartikel existieren ausschließlich auf Deutsch unter `/blog/<slug>/`;
 * es gibt bewusst keine `/en/blog/<slug>/`-Routen.
 */
import type { ContentLocale } from "./localized.ts";

/** Pfade (ohne Locale-Präfix, mit Trailing Slash), die in beiden Sprachen existieren. */
const TRANSLATED_PATHS = new Set(["/", "/blog/", "/impressum/", "/datenschutz/"]);

/** Fehlerseiten: keine Alternates, kein Canonical-Self-Claim. */
const ERROR_PATHS = new Set(["/404/"]);

export type LocaleAlternates = Record<ContentLocale, string | null>;

/** "/en/blog" -> "/en/blog/", "/" bleibt "/". Dateiendungen bleiben unverändert. */
export function withTrailingSlash(pathname: string): string {
  if (pathname.endsWith("/")) return pathname;
  const last = pathname.split("/").pop() ?? "";
  if (last.includes(".")) return pathname;
  return `${pathname}/`;
}

function splitLocale(pathname: string): { locale: ContentLocale; path: string } {
  const normalized = withTrailingSlash(pathname);
  if (normalized === "/en/" || normalized.startsWith("/en/")) {
    return { locale: "en", path: normalized.slice(3) || "/" };
  }
  return { locale: "de", path: normalized };
}

function prefixed(path: string, locale: ContentLocale): string {
  return locale === "en" ? `/en${path}` : path;
}

/** Canonical-Pfad einer Seite (normalisiert auf Trailing Slash). */
export function canonicalPath(pathname: string): string {
  return withTrailingSlash(pathname);
}

/** Deutscher Blogartikel-Pfad. Einziger Ort, an dem Artikel-URLs gebaut werden. */
export function blogPostPath(slug: string): string {
  return `/blog/${slug}/`;
}

export function blogIndexPath(locale: ContentLocale): string {
  return prefixed("/blog/", locale);
}

export function homePath(locale: ContentLocale): string {
  return prefixed("/", locale);
}

export function isErrorPath(pathname: string): boolean {
  return ERROR_PATHS.has(splitLocale(pathname).path);
}

/**
 * Tatsächlich existierende Entsprechungen der aktuellen Seite.
 * `null` = in dieser Sprache gibt es keine Entsprechung.
 */
export function getLocaleAlternates(pathname: string): LocaleAlternates {
  const { locale, path } = splitLocale(pathname);
  if (TRANSLATED_PATHS.has(path)) {
    return { de: prefixed(path, "de"), en: prefixed(path, "en") };
  }
  const self = prefixed(path, locale);
  return locale === "de" ? { de: self, en: null } : { de: null, en: self };
}

/** hreflang-Paare nur, wenn beide Sprachen existieren. Sonst leer. */
export function getHreflangLinks(pathname: string): { hreflang: string; path: string }[] {
  if (isErrorPath(pathname)) return [];
  const alt = getLocaleAlternates(pathname);
  if (!alt.de || !alt.en) return [];
  return [
    { hreflang: "de", path: alt.de },
    { hreflang: "en", path: alt.en },
    { hreflang: "x-default", path: alt.de },
  ];
}

/**
 * Ziel des Sprachumschalters. Existiert keine Entsprechung, wird auf die
 * nächstliegende existierende Seite der Zielsprache verwiesen:
 * Blogartikel -> Blog-Übersicht, sonst Startseite.
 */
export function languageSwitchTarget(pathname: string, target: ContentLocale): string {
  const alt = getLocaleAlternates(pathname)[target];
  if (alt) return alt;
  const { path } = splitLocale(pathname);
  if (path.startsWith("/blog/")) return blogIndexPath(target);
  return homePath(target);
}
