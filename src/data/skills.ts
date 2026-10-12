export type SkillDomain =
  | "cloud"
  | "enterprise"
  | "modernwork"
  | "security"
  | "ai"
  | "method"
  | "leadership";

export interface Skill {
  id: string;
  name: string;
  domain: SkillDomain;
  yearsExperience: number;
  subSkills: string[];
  /** matches CaseStudy.id */
  projects: string[];
  /** matches Certification.id */
  certificates: string[];
  /** Englische Bezeichnungen; ohne Angabe gelten `name`/`subSkills` (Produktnamen). */
  en?: { name?: string; subSkills?: string[] };
}

/** Name und Sub-Skills in der gewünschten Sprache. */
export function localizeSkill(s: Skill, locale: "de" | "en"): Skill {
  if (locale !== "en" || !s.en) return s;
  return { ...s, name: s.en.name ?? s.name, subSkills: s.en.subSkills ?? s.subSkills };
}

export const skillDomains: Record<SkillDomain, string> = {
  cloud: "Cloud & Infrastruktur",
  enterprise: "Enterprise Applications",
  modernwork: "Modern Work",
  security: "Security",
  ai: "KI / AI",
  method: "Methodik",
  leadership: "Führung",
};

export const skills: Skill[] = [
  {
    id: "sap-s4hana",
    name: "SAP S/4HANA",
    domain: "enterprise",
    yearsExperience: 7,
    subSkills: ["S/4HANA", "Brownfield-Migration", "Clean Core", "SAP SAC", "SAP DWC"],
    projects: [
      "sap-modernization-azure",
      "sap-r3-s4hana-brownfield",
      "hr-transformation-evaluation",
      "global-bi-platform",
    ],
    certificates: [],
    en: { subSkills: ["S/4HANA", "Brownfield migration", "Clean Core", "SAP SAC", "SAP DWC"] },
  },
  {
    id: "m365",
    name: "Microsoft 365",
    domain: "modernwork",
    yearsExperience: 7,
    subSkills: ["SharePoint", "Teams", "Exchange Online", "OneDrive", "Copilot Studio"],
    projects: [
      "modern-workplace-m365",
      "modern-intranet-ai-knowledge-agent",
      "copilot-adoption-program",
      "adobe-sign-digital-signature",
      "m365-zero-trust-identity",
      "power-platform-coe",
      "microsoft-places-hybrid-workplace",
    ],
    certificates: ["ms-600"],
  },
  {
    id: "azure-hybrid",
    name: "Azure & Hybrid Cloud",
    domain: "cloud",
    yearsExperience: 5,
    subSkills: ["Landing Zone", "Infrastructure as Code", "Hybrid", "GitOps", "Identity"],
    projects: ["azure-landing-zone", "sap-modernization-azure", "outline-knowledge-base"],
    certificates: [],
  },
  {
    id: "security-isms",
    name: "IT-Security & ISMS",
    domain: "security",
    yearsExperience: 5,
    subSkills: ["ISO 27001", "TISAX", "BCM", "SOC", "IAM", "Zero Trust", "Awareness"],
    projects: [
      "isms-iso27001-tisax",
      "managed-soc-endpoint-security",
      "cyber-risk-bcm-framework",
      "m365-zero-trust-identity",
      "enterprise-iam-self-service",
      "sosafe-security-awareness",
      "it-due-diligence",
    ],
    certificates: ["itil-v4-foundation"],
    en: { name: "IT Security & ISMS" },
  },
  {
    id: "ai-copilot",
    name: "KI / Copilot / Agents",
    domain: "ai",
    yearsExperience: 2,
    subSkills: ["Copilot", "Custom Agents", "MCP", "RAG", "Prompt-Engineering", "AI-Adoption"],
    projects: [
      "copilot-adoption-program",
      "modern-intranet-ai-knowledge-agent",
      "ai-elearning-platform",
      "lexisnexis-patent-analytics",
      "outline-knowledge-base",
    ],
    certificates: ["ai-strategic-leverage"],
    en: {
      name: "AI / Copilot / Agents",
      subSkills: ["Copilot", "Custom Agents", "MCP", "RAG", "Prompt engineering", "AI adoption"],
    },
  },
  {
    id: "power-platform",
    name: "Power Platform",
    domain: "modernwork",
    yearsExperience: 5,
    subSkills: ["Power Automate", "Power Apps", "Power BI", "CoE", "Citizen Developer"],
    projects: ["power-platform-coe", "global-bi-platform", "isms-iso27001-tisax"],
    certificates: [],
  },
  {
    id: "enterprise-architecture",
    name: "Enterprise Architecture",
    domain: "method",
    yearsExperience: 5,
    subSkills: ["Vendor-Steuerung", "Architektur-Reviews", "Stack-Entscheidungen", "Build-vs-Buy"],
    projects: [
      "azure-landing-zone",
      "sap-modernization-azure",
      "outline-knowledge-base",
      "modern-workplace-m365",
      "autodesk-vault-edm",
      "m365-zero-trust-identity",
      "it-strategie-odw-gesamtlaufzeit",
      "plm-web-client-evolution",
    ],
    certificates: ["digital-transformation-mgmt"],
    en: {
      subSkills: ["Vendor management", "Architecture reviews", "Stack decisions", "Build vs. buy"],
    },
  },
  {
    id: "itil-ops",
    name: "ITIL & IT-Operations",
    domain: "method",
    yearsExperience: 7,
    subSkills: ["Service-Management", "Incident", "Change", "Problem-Management"],
    projects: [
      "managed-soc-endpoint-security",
      "isms-iso27001-tisax",
      "enterprise-iam-self-service",
      "global-it-governance-service-management",
    ],
    certificates: ["itil-v4-foundation"],
    en: {
      name: "ITIL & IT Operations",
      subSkills: ["Service management", "Incident", "Change", "Problem management"],
    },
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    domain: "method",
    yearsExperience: 7,
    subSkills: ["Change-Management", "Adoption", "Prozesse", "Self-Service-Enablement"],
    projects: [
      "it-strategie-odw-gesamtlaufzeit",
      "modern-workplace-m365",
      "modern-intranet-ai-knowledge-agent",
      "copilot-adoption-program",
      "global-bi-platform",
      "ai-elearning-platform",
      "adobe-sign-digital-signature",
      "catena-x-preparation",
    ],
    certificates: ["digital-transformation-mgmt", "management-training"],
    en: {
      subSkills: ["Change management", "Adoption", "Processes", "Self-service enablement"],
    },
  },
  {
    id: "data-bi",
    name: "Data & BI",
    domain: "enterprise",
    yearsExperience: 5,
    subSkills: ["SAP SAC", "SAP DWC", "Power BI", "Microsoft Fabric", "KPI-Reporting"],
    projects: ["global-bi-platform", "lexisnexis-patent-analytics"],
    certificates: [],
    en: { subSkills: ["SAP SAC", "SAP DWC", "Power BI", "Microsoft Fabric", "KPI reporting"] },
  },
  {
    id: "leadership-team",
    name: "Führung & Team",
    domain: "leadership",
    yearsExperience: 4,
    subSkills: ["Hiring", "Coaching", "Stakeholder-Management", "Direct Reports"],
    projects: [
      "team-aufbau-apps",
      "global-bi-platform",
      "it-strategie-odw-gesamtlaufzeit",
      "global-it-governance-service-management",
    ],
    certificates: ["management-training"],
    en: {
      name: "Leadership & Team",
      subSkills: ["Hiring", "Coaching", "Stakeholder management", "Direct reports"],
    },
  },
];
