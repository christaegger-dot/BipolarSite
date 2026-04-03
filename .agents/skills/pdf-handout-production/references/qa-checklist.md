# QA Checklist

Use this checklist before replacing any live PDF.
Use the same checklist earlier when reviewing `src/_layouts/handout-draft.njk` and the generated HTML draft preview.

## Visual quality

- Does the HTML preview already feel calm before any PDF export?
- Does the PDF look intentional in a real PDF viewer?
- Are hierarchy, spacing, and emphasis still clear?
- Is there any overlap, clipping, collision, or awkward wrapping?
- Does the page feel calm and professional for the target audience?

## Typography / layout calm

- Are there only as many font families as truly needed?
- Are type sizes limited to a small, intentional scale rather than many micro-steps?
- Is there one clear display role instead of several competing “headline voices”?
- Are uppercase labels and chips used sparingly?
- Does the page begin with a manageable amount of metadata, rather than multiple stacked UI layers before the real content?
- If the draft feels noisy in the browser, has that been fixed before discussing PDF export?

## Functional quality

- Does the title shown on the site match the file’s visible title?
- Does the filename match the product naming logic?
- Does the document open or download in the way the UI promises?
- If preview is used, does the preview remain readable and useful?

## Accessibility / document quality

- Is the text selectable?
- Is the document likely text-based rather than image-only?
- Is the page count appropriate?
- Are the most important items easy to find quickly?

## Product consistency

- Is the document truly good enough to move from archive logic into promoted logic?
- If not, should the website simply frame it as archive material instead?
- Would a user reasonably understand why this file is shown here now?

## Release rule

If the PDF is visually unstable, do not ship it just because it is smaller or more modern technically.
