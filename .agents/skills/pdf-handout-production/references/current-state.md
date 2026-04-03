# Current State

This repository currently has two different PDF quality tiers.

## Production reference

These files are the quality benchmark:

- `downloads/notfallkarte-kanton-zuerich-puk.pdf`
- `downloads/krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf`
- `downloads/kurzblatt-was-stabilisiert-was-schadet-puk-zuerich.pdf`

They are lightweight, text-based, and intentionally promoted in the UI.

## Archive layer

The files in `handouts/` are still live and still useful, but many of them are:

- older
- heavier
- less consistent
- not yet rebuilt to the newer standard

The website now frames them as archive material rather than pretending they match the promoted downloads.

## Draft sources already available

The following rebuilt draft sources exist:

- `src/handout-drafts/c4_manie.md`
- `src/handout-drafts/c2_suizidgedanken.md`
- `src/handout-drafts/a8_warnsignale.md`

These are the preferred basis for future migration work.

## Existing repo docs

- `AUDIT_PDF_HANDOUTS_2026-04-03.md`
- `PDF_HANDOUT_MIGRATION_PLAN_2026-04-03.md`

Use them as the current migration record before inventing a new workflow.

## Known failure mode

A previous attempt to regenerate priority handouts through a script-based export path produced PDFs that were technically small but visually weak and unstable.

Do not repeat that mistake by optimizing for file size first.

The order of priority is:

1. visual stability
2. print/read quality
3. truthful product framing
4. file size and technical neatness
