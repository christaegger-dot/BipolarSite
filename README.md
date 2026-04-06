# Bipolare Störung – Psychoedukation für Angehörige

Statische Website zur Psychoedukation für Angehörige von Menschen mit bipolarer Störung. Entwickelt im Rahmen des Projekts der Psychiatrischen Universitätsklinik Zürich (PUK Zürich).

## Projektstruktur

Die Website wird mit **Eleventy (11ty)** aus dem `src/`-Verzeichnis nach `_site/` gebaut. Quellcode immer in `src/` bearbeiten, nie direkt in `_site/`.

```
BipolarSite/
├── src/                          # Quellverzeichnis (Eleventy-Input)
│   ├── index.njk                 # Startseite
│   ├── 404.njk                   # Fehlerseite
│   ├── robots.njk                # robots.txt
│   ├── sitemap.njk               # sitemap.xml
│   ├── sw.js                     # Service Worker
│   ├── _layouts/
│   │   ├── base.njk              # Basis-Layout (alle Seiten)
│   │   └── handout-draft.njk     # Layout für Handout-Vorschauen
│   ├── _includes/
│   │   ├── nav-full.njk          # Hauptnavigation
│   │   ├── nav-tool.njk          # Tool-Rücknavigation
│   │   ├── footer-medium.njk     # Footer
│   │   └── community-block.njk   # Community-Abschnitt
│   ├── _data/
│   │   └── site.js               # Globale Metadaten (URL, Org, Kontakt)
│   ├── css/
│   │   ├── tokens.css            # Design-Tokens (CSS custom properties)
│   │   ├── shared.css            # Globale Stile (Nav, Layout, Typografie)
│   │   ├── module.css            # Modul-spezifische Stile
│   │   ├── tools.css             # Tool-spezifische Stile
│   │   ├── print.css             # Druckstile
│   │   └── overrides.css         # Kaskaden-Overrides (lädt zuletzt)
│   ├── fonts/                    # Selbst gehostete WOFF2-Fonts
│   │   └── fonts.css             # Font-Face-Deklarationen
│   ├── js/
│   │   └── nav.js                # Navigationslogik (Hamburger-Menü etc.)
│   ├── modul/                    # Psychoedukations-Module 1–8
│   │   ├── 1/index.njk
│   │   ├── 2/index.njk
│   │   └── …
│   ├── module/                   # Modulübersicht (/module/)
│   ├── tools/                    # Interaktive Tools
│   │   ├── eisberg/
│   │   ├── phasenverlauf/
│   │   ├── krisenplan/
│   │   ├── komm-trainer/
│   │   ├── saeulen-check/
│   │   ├── selbsttest/
│   │   ├── solidaritaets-chart/
│   │   ├── ee-kreislauf/
│   │   └── durchatmen/
│   ├── werkzeuge/                # Tool-Übersicht (/werkzeuge/)
│   ├── notfall/                  # Notfallhilfe-Seite
│   ├── impressum/                # Impressum
│   ├── handouts/                 # Herunterladbare PDFs
│   ├── handout-drafts/           # Handout-Entwürfe (Vorschau, nicht öffentlich)
│   ├── downloads/                # Weitere Downloads
│   ├── visuals/                  # Bilder und SVG-Grafiken
│   └── og-image.png              # Open Graph-Bild
├── _site/                        # Build-Output (von Git ignoriert)
├── .eleventy.js                  # Eleventy-Konfiguration
├── netlify.toml                  # Netlify-Konfiguration (Deployment, Header, Caching)
└── package.json
```

## Lokale Entwicklung

### Repository klonen

```bash
git clone https://github.com/christaegger-dot/BipolarSite.git
cd BipolarSite
```

### Abhängigkeiten installieren

```bash
npm install
```

### Entwicklungsserver starten

```bash
npm run serve
```

Der Dev-Server läuft standardmässig auf [http://localhost:8080](http://localhost:8080) und lädt bei Änderungen in `src/` automatisch neu.

### Produktions-Build

```bash
npm run build
```

Ausgabe landet in `_site/` (von Git ignoriert).

## CSS-Kaskade

Die Stylesheets werden in dieser Reihenfolge geladen:

1. `tokens.css` — nur `:root`-Variablen, keine Selektoren
2. `fonts.css` — `@font-face`-Deklarationen
3. `shared.css` — globale Stile, Navigation, Layout
4. `module.css` — Modul-spezifische Stile
5. `tools.css` — Tool-spezifische Stile
6. Inline-`<style>` im Template
7. `overrides.css` — gewinnt durch Kaskadenposition (lädt zuletzt)

`overrides.css` nutzt `!important` nur für Inline-`style=""`-Attribute auf HTML-Elementen. Nicht entfernen.

## Deployment

Die Website wird automatisch über **Netlify** aus dem `main`-Branch deployt. Konfiguration: `netlify.toml`.

- Build-Kommando: `npx eleventy`
- Publish-Verzeichnis: `_site`
- Node-Version: 18
- Security-Header (CSP, X-Frame-Options, …)
- Caching-Regeln für CSS, Fonts, HTML, PDFs

## Technologie

- **Static Site Generator:** Eleventy (11ty) v2 mit Nunjucks-Templates
- **Sprache:** Deutsch (`lang="de"`)
- **Fonts:** DM Serif Display, DM Sans — selbst gehostet als WOFF2
- **Farbpalette:** Navy `#1C2B3A`, Teal `#1E656D`, Teal-light `#8DD4D9`, Amber `#B45309`
- **Design-Tokens:** CSS custom properties in `src/css/tokens.css`

## Beitragen

1. Repository forken
2. Feature-Branch erstellen: `git checkout -b feature/mein-feature`
3. Änderungen in `src/` vornehmen (nicht in `_site/`)
4. Änderungen committen: `git commit -m "Beschreibung der Änderung"`
5. Branch pushen: `git push origin feature/mein-feature`
6. Pull Request erstellen
