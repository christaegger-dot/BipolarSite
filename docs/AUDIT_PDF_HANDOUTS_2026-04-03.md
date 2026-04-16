# Audit PDF / Handouts

Stand: 2026-04-03

## Kurzfazit

Die PDF-Einbindung auf der Website ist technisch insgesamt solide:

- Es gibt derzeit 27 PDF-Dateien.
- Alle geprüften Referenzen zeigen auf vorhandene Dateien in `downloads/` oder `handouts/`.
- Die neue Logik ist konsistent:
  - `downloads/` = direkter Download
  - `handouts/` = Vorschau auf der Seite plus Öffnen/Download

Die technische Qualität der PDFs ist aber nicht einheitlich.

- Die Dateien in `downloads/` sind sehr gut:
  - klein
  - klar benannt
  - mehrseitige, offenbar neuere Exportlogik
- Die Dateien in `handouts/` wirken deutlich älter:
  - fast alle 1-seitig
  - für 1 Seite sehr groß
  - wahrscheinlich bild- oder flächenlastig exportiert
  - vermutlich schlechter durchsuchbar und schwächer für PDF-Accessibility

Wichtig:
Die Einstufung `vermutlich bildbasiert / wahrscheinlich schlecht extrahierbar` ist eine technische Inferenz aus Dateigröße, Ghostscript-Hinweisen und fehlender brauchbarer Textextraktion. Sie ist sehr plausibel, aber nicht aus einem vollständigen PDF-Inhaltstest abgeleitet.

## Bestand

### `downloads/`

- `downloads/notfallkarte-kanton-zuerich-puk.pdf`
- `downloads/krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf`
- `downloads/kurzblatt-was-stabilisiert-was-schadet-puk-zuerich.pdf`

### `handouts/`

- `handouts/a3_ambivalente_loyalitaet.pdf`
- `handouts/a4_ambiguous_loss.pdf`
- `handouts/a5_affiliate_stigma.pdf`
- `handouts/a8_warnsignale.pdf`
- `handouts/b10_trennung_scheidung.pdf`
- `handouts/b1_18_belastungen.pdf`
- `handouts/b2_erosion_solidaritaet.pdf`
- `handouts/b3_kritische_zeitpunkte.pdf`
- `handouts/b4_mechanismen_erosion.pdf`
- `handouts/b5_loyalitaetskonflikte.pdf`
- `handouts/b6_geschlechtsspezifisch.pdf`
- `handouts/b7_behandlung_ambivalenz.pdf`
- `handouts/b9_depression_partner.pdf`
- `handouts/c1_krisenplan.pdf`
- `handouts/c2_suizidgedanken.pdf`
- `handouts/c3_psychose_wahn.pdf`
- `handouts/c4_manie.pdf`
- `handouts/c5_depression.pdf`
- `handouts/c6_selbstfuersorge.pdf`
- `handouts/d4_solidaritaet_wellen.pdf`
- `handouts/expressed_emotions.pdf`
- `handouts/grenzsetzung.pdf`
- `handouts/transformationsreise.pdf`
- `handouts/trialog.pdf`

## Technische Befunde

### Positiv

- Alle geprüften PDFs sind formal gültige `PDF 1.4`.
- Die `downloads/`-Dateien sind klein und effizient:
  - `krisenplan-vorlage...pdf`: 5,003 Bytes, 2 Seiten
  - `kurzblatt-was-stabilisiert...pdf`: 5,897 Bytes, 2 Seiten
  - `notfallkarte...pdf`: 7,358 Bytes, 1 Seite
- Die `downloads/`-Dateien enthalten sauberere Metadaten und wirken wie neuere Exporte.

### Kritisch / auffällig

- Praktisch alle `handouts/` sind nur 1 Seite lang, aber meist zwischen ca. `790 KB` und `1.07 MB`.
- Diese Größen sind für 1-seitige Text-Handouts ungewöhnlich hoch.
- Eine Stichprobe zeigte Ghostscript-/`pdfwrite`-Hinweise bei älteren Handouts.
- Brauchbare Textextraktion war in der Stichprobe nicht verfügbar.

Das deutet stark darauf hin, dass viele Handouts:

- nicht als schlanke, textbasierte PDFs exportiert wurden
- eher druckorientiert oder flächen-/bildbasiert aufgebaut sind
- damit schwächer für:
  - Copy/Paste
  - Volltextsuche
  - Screenreader-PDF-Nutzung
  - geringe Dateigröße

## Priorisierung

### P1: zuerst neu exportieren

Diese Dateien sind entweder besonders groß oder inhaltlich besonders zentral:

- `handouts/a8_warnsignale.pdf` — 1,068,926 Bytes
- `handouts/c4_manie.pdf` — 1,021,479 Bytes
- `handouts/c5_depression.pdf` — 1,017,354 Bytes
- `handouts/c3_psychose_wahn.pdf` — 1,015,839 Bytes
- `handouts/b1_18_belastungen.pdf` — 994,466 Bytes
- `handouts/expressed_emotions.pdf` — 984,954 Bytes
- `handouts/b7_behandlung_ambivalenz.pdf` — 971,311 Bytes

Begründung:

- hohe Relevanz für Kernpfade der Website
- technisch unter den schwersten Dateien
- hoher Nutzen bei Neuaufbau als durchsuchbare, barriereärmere PDFs

### P2: danach neu exportieren

- `handouts/b6_geschlechtsspezifisch.pdf`
- `handouts/b10_trennung_scheidung.pdf`
- `handouts/a3_ambivalente_loyalitaet.pdf`
- `handouts/a4_ambiguous_loss.pdf`
- `handouts/c2_suizidgedanken.pdf`
- `handouts/b3_kritische_zeitpunkte.pdf`
- `handouts/c1_krisenplan.pdf`
- `handouts/b2_erosion_solidaritaet.pdf`

Begründung:

- ebenfalls zentrale Themen
- technisch auffällig, aber etwas weniger dringlich als P1

### P3: zuletzt modernisieren

- `handouts/a5_affiliate_stigma.pdf`
- `handouts/grenzsetzung.pdf`
- `handouts/b9_depression_partner.pdf`
- `handouts/b4_mechanismen_erosion.pdf`
- `handouts/trialog.pdf`
- `handouts/b5_loyalitaetskonflikte.pdf`
- `handouts/d4_solidaritaet_wellen.pdf`
- `handouts/c6_selbstfuersorge.pdf`
- `handouts/transformationsreise.pdf`

Begründung:

- weiterhin sinnvoll zu modernisieren
- aber geringerer technischer oder strategischer Druck

## Bewertung nach Gruppe

### `downloads/`

Urteil: technisch gut

- klare Produktlogik
- klein
- effizient
- für die Website aktuell der bessere Standard

Empfehlung:

- als Referenzstil für künftige PDF-Erstellung verwenden

### `handouts/`

Urteil: funktional brauchbar, technisch veraltet

- inhaltlich vermutlich weiterhin nützlich
- für Web-Auslieferung aber unnötig schwer
- wahrscheinlich schwächer in Suchbarkeit und PDF-Zugänglichkeit

Empfehlung:

- nach und nach im Stil von `downloads/` neu erzeugen

## Empfohlener Zielstandard für neue PDFs

Bei Neuaufbau oder Neu-Export:

- textbasierte PDFs statt bildartiger Exporte
- sinnvolle Metadaten:
  - Titel
  - Autor / Organisation
  - Sprache
- geringe Dateigröße
- möglichst klare Lesereihenfolge
- wenn realistisch: bessere Tagging-/Accessibility-Struktur
- konsistenter Namensstil wie in `downloads/`

## Praktischer nächster Schritt

Am meisten Wirkung hätte jetzt:

1. Die 3 `downloads/` als Qualitätsreferenz festhalten.
2. Die P1-Handouts nacheinander neu exportieren.
3. Danach prüfen:
   - Dateigröße
   - Textauswahl / Copy-Paste
   - Suchbarkeit
   - Metadaten

## Fazit

Die PDF-Verlinkung ist aktuell in Ordnung.

Der eigentliche Qualitätshebel liegt nicht bei den Links, sondern bei den älteren `handouts/`.
Wenn diese PDFs modernisiert werden, gewinnt die Website bei:

- technischer Qualität
- Download-Gewicht
- professionellem Eindruck
- Zugänglichkeit der Materialien
