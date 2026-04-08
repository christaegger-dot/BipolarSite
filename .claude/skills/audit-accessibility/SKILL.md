---
name: audit-accessibility
description: WCAG AA accessibility audit. Check contrast, focus styles, ARIA, keyboard navigation, and heading hierarchy. Use when reviewing accessibility.
argument-hint: [pages]
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob, Bash(node *)
---

# Accessibility Audit — BipolarSite

Audit for WCAG 2.1 AA compliance.

Pages to audit (if provided): $ARGUMENTS
If no pages specified: audit homepage + 2 module pages + 1 tool page + notfall page.

## Check these areas

### 1. Color contrast (tokens.css)
Read `src/css/tokens.css` and calculate contrast ratios for these combinations:
- All text colors (`--text`, `--text-soft`, `--slate`, `--navy`, `--navy-mid`) on all backgrounds (`--bg`, `--card`, `--surface-alt`, `--sand-faint`, `--rose-bg`, `--teal-faint`)
- Button text on button backgrounds (CTA buttons, triage buttons)
- Link colors on their backgrounds

WCAG AA minimums: 4.5:1 normal text, 3:1 large text (≥18pt or ≥14pt bold), 3:1 UI components.

Calculate luminance properly:
- sRGB channel → linear: if sRGB ≤ 0.04045 then linear = sRGB/12.92, else linear = ((sRGB+0.055)/1.055)^2.4
- For rgba colors: composite onto the background first, then calculate

### 2. Focus styles
- Search all CSS files for `:focus-visible`, `:focus`, `outline: none`, `outline: 0`
- Verify every `outline: none` has a replacement focus indicator
- Check that the global `*:focus-visible` rule exists and is not overridden
- Test specific interactive elements: triage buttons, module cards, tool buttons, nav toggle

### 3. Heading hierarchy
- For each page: extract all h1-h6 in document order
- Verify: exactly one h1, no skipped levels
- Note: module pages have h2 → h3 (sub-sections) → h4 (card titles) — this is intentional and correct

### 4. ARIA and keyboard
- Nav toggle: needs `aria-expanded`, `aria-controls`, `aria-label`
- Triage: `hidden` attribute on inactive questions, `aria-live` on result
- Tool interactive elements: check for keyboard accessibility
- Check `src/js/nav.js` for keyboard trap in mobile menu

### 5. Images
- Check all `<img>` tags for meaningful `alt` text
- Decorative images should have `alt=""`
- SVGs with `aria-hidden="true"` are correct

## Output format
Only report **failures**. For each failure: file, line, what's wrong, WCAG criterion, suggested fix.
Do not report things that pass.
