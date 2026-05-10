import type { CaseCategoryId } from "./caseCategories.ts";

export type CaseStatus = "ongoing" | "concept";

export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  category: CaseCategoryId;
  period: string;
  kind: string;
  title: string;
  anchor: string;
  context: string;
  intervention: string;
  metrics: CaseMetric[];
  tags: string[];
  /** Optional override. Auto-detected from period ('laufend' / future-year) wenn nicht gesetzt. */
  status?: CaseStatus;
  /** Hard-Override: keinen Status-Pill anzeigen, auch wenn auto-detect 'ongoing' sagt.
      Nutzbar für laufende Mandate, die nicht als 'Projekt mit Ongoing-Status' wirken sollen
      (z.B. permanente Leadership-Linien, Roadmap-Mandate). */
  hidePill?: boolean;
  /** Optional: Slug eines Blog-Posts der diesen Case ausführlich behandelt.
      Erzeugt im Case-Detail einen 'Im Blog'-Link, im Blog-Post einen Rückverweis. */
  blogSlug?: string;
}

/** Aktueller Bezugszeitraum für Auto-Status. */
const CURRENT_YEAR = 2026;

/** Status ableiten:
    1. hidePill → null (Override)
    2. status explicit gesetzt → status
    3. 'laufend' im period → ongoing
    4. End-Jahr STRENG GROESSER als currentYear → ongoing (zukünftig)
    5. sonst null (abgeschlossen) */
export function caseStatus(c: CaseStudy): CaseStatus | null {
  if (c.hidePill) return null;
  if (c.status) return c.status;
  const period = c.period.toLowerCase();
  if (period.includes("laufend")) return "ongoing";
  const m = c.period.match(/(\d{4})\s*-\s*(\d{4})/);
  if (m && Number.parseInt(m[2] ?? "0", 10) > CURRENT_YEAR) return "ongoing";
  return null;
}

// Reihenfolge: chronologisch absteigend nach Startjahr, dann Endjahr.
// 'laufend' zaehlt als Endjahr 9999.
export const cases: CaseStudy[] = [
  // ─── 2026 ───────────────────────────────────────────────
  {
    id: "outline-knowledge-base",
    category: "engineering",
    period: "2026 - laufend",
    kind: "Build",
    title: "Enterprise-Wissensbasis mit Outline (self-hosted)",
    anchor: "Tier-2 Automotive · Self-Hosted · MCP + Graph Connector",
    context:
      "Microsoft-Stack-Mittelständler mit M365, SAP, Azure und Copilot als AI-Backbone, aber ohne strukturierte Wissensbasis. Copilot ohne fütterbare Quellen liefert allgemeine Floskeln und veraltete SharePoint-Fundstücke. OneNote, Confluence, Loop und Notion alle nicht passend - jeweils aus unterschiedlichen Gründen (Struktur, Alter, Lose Granularität, AI-Silo-Konflikt).",
    intervention:
      "Outline (BSL 1.1) als Wiki-Foundation, self-hosted im eigenen Rechenzentrum als Docker-Container. Drei Integrationsebenen selbst gebaut: Microsoft Graph Connector speist Outline-Inhalte in den M365-Search-Index, damit Copilot sie wie SharePoint-Dokumente findet. MCP-Server vor der Outline-API erlaubt Copilot-Agenten gezielte Queries (Lesen, Suchen, Schreiben). Spezialisierter Copilot-Agent in Copilot Studio für Onboarding, Schnellsuche und Übersichten. Compliance-Profil ISO 27001 / TISAX / NIS2 durch Datenresidenz, Versionshistorie, Audit-Logs und granulare Berechtigungen.",
    metrics: [
      { value: "Self-Host", label: "Eigenes Rechenzentrum" },
      { value: "3 Ebenen", label: "Graph + MCP + Agent" },
      { value: "ISO/TISAX/NIS2", label: "Audit-tauglich" },
    ],
    tags: ["Wissensbasis", "Outline", "Self-Host", "MCP", "Copilot", "Graph Connector"],
    blogSlug: "2026-03-29-full-microsoft-stack-open-source-doku",
  },
  {
    id: "tacto-ai-purchasing",
    category: "ai",
    period: "2026 - laufend",
    kind: "Applied AI",
    title: "Tacto AI Purchasing - KI-gestützte Einkaufs-Analytik",
    anchor: "Tier-2 Automotive · Procurement & Data · Tacto-Plattform",
    context:
      "Strategischer Einkauf ohne durchgängige Datensicht. Lieferanten-, Material- und Vertragsdaten verteilt auf SAP, Excel und Mailpostfächer. Kein Frühwarnsystem für Risiko-Signale, keine systematische Spend-Analyse, keine KI-Unterstützung im Sourcing-Prozess.",
    intervention:
      "Einführung der Tacto-Plattform als KI-gestützte Einkaufs-Schicht über SAP-Stammdaten. Anbindung Bestell- und Lieferantendaten, automatisierte Spend-Klassifizierung, KI-Auswertung von Risiko-Indikatoren (Compliance, Lieferketten, Bonität). Aufbau Self-Service-Analytik für Strategischen Einkauf, Definition Operating-Model gemeinsam mit Procurement-Lead.",
    metrics: [
      { value: "SAP-Linked", label: "Stammdaten integriert" },
      { value: "Risk-Signals", label: "KI-Frühwarn-Layer" },
      { value: "Self-Service", label: "Procurement-Enablement" },
    ],
    tags: ["AI", "Procurement", "Spend-Analytics", "Tacto", "SAP"],
  },
  {
    id: "aboutexport-saas",
    category: "engineering",
    period: "2026 - laufend",
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

  // ─── 2025 - laufend ─────────────────────────────────────
  {
    id: "modern-intranet-ai-knowledge-agent",
    category: "ai",
    period: "2025 - laufend",
    kind: "Applied AI",
    title: "Modern Intranet Redesign & AI Knowledge Agent",
    anchor: "Tier-2 Automotive · 2.800 MA · SharePoint-basiert",
    context:
      "Klassisches Intranet als Friedhof von Dokumenten. Wissen verteilt zwischen SharePoint, Teams, HR-Tools, Prozess-Handbüchern. Mitarbeiter finden Antworten nicht oder zu langsam. Bedarf an einem modernen Wissens-Layer mit KI-First-Antwortlogik.",
    intervention:
      "Konzeption eines neuen Intranets auf SharePoint-Basis mit AI-Knowledge-Agent als Front-Door. Orchestrator-Agent mit spezialisierten Sub-Agents für HR, IT und Prozess-Anfragen. Anbindung an Quell-Systeme über kontrollierte Wissens-Indexe. Authoring- und Pflege-Modell mit Fachbereichs-Verantwortung. Governance, Audit-Logs, Halluzinations-Reduktion durch RAG-Strategie.",
    metrics: [
      { value: "SharePoint", label: "Plattform-Foundation" },
      { value: "Orchestrator", label: "+ Sub-Agents (HR, IT, Prozesse)" },
      { value: "RAG", label: "Quellgebunden, audit-fähig" },
    ],
    tags: ["AI", "Knowledge", "Multi-Agent", "RAG", "SharePoint"],
  },
  {
    id: "odw-central-eigenentwicklung",
    category: "engineering",
    period: "2025 - laufend",
    kind: "Build",
    title: "Cloud-native Prozessplattform als Power-Platform-Nachfolger",
    anchor: "Tier-2 Automotive · Eigenentwicklung · Container",
    context:
      "Power Platform stieß in kritischen Szenarien an Grenzen (Skalierung, Governance, Entwicklungstiefe). Bedarf nach einer kontrollierbaren, eigenen Prozessplattform jenseits der Low-Code-Limits.",
    intervention:
      "Konzeption cloud-native Eigenentwicklung auf Container-Basis. Zielarchitektur, Betriebsmodell, Security-by-Design (Mandantentrennung, Secrets-Handling, Audit-Logs, RBAC). UI/UX-Entwurf für einheitliches Prozess-Frontend. Engineering-Prinzipien (CI/CD, Tests, Definition of Done). DevOps Operating Model. Integration KI-gestützter Entwicklung mit Quality-Gates.",
    metrics: [
      { value: "MVP", label: "Scope definiert" },
      { value: "Container", label: "Cloud-native Foundation" },
      { value: "Agentic", label: "Coding integriert" },
    ],
    tags: ["Build", "Container", "DevOps", "Agentic Coding"],
  },
  {
    id: "hr-successfactors",
    category: "transformation",
    period: "2025 - laufend",
    kind: "Program",
    title: "HR Transformation - SAP HCM zu SuccessFactors",
    anchor: "Tier-2 Automotive · HR · End-of-Life-Druck SAP HCM (R/3)",
    context:
      "SAP HCM auf R/3-Basis nähert sich End-of-Life. HR-Prozesse und -Daten an Legacy-System gekoppelt, kein Cloud-Modell, keine moderne Self-Service-Erfahrung für Mitarbeiter und Führungskräfte. Druck auf State-of-the-Art-System mit Cloud-Lifecycle.",
    intervention:
      "Programm-Vorbereitung HR-Plattform-Wechsel weg vom HCM. Systemvergleich SuccessFactors, Microsoft Dynamics HR und Workday auf Funktionsumfang, Integrationsfähigkeit, TCO und HR-Strategie-Fit. Zielarchitektur, Migrations-Pfad, Identity- und Daten-Modell. Stakeholder-Alignment HR und Geschäftsführung.",
    metrics: [
      { value: "EOL HCM", label: "Migrations-Druck adressiert" },
      { value: "SF / D365 / Workday", label: "Systemvergleich" },
      { value: "Cloud-First", label: "Zielarchitektur" },
    ],
    tags: ["HR", "SAP", "SuccessFactors", "Workday", "Dynamics HR"],
  },
  {
    id: "braum-x-hub",
    category: "engineering",
    period: "2025 - laufend",
    kind: "Build",
    title: "braum.x - Personal Identity Hub",
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

  // ─── 2025 mit definiertem Endjahr ─────────────────────────
  {
    id: "sap-modernization-azure",
    category: "enterprise",
    period: "2025 - 2027",
    kind: "Program",
    title: "SAP Landscape Modernization in die Private Cloud",
    anchor: "Tier-2 Automotive · SAP S/4HANA · Azure",
    context:
      "On-Premises SAP-Betrieb mit hohem technischen Schulden-Niveau, Custom-Code-Wildwuchs, kein Clean Core. Vorbereitung auf AI-gestützte SAP-Use-Cases (Joule, SAP OC) nicht möglich. Roadmap-Druck bis 2027.",
    intervention:
      "Definition Zielarchitektur und Hosting-/Betriebsmodell für SAP on Azure. Clean-Core-Ansatz: Custom-Code-Inventar, Bewertungslogik, priorisierter Refactoring-Backlog Fit-to-Standard. Identity- und Access-Modell überarbeitet (SAML SSO, Rollenmodell, Lifecycle). Migrationsplanung mit Teststrategie, Cutover und Hypercare.",
    metrics: [
      { value: "2027", label: "Roadmap-Horizont" },
      { value: "Clean Core", label: "Approach etabliert" },
      { value: "AI-Ready", label: "Daten-Foundation" },
    ],
    tags: ["SAP S/4HANA", "Azure", "Clean Core", "Migration"],
  },
  {
    id: "copilot-agents-rollout",
    category: "ai",
    period: "2025 - 2026",
    kind: "Applied AI",
    title: "Microsoft Copilot Agents Rollout & Custom AI Assistants",
    anchor: "Tier-2 Automotive · Cross-Function · 4 Use-Case-Domains",
    context:
      "AI als Thema kam ins Unternehmen, aber praktisches Verständnis fehlte: kaum jemand wusste konkret, was Künstliche Intelligenz im Tagesgeschäft leisten kann oder wo sich agentische Workflows lohnen. Risiko von Schatten-AI in Fachbereichen, kein gemeinsames Vokabular.",
    intervention:
      "System aufgesetzt - Identifikation und Priorisierung erster Agent-Use-Cases für IT, Export Controls, Logistics und HR. Aber der größere Anteil war Change Management und Enablement: Verständnis in den Fachbereichen aufgebaut, Enabler direkt in den Abteilungen verankert, gemeinsames Vokabular geschaffen, Use-Cases gemeinsam mit Anwendern erarbeitet. Aufbau Betriebs- und Verbesserungsmodell (Feedback-Loops, Prompt-Tuning, Monitoring, Ownership).",
    metrics: [
      { value: "4 Domänen", label: "IT, Export, Logistics, HR" },
      { value: "Enabler", label: "in den Fachbereichen verankert" },
      { value: "Change-First", label: "Verständnis vor Tooling" },
    ],
    tags: ["AI", "Copilot", "Agents", "Change-Management"],
  },
  {
    id: "adobe-sign-digital-signature",
    category: "transformation",
    period: "2025 - 2026",
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
    category: "ai",
    period: "2025",
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
  {
    id: "kpi-restructuring-data-automation",
    category: "transformation",
    period: "2025",
    kind: "Refactor",
    title: "KPI-Restrukturierung & Datenautomatisierung",
    anchor: "Tier-2 Automotive · Cross-Function · Reporting-Layer",
    context:
      "KPI-Definitionen über die Jahre auseinandergedriftet, Reporting-Aufwand hoch, Werks- und Funktions-spezifische Sonderlogiken. Jede Management-Sicht eine eigene Excel-Geschichte, kein gemeinsames Verständnis von Steuerungs-Größen.",
    intervention:
      "Refactoring der KPI-Landschaft: Definitionen vereinheitlicht, Owner pro KPI festgelegt, Datenflüsse standardisiert. Wo möglich automatisiert (Sammeln-Bereinigen-Verteilen über Datenpipelines, Anbindung an die globale BI-Plattform); wo Excel sinnvoll bleibt, mit klaren Owner und Audit-Trail. Reporting-Frequenzen und Verteiler harmonisiert. Aus heterogenen Lieferketten ein verlässlicheres Daten-Asset entwickelt.",
    metrics: [
      { value: "Vereinheitlicht", label: "KPI-Definitionen + Owner" },
      { value: "Konsolidiert", label: "Daten-Lieferketten" },
      { value: "Cross-Func", label: "Werks-übergreifend" },
    ],
    tags: ["Data", "KPI", "Reporting", "Automation"],
  },

  // ─── 2024 ───────────────────────────────────────────────
  {
    id: "sosafe-security-awareness",
    category: "compliance",
    period: "2024 - 2025",
    kind: "Program",
    title: "SoSafe Security Awareness Programm",
    anchor: "Tier-2 Automotive · 2.800 MA · Mehrsprachig",
    context:
      "Phishing- und Social-Engineering-Risiko als größter realer Angriffspfad. Awareness-Maßnahmen waren einmalige Schulungen, kein kontinuierlicher Loop, kein Reifegrad-Reporting an Geschäftsführung.",
    intervention:
      "Einführung SoSafe als kontinuierliches Awareness-Programm. Mehrsprachige Lerninhalte, regelmäßige Phishing-Simulationen, Klickraten-Tracking und Reifegrad-KPIs. Roll-out-Strategie pro Standort, Eskalations-Pfad bei wiederholter Auffälligkeit, Verankerung im ISMS-Maßnahmen-Backlog.",
    metrics: [
      { value: "Mehrsprachig", label: "Globale Belegschaft" },
      { value: "Phishing-Sim", label: "Kontinuierlich" },
      { value: "KPI", label: "Reifegrad-Reporting" },
    ],
    tags: ["Awareness", "SoSafe", "Phishing", "ISMS-Linked"],
  },
  {
    id: "ai-elearning-platform",
    category: "ai",
    period: "2024 - 2025",
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
  {
    id: "copilot-adoption-program",
    category: "ai",
    period: "2024",
    kind: "Adoption",
    title: "Microsoft Copilot Adoption Program",
    anchor: "Tier-2 Automotive · Cross-Function · Greenfield-Adoption",
    context:
      "Microsoft 365 Copilot kam als Tool ins Unternehmen, aber ohne klare Strategie, ohne definierte Use-Cases, ohne Betriebsmodell. Adoption war komplettes Greenfield - von 0 angefangen, alles musste aufgebaut werden.",
    intervention:
      "Aufbau eines Adoption-Programms von Grund auf. Pilot-Wave mit klaren Use-Cases, Champions-Netzwerk in den Fachbereichen, Governance-Rahmen für Lizenz und Datenschutz. Schulungsformate, Prompt-Coaching, Erfolgs-KPIs. Roll-out-Wellen mit Feedback-Loop und kontinuierlicher Verbesserung. Verankerung im Modern-Work-Operating-Model.",
    metrics: [
      { value: "Greenfield", label: "Von 0 aufgebaut" },
      { value: "Champions", label: "Netzwerk in Fachbereichen" },
      { value: "Governance", label: "Lizenz + Datenschutz geklärt" },
    ],
    tags: ["AI", "Copilot", "Adoption", "Modern Work"],
  },

  // ─── 2023 - 2024 ────────────────────────────────────────
  {
    id: "managed-soc-arctic-wolf",
    category: "enterprise",
    period: "2023 - 2024",
    kind: "Security Operations",
    title: "Managed SOC mit Arctic Wolf - 24/7 Detection & Response",
    anchor: "Tier-2 Automotive · Arctic Wolf · Cloud + On-Prem Telemetrie",
    context:
      "Reaktive Security-Operations ohne 24/7-Coverage. Logs verteilt über Cloud, On-Prem-Server, Endgeräte und Netzwerk-Komponenten - keine zentrale Sicht. Mean-Time-to-Detect war qualitativ unbekannt.",
    intervention:
      "Einführung Managed SOC mit Arctic Wolf als externem Provider. Anbindung heterogener Log- und Telemetriequellen, zentrale Detection & Response. Standardisierte Use-Cases (Detections, Alerts, Response Playbooks) inkl. Quarantäne-/Containment-Prozessen. Kontinuierlicher Verbesserungsprozess (Tuning, False-Positive-Reduktion, Reporting).",
    metrics: [
      { value: "24/7", label: "Coverage live" },
      { value: "Cloud + On-Prem", label: "Telemetrie konsolidiert" },
      { value: "Playbooks", label: "Response standardisiert" },
    ],
    tags: ["SOC", "SIEM", "Arctic Wolf", "Detection & Response"],
  },
  {
    id: "cyber-risk-bcm-framework",
    category: "compliance",
    period: "2023 - 2024",
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
  {
    id: "global-bi-platform",
    category: "transformation",
    period: "2023 - 2024",
    kind: "Platform",
    title: "Globale BI-Plattform SAP SAC/DWC + Power BI",
    anchor: "Tier-2 Automotive · Cross-Function · Single Source of Truth",
    context:
      "Reporting-Wildwuchs aus Excel-Inseln, lokale Power-BI-Insellösungen, keine konsolidierte Sicht über die globale Organisation. Management-Reports manuell zusammengetragen, KPI-Definitionen pro Funktion unterschiedlich.",
    intervention:
      "Konzeption einer globalen BI-Plattform auf SAP SAC und SAP DWC als Single Source of Truth, Power BI als Sekundär-Tool für Self-Service. Daten- und KPI-Modell harmonisiert, Migration der lokalen Reports auf zentrale Plattform, Governance über Modelle, Berechtigungen und Lifecycle.",
    metrics: [
      { value: "Single Source", label: "Of Truth etabliert" },
      { value: "SAC + DWC", label: "+ Power BI Self-Service" },
      { value: "Cross-Func", label: "Reporting konsolidiert" },
    ],
    tags: ["BI", "SAP SAC", "SAP DWC", "Power BI", "Data Platform"],
  },

  // ─── 2022 ───────────────────────────────────────────────
  {
    id: "team-data-analytics",
    category: "leadership",
    period: "2022 - 2024",
    kind: "Team-Build",
    title: "Aufbau Team Data Analytics & BI",
    anchor: "Tier-2 Automotive · Cross-Function · Self-Service-Enablement",
    context:
      "Reporting-Wildwuchs aus Excel-Inseln, keine konsolidierte BI-Plattform, keine konsistenten KPIs zwischen Werken und Funktionsbereichen. Data-Anfragen liefen manuell durch IT-Tickets.",
    intervention:
      "Aufbau und Mitverantwortung für Data- und Analytics-Strategie. Governance der BI-Plattform (SAP SAC/DWC, Power BI, Microsoft Fabric), KPI- und Reporting-Standards für Management und Fachbereiche, Self-Service-Enablement. Aus Ticket-getriebener IT-Reporting-Schleife eine Plattform für Fachbereichs-Eigenständigkeit gemacht.",
    metrics: [
      { value: "Multi-Tool", label: "SAC/DWC + Power BI + Fabric" },
      { value: "Self-Service", label: "Fachbereichs-Enablement" },
      { value: "Cross-Function", label: "Standortübergreifend" },
    ],
    tags: ["Data Analytics", "BI", "Team-Build", "Self-Service"],
  },
  {
    id: "autodesk-vault-edm",
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
    category: "compliance",
    period: "2022",
    kind: "Assessment",
    title: "IT Due Diligence Pre-Acquisition Assessment",
    anchor: "Tier-2 Automotive · M&A · IT-Bewertung Zielunternehmen",
    context:
      "Akquisitionsvorhaben eines Zielunternehmens. IT-Landschaft, Risiken und Integrations-Aufwand unbekannt. Entscheidungs-Druck im Deal-Window mit klarer Zeitlinie für Bewertungs-Report.",
    intervention:
      "IT-Due-Diligence im Auftrag der Geschäftsführung. Bewertung der IT-Landschaft (Infrastruktur, Anwendungen, Lizenzen, Verträge, Security-Posture, Compliance, Personal). Risiko- und Integrations-Aufwand quantifiziert, Quick-Wins und rote Flaggen für Verhandlungen markiert. Vollständiger Report als Entscheidungs-Vorlage.",
    metrics: [
      { value: "End-to-End", label: "IT-Landschaft bewertet" },
      { value: "Report", label: "Entscheidungs-Vorlage" },
      { value: "Risiken", label: "Quantifiziert + Roadmap" },
    ],
    tags: ["M&A", "Due Diligence", "Assessment"],
  },

  // ─── 2021 ───────────────────────────────────────────────
  {
    id: "team-aufbau-apps",
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
      { value: "6 DR", label: "Direct Reports disziplinarisch" },
      { value: "Global", label: "Mandate-Coverage" },
      { value: "Greenfield", label: "Team-Build" },
    ],
    tags: ["Team-Aufbau", "Hiring", "Operating Model", "Leadership"],
    hidePill: true,
  },
  {
    id: "m365-zero-trust-identity",
    category: "enterprise",
    period: "2021 - 2022",
    kind: "Program",
    title: "M365 Zero Trust & Single Identity Architecture",
    anchor: "Tier-2 Automotive · 2.800 MA · 6 Sites international",
    context:
      "Heterogene Identity-Landschaft mit lokalen ADs pro Standort, fragmentiertes MFA, kein einheitliches Conditional Access. Zero-Trust-Anspruch auf Papier, in der Realität kein durchgängiges Modell. Lifecycle-Prozesse manuell.",
    intervention:
      "Konzeption und Roll-out einer Single-Identity-Architektur auf Microsoft Entra ID. Conditional Access als zentrales Policy-Layer, MFA flächendeckend, SSO für Kern-Anwendungen. Identity-Lifecycle-Modell mit klarer Owner-Zuweisung. Migrations- und Cutover-Plan über alle Standorte.",
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
    category: "enterprise",
    period: "2020 - 2021",
    kind: "Migration",
    title: "SAP R/3 → S/4HANA Brownfield Transition (HCM/HR)",
    anchor: "Tier-2 Automotive · SAP HCM/HR · Periphere Beteiligung",
    context:
      "SAP R/3 als Plattform für HR/HCM am End-of-Life-Horizont. Brownfield-Pfad zu S/4HANA gewählt, um Custom-Code und Prozess-Investitionen zu erhalten. Komplexe Custom-Z-Welt im HCM-Kontext, Berater-Wechselwirkungen mit Fachbereichen.",
    intervention:
      "Mitarbeit an der HCM-Brownfield-Migration in Teilbereichen - Custom-Code-Inventur, Bewertungs-Logiken, frühe Refactoring-Backlog-Sortierung, Schnittstellen-Themen. Hauptverantwortung lag bei dedizierten SAP-HCM-Teams; mein Beitrag war fokussiert und peripher.",
    metrics: [
      { value: "Brownfield", label: "Pfad mit Custom-Erhalt" },
      { value: "Custom-Code", label: "Inventur + Bewertung" },
      { value: "Peripher", label: "Beitrag in Teilbereichen" },
    ],
    tags: ["SAP S/4HANA", "SAP HCM", "Brownfield", "Migration"],
  },

  // ─── 2019 ───────────────────────────────────────────────
  {
    id: "power-platform-coe",
    category: "transformation",
    period: "2019 - 2020",
    kind: "Program",
    title: "Power Platform Automation Program & Center of Excellence",
    anchor: "Tier-2 Automotive · Citizen Developer · CoE-Modell",
    context:
      "Aufkommende Schatten-IT durch Excel-Makros und Einzelautomatisierungen. Fachbereiche wollten schneller liefern, IT konnte nicht skalieren. Risiko unkontrollierter Citizen-Development ohne Governance.",
    intervention:
      "Aufbau eines Power-Platform-Center-of-Excellence mit DEV/TEST/PROD-Umgebungs-Strategie, Connector-Governance, Lizenz-Modell und Datenschutz-Klärung. Citizen-Developer-Enablement mit Schulungen, Templates, Code-Review-Standards für komplexe Flows. Verzahnung mit Pro-Code-Engineering für Hand-Off-Szenarien.",
    metrics: [
      { value: "DEV/TEST/PROD", label: "Standard etabliert" },
      { value: "Citizen-Dev", label: "Enablement-Pfad" },
      { value: "Governance", label: "Connector + Lizenz geklärt" },
    ],
    tags: ["Power Platform", "CoE", "Citizen Developer", "Automation"],
  },
  {
    id: "modern-workplace-m365",
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

  // ─── 2018 - laufend ──────────────────────────────────────
  {
    id: "it-strategie-odw-gesamtlaufzeit",
    category: "leadership",
    period: "2018 - laufend",
    kind: "Strategy",
    title: "IT-Strategie über Gesamt-Laufzeit",
    anchor: "Tier-2 Automotive · Hidden Champion · Mehrjährige Linie",
    context:
      "On-prem-getriebener Mittelständler ohne klare Cloud- oder AI-Roadmap. Hohes Daten-Sediment in Legacy-Systemen, IT als reaktiver Service. Wandel-Druck durch Kundenanforderungen, Compliance und Wettbewerb.",
    intervention:
      "Mitgestaltung des Wegs vom on-prem-getriebenen Mittelständler zum AI-enabled, cloud-first IT-Setup eines Hidden Champion. Über die volle Laufzeit: Foundation (LZ, IAM), Modernisierung (SAP, M365), KI-Integration (Copilot, Agents), Sicherheits-Reife (ISMS, SOC). Eine IT-Organisation, die auf jede fachliche Frage eine Antwort hat.",
    metrics: [
      { value: "7+ Jahre", label: "Linienverantwortung" },
      { value: "On-Prem → Cloud", label: "Strategischer Wandel" },
      { value: "Reaktiv → Antwortfähig", label: "Operating Model" },
    ],
    tags: ["Strategie", "Roadmap", "Cloud-First", "AI-Enablement"],
    hidePill: true,
  },
];
