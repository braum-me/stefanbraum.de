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

export type { Translations } from "./de.ts";
