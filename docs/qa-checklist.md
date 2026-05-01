# QA-Checkliste für manuelle Geräte- und Browser-Tests

Diese Checkliste definiert den **kleinen, reproduzierbaren Pflicht-Test**, der vor einem Merge nach relevanten Änderungen an Navigation, Layout, Modulseiten, Tool-Seiten oder zentralen Nutzerpfaden durchgeführt werden soll. Sie ergänzt die automatischen Prüfungen des Projekts und ersetzt diese nicht. Ziel ist, dass sichtbare oder bedienungsrelevante Probleme früh erkannt werden, auch wenn Build, Linting und Accessibility-Checks bereits grün sind.

## Einsatzzeitpunkt

Die Checkliste wird immer dann verwendet, wenn Änderungen die tatsächliche Nutzung im Browser beeinflussen können. Das gilt insbesondere für Anpassungen an Templates, Navigation, responsiven Layouts, CSS, interaktiven Tools, Rückwegen oder Notfallpfaden. Bei rein redaktionellen Korrekturen ohne Layout- oder Interaktionsbezug kann der Umfang reduziert werden; bei Unsicherheit gilt der volle Kurztest.

| Einsatzfall | Erwartung |
|---|---|
| UI-, CSS- oder Navigationsänderungen | vollständiger Kurztest |
| Tool-Änderungen oder Formularanpassungen | vollständiger Kurztest plus gezielte Tool-Prüfung |
| Änderungen an Notfall-, Modul- oder Übersichtsseiten | vollständiger Kurztest |
| reine Textkorrekturen ohne Layoutbezug | stichprobenartiger Kurztest nach Ermessen |

## Testumgebung

Der Test soll in einer **frischen Browser-Sitzung** stattfinden, damit alte Zustände, Erweiterungen oder Caches das Ergebnis nicht verfälschen. Getestet wird auf dem lokalen Build oder einer frischen Vorschau des Branches. Maßgeblich ist das beobachtbare Verhalten im Browser, nicht die Annahme, dass eine Änderung „eigentlich harmlos“ sein müsste.

| Voraussetzung | Prüffrage |
|---|---|
| Frischer Tab oder neues Fenster | Sehe ich die Seite ohne Altzustände oder Vorbelegungen? |
| Aktueller Branch-Build | Teste ich wirklich den aktuellen Stand des PRs? |
| Keine Browser-Erweiterung als Bewertungsgrundlage | Beruht der Befund auf der Website selbst und nicht auf einer Extension? |
| Sichtbarer Viewport passend zum Zielgerät | Entspricht der Test einer realistischen Nutzungssituation? |

## Pflichtpfade

Der Kurztest orientiert sich an den im Projekt definierten Kernpfaden. Jeder Testdurchlauf soll mindestens die Startseite, einen linearen Modulpfad, einen Tool-Pfad und den Notfallpfad abdecken. Bei längeren Modulseiten gehört außerdem mindestens ein interner Sprung innerhalb der Seite dazu, damit Scroll-, Fokus- und Rückwegverhalten beobachtet werden können.

| Kernpfad | Minimaler Durchlauf |
|---|---|
| Orientierungspfad | Startseite → `/module/` oder Lernpfad-Bereich → `modul/1/` → nächster klarer Anschlussschritt |
| Tool-Pfad | Startseite oder Modul → ein Tool unter `/tools/` → zentrale Interaktion oder Sichtprüfung → Rückweg |
| Notfallpfad | Standardseite → `/notfall/` → wichtige Hilfsoptionen und Telefonnummern prüfen |
| Tiefenstruktur | längere Modulseite → interner Navigationssprung oder Abschnittswechsel → Rückweg oder Weiterpfad |

## Konkrete Pflichtprüfungen

Die folgenden Prüffelder sind in jedem vollständigen Kurztest einmal bewusst zu beurteilen. Ein Test ist nur dann aussagekräftig, wenn die Beurteilung nicht implizit, sondern sichtbar entlang dieser Fragen erfolgt.

| Prüffeld | Konkret zu prüfen |
|---|---|
| Hauptnavigation | Ist die Navigation vollständig sichtbar, verständlich beschriftet und ohne Überlagerungen bedienbar? |
| Primäre Einstiege | Bleiben zentrale CTAs, Karten und Orientierungselemente ohne horizontales Scrollen erreichbar? |
| Lesefluss | Brechen Überschriften, Fließtext, Karten und Infoblöcke sauber um? |
| Interaktive Elemente | Lassen sich Buttons, Toggles, Summary-Flächen und Formularaktionen zuverlässig bedienen? |
| Rückwege | Ist von Modulen und Tools aus ein plausibler Rückweg zur übergeordneten Orientierung klar vorhanden? |
| Notfallzugang | Bleibt der Zugang zur Notfallseite auffindbar, verständlich und priorisiert? |
| Offensichtliche Regressionen | Gibt es überlappende Elemente, abgeschnittene Inhalte, unlesbare Kontraste oder blockierte Hauptaktionen? |

## Zusätzliche Desktop-Prüfung

Auf Desktop gehört zum Kurztest außerdem eine knappe Fokus- und Tastaturprüfung. Dabei muss nicht jede Seite vollständig per Tastatur durchlaufen werden, aber mindestens ein repräsentativer Abschnitt der Navigation und eine zentrale interaktive Seite sollen auf sichtbaren Fokus und nachvollziehbare Reihenfolge geprüft werden.

| Desktop-Fokus | Erwartung |
|---|---|
| Tab-Reihenfolge in der Hauptnavigation | logisch und ohne Fokusverlust |
| Sichtbarer Fokus auf Buttons und Links | klar erkennbar |
| Fokus nach Interaktionen | nicht unsichtbar oder „verloren“ |

## Dokumentation von Befunden

Befunde sollen knapp, aber reproduzierbar notiert werden. Es genügt eine kurze Testnotiz im PR oder in den Arbeitsnotizen, solange daraus klar hervorgeht, **wo**, **unter welchen Bedingungen** und **in welchem Schritt** das Problem auftrat. Vage Aussagen wie „wirkt mobil etwas eng“ sind nicht ausreichend.

| Feld | Beispiel |
|---|---|
| Gerät / Browser | iPhone Safari |
| URL | `/tools/krisenplan/` |
| Schritt | CTA im unteren Bereich nach erstem Scrollen angetippt |
| Ist-Verhalten | Button liegt teilweise unter überlagerndem Element |
| Erwartetes Verhalten | Button vollständig sichtbar und direkt bedienbar |

## Merge-Gate

Diese Checkliste ist ein zusätzliches Sicherheitsnetz, kein Ersatz für die technische Qualitätssicherung. Vor einem Merge müssen weiterhin Build, Linting, HTML-Validierung und die GitHub-CI erfolgreich sein. Ein Merge bei roter CI ist ausgeschlossen, auch wenn der manuelle Kurztest unauffällig war.

| Gate | Muss erfüllt sein |
|---|---|
| `npm run build` | ja |
| `npm run lint` | ja |
| `npm run lint:html` | ja |
| GitHub-CI | ja |
| frischer Browser-Kurztest | ja |

## Kurzform für den PR-Alltag

Wenn wenig Zeit ist, gilt trotzdem mindestens diese Reihenfolge: erst Build und lokale Validierung, dann ein frischer Browser-Test auf Startseite, Modul, Tool und Notfallseite, anschließend erst Push oder Merge-Entscheidung. So bleibt die Hürde niedrig, ohne dass reale Nutzungsprobleme aus dem Blick geraten.
