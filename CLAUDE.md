# BipolarSite — Psychoedukation für Angehörige (PUK Zürich)

## Build & Serve
- `npm run build` — 11ty build to `_site/`
- `npm run serve` — 11ty dev server with hot reload
- Preview server config: `.claude/launch.json` → `bipolarsite-11ty` (port 8096)

## Architecture
- **Static site generator:** Eleventy (11ty) v2 with Nunjucks templates
- **Source:** `src/` → **Output:** `_site/`
- **Templates:** `src/_layouts/base.njk` (single base layout), pages in `src/modul/`, `src/tools/`, etc.
- **Includes:** `nav-full.njk` (main nav, id="navbar"), `nav-tool.njk` (tool back-nav), `footer-medium.njk`, `footer-compact.njk`
- **Deploy:** Netlify via GitHub, `netlify.toml` in root

## CSS Cascade (critical — read before editing styles)
- Load order: `fonts.css` → `shared.css` → inline `<style>` per page → `tarif-kompass-theme.css`
- **Theme CSS wins by cascade position** (loads last) — `!important` only needed for inline `style=""` HTML attributes
- Remaining 41 `!important` in theme CSS are all in SCHRITT 2 (Farbsystem) — they override inline `style=""` on HTML elements. Do not remove.
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
- 8 interactive tools (`/tools/eisberg/`, `/tools/krisenplan/`, etc.)
- Emergency page (`/notfall/`), Legal (`/impressum/`), 404
- All content in German (lang="de")

## Conventions
- `useSharedCSS: true` on ALL pages (set in frontmatter)
- `useNavJS: true` for pages with full nav, `false` for tools (they have own nav)
- Module pages use `noJs: true` frontmatter + `<script>document.documentElement.classList.remove('no-js')</script>` pattern
- `.reveal` elements use IntersectionObserver — always provide `.no-js .reveal { opacity:1 }` fallback
- Fonts: DM Sans (body), DM Serif Display (headings) — self-hosted WOFF2 in `src/fonts/`
- Design tokens in `:root` of `tarif-kompass-theme.css` — use `var(--token)` not hardcoded values

## Gotchas
- Do NOT duplicate nav logic in page scripts — `nav.js` handles all nav behavior
- Tool pages inline their own `<style>` with body layout (flex centering) — shared.css body styles get overridden
- `body::before` noise texture is defined in shared.css but killed globally by theme CSS (`display:none`)
- Homepage has scroll-reveal animation — content is `opacity:0` until IntersectionObserver fires
- Phase colors in tools use inline `style=""` (JS-generated) — cannot be overridden without `!important`
