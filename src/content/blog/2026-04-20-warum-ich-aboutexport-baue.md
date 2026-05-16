---
title: "Warum ich AboutExport baue"
date: 2026-04-20
excerpt: "Eine Bekannte hat mir erzählt, wie ihr Export-Compliance-Alltag wirklich aussieht. Eine Woche später hatte ich die ersten Datenquellen angebunden. Was daraus geworden ist und warum ich das nebenher mache."
tags: ["saas", "aboutexport", "compliance", "build", "side-project"]
readingTime: "5 min"
coverImage: "/blog/warum-ich-aboutexport-baue/thumbnail.webp"
---

![AboutExport - Warum ich es baue](/blog/warum-ich-aboutexport-baue/thumbnail.webp)

Ich baue nebenher an einem SaaS für Export Compliance Monitoring. Der Anlass war konkret und unspektakulär: eine Bekannte erzählt mir, was sie täglich tut. Ich verstehe, dass das in seiner manuellen Form nicht skalieren kann. Ich frage mich, warum es dafür kein vernünftiges Tool gibt. Eine Woche später hatte ich die ersten Datenquellen angebunden.

## Das Problem aus erster Hand

Julia ist Export Control Officer. Ihre Aufgabe ist Compliance-Monitoring: prüfen welche Sanktionspakete neu sind, welche Exportkontrolllisten sich geändert haben, welche Embargo-Anpassungen es gibt. EU-Recht über EUR-Lex, BAFA-Mitteilungen, BIS Entity List aus den USA, MOFCOM-Updates, UN-Sanktionslisten. Fünf Tools nebeneinander, zwanzig Quellen, alles manuell durchgeklickt. Täglich.

Das ist nicht das eigentliche Compliance-Problem. Das eigentliche Problem ist die Bewertung: Trifft eine neue Regel mein Unternehmen? Welche Geschäfte sind betroffen? Was muss intern eskaliert werden. Aber Julia kommt zur Bewertung erst nach den vier Stunden Recherche.

Die Frage, die ich mir gestellt habe: Wenn das eine Standardaufgabe in jedem mittelständischen Exportunternehmen ist, warum existiert dafür nichts Vernünftiges.

## Was es schon gibt

Zwei Marktsegmente. Auf der einen Seite Enterprise-Compliance-Suites. Sechsstellige Lizenzen, Implementierung über zwölf Monate, gebaut für Konzern-Compliance-Abteilungen mit eigenem IT-Budget. Auf der anderen Seite generische News-Aggregatoren, die nichts von Export Compliance verstehen und genauso gut für Tech-News oder Wetterberichte funktionieren würden.

Dazwischen ist eine Lücke, die größer ist als ich erwartet hatte. Mittelständische Exporteure, kleine Compliance-Teams, oft Einzel-Officer-Setups. Gleicher Informationsbedarf wie ein DAX-Konzern, ein Bruchteil des Budgets, kein eigener Architekt im Haus.

## Was AboutExport macht

Eine Plattform, die die wichtigsten Quellen automatisch aggregiert, per KI strukturiert zusammenfasst, nach Relevanz priorisiert und täglich ins Postfach liefert. Konfigurierbar nach Region, Gütergruppe, Themenschwerpunkt. Eine strukturierte tägliche Übersicht ersetzt das manuelle Durchklicken.

![AboutExport UI: Alerts pro Region (China, EU, USA) plus Aktivitätskurve und Year-over-Year-Vergleich](/blog/warum-ich-aboutexport-baue/aboutexport-ui.webp)

Klingt einfach. Ist es nicht, weil die Quellen heterogen sind: PDFs in drei Sprachen, schlecht strukturierte Behörden-RSS-Feeds, dynamische HTML-Seiten ohne stabile Selektoren, JSON-APIs neben PDF-Anhängen, alles in unterschiedlichen Veröffentlichungs-Rhythmen. Der eigentliche Engineering-Aufwand liegt in der Datenaufbereitung. Die KI-Zusammenfassung ist die letzten 20 Prozent.

## Was ich als Hauptjob-Architekt nebenher mache

Ich bin tagsüber IT-Teamleiter und stellv. IT-Gesamtleiter bei einem Industrie-Mittelständler. Architektur-Fragen, Vendor-Bewertung, KI-Adoption, SAP, Microsoft 365. Genau die Themen, die in einem typischen Mittelstand-Stack auftauchen.

AboutExport ist die Übung, dieselben Architektur-Entscheidungen für mich selbst zu treffen. Welche Datenquellen vertrauen, wie monitoren, wie skalieren, welcher Stack, welcher Cloud-Provider, welche KI-Pipeline, welche Datenschutz-Konfiguration. Jeder Trade-off liegt bei mir, und ich verantworte ihn auch operativ. Das ist die ehrlichste Engineering-Übung, die mir einfällt.

Und sie macht mich besser im Hauptjob, weil ich Vendor-Pitches anders höre, wenn ich weiß, was hinter ihrer KI-Pipeline tatsächlich steckt.

## Wo ich stehe

Validation-Phase. Eine bewusst schlanke erste Version, die mit echten Nutzern getestet wird. Ich glaube nicht daran, ein Produkt zwei Jahre im Stillen zu polieren und dann fertig in den Markt zu werfen. Früh starten, ehrlich kommunizieren, dort weiterentwickeln wo der Alltag tatsächlich klemmt. Genau das ist die Phase, in der wir gerade sind.

Die Waitlist ist offen, [aboutexport.com](https://aboutexport.com). Wer früh dabei ist, bekommt Zugang zur Validierungsversion und gestaltet das Produkt mit. Wer mit mir direkt sprechen will, hat ohnehin meine E-Mail.

## Was als Nächstes

Ich werde hier in den kommenden Monaten regelmäßig den Stand teilen. Was funktioniert, was nicht. Welche Architektur-Entscheidung ich revidiert habe und warum. Welche Quelle gerade zickt. Wie sich die KI-Pipeline schlägt, wenn neue EU-Sanktionen mit ungewöhnlichem Format einlaufen.

Wenn du an Export Compliance arbeitest, melde dich. Wenn du selbst nebenher etwas baust und über die Engineering-Themen sprechen willst, auch. Genau dafür ist dieser Blog.
