import type { ContentLocale, Localized } from "../i18n/localized.ts";

/** Jahr-Monat im Format "YYYY-MM". */
export type YearMonth = `${number}-${number}`;

export interface TimelineEntry {
  id: string;
  start: YearMonth;
  /** `null` = laufende Station ("Heute"). */
  end: YearMonth | null;
  role: Localized<string>;
  company: string;
  /** Parallel zu einer anderen Station beim selben Arbeitgeber ausgeübt. */
  parallel?: boolean;
  /** Englisch optional - fehlt es, wird Deutsch mit lang="de" ausgeliefert. */
  summary: Localized<string>;
  tags: string[];
}

export const timeline: TimelineEntry[] = [
  {
    id: "braum-consulting",
    start: "2023-06",
    end: null,
    role: { de: "Founder", en: "Founder" },
    company: "Braum Consulting",
    summary: {
      de: "Beratung im Mittelstand zu AI, Enterprise-Architektur und IT-Strategie. Parallel zum Hauptjob, 15 Mandate im Portfolio.",
    },
    tags: ["Consulting", "AI", "Strategy"],
  },
  {
    id: "odw-data-analytics",
    start: "2022-07",
    end: null,
    role: {
      de: "Deputy Teamleader Data Analytics & BI",
      en: "Deputy Teamleader Data Analytics & BI",
    },
    company: "ODW-Elektrik",
    parallel: true,
    summary: {
      de: "Mitverantwortung für Data- & Analytics-Strategie. Aufbau und Governance der BI-Plattform (SAP SAC/DWC, Power BI, Microsoft Fabric). KPI-/Reporting-Standards für Management und Fachbereiche, Self-Service-Enablement.",
    },
    tags: ["BI", "Data", "Governance"],
  },
  {
    id: "odw-team-lead-apps",
    start: "2021-04",
    end: null,
    role: {
      de: "Team Lead IT Applications & dep. Global Head of IT/SAP",
      en: "Team Lead IT Applications & dep. Global Head of IT/SAP",
    },
    company: "ODW-Elektrik",
    summary: {
      de: "Team Lead Applications (Modern Work, AI, IAM, Automatisierung, Eigenentwicklungen). Stellv. Leitung der globalen IT/SAP-Org mit 35 MA, 6 Direct Reports disziplinarisch, Budget bis 3 Mio €. Verantwortung für ISMS, IT-Security und Anwendungs-/Integrationsarchitektur.",
    },
    tags: ["Leadership", "IT/SAP", "ISMS", "Architecture"],
  },
  {
    id: "odw-project-manager",
    start: "2018-08",
    end: "2021-03",
    role: { de: "IT Project Manager", en: "IT Project Manager" },
    company: "ODW-Elektrik",
    summary: {
      de: "Cloud-Transition als Gesamtverantwortung. Modern Work & Communication (Teams, Exchange Online), SharePoint Online DMS, File-Server-Ablösung. Low-Code-Workflows, AR/VR und KI im IoT-Umfeld. Projekt-/Entwicklungsleitung CIM Database (PLM).",
    },
    tags: ["Cloud-Transition", "Modern-Work", "PLM"],
  },
  {
    id: "sumiriko-apprenticeship",
    start: "2014-09",
    end: "2018-06",
    role: { de: "Ausbildung Fachinformatiker für Systemintegration" },
    company: "SumiRiko AVS Germany",
    summary: {
      de: "Tier-1-Automotive-Supplier für Anti-Vibrationssysteme (NVH-Komponenten, 2.500 MA). Drei Jahre Ausbildung, anschließend 1 Jahr fest als IT-Systemadministrator. Windows Server, Citrix, HP, VMware, Client-Imaging und Patching. Das Fundament für alles, was danach kam.",
    },
    tags: ["Windows-Server", "Citrix", "VMware", "Hands-on"],
  },
];

const MONTHS: Record<ContentLocale, readonly string[]> = {
  de: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

function formatYearMonth(value: YearMonth, locale: ContentLocale): string {
  const [year, month] = value.split("-");
  const label = MONTHS[locale][Number(month) - 1] ?? "";
  return `${label} ${year}`;
}

export function startYear(entry: TimelineEntry): string {
  return entry.start.slice(0, 4);
}

/** "Jun 2023 - Heute" / "Aug 2018 - Mär 2021". */
export function formatPeriod(
  entry: TimelineEntry,
  locale: ContentLocale,
  presentLabel: string,
): string {
  const end = entry.end ? formatYearMonth(entry.end, locale) : presentLabel;
  return `${formatYearMonth(entry.start, locale)} - ${end}`;
}
