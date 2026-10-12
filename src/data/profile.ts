/**
 * Zentrale, typisierte Profildaten: aktuelle Rolle, Arbeitgeber, Standort, Links.
 * Single source of truth für Hero, Metadaten, OG-Image und Person-JSON-LD.
 *
 * Inhaltliche Karrierestationen (Historie) liegen in `timeline.ts`.
 * Bei einem Rollenwechsel: hier `currentPosition` anpassen und in
 * `timeline.ts` die Station ergänzen bzw. abschließen.
 */
import type { Localized } from "../i18n/localized.ts";

export interface Employer {
  name: string;
}

export interface Position {
  /** Vollständige Rollenbezeichnung (JSON-LD, Hero). */
  title: Localized<string>;
  /** Kompakte Variante für enge Flächen (OG-Image). */
  titleShort: Localized<string>;
  employer: Employer;
  /** ISO-Monat (YYYY-MM), Beginn der aktuellen Rolle. */
  since: string;
}

export interface ProfileLocation {
  locality: string;
  region: string;
  /** Regionale Bezeichnung für Eyebrows/Signals. */
  area: string;
  countryCode: "DE";
  timezone: string;
}

export const profile = {
  name: "Stefan Braum",
  givenName: "Stefan",
  familyName: "Braum",
  currentPosition: {
    title: {
      de: "Teamleiter IT Applications & stellv. Global Head of IT/SAP",
      en: "Team Lead IT Applications & Deputy Global Head of IT/SAP",
    },
    titleShort: {
      de: "Teamleiter IT Apps & stellv. Global Head IT/SAP",
      en: "Team Lead IT Apps & Deputy Global Head IT/SAP",
    },
    employer: {
      name: "ODW-Elektrik",
    },
    since: "2021-04",
  } satisfies Position,
  location: {
    locality: "Sinntal",
    region: "Hessen",
    area: "Main-Kinzig-Kreis",
    countryCode: "DE",
    timezone: "Europe/Berlin",
  } satisfies ProfileLocation,
  consulting: {
    name: "Braum Consulting",
    url: "https://braum.consulting",
  },
  mailUrl: "https://braum.me/mail",
  links: {
    linkedin: "https://linkedin.com/in/stefanbraum",
    consulting: "https://braum.consulting",
    me: "https://braum.me",
    aboutexport: "https://aboutexport.com",
    github: "https://github.com/braum-me",
    substack: "https://stefanbraum.substack.com",
  },
  /** schema.org `sameAs` - verifizierbare Profile/Properties. */
  sameAs: [
    "https://braum.me",
    "https://braum.consulting",
    "https://braum.org",
    "https://braum.dev",
    "https://aboutexport.com",
    "https://linkedin.com/in/stefanbraum",
    "https://github.com/braum-me",
    "https://stefanbraum.substack.com",
  ],
  knowsAbout: [
    "Digital Transformation",
    "IT Leadership",
    "Enterprise Architecture",
    "SAP",
    "Azure Hybrid Cloud",
    "Microsoft 365",
    "IT-Security",
    "Applied AI in Enterprise",
  ],
} as const;
