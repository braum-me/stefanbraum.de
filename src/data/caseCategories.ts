export type CaseCategoryId =
  | "transformation"
  | "ai"
  | "enterprise"
  | "compliance"
  | "engineering"
  | "leadership";

export interface CaseCategory {
  id: CaseCategoryId;
  number: string;
  title: string;
  subline: string;
  icon: "stack" | "workflow" | "spark" | "people" | "shield" | "code";
}

export const caseCategories: CaseCategory[] = [
  {
    id: "transformation",
    number: "01",
    title: "Digitale Transformation",
    subline: "Modern Work, M365-Adoption, Prozess-Plattformen, Self-Service für Fachbereiche. Vom Tool-Rollout bis Change.",
    icon: "workflow",
  },
  {
    id: "ai",
    number: "02",
    title: "AI & Data",
    subline: "Copilot-Rollouts, Custom Agents, Adoption-Programme, Multimodal-Use-Cases, BI- und Analytics-Plattformen. KI als Werkzeug, nicht als Buzzword.",
    icon: "spark",
  },
  {
    id: "enterprise",
    number: "03",
    title: "Enterprise & Security",
    subline: "SAP S/4HANA, Azure Landing Zone, Zero Trust, Identity- und SOC-Foundation. Architektur mit Hands-on-Mentalität.",
    icon: "stack",
  },
  {
    id: "compliance",
    number: "04",
    title: "Compliance & Governance",
    subline: "ISMS nach ISO 27001 / TISAX, BCM, Risk Management, IT-Due-Diligence. Auditfähig, nicht nur PowerPoint-Konform.",
    icon: "shield",
  },
  {
    id: "engineering",
    number: "05",
    title: "Engineering & Build",
    subline: "Eigene Plattformen, Side-Projects, Open-Source. Cloud-native Container, modernes Web, SaaS-Vorhaben.",
    icon: "code",
  },
  {
    id: "leadership",
    number: "06",
    title: "Führung & Team",
    subline: "Teamaufbau, Direct Reports, stellv. Leitung, KPI-Steuerung. Kurze Wege zu Geschäftsführung und Fachbereichen.",
    icon: "people",
  },
];
