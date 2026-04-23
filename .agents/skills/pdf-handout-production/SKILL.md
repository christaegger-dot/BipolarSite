---
name: "pdf-handout-production"
description: "Use when auditing, reframing, migrating, previewing, or replacing PDF handouts for the BipolarSite project. Covers the current downloads-vs-archive logic, draft sources, handout-preview typography and layout, release-safe UI changes, and strict QA gates before any live PDF replacement."
---

# PDF Handout Production

Project-specific workflow for PDFs and handouts in this repository.

Use this skill when you need to:
- audit the current PDF system
- improve download / preview / archive framing
- continue the handout migration
- edit or prioritize handout drafts
- reduce visual noise in handout previews
- refine handout typography or layout before any PDF export
- decide whether a PDF can safely replace a live handout

Do not use this skill for general website copy or unrelated UI work.

## Quick start

1. Read [references/current-state.md](references/current-state.md).
2. If the task is release-safe UI / framing work, update the existing website surface first.
3. If the task is draft content work, edit the source in `src/handout-drafts/`.
4. If the task is visual draft refinement, review `src/_layouts/handout-draft.njk` and calm the HTML preview before attempting any export.
5. If the task is a real PDF replacement, follow the QA gates below before touching live files in `handouts/` or `downloads/`.

## File map

- `downloads/`
  - promoted, lightweight, text-based production PDFs
  - these are the current quality reference
  - currently 10 handouts:
    - `grenzsetzung-angehoerige-puk-zuerich.pdf`
    - `krisenplan-erstellen-bipolare-stoerung-puk-zuerich.pdf`
    - `krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf`
    - `kurzblatt-was-stabilisiert-was-schadet-puk-zuerich.pdf`
    - `notfallkarte-kanton-zuerich-puk.pdf`
    - `umgang-mit-depression-puk-zuerich.pdf`
    - `umgang-mit-manie-puk-zuerich.pdf`
    - `umgang-mit-psychose-wahn-puk-zuerich.pdf`
    - `umgang-mit-suizidgedanken-puk-zuerich.pdf`
    - `warnsignale-frueh-erkennen-puk-zuerich.pdf`

- `handouts/`
  - live archive PDFs
  - many are older, heavier, and technically weaker, but still in use

- `src/handout-drafts/`
  - editable source drafts for rebuilt handouts
  - these are the preferred starting point for any future migration

- `src/_layouts/handout-draft.njk`
  - shared HTML preview surface for the rebuilt handouts
  - this is part of the QA surface, not just a throwaway interim layout

- `src/modul/8/index.njk`
  - the main product surface for materials, archive framing, and material finder logic

- `docs/AUDIT_PDF_HANDOUTS_2026-04-03.md`
  - prioritized audit of the current PDF estate

- `docs/PDF_WELLE{4..9}_PLAN_2026-04-20.md`
  - migration order and target logic, split into thematic waves

## Current product logic

- `downloads/` are the first-choice PDFs shown as promoted downloads.
- `handouts/` are still useful, but currently treated as archive material.
- The website should communicate this difference honestly.
- Do not make old archive PDFs look equivalent to the promoted downloads if they are not.

## Release-safe work

These changes are usually safe close to release:

- clarify archive vs promoted materials
- improve names, labels, grouping, and expectation-setting
- reduce confusion between download, preview, archive, and tool
- improve ordering in Modul 8 and related resource surfaces
- point users first to the promoted `downloads/`
- calm the typography and layout in the handout HTML preview
- reduce unnecessary badges, size jumps, and competing emphasis styles

Prefer these before attempting risky PDF regeneration.

## Deep changes

These changes are higher risk and must be handled carefully:

- replacing a live PDF in `handouts/`
- generating a new PDF for production use
- changing the PDF production workflow
- reviving the old script-generated PDF export path

Do not do these casually.

## Important constraint

There was a previous attempt to regenerate handouts via a repo-local script workflow.
The result was technically lightweight but visually unacceptable and unstable in real PDF viewing.

Therefore:

- do not replace live PDFs with script-generated output unless the user explicitly asks for a new production attempt
- do not assume a lightweight file is a good file
- visual stability in a real PDF viewer matters more than file size alone
- treat the HTML draft preview as a real design QA surface; if it already feels noisy there, it will likely fail harder in PDF form

## Preferred migration workflow

1. Start from the relevant file in `src/handout-drafts/`.
2. Improve wording and structure there first.
3. Review the shared preview in `src/_layouts/handout-draft.njk` if the draft feels noisy, crowded, or visually inconsistent.
4. Keep the website framing honest until a robust PDF output exists.
5. Only promote a rebuilt handout into `downloads/` or replace a live archive PDF after QA passes.

## QA gates before replacing a live PDF

All of these must be true:

- the HTML preview already feels calm, typographically consistent, and easy to scan
- the document is not overloaded with competing label styles, badges, or size jumps
- no overlap, clipping, or broken layout in a real PDF viewer
- print image is visually calm and professional
- line breaks, spacing, and emphasis still look intentional outside the browser
- text is selectable and not just image-rendered
- page count is acceptable for the document type
- filename, visible title, and website label match
- preview / download behavior on the site still matches the file’s intended role

If one of these fails, do not replace the live PDF.

## Naming rules

- Use `downloads/` only for promoted, first-choice PDFs.
- Use `handouts/` for archive material until it is truly migrated.
- In UI copy, prefer plain user-facing titles over raw source filenames.
- If a document is older archive material, label it as archive material rather than exposing file size as the main cue.

## When in doubt

- preserve the existing live PDFs
- improve framing, grouping, and prioritization instead
- simplify the HTML draft template before trying to solve everything at PDF-export level
- leave draft sources in place for later migration

## References

- [references/current-state.md](references/current-state.md)
- [references/qa-checklist.md](references/qa-checklist.md)
