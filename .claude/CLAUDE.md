# BipolarSite — Psychoedukation für Angehörige (PUK Zürich)

## Build & Serve
- `npm run build` — 11ty build to `_site/`
- `npm run serve` — 11ty dev server with hot reload
- Preview server config: `.claude/launch.json` → `bipolarsite-11ty` (port 8096)

## Architecture
- **Static site generator:** Eleventy (11ty) v2 with Nunjucks templates
- **Source:** `src/` → **Output:** `_site/`
- **Layouts:** `src/_layouts/base.njk` (all site pages), `src/_layouts/handout-draft.njk` (standalone PDF-draft preview, loads its own CSS)
- **Includes:** `nav-full.njk` (main nav, id="navbar"), `nav-tool.njk` (tool back-nav), `footer-medium.njk`, `pdf-macros.njk`
- **Pages:** `src/modul/1/`–`src/modul/8/`, `src/tools/*/`, `src/notfall/`, `src/impressum/`, overview pages at `src/module/` and `src/werkzeuge/`
- **Deploy:** Netlify via GitHub, `netlify.toml` in root

## CSS Cascade (critical — read before editing styles)
- Load order (in `base.njk`): `tokens.css` → `fonts.css` → `shared.css` → `module.css` (if `useModuleCSS`) → `tools.css` (if `useToolCSS`) → inline `<style>` per page. `print.css` loads with `media="print"`.
- **`tokens.css`** — only `:root` custom properties (variables), no selectors
- **No global `overrides.css`** — the historical override layer has been eliminated. Specificity is managed via cascade order and scoped selectors.
- **`!important` is rare** (~14 occurrences in production CSS, ~20 in `print.css` which is legitimate). Do not add new ones; extend the relevant class or use a scoped selector instead.
- shared.css nav rules scoped to `#navbar` to avoid conflict with `.tool-nav` on tool pages
- Tool pages have `body{align-items:center}` in inline styles — child elements need explicit `width:100%`

## Breakpoint Strategy
- **900px** — Nav toggle (shared.css + theme)
- **768px** — Grid layouts → single column
- **720px** — PDF preview dialog
- **600px** — Hero/content padding reduction
- **480-500px** — Tool-specific tweaks

## Content Structure
- 8 educational modules (`/modul/1/` – `/modul/8/`)
- 9 interactive tools: `durchatmen`, `ee-kreislauf`, `eisberg`, `komm-trainer`, `krisenplan`, `phasenverlauf`, `saeulen-check`, `selbsttest`, `solidaritaets-chart`
- Overview pages: `/module/` (module index) and `/werkzeuge/` (tools index). Legacy `/tools/` redirects to `/werkzeuge/` via `netlify.toml`.
- Emergency page (`/notfall/`), Legal (`/impressum/`), 404
- PDF handouts: `src/downloads/` (promoted, 3 files), `src/handouts/` (archive, 25 files), `src/handout-drafts/` (rebuilt source drafts, 25 files) — see `.agents/skills/pdf-handout-production/SKILL.md`
- All content in German (lang="de")

## Conventions
- `useSharedCSS: true` on ALL pages (set in frontmatter)
- `useNavJS: true` for pages with full nav, `false` for tools (they have own nav)
- Module pages use `noJs: true` frontmatter + `<script>document.documentElement.classList.remove('no-js')</script>` pattern
- `.reveal` elements use IntersectionObserver — always provide `.no-js .reveal { opacity:1 }` fallback
- Fonts: DM Sans (body), DM Serif Display (headings) — self-hosted WOFF2 in `src/fonts/`
- Design tokens in `:root` of `tokens.css` — use `var(--token)` not hardcoded values

## Skills
- `.claude/skills/bipolarsite-frontend/SKILL.md` — Frontend-Gestaltungsrichtlinien (Design-Haltung, Tokens, Komponenten, A11y). **Canonical source.**
- `.agents/skills/pdf-handout-production/SKILL.md` — Audit/Refactor/Replace workflow for PDF handouts and drafts
- `/audit-homepage [focus-area]` — UX/Content/A11y-Audit der Startseite (runs in subagent)
- `/audit-accessibility [pages]` — WCAG AA Audit (Kontrast, Focus, ARIA, Headings)
- `/deploy-check [url]` — Build prüfen, Deployment verifizieren

## Gotchas
- Do NOT duplicate nav logic in page scripts — `nav.js` handles all nav behavior
- Tool pages inline their own `<style>` with body layout (flex centering) — shared.css body styles get overridden
- Homepage has scroll-reveal animation — content is `opacity:0` until IntersectionObserver fires
- Phase colors in tools use inline `style=""` (JS-generated)
- `build` requires `@11ty/eleventy-img`; a fresh clone needs `npm install` before `npm run build`. Netlify runs `npm install && npx eleventy`, CI installs with `npm ci`.
- Node 22 everywhere (GitHub Actions, Netlify). Local Node should be ≥22.
