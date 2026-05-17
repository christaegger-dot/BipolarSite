# Freigabe-Checkliste Diagramme

Diese Checkliste gilt fuer jedes Diagramm, bevor `approvalStatus` in `DIAGRAM_REGISTRY` auf `approved` gesetzt werden darf.

## 1. Fachliche Passung

- [ ] Diagrammtyp passt zur Visualisierungslogik: Metapher, Strukturdiagramm, Verlauf, Vergleich oder Inhaltsblock.
- [ ] Dokumenttyp ist korrekt: Orientierungsblatt, Praxisblatt oder Krisen-Handout.
- [ ] A4 quer ist nur eingesetzt, wenn Diagramm-, Kurven-, Kreislauf- oder Spannungsfeldlogik den horizontalen Raum braucht.
- [ ] Beispiel-Daten wurden durch echte Handout-Daten ersetzt.

## 2. Inhaltsregeln

- [ ] Keine Krisennummern in allgemeinen Orientierungsblaettern.
- [ ] Krisenbegriffe sind nur dort enthalten, wo der Dokumenttyp sie erlaubt.
- [ ] Keine Cross-References im Footer oder im Diagramm, die das Standalone-Prinzip brechen.
- [ ] Keine erfundenen URLs, Quellen oder Vollbibliographie-Angaben.

## 3. Render- und Layout-Gate

- [ ] Diagramm im Ziel-Handout gerendert.
- [ ] Seitenzahl kontrolliert.
- [ ] Mess-Gate bestanden, inklusive Rand- und Inhaltsbreite.
- [ ] Druckoekonomie geprueft: weisser Grund, keine vollflaechigen getoenten Karten, Farbe nur als sparsame Orientierung.
- [ ] Keine Ueberlaeufe, verdeckten Texte oder unlesbaren Labels.
- [ ] Visuelle Gegenpruefung aller Seiten abgeschlossen.

## 4. Accessibility-Gate

- [ ] Alt-Text im Registry-Eintrag fachlich passend.
- [ ] Lesereihenfolge schriftlich in `readingOrder` dokumentiert.
- [ ] Finale PDF-Textextraktion ist verstaendlich.
- [ ] `pdfinfo` zeigt `Tagged: yes`.
- [ ] Screenreader-relevante Struktur ist nicht durch Spalten- oder SVG-Mischung zerstoert.

## 5. Status setzen

Erst wenn alle Punkte erfuellt sind:

- `approvalStatus: 'approved'`
- `weasyPrintStatus: 'passed'`
- `pdfUaStatus: 'passed'`

Wenn eine Stufe nicht geprueft wurde, bleibt der Status `untested` oder `draft`.
