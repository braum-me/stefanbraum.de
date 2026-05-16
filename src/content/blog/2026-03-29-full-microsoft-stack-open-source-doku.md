---
title: "Full Microsoft-Stack, Open-Source-Doku"
date: 2026-03-29
excerpt: "Wie man im Mittelstand zur Wissensbasis kommt, die besser in Copilot findbar ist als Microsofts eigene Tools."
tags: ["m365", "copilot", "mcp", "knowledge-base", "self-hosted", "outline"]
readingTime: "11 min"
coverImage: "/blog/full-microsoft-stack/hero.webp"
---

Microsoft 365. SAP. Azure. Copilot als AI-Backbone im Alltag. Ein Mittelständler, der seit Jahren konsequent im Microsoft-Ökosystem investiert. Wenn in einem solchen Setup die Frage aufkommt, wo künftig strukturiert dokumentiert werden soll, lautet die erwartbare Antwort: irgendwas aus dem Microsoft-Universum.

Ich habe mich anders entschieden. Die Wissensbasis läuft seit kurzem auf Outline, self-hosted, im eigenen Rechenzentrum. Source-available, kein Cloud-Abo, keine Lizenzgebühr.

**Die These, um die es in diesem Post geht:** Im AI-Zeitalter ist die beste Wissensbasis für einen Microsoft-Stack-Mittelständler kein Microsoft-Tool. Sie ist ein quelloffenes Wiki, das man selbst betreibt und in den eigenen AI-Hub integriert.

Wie man dahin kommt und was man dafür aufgibt: hier entlang.

![Outline-Wissensbasis mit Copilot-Integration](/blog/full-microsoft-stack/hero.webp)

## Der Trigger: Copilot hat keine Schnittstelle ins Gehirn

Copilot ist nur so gut wie das Material, aus dem er antworten kann. Wer heute einen AI-Assistenten im Unternehmen einführt, stellt schnell fest: die Technik ist das kleinere Problem. Das größere Problem ist, dass das Wissen eines Mittelständlers zum Großteil in Köpfen steckt. In E-Mails, in Teams-Chats, in einer Notiz auf dem Desktop einer Führungskraft, in einem PDF, das seit 2019 nicht mehr geöffnet wurde.

Copilot hat keine Schnittstelle ins Gehirn der Mitarbeiter. Wenn es kein strukturiertes Company Brain gibt, antwortet der Assistent mit allgemeinen Floskeln oder mit veralteten SharePoint-Fundstücken. Beides macht die Einführung teuer und das Ergebnis enttäuschend.

Wer 2026 AI im Mittelstand ernsthaft einsetzen will, braucht zuerst eine belastbare Wissensbasis. Die Frage, auf welchem Tool die entsteht, ist dann keine IT-Detailentscheidung. Sie ist eine strategische.

## Was Enterprise-Doku leisten muss

Die Kriterienliste, an der man die Tools messen sollte, sieht unspektakulär aus. Sie ist trotzdem der Kern.

Erstens: Struktur, die auf tausende Seiten skaliert. Eine Wissensbasis, die über Jahre wächst. Keine Team-Notizen.

Zweitens: Auffindbarkeit durch Copilot. Der AI-Hub muss die Inhalte kennen, indexieren und zitieren können. Alles andere bedeutet, dass Mitarbeiter weiter selbst suchen. Damit verliert die Doku den wichtigsten Teil ihres Werts.

Drittens: Geschwindigkeit und Alltagstauglichkeit. Ein Wiki, das Kollegen aus Reibung nicht pflegen, ist wertlos. Die UX entscheidet über die Adoption.

Viertens: Governance und Auditierbarkeit. Berechtigungsmodell, Versionshistorie, Löschkonzept, Audit-Trail. Im Mittelstand mit ISO 27001-, TISAX- oder NIS2-Pflichten ist das keine Komfortfrage, sondern eine Compliance-Voraussetzung.

Fünftens: Entkopplung von einer einzelnen Tool-Roadmap. Eine Wissensbasis lebt länger als zehn Jahre. Abhängigkeit vom Rhythmus eines einzelnen Herstellers ist ein Risiko, das in dieser Zeitspanne fast immer eintritt.

## Die Kandidaten

**OneNote** ist ein Notizbuch. Struktur kommt über Disziplin der Nutzer, nicht durch das Tool. Microsoft hat OneNote über Jahre strukturell nicht weiterentwickelt. Es bleibt im M365-Stack mitgepreist und dort geparkt. Für Einzelpersonen gut. Für eine Wissensbasis, die hundert Mitarbeiter über Jahre füttern sollen, der falsche Ausgangspunkt.

![OneNote - Notizbuch in M365](/blog/full-microsoft-stack/onenote.webp)

**Confluence** wäre der Industrie-Default, wenn es einen gäbe. Atlassian hat über die Jahre die mit Abstand beste Microsoft-365-Integration aller Drittanbieter aufgebaut, von Teams-Apps bis SharePoint-Konnektoren. Trotz dieses Integrationsvorteils fällt Confluence raus. Das Problem ist das Alter. Die Performance ist ein Dauerärgernis, die UI spürbar gealtert, und seit dem Cloud-Shift hat Atlassian die Lizenzmodelle für mittelgroße Umgebungen deutlich teurer gemacht. Wer Atlassian-Stack ohnehin betreibt, für den ist Confluence eine legitime Wahl. Wer 2026 neu bei der Frage ankommt, hat keinen guten Startpunkt mehr.

![Confluence Interface](/blog/full-microsoft-stack/confluence.webp)

**Loop** ist Microsofts moderner Versuch. Es funktioniert gut für ad-hoc Collaboration innerhalb von Teams-Meetings und Projekten. Für eine strukturierte Wissensbasis sind die Loop-Komponenten zu lose. In Copilot ist Loop-Content inkonsistent auffindbar. Loop ist ein gutes Co-Writing-Tool. Es ist kein Enterprise-Wiki.

![Microsoft Loop - kollaborative App](/blog/full-microsoft-stack/loop.webp)

**Notion** ist der wichtigste Ausschluss in dieser Liste, weil er nicht offensichtlich ist. Notion ist technisch exzellent, das UX-Niveau ist unbestritten. Das Problem hat zwei Seiten.

![Notion Desktop](/blog/full-microsoft-stack/notion.webp)

Erstens die Positionierung. Notion ist über das Knowledge-Zentrum hinaus ein AI-Zentrum geworden: Notion AI, eigener Agent-Layer, proprietärer Query-Mechanismus auf den eigenen Inhalten. Im Microsoft-Stack, in dem Copilot der zentrale AI-Hub ist, kollidiert diese Doppelpositionierung mit der Microsoft-Philosophie. Die Wissensbasis soll den AI-Hub füttern. Sie soll nicht mit ihm um den User konkurrieren.

Zweitens der Funktionsumfang. Notions Datenbanken und Listen sind über die Jahre sehr mächtig geworden. Das ist hervorragend, wenn man eine vollumfängliche Second-Brain-Instanz baut, in der alles miteinander verknüpft, gefiltert und automatisiert wird. Für eine Enterprise-Wissensbasis ist diese Tiefe überdimensioniert und lenkt vom Kern ab: Hierarchie, Suche, Berechtigungen, klare Reviewzyklen. Im reinen Notion-Setup oder bei einer Startup-Ausrichtung ist Notion erste Wahl. Im M365-geprägten Mittelstand bedeutet Notion zwei AI-Silos und ein Tool, das mehr ist, als die Aufgabe verlangt.

## Warum Outline funktioniert

Outline ist ein Wiki unter Business Source License 1.1, für interne Unternehmensnutzung frei, als Docker-Container self-hosted betreibbar. Modernes UX, schnell, klare Datenstrukturen, saubere REST-API. So weit die nackten Fakten.

![Outline Interface](/blog/full-microsoft-stack/outline.webp)

Was den Unterschied macht, sind drei Eigenschaften: die UX-Tiefe, die Compliance-Tauglichkeit und die selbst gebaute Copilot-Integration.

### Smoothness, die mit Notion mithält

Der häufigste Reflex bei Open-Source-Tools lautet: spartanisch, technisch, nichts für Endnutzer. Bei Outline trifft das nicht zu. Der Editor ist real-time multi-user-fähig, mehrere Personen schreiben gleichzeitig an derselben Seite, ähnlich wie in Google Docs oder Notion. Das Markdown-Modell ist nativ: Markdown-Shortcuts funktionieren beim Tippen, Import und Export laufen sauber als Markdown. Word-Dokumente lassen sich per Drag-and-Drop direkt in eine Collection ziehen, Outline konvertiert. Confluence-Spaces und Notion-Workspaces können als Export-Datei importiert werden, was Migrationen aus diesen Tools praktikabel macht.

Diagramme sind über die Diagrams.net-Integration (draw.io) eingebunden, ohne dass man auf externe Tools wechseln muss. Kommentare lassen sich auf Textstellen ankern, mit Mentions arbeiten und als gelöst markieren. Die Suche ist schnell, die Sidebar-Navigation aufgeräumt, Templates sind eingebaut.

Die ehrliche Einschränkung: Outline ist kein Notion-Klon. Es gibt keine Datenbanken, keine Boards, keine inline AI-Features im Editor. Outline ist ein Wiki, kein Workspace. Wer Datenbanken braucht, sucht woanders. Für eine strukturierte Wissensbasis ist diese Reduktion ein Vorteil.

### Compliance: ISO 27001, TISAX, NIS2

Im Mittelstand mit Audit-Pflichten landet jede Tool-Entscheidung früher oder später beim ISMS-Gespräch. Outline ist hier ein dankbares Tool.

Die Datenresidenz ist klar: alles liegt im eigenen Rechenzentrum, in der eigenen Hand. Bei Cloud-Tools muss man bei jedem ISO-Audit erneut nachweisen, wo die Daten verarbeitet werden, ob ein Subcontractor in den USA oder in Indien Zugriff hat, ob die Datenkategorien sauber getrennt sind. Bei self-hosted Outline ist das eine kurze Aussage statt eines Vertragspakets.

Die Auditierbarkeit ist Standardumfang: jede Seite hat eine vollständige Versionshistorie, jede Änderung ist nachvollziehbar, Workspace-Audit-Logs liegen vor. Berechtigungen lassen sich auf Collection- und Gruppen-Ebene granular setzen. Löschkonzepte sind über die eigene Datenbank kontrollierbar, nicht über die Goodwill-Politik eines SaaS-Anbieters.

Konkret: Wer dokumentierte Betriebsabläufe nach ISO 27001 pflegen muss, bekommt mit Outline ein Tool, das Versionierung, Reviewzyklen und Audit-Trail von Haus aus mitbringt. Im Audit erspart das Diskussionen.

![Outline - Document Sharing & Permissions](/blog/full-microsoft-stack/outline-permissions.webp)

### Die selbst gebaute Copilot-Integration

Das ist der Punkt, an dem Outline von "gutes Self-Hosted-Wiki" zu "strategisch beste Wahl für M365-Stack" aufsteigt. Drei Integrationsebenen, die man sich selbst baut.

**Ebene 1: Microsoft Graph Connector.** Outline-Inhalte werden in den Microsoft-365-Search-Index eingespeist und sind damit für Copilot auffindbar wie interne SharePoint-Dokumente. Aus Sicht des Endnutzers gibt es keinen Unterschied zwischen einer Antwort, die Copilot aus SharePoint zieht, und einer, die aus Outline kommt.

**Ebene 2: MCP-Server.** Das Model Context Protocol ist inzwischen in Copilot Studio generell verfügbar. Ein self-hosted MCP-Server vor der Outline-API erlaubt es, einen Copilot-Agenten gezielte Queries absetzen zu lassen: eine bestimmte Seite lesen, eine Collection durchsuchen, bei Bedarf auch eine neue Seite schreiben. Damit wird Outline vom reinen Wissensspeicher zum aktiven Teil der Agent-Workflows.

**Ebene 3: Spezialisierter Copilot-Agent.** In Copilot Studio lässt sich ein Agent bauen, dessen Aufgabe der strukturierte Umgang mit der Wissensbasis ist. Neue Mitarbeiter befragen ihn im Onboarding, erfahrene Kollegen nutzen ihn als Schnellsuche, Fachabteilungen lassen sich Übersichten und Protokollstrukturen generieren.

Die Pointe kommt jetzt. Ausgerechnet das Nicht-Microsoft-Tool hat die beste Copilot-Integration. Genau deshalb, weil Outline quelloffen und self-hosted ist. Die Integration liegt in der eigenen Hand. Sie hängt nicht an Microsofts Tool-Roadmap für OneNote, Loop oder einen möglichen Nachfolger. Sie ist selbst gebaut, selbst gewartet, selbst verstanden.

Eine saubere API plus MCP plus eigener Graph Connector gibt mehr Kontrolle über die Integration als ein proprietäres Default-Tool je bieten könnte.

## Was man dafür aufgibt

Der Post wäre unehrlich, wenn er die Kosten der Entscheidung verschwiege.

Betriebsverantwortung ist real. Self-hosted bedeutet: das Wiki läuft auf eigener Infrastruktur, Updates kommen nicht automatisch, Backups sind eigene Aufgabe, der Wartungsaufwand ist laufend. Nicht hoch, aber vorhanden.

Die Integrationen sind Eigenbau. Der Graph Connector, der MCP-Server, der Copilot-Agent: alles Dinge, die man konfigurieren, betreiben und im Zweifel debuggen muss. Das kostet einmalig Zeit und laufend Aufmerksamkeit.

Es gibt keinen Enterprise-Vendor, den man anrufen kann, wenn es klemmt. Die Community ist aktiv, aber sie ist kein SLA.

Zur Lizenz: BSL 1.1 erlaubt die Nutzung für das eigene Unternehmen, verbietet aber den Betrieb von Outline als kommerzieller Document-Service für Dritte. Für interne Wissensbasis im eigenen Haus unproblematisch. Wer den Rechtsweg sauber haben will, lässt das im Vorfeld prüfen.

Für eine Organisation ohne eigene IT-Tiefe wäre das alles der falsche Weg. Der Weg ist nicht gratis. Der Preis ist Aufmerksamkeit und Kompetenz im eigenen Haus.

## Die Lesson

Die Frage, die ich früher gestellt habe, war: Microsoft-Tool oder Drittanbieter. Die bessere Frage lautet: Wer kontrolliert die Integration?

Ein Default-Tool aus dem Hersteller-Ökosystem zu wählen ist der einfache Weg. Auf lange Sicht bindet man sich damit an die Integrationsqualität und den Entwicklungsrhythmus eines einzigen Anbieters. Ein quelloffenes Tool mit sauberer API und MCP-Unterstützung zu wählen kostet mehr Aufmerksamkeit. Es gibt dafür aber die Kontrolle über die wichtigste Eigenschaft zurück: wie gut der AI-Hub die eigene Wissensbasis versteht.

Im Mittelstand ist diese Kombination 2026 noch unterschätzt. Source-available, self-hosted, MCP-integriert, auf Copilot eingestellt, ISO-tauglich. Wer die Fähigkeit hat, so etwas selbst zu betreiben, hat in den nächsten Jahren einen Vorteil gegenüber Wettbewerbern, die bei jeder Tool-Entscheidung dem Default folgen.

Vielleicht ist das die eigentliche Erkenntnis: In einer Welt, in der AI die Arbeitsweise verändert, wird die Fähigkeit, Infrastruktur selbst zu betreiben und Integrationen selbst zu bauen, wieder zum Differenzierungsfaktor. Nicht überall. Aber da, wo es zählt.
