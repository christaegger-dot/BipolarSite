# A4 Ambiguous Loss - A4 quer source HTML

Kanonische Produktionsquelle fuer den Neubau von `a4_ambiguous_loss.pdf`.

- Dokumenttyp: Orientierungsblatt
- Format: A4 quer, 1 Seite, 14 mm symmetrische Margins
- Visualisierung: «Da und doch nicht da» als Glaswand-/Zwischenlage-Metapher
- Stand: 17. Mai 2026

Render/Verify:

```bash
npm run handout:render -- docs/handout-design-archive/a4-ambiguous-loss-a4-quer-source-html/a4_ambiguous_loss.html --type orientierung --orientation landscape
npm run handout:verify -- docs/handout-design-archive/a4-ambiguous-loss-a4-quer-source-html/a4_ambiguous_loss.html --pdf src/handouts/a4_ambiguous_loss.pdf --type orientierung --orientation landscape --allow-untagged-pdf
```

Hinweis: Das Layout-PDF aus Playwright ist fuer die technische Layout-QA geeignet, aber nicht PDF/UA-final. Finale Freigabe braucht weiterhin ein getaggtes PDF (`Tagged: yes`).
