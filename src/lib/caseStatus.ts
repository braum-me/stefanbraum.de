/**
 * Projektstatus-Logik für Portfolio-Cases.
 *
 * Regeln (in dieser Reihenfolge):
 *   1. `hidePill`                    -> kein Pill (Status wird nicht angezeigt)
 *   2. expliziter `status`           -> gewinnt immer ("ongoing" | "concept" | "completed")
 *   3. Zeitraum "<Jahr> - laufend"   -> "ongoing"
 *   4. Endjahr >= aktuelles Jahr     -> "ongoing" (geplantes Ende noch nicht erreicht)
 *   5. Endjahr <  aktuelles Jahr     -> "completed"
 *   6. Zeitraum nicht auswertbar     -> "completed" (konservativ: kein Laufend-Pill)
 *
 * Ein Projekt wird damit frühestens nach Ablauf seines angegebenen Endjahres
 * automatisch abgeschlossen, nie allein durch den Wechsel in das Endjahr.
 * Abweichungen (früher fertig, verlängert, nur Zielbild) werden explizit
 * über `status` gepflegt.
 */

export type CaseStatus = "ongoing" | "concept" | "completed";

/** Status, die als Pill angezeigt werden. "completed" bleibt ohne Pill. */
export type CaseStatusPill = Exclude<CaseStatus, "completed">;

export interface StatusInput {
  period: string;
  status?: CaseStatus;
  hidePill?: boolean;
}

export interface ParsedPeriod {
  startYear: number;
  /** `null` = laufend, ohne geplantes Ende. */
  endYear: number | null;
}

const ONGOING_WORDS = ["laufend", "ongoing", "heute", "today"];

/** "2025 - 2027" | "2026 - laufend" | "2025" -> ParsedPeriod, sonst null. */
export function parsePeriod(period: string): ParsedPeriod | null {
  const normalized = period.trim().toLowerCase();
  const range = normalized.match(/^(\d{4})\s*[-–]\s*(\d{4}|[a-zäöü]+)$/);
  if (range) {
    const startYear = Number(range[1]);
    const end = range[2] ?? "";
    if (/^\d{4}$/.test(end)) return { startYear, endYear: Number(end) };
    if (ONGOING_WORDS.includes(end)) return { startYear, endYear: null };
    return null;
  }
  const single = normalized.match(/^(\d{4})$/);
  if (single) {
    const year = Number(single[1]);
    return { startYear: year, endYear: year };
  }
  return null;
}

/** Aktuelles Jahr in Europe/Berlin (Server läuft ggf. in UTC). */
export function currentYear(now: Date = new Date()): number {
  return Number(
    new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "Europe/Berlin" }).format(now),
  );
}

/** Vollständiger Status, unabhängig von der Anzeige. */
export function resolveCaseStatus(c: StatusInput, now: Date = new Date()): CaseStatus {
  if (c.status) return c.status;
  const parsed = parsePeriod(c.period);
  if (!parsed) return "completed";
  if (parsed.endYear === null) return "ongoing";
  return parsed.endYear >= currentYear(now) ? "ongoing" : "completed";
}

/** Status-Pill für die Anzeige oder `null` (abgeschlossen bzw. `hidePill`). */
export function caseStatusPill(c: StatusInput, now: Date = new Date()): CaseStatusPill | null {
  if (c.hidePill) return null;
  const status = resolveCaseStatus(c, now);
  return status === "completed" ? null : status;
}
