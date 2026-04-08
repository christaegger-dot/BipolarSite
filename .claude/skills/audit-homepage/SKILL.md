---
name: audit-homepage
description: Audit the homepage for UX, content, and accessibility issues. Use when reviewing the homepage layout, content flow, or user experience.
argument-hint: [focus-area]
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob, WebFetch
---

# Homepage Audit — BipolarSite

Audit the homepage at `src/index.njk` and its CSS in `src/css/shared.css`.

Focus area (if provided): $ARGUMENTS

## What to check

### 1. Content flow and cognitive load
- Count all decision points (CTAs, links, buttons) the user encounters while scrolling
- Check if the hero promise matches the actual page structure
- Identify any redundancy between entry-paths, triage, and module cards

### 2. Triage functionality
- Read the triage JS in the `{% block scripts %}` section of `src/index.njk`
- Verify the triage is adaptive (only shows one question at a time via `hidden` attribute)
- Count the actual maximum questions a user sees (follow each branch)
- Check if the "Drei kurze Fragen" claim matches reality
- Verify `no-js` fallback: what does a non-JS user see?

### 3. Module card differentiation
- Read all 8 module card titles and descriptions
- Flag any pairs that would be hard to distinguish for a first-time visitor
- Check if descriptions use concrete scenarios vs. abstract themes

### 4. Accessibility quick-check
- Verify `lang="de"` on html element (check `src/_layouts/base.njk`)
- Check heading hierarchy (h1 → h2 → h3, no skips)
- Check that all interactive elements have focus styles
- Verify ARIA attributes on triage (aria-live, hidden states)

### 5. Content accuracy
- Check the Erfahrungsbericht for typographic correctness (opening/closing quotes)
- Verify institutional positioning is consistent (header vs. footer vs. about-aside)
- Check that tool descriptions match the target audience (Angehörige perspective)

### 6. Emergency access
- Check how quickly a user in crisis can reach help (count clicks/scroll distance)
- Verify the Notfall link is visually prominent
- Check if the phone number is accessible without scrolling to the bottom

## Output format

Report findings as:
- **Bugs** (factual errors, broken functionality)
- **UX concerns** (cognitive load, flow issues, differentiation problems)
- **Content suggestions** (tone, framing, audience alignment)

Be specific: cite line numbers, exact text, and concrete evidence. Do NOT guess about JS behavior — read the actual code.
