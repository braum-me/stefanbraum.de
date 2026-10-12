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
  /** Englisch optional - fehlt es, wird Deutsch mit lang="de" ausgeliefert.
      Stand 12.10.2026: alle Stationen sind übersetzt (Test sichert das ab). */
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
      en: "Consulting for mid-sized companies on AI, enterprise architecture and IT strategy. Alongside my main role, with 15 engagements in the portfolio.",
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
      en: "Shared responsibility for the data and analytics strategy. Building and governing the BI platform (SAP SAC/DWC, Power BI, Microsoft Fabric). KPI and reporting standards for management and business units, self-service enablement.",
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
      de: "Team Lead Applications (Modern Work, AI, IAM, Automatisierung, Eigenentwicklungen). Stellv. Leitung der globalen IT/SAP-Org mit 35 MA, Führungsverantwortung für 6 disziplinarische Direct Reports. Verantwortung für IT-Strategie und Anwendungs-/Integrationsarchitektur, ISMS und IT-Security sowie die Steuerung von Transformationsinitiativen.",
      en: "Team lead for applications (modern work, AI, IAM, automation, in-house development). Deputy head of the global IT/SAP organization with 35 staff, with line management of 6 direct reports. Responsible for IT strategy and application/integration architecture, ISMS and IT security, and for steering transformation initiatives.",
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
      en: "Overall responsibility for the cloud transition. Modern work and communication (Teams, Exchange Online), SharePoint Online DMS, replacement of file servers. Low-code workflows, AR/VR and AI in the IoT context. Project and development lead for CIM Database (PLM).",
    },
    tags: ["Cloud-Transition", "Modern-Work", "PLM"],
  },
  {
    id: "sumiriko-apprenticeship",
    start: "2014-09",
    end: "2018-06",
    role: {
      de: "Ausbildung Fachinformatiker für Systemintegration",
      en: "Apprenticeship as IT Specialist for System Integration",
    },
    company: "SumiRiko AVS Germany",
    summary: {
      de: "Tier-1-Automotive-Supplier für Anti-Vibrationssysteme (NVH-Komponenten, 2.500 MA). Drei Jahre Ausbildung, anschließend 1 Jahr fest als IT-Systemadministrator. Windows Server, Citrix, HP, VMware, Client-Imaging und Patching. Das Fundament für alles, was danach kam.",
      en: "Tier-1 automotive supplier of anti-vibration systems (NVH components, 2,500 employees). Three-year apprenticeship, followed by one year as a permanent IT systems administrator. Windows Server, Citrix, HP, VMware, client imaging and patching. The foundation for everything that came after.",
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
