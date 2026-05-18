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

Zusaetzlich bei jedem neuen oder geaenderten PDF gezielt nach bekannten
Print-/Textextraktionsfallen suchen:

```bash
pdftotext _handout_build/mein-handout.layout-draft.pdf - \
  | rg -n "betrif t|Diagnosebegrif e|trif t|Family-TalkMetaanalyse| - "
```

Die konkrete Suchliste wird pro Handout um dessen kritische Woerter erweitert:
`ff`, `ffi`, `ffl`, Satzstriche und Quellenbegriffe mit Bindestrichen. Null
Treffer fuer die kaputten Varianten ist Pflicht; die korrekten Woerter muessen
als zusammenhaengende Tokens extrahierbar sein.

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

## Font-, Ligatur- und Umbruch-Fallen

Bei den ersten 2-Seiten-Handouts zeigte sich: Ein PDF kann A4, Mess-Gate,
Textextraktion und Screenshot bestehen und trotzdem sichtbare Print-Defekte
enthalten. Deshalb gehoeren die folgenden technischen Regeln zum
Produktionsstandard.

### ff/ffi/ffl-Ligaturen

Einige Renderer/Font-Kombinationen koennen Ligaturglyphen fehlerhaft einbetten.
Sichtbares Symptom: `betrif t`, `Diagnosebegrif e`, `trif t`.

Wenn der verwendete Font nicht nachweislich vollstaendig eingebettet ist, im
Print-HTML Ligaturen auf dem Handout-Container deaktivieren:

```css
*,
*::before,
*::after {
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "clig" 0, "dlig" 0, "hlig" 0, "calt" 0;
}

.handout {
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "clig" 0, "dlig" 0, "hlig" 0, "calt" 0;
}
```

Vor Abgabe immer beides pruefen:

- `pdftotext`: kaputte Varianten muessen 0 Treffer liefern.
- Visuell: kritische Woerter im PDF bei hoher Vergroesserung pruefen, z. B.
  `betrifft` und `Diagnosebegriffe` bei ca. 400 Prozent.

### Bindestrich-Terme im Quellenfooter

Quellenbegriffe mit internen Bindestrichen duerfen im PDF-Text nicht durch
Umbruch zerstoert werden. Beispiel-Defekt: `Family-TalkMetaanalyse` statt
`Family-Talk-Metaanalyse 2024`.

Sichere Optionen:

- den gesamten Term in einem `white-space: nowrap`-Span halten;
- oder interne Bindestriche als geschuetzte Bindestriche (U+2011) setzen,
  wenn der sichtbare Glyph und die Textextraktion korrekt bleiben.

Kein anderer Eingriff in die Quellenzeile nur zur Umbruchrettung. Keine
Vollbibliographie-URL erfinden.

### Satzstrich

Satzstriche muessen als Halbgeviertstrich `–` (U+2013) mit Leerzeichen davor
und danach im HTML stehen. Nach dem PDF-Render gezielt pruefen, dass sie nicht
als Hyphen-Minus `-` erscheinen.

## Kontrastmessung

Sekundaertexte auf getoenten Flaechen duerfen nicht nach Augenmass freigegeben
werden. Fuer jeden verwendeten Text-auf-Flaeche-Fall die Kontrastwerte
dokumentieren:

- Fliesstext: mindestens 4.5:1
- grosser/fetter Text: mindestens 3:1

Wenn ein Token unter AA liegt, auf ein dunkleres Texttoken heben. Bewaehrte
Messpunkte aus dem Eltern-Handout:

```text
Schutzkreis-Sekundaertext #554c45 auf #fbf7f1 = 7.85:1
Visual-Fusszeile #554c45 auf #ffffff = 8.38:1
Muted-Text #6f655d auf #ffffff = 5.68:1
Muted-Text #6f655d auf #fbf7f1 = 5.32:1
Teal-Text #1f676d auf #ffffff = 6.52:1
```

Solche Werte gehoeren in den Self-Check, wenn Kontrast Teil der Rueckmeldung
war.

## Nicht ausreichend

- Screenshot aus dem Canvas
- PNG-Export ohne Textalternative
- Browser-Vorschau ohne WeasyPrint/PDF-Pruefung
- `approvalStatus: approved` ohne dokumentierte Pruefkette
