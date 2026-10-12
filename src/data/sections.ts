/**
 * Reihenfolge der Startseiten-Kapitel. Single source of truth für
 * Rendering, Kapitelnummern, Navigation und Anker.
 * Die IDs sind gleichzeitig die DOM-Anker (`/#stationen`) und bleiben
 * sprachunabhängig, damit bestehende Links stabil bleiben.
 */
export const HOME_SECTIONS = [
  "kernschwerpunkte",
  "stationen",
  "portfolio",
  "skills",
  "schreiben",
  "kontakt",
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number];

/** "01", "02", ... entsprechend der Position in HOME_SECTIONS. */
export function chapterNumber(id: HomeSectionId): string {
  return String(HOME_SECTIONS.indexOf(id) + 1).padStart(2, "0");
}
