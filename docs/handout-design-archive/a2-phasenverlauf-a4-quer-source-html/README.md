# A2 Bipolarer Phasenverlauf

Kanonische Source-HTML für das neue A4-quer-Orientierungsblatt `a2_phasenverlauf`.

## Artefakte

- Source-HTML: `a2_phasenverlauf.html`
- PDF-Ziel: `src/handouts/a2_phasenverlauf.pdf`
- Draft-Quelle: `src/handout-drafts/a2_phasenverlauf.md`

## Rendern und prüfen

```bash
npm run handout:render -- docs/handout-design-archive/a2-phasenverlauf-a4-quer-source-html/a2_phasenverlauf.html --type orientierung --orientation landscape
npm run handout:verify -- docs/handout-design-archive/a2-phasenverlauf-a4-quer-source-html/a2_phasenverlauf.html --pdf src/handouts/a2_phasenverlauf.pdf --type orientierung --orientation landscape --allow-untagged-pdf
```

Hinweis: Playwright erzeugt weiterhin ungetaggte PDFs (`Tagged: no`). Für finale PDF/UA-Freigaben ist der Acrobat-Remediation-Schritt ausserhalb dieses Source-HTML-Archivs erforderlich.
