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
│   ├── fonts/                    # Selbst gehostete WOFF2-Fonts
│   │   └── fonts.css             # Font-Face-Deklarationen
│   ├── js/
│   │   └── nav.js                # Navigationslogik (Hamburger-Menü etc.)
│   ├── modul/                    # Einzelne Psychoedukations-Module (1–8)
│   │   ├── 1/index.njk
│   │   ├── 2/index.njk
│   │   └── …
│   ├── module/                   # Übersichtsseite aller Module (/module/)
│   ├── tools/                    # Einzelne interaktive Tools
│   │   ├── eisberg/
│   │   ├── phasenverlauf/
│   │   ├── krisenplan/
│   │   ├── komm-trainer/
│   │   ├── saeulen-check/
│   │   ├── selbsttest/
│   │   ├── solidaritaets-chart/
│   │   ├── ee-kreislauf/
│   │   └── durchatmen/
│   ├── werkzeuge/                # Übersichtsseite aller Tools (/werkzeuge/)
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

> **Hinweis zur Namenskonvention:** Die ähnlich klingenden Verzeichnisnamen sind bewusst getrennt:
> - `src/modul/` enthält die **8 Einzelmodule** (je ein Unterordner `1/` – `8/`), `src/module/` ist ausschließlich die **Übersichtsseite** (`/module/`).
> - `src/tools/` enthält die **9 einzelnen interaktiven Tools** (je ein Unterordner), `src/werkzeuge/` ist ausschließlich die **Übersichtsseite** (`/werkzeuge/`).
>
> Neue Inhalte (Module oder Tools) gehören also immer in `modul/` bzw. `tools/`, nicht in die Übersichtsordner.

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

Im Base-Layout werden CSS-Dateien in dieser Reihenfolge eingebunden:

1. `tokens.css` — nur `:root`-Variablen, keine Selektoren
2. `fonts.css` — `@font-face`-Deklarationen
3. `shared.css` — nur auf Seiten mit `useSharedCSS`
4. `module.css` — nur auf Seiten mit `useModuleCSS`
5. `tools.css` — nur auf Seiten mit `useToolCSS`
6. zusätzlicher CSS-Inhalt im `headCSS`-Block des jeweiligen Templates
7. `print.css` — separat für `media="print"`

## QA und manuelle Tests

Die automatischen Prüfungen des Projekts werden durch kurze, reproduzierbare manuelle Browser-Tests ergänzt. Die dafür maßgeblichen Dokumente liegen im `docs/`-Verzeichnis:

- `docs/qa-checklist.md` für den standardisierten Kurztest vor Merge
- `docs/test-matrix.md` für priorisierte Geräte-, Browser- und Kernpfad-Abdeckung
- `docs/release-audit.md` für den repo-nativen Release-Audit und seine Befehle
- `docs/TOOL_LAYOUT_STRATEGY.md` für die Typisierung und das gemeinsame Layout-Muster der interaktiven Werkzeuge

Bei Änderungen an Layout, Navigation, Modulseiten, Tool-Seiten oder Notfallpfaden soll vor dem Merge zusätzlich ein frischer Browser-Test durchgeführt werden. Ein Merge bei roter GitHub-CI ist ausgeschlossen.

Für den gebündelten technischen Release-Check steht zusätzlich zur Verfügung:

```bash
npm run audit:release
```

## Handout-Regelbasis

Für alle A4-Handouts der Fachstelle ist
`.agents/skills/fachstelle-handout/SKILL.md` die kanonische Regelbasis. Vor
Inhalts-, Layout-, Migrations- oder Review-Arbeit immer zuerst die zugehörige
Spec `.agents/skills/fachstelle-handout/references/HANDOUT_TEMPLATE.md` lesen.

Wichtigste Konsequenz: Dokumenttyp vor Layout. `ORIENTIERUNGSBLATT`,
`PRAXISBLATT` und `KRISEN-HANDOUT` haben unterschiedliche Regeln für
Krisennummern, Cross-References, Quellen/Footer und Visualisierung. Der ältere
Skill `.agents/skills/pdf-handout-production/SKILL.md` bleibt als technischer
Repo-Workflow für Dateiablage, Preview-/Download-Logik und QA erhalten, ist aber
dem Fachstelle-Handout-Skill nachgeordnet.

Für neue visuelle Fachstelle-Handouts liegt ein Starter- und Prüfpaket unter
`docs/fachstelle-handout-workflow/`. Es setzt A4 quer als Regelfall für
visualisierungsgeführte Orientierungsblätter, 14 mm symmetrische Ränder,
weissen Druckgrund, mindestens eine Visualisierung, einen konkreten nächsten
Schritt und ein ehrliches PDF/UA-Gate.

Der aktuelle Bestand und die empfohlene Reihenfolge für Migration,
Konsolidierung und neue Handouts sind in
`docs/HANDOUT_INVENTAR_UND_MIGRATIONSPLAN.md` dokumentiert.

```bash
npm run handout:starter
npm run handout:render -- _handout_work/mein-handout.html --type orientierung --orientation landscape
```

Die automatisch gerenderten PDFs sind Layout-Drafts. Finale Freigabe braucht
ein extern remediated/getaggtes PDF, das mit `--final-pdf` geprüft wird.

Für Codex-/Copilot-Umgebungen ist zusätzlich
`.github/workflows/copilot-setup-steps.yml` hinterlegt. Der Setup-Workflow
installiert die Handout-QA-Werkzeuge vor, damit neue Agent-Sitzungen dieselbe
Prüfkette nutzen können.

## Deployment

Die Website wird automatisch über **Netlify** aus dem `main`-Branch deployt. Konfiguration: `netlify.toml`.

- Build-Kommando: `npm install && npx eleventy`
- Publish-Verzeichnis: `_site`
- Node-Version: 22
- Security-Header (CSP, X-Frame-Options, …)
- Caching-Regeln für CSS, Fonts, HTML, PDFs

## Technologie

- **Static Site Generator:** Eleventy (11ty) v2 mit Nunjucks-Templates
- **Sprache:** Deutsch (`lang="de"`)
- **Fonts:** DM Serif Display, DM Sans — selbst gehostet als WOFF2
- **Farbpalette und Design-Tokens:** CSS custom properties in `src/css/tokens.css` sind die Source of Truth für Farben, Abstände, Typografie und Komponentenwerte.

## Beitragen

1. Repository forken
2. Feature-Branch erstellen: `git checkout -b feature/mein-feature`
3. Änderungen in `src/` vornehmen (nicht in `_site/`)
4. Änderungen committen: `git commit -m "Beschreibung der Änderung"`
5. Branch pushen: `git push origin feature/mein-feature`
6. Pull Request erstellen
