# Accessibility fuer Diagramme

Die aktuelle Bibliothek liefert erste semantische Hinweise: `aria-label`, `title`, `desc`, `data-dg-pdf-ua` und `readingOrder` in der Registry. Das reicht fuer Browser-Orientierung, aber nicht automatisch fuer PDF/UA.

## Anforderungen pro Diagramm

- Jedes Diagramm braucht einen fachlich brauchbaren Alt-Text.
- Die Lesereihenfolge muss explizit dokumentiert sein.
- SVG-Text darf im finalen PDF nicht unlesbar vermischt extrahiert werden.
- Wenn ein Diagramm visuell komplex ist, braucht das Handout eine nahe Textfassung oder eine strukturierte Zusammenfassung.
- Farbe darf Bedeutung nicht allein tragen; Labels muessen die Zonen benennen.

## PDF/UA-Gate

Freigabe nur, wenn:

- `pdfinfo` `Tagged: yes` ausgibt.
- Die Textextraktion sinnvoll lesbar ist.
- Diagrammtext nicht spaltenweise oder geometrisch chaotisch vermischt wird.
- Alt-Text und Lesereihenfolge im finalen PDF-Pfad erhalten bleiben.

`Tagged: no` ist ein Freigabe-Blocker, auch wenn die visuelle Gestaltung stimmt.

