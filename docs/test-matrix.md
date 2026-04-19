# Test-Matrix für Geräte- und Browser-Readiness

Diese Matrix definiert, **welche Kombinationen aus Gerät, Browser und Kernpfad** für die manuelle Qualitätssicherung der BipolarSite priorisiert werden. Sie ist bewusst kompakt gehalten. Ziel ist keine vollständige Marktdeckung, sondern eine belastbare Grundabdeckung für die wichtigsten realen Nutzungssituationen der Website.

## Teststrategie

Die Website ist ein psychoedukatives Hilfesystem mit langen Lesestrecken, Orientierungseinstiegen, Tools und einem besonders sensiblen Notfallpfad. Deshalb richtet sich die Matrix nicht nur nach technischen Engines, sondern auch nach **Nutzungskritikalität**. Priorität haben Geräte und Browser, bei denen kleine Layout-, Fokus- oder Interaktionsprobleme besonders schnell zu Reibung oder Abbruch führen können.

| Priorität | Gerät / Viewport | Browser | Testtiefe | Begründung |
|---|---|---|---|---|
| P1 | iPhone | Safari | vollständig | kritischer Mobile-Pfad und naheliegende Alltagsnutzung |
| P1 | iPhone | Chrome | vollständig | reale iOS-Nutzung mit eigenem Browserkontext |
| P1 | Desktop | Chrome | vollständig | breite Referenznutzung auf Desktop |
| P1 | Desktop | Firefox | vollständig | zusätzlicher Rendering- und Interaktionspfad |
| P2 | Android | Chrome | stichprobenartig, bei Verfügbarkeit vollständig | zusätzliche Mobile-Absicherung |

## Bedeutung der Testtiefe

Die Begriffe „vollständig“ und „stichprobenartig“ sollen im Projekt einheitlich verstanden werden. Nur so bleiben Testläufe über mehrere PRs hinweg vergleichbar.

| Testtiefe | Bedeutung |
|---|---|
| vollständig | alle definierten Kernpfade durchführen und die Pflichtprüfungen aus `docs/qa-checklist.md` bewusst prüfen |
| stichprobenartig | mindestens Startseite, ein Modul, ein Tool und die Notfallseite prüfen |

## Kernpfade

Die Kernpfade beschreiben die wichtigsten realen Wege durch das System. Sie sind absichtlich funktional formuliert, damit sie auch dann gültig bleiben, wenn einzelne Einstiege oder Textformulierungen im Detail verändert werden.

| Kürzel | Kernpfad | Pfadbeschreibung | Testziel |
|---|---|---|---|
| KP1 | Orientierungspfad | Startseite → `/module/` oder Lernpfad-Bereich → `modul/1/` → nächster Anschlussschritt | prüft linearen Einstieg und Anschlusslogik |
| KP2 | Situativer Einstieg | Startseite → prominenter Einstiegs- oder Orientierungspfad → passende Inhaltsseite → Rückweg | prüft nichtlineare Nutzung |
| KP3 | Tool-Pfad | Startseite oder Modul → Tool unter `/tools/` → zentrale Interaktion oder Sichtprüfung → Rückweg | prüft handlungsorientierte Seitentypen |
| KP4 | Notfall-Pfad | beliebige Standardseite → `/notfall/` → Hilfsoptionen und Telefonnummern → sicherer Rückweg | prüft Krisenzugang und Priorisierung |
| KP5 | Tiefenstruktur-Pfad | längere Modulseite → interner Sprung, TOC oder Abschnittswechsel → Rückweg oder Weiterpfad | prüft Scroll-, Fokus- und Strukturverhalten |

## Pflichtabdeckung je Testumgebung

Nicht jede Umgebung muss gleich viel leisten. Für die P1-Kombinationen ist die volle Kernpfad-Abdeckung Pflicht. Bei P2-Kombinationen genügt ein reduzierter Test, solange keine konkreten Vorfälle oder Regressionen bekannt sind.

| Gerät / Browser | KP1 | KP2 | KP3 | KP4 | KP5 |
|---|---|---|---|---|---|
| iPhone Safari | ja | ja | ja | ja | ja |
| iPhone Chrome | ja | ja | ja | ja | ja |
| Desktop Chrome | ja | ja | ja | ja | ja |
| Desktop Firefox | ja | ja | ja | ja | ja |
| Android Chrome | ja | optional | ja | ja | optional |

## Beobachtungsschwerpunkte je Umgebung

Je nach Kombination gibt es leicht unterschiedliche Risikobereiche. Diese Schwerpunkte helfen, Befunde nicht nur zu sammeln, sondern gezielt zu suchen.

| Gerät / Browser | Beobachtungsschwerpunkte |
|---|---|
| iPhone Safari | Tap-Ziele, Sticky-/Overlay-Verhalten, Umbruch langer Karten, Details-/Summary-Interaktion, Rückweg-Logik |
| iPhone Chrome | gleiche Mobile-Pfade mit Fokus auf bedienbare CTAs, Scrollverhalten und Tool-Interaktionen |
| Desktop Chrome | Referenzlayout, Fokusführung, Lesefluss, sichtbare Regressionen in Karten und CTA-Gruppen |
| Desktop Firefox | Browser-spezifische Layoutabweichungen, Fokusdarstellung, Interaktion mit Navigation und längeren Inhaltsseiten |
| Android Chrome | mobile Breiten, Lesbarkeit, Erreichbarkeit zentraler Aktionen und Notfallzugänge |

## Dokumentation von Findings

Befunde aus der Matrix sollen in einer Form festgehalten werden, die nachträgliche Priorisierung ermöglicht. Für PR #188 genügt eine einfache Textstruktur; ein neues Tracking-System wird ausdrücklich nicht eingeführt.

| Feld | Erwartung |
|---|---|
| Priorität | P1, P2 oder P3 bezogen auf Nutzungsrisiko |
| Gerät / Browser | klar benennen |
| betroffener Kernpfad | KP1 bis KP5 |
| URL oder Seitentyp | konkret notieren |
| Schritt zur Reproduktion | kurz und nachvollziehbar |
| beobachtetes Verhalten | konkret beschreiben |
| erwartetes Verhalten | knapp gegenüberstellen |

## Übergang zu PR #189

Diese Matrix ist nicht der Ort für die eigentlichen Fixes. Sie schafft die Grundlage dafür, dass PR #189 reale Befunde priorisiert behebt, statt hypothetische Probleme zu vermuten. Wenn ein Fehler in mehreren P1-Umgebungen auftritt oder einen Kernpfad blockiert, soll er in der nächsten Mobile-UX-Runde bevorzugt behandelt werden.

## Praktische Anwendung vor dem Merge

Vor einem Merge reicht ein kurzer, frischer Testdurchlauf auf einer P1-Umgebung plus technische Validierung, wenn der PR nur kleine Änderungen enthält. Bei Layout-, Navigations- oder Tool-Änderungen auf mobilen Pfaden soll die Matrix bewusster ausgeschöpft werden. In jedem Fall gilt: Die Matrix ergänzt die CI und ersetzt sie nicht.
