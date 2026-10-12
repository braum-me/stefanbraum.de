---
title: "agi.jetzt v3: Vom AGI-Tracker zum Observatorium"
date: 2026-10-12
excerpt: "In den vergangenen Wochen habe ich agi.jetzt praktisch neu gebaut. Aus dem AGI-Tracker mit Score und Weekly wird ein Observatorium, das Fähigkeiten, Verfügbarkeit und Unsicherheit getrennt ausweist. Warum ich den Score abgeschafft habe und was sonst unter der Haube passiert ist."
tags: ["agi", "ki", "agi-jetzt", "methodik", "build"]
readingTime: "11 min"
draft: true
coverImage: "/blog/agi-jetzt-v3-observatorium/thumbnail.webp"
---

![agi.jetzt v3: Vom AGI-Tracker zum Observatorium](/blog/agi-jetzt-v3-observatorium/thumbnail.webp)

In den vergangenen Wochen habe ich agi.jetzt praktisch neu gebaut. Die neue Version, intern v3, befindet sich gerade in den letzten Schritten vor dem öffentlichen Wechsel. Wer heute auf agi.jetzt geht, sieht noch die bisherige Version. Dieser Beitrag beschreibt, was sich ändert und vor allem warum.

Auf den ersten Blick sieht das nach einem Redesign aus. Neue Startseite, neue Typografie, neue Navigation. Das ist aber der kleinere Teil der Arbeit. Die eigentliche Änderung betrifft die Frage, wie ich KI-Fortschritt überhaupt beobachten will. Im Juni habe ich hier über den [ersten Stand von agi.jetzt](/blog/2026-06-14-den-weg-zur-agi-dokumentieren/) geschrieben: ein Tracker mit Dashboard, wöchentlichem Briefing und einem Composite Score aus acht Benchmarks. Ein paar der Entscheidungen von damals habe ich in v3 bewusst zurückgenommen.

## Vom Tracker zum Observatorium

Die erste Version war im Kern eine Publikation. Ein Score als Headline, ein Dashboard mit Kontextzahlen, jede Woche ein Weekly. Das hat funktioniert, solange die Frage lautete: Was ist diese Woche passiert?

Mit jedem Monat Betrieb kamen aber Fragen dazu, die das alte Modell nicht sauber beantworten konnte. Welche Modelle sind gerade wirklich an der Spitze, und nach welchem Kriterium? Ist ein angekündigtes Modell schon verfügbar, oder nur in einer Preview für ausgewählte Kunden? Wenn Microsoft ein neues Copilot-Feature ausrollt, ist das AGI-Fortschritt oder Produktpflege? Und was ist eigentlich mit all den Bild-, Video- und Sprachmodellen, die in keinem Chat-Leaderboard auftauchen?

v3 ist um diese Fragen herum gebaut. Die Seite soll grob sieben Dinge beantworten können: Was ist AGI? Woran würden wir sie erkennen? Wie weit sind die aktuellen Systeme? Welche Anbieter und Modelle sind tatsächlich an der Spitze? Was hat sich zuletzt verändert? Welche Fähigkeiten kommen schon in echten Produkten und in der Unternehmensarbeit an? Und was heißt das für Firmen, Software, Arbeit und Organisationen?

Die Startseite folgt diesem Bogen. Oben bleibt die Leitfrage "Wie nah sind wir an AGI?". Darunter kommt zuerst, was sich verändert hat, dann die Spitzenmodelle, dann die breitere Modell-Landschaft, dann der eigentliche AGI-Fortschritt nach Fähigkeiten, dann Work AI, also das, was Organisationen heute nutzen können, und zum Schluss das Weekly. Die Reihenfolge ist eine redaktionelle Entscheidung: erst Bewegung, dann Einordnung, dann Konsequenz. Optisch soll sich das eher wie ein Observatorium anfühlen als wie ein Dashboard voller Kennzahlen, deren Auswahl man nicht nachvollziehen kann.

## Warum es keinen AGI-Score mehr gibt

Die größte inhaltliche Änderung ist eine Streichung. agi.jetzt zeigt bewusst keine einzelne Zahl mehr, die ausdrückt, wie weit wir auf dem Weg zu AGI sind.

Im Juni habe ich den damaligen Proximity Index noch verteidigt. Gewichtetes geometrisches Mittel, Sättigungsregel, klare Quellen. Methodisch war das sauber gemacht. Das Problem liegt eine Ebene darüber. Ein Satz wie "Wir sind bei 73 Prozent" suggeriert, dass AGI eine Strecke mit bekanntem Ziel ist und dass sich die Fortschritte in Reasoning, Gedächtnis und Autonomie sinnvoll zu einer Größe verrechnen lassen. Beides ist nicht der Fall. Die Gewichtung bleibt willkürlich, die Benchmarks messen unterschiedliche Dinge, und für einige Dimensionen gibt es schlicht keine belastbare Evidenz. Eine Prozentzahl versteckt genau diese Lücken.

v3 schaut deshalb auf getrennte Fähigkeitsfelder: Reasoning, Learning & Memory, Autonomy, Long-horizon Execution, Tool & Computer Use, Software & Artifact Creation, Multimodality, Reliability, Adaptability und Generality. Für jedes Feld zeigt die Seite die zugrunde liegende Evidenz und macht sichtbar, wo sie stark ist, wo sie dünn ist und wo sie fehlt.

Der Preis dafür ist eine schlechtere Headline. Eine Zahl lässt sich teilen, zitieren und in einen LinkedIn-Post packen. Zehn Felder mit unterschiedlicher Evidenzlage nicht. Ich halte das trotzdem für die ehrlichere Variante. Unbekannt ist mir lieber als ausgedachte Präzision.

## Zwei Fronten: Intelligence und Deployment

Die zweite konzeptionelle Änderung ist die Trennung von zwei Fragen, die in der öffentlichen Diskussion ständig vermischt werden.

Die Intelligence Frontier fragt: Was können die stärksten aktuellen Systeme tatsächlich? Die Kette dahinter lautet Modell, Benchmark und Evidenz, Fähigkeit, AGI-Fortschritt.

Die Deployment Frontier fragt: Welche dieser Fähigkeiten sind schon in Produkten angekommen, die Menschen und Organisationen nutzen können? Hier lautet die Kette Modellfähigkeit, Produkt oder Harness, echter Einsatz in der Arbeit.

Beides hängt zusammen, ist aber nicht dasselbe. Ein neues Feature in ChatGPT, Copilot oder Claude ist erstmal eine Produktentscheidung. Es kann eine neue Fähigkeit zugänglich machen, es kann aber auch eine längst vorhandene Fähigkeit nur besser verpacken. Wer beides in einen Topf wirft, liest jeden Produkt-Launch als Schritt Richtung AGI. Umgekehrt unterschätzt man leicht, wie viel ein gutes Produkt aus einem Modell herausholt.

Dazu gehört eine zweite Unterscheidung, die in v3 an mehreren Stellen auftaucht: Modell allein gegen Modell plus Harness. Agents, Tools, Gedächtnis und Orchestrierung können die beobachtete Leistung erheblich verändern. Ein Modell, das im nackten API-Aufruf an einer Aufgabe scheitert, löst sie mit Dateisystem, Code-Ausführung und mehreren Anläufen womöglich zuverlässig. Beide Ergebnisse sind real, sie messen aber unterschiedliche Dinge. Die Seite weist deshalb aus, unter welchen Bedingungen eine Beobachtung zustande kam.

## Was gerade als Frontier zählt

In der alten Version standen Modelle ziemlich gleichberechtigt nebeneinander. v3 hat eine explizit kuratierte Frontier, also die Systeme, die aktuell den Stand der Technik definieren.

Zum Zeitpunkt dieses Entwurfs sind das zehn Modelle von vier Anbietern: von OpenAI GPT-6 Astra, GPT-6.1 Sol und GPT-6 Luna, von Anthropic Claude Fable 5.1, Claude Opus 5.5 und Claude Sonnet 5.5, von Google Gemini 4 Argon, Gemini 3.8 Flash und Gemini 3.5 Flash-Lite, und von SpaceXAI Grok 4.7.

Die Namen werden schnell altern, deshalb sind sie hier nur Beispiel. Interessanter ist die Regel dahinter. Ein Modell kommt in die Frontier, wenn es ein aktuelles First-Party-System mit realem externem Zugang ist. Gemini 4 Argon ist dafür ein guter Grenzfall. Der Zugang läuft derzeit nur auf Einladung, aber es gibt ihn tatsächlich, und das System ist eindeutig Teil des aktuellen Spitzenfelds. Also zählt es. Ein Modell, das nur in einem Paper oder einer Keynote existiert, zählt nicht.

Wichtig ist mir, dass die Seite diese Auswahl offenlegt. Jede Rangliste trifft solche Entscheidungen. Die meisten schreiben nur nicht dazu, welche.

## KI ist mehr als Generalisten

Die größte inhaltliche Erweiterung ist die Model Landscape. Bisher war "KI-Modell" auf agi.jetzt praktisch gleichbedeutend mit einem allgemeinen Chat-Modell. Das bildet die Realität schlecht ab.

Ein erheblicher Teil des Fortschritts passiert in spezialisierten Systemen: Bildgenerierung und Design, Video, Sprache und Audio, und Systeme, die aus einem Zustand eine Entscheidung mit Wahrscheinlichkeit und daraus eine Aktion ableiten. Die Landscape ordnet Modelle deshalb in Klassen ein: Generalist, Image & Design, Video, Speech & Audio, Decision und Unknown.

Im aktuellen Datenstand sind das rund 24 Anbieter, etwa 170 öffentlich sichtbare Modelle und 18 Produkte. Gut hundert davon sind Generalisten, knapp 30 Sprach- und Audiomodelle, dazu Bild-, Video- und Entscheidungsmodelle im einstelligen bis niedrigen zweistelligen Bereich. Rund 15 Modelle stehen bewusst unter Unknown, weil sich ihre Klasse aus den verfügbaren Quellen nicht sauber bestimmen lässt.

Wichtig: Diese Spezialmodelle gehören nicht automatisch zur AGI-Frontier, und sie erhöhen nicht automatisch den AGI-Fortschritt. Ein sehr gutes Videomodell ist ein sehr gutes Videomodell. Es kann trotzdem ein Baustein zunehmend fähiger Gesamtsysteme sein, und wer nur auf Generalisten schaut, sieht diese Bausteine nicht kommen.

Unterhalb der Frontier gibt es zusätzlich eine Beobachtungsebene. Dort stehen Anbieter und Modellfamilien wie DeepSeek, Qwen, Moonshot mit Kimi, Meta mit Llama und Muse, Mistral, Z.ai oder Baidu. Ein Eintrag kann ein konkretes Modell sein, eine Modellfamilie oder ein angekündigter Name, der sich noch keinem Release zuordnen lässt. Beobachtet heißt ausdrücklich nicht Frontier, nicht hoch gerankt, nicht verfügbar und nicht AGI-relevant. Die Ebene löst ein Problem, das ich in v1 nur schlecht gelöst hatte: relevante Ökosysteme nicht ignorieren, ohne jede Ankündigung in dieselbe Rangliste zu kippen.

## Ankündigung ist nicht Verfügbarkeit

Der wichtigste Umbau ist für Besucher am wenigsten sichtbar. v3 hat ein echtes Evidenz- und Zustandsmodell. In v1 habe ich aktuelle Zustände im Wesentlichen per Hand in Karten gepflegt. Wenn sich etwas änderte, wurde der alte Wert überschrieben.

Das klingt harmlos, führt aber zu systematischen Fehlern. Ein Modell wird angekündigt, ist zwei Wochen später per API verfügbar, ist im Consumer-Produkt erst einen Monat danach und in der EU noch später. Wer nur einen Status pro Modell hat, muss sich für einen dieser Zeitpunkte entscheiden und verliert die anderen.

v3 arbeitet deshalb mit expliziten Zuständen: angekündigt, Einführung läuft, verfügbar, eingeschränkt, entfernt und unbekannt. Diese Zustände hängen am jeweiligen Kontext. Die Ankündigung ist nicht die API-Verfügbarkeit. Dass ein Modell existiert, heißt nicht, dass es in einem Produkt steckt. Und dass ein Produkt verfügbar ist, heißt nicht, dass es für jeden Plan und jede Region verfügbar ist.

Statt Zustände zu überschreiben, bleibt die Historie erhalten. Ein Beispiel aus den letzten Wochen: Bei Nano Banana 2, Nano Banana Pro, Gemini Omni Flash und DeepSeek-V4-Pro hatte ich ursprünglich das Datum der Preview durch das Datum der allgemeinen Verfügbarkeit ersetzt. Das ist falsch, weil damit die Information verloren geht, dass es vorher schon eingeschränkten Zugang gab. Jetzt sind beide Ereignisse als Abfolge modelliert: erst Preview mit eingeschränktem Zugang, später General Availability.

Jede wichtige Aussage soll eine Quelle, ein Wirksamkeitsdatum, ein Evidenzdatum und eine Historie haben. Dazu kommen zwei Regeln, die in der Praxis viel Ärger sparen. Erstens: Fehlende Evidenz bedeutet nicht "nicht verfügbar". Wenn ich zu einer Region nichts finde, steht dort "k. A." und kein Nein. Zweitens trennt das System "zuletzt geprüft" von "letzte Evidenz oder Änderung". Wenn eine Quelle erneut geprüft wird und sich nichts geändert hat, entsteht daraus keine Scheinbewegung im Feed.

## Updates, Weekly und Work AI

Auf dem Datenmodell sitzen drei Bereiche, die man als Leser direkt nutzt.

Der neue Bereich Updates soll die Frage beantworten: Was hat sich tatsächlich verändert? Ohne dass man dafür zwei Dutzend Vendor-Blogs verfolgen muss. Es ist ein einziger Feed, in dem die Modellklassen sichtbar bleiben. Er enthält neue Modelle, Previews, Übergänge in die allgemeine Verfügbarkeit, Änderungen an der Verfügbarkeit, Produktänderungen und relevante Spezialmodelle. Er spiegelt aber nicht mechanisch jede Herstellerankündigung. Was dort landet, braucht eine Quelle und eine redaktionelle Relevanz.

Das Weekly bleibt. Das Archiv umfasst aktuell KW01 bis KW41 2026 und wurde im Zuge des Umbaus aufgeräumt und erweitert. Neu ist ein Abschnitt "Spezialmodelle & neue Ansätze". Er erscheint nur, wenn es in der jeweiligen Woche quellenbelegte relevante Entwicklungen gab. Einen leeren Platzhalter-Abschnitt gibt es nicht. Aktuell enthalten 15 der 41 Ausgaben diesen Abschnitt, was ganz gut zeigt, wie ungleichmäßig sich dieser Teil des Feldes bewegt.

Beim Wechsel wird das Weekly fortgesetzt und nicht neu gestartet. Die alte Seite publiziert bis zum tatsächlichen Umschalten weiter. Die letzte dort erfolgreich veröffentlichte Ausgabe ist die letzte Legacy-Ausgabe, die nächste gehört zu v3. Einen fest verdrahteten Stichtag wie "bis KW40" gibt es absichtlich nicht, weil sich so ein Datum bei einem Release-Prozess gern verschiebt.

Der Bereich Work AI ist die praktische Seite der Deployment Frontier. Er zeigt, was Organisationen tatsächlich einsetzen können: von OpenAI ChatGPT, ChatGPT Work, Codex und die API, von Anthropic Claude, Claude Code, Team, Enterprise und die API, von Google Gemini, die Gemini API und Google Workspace mit Gemini, dazu GitHub Copilot, Microsoft 365 Copilot, Grok und Langdock.

Ein Prinzip war mir hier besonders wichtig: Die Seite leitet keine Modellzuordnung daraus ab, dass ein Produkt zu einem Anbieter gehört. Google Workspace spricht zum Beispiel oft von einer "Sammlung von Modellen" und sagt nicht zu, dass jede Funktion ein bestimmtes Modell nutzt. Dann steht das auf agi.jetzt auch so da, statt einer leeren oder geratenen Zuordnung. Zwei redaktionelle Änderungen gehören dazu. Le Chat Enterprise ist aus der kuratierten Übersicht rausgefallen, weil es nicht mehr zum aktuellen Produktzuschnitt passte. Der historische Datensatz bleibt erhalten. Langdock ist neu dabei, weil es als Multi-Modell-Schicht für Unternehmen relevant ist und offenlegt, welches Modell von welchem Anbieter gerade läuft. Für viele Mittelständler ist genau diese Schicht der realistische Einstieg.

## Der Prüfstand: eigene Evidenz, sauber getrennt

Neu ist der Prüfstand. Weil der Name schnell falsch verstanden wird, vorweg: Das ist nicht mein persönlicher AGI-Test, und er soll öffentliche Benchmarks auch nicht ersetzen.

Der Prüfstand ist eine eigene empirische Schicht. Ich definiere reproduzierbare Aufgaben, lasse Modelle sie bearbeiten und halte fest, was dabei passiert: die Läufe selbst, die erzeugten Artefakte, Kosten, Latenz und das Ergebnis deterministischer Validatoren. Auf der Seite bleiben damit drei Evidenzschichten klar unterscheidbar: öffentliche Benchmarks, eigene Prüfstand-Messungen und echte Produkt- und Einsatzerfahrung. Keine davon wird in eine andere hineingerechnet.

Die zweite Generation des Prüfstands wird gerade zu einer reproduzierbaren Infrastruktur ausgebaut. Jeder Lauf hält fest, ob das Modell allein oder mit Harness gearbeitet hat, ob es über eine verwaltete API oder selbst gehostet lief und mit welchen anbieterspezifischen Effort-Einstellungen. Evidenz wird nach dem Lauf nicht mehr verändert, Tokens, Kosten und Latenz werden mitgeschrieben. Der aktuelle eingefrorene Aufgabensatz M01 bis M08 deckt unter anderem Terminplanung, Betriebsplanung, Code-Reparatur, verlustfreie Datentransformation, das Aufspüren unbelegter Behauptungen, den Abgleich mehrerer Quellen, Regelerkennung mit Generalisierung und visuelles Routen-Reasoning ab. Das sind bewusst Aufgaben, die näher an realer Büro- und IT-Arbeit liegen als an Mathe-Olympiaden.

Zum Prüfstand gehört eine eigene Seite für den Messplatz. Die lokalen Läufe entstehen auf einem Mac Studio mit Apple M4 Max, 64 GB Unified Memory, 1 TB SSD und macOS 27. Die Seite zeigt das Gerät als Explosionszeichnung, physisch von Gehäuse, Kühlung, Logicboard und Speicher bis zum Chip mit Unified Memory, darüber die Software-Schichten von macOS und Metal über MLX, llama.cpp und Ollama bis zum Prüfstand-Runner.

Das ist mehr als Deko. Ergebnisse von selbst gehosteten Modellen sind nur interpretierbar, wenn Hardware und Laufzeitumgebung Teil der Evidenz sind. Ein lokales Modell auf 64 GB Unified Memory und ein Frontier-Modell über eine API sind keine gleichwertigen Kandidaten im selben Rennen. Wer lokale Ergebnisse veröffentlicht, ohne die Umgebung zu nennen, lädt zu genau diesem Fehlschluss ein.

## Unsicherheit als Designprinzip

Durch alle Bereiche zieht sich eine Regel: Unsicherheit wird gezeigt und nicht weggestaltet. Auf der Seite tauchen deshalb Formulierungen auf, die man in klassischen Dashboards selten sieht: "nicht geprüft", "k. A.", "Einführung läuft". Im Datenmodell ist UNKNOWN ein vollwertiger Zustand und kein Fehler.

Das hat Folgen für die Optik. Eine Tabelle mit Lücken sieht unfertiger aus als eine vollständig befüllte. Ich halte das für den richtigen Tausch. Eine vollständig befüllte Tabelle, deren Werte teilweise geraten sind, ist schlechter als eine mit ehrlichen Lücken, weil man ihr nicht ansieht, welche Werte man glauben kann.

Die Methodik versucht auch nicht, die Grundsatzdebatten rund um AGI aufzulösen. Ob LLM-Architekturen prinzipiell dorthin führen, wie man Generalität sinnvoll misst, ab wann Autonomie "echt" ist: Das bleibt umstritten, und keine Zahl auf meiner Seite ändert daran etwas. agi.jetzt ist ein Observatorium. Ein Orakel will es nicht sein.

## Der Umbau unter der Oberfläche

Das sichtbare Redesign ist ungefähr die Hälfte der Arbeit. Der größere Teil ist darunter passiert.

v1 war eine statische Astro-Site mit Inhalten als Markdown im Repo. Für ein Notizbuch mit Score und Weekly war das genau richtig. Für ein Zustandsmodell mit Historie, mehreren Evidenzschichten und Hunderten von Modell- und Produktdatensätzen reicht es nicht mehr. v3 ist eine Next.js-Anwendung mit einem PostgreSQL-basierten Daten- und Evidenzmodell. Fakten werden historienorientiert gespeichert, neue Erkenntnisse kommen als neue Einträge dazu, statt alte zu überschreiben. Automatisierte Collector und eine Publishing-Pipeline sammeln Kandidaten für Updates, die redaktionelle Freigabe läuft über eine separate Admin-Oberfläche. Der Human-in-the-Loop aus v1 bleibt also, er sitzt jetzt nur an einer besser definierten Stelle.

Dazu kommen die unspektakulären Teile, die bei einem Datenprojekt am Ende den Unterschied machen: eine Staging-Umgebung mit Release-Pipeline, ein reproduzierbarer Ablauf für Backup, Restore und Release, und die Ablage der Prüfstand-Artefakte, damit jeder Lauf auch später nachvollziehbar bleibt. Nichts davon sieht man auf der Startseite. Ohne das wäre die Startseite aber nicht vertrauenswürdig.

## Wie es weitergeht

Staging ist ausführlich getestet, die Datenbasis ist frisch auditiert, der Wechsel ist vorbereitet. Die neue Version steht kurz vor dem öffentlichen Umschalten. Danach geht das Weekly nahtlos weiter, die Updates laufen, und der Prüfstand bekommt nach und nach seine ersten veröffentlichten Läufe der zweiten Generation.

Inhaltlich will ich in den nächsten Monaten vor allem zwei Dinge schärfen. Erstens die Verbindung zwischen den beiden Fronten: Wie lange dauert es typischerweise, bis eine Fähigkeit von der Intelligence Frontier in Produkten für Unternehmen ankommt? Zweitens die Evidenzlage bei den schwachen Feldern wie Learning & Memory und Adaptability, wo es heute schlicht zu wenig belastbare Messungen gibt.

Wer reinschauen will: [agi.jetzt](https://agi.jetzt). Wer einen Fehler findet oder eine Quelle anders bewertet, kann sich gern melden. Bei einem Projekt, das Unsicherheit ernst nehmen will, ist das ausdrücklich erwünscht.

> **[Redaktionsnotiz, vor Veröffentlichung entfernen]**
>
> - Go-live-Datum einsetzen (Frontmatter `date` und Dateiname)
> - Aktuelle Modell-, Provider- und Produktzahlen prüfen (Stand Entwurf: ca. 24 Anbieter, 169 öffentliche Modelle, 18 Produkte)
> - Finalen Frontier-Stand prüfen (Stand Entwurf: 4 Anbieter, 10 Modelle)
> - Aus "steht kurz vor dem Wechsel" → "ist live" machen (Intro + Abschnitt "Wie es weitergeht")
> - Weekly-Archivstand prüfen (Stand Entwurf: KW01–KW41, 15 Ausgaben mit Spezialmodell-Abschnitt)
> - Finalen Link/CTA prüfen
> - Thumbnail als `public/blog/agi-jetzt-v3-observatorium/thumbnail.webp` ablegen
> - `draft: true` entfernen
