# Fachstelle-Handout-Paket

Status: Arbeits- und Produktionspaket fuer neue A4-Handouts der Fachstelle Angehoerigenarbeit.

Dieses Paket ist fuer neue visuelle Handouts gedacht: A4 quer, 14mm Rand symmetrisch, weisser Druckgrund, mindestens eine Visualisierung und ein konkreter naechster Schritt.

## Dateien

- `docs/fachstelle-handout-workflow/fachstelle-handout-starter.html` - wartbare HTML/CSS-Startvorlage.
- `scripts/fachstelle-handout/verify_fachstelle_handout.py` - HTML/PDF-Gate fuer Format, Raender, Platzhalter, Handlungsausgang, Krisen-/Standalone-Regeln und PDF/UA-Status.
- `scripts/fachstelle-handout/render_measure_verify.py` - Komfortskript: rendert Layout-PDF, misst Blockhoehen, erstellt Screenshot, startet den Verifier.
- `docs/fachstelle-handout-workflow/diagram-library/` - erweiterbare Diagramm-Bibliothek.
- `docs/fachstelle-handout-workflow/diagram-library/README.md`, `FREIGABE-CHECKLISTE.md`, `PRODUKTIONS-RENDERING.md`, `ACCESSIBILITY.md` - Zusatzdokumentation fuer Diagramme und Freigabe.
- Fachstelle-Spec: `.agents/skills/fachstelle-handout/references/HANDOUT_TEMPLATE.md`.

## Quickstart

1. Neues HTML aus dem Starter ableiten.

   ```bash
   cd BipolarSite
   mkdir -p _handout_work
   cp docs/fachstelle-handout-workflow/fachstelle-handout-starter.html _handout_work/mein-handout.html
   ```

2. Alle sichtbaren Platzhalter ersetzen.

   Pflicht: `Handout Titel`, `handout-slug`, Beispiel-Bullets, Quellen-Platzhalter und der generische Kernsatz muessen ersetzt werden.

3. Diagramm oder Metapher waehlen.

   Die Diagramm-Bibliothek lokal ueber HTTP oeffnen:

   ```bash
   cd BipolarSite/docs/fachstelle-handout-workflow/diagram-library
   python3 -m http.server 8765
   ```

   Dann im Browser:

   ```text
   http://127.0.0.1:8765/
   ```

4. Quellen und Vollbibliographie entscheiden.

   Keine URL raten. `Vollbibliographie:` nur einsetzen, wenn die korrekte URL verifiziert und von Christa freigegeben ist. Sonst weglassen.

5. Layout rendern, messen und pruefen.

   Fuer ein echtes Handout ohne Starter-Platzhalter:

   ```bash
   python3 scripts/fachstelle-handout/render_measure_verify.py _handout_work/mein-handout.html --type orientierung --orientation landscape
   ```

   Nur fuer die Starter-Vorlage selbst:

   ```bash
   npm run handout:starter
   ```

   Das Komfortskript nutzt, sofern installiert:

   - `html-validate` fuer HTML-Struktur
   - `axe` fuer automatische HTML-Accessibility-Signale
   - Playwright fuer Layout-Draft, Screenshot und Messung
   - `pdfinfo` fuer A4/Page/Tagged-Status
   - `qpdf`, `mutool`, `exiftool` fuer PDF-Struktur/Metadaten
   - `pdftotext` und, falls verfuegbar, `pdfplumber` fuer Textextraktion
   - `weasyprint` als alternativen Renderer-Vergleich
   - `ghostscript` als PDF-Normalisierungs-/Syntaxhilfe

   Nicht alle Tools beweisen Barrierefreiheit. `Tagged: yes` plus plausible Lesereihenfolge bleibt das finale PDF/UA-Gate.

6. Visuell pruefen.

   Das Skript schreibt Screenshot, Layout-PDF und Report nach `_handout_build/`. Sichtpruefung bleibt Pflicht: keine Ueberlaeufe, Handlungsausgang sichtbar, Footer korrekt, Quellen plausibel.

7. Finales PDF/UA-PDF erzeugen und verifizieren.

   Das automatisch gerenderte Playwright-PDF ist ein Layout-Draft und typischerweise `Tagged: no`. Fuer finale Freigabe braucht es ein remediated/tagged PDF aus einem PDF/UA-faehigen Prozess. Danach:

   ```bash
   python3 scripts/fachstelle-handout/render_measure_verify.py _handout_work/mein-handout.html --type orientierung --orientation landscape --final-pdf _handout_work/mein-handout-final-tagged.pdf
   ```

   Finale Freigabe nur, wenn `pdfinfo` fuer das finale PDF `Tagged: yes` zeigt und Textextraktion/Lesereihenfolge plausibel sind.

## PDF/UA-Produktionsweg

In dieser Umgebung erzeugt Playwright/Chromium kein finales PDF/UA-PDF. Der lokale LibreOffice-Wrapper ist ebenfalls nicht als Produktionsweg verfuegbar. Deshalb ist der verlaessliche Weg zweistufig:

1. Layout-Draft aus HTML rendern und automatisch messen/pruefen.
2. PDF in einem PDF/UA-faehigen Tool remediieren/taggen, z. B. Acrobat Pro Accessibility Workflow oder ein anderer validierter PDF/UA-Prozess.
3. Das remediated PDF mit `--final-pdf` gegen das Paket-Gate pruefen.

Wichtig: Das Paket markiert `Tagged: no` als Blocker fuer finale Freigabe. Es behauptet keine Barrierefreiheit, die nicht nachweisbar ist.

## Entscheidungslogik Quellen

Pro Handout wird entschieden:

- Welche Quellen sind fachlich notwendig?
- Sind Titel, Jahr, Autorenschaft und Geltungsbereich geprueft?
- Gibt es eine verifizierte Vollbibliographie-URL?
- Wenn nein: keine URL im Footer, bis Christa sie freigibt.

Innerhalb eines Lieferpakets muss die Behandlung konsistent sein: entweder alle betroffenen Blaetter mit verifizierter Vollbibliographie-URL oder alle ohne URL.
