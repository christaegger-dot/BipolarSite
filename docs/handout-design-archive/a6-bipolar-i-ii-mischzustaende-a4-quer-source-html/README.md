# A6 Bipolar I, II und Mischzustände

Kanonische Source-HTML für das neue A4-quer-Orientierungsblatt `a6_bipolar_i_ii_mischzustaende`.

## Artefakte

- Source-HTML: `a6_bipolar_i_ii_mischzustaende.html`
- PDF-Ziel: `src/handouts/a6_bipolar_i_ii_mischzustaende.pdf`
- Draft-Quelle: `src/handout-drafts/a6_bipolar_i_ii_mischzustaende.md`

## Rendern und prüfen

```bash
npm run handout:render -- docs/handout-design-archive/a6-bipolar-i-ii-mischzustaende-a4-quer-source-html/a6_bipolar_i_ii_mischzustaende.html --type orientierung --orientation landscape
npm run handout:verify -- docs/handout-design-archive/a6-bipolar-i-ii-mischzustaende-a4-quer-source-html/a6_bipolar_i_ii_mischzustaende.html --pdf src/handouts/a6_bipolar_i_ii_mischzustaende.pdf --type orientierung --orientation landscape --allow-untagged-pdf
```

Hinweis: Playwright erzeugt weiterhin ungetaggte PDFs (`Tagged: no`). Für finale PDF/UA-Freigaben ist der Acrobat-Remediation-Schritt ausserhalb dieses Source-HTML-Archivs erforderlich.
