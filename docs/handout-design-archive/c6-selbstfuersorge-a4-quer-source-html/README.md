# C6 Selbstfuersorge - A4 quer source HTML

Kanonische Produktionsquelle fuer den Neubau von `c6_selbstfuersorge.pdf`.

- Dokumenttyp: Orientierungsblatt
- Format: A4 quer, 1 Seite, 14 mm symmetrische Margins
- Visualisierung: Akku-Metapher fuer eigene Kraefte
- Stand: 17. Mai 2026

Render/Verify:

```bash
npm run handout:render -- docs/handout-design-archive/c6-selbstfuersorge-a4-quer-source-html/c6_selbstfuersorge.html --type orientierung --orientation landscape
npm run handout:verify -- docs/handout-design-archive/c6-selbstfuersorge-a4-quer-source-html/c6_selbstfuersorge.html --pdf src/handouts/c6_selbstfuersorge.pdf --type orientierung --orientation landscape --allow-untagged-pdf
```

Hinweis: Das Layout-PDF aus Playwright ist fuer die technische Layout-QA geeignet, aber nicht PDF/UA-final. Finale Freigabe braucht weiterhin ein getaggtes PDF (`Tagged: yes`).
