import { de, type Translations } from "./de.ts";
import { en } from "./en.ts";

export type Locale = "de" | "en";

export const LOCALES: readonly Locale[] = ["de", "en"] as const;
export const DEFAULT_LOCALE: Locale = "de";

const tables: Record<Locale, Translations> = {
  de,
  en,
};

/**
 * Determine current locale from URL pathname.
 * `/en` and `/en/...` -> "en", everything else -> "de" (default).
 */
export function getLocale(url: URL | { pathname: string }): Locale {
  const path = url.pathname;
  if (path === "/en" || path === "/en/" || path.startsWith("/en/")) {
    return "en";
  }
  return DEFAULT_LOCALE;
}

/** Returns "" for default locale, "/en" for en, etc. */
export function getLocalePrefix(locale: Locale): "" | "/en" {
  return locale === "en" ? "/en" : "";
}

/** Returns the typed translation table for a locale. */
export function getT(locale: Locale): Translations {
  return tables[locale];
}

/**
 * Strip locale prefix from a pathname.
 * "/en/blog" -> "/blog", "/en" -> "/", "/blog" -> "/blog".
 */
export function stripLocale(pathname: string): string {
  if (pathname === "/en" || pathname === "/en/") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

/**
 * Build a path for the given locale, stripping any existing locale prefix.
 * Always returns a leading "/".
 */
export function localizePath(pathname: string, locale: Locale): string {
  const stripped = stripLocale(pathname);
  const prefix = getLocalePrefix(locale);
  if (stripped === "/") return prefix === "" ? "/" : `${prefix}/`;
  return `${prefix}${stripped}`;
}

/**
 * Localize a hash-based section anchor (e.g. "kontakt" -> "/#kontakt" or "/en/#kontakt").
 * Used for nav links that scroll to homepage sections.
 */
export function localizeHashHref(currentPath: string, hash: string, locale: Locale): string {
  const stripped = stripLocale(currentPath);
  const isHome = stripped === "/";
  const prefix = getLocalePrefix(locale);
  if (isHome) {
    return `#${hash}`;
  }
  return prefix === "" ? `/#${hash}` : `${prefix}/#${hash}`;
}

export type { Translations } from "./de.ts";
