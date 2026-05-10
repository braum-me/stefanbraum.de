export interface Certification {
  id: string;
  year: string;
  name: string;
  issuer: string;
}

export const certifications: Certification[] = [
  {
    id: "management-training",
    year: "2025",
    name: "Management Training",
    issuer: "Management Circle",
  },
  {
    id: "digital-transformation-mgmt",
    year: "2024",
    name: "Digital Transformation Management",
    issuer: "Haufe",
  },
  {
    id: "ai-strategic-leverage",
    year: "2024",
    name: "AI as Strategic Leverage",
    issuer: "Haufe",
  },
  {
    id: "itil-v4-foundation",
    year: "2023",
    name: "ITIL V4 Foundation",
    issuer: "PeopleCert",
  },
  {
    id: "ms-600",
    year: "2018",
    name: "MS-600 Building Applications for Microsoft 365",
    issuer: "Microsoft",
  },
  {
    id: "ccna",
    year: "2017",
    name: "CCNA Network Fundamentals",
    issuer: "Cisco",
  },
];
