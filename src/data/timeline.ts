export interface TimelineEntry {
  year: string;
  period: string;
  role: string;
  company: string;
  summary: string;
  tags: string[];
}

export const timeline: TimelineEntry[] = [
  {
    year: "2023",
    period: "Jun 2023 - Heute",
    role: "Founder",
    company: "Braum Consulting",
    summary:
      "Beratung im Mittelstand zu AI, Enterprise-Architektur und IT-Strategie. Parallel zum Hauptjob, 15 Mandate im Portfolio.",
    tags: ["Consulting", "AI", "Strategy"],
  },
  {
    year: "2022",
    period: "Jul 2022 - Heute",
    role: "Deputy Teamleader Data Analytics & BI",
    company: "ODW-Elektrik (Parallelrolle)",
    summary:
      "Mitverantwortung für Data- & Analytics-Strategie. Aufbau und Governance der BI-Plattform (SAP SAC/DWC, Power BI, Microsoft Fabric). KPI-/Reporting-Standards für Management und Fachbereiche, Self-Service-Enablement.",
    tags: ["BI", "Data", "Governance"],
  },
  {
    year: "2021",
    period: "Apr 2021 - Heute",
    role: "Team Lead IT Applications & dep. Global Head of IT/SAP",
    company: "ODW-Elektrik",
    summary:
      "Team Lead Applications (Modern Work, AI, IAM, Automatisierung, Eigenentwicklungen). Stellv. Leitung der globalen IT/SAP-Org mit 35 MA, 6 Direct Reports disziplinarisch, Budget bis 3 Mio €. Verantwortung für ISMS, IT-Security und Anwendungs-/Integrationsarchitektur.",
    tags: ["Leadership", "IT/SAP", "ISMS", "Architecture"],
  },
  {
    year: "2018",
    period: "Aug 2018 - Mär 2021",
    role: "IT Project Manager",
    company: "ODW-Elektrik",
    summary:
      "Cloud-Transition als Gesamtverantwortung. Modern Work & Communication (Teams, Exchange Online), SharePoint Online DMS, File-Server-Ablösung. Low-Code-Workflows, AR/VR und KI im IoT-Umfeld. Projekt-/Entwicklungsleitung CIM Database (PLM).",
    tags: ["Cloud-Transition", "Modern-Work", "PLM"],
  },
  {
    year: "2014",
    period: "Sep 2014 - Jun 2018",
    role: "Ausbildung Fachinformatiker für Systemintegration",
    company: "SumiRiko AVS Germany",
    summary:
      "Tier-1-Automotive-Supplier für Anti-Vibrationssysteme (NVH-Komponenten, 2.500 MA). Drei Jahre Ausbildung, anschließend 1 Jahr fest als IT-Systemadministrator. Windows Server, Citrix, HP, VMware, Client-Imaging und Patching. Das Fundament für alles, was danach kam.",
    tags: ["Windows-Server", "Citrix", "VMware", "Hands-on"],
  },
];
