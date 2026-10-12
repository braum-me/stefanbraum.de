import type { CaseDomainTag } from "../data/cases.ts";
import type { HomeSectionId } from "../data/sections.ts";
import type { CaseStatus } from "../lib/caseStatus.ts";

/**
 * German translations. This is the source-of-truth for the locale shape.
 * `en.ts` mirrors this structure 1:1.
 */
export interface Translations {
  htmlLang: string;
  ogLocale: string;
  intlLocale: string;
  pillar: {
    transformation: string;
    ai: string;
    enterprise: string;
    compliance: string;
    engineering: string;
    leadership: string;
  };
  pillarShort: {
    transformation: string;
    ai: string;
    enterprise: string;
    compliance: string;
    engineering: string;
    leadership: string;
  };
  meta: {
    siteName: string;
    title: string;
    description: string;
    consultingDescription: string;
    ogSubtitle: string;
    skipLink: string;
  };
  nav: {
    /** Labels je Kapitel; Reihenfolge kommt aus data/sections.ts. */
    labels: Record<HomeSectionId, string>;
    logoLabelHome: string;
    logoLabelOther: string;
    burgerOpen: string;
    languageLabel: string;
  };
  hero: {
    headlinePart1: string;
    headlinePart2: string;
    currentRoleLabel: string;
    sublineDefault: string;
    sublineConsulting: string;
    ctaPrimary: string;
    ctaSecondary: string;
    portraitAlt: string;
  };
  microMetrics: {
    pillars: string;
    location: string;
    practice: string;
    practiceValue: string;
    projects: string;
    projectsValue: string;
    aria: string;
  };
  kernschwerpunkte: {
    eyebrow: string;
    headline: string;
    subline: string;
    cta: string;
    aria: string;
    pillars: ReadonlyArray<{
      id: string;
      number: string;
      title: string;
      body: string;
    }>;
  };
  cases: {
    eyebrow: string;
    headline: string;
    sublineTemplate: string;
    filterAria: string;
    filterAll: string;
    empty: string;
    /** Sichtbare Status-Labels (Pill). */
    status: Record<CaseStatus, string>;
    /** Bedeutung des Status (Tooltip / Screenreader). */
    statusHint: Record<CaseStatus, string>;
    domainTags: Record<CaseDomainTag, string>;
    featured: string;
    periodOngoing: string;
    periodSince: string;
    domain: string;
    intervention: string;
    signals: string;
    anchor: string;
    readBlog: string;
    germanOnly: string;
    fromPortfolio: string;
    pageNavAria: string;
    pagePrev: string;
    pageNext: string;
    pagePrevAria: string;
    pageNextAria: string;
    pageNumberPrefix: string;
  };
  skills: {
    eyebrow: string;
    headline: string;
    subline: string;
    sphereAria: string;
    skillDetailLabel: string;
    certificates: string;
    panelHint: string;
    backLabel: string;
    backAria: string;
    activeLabel: string;
    yearsSuffix: string;
    proofLabel: string;
    proofProj: string;
    proofCert: string;
    handsOn: string;
    domains: {
      cloud: string;
      enterprise: string;
      modernwork: string;
      security: string;
      ai: string;
      method: string;
      leadership: string;
    };
  };
  timeline: {
    eyebrow: string;
    headline: string;
    subline: string;
    present: string;
    parallelRole: string;
  };
  writing: {
    eyebrow: string;
    headline: string;
    subline: string;
    empty: string;
    seeAll: string;
    listingHeadline: string;
    listingSubline: string;
    listingTitle: string;
    listingDescription: string;
    backToList: string;
    relatedHeading: string;
    blogIndexAria: string;
    filterAll: string;
    filterEmpty: string;
    notice: string;
  };
  contact: {
    eyebrow: string;
    headline: string;
    subline: string;
    direct: { kicker: string; title: string; body: string; cta: string };
    network: { kicker: string; title: string; body: string; cta: string };
    more: { kicker: string; title: string; body: string; cta: string };
  };
  footer: {
    contact: string;
    properties: string;
    contactMail: string;
    contactLinkedIn: string;
    impressum: string;
    datenschutz: string;
    stack: string;
    backToTop: string;
    toHome: string;
  };
  chapters: Record<HomeSectionId, string>;
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    lede: string;
    sub: string;
    home: string;
    blog: string;
  };
  legal: {
    eyebrow: string;
    backToOverview: string;
    impressum: { title: string; description: string; h1: string };
    datenschutz: { title: string; description: string; h1: string; stand: string };
  };
}

export const de: Translations = {
  htmlLang: "de",
  ogLocale: "de_DE",
  intlLocale: "de-DE",
  pillar: {
    transformation: "Digitale Transformation",
    ai: "AI & Data",
    enterprise: "Enterprise & Security",
    compliance: "Compliance & Governance",
    engineering: "Engineering & Build",
    leadership: "Führung & Team",
  },
  pillarShort: {
    transformation: "Transformation",
    ai: "AI & Data",
    enterprise: "Enterprise & Security",
    compliance: "Compliance",
    engineering: "Engineering",
    leadership: "Führung",
  },
  meta: {
    siteName: "stefanbraum.de",
    title: "Stefan Braum – IT Leadership, Enterprise Architecture & AI",
    description:
      "Stefan Braum, IT-Führungskraft im industriellen Mittelstand: Enterprise-Architektur, Transformation, IT-Security und AI. Strategische Verantwortung, technisch hands-on.",
    consultingDescription:
      "Beratung im Mittelstand zu AI, Enterprise-Architektur und IT-Strategie. Erstgespräch über braum.consulting.",
    ogSubtitle: "IT-Führung. Architektur. Umsetzung.",
    skipLink: "Zum Hauptinhalt springen",
  },
  nav: {
    labels: {
      kernschwerpunkte: "Schwerpunkte",
      stationen: "Stationen",
      portfolio: "Portfolio",
      skills: "Skills",
      schreiben: "Schreiben",
      kontakt: "Kontakt",
    },
    logoLabelHome: "Stefan Braum, zurück nach oben",
    logoLabelOther: "Zur Startseite",
    burgerOpen: "Menü öffnen",
    languageLabel: "Sprache",
  },
  hero: {
    headlinePart1: "IT-Führung. Architektur.",
    headlinePart2: "Umsetzung.",
    currentRoleLabel: "Aktuell",
    sublineDefault:
      "Ich verantworte Anwendungs- und Integrationsarchitektur, ISMS und IT-Security sowie den praktischen Einsatz von AI in einer globalen IT/SAP-Organisation im industriellen Mittelstand. Technisch bleibe ich hands-on: eigene Plattformen, Automatisierung, SaaS.",
    sublineConsulting:
      "Beratung im Mittelstand zu AI, Enterprise-Architektur und IT-Strategie. Erstgespräch über braum.consulting.",
    ctaPrimary: "Kontakt aufnehmen",
    ctaSecondary: "Projekte ansehen",
    portraitAlt: "Porträt von Stefan Braum",
  },
  microMetrics: {
    pillars: "Säulen",
    location: "Standort",
    practice: "Praxis",
    practiceValue: "12 Jahre IT",
    projects: "Projekte",
    projectsValue: "{count} dokumentiert",
    aria: "Profile signals",
  },
  kernschwerpunkte: {
    eyebrow: "Stefan Braum - Kernschwerpunkte",
    headline: "Schwerpunkte.",
    subline:
      "Sechs Felder, in denen ich dauerhaft liefere. Klick öffnet die zugehörigen Projekte unten.",
    cta: "Projekte ansehen",
    aria: "Kernschwerpunkte",
    pillars: [
      {
        id: "transformation",
        number: "01",
        title: "Digitale Transformation",
        body: "Modern Work, M365-Adoption, Prozess-Plattformen, Self-Service für Fachbereiche. Vom Tool-Rollout bis Change.",
      },
      {
        id: "ai",
        number: "02",
        title: "AI & Data",
        body: "Copilot-Rollouts, Custom Agents, Adoption-Programme, BI- und Analytics-Plattformen. KI als Werkzeug, nicht als Buzzword.",
      },
      {
        id: "enterprise",
        number: "03",
        title: "Enterprise & Security",
        body: "SAP S/4HANA, Azure Landing Zone, Zero Trust, Identity- und SOC-Foundation. Architektur mit Hands-on-Mentalität.",
      },
      {
        id: "compliance",
        number: "04",
        title: "Compliance & Governance",
        body: "ISMS nach ISO 27001 / TISAX, BCM, Risk Management, IT-Due-Diligence. Auditfähig, nicht nur PowerPoint-Konform.",
      },
      {
        id: "engineering",
        number: "05",
        title: "Engineering & Build",
        body: "Eigene Plattformen, Side-Projects, Open-Source. Cloud-native Container, modernes Web, SaaS-Vorhaben.",
      },
      {
        id: "leadership",
        number: "06",
        title: "Führung & Team",
        body: "Teamaufbau, Direct Reports, stellv. Leitung, KPI-Steuerung. Kurze Wege zu Geschäftsführung und Fachbereichen.",
      },
    ],
  },
  cases: {
    eyebrow: "Stefan Braum - Portfolio",
    headline: "Portfolio.",
    sublineTemplate:
      "{count} Projekte aus Hauptjob und Selbstständigkeit. Auftraggeber anonymisiert.",
    filterAria: "Portfolio-Filter",
    filterAll: "Alle",
    empty: "Projekte in dieser Säule folgen.",
    status: {
      ongoing: "Laufend",
      "in-operation": "Im Betrieb",
      pilot: "Pilot",
      preparation: "Vorbereitung",
      concept: "Zielbild",
      completed: "Abgeschlossen",
      "handed-over": "Abgeschlossen & übergeben",
      "pre-evaluation-completed": "Vorevaluierung abgeschlossen",
    },
    statusHint: {
      ongoing: "Projekt in aktiver Umsetzung",
      "in-operation": "Eingeführt und im laufenden Betrieb, wird weiterentwickelt",
      pilot: "Pilotphase mit begrenztem Nutzerkreis, Rollout schrittweise",
      preparation: "In Vorbereitung, noch keine Umsetzung abgeschlossen",
      concept: "Zielbild bzw. Konzept, noch nicht umgesetzt",
      completed: "Projekt abgeschlossen",
      "handed-over": "Konzipiert, abgeschlossen und an das verantwortliche Team übergeben",
      "pre-evaluation-completed":
        "Vorevaluierung abgeschlossen, Entscheidung liegt beim Management",
    },
    domainTags: {
      "modern-workplace": "Modern Workplace",
    },
    featured: "Ausgewählt",
    periodOngoing: "laufend",
    periodSince: "seit",
    domain: "Domäne",
    intervention: "Intervention",
    signals: "Signale",
    anchor: "Anchor",
    readBlog: "Im Blog ausführlich",
    germanOnly: "",
    fromPortfolio: "Im Portfolio:",
    pageNavAria: "Portfolio-Seitennavigation",
    pagePrev: "Zurück",
    pageNext: "Weiter",
    pagePrevAria: "Vorherige Seite",
    pageNextAria: "Nächste Seite",
    pageNumberPrefix: "Seite",
  },
  skills: {
    eyebrow: "Stefan Braum - Werkzeuge & Belege",
    headline: "Skills und Zertifikate.",
    subline: "Was ich tatsaechlich nutze, womit ich es belegt habe und wo es zum Einsatz kam.",
    sphereAria: "Skills, klickbar für Detail",
    skillDetailLabel: "Detail anzeigen",
    certificates: "Zertifikate",
    panelHint:
      "Jeder Skill steht auf konkretem Projekt oder Zertifikat. Selbstzweck gibt es nicht.",
    backLabel: "Zurück",
    backAria: "Zurück zur Übersicht",
    activeLabel: "Active",
    yearsSuffix: "Jahre",
    proofLabel: "Proof",
    proofProj: "PROJ",
    proofCert: "CERT",
    handsOn: "Hands-on aus der Praxis.",
    domains: {
      cloud: "Cloud & Infrastruktur",
      enterprise: "Enterprise Applications",
      modernwork: "Modern Work",
      security: "Security",
      ai: "KI / AI",
      method: "Methodik",
      leadership: "Führung",
    },
  },
  timeline: {
    eyebrow: "Stefan Braum - Stationen",
    headline: "Stationen.",
    subline:
      "Von der Ausbildung zum Fachinformatiker bis zur stellv. Leitung einer globalen IT/SAP-Organisation. Parallel seit 2023 eigene Selbstständigkeit mit Braum Consulting und ein SaaS-Aufbau in Eigenregie.",
    present: "Heute",
    parallelRole: "Parallelrolle",
  },
  writing: {
    eyebrow: "Stefan Braum - Schreiben",
    headline: "Notizen aus der Praxis.",
    subline:
      "Was ich gerade lerne, baue, beobachte. Kein Marketing, keine Liste mit Punkten. Einfach Notizen.",
    empty: "Noch keine Posts. Bald.",
    seeAll: "Alle Notizen ansehen",
    listingHeadline: "Notizen aus der Praxis.",
    listingSubline:
      "Was ich gerade lerne, baue, beobachte. Mittelstands-IT, AI-Adoption, Compliance-Realität, Build-Notes. Kein Marketing, keine Liste mit Punkten. Einfach Notizen.",
    listingTitle: "Schreiben - Stefan Braum",
    listingDescription:
      "Notizen aus der Praxis: AI-Adoption, Mittelstands-IT, Compliance, Build-Notes.",
    backToList: "Schreiben",
    relatedHeading: "Weiterlesen",
    blogIndexAria: "Filter nach Tag",
    filterAll: "Alle",
    filterEmpty: "Keine Posts mit diesem Tag.",
    notice: "",
  },
  contact: {
    eyebrow: "Stefan Braum - Kontakt",
    headline: "Lass uns reden.",
    subline:
      "Für fachlichen Austausch, Vernetzung oder konkrete Anfragen. Mehr Persönliches und Side-Projects auf braum.me.",
    direct: {
      kicker: "Kontakt",
      title: "Direkter Kontakt",
      body: "Für fachliche Anfragen, Austausch oder konkrete Themen.",
      cta: "E-Mail schreiben",
    },
    network: {
      kicker: "Netzwerk",
      title: "LinkedIn",
      body: "Für fachliche Vernetzung und Updates aus der Praxis.",
      cta: "Profil ansehen",
    },
    more: {
      kicker: "Weiterfuehrendes",
      title: "Mehr von mir",
      body: "Persönliche Notizen, Lab-Experimente, Side-Projects.",
      cta: "braum.me",
    },
  },
  footer: {
    contact: "Kontakt",
    properties: "Properties",
    contactMail: "E-Mail schreiben",
    contactLinkedIn: "LinkedIn",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    stack: "Astro 5 - TypeScript - self-hosted",
    backToTop: "Zurück nach oben",
    toHome: "Zur Startseite",
  },
  chapters: {
    kernschwerpunkte: "Kernschwerpunkte",
    stationen: "Stationen",
    portfolio: "Portfolio",
    skills: "Skills und Zertifikate",
    schreiben: "Notizen aus der Praxis",
    kontakt: "Lass uns reden",
  },
  notFound: {
    eyebrow: "Stefan Braum - Nicht gefunden",
    title: "404 - Nicht gefunden - Stefan Braum",
    description: "Diese Seite gibt es nicht (mehr).",
    lede: "Diese Seite gibt es nicht (mehr).",
    sub: "Vielleicht ein alter Link, vielleicht ein Tippfehler. Hier geht es weiter:",
    home: "Zur Startseite",
    blog: "Zum Blog",
  },
  legal: {
    eyebrow: "Stefan Braum - Rechtliches",
    backToOverview: "Zurück zur Übersicht",
    impressum: {
      title: "Impressum - Stefan Braum",
      description: "Anbieterkennzeichnung nach Paragraph 5 TMG für stefanbraum.de.",
      h1: "Impressum",
    },
    datenschutz: {
      title: "Datenschutz - Stefan Braum",
      description:
        "Datenschutzerklärung gemäß DSGVO für stefanbraum.de. Cookielose Analyse mit Umami, lokale Schriften, keine Tracker, keine Werbenetzwerke.",
      h1: "Datenschutz­erklärung",
      stand: "Stand",
    },
  },
};
