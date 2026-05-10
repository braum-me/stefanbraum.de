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
      "hr-successfactors",
      "global-bi-platform",
    ],
    certificates: [],
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
      "copilot-agents-rollout",
      "adobe-sign-digital-signature",
      "m365-zero-trust-identity",
      "odw-central-eigenentwicklung",
    ],
    certificates: ["ms-600"],
  },
  {
    id: "azure-hybrid",
    name: "Azure & Hybrid Cloud",
    domain: "cloud",
    yearsExperience: 5,
    subSkills: ["Landing Zone", "Infrastructure as Code", "Hybrid", "GitOps", "Identity"],
    projects: [
      "azure-landing-zone",
      "sap-modernization-azure",
      "outline-knowledge-base",
    ],
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
      "managed-soc-arctic-wolf",
      "cyber-risk-bcm-framework",
      "m365-zero-trust-identity",
      "tenfold-iam-rollout",
      "sosafe-security-awareness",
      "it-due-diligence",
    ],
    certificates: ["itil-v4-foundation"],
  },
  {
    id: "ai-copilot",
    name: "KI / Copilot / Agents",
    domain: "ai",
    yearsExperience: 2,
    subSkills: ["Copilot", "Custom Agents", "MCP", "RAG", "Prompt-Engineering", "AI-Adoption"],
    projects: [
      "copilot-agents-rollout",
      "modern-intranet-ai-knowledge-agent",
      "copilot-adoption-program",
      "ai-elearning-platform",
      "lexisnexis-patent-analytics",
      "tacto-ai-purchasing",
      "outline-knowledge-base",
    ],
    certificates: ["ai-strategic-leverage"],
  },
  {
    id: "power-platform",
    name: "Power Platform",
    domain: "modernwork",
    yearsExperience: 5,
    subSkills: ["Power Automate", "Power Apps", "Power BI", "CoE", "Citizen Developer"],
    projects: [
      "power-platform-coe",
      "odw-central-eigenentwicklung",
      "kpi-restructuring-data-automation",
      "isms-iso27001-tisax",
    ],
    certificates: [],
  },
  {
    id: "enterprise-architecture",
    name: "Enterprise Architecture",
    domain: "method",
    yearsExperience: 5,
    subSkills: [
      "Vendor-Steuerung",
      "Architektur-Reviews",
      "Stack-Entscheidungen",
      "Build-vs-Buy",
    ],
    projects: [
      "azure-landing-zone",
      "sap-modernization-azure",
      "outline-knowledge-base",
      "modern-workplace-m365",
      "autodesk-vault-edm",
      "m365-zero-trust-identity",
      "it-strategie-odw-gesamtlaufzeit",
    ],
    certificates: ["digital-transformation-mgmt"],
  },
  {
    id: "itil-ops",
    name: "ITIL & IT-Operations",
    domain: "method",
    yearsExperience: 7,
    subSkills: ["Service-Management", "Incident", "Change", "Problem-Management"],
    projects: [
      "managed-soc-arctic-wolf",
      "isms-iso27001-tisax",
      "tenfold-iam-rollout",
    ],
    certificates: ["itil-v4-foundation"],
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
      "kpi-restructuring-data-automation",
      "ai-elearning-platform",
      "adobe-sign-digital-signature",
      "global-bi-platform",
    ],
    certificates: ["digital-transformation-mgmt", "management-training"],
  },
  {
    id: "data-bi",
    name: "Data & BI",
    domain: "enterprise",
    yearsExperience: 5,
    subSkills: ["SAP SAC", "SAP DWC", "Power BI", "Microsoft Fabric", "KPI-Reporting"],
    projects: [
      "team-data-analytics",
      "global-bi-platform",
      "kpi-restructuring-data-automation",
      "lexisnexis-patent-analytics",
      "tacto-ai-purchasing",
    ],
    certificates: [],
  },
  {
    id: "leadership-team",
    name: "Führung & Team",
    domain: "leadership",
    yearsExperience: 4,
    subSkills: ["Hiring", "Coaching", "Stakeholder-Management", "Direct Reports"],
    projects: [
      "team-aufbau-apps",
      "team-data-analytics",
      "it-strategie-odw-gesamtlaufzeit",
    ],
    certificates: ["management-training"],
  },
];
