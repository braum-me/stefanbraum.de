/**
 * Projektstatus-Logik für Portfolio-Cases.
 *
 * Fachliche Status (redaktionell gesetzt über `status`):
 *   ongoing                   laufend (aktive Umsetzung)
 *   in-operation              im Betrieb (eingeführt, wird betrieben/weiterentwickelt)
 *   pilot                     Pilot (begrenzter Rollout, kein Abschluss)
 *   preparation               Vorbereitung (kein Ergebnis, keine Umsetzung behauptet)
 *   concept                   Zielbild/Konzept
 *   completed                 abgeschlossen
 *   handed-over               abgeschlossen und übergeben
 *   pre-evaluation-completed  Vorevaluierung abgeschlossen (keine Entscheidung behauptet)
 *
 * Ohne `status` wird heuristisch aus `period` abgeleitet (nur ongoing | completed):
 *   1. "<Jahr> - laufend" / "seit <Jahr>" -> "ongoing"
 *   2. Endjahr >= aktuelles Jahr          -> "ongoing" (geplantes Ende noch nicht erreicht)
 *   3. Endjahr <  aktuelles Jahr          -> "completed"
 *   4. nicht auswertbar                   -> "completed" (konservativ: kein Laufend-Pill)
 *
 * Ein redaktionell gesetzter `status` hat immer Vorrang vor der Heuristik.
 * `hidePill` blendet nur die Anzeige aus, der fachliche Status bleibt erhalten.
 */

export const CASE_STATUSES = [
  "ongoing",
  "in-operation",
  "pilot",
  "preparation",
  "concept",
  "completed",
  "handed-over",
  "pre-evaluation-completed",
] as const;

export type CaseStatus = (typeof CASE_STATUSES)[number];

/** Status, die als aktiv gelten (Sortierung: aktiv vor abgeschlossen). */
const ACTIVE_STATUSES: ReadonlySet<CaseStatus> = new Set([
  "ongoing",
  "in-operation",
  "pilot",
  "preparation",
  "concept",
]);

/**
 * Status, die als Pill angezeigt werden. Schlichtes "completed" bleibt wie
 * bisher ohne Pill; qualifizierte Abschlüsse (übergeben, Vorevaluierung)
 * werden ausgewiesen, damit sie nicht als laufend oder als Vollumsetzung wirken.
 */
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

/** "2025 - 2027" | "2026 - laufend" | "seit 2024" | "2025" -> ParsedPeriod, sonst null. */
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
  const since = normalized.match(/^(?:seit|since)\s+(\d{4})$/);
  if (since) return { startYear: Number(since[1]), endYear: null };
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

/** Vollständiger fachlicher Status, unabhängig von der Anzeige. */
export function resolveCaseStatus(c: StatusInput, now: Date = new Date()): CaseStatus {
  if (c.status) return c.status;
  const parsed = parsePeriod(c.period);
  if (!parsed) return "completed";
  if (parsed.endYear === null) return "ongoing";
  return parsed.endYear >= currentYear(now) ? "ongoing" : "completed";
}

export function isActiveStatus(status: CaseStatus): boolean {
  return ACTIVE_STATUSES.has(status);
}

/** Status-Pill für die Anzeige oder `null` (schlicht abgeschlossen bzw. `hidePill`). */
export function caseStatusPill(c: StatusInput, now: Date = new Date()): CaseStatusPill | null {
  if (c.hidePill) return null;
  const status = resolveCaseStatus(c, now);
  return status === "completed" ? null : status;
}
