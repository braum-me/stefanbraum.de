---
title: "Dokumentation ohne Disziplin"
date: 2026-05-30
excerpt: "Dokumentation scheitert selten am fehlenden Platz - sie scheitert am fehlenden Trigger. Zwei Agenten, die das ändern: ein Konverter für strukturierten Input und ein täglicher Dokumentor, der den digitalen Fußabdruck automatisch in Outline überführt."
tags: ["documentation", "ai", "agents", "outline", "automation", "knowledge-management"]
coverImage: "/blog/dokumentation-ohne-disziplin/thumbnail.webp"
readingTime: "6 min"
---

![Dokumentation ohne Disziplin](/blog/dokumentation-ohne-disziplin/thumbnail.webp)

**Wer seinen Arbeitstag digital verbringt, muss nichts mehr aktiv dokumentieren.**

---

Im März habe ich geschrieben, [warum Outline als Wissens-Management-Tool für Umgebungen mit Microsoft-Stack überzeugt](/blog/2026-03-29-full-microsoft-stack-open-source-doku/). Das Fundament war schnell gesetzt: ein gutes Zuhause für Dokumentation, das sich in bestehende Workflows integriert, ohne ein komplettes Ökosystem mitzubringen.

**Das eigentliche Problem war nie das Tool. Es war die Disziplin.**

Dokumentation scheitert selten daran, dass kein Platz dafür vorhanden ist. Sie scheitert in dem Moment, wo man sich nach einem langen Tag daran erinnern muss, dass man jetzt eigentlich noch dokumentieren sollte. Dieser Moment existiert bei mir nicht mehr.

## Der Trigger

Das Outline-Setup hatte ich produktiv, die Struktur stand, die Collections waren sinnvoll aufgebaut. Und trotzdem blieb das System statisch. Ich trug Dinge nach, wenn ich Zeit hatte oder wenn ich wusste, dass ich sie wirklich brauche. Alles andere verschwand in Teams-Chats, Word-Dateien oder irgendwelchen Notizen-Fragmenten.

Das Problem ist kein reines Disziplinproblem. Disziplin impliziert, dass man weiß, was zu tun wäre, und es trotzdem nicht tut. Das trifft es nicht ganz. Der eigentliche Engpass ist der Trigger. Man muss sich aktiv zurückerinnern: Was habe ich heute getan? Was davon wäre dokumentationswürdig? Wann habe ich das zuletzt geprüft? Dieser Moment entsteht im normalen Tagesablauf nicht von selbst. Er konkurriert mit allem anderen, und er verliert meistens.

Das Interessante am täglichen Agenten ist deshalb nicht nur, dass er Dokumentation erstellt. Er ist auch ein strukturierter Anlass, den eigenen Tag nochmal durchzugehen. Was ist fertig geworden? Was hat sich geändert? Wo fehlt noch etwas? Die automatisch erstellten Entwürfe sind dabei weniger das Endprodukt als ein Gesprächspartner: Man sieht, was der Agent erfasst hat, und merkt dabei oft selbst, was noch fehlt oder ergänzt werden sollte. Der Trigger zum Dokumentieren kommt nicht mehr aus der eigenen Erinnerung. Er kommt täglich, zuverlässig, und er bringt einen Entwurf mit.

## Was das System leisten muss

Damit eine automatisierte Dokumentationslösung tatsächlich funktioniert, muss sie ein paar Bedingungen erfüllen. Sie darf keinen neuen Workflow erzwingen. Sie muss mit dem Input arbeiten, der sowieso entsteht: Meetings, Word-Dokumente, Notizen, Aufgaben, fertige Deliverables. Sie muss selbst einschätzen können, was dokumentations-würdig ist. Und das Output-Format muss direkt ins Zielsystem passen, bei mir also Markdown in Outline.

Wenn eine dieser Bedingungen nicht erfüllt ist, entsteht wieder Friction. Und sobald es Friction gibt, fällt das System beim ersten stressigen Sprint auseinander.

## Zwei Agenten, zwei unterschiedliche Aufgaben

### Der Konverter: strukturierter Input auf Knopfdruck

Der erste Agent ist der einfachere der beiden. Er nimmt einen vorhandenen Kontext, typischerweise ein Word-Dokument, ein ausgefülltes Template oder einen längeren Fließtext, und wandelt ihn in sauberes Markdown um. Das klingt trivial, ist es aber nicht.

Die eigentliche Arbeit liegt nicht in der Formatierung, sondern in der Struktur. Der Agent kennt die Dokumentationsvorlagen in Outline, weiß also wie ein Entscheidungs-Dokument, ein System-Steckbrief oder ein Projektabschluss aussehen soll, und ordnet den eingehenden Inhalt diesen Vorlagen zu. Das Ergebnis ist kein rohes Markdown, das man noch zurechtbiegen muss. Es ist ein fertig strukturierter Block, den man entweder per Copy-Paste überträgt oder per MCP-Tool direkt in Outline publisht.

Praktisch läuft das so: Ich habe nach einem Projekt ein Word-Dokument, das ich als Beschreibung irgendwann geschrieben hatte. Ich schiebe es in den Agenten. Zwei Minuten später liegt die fertige Seite in Outline, korrekt eingehängt in die richtige Collection, ohne dass ich den Browser auch nur geöffnet habe.

### Der tägliche Dokumentor: Doku passiert im Hintergrund

Der zweite Agent ist der, der das System wirklich verändert hat. Er läuft einmal täglich, automatisch, über einen Scheduled Task in Cowork.

Was er macht: Er geht durch alles, was ich digital an dem Tag erledigt habe. E-Mails, Kalendereinträge, abgeschlossene Tasks, Dateien die ich bearbeitet habe, Chats die relevant sind. Dann trifft er eine Entscheidung: Was davon ist dokumentationswürdig?

Nicht alles landet in Outline. Eine Routine-Mail geht nicht rein. Eine fertiggestellte Konfiguration schon. Ein abgeschlossenes Meeting mit Entscheidungen schon. Ein aktualisierter Prozess schon. Der Agent hat einen Skill, der ihm zeigt, nach welchen Kriterien diese Entscheidung getroffen wird, und er hat Zugriff auf die Vorlagen, nach denen er Dokumentation strukturiert.

Das Ergebnis: Jeden Morgen liegt in meinem Notification-Stack eine kurze Liste, was dokumentiert wurde, und die fertigen Markdown-Files sind bereits hochgeladen oder warten auf meine Freigabe. Ich muss nichts tun. Ich muss mich an nichts erinnern. Die Dokumentation entsteht als Nebenprodukt der digitalen Arbeit.

## Warum das tatsächlich funktioniert

Der entscheidende Punkt ist nicht die KI. Es ist die Aufhebung der zeitlichen Entkopplung. Klassische Dokumentation hat immer dasselbe Problem: Der Moment in dem man weiß, was zu dokumentieren ist, und der Moment in dem man es tut, liegen auseinander. Meistens zu weit.

Das Auto-Dokumentations-System schließt diese Lücke, indem es den zweiten Moment eliminiert. Die Arbeit erzeugt den Dokumentations-Trigger automatisch, weil der Agent täglich über den digitalen Fußabdruck des Tages läuft. Man muss keine Entscheidung mehr treffen, ob man dokumentiert. Man muss höchstens noch entscheiden, ob man eine automatisch erstellte Dokumentation ablehnt.

Das ist psychologisch ein enormer Unterschied. Inaktivität ist die Standardoption in einem gut funktionierenden System. Wer nicht dokumentieren will, muss aktiv eingreifen. Wer dokumentiert, muss gar nichts tun.

Die Kombination mit MCP macht das noch runder. Outline hat eine API, der Agent hat Zugriff darauf. Kein manuelles Hochladen, keine Formatierungs-Überraschungen, kein Zwischen-Schritt über ein lokales File-System. Die Dokumentation landet dort, wo sie hingehört, mit der richtigen Formatierung, eingehängt in die richtige Struktur.

## Was man aufgibt

Ehrlichkeit gehört dazu: Automatische Dokumentation ist nicht dasselbe wie gute Dokumentation.

Der Agent entscheidet nach Kriterien, aber diese Kriterien treffen nicht immer. Manchmal wird etwas dokumentiert, das gar keine Seite braucht. Manchmal fehlt ein wichtiger Kontext, den nur ich kenne und der aus den digitalen Signalen nicht rekonstruierbar ist. Die Qualität der Einräumung in einem Dokument, die ehrliche Beschreibung warum eine Entscheidung schwierig war, das kann ein Agent nicht zuverlässig liefern.

Was das System liefert, sind vollständige Struktur und gute erste Entwürfe. Wer Wissensmanagement auf dem Niveau eines Unternehmens-Wikis betreiben will, das wirklich gelesen und genutzt wird, muss redaktionell nachsteuern. Das System nimmt einem die Arbeit des Erstellens ab. Die Arbeit des Verfeinerns bleibt.

Für Teams mit Dokumentations-Pflichten und wenig Zeit ist das trotzdem ein massiver Gewinn. Etwas, das man überarbeiten kann, ist unendlich wertvoller als ein leeres Template.

## Was das über digitale Arbeit aussagt

Wer seinen Arbeitstag digital verbringt, hinterlässt kontinuierlich Spuren. Jede Entscheidung, jedes abgeschlossene Deliverable, jede Konfigurationsänderung: das alles existiert irgendwo im digitalen Fußabdruck. Das Problem war nie der fehlende Inhalt. Es war die fehlende Struktur, die diesen Inhalt lesbar macht.

KI löst hier ein echtes Problem, weil sie gut darin ist, unstrukturierten Kontext in strukturierten Output zu verwandeln. Nicht weil sie besonders kreativ ist, sondern weil sie das zuverlässig, schnell und ohne Motivationsproblem tut.

Das Outline-Setup aus dem [letzten Post](/blog/2026-03-29-full-microsoft-stack-open-source-doku/) war der richtige erste Schritt: das Fundament. Dieser Schritt hier ist die Automatisierung darüber. Wer beides kombiniert, hat ein System, das wächst, ohne dass man aktiv dafür sorgen muss.
