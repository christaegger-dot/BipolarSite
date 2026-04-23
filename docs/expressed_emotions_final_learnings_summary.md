# Zusammenfassung der Erkenntnisse zu `expressed_emotions`

## Ziel dieser Dokumentation

Diese Datei bündelt die wichtigsten Erkenntnisse aus der Design- und Produktionsiteration des Handouts `expressed_emotions`. Sie dient als schneller Einstieg in die ausführlicheren Notizen und als Referenz für spätere Systematisierung im PDF-Templatesystem.

## Kernbefunde

| Bereich | Erkenntnis | Konsequenz |
|---|---|---|
| Produktionspfad | Canva war für diesen Auftrag nicht verlässlich genug, weil der direkte Generierungsansatz zu generisch blieb und der echte PDF-Export des importierten Designs mit Serverfehler scheiterte. | Der belastbare Produktionspfad ist die kontrollierte lokale HTML-zu-PDF-Fassung. |
| Designstrategie | Sichtbare Qualitätsgewinne entstanden erst durch einen design-first Ansatz mit bewusst gesetzter Dramaturgie statt durch weiteres Polieren des alten Renderpfads. | Für anspruchsvolle Handouts zuerst einen Demonstrator bauen, dann Muster systematisieren. |
| Leserführung | Das Handout wird stärker, wenn die Nutzerführung explizit sichtbar ist: Einstieg, Kreislauf, Warnsignale, Hebelpunkt, nächster Schritt. | Dramaturgie und Modulreihenfolge aktiv gestalten, nicht nur Text verteilen. |
| Seitenstabilität | Der Prozessbereich darf nicht über Seitengrenzen ausfransen. Zentrale Visualisierungen müssen als stabile Einheiten gebaut werden. | Prozess- und Schlussmodule seitenstabil konstruieren und Seitenumbrüche bewusst kontrollieren. |
| Iterationslogik | Wenn nur noch kleiner Überlauf besteht, ist eine Neuarchitektur meist unnötig. | Mikrotypografisch verdichten statt das Dokument erneut umzubauen. |
| Schlussseite | Die Schlussseite funktioniert am besten als ruhige dramaturgische Landung. | Muster `Merksatz -> nächster Schritt -> Weiterführend` beibehalten. |

## Seitenspezifische Learnings

| Seite | Beobachtung | Konsequenz für spätere Templates |
|---|---|---|
| Seite 1 | Hero-Zone und Prozessbeginn tragen die Orientierung, müssen aber in einer kontrollierten Höhe landen. | Ein starkes Opening braucht klare Höhensteuerung und frühe inhaltliche Rahmung. |
| Seite 2 | Die rechte Spalte wirkte schnell textlastig und optisch zu hoch. | Choice-Module kompakter bauen: kürzere Listen, klarere Gewichte, engere Abstände. |
| Seite 3 | Der Abschluss war inhaltlich schon gut, brauchte aber bessere Proportionen und mehr Rhythmus. | Abschlusskarten kompakter setzen und Handlungsschritte klar ordnen. |

## Empfohlene Referenzdateien

Die folgenden Dateien bilden gemeinsam die belastbare Dokumentation dieses Iterationswegs:

| Datei | Funktion |
|---|---|
| `docs/expressed_emotions_canva_iteration_notes.md` | Vollständige Iterationschronik mit Problemen, Korrekturen und Regeln |
| `docs/pr3a_pagebreak_learnings_expressed_emotions.md` | Wiederverwendbare Regeln zu Seitenumbrüchen und Modulstabilität |
| `docs/expressed_emotions_canva_redesign_brief.md` | Verdichtete, designfähige Arbeitsfassung für die visuelle Umsetzung |
| `expressed_emotions_canva_ready.html` | Kontrollierte design-first Quelle |
| `expressed_emotions_canva_ready.pdf` | Finalisierte lokale PDF-Fassung |

## Übertragbare Regel

> Für psychoedukative Handouts mit hohem Gestaltungsanspruch sollte zuerst ein kontrollierter, visuell belastbarer Demonstrator entstehen. Erst die validierten Muster werden anschliessend in den skalierbaren Produktionspfad überführt.
