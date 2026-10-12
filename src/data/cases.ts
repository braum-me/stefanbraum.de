import type { ContentLocale, Resolved } from "../i18n/localized.ts";
import { resolveLocalized } from "../i18n/localized.ts";
import type { CaseStatus } from "../lib/caseStatus.ts";
import { isActiveStatus, parsePeriod, resolveCaseStatus } from "../lib/caseStatus.ts";
import type { CaseCategoryId } from "./caseCategories.ts";

export type { CaseStatus, CaseStatusPill } from "../lib/caseStatus.ts";
export { caseStatusPill, resolveCaseStatus } from "../lib/caseStatus.ts";

/** Herkunft: Projekt beim Arbeitgeber oder eigenes Vorhaben. */
export type CaseOrigin = "employer" | "own";

/** Sichtbare Fachdomänen ohne eigene Filter-Kachel (Labels in i18n `cases.domainTags`). */
export type CaseDomainTag = "modern-workplace";

export interface CaseMetric {
  value: string;
  label: string;
}

/** Übersetzbare Textfelder eines Cases. */
export interface CaseTextFields {
  kind: string;
  title: string;
  anchor: string;
  context: string;
  intervention: string;
  metrics: CaseMetric[];
}

export interface CaseStudy extends CaseTextFields {
  /** Stabile ID, öffentlich sichtbar als Anker `#case-<id>`. Keine Produkt-/Kundennamen. */
  id: string;
  origin: CaseOrigin;
  /** Hauptkategorie (Filter, Pill). */
  category: CaseCategoryId;
  /** Weitere Kategorien: ebenfalls als Pill sichtbar und über ihren Filter auffindbar. */
  secondaryCategories?: CaseCategoryId[];
  /** Zusätzliche sichtbare Fachdomänen ohne eigenen Filter. */
  domainTags?: CaseDomainTag[];
  /** Sichtbares Zeitraum-Label, z.B. "2025 - 2027", "2026 - laufend", "seit 2024". */
  period: string;
  tags: string[];
  /** Optional: englische Fassung. Einzelne Felder dürfen fehlen; sie fallen
      dann auf Deutsch zurück und werden mit lang="de" gekennzeichnet. */
  en?: Partial<CaseTextFields>;
  /** Redaktionell gesetzter fachlicher Status. Hat Vorrang vor der Ableitung aus
      `period` (siehe lib/caseStatus.ts). Nur setzen, wenn ausdrücklich entschieden. */
  status?: CaseStatus;
  /** Hard-Override: keinen Status-Pill anzeigen, auch wenn auto-detect 'ongoing' sagt.
      Nutzbar für laufende Mandate, die nicht als 'Projekt mit Ongoing-Status' wirken sollen
      (z.B. permanente Leadership-Linien, Roadmap-Mandate). */
  hidePill?: boolean;
  /** Optional: Slug eines Blog-Posts der diesen Case ausführlich behandelt.
      Erzeugt im Case-Detail einen 'Im Blog'-Link, im Blog-Post einen Rückverweis. */
  blogSlug?: string;
  /** Hervorgehobenes Projekt. Featured-Cases stehen vor allen anderen. */
  featured?: boolean;
  /** Sortierung innerhalb der Featured-Gruppe: kleiner = weiter vorne.
      Ohne Wert gilt die Reihenfolge im Array. */
  priority?: number;
}

/** Alle Kategorien eines Cases, Hauptkategorie zuerst. */
export function caseCategories(c: Pick<CaseStudy, "category" | "secondaryCategories">) {
  return [c.category, ...(c.secondaryCategories ?? []).filter((x) => x !== c.category)];
}

export function caseMatchesCategory(
  c: Pick<CaseStudy, "category" | "secondaryCategories">,
  category: CaseCategoryId | null,
): boolean {
  return category === null || caseCategories(c).includes(category);
}

/**
 * Sichtbares Zeitraum-Label je Sprache. Feste Zeiträume bleiben wörtlich,
 * "laufend" und "seit" werden übersetzt ("2026 - ongoing", "since 2024").
 */
export function formatCasePeriod(period: string, labels: { ongoing: string; since: string }) {
  const parsed = parsePeriod(period);
  if (!parsed || parsed.endYear !== null) return period;
  if (/^\s*(seit|since)\b/i.test(period)) return `${labels.since} ${parsed.startYear}`;
  return `${parsed.startYear} - ${labels.ongoing}`;
}

/** Startjahr aus dem Zeitraum-Label (für Sortierung). */
export function caseStartYear(c: Pick<CaseStudy, "period">): number {
  const parsed = parsePeriod(c.period);
  if (!parsed) throw new Error(`Unparseable case period: "${c.period}"`);
  return parsed.startYear;
}

/**
 * Chronologische Portfolio-Reihenfolge:
 *   1. Startjahr absteigend
 *   2. innerhalb eines Jahres aktive (laufend, im Betrieb, Pilot, Vorbereitung)
 *      vor abgeschlossenen
 *   3. sonst stabile Reihenfolge des Quell-Arrays
 */
export function sortCasesChronologically<T extends CaseStudy>(
  list: readonly T[],
  now: Date = new Date(),
): T[] {
  return list
    .map((c, index) => ({
      c,
      index,
      year: caseStartYear(c),
      active: isActiveStatus(resolveCaseStatus(c, now)) ? 0 : 1,
    }))
    .sort((a, b) => b.year - a.year || a.active - b.active || a.index - b.index)
    .map(({ c }) => c);
}

/**
 * Anzeige-Reihenfolge: Featured zuerst (nach `priority`, dann Array-Reihenfolge),
 * danach alle übrigen in Array-Reihenfolge. Stabil und ohne Seiteneffekte.
 * Ohne gesetzte Flags ist das Ergebnis identisch mit dem Eingabe-Array.
 */
export function orderCasesForDisplay<T extends Pick<CaseStudy, "featured" | "priority">>(
  list: readonly T[],
): T[] {
  return list
    .map((c, index) => ({ c, index }))
    .sort((a, b) => {
      const fa = a.c.featured ? 0 : 1;
      const fb = b.c.featured ? 0 : 1;
      if (fa !== fb) return fa - fb;
      if (fa === 0) {
        const pa = a.c.priority ?? Number.POSITIVE_INFINITY;
        const pb = b.c.priority ?? Number.POSITIVE_INFINITY;
        if (pa !== pb) return pa - pb;
      }
      return a.index - b.index;
    })
    .map(({ c }) => c);
}

/** Vollständige Portfolio-Reihenfolge für die Anzeige (chronologisch, dann Featured nach vorn). */
export function portfolioOrder(list: readonly CaseStudy[] = cases, now: Date = new Date()) {
  return orderCasesForDisplay(sortCasesChronologically(list, now));
}

/**
 * Alte Case-IDs (zusammengeführt oder umbenannt) -> kanonische ID.
 * Wird im Client für `#case-<alte-id>`-Deep-Links ausgewertet und ist damit
 * öffentlich: keine Produkt-, Anbieter- oder Kundennamen als Schlüssel.
 * Für solche IDs `LEGACY_CASE_ID_PREFIXES` verwenden.
 */
export const LEGACY_CASE_IDS: Readonly<Record<string, string>> = {
  "odw-central-eigenentwicklung": "power-platform-coe",
  "copilot-agents-rollout": "copilot-adoption-program",
  "kpi-restructuring-data-automation": "global-bi-platform",
  "team-data-analytics": "global-bi-platform",
};

/** Präfix-Aliase für alte IDs, deren voller Name nicht veröffentlicht werden soll. */
export const LEGACY_CASE_ID_PREFIXES: ReadonlyArray<{ prefix: string; id: string }> = [
  { prefix: "managed-soc-", id: "managed-soc-endpoint-security" },
  { prefix: "hr-", id: "hr-transformation-evaluation" },
];

/** Aktuelle ID zu einer (ggf. alten) Case-ID oder `null`, wenn es keinen Case gibt. */
export function resolveCaseId(id: string, list: readonly CaseStudy[] = cases): string | null {
  if (list.some((c) => c.id === id)) return id;
  const exact = LEGACY_CASE_IDS[id];
  if (exact && list.some((c) => c.id === exact)) return exact;
  const byPrefix = LEGACY_CASE_ID_PREFIXES.find((a) => id.startsWith(a.prefix));
  if (byPrefix && list.some((c) => c.id === byPrefix.id)) return byPrefix.id;
  return null;
}

export type LocalizedCase = Omit<CaseStudy, keyof CaseTextFields | "en"> & {
  [K in keyof CaseTextFields]: Resolved<CaseTextFields[K]>;
};

/** Textfelder in der gewünschten Sprache, mit Sprachkennzeichnung je Feld. */
export function localizeCase(c: CaseStudy, locale: ContentLocale): LocalizedCase {
  const { en, ...rest } = c;
  const field = <K extends keyof CaseTextFields>(key: K) =>
    resolveLocalized<CaseTextFields[K]>({ de: c[key], en: en?.[key] }, locale);
  return {
    ...rest,
    kind: field("kind"),
    title: field("title"),
    anchor: field("anchor"),
    context: field("context"),
    intervention: field("intervention"),
    metrics: field("metrics"),
  };
}

// Portfolio-Stand 12.10.2026 (Phase 2): 27 Arbeitgeber-Projekte + 2 eigene Vorhaben.
// Reihenfolge im Array = Anzeige-Reihenfolge (Startjahr absteigend, aktive vor
// abgeschlossenen). `sortCasesChronologically` erzwingt das zur Laufzeit, ein Test
// prüft, dass Quelle und Sortierung übereinstimmen.
// Vertraulichkeit: keine Personen-, Kunden-, Akquisitions- oder Security-Anbieternamen,
// keine technischen Interna, keine Budget-/Vertragszahlen (Ausnahme laut Freigabe: SoSafe).
export const cases: CaseStudy[] = [
  // ─── 2026 ───────────────────────────────────────────────
  {
    id: "outline-knowledge-base",
    origin: "employer",
    category: "engineering",
    period: "2026 - laufend",
    status: "ongoing",
    kind: "Build",
    title: "Enterprise-Wissensbasis mit Outline (self-hosted)",
    anchor: "Tier-2 Automotive · IT-Dokumentation · Self-Hosted · 6 Standorte",
    context:
      "Microsoft-Stack-Mittelständler mit M365, SAP, Azure und Copilot als AI-Backbone, aber ohne strukturierte IT-Dokumentation. Copilot ohne fütterbare Quellen liefert allgemeine Floskeln und veraltete SharePoint-Fundstücke. OneNote, Confluence, Loop und Notion alle nicht passend - jeweils aus unterschiedlichen Gründen (Struktur, Alter, Lose Granularität, AI-Silo-Konflikt).",
    intervention:
      "Outline (BSL 1.1) als Wiki-Foundation für die IT-Dokumentation, self-hosted im eigenen Rechenzentrum als Docker-Container, Anmeldung über Entra-SSO. Im Einsatz für alle IT-Teams an 6 Standorten, gegliedert in 9 thematische Collections. KI-Dokumentations-Agent in Copilot Studio für Onboarding, Schnellsuche und Übersichten; die Anbindung über einen MCP-Server ist geplant. Compliance-Profil ISO 27001 / TISAX / NIS2 durch Datenresidenz, Versionshistorie, Audit-Logs und granulare Berechtigungen. Abgrenzung: Outline ist die IT-Dokumentation, das unternehmensweite Wissen liegt im Intranet.",
    metrics: [
      { value: "Self-Host", label: "Eigenes Rechenzentrum" },
      { value: "6 Standorte", label: "Alle IT-Teams" },
      { value: "9 Collections", label: "Thematisch strukturiert" },
    ],
    tags: ["IT-Dokumentation", "Outline", "Self-Host", "Copilot Studio", "Entra SSO"],
    blogSlug: "2026-03-29-full-microsoft-stack-open-source-doku",
    en: {
      kind: "Build",
      title: "Enterprise Knowledge Base with Outline (self-hosted)",
      anchor: "Tier-2 automotive · IT documentation · Self-hosted · 6 sites",
      context:
        "Mid-sized company on the Microsoft stack, with M365, SAP, Azure and Copilot as its AI backbone, but without structured IT documentation. Without sources to draw on, Copilot returned generic phrases and outdated SharePoint findings. OneNote, Confluence, Loop and Notion each fell short for different reasons (structure, age, granularity, competing AI silo).",
      intervention:
        "Outline (BSL 1.1) as the wiki foundation for IT documentation, self-hosted as a Docker container in the company's own data center, with Entra SSO sign-in. Used by all IT teams across 6 sites and organized into 9 thematic collections. An AI documentation agent in Copilot Studio supports onboarding, quick search and overviews; an MCP server integration is planned. Compliance profile for ISO 27001 / TISAX / NIS2 through data residency, version history, audit logs and granular permissions. Scope: Outline holds IT documentation; company-wide knowledge lives in the intranet.",
      metrics: [
        { value: "Self-host", label: "Own data center" },
        { value: "6 sites", label: "All IT teams" },
        { value: "9 collections", label: "Organized by topic" },
      ],
    },
  },
  {
    id: "microsoft-places-hybrid-workplace",
    origin: "employer",
    category: "enterprise",
    domainTags: ["modern-workplace"],
    period: "2026 - laufend",
    status: "pilot",
    kind: "Adoption",
    title: "Microsoft Places - Hybrid Workplace & Desk Booking",
    anchor: "Tier-2 Automotive · Modern Workplace · Pilot mit drei Bereichen",
    context:
      "Hybrides Arbeiten braucht eine verlässliche Sicht darauf, wer wann vor Ort ist und welche Arbeitsplätze und Räume verfügbar sind. Bisher fehlte dafür eine einheitliche, in Microsoft 365 integrierte Lösung.",
    intervention:
      "Einführung von Microsoft Places, zunächst als Pilot mit drei Bereichen (IT Applications, SAP, IT-Leitung). Gruppenbasierte Freigabe, Arbeitsplatz- und Raumstruktur über mehrere Gebäude und getrennte Buchungsrechte je Arbeitsplatz. Der weitere Rollout erfolgt schrittweise über Pilotgruppen.",
    metrics: [
      { value: "Pilot", label: "Drei Bereiche" },
      { value: "Mehrere Gebäude", label: "Arbeitsplatz- und Raumstruktur" },
      { value: "Schrittweise", label: "Rollout über Pilotgruppen" },
    ],
    tags: ["Microsoft Places", "Hybrid Work", "Desk Booking", "M365"],
    en: {
      kind: "Adoption",
      title: "Microsoft Places - Hybrid Workplace & Desk Booking",
      anchor: "Tier-2 automotive · Modern workplace · Pilot with three departments",
      context:
        "Hybrid work needs a reliable view of who is on site when, and which desks and rooms are available. A consistent solution integrated into Microsoft 365 was missing.",
      intervention:
        "Introduction of Microsoft Places, starting as a pilot with three departments (IT Applications, SAP, IT management). Group-based access, a desk and room structure across several buildings, and separate booking rights per desk. Further rollout proceeds step by step through pilot groups.",
      metrics: [
        { value: "Pilot", label: "Three departments" },
        { value: "Several buildings", label: "Desk and room structure" },
        { value: "Step by step", label: "Rollout via pilot groups" },
      ],
    },
  },
  {
    id: "catena-x-preparation",
    origin: "employer",
    category: "transformation",
    period: "2026 - laufend",
    status: "preparation",
    kind: "Datenraum",
    title: "Catena-X - Vorbereitung Datenraum & Traceability",
    anchor: "Tier-2 Automotive · Kundenanforderung Automobil-OEM · Vorbereitung",
    context:
      "Ein Automobil-OEM fordert von seinen Zulieferern die Anbindung an das Catena-X-Datenökosystem. Damit verbunden sind Anforderungen an die Rückverfolgbarkeit in der Lieferkette bis auf Einzelteilebene.",
    intervention:
      "Vorbereitung der Catena-X-Anbindung: Bewertung der Onboarding-Optionen, Aufnahme der Anforderungen an Lieferketten- und Einzelteil-Rückverfolgbarkeit (u. a. über Maschinendaten) und erste Architekturentscheidungen. Das Vorhaben befindet sich in der Vorbereitung und ist nicht abgeschlossen.",
    metrics: [
      { value: "Vorbereitung", label: "Kein Abschluss" },
      { value: "Onboarding", label: "Optionen bewertet" },
      { value: "Traceability", label: "Anforderungen aufgenommen" },
    ],
    tags: ["Catena-X", "Traceability", "Datenraum", "Supply Chain"],
    en: {
      kind: "Data Space",
      title: "Catena-X - Preparing Data Space Connection & Traceability",
      anchor: "Tier-2 automotive · Requirement from an automotive OEM · Preparation",
      context:
        "An automotive OEM requires its suppliers to connect to the Catena-X data ecosystem. This comes with requirements for supply-chain traceability down to individual parts.",
      intervention:
        "Preparing the Catena-X connection: assessing onboarding options, capturing requirements for supply-chain and part-level traceability (including via machine data), and making initial architecture decisions. The initiative is in preparation and not completed.",
      metrics: [
        { value: "Preparation", label: "Not completed" },
        { value: "Onboarding", label: "Options assessed" },
        { value: "Traceability", label: "Requirements captured" },
      ],
    },
  },
  {
    id: "aboutexport-saas",
    origin: "own",
    category: "engineering",
    period: "2026 - laufend",
    status: "ongoing",
    kind: "SaaS Build",
    title: "AboutExport - SaaS für Exportkontroll-Compliance",
    anchor: "Eigenes Vorhaben · Pre-Launch 2026 · TypeScript + AI",
    context:
      "Exportkontrolle ist im Mittelstand ein Compliance-Thema mit hohem manuellen Aufwand: Klassifizierung, Endverbleibs-Prüfung, Sanktionslisten-Abgleich. Bestehende Tools im Markt sind enterprise-schwer und teuer.",
    intervention:
      "Konzeption und Build eines SaaS-Produkts für Exportkontroll-Compliance. KI-gestützte Klassifizierung von Gütern und Endverbleibs-Indikatoren, integrierte Sanktionslisten-Abfrage, Workflow-Engine für Freigaben. Stack: TypeScript, Node, modernes Frontend, Datenbank-Layer mit Audit. Eigene Bude, eigenes Tempo.",
    metrics: [
      { value: "Pre-Launch", label: "2026" },
      { value: "AI-First", label: "Klassifizierung + Listenabgleich" },
      { value: "Workflow", label: "Freigaben + Audit-Trail" },
    ],
    tags: ["SaaS", "TypeScript", "AI", "Compliance", "Build"],
    blogSlug: "2026-04-20-warum-ich-aboutexport-baue",
  },

  // ─── 2025 ───────────────────────────────────────────────
  {
    id: "sap-modernization-azure",
    origin: "employer",
    category: "enterprise",
    period: "2025 - 2027",
    status: "ongoing",
    kind: "Architecture",
    title: "SAP Landscape Modernization in die Private Cloud",
    anchor: "Tier-2 Automotive · SAP S/4HANA · Azure · Zielarchitektur & Roadmap",
    context:
      "On-Premises SAP-Betrieb mit hohem technischen Schulden-Niveau, Custom-Code-Wildwuchs, kein Clean Core. Vorbereitung auf AI-gestützte SAP-Use-Cases (Joule, SAP OC) nicht möglich. Roadmap-Druck bis 2027.",
    intervention:
      "Erarbeitung von Zielarchitektur und Modernisierungs-Roadmap für eine historisch gewachsene SAP-Landschaft: SAP on Azure, Clean-Core-Ansatz mit Bewertung des Custom Codes, Identity- und SSO-Konzept, Teststrategie sowie Cutover- und Hypercare-Konzept. Meine Rolle umfasst Architektur und Roadmap, nicht die Gesamtumsetzung des Programms.",
    metrics: [
      { value: "2027", label: "Roadmap-Horizont" },
      { value: "Clean Core", label: "Zielbild definiert" },
      { value: "Architektur", label: "+ Roadmap, keine Gesamtumsetzung" },
    ],
    tags: ["SAP S/4HANA", "Azure", "Clean Core", "Zielarchitektur", "Roadmap"],
    en: {
      kind: "Architecture",
      title: "SAP Landscape Modernization into the Private Cloud",
      anchor: "Tier-2 automotive · SAP S/4HANA · Azure · Target architecture & roadmap",
      context:
        "On-premises SAP operations with significant technical debt, sprawling custom code and no clean core. AI-supported SAP use cases (Joule, SAP OC) were out of reach. Roadmap pressure through 2027.",
      intervention:
        "Developing the target architecture and modernization roadmap for an SAP landscape that grew over many years: SAP on Azure, a clean-core approach with custom-code assessment, an identity and SSO concept, a test strategy, and cutover and hypercare concepts. My role covers architecture and roadmap, not the end-to-end delivery of the program.",
      metrics: [
        { value: "2027", label: "Roadmap horizon" },
        { value: "Clean core", label: "Target state defined" },
        { value: "Architecture", label: "+ roadmap, not full delivery" },
      ],
    },
  },
  {
    id: "plm-web-client-evolution",
    origin: "employer",
    category: "enterprise",
    period: "2025 - 2026",
    status: "ongoing",
    kind: "Platform",
    title: "PLM-Weiterentwicklung & Vorbereitung Web-Client-Wechsel",
    anchor: "Tier-2 Automotive · PLM · CONTACT CIM Database",
    context:
      "Die zentrale PLM-Plattform führt Produktdaten und Entwicklungsprozesse. Anders als die EDM-Plattform für CAD- und Engineering-Daten steht hier die Produktdaten- und Prozessführung im Mittelpunkt. Plattform und Betriebsumgebung mussten auf einen aktuellen Stand gebracht und auf den nächsten Major-Release vorbereitet werden.",
    intervention:
      "Betrieb und Weiterentwicklung der PLM-Plattform CONTACT CIM Database. Servicelevel-Update einschließlich Migration von Betriebssystem und Laufzeitumgebung, strukturierte Testphasen mit den Fachbereichen und Aufbau einer Key-User-Organisation. Parallel Vorbereitung des Major-Release-Wechsels auf einen reinen Web-Client.",
    metrics: [
      { value: "Servicelevel", label: "Update inkl. OS + Runtime" },
      { value: "Key-User", label: "Organisation aufgebaut" },
      { value: "Web-Client", label: "Major-Release vorbereitet" },
    ],
    tags: ["PLM", "CIM Database", "Key-User", "Release-Management"],
    en: {
      kind: "Platform",
      title: "PLM Evolution & Preparing the Move to a Web Client",
      anchor: "Tier-2 automotive · PLM · CONTACT CIM Database",
      context:
        "The central PLM platform manages product data and development processes. Unlike the EDM platform for CAD and engineering data, its focus is product data and process management. The platform and its runtime environment had to be brought up to date and prepared for the next major release.",
      intervention:
        "Operating and evolving the PLM platform CONTACT CIM Database. Service-level update including migration of the operating system and runtime environment, structured test phases with the business units, and a key-user organization. In parallel, preparing the major-release switch to a web-only client.",
      metrics: [
        { value: "Service level", label: "Update incl. OS + runtime" },
        { value: "Key users", label: "Organization established" },
        { value: "Web client", label: "Major release prepared" },
      ],
    },
  },
  {
    id: "braum-x-hub",
    origin: "own",
    category: "engineering",
    period: "2025 - laufend",
    status: "ongoing",
    kind: "Build",
    title: "braum.x - Personal Identity Hub",
    blogSlug: "2026-05-10-vier-websites-mit-claude-code",
    anchor: "Eigenes Vorhaben · Astro 5 · braum.me / stefanbraum.de / braum.org / braum.dev",
    context:
      "Eigene Web-Properties mit klaren Rollen statt einer monolithischen Personal-Site. braum.me als Concierge-Visitenkarte (3-Sekunden-Hook), stefanbraum.de als Editorial-Hub, braum.org als Venture-Übersicht, braum.dev als Engineering-Sandbox. Alles aus einer Brand- und Tech-Linie.",
    intervention:
      "Eigen-Build des Hub-Stacks auf Astro 5, TypeScript strict, Tailwind 4 und @astrojs/node. Forest-Green-Palette als Visual-Foundation, Editorial-First-Layout. Three.js-Skill-Sphere, GSAP-Entry-Animationen, AmbientShader (lazy via Idle-Callback), DIY SplitText, Custom-Cursor. Self-hosted auf Coolify mit Docker Multi-Stage. Repos OSS auf GitHub als sanitized Snapshots.",
    metrics: [
      { value: "4 Properties", label: "Eine Brand-Linie" },
      { value: "Astro 5", label: "+ TypeScript strict" },
      { value: "Self-Host", label: "Coolify + Docker" },
    ],
    tags: ["Astro", "TypeScript", "Tailwind", "Three.js", "OSS"],
  },
  {
    id: "modern-intranet-ai-knowledge-agent",
    origin: "employer",
    category: "ai",
    period: "2025 - 2026",
    status: "handed-over",
    kind: "Applied AI",
    title: "Modern Intranet Redesign & AI Knowledge Agent",
    anchor: "Tier-2 Automotive · 2.800 MA · SharePoint-basiert",
    context:
      "Klassisches Intranet als Friedhof von Dokumenten. Wissen verteilt zwischen SharePoint, Teams, HR-Tools, Prozess-Handbüchern. Mitarbeiter finden Antworten nicht oder zu langsam. Bedarf an einem modernen Wissens-Layer für das unternehmensweite Wissen.",
    intervention:
      "Konzeption eines modernen SharePoint-Intranets mit KI-gestützter Wissenssuche: Orchestrator-Agent mit spezialisierten HR-, IT- und Prozess-Agenten, RAG, Quellenverwaltung und Governance. Das Projekt wurde konzipiert und vollständig an das verantwortliche Team übergeben.",
    metrics: [
      { value: "SharePoint", label: "Plattform-Foundation" },
      { value: "Orchestrator", label: "+ HR-, IT- und Prozess-Agenten" },
      { value: "Übergeben", label: "An das verantwortliche Team" },
    ],
    tags: ["AI", "Knowledge", "Multi-Agent", "RAG", "SharePoint"],
    en: {
      kind: "Applied AI",
      title: "Modern Intranet Redesign & AI Knowledge Agent",
      anchor: "Tier-2 automotive · 2,800 employees · SharePoint-based",
      context:
        "A classic intranet that had become a document graveyard. Knowledge was scattered across SharePoint, Teams, HR tools and process manuals, and employees could not find answers, or not fast enough. A modern knowledge layer for company-wide knowledge was needed.",
      intervention:
        "Concept for a modern SharePoint intranet with AI-supported knowledge search: an orchestrator agent with specialized HR, IT and process agents, RAG, source management and governance. The project was designed and fully handed over to the responsible team.",
      metrics: [
        { value: "SharePoint", label: "Platform foundation" },
        { value: "Orchestrator", label: "+ HR, IT and process agents" },
        { value: "Handed over", label: "To the responsible team" },
      ],
    },
  },
  {
    id: "hr-transformation-evaluation",
    origin: "employer",
    category: "transformation",
    period: "2025 - 2026",
    status: "pre-evaluation-completed",
    kind: "Evaluation",
    title: "HR Transformation - Vorevaluierung Nachfolge SAP HCM",
    anchor: "Tier-2 Automotive · HR · Lebenszyklus SAP HCM",
    context:
      "Der Lebenszyklus von SAP HCM macht eine Modernisierung der HR-Systemlandschaft notwendig. HR-Prozesse und -Daten hängen am bestehenden System.",
    intervention:
      "Vorevaluierung der HR-Systemmodernisierung: Vergleich von SuccessFactors, Dynamics HR und Workday nach Funktionsumfang, TCO und Integrationen. Daraus entstanden eine erste Zielarchitektur, Migrationsoptionen und eine IT-seitige Entscheidungsvorlage für das Management.",
    metrics: [
      { value: "3 Systeme", label: "Funktion, TCO, Integration" },
      { value: "Zielarchitektur", label: "Erste Fassung" },
      { value: "Vorlage", label: "IT-seitig für das Management" },
    ],
    tags: ["HR", "SAP HCM", "Evaluierung", "Zielarchitektur"],
    en: {
      kind: "Evaluation",
      title: "HR Transformation - Pre-Evaluation of the SAP HCM Successor",
      anchor: "Tier-2 automotive · HR · SAP HCM lifecycle",
      context:
        "The SAP HCM lifecycle makes modernizing the HR system landscape necessary. HR processes and data are tied to the existing system.",
      intervention:
        "Pre-evaluation of the HR system modernization: comparing SuccessFactors, Dynamics HR and Workday on functionality, TCO and integrations. The result was an initial target architecture, migration options and an IT-side decision paper for management.",
      metrics: [
        { value: "3 systems", label: "Function, TCO, integration" },
        { value: "Target architecture", label: "Initial version" },
        { value: "Decision paper", label: "IT perspective for management" },
      ],
    },
  },
  {
    id: "adobe-sign-digital-signature",
    origin: "employer",
    category: "transformation",
    period: "2025 - 2026",
    status: "completed",
    kind: "Adoption",
    title: "Adobe Sign End-to-End Digital Signature",
    anchor: "Tier-2 Automotive · Cross-Function · Papierloser Workflow",
    context:
      "Vertragsabschlüsse, interne Freigaben und HR-Dokumente liefen über gedruckte und gescannte Signaturen. Postzeit, Liegezeiten und Medienbrüche prägten den Prozess. Compliance-Druck (Nachvollziehbarkeit, Audit-Trail) wuchs.",
    intervention:
      "Einführung Adobe Sign als zentrales E-Signature-Tool. Integration in M365 und HR-/Vertrags-Workflows, Use-Case-Katalog mit Fachbereichen, Rechte- und Vorlagen-Modell. Adoption-Strategie mit Wave-Plan und Stakeholder-Mapping. Anbindung an Compliance- und Audit-Anforderungen.",
    metrics: [
      { value: "M365-Integriert", label: "Workflow-nativ" },
      { value: "Audit-Trail", label: "End-to-End" },
      { value: "Cross-Func", label: "HR + Verträge + Freigaben" },
    ],
    tags: ["Adobe Sign", "E-Signature", "Adoption", "Compliance"],
  },
  {
    id: "lexisnexis-patent-analytics",
    origin: "employer",
    category: "ai",
    period: "2025 - 2026",
    status: "completed",
    kind: "Applied AI",
    title: "LexisNexis Patent Analytics Enablement",
    anchor: "Tier-2 Automotive · R&D + IP · PatentSight & TechDiscovery",
    context:
      "Innovations- und Patent-Recherche manuell, langsam und auf einzelne Spezialisten konzentriert. Konkurrenzbeobachtung und Whitespace-Analyse blieben qualitativ. Bedarf, R&D systematisch mit KI-gestützter Patent-Analytik anzureichern.",
    intervention:
      "Einführung von LexisNexis PatentSight und TechDiscovery als KI-gestützte IP-Plattform. Use-Case-Definition gemeinsam mit Innovation- und Patent-Verantwortlichen. Integration in das Innovations-Dashboard, Schulung der Power-User, Aufbau eines Reporting-Standards für Wettbewerbs- und Whitespace-Analysen.",
    metrics: [
      { value: "PatentSight", label: "+ TechDiscovery live" },
      { value: "R&D", label: "Whitespace-Analytik" },
      { value: "Power-User", label: "Enablement-Pfad" },
    ],
    tags: ["AI", "IP-Analytics", "PatentSight", "Innovation", "R&D"],
  },

  // ─── 2024 ───────────────────────────────────────────────
  {
    id: "copilot-adoption-program",
    origin: "employer",
    category: "ai",
    period: "2024 - 2026",
    status: "ongoing",
    kind: "Program",
    title: "Microsoft Copilot & Agents Programm",
    anchor: "Tier-2 Automotive · Cross-Function · Von Greenfield zum Agent-Programm",
    context:
      "Microsoft 365 Copilot kam ohne Strategie, definierte Use-Cases oder Betriebsmodell ins Unternehmen. Praktisches Verständnis dafür, was KI im Tagesgeschäft leisten kann, fehlte; es bestand das Risiko von Schatten-AI in den Fachbereichen.",
    intervention:
      "Aufbau des M365-Copilot-Programms von null bis zum unternehmensweiten Agent-Programm. Phase 1: Pilotgruppen, Champions-Netzwerk, Lizenz- und Datenschutz-Governance, Schulungen, Prompt-Coaching und Erfolgsmessung. Phase 2: Custom Agents mit Use-Cases in IT, Exportkontrolle, Logistik und HR, Agent-Governance, Enabler in den Fachbereichen, Feedback-Loops und eine Organizational-Skilling-Initiative mit Microsoft.",
    metrics: [
      { value: "Greenfield", label: "Von 0 aufgebaut" },
      { value: "4 Domänen", label: "IT, Export, Logistik, HR" },
      { value: "Governance", label: "Lizenz, Datenschutz, Agents" },
    ],
    tags: ["AI", "Copilot", "Agents", "Adoption", "Change-Management"],
    en: {
      kind: "Program",
      title: "Microsoft Copilot & Agents Program",
      anchor: "Tier-2 automotive · Cross-functional · From greenfield to agent program",
      context:
        "Microsoft 365 Copilot arrived without a strategy, defined use cases or an operating model. Practical understanding of what AI can do in day-to-day work was missing, and shadow AI in the business units was a real risk.",
      intervention:
        "Building the M365 Copilot program from zero to a company-wide agent program. Phase 1: pilot groups, a champions network, licensing and data-protection governance, training, prompt coaching and success measurement. Phase 2: custom agents with use cases in IT, export control, logistics and HR, agent governance, enablers in the business units, feedback loops and an organizational skilling initiative with Microsoft.",
      metrics: [
        { value: "Greenfield", label: "Built from zero" },
        { value: "4 domains", label: "IT, export, logistics, HR" },
        { value: "Governance", label: "Licensing, privacy, agents" },
      ],
    },
  },
  {
    id: "global-it-governance-service-management",
    origin: "employer",
    category: "leadership",
    period: "2024 - 2026",
    status: "ongoing",
    kind: "Operating Model",
    title: "Global IT Governance & Service Management",
    anchor: "Tier-2 Automotive · 6 Standorte · DE, HU, UA, MK, MX, TN",
    context:
      "IT-Teams an sechs Standorten in sechs Ländern arbeiteten mit unterschiedlichen Abläufen, Standards und Dokumentationsständen. Der Service Desk brauchte eine Struktur, die sich an Services statt an Systemen orientiert.",
    intervention:
      "Aufbau gemeinsamer Governance- und Service-Strukturen für die IT-Teams an 6 Standorten (DE, HU, UA, MK, MX, TN): Global IT Meetings und regelmäßige Calls, gemeinsame Standards und Dokumentationspflichten. Dazu kontinuierliche Optimierung des Service Desks mit serviceorientierter Kategorienstruktur und Maßnahmen zur Akzeptanzverbesserung.",
    metrics: [
      { value: "6 Standorte", label: "Gemeinsame Standards" },
      { value: "Global IT", label: "Meetings + regelmäßige Calls" },
      { value: "Service Desk", label: "Serviceorientierte Kategorien" },
    ],
    tags: ["IT-Governance", "Service Management", "Service Desk", "Global IT"],
    en: {
      kind: "Operating Model",
      title: "Global IT Governance & Service Management",
      anchor: "Tier-2 automotive · 6 sites · DE, HU, UA, MK, MX, TN",
      context:
        "IT teams at six sites in six countries worked with different processes, standards and levels of documentation. The service desk needed a structure organized around services rather than systems.",
      intervention:
        "Establishing shared governance and service structures for the IT teams at 6 sites (DE, HU, UA, MK, MX, TN): global IT meetings and regular calls, common standards and documentation requirements. Alongside, continuous improvement of the service desk with a service-oriented category structure and measures to increase user acceptance.",
      metrics: [
        { value: "6 sites", label: "Common standards" },
        { value: "Global IT", label: "Meetings + regular calls" },
        { value: "Service desk", label: "Service-oriented categories" },
      ],
    },
  },
  {
    id: "sosafe-security-awareness",
    origin: "employer",
    category: "compliance",
    period: "seit 2024",
    status: "in-operation",
    kind: "Program",
    title: "SoSafe Security Awareness Programm",
    anchor: "Tier-2 Automotive · 2.800 MA · Mehrsprachig",
    context:
      "Phishing- und Social-Engineering-Risiko als größter realer Angriffspfad. Awareness-Maßnahmen waren einmalige Schulungen, kein kontinuierlicher Loop, kein Reifegrad-Reporting an Geschäftsführung.",
    intervention:
      "Einführung SoSafe als kontinuierliches Awareness-Programm. Mehrsprachige Lerninhalte, regelmäßige Phishing-Simulationen, Klickraten-Tracking und Reifegrad-KPIs. Roll-out-Strategie pro Standort, Eskalations-Pfad bei wiederholter Auffälligkeit, Verankerung im ISMS-Maßnahmen-Backlog. Das Programm wird kontinuierlich weiterentwickelt, unter anderem um neue Module.",
    metrics: [
      { value: "Mehrsprachig", label: "Globale Belegschaft" },
      { value: "Phishing-Sim", label: "Kontinuierlich" },
      { value: "KPI", label: "Reifegrad-Reporting" },
    ],
    tags: ["Awareness", "SoSafe", "Phishing", "ISMS-Linked"],
  },
  {
    id: "ai-elearning-platform",
    origin: "employer",
    category: "ai",
    period: "2024 - 2026",
    status: "in-operation",
    kind: "Applied AI",
    title: "AI-Enabled E-Learning Platform mit multilingualen Avataren",
    anchor: "Tier-2 Automotive · 2.800 MA · 6 Sprachen",
    context:
      "Klassische E-Learning-Inhalte teuer in Produktion und Lokalisierung, schwer aktuell zu halten. Globale Belegschaft an mehreren Standorten benötigt Schulungsinhalte in mehreren Sprachen, schnell, ohne Studio-Setup.",
    intervention:
      "Aufbau einer AI-Enabled-Lernplattform auf Moodle mit HeyGen (Video-AI) und ElevenLabs (Voice-AI). Content-Pipeline für Avatar-basierte Schulungsvideos in 6 Sprachen, ohne externe Produktion. Integration in den Learning-Lifecycle (Authoring, Review, Veröffentlichung, Reporting). Governance-Modell für Stimm- und Avatar-Klone, rechtliche Klärung.",
    metrics: [
      { value: "6", label: "Sprachen aus einem Source" },
      { value: "Avatar+Voice", label: "HeyGen + ElevenLabs" },
      { value: "Moodle", label: "Plattform-Foundation" },
    ],
    tags: ["AI", "E-Learning", "HeyGen", "ElevenLabs", "Moodle"],
  },
  {
    id: "azure-landing-zone",
    origin: "employer",
    category: "enterprise",
    period: "2024 - 2025",
    kind: "Foundation",
    title: "Azure Landing Zone Level 400 als Enterprise-Foundation",
    anchor: "Tier-2 Automotive · 2.800 MA · Hybrid-Workloads",
    context:
      "Wachsender Bedarf an Cloud-Workloads ohne tragfähige Foundation. Subscription-Wildwuchs, fehlende Policies, kein einheitliches Tagging. Risk: jedes Workload-Team baut eigene Standards.",
    intervention:
      "Konzeption und Implementierung Azure Landing Zone bis Level 400. Management Groups, Subscription-Layout, Naming/Tagging-Standards. Security-Baseline (Policy-Framework, RBAC, zentrales Logging, Netzwerk- und Identity-Integration). Infrastructure as Code als Standard für jedes Workload und jede Konfiguration - Templates, Module, GitOps-Workflows. Onboarding-Prozess zwischen Plattform- und Workload-Teams.",
    metrics: [
      { value: "Level 400", label: "Reifegrad erreicht" },
      { value: "IaC", label: "Infrastructure as Code Standard" },
      { value: "12 Mo", label: "End-to-End umgesetzt" },
    ],
    tags: ["Azure", "Landing Zone", "IaC", "GitOps", "Governance"],
  },

  // ─── 2023 ───────────────────────────────────────────────
  {
    id: "managed-soc-endpoint-security",
    origin: "employer",
    category: "enterprise",
    period: "2023 - 2026",
    status: "in-operation",
    kind: "Security Operations",
    title: "Managed SOC & Endpoint Security - 24/7 Detection & Response",
    anchor: "Tier-2 Automotive · Managed-SOC-Anbieter · Cloud, On-Premises & Endpoints",
    context:
      "Ziel war eine durchgängige Erkennung und Reaktion rund um die Uhr über Cloud-, On-Premises- und Endpoint-Umgebungen, mit einer zentralen Sicht statt verteilter Einzelquellen.",
    intervention:
      "Einführung eines Managed Security Operations Centers mit einem spezialisierten Anbieter. Zusammenführung von Cloud-, On-Premises- und Endpoint-Telemetrie, Detection Use-Cases, Response Playbooks und kontinuierliches Tuning. Erweitert um die Endpoint-Security- und Endpoint-Management-Lösung desselben Anbieters.",
    metrics: [
      { value: "24/7", label: "Detection & Response" },
      { value: "Cloud + On-Prem", label: "+ Endpoint-Telemetrie" },
      { value: "Endpoint", label: "Security + Management ergänzt" },
    ],
    tags: ["SOC", "Detection & Response", "Endpoint Security", "Managed Service"],
    en: {
      kind: "Security Operations",
      title: "Managed SOC & Endpoint Security - 24/7 Detection & Response",
      anchor: "Tier-2 automotive · Managed SOC provider · Cloud, on-premises & endpoints",
      context:
        "The goal was continuous, round-the-clock detection and response across cloud, on-premises and endpoint environments, with one central view instead of scattered individual sources.",
      intervention:
        "Introduction of a managed security operations center with a specialized provider. Consolidation of cloud, on-premises and endpoint telemetry, detection use cases, response playbooks and continuous tuning. Extended with the same provider's endpoint security and endpoint management solution.",
      metrics: [
        { value: "24/7", label: "Detection & response" },
        { value: "Cloud + on-prem", label: "+ endpoint telemetry" },
        { value: "Endpoint", label: "Security + management added" },
      ],
    },
  },
  {
    id: "cyber-risk-bcm-framework",
    origin: "employer",
    category: "compliance",
    period: "2023 - 2024",
    status: "completed",
    kind: "Framework",
    title: "Cyber Risk Management & BCM Framework",
    anchor: "Tier-2 Automotive · 2.800 MA · Krisen-Resilienz",
    context:
      "Kein durchgängiges Cyber-Risk-Modell, BCM-Pläne pro Standort fragmentiert. Tabletop-Übungen sporadisch, Eskalations- und Kommunikationspfade in einer Krise unklar. Versicherungs- und Audit-Druck steigend.",
    intervention:
      "Aufbau eines konzernweiten Cyber-Risk-Frameworks (Risiko-Inventar, Bewertungs-Methodik, Maßnahmen-Tracking). Business-Continuity-Pläne harmonisiert, kritische Geschäftsprozesse priorisiert, Wiederanlauf-Zeiten definiert. Tabletop-Exercise mit Geschäftsführung und IT-Leads. Notfallpläne und Kommunikations-Templates verankert.",
    metrics: [
      { value: "Konzern-weit", label: "Risk-Modell vereinheitlicht" },
      { value: "BCM-Pläne", label: "Wiederanlauf priorisiert" },
      { value: "Tabletop", label: "Mit Geschäftsführung geübt" },
    ],
    tags: ["Cyber Risk", "BCM", "Framework"],
  },

  // ─── 2022 ───────────────────────────────────────────────
  {
    id: "global-bi-platform",
    origin: "employer",
    category: "transformation",
    secondaryCategories: ["leadership"],
    period: "2022 - 2026",
    status: "ongoing",
    kind: "Platform",
    title: "Data, KPI & BI-Plattform inkl. KPI-Datenerfassungsplattform",
    anchor: "Tier-2 Automotive · Cross-Function · Team, Plattform, KPIs",
    context:
      "Reporting-Wildwuchs aus Excel-Inseln und lokalen Power-BI-Lösungen, keine konsolidierte Sicht über die globale Organisation. KPI-Definitionen pro Werk und Funktion unterschiedlich, Management-Reports manuell zusammengetragen, KPI-Erfassung in Excel.",
    intervention:
      "Vier Bausteine: Team Data Analytics & BI mitaufgebaut und strategisch weiterentwickelt. Globale BI-Plattform mit SAP Analytics Cloud, SAP Datasphere/DWC, Power BI und Microsoft Fabric, Migration lokaler Reports, Governance und Self-Service. KPI-Restrukturierung mit einheitlichen Definitionen über Werke und Fachbereiche, klaren Datenverantwortlichkeiten und Konsolidierung heterogener Excel-Reports. Neu: eine zentrale KPI-Datenerfassungsplattform löst die Excel-basierte Erfassung ab, u. a. für ISMS-, IT- und OT-KPIs, mit automatisierten Datenflüssen.",
    metrics: [
      { value: "Team", label: "Data Analytics & BI" },
      { value: "SAC + Datasphere", label: "+ Power BI + Fabric" },
      { value: "KPI-Erfassung", label: "Zentral statt Excel" },
    ],
    tags: ["Data", "BI", "KPI", "SAP SAC", "Power BI", "Microsoft Fabric"],
    en: {
      kind: "Platform",
      title: "Data, KPI & BI Platform incl. KPI Data Capture Platform",
      anchor: "Tier-2 automotive · Cross-functional · Team, platform, KPIs",
      context:
        "Reporting sprawl across Excel islands and local Power BI solutions, with no consolidated view of the global organization. KPI definitions differed by plant and function, management reports were compiled by hand, and KPIs were captured in Excel.",
      intervention:
        "Four building blocks: co-building the Data Analytics & BI team and developing it strategically. A global BI platform with SAP Analytics Cloud, SAP Datasphere/DWC, Power BI and Microsoft Fabric, including migration of local reports, governance and self-service. KPI restructuring with consistent definitions across plants and business units, clear data ownership and consolidation of heterogeneous Excel reports. New: a central KPI data capture platform replaces Excel-based collection, including ISMS, IT and OT KPIs, with automated data flows.",
      metrics: [
        { value: "Team", label: "Data analytics & BI" },
        { value: "SAC + Datasphere", label: "+ Power BI + Fabric" },
        { value: "KPI capture", label: "Central instead of Excel" },
      ],
    },
  },
  {
    id: "autodesk-vault-edm",
    origin: "employer",
    category: "enterprise",
    period: "2022 - 2023",
    kind: "Platform",
    title: "Autodesk Vault EDM-Plattform für Engineering-Daten",
    anchor: "Tier-2 Automotive · R&D + Konstruktion",
    context:
      "Engineering- und CAD-Daten verteilt auf Fileservern, lokale Versionierung pro Konstrukteur. Kein Vault, keine zentrale Suche, kein Zugriffs- oder Lifecycle-Modell für Engineering-Artefakte. Wachsende Komplexität durch Multi-Site-Konstruktion.",
    intervention:
      "Einführung Autodesk Vault als zentrale EDM-Plattform für Konstruktions-Daten. Anbindung CAD-Tools, Migration der Bestandsdaten, Rechte- und Lifecycle-Modell für Bauteile, Baugruppen und Zeichnungen. Schnittstelle zu PLM-Strukturen und Stammdaten in SAP. Schulung der Konstruktions-Teams.",
    metrics: [
      { value: "Vault", label: "EDM-Foundation" },
      { value: "CAD-Linked", label: "Multi-Site-fähig" },
      { value: "Lifecycle", label: "Versionen + Freigaben" },
    ],
    tags: ["Autodesk Vault", "EDM", "CAD", "PLM"],
  },
  {
    id: "it-due-diligence",
    origin: "employer",
    category: "compliance",
    period: "2022",
    status: "completed",
    kind: "Assessment",
    title: "IT Due Diligence Pre-Acquisition Assessment",
    anchor: "Tier-2 Automotive · M&A · IT-Bewertung",
    context:
      "Für ein geplantes Akquisitionsvorhaben mussten IT-Landschaft, Risiken und Integrationsaufwand innerhalb eines festen Zeitfensters bewertet werden.",
    intervention:
      "IT-Due-Diligence im Auftrag der Geschäftsführung: Bewertung von Infrastruktur, Anwendungen, Lizenzen, Verträgen, IT-Security, Compliance und Personal. Daraus eine Risikoanalyse und ein Entscheidungsbericht für die Geschäftsführung.",
    metrics: [
      { value: "End-to-End", label: "IT-Landschaft bewertet" },
      { value: "Risikoanalyse", label: "Strukturiert" },
      { value: "Bericht", label: "Entscheidungsgrundlage" },
    ],
    tags: ["M&A", "Due Diligence", "Assessment"],
    en: {
      kind: "Assessment",
      title: "IT Due Diligence Pre-Acquisition Assessment",
      anchor: "Tier-2 automotive · M&A · IT assessment",
      context:
        "For a planned acquisition, the IT landscape, risks and integration effort had to be assessed within a fixed time window.",
      intervention:
        "IT due diligence on behalf of executive management: assessment of infrastructure, applications, licenses, contracts, IT security, compliance and staff. The result was a risk analysis and a decision report for executive management.",
      metrics: [
        { value: "End-to-end", label: "IT landscape assessed" },
        { value: "Risk analysis", label: "Structured" },
        { value: "Report", label: "Basis for decision" },
      ],
    },
  },

  // ─── 2021 ───────────────────────────────────────────────
  {
    id: "team-aufbau-apps",
    origin: "employer",
    category: "leadership",
    period: "2021 - laufend",
    kind: "Team-Build",
    title: "Aufbau Team IT Applications",
    anchor: "Tier-2 Automotive · Neues Sub-Team · Globale Coverage",
    context:
      "Kein dediziertes Applications-Team in der bestehenden IT-Organisation. Anwendungen wurden ad-hoc zwischen Infrastructure-Team und Fachbereichen verwaltet, unklare Verantwortung, keine Lieferfähigkeit für M365-, AI- oder Eigenentwicklungs-Initiativen.",
    intervention:
      "Komplett-Aufbau eines neuen IT-Sub-Teams für Applications bei ODW-ELEKTRIK: Hiring, Onboarding, Skill-Profile, Verantwortungsmatrix, Kommunikation in die bestehende IT-Organisation. Heute eigene Lieferfähigkeit mit Direct Reports und Mandate-Coverage über die globale Organisation.",
    metrics: [
      // Anzahl der Direct Reports offen (5 oder 6), bis zur Freigabe ohne Zahl.
      { value: "Direct Reports", label: "Disziplinarische Führung" },
      { value: "Global", label: "Mandate-Coverage" },
      { value: "Greenfield", label: "Team-Build" },
    ],
    tags: ["Team-Aufbau", "Hiring", "Operating Model", "Leadership"],
    hidePill: true,
  },
  {
    id: "m365-zero-trust-identity",
    origin: "employer",
    category: "enterprise",
    period: "2021 - 2022",
    kind: "Program",
    title: "M365 Zero Trust & Single Identity Architecture",
    anchor: "Tier-2 Automotive · 2.800 MA · 6 Sites international",
    context:
      "Heterogene Identity-Landschaft mit lokalen ADs pro Standort, fragmentiertes MFA, kein einheitliches Conditional Access. Zero-Trust-Anspruch auf Papier, in der Realität kein durchgängiges Modell. Lifecycle-Prozesse manuell.",
    intervention:
      "Konzeption und Roll-out einer Single-Identity-Architektur auf Microsoft Entra ID. Conditional Access als zentrales Policy-Layer, MFA flächendeckend, SSO für Kern-Anwendungen. Identity-Lifecycle-Modell mit klarer Owner-Zuweisung. Migrations- und Cutover-Plan über alle Standorte. Die Authentifizierungsmethoden werden seitdem kontinuierlich weiterentwickelt.",
    metrics: [
      { value: "Single Identity", label: "Konzernweit" },
      { value: "Zero Trust", label: "Conditional Access live" },
      { value: "MFA", label: "Flächendeckend" },
    ],
    tags: ["Zero Trust", "Entra ID", "MFA", "Conditional Access"],
  },

  // ─── 2020 ───────────────────────────────────────────────
  {
    id: "isms-iso27001-tisax",
    origin: "employer",
    category: "compliance",
    period: "2020 - 2023",
    kind: "Program",
    title: "ISMS-Programm bis ISO 27001 Matrix-Zertifizierung & TISAX Level 3",
    anchor: "Tier-2 Automotive · 2.800 MA · 6 Sites international",
    context:
      "Kein einheitliches ISMS, fragmentierte Sicherheits-Policies pro Standort, Druck durch Kundenanforderungen (TISAX) und ISO-Zertifizierungs-Roadmap. Audit-Readiness lag bei null.",
    intervention:
      "Aufbau eines ISMS von Grund auf - Policies, Standards, Risikomanagement, SoA, Dokumentenlenkung, Rollenmodell. Zentrale Security-Prozesse (Incident Handling, Vulnerability Reviews, Maßnahmen-Tracking). ISMS-Workflows automatisiert über Power Automate (Permission Reviews, Audit-Trail, Lieferantenmanagement). Interne Audits geplant und durchgeführt, externe Auditierungen begleitet.",
    metrics: [
      { value: "ISO 27001", label: "Matrix-Zertifizierung erreicht" },
      { value: "TISAX AL3", label: "Label erreicht" },
      { value: "Audits", label: "Intern geplant + extern begleitet" },
    ],
    tags: ["ISMS", "ISO 27001", "TISAX", "Compliance"],
  },
  {
    id: "tenfold-iam-rollout",
    origin: "employer",
    category: "enterprise",
    period: "2020 - 2022",
    kind: "Program",
    title: "Tenfold IAM Einführung mit Self-Service",
    anchor: "Tier-2 Automotive · IAM-Toolchain · Identity Lifecycle",
    context:
      "Berechtigungsverwaltung über manuelle Tickets. Keine Self-Service-Möglichkeit für Fachbereiche, Lifecycle-Schritte zogen sich, Audit-Spuren lückenhaft. Wachsender Druck durch ISMS-Anforderungen.",
    intervention:
      "Einführung von Tenfold als zentrale IAM-Plattform. Anbindung Active Directory, M365, SAP und Fachanwendungen. Self-Service-Anträge mit Approval-Workflows, automatisierter Joiner-Mover-Leaver-Prozess, Re-Zertifizierungs-Kampagnen. Rollenmodell harmonisiert, Audit-Trail über Lifecycle-Ereignisse.",
    metrics: [
      { value: "Self-Service", label: "Berechtigungen in Fachbereichen" },
      { value: "Re-Cert", label: "Kampagnen automatisiert" },
      { value: "Audit-Trail", label: "End-to-End nachvollziehbar" },
    ],
    tags: ["IAM", "Tenfold", "Identity Lifecycle", "Self-Service"],
  },
  {
    id: "sap-r3-s4hana-brownfield",
    origin: "employer",
    category: "enterprise",
    period: "2020 - 2021",
    kind: "Beteiligung",
    title: "SAP R/3 → S/4HANA Brownfield Transition (HCM/HR)",
    anchor: "Tier-2 Automotive · SAP HCM/HR · Mitarbeit in Teilbereichen",
    context:
      "SAP R/3 als Plattform für HR/HCM am End-of-Life-Horizont. Brownfield-Pfad zu S/4HANA gewählt, um Custom-Code und Prozess-Investitionen zu erhalten. Komplexe Custom-Z-Welt im HCM-Kontext.",
    intervention:
      "Mitarbeit in ausgewählten Teilbereichen eines SAP-HCM-Brownfield-Projekts: Unterstützung bei der Custom-Code-Inventur sowie bei der Bewertung von Anpassungen und Schnittstellen. Die Projektverantwortung lag bei den dedizierten SAP-HCM-Teams.",
    metrics: [
      { value: "Brownfield", label: "Pfad mit Custom-Erhalt" },
      { value: "Custom-Code", label: "Inventur unterstützt" },
      { value: "Mitarbeit", label: "In Teilbereichen" },
    ],
    tags: ["SAP S/4HANA", "SAP HCM", "Brownfield", "Migration"],
    en: {
      kind: "Contribution",
      title: "SAP R/3 → S/4HANA Brownfield Transition (HCM/HR)",
      anchor: "Tier-2 automotive · SAP HCM/HR · Contribution to selected areas",
      context:
        "SAP R/3 as the HR/HCM platform was approaching end of life. A brownfield path to S/4HANA was chosen to preserve custom code and process investments. Complex custom Z-objects in the HCM context.",
      intervention:
        "Contribution to selected areas of an SAP HCM brownfield project: supporting the custom-code inventory and the assessment of modifications and interfaces. Project responsibility lay with the dedicated SAP HCM teams.",
      metrics: [
        { value: "Brownfield", label: "Path preserving custom code" },
        { value: "Custom code", label: "Inventory supported" },
        { value: "Contribution", label: "In selected areas" },
      ],
    },
  },

  // ─── 2019 ───────────────────────────────────────────────
  {
    id: "power-platform-coe",
    origin: "employer",
    category: "engineering",
    secondaryCategories: ["transformation"],
    period: "2019 - 2026",
    status: "ongoing",
    kind: "Platform",
    title: "Prozessplattform: Power Platform CoE → Eigenentwicklung als Ablöse",
    anchor: "Tier-2 Automotive · Citizen Developer → Eigenentwicklung · Container",
    context:
      "Schatten-IT durch Excel-Makros und Einzelautomatisierungen, Fachbereiche wollten schneller liefern. Die Power Platform schuf dafür einen kontrollierten Rahmen, stieß in kritischen Szenarien später aber an Grenzen bei Skalierung, Governance und Entwicklungstiefe.",
    intervention:
      "2019-2020: Aufbau eines Power-Platform-Center-of-Excellence mit DEV/TEST/PROD, Connector-Governance, Lizenzierung, Templates, Citizen-Developer-Enablement und Standards für Code-Reviews und die Übergabe an Pro-Code. Ab 2025: Konzeption einer eigenen containerbasierten Prozessplattform als Ablösung der Power Platform, mit Security-by-Design, RBAC, Audit-Logs, UI/UX, CI/CD, DevOps-Betriebsmodell und KI-gestützter Entwicklung mit Quality Gates.",
    metrics: [
      { value: "2019-2020", label: "Power Platform CoE" },
      { value: "Ab 2025", label: "Eigene Prozessplattform" },
      { value: "Container", label: "Security-by-Design + CI/CD" },
    ],
    tags: ["Power Platform", "CoE", "Citizen Developer", "Container", "DevOps"],
    en: {
      kind: "Platform",
      title: "Process Platform: Power Platform CoE → Custom Platform as Replacement",
      anchor: "Tier-2 automotive · Citizen developers → custom build · Containers",
      context:
        "Shadow IT through Excel macros and one-off automations, with business units wanting to deliver faster. The Power Platform provided a controlled framework for this, but later reached its limits in critical scenarios around scaling, governance and development depth.",
      intervention:
        "2019-2020: building a Power Platform center of excellence with DEV/TEST/PROD, connector governance, licensing, templates, citizen-developer enablement and standards for code reviews and hand-off to pro-code. From 2025: designing a custom container-based process platform to replace the Power Platform, with security by design, RBAC, audit logs, UI/UX, CI/CD, a DevOps operating model and AI-assisted development with quality gates.",
      metrics: [
        { value: "2019-2020", label: "Power Platform CoE" },
        { value: "From 2025", label: "Custom process platform" },
        { value: "Containers", label: "Security by design + CI/CD" },
      ],
    },
  },
  {
    id: "modern-workplace-m365",
    origin: "employer",
    category: "transformation",
    period: "2019 - 2020",
    kind: "Migration",
    title: "Modern Workplace Core M365 Migration",
    anchor: "Tier-2 Automotive · 2.800 MA · Exchange Online + Teams + SharePoint + OneDrive",
    context:
      "On-Prem Exchange, Skype-for-Business, Fileserver-Inseln. Mobile Arbeit nur improvisiert möglich, kollaboratives Arbeiten an Dokumenten Workaround. COVID-Druck forcierte den Bedarf an Cloud-Workplace.",
    intervention:
      "Komplett-Migration auf Microsoft 365 als Modern-Workplace-Foundation. Exchange Online, Teams (inkl. Telephony), SharePoint Online und OneDrive als Plattform-Set. Migrations-Wellen mit Co-Existence, Rollback-Plan und Adoption-Begleitung. Fileserver-Konsolidierung in SharePoint mit Information-Architecture.",
    metrics: [
      { value: "2.800 MA", label: "Migriert" },
      { value: "Exchange Online", label: "+ Teams Phone" },
      { value: "SharePoint", label: "Fileserver-Migration" },
    ],
    tags: ["M365", "Exchange Online", "Teams", "SharePoint"],
  },

  // ─── 2018 ───────────────────────────────────────────────
  {
    id: "it-strategie-odw-gesamtlaufzeit",
    origin: "employer",
    category: "leadership",
    period: "2018 - laufend",
    kind: "Strategy",
    title: "IT-Strategie & Roadmap 2030",
    anchor: "Tier-2 Automotive · Hidden Champion · Mehrjährige Linie",
    context:
      "On-prem-getriebener Mittelständler ohne klare Cloud- oder AI-Roadmap. Hohes Daten-Sediment in Legacy-Systemen, IT als reaktiver Service. Wandel-Druck durch Kundenanforderungen, Compliance und Wettbewerb.",
    intervention:
      "Mitgestaltung des Wegs vom on-prem-getriebenen Mittelständler zum AI-enabled, cloud-first IT-Setup eines Hidden Champion. Über die volle Laufzeit: Foundation (LZ, IAM), Modernisierung (SAP, M365), KI-Integration (Copilot, Agents), Sicherheits-Reife (ISMS, SOC). Roadmap 2030 mit Quartalsreviews, Investitionsplanung für IT Applications und Enterprise-Architektur nach TOGAF. Eine IT-Organisation, die auf jede fachliche Frage eine Antwort hat.",
    metrics: [
      { value: "7+ Jahre", label: "Linienverantwortung" },
      { value: "On-Prem → Cloud", label: "Strategischer Wandel" },
      { value: "Reaktiv → Antwortfähig", label: "Operating Model" },
    ],
    tags: ["Strategie", "Roadmap", "Cloud-First", "AI-Enablement", "TOGAF"],
    hidePill: true,
  },
];
