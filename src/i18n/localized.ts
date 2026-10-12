/**
 * Typisierte DE/EN-Inhalte für Daten außerhalb der UI-Dictionaries
 * (Timeline, Portfolio, Profil).
 *
 * Deutsch ist Pflicht und Quelle, Englisch optional. Fehlt eine Übersetzung,
 * wird der deutsche Text ausgeliefert und mit `lang="de"` gekennzeichnet,
 * statt eine Übersetzung zu erfinden.
 */
export type ContentLocale = "de" | "en";

export interface Localized<T> {
  de: T;
  en?: T;
}

export interface Resolved<T> {
  value: T;
  /** Sprache des tatsächlich gelieferten Inhalts. */
  lang: ContentLocale;
  /** true, wenn für die angefragte Locale auf Deutsch zurückgefallen wurde. */
  isFallback: boolean;
}

export function resolveLocalized<T>(value: Localized<T>, locale: ContentLocale): Resolved<T> {
  if (locale === "en" && value.en !== undefined) {
    return { value: value.en, lang: "en", isFallback: false };
  }
  return { value: value.de, lang: "de", isFallback: locale !== "de" };
}

/** Kurzform, wenn nur der Wert gebraucht wird. */
export function localized<T>(value: Localized<T>, locale: ContentLocale): T {
  return resolveLocalized(value, locale).value;
}

/** `lang`-Attribut nur setzen, wenn der Inhalt von der Seitensprache abweicht. */
export function langAttr(resolved: { lang: ContentLocale }, pageLocale: ContentLocale) {
  return resolved.lang === pageLocale ? undefined : resolved.lang;
}
