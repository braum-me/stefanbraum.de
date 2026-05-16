---
title: "Vier Websites mit Claude Code"
date: 2026-05-10
excerpt: "Vier Websites in zwei bis drei Wochen auf modernem Stack, mit hohem Claude-Code-Anteil. Was das über die nächsten fünf Jahre sagt, wenn dieselben Tools demnächst jeder im Mittelstand nutzt."
tags: ["claude-code", "ai", "build", "stack", "websites"]
readingTime: "7 min"
coverImage: "/blog/vier-websites-mit-claude-code/thumbnail.webp"
---

![Vier Websites mit Claude Code](/blog/vier-websites-mit-claude-code/thumbnail.webp)

In den letzten Wochen sind vier neue Websites online gegangen: stefanbraum.de, braum.me, braum.org und braum.dev. Selber Stack, eigene Funktion pro Website. Astro 5 als Backbone, React für interaktive Komponenten, Tailwind 4 für das Styling, GSAP für die Bewegung, Coolify für den Deploy. Pro Website ein eigenes Repo, eigenes Layout, eigene Tonality.

Aufwand: zwei bis drei Wochen, Abende und Wochenenden. Anteil Claude Code im Workflow: geschätzt 60 bis 70 Prozent vom Codeaufwand. Der Rest ist Architektur-Entscheidungen, Design-Direction, Inhalt, und das Debugging der Kanten, wo Modelle noch nicht souverän sind.

Vor 18 Monaten hätte ich dieselben vier Websites auf WordPress-Basis gebaut. Mindestens fünffacher Aufwand, oder ein externer Entwickler über mehrere Wochen. Das Ergebnis wäre in beiden Fällen schwächer geworden.

## Was vor dem Code passiert

Code schreibt das Modell. Das ist mittlerweile Commodity. Was nicht Commodity ist, sind die Entscheidungen davor und drumherum.

Eine Familie aus vier Websites zu denken heißt, vorher zu klären: Was ist die Funktion jeder einzelnen Site? Welcher Ton spricht zu welcher Zielgruppe? Wie unterscheidet sich braum.me von stefanbraum.de inhaltlich, obwohl beide dieselbe Person zeigen? Wo darf der Stack abweichen, wo nicht? Welche Eyebrow-Logik trägt durchs ganze System?

Diese Fragen löst kein Modell. Sie werden vorher entschieden und dokumentiert, in Project-Instructions, in Skills, in CLAUDE.md-Files, sodass Claude Code in jeder Sitzung weiß, in welchem Universum es gerade arbeitet. Während der Umsetzung kommen permanent weitere Entscheidungen dazu: passt eine generierte Komponente zur Brand, oder ist sie ein generischer Tailwind-Klotz. Soll ein Layout-Vorschlag verworfen oder iteriert werden. Wann lohnt es sich, einen sauberen zweiten Anlauf zu nehmen, statt einen schlechten ersten zu retten.

Das Modell schreibt den Code, aber der Mensch bleibt im Loop, und zwar pro Sitzung dutzende Male. Genau dieses Setup ist die Architekt-Arbeit, die übrig bleibt. Sie wird wichtiger, weil das Ausführungstempo steigt.

Engineering zerfällt in zwei Schichten. Die Strategie-Schicht oben, die menschlich bleibt. Die Ausführungs-Schicht unten, die zunehmend agentisch läuft. Wer beide Schichten verstanden hat, ist die neue knappe Ressource.

## Was ich im Hauptjob beobachte

Die These ließe sich an dieser Stelle als "die Zukunft kommt" formulieren. Sie ist aber bereits da, nur ungleich verteilt.

Ich sehe zwei Bewegungen im laufenden Betrieb:

**SAP-Projektleiter werden zu Entwicklern.** Menschen, die jahrelang Anforderungen geschrieben und Tickets verteilt haben, fangen an, mit Copilot oder Claude Code eigene Reports, Mappings, kleine Tools zu bauen. Wo sie früher für einen MVP auf knappe Entwickler-Ressourcen warten mussten, bauen sie heute selbst los und verfeinern ihre Produktidee auf dem Weg. Sie schreiben kein Java, kein ABAP, sie führen einen Dialog mit dem Modell. Das Ergebnis ist nicht immer schön, läuft aber. Und es kürzt Wochen ab, in denen früher die Entwicklung in der Backlog-Warteschlange stand.

**Mitarbeiter lernen, Aufgaben an AI zu delegieren.** Das ist ein anderer Skill als das, was man in zwanzig Jahren Office-Arbeit gelernt hat. Eine Aufgabe sauber an einen Kollegen zu übergeben verlangt Kontext, Klarheit, Erfolgskriterien. Eine Aufgabe sauber an Claude oder Copilot zu übergeben verlangt das auch, nur in geschriebener Form, präzise und ohne Zwischenmenschliches. Wer das lernt, multipliziert sich.

## Was das in fünf Jahren bedeutet

Wenn die Adoption-Kurve weiter so steigt, sind agentische Tools für nicht-technische Mitarbeiter genauso normal wie heute Outlook und Excel. Marketing baut Landingpages mit Claude Code, Vertrieb generiert Angebots-PDFs aus Prompt-Templates, der Einkauf zieht sich Lieferanten-Vergleiche aus AI-Pipelines.

Was heute noch IT-Projekt mit Anforderungs-Dokument und Lasten-Heft ist, wird Self-Service mit Modell-Hilfe. Das hat zwei Konsequenzen, die unbequem sind.

Erstens: Die IT-Organisation verliert ihr Monopol auf das Bauen. Die Citizen-Developer-Idee, die Microsoft mit Power Platform seit Jahren predigt, wird zur Realität auf einem ganz anderen Niveau. Power Apps wirken neben Claude Code wie Lego im Vergleich zu echtem Engineering. Was Microsoft als kontrollierte Low-Code-Welt unter IT-Aufsicht entworfen hat, wird zur unkontrollierten Code-Welt im Browser jedes einzelnen Mitarbeiters. Die IT behält das Monopol auf Architektur, Sicherheit, Datenmodell, Compliance. Das Bauen wandert ab. Wer das früh erkennt, gestaltet die Schatten-Tools, bevor er sie einfangen muss.

Zweitens: Der Skill-Bedarf in der IT-Abteilung verschiebt sich. Code-Produktion wird Commodity. Architektur-Verständnis, Plattform-Denken, Vendor-Bewertung, Adoption-Begleitung werden knapp. IT-Teams, die heute nur Tickets abarbeiten, werden in wenigen Jahren Schwierigkeiten haben, ihren Wertbeitrag zu erklären. Wer Plattform anbietet, Architektur sichert und Adoption begleitet, wird gebraucht wie nie.

## Was IT-Abteilungen jetzt tun sollten

Drei Schritte, die kein Budget brauchen, sondern Aufmerksamkeit:

**Adoption beobachten statt verbieten.** Wer nutzt schon Claude Code, ChatGPT, Copilot privat im Job? Was bauen sie damit? Wo sind die Schatten-Workflows? Wer das nicht weiß, regiert nicht.

**Power-User holen, nicht IT-Trainings ausrollen.** Eine Handvoll motivierte Mitarbeiter aus den Fachabteilungen, die vorgehen und Beispiele schaffen, ist mehr wert als ein Pflicht-E-Learning für 800 Personen. Die Power-User werden zu internen Multiplikatoren, ohne dass die IT als Lehrer auftreten muss.

**Plattform-Frage ehrlich stellen.** Welche AI-Tools sind im Stack zugelassen, welche nicht, und warum. Ist die Antwort älter als drei Monate, ist sie nicht aktuell. Die Lizenz-Welt von OpenAI, Anthropic, Microsoft, Google verändert sich quartalsweise. Eine 18-Monats-Strategie hilft niemandem.

## Zurück zu den vier Websites

Eine Person, zwei bis drei Wochen, vier Websites auf modernem Stack. Das ist der neue Mittelwert für jemanden, der die Tools aktiv nutzt.

Wer einen Blick auf die Resultate werfen will:

- [stefanbraum.de](https://stefanbraum.de): dieser Blog plus Über-Mich-Hub
- [braum.me](https://braum.me): digitale Visitenkarte mit allen Links zu mir
- [braum.org](https://braum.org): AI-Tech-Stack-Lab. Über Umsatz, Branche und Unternehmensgröße bewertet das Tool die eigene AI-Architektur und zeigt, welcher Systemtyp im konkreten Kontext besser passen würde
- [braum.dev](https://braum.dev): Lab für eigene Projekte und Testcases

Was bedeutet das, wenn dasselbe Plateau in fünf Jahren für Vertriebler, Produktmanager und Marketing-Verantwortliche gilt. Die ehrliche Antwort ist, dass niemand es genau weiß. Was sich aber abzeichnet: Die Frage ist nicht mehr, ob sich Engineering-Arbeit verteilt. Sie ist, wer in der eigenen Organisation früh genug ist, um die Verteilung zu gestalten.
