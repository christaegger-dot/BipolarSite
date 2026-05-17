# Produktions-Rendering

Die Diagramm-Bibliothek ist ein Design- und Auswahlwerkzeug. Finale Fachstelle-PDFs duerfen nicht allein aus dem Canvas-Preview als freigegeben gelten.

## Adapter-Vertrag

Ein Produktionsadapter muss pro Diagramm folgende Eingaben erhalten:

```js
{
  diagramId: 'tacho',
  data: {},
  documentType: 'Orientierungsblatt',
  pageFormat: 'A4 quer',
  altText: '...',
  readingOrder: '...',
  sourceContext: 'Name des Handouts'
}
```

Der Adapter muss daraus ein statisches, renderbares Fragment erzeugen:

- HTML/SVG ohne Browser-only-Abhaengigkeiten
- keine CDN-Abhaengigkeit
- eindeutige SVG-IDs
- stabile Masse in mm oder eindeutig kontrollierbaren Pixeln
- eingebettete oder lokal verfuegbare Fonts
- keine ungeprueften Beispiel-Daten

## Mindestpruefung

Nach dem Rendern:

```bash
pdfinfo _handout_build/mein-handout.layout-draft.pdf
pdftotext _handout_build/mein-handout.layout-draft.pdf -
```

Zusaetzlich je nach Umgebung:

```bash
python3 scripts/fachstelle-handout/verify_fachstelle_handout.py _handout_work/mein-handout.html --pdf _handout_work/mein-handout-final-tagged.pdf
```

Wenn `pdfplumber`, Poppler oder andere Dependencies fehlen, darf die Lieferuebersicht nur die tatsaechlich durchgefuehrten Checks behaupten.

## Paket-Kommando

Fuer neue HTML-Handouts im aktuellen Paket:

```bash
cd BipolarSite
python3 scripts/fachstelle-handout/render_measure_verify.py _handout_work/mein-handout.html --type orientierung --orientation landscape
```

Das erzeugt ein Layout-Draft-PDF, einen Screenshot und einen JSON-Report in `_handout_build/`. Dieser Draft prueft A4, 14mm-Randnorm, Ueberlauf, Pflicht-Handlungsausgang, Quellen-/Platzhalterfallen und Krisen-/Standalone-Regeln.

Zusatztools werden automatisch eingebunden, wenn vorhanden: `html-validate`, `axe`, `qpdf`, `mutool`, `exiftool`, `pdftotext`, optional `pdfplumber`, `weasyprint` und `ghostscript`. Diese Checks verbessern Struktur-, Metadaten- und Textextraktionsdiagnostik, ersetzen aber kein PDF/UA-Remediation-Gate.

Fuer finale Freigabe muss ein extern remediated/tagged PDF uebergeben werden:

```bash
python3 scripts/fachstelle-handout/render_measure_verify.py _handout_work/mein-handout.html --type orientierung --orientation landscape --final-pdf _handout_work/mein-handout-final-tagged.pdf
```

Ohne `--final-pdf` gibt es keine PDF/UA-Freigabe. Playwright/Chromium-PDFs sind Layout-Drafts und typischerweise `Tagged: no`.

## Nicht ausreichend

- Screenshot aus dem Canvas
- PNG-Export ohne Textalternative
- Browser-Vorschau ohne WeasyPrint/PDF-Pruefung
- `approvalStatus: approved` ohne dokumentierte Pruefkette
