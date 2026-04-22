# Claude Code Prompt — Handout-HTML zu PDFs konvertieren
# Branch: claude/handout-updates (neu von main)

Du erhältst 4 HTML-Dateien als Upload. Diese sind überarbeitete, druckfertige
Handouts für die PUK-Bipolar-Site. Deine Aufgabe: konvertiere sie zu PDFs und
ersetze die entsprechenden alten PDFs im Repo.

---

## Kontext

Repo: christaegger-dot/BipolarSite
Pfad der bestehenden PDFs: src/handouts/
Build-Befehl zur Verifikation: npm run build

---

## Mapping: HTML-Datei → zu ersetzende PDF

| Hochgeladene HTML-Datei            | Ersetzt                              |
|------------------------------------|--------------------------------------|
| b4_mechanismen_erosion_rev.html    | src/handouts/b4_mechanismen_erosion.pdf |
| b6_reaktionsmuster_rev.html        | src/handouts/b6_geschlechtsspezifisch.pdf |
| c3_psychose_wahn_rev.html          | src/handouts/c3_psychose_wahn.pdf    |
| transformationsreise_rev.html      | src/handouts/transformationsreise.pdf |

---

## Schritt 1 — HTML zu PDF konvertieren

Nutze Puppeteer (Node.js) für die Konvertierung.
Falls Puppeteer nicht installiert: `npm install puppeteer --save-dev`

Für jede HTML-Datei:

```javascript
const puppeteer = require('puppeteer');
const path = require('path');

async function htmlToPdf(inputPath, outputPath) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Load local HTML file
  await page.goto(`file://${path.resolve(inputPath)}`, {
    waitUntil: 'networkidle0'
  });

  // Wait for Google Fonts to load
  await page.waitForTimeout(2000);

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
}
```

Führe die Konvertierung für alle 4 Dateien aus.

---

## Schritt 2 — PDFs ersetzen

Kopiere die generierten PDFs in src/handouts/ und überschreibe die alten Dateien:

```bash
cp b4_mechanismen_erosion_rev.pdf src/handouts/b4_mechanismen_erosion.pdf
cp b6_reaktionsmuster_rev.pdf     src/handouts/b6_geschlechtsspezifisch.pdf
cp c3_psychose_wahn_rev.pdf       src/handouts/c3_psychose_wahn.pdf
cp transformationsreise_rev.pdf   src/handouts/transformationsreise.pdf
```

---

## Schritt 3 — Build verifizieren

```bash
npm run build
```

Build muss 0 Fehler haben.

Verifikation der PDF-Links:
```bash
grep -r 'b4_mechanismen_erosion\|b6_geschlechtsspezifisch\|c3_psychose_wahn\|transformationsreise' \
  _site/modul/ | grep -c 'href'
```
→ Soll > 0 ergeben (bestätigt, dass die PDFs noch verlinkt sind).

---

## Schritt 4 — Commit und PR

```bash
git add src/handouts/b4_mechanismen_erosion.pdf \
        src/handouts/b6_geschlechtsspezifisch.pdf \
        src/handouts/c3_psychose_wahn.pdf \
        src/handouts/transformationsreise.pdf

git commit -m "content(handouts): revised b4, b6, c3, transformationsreise — updated visuals and sources"
```

PR gegen main:
**Titel:** «Handout-Revisionen: b4 Kaskade, b6 Reaktionsmuster, c3 differenziert, Wachstumskurve»

---

## Wichtig

- Die HTML-Dateien brauchen Internetverbindung beim Rendern (Google Fonts).
  Alternativ: `--disable-web-security` Flag oder lokale Fallback-Fonts.
- Falls Google Fonts nicht laden: Die Seiten fallen auf Helvetica Neue / Georgia zurück —
  das ist akzeptabel.
- Die bestehenden PDFs im Repo sind Originale aus einem Design-Tool. Sie werden
  durch die HTML-generierten Versionen ersetzt. Das ist gewollt.
- Keine anderen Dateien im Repo anfassen.
