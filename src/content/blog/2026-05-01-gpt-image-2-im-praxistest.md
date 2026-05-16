---
title: "GPT Image 2 im Praxistest"
date: 2026-05-01
excerpt: "Praxistest des neuen OpenAI-Bildmodells gegen den aktuellen M365-Copilot-Default. Vier reale Mittelstands-Aufgaben, ein klares Ergebnis und eine unangenehme Schwachstelle."
tags: ["ai", "image-generation", "m365", "copilot", "praxistest"]
readingTime: "7 min"
coverImage: "/blog/gpt-image-2-im-praxistest/gpt2main.webp"
---

![GPT Image 2 im Praxistest - Cover](/blog/gpt-image-2-im-praxistest/gpt2main.webp)

Zwischen GPT 5.5, Opus 4.7 und Kimi K2.6 hat letzte Woche eine Release-News vergleichsweise wenig Aufmerksamkeit bekommen. GPT Image 2 holt 242 Elo-Punkte Vorsprung in der Image Arena. Der größte je gemessene Sprung zwischen zwei Bildgenerierungs-Modellen. Ich habe das neue Modell in den letzten Tagen gegen den aktuellen M365-Copilot-Default (GPT Image 1.5) und Googles Nano Banana 2 getestet, mit Fokus auf realistische KMU-Aufgaben.

## Setup

Ich evaluiere KI-Tools systematisch im M365-Kontext, weil Copilot-Adoption bei uns ein laufendes Programm ist. Die Frage ist nicht primär die Bildqualität als Selbstzweck, sondern: Was ändert sich operativ für Mitarbeiter, die heute Aushänge in PowerPoint kleben und Newsletter-Header in Canva bauen.

Vier typische Produktiv-Aufgaben, in denen ein Mittelständler täglich Visuals braucht. Identische Prompts gegen GPT Image 2 (Foundry, April 2026) und GPT Image 1.5 als M365-Copilot-Default. Kein Nachjustieren, kein Cherry-Picking. Nano Banana 2 lief im selben Set parallel, in dieser Auswertung lasse ich es weg, weil die operative Vergleichsfrage für Microsoft-Stack-Anwender beim Vorgänger-/Nachfolger-Modell der M365-Pipeline liegt.

Die vier Aufgaben:

1. Stellenausschreibung als A4-Aushang für die Personalabteilung
2. Vergleichstabelle der Microsoft 365 Lizenzen ohne weiteren Kontext
3. Header-Banner für den internen Mitarbeiter-Newsletter
4. Schichtverteilungs-Diagramm für eine Geschäftsführer-Präsentation

## Aufgabe 1: Stellenausschreibung als Aushang

<div class="compare-grid">
  <figure>
    <img src="/blog/gpt-image-2-im-praxistest/gpt1.5case1.webp" alt="Stellenausschreibung Aushang generiert mit GPT Image 1.5" />
    <figcaption>GPT Image 1.5 (M365-Copilot-Default)</figcaption>
  </figure>
  <figure>
    <img src="/blog/gpt-image-2-im-praxistest/gpt2case1.webp" alt="Stellenausschreibung Aushang generiert mit GPT Image 2" />
    <figcaption>GPT Image 2 (Foundry)</figcaption>
  </figure>
</div>

```text
Stellenausschreibung als A4-Aushang. Header: "Wir suchen Sie!".
Position groß: "Sachbearbeiter (m/w/d) Einkauf". Drei Spalten mit
Icons: "Ihre Aufgaben" (3 Bullets), "Ihr Profil" (3 Bullets),
"Wir bieten" (3 Bullets). Footer: "Bewerbung an:
bewerbung@firma.de · Frist: 15. Juni 2026". Modernes HR-Design.
```

Beide Aushänge sind druckbar. Aber GPT Image 2 wirkt wie modernes HR-Design, GPT Image 1.5 wie eine PowerPoint-Vorlage von 2010. Hierarchie, Iconwahl, Datumsformate sitzen beim ersten Versuch. Die deutschen Umlaute stehen sauber, das war im Vorgänger noch ein Glücksspiel.

## Aufgabe 2: Office-Lizenz-Tabelle

<div class="compare-grid">
  <figure>
    <img src="/blog/gpt-image-2-im-praxistest/gpt1.5case2.webp" alt="Microsoft 365 Lizenz-Vergleichstabelle generiert mit GPT Image 1.5" />
    <figcaption>GPT Image 1.5 (M365-Copilot-Default)</figcaption>
  </figure>
  <figure>
    <img src="/blog/gpt-image-2-im-praxistest/gpt2case2.webp" alt="Microsoft 365 Lizenz-Vergleichstabelle generiert mit GPT Image 2" />
    <figcaption>GPT Image 2 (Foundry)</figcaption>
  </figure>
</div>

```text
Erstelle eine Übersicht der Microsoft 365 Preiserhöhung zum
01.07.2026 für KMU. Zeige Business Basic, Business Standard,
Business Premium mit altem und neuem Preis sowie Steigerung
in Prozent. Sachliche Geschäftsoptik, deutsch.
```

Beide Tabellen sehen plausibel aus. Aber zwei Zahlen stimmen in beiden Versionen nicht. Sieht überzeugend aus, ist aber falsch. Je besser die Modelle werden, desto wichtiger wird der Faktencheck im Detail. Überzeugend wirkt die Variante von GPT Image 2 trotzdem deutlich, was den Effekt nur verstärkt. Ich komme weiter unten darauf zurück, das ist der wichtigste Punkt aus dem ganzen Test.

## Aufgabe 3: Mitarbeiter-Newsletter-Header

<div class="compare-grid">
  <figure>
    <img src="/blog/gpt-image-2-im-praxistest/gpt1.5case3.webp" alt="Newsletter-Header-Banner generiert mit GPT Image 1.5" />
    <figcaption>GPT Image 1.5 (M365-Copilot-Default)</figcaption>
  </figure>
  <figure>
    <img src="/blog/gpt-image-2-im-praxistest/gpt2case3.webp" alt="Newsletter-Header-Banner generiert mit GPT Image 2" />
    <figcaption>GPT Image 2 (Foundry)</figcaption>
  </figure>
</div>

```text
Banner für Mitarbeiter-Newsletter Mai 2026. Querformat, A4
Landscape. Headline "Was uns im Mai bewegt" groß links. Rechts
daneben: Mini-Kachel mit drei Story-Teasern als Bullets:
"Neuer Standort Frankfurt eröffnet", "Sommerfest am 15. Juni",
"Energieaudit-Ergebnisse veröffentlicht". Footer mit Datum und
Firmenlogo-Platzhalter. Dezente Geschäfts-Optik, blau-grau,
druckbar.
```

Skyline als Brand-Element gegenüber Stockfoto im Banner. Das ist der Unterschied zwischen Editorial-Layout und Office-Vorlage. GPT Image 2 setzt Icons für die drei Story-Teaser, GPT Image 1.5 packt sie als Bullet-Liste daneben. Das eine sieht aus wie ein moderner Newsletter, das andere wie ein Word-Dokument mit Cover-Bild.

## Aufgabe 4: Schichtverteilungs-Diagramm

<div class="compare-grid">
  <figure>
    <img src="/blog/gpt-image-2-im-praxistest/gpt1.5case4.webp" alt="Schichtverteilungs-Diagramm generiert mit GPT Image 1.5" />
    <figcaption>GPT Image 1.5 (M365-Copilot-Default)</figcaption>
  </figure>
  <figure>
    <img src="/blog/gpt-image-2-im-praxistest/gpt2case4.webp" alt="Schichtverteilungs-Diagramm generiert mit GPT Image 2" />
    <figcaption>GPT Image 2 (Foundry)</figcaption>
  </figure>
</div>

```text
Diagramm für eine Präsentation, das zeigt wie unsere Mitarbeiter
sich über drei Schichten verteilen, und wieviele dann jeweils in
welche Abteilung gehen. Frühschicht 120 → davon 60 Produktion,
40 Lager, 20 Versand. Mittagsschicht 180 → 100 Produktion,
50 Verwaltung, 30 Vertrieb. Spätschicht 80 → 70 Produktion,
10 Lager.
```

GPT Image 2 ergänzt unaufgefordert Prozentwerte und eine Gesamt-Zeile. Das Modell denkt mit. Im Prompt standen die Mitarbeiterzahlen pro Schicht und Abteilung als absolute Werte, ohne Aggregat-Aufforderung. GPT Image 2 hat erkannt, dass eine Geschäftsführer-Präsentation ohne Prozentwerte und Summen nicht funktioniert, und das Layout entsprechend gebaut. Genau die Information, die man erwartet, aber im Prompt selten sauber beschreibt.

## Wo beide Modelle versagen

Die Lizenz-Tabelle ist der wichtigste Befund aus dem ganzen Test. Beide Modelle haben dieselben zwei Pricing-Fehler eingebaut. Die Tabellen sehen so professionell aus, dass man die falschen Zahlen ohne Faktencheck sofort übernimmt. Das ist die eigentliche Gefahr beim Sprung in dieser Bildqualität.

Bisheriger Reflex bei AI-generierten Visuals: "Sieht aus wie selbst gemacht in PowerPoint, also gucke ich nochmal drüber." Mit GPT Image 2 fällt dieser Reflex weg. Das Modell liefert druckreife Layouts, und genau dadurch erhöht sich das Risiko, dass falsche Zahlen ungeprüft in den internen Versand gehen.

**Konsequenz für den Stack:** Faktencheck-Routinen müssen zur Standard-Disziplin werden, sobald generative Bild-Tools im Endbenutzer-Bereich ankommen. Vor allem bei Tabellen, Zahlen, Datumswerten, Preisen, allem was Auditfähigkeit braucht.

## Status im Microsoft-Stack

GPT Image 2 ist im Microsoft-Stack noch nicht in den End-User-Tools angekommen, derzeit nur über Microsoft Foundry für Entwickler verfügbar. M365 Copilot läuft seit Q1 2026 weiter auf der Vorgänger-Version 1.5, in meinen Tests deutlich abgeschlagen.

Wann das Update kommt, ist offen. Erfahrungsgemäß dauert es zwischen Foundry-Verfügbarkeit und Copilot-Integration zwei bis vier Quartale. Bis dahin haben Mittelständler einen unangenehmen Zustand: Das deutlich bessere Modell ist verfügbar, aber außerhalb des Workflow-Tools, das die Mitarbeiter eigentlich nutzen sollen.

**Operative Konsequenz:** Wer KI-Bildgenerierung als Produktivitäts-Hebel ernst nimmt, kann nicht warten, bis Microsoft das Update einspielt. Foundry-Zugriff für eine kleine Power-User-Gruppe einrichten, klare Use-Cases für die nächsten zwei Quartale definieren, Adoption begleiten. Das ist günstiger und sauberer als später eine ungesteuerte Welle aus Schatten-Tools einzufangen.

## Was sich für den Mittelstand ändert

Der Anteil generierter Inhalte im Daily Business wird mit GPT Image 2 stark steigen. Aushänge, Einladungen, Schulungsfolien, Newsletter-Header, alles was bisher in Canva, PowerPoint oder beim externen Designer landete, wird mit deutlich weniger Aufwand produzierbar.

Für KMU ohne eigene Kreativ-Abteilung ist das die größere Veränderung als jeder neue LLM-Release. Das interne Niveau hebt sich. Newsletter, Aushänge, Präsentationen werden in der Breite besser, ohne dass jemand "Designer" lernen muss. Die echte Kreativ-Arbeit bleibt ein anderer Skill, aber das Plateau, von dem aus alle starten, liegt höher.

Was bleibt: die Faktencheck-Disziplin. Schöne Layouts haben heute eine eigene Überzeugungskraft, und falsche Zahlen darin sind teurer als vorher.
