# PDF Welle 5 – Priorisierung und Umsetzungspaket

## Ausgangslage nach Welle 4

Mit dem Merge von Welle 4 ist der Modul-7-Archivkern modernisiert. Im Manifest verbleiben damit vor allem Archiv-Handouts aus den Modulen 2 bis 6 sowie ein einzelner verbliebener M7-Eintrag. Für die nächste Tranche ist nicht die reine Anzahl offener PDFs entscheidend, sondern die Frage, **wo bereits eine ausreichend dichte, moderne und handout-taugliche Web-Quellenbasis vorhanden ist**.

Die stärkste thematische Verdichtung liegt jetzt in **Modul 4: Wenn die Kraft nachlässt**. Dort sind die inhaltlichen Linien bereits klar ausgearbeitet: Trauer ohne klaren Abschied, kumulative Erschöpfung, schleichende Erosionsmechanismen und die Kosten des Nicht-Gelebten. Diese Themen bilden eine psychoedukativ geschlossene Sequenz und passen gut zur bestehenden Logik der regenerierten A4-Handouts.

## Empfohlenes Welle-5-Paket

| Priorität | Asset | Asset-ID | Aktueller Manifest-Status | Primäre Web-Basis | Einschätzung |
|---|---|---|---|---|---|
| 1 | `a4_ambiguous_loss` | HO-06 | archive | `src/modul/4/index.njk#ambiguous` | Sehr stark, direkte 1:1-Quelle |
| 2 | `b4_mechanismen_erosion` | HO-08 | archive | `src/modul/4/index.njk#mechanismen` | Sehr stark, direkte 1:1-Quelle |
| 3 | `b2_erosion_solidaritaet` | HO-07 | archive | primär `#kumulation`, ergänzend Modul-3-/Modul-4-Erosionslogik | Stark, aber leicht synthetisch statt rein 1:1 |
| 4 | `b3_kritische_zeitpunkte` | HO-09 | archive | derzeit keine gleich starke Einzelquelle | Vorläufig zurückstellen |

## Begründung der Priorisierung

`a4_ambiguous_loss` ist der klarste Kandidat für den Einstieg. Der Abschnitt `#ambiguous` ist in Modul 4 inhaltlich bereits nahezu handout-fähig formuliert: Er bietet einen gut verständlichen Kernbegriff, eine alltagsnahe Übersetzung, konkrete Verlustdimensionen und eine validierende Einordnung. Das Thema ist zugleich hochrelevant und im bisherigen PDF-Bestand noch sichtbar veraltet. Dieses Handout sollte deshalb den Auftakt von Welle 5 bilden.

`b4_mechanismen_erosion` ist als zweiter Baustein besonders naheliegend, weil der Abschnitt `#mechanismen` bereits exakt die Themen des Archivblatts trägt: Schonhaltung, Co-Isolation und Identitätsverlust. Die Web-Seite liefert dafür nicht nur Überschriften, sondern auch prägnante Folgen, Warnzeichen und eine klare Tonalität. Das ist eine ideale Basis für einen regenerierten A4-Einseiter.

`b2_erosion_solidaritaet` ist weiterhin ein sinnvoller Kandidat, obwohl die Quellenbasis etwas synthetischer ist. Der Manifest-Titel „Beziehung unter Druck“ und die Unterzeile zur Erosion von Solidarität und Alltag lassen sich gut aus der Kombination von **kumulativer Erschöpfung in Modul 4** und **Beziehungserosion in Modul 3** ableiten. Dieses Blatt ist also nicht ganz so direkt aus einem einzelnen Seitenabschnitt ableitbar wie `a4_ambiguous_loss` oder `b4_mechanismen_erosion`, aber dennoch inhaltlich eng genug, um in derselben Welle bearbeitet zu werden.

`b3_kritische_zeitpunkte` sollte dagegen vorerst nicht in den Kern der Welle aufgenommen werden. Der Titel „Kritische Zeitpunkte“ verspricht eine klar gegliederte Timing- oder Übergangslogik, die im jetzigen Web-Bestand nicht in derselben Eindeutigkeit vorliegt wie die drei oben genannten Themen. Für eine saubere Regeneration wäre hier voraussichtlich zuerst eine stärkere redaktionelle Verdichtung oder ein klarer Quellabschnitt nötig. Als vierter Kandidat würde dieses Asset die Welle eher verwässern als stärken.

## Warum andere verbleibende Archiv-Handouts noch nicht vorgezogen werden sollten

Die verbleibenden Modul-2-, Modul-3-, Modul-5- und Modul-6-Handouts bleiben relevant, bilden aber aktuell kein ähnlich dichtes Paket mit derselben Direktableitbarkeit. Für die Effizienz des bestehenden Workflows ist es sinnvoller, zunächst das stabilste Themencluster auszuschöpfen, statt erneut über mehrere Module zu springen.

| Kandidatenblock | Grund für spätere Welle |
|---|---|
| Modul 2: `b1_18_belastungen`, `a5_affiliate_stigma`, `b9_depression_partner` | gutes späteres Belastungs-/Stigma-Paket, aber weniger geschlossen als Modul 4 |
| Modul 3/5: `b10_trennung_scheidung`, `a3_ambivalente_loyalitaet`, `b5_loyalitaetskonflikte` | sinnvoller als eigenes Beziehungs-/Loyalitäts-Paket statt als Einzelblätter |
| `b3_kritische_zeitpunkte` | aktuell thematisch anschlussfähig, aber quellenlogisch noch nicht scharf genug |
| `rechtliche_orientierung` | benötigt wegen Aktualitäts- und Prüfpflicht eine bewusst kuratierte Sonderwelle |
| `b6_geschlechtsspezifisch` | verbleibender Modul-7-Rest, aber derzeit kein ausreichend grosses Begleitpaket mehr |

## Empfohlene operative Reihenfolge

| Schritt | Aktion |
|---|---|
| 1 | `a4_ambiguous_loss` als neuen Master-Draft anlegen |
| 2 | `b4_mechanismen_erosion` als neuen Master-Draft anlegen |
| 3 | `b2_erosion_solidaritaet` als neuen Master-Draft anlegen |
| 4 | Prüfen, ob `b2_erosion_solidaritaet` zusätzlich in `groups.modul4` sichtbar geführt werden sollte oder bewusst nur über Modul 8 laufen soll |
| 5 | PDFs exportieren und Manifest auf `web_v02`, `2026-04-20`, `quality: "regenerated"` aktualisieren |
| 6 | GATE mit Build, Lint und Browser-Spotcheck auf Modul 4 und Modul 8 durchführen |

## Draft-Strategie pro Handout

Die neuen Drafts sollten sich formal an den bereits regenerierten Blättern orientieren: kurze Orientierung, alltagsnahe Sprache, wenige aber präzise Zwischenüberschriften, klare Handlungslogik und eine Tonalität, die Belastung validiert, ohne zu dramatisieren.

| Draft-Datei | Arbeitstitel | Voraussichtliche Kernstruktur |
|---|---|---|
| `src/handout-drafts/a4_ambiguous_loss.md` | Trauer ohne klaren Abschied | Begriff einordnen, typische Verlustbereiche, warum diese Trauer schwer abschliessbar ist, nächster Schritt |
| `src/handout-drafts/b4_mechanismen_erosion.md` | Schonhaltung und Co-Isolation | Mechanismen erklären, Folgen sichtbar machen, Warnzeichen von Identitätsverlust, nächster Schritt |
| `src/handout-drafts/b2_erosion_solidaritaet.md` | Beziehung unter Druck | wie Belastung über Episoden Beziehung und Alltag erodiert, was kumulativ verloren geht, erste Gegensteuerung |

## Entscheid

**Welle 5 sollte als fokussiertes Modul-4-Paket mit drei robusten Handouts vorbereitet werden:** `a4_ambiguous_loss`, `b4_mechanismen_erosion` und `b2_erosion_solidaritaet`.

`b3_kritische_zeitpunkte` bleibt vorerst ausserhalb des Kerns und ist der naheliegendste Kandidat für eine spätere Übergangs- oder Beziehungswelle, sobald die Web-Quellenbasis dafür noch klarer verdichtet ist.
