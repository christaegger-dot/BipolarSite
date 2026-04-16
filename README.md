# Bipolare Störung – Psychoedukation für Angehörige

Statische Website zur Psychoedukation für Angehörige von Menschen mit bipolarer Störung. Entwickelt im Rahmen des Projekts der Psychiatrischen Universitätsklinik Zürich (PUK Zürich).

## Projektstruktur

```
BipolarSite/
├── index.html          # Startseite
├── 404.html            # Fehlerseite
├── robots.txt
├── netlify.toml        # Netlify-Konfiguration (Deployment, Security-Header, Caching)
├── css/
│   ├── tokens.css               # Design tokens (CSS custom properties)
│   └── overrides.css            # Override-Regeln (Navy/Teal-Farbpalette)
├── modul/              # Einzelne Psychoedukations-Module (1–8)
│   ├── 1/index.html
│   ├── 2/index.html
│   └── …
├── module/             # Übersichtsseite aller Module (/module/)
├── tools/              # Einzelne interaktive Tools
│   ├── eisberg/
│   ├── phasenverlauf/
│   ├── krisenplan/
│   ├── komm-trainer/
│   ├── saeulen-check/
│   ├── selbsttest/
│   ├── solidaritaets-chart/
│   └── ee-kreislauf/
├── werkzeuge/          # Übersichtsseite aller Tools (/werkzeuge/)
├── notfall/            # Notfallhilfe-Seite
├── impressum/          # Impressum
├── handouts/           # Herunterladbare PDFs
└── downloads/          # Weitere Downloads
```

> **Hinweis zur Namenskonvention:** Die ähnlich klingenden Verzeichnisnamen sind bewusst getrennt:
> - `src/modul/` enthält die **8 Einzelmodule** (je ein Unterordner `1/` – `8/`), `src/module/` ist ausschließlich die **Übersichtsseite** (`/module/`).
> - `src/tools/` enthält die **8 einzelnen interaktiven Tools** (je ein Unterordner), `src/werkzeuge/` ist ausschließlich die **Übersichtsseite** (`/werkzeuge/`).
>
> Neue Inhalte (Module oder Tools) gehören also immer in `modul/` bzw. `tools/`, nicht in die Übersichtsordner.

## Lokale Entwicklung

Die Website wird aus dem `src/`-Verzeichnis mit **Eleventy** nach `_site/` gebaut. Für reine Sichtprüfungen reicht ein lokaler Server, für Template-Änderungen sollte der Build mitlaufen.

### Repository klonen

```bash
git clone https://github.com/christaegger-dot/BipolarSite.git
cd BipolarSite
```

### Remote konfigurieren (falls nötig)

```bash
git remote add origin https://github.com/christaegger-dot/BipolarSite.git
```

Status prüfen:

```bash
git remote -v
```

### Abhängigkeiten installieren

```bash
npm install
```

### Entwicklungsserver starten

Mit Eleventy:

```bash
npm run serve
```

Oder für eine einfache statische Sichtprüfung des bereits gebauten Outputs mit Python:

```bash
python3 -m http.server 8080
```

Dann im Browser öffnen: [http://localhost:8080](http://localhost:8080)

## Deployment

Die Website wird automatisch über **Netlify** aus dem `main`-Branch deployt. Konfiguration: `netlify.toml`.

- Security-Header (CSP, X-Frame-Options, …)
- Caching-Regeln für CSS, HTML, PDFs

## Technologie

- HTML5, CSS3 und JavaScript, gebaut mit Eleventy
- Lokal gehostete Fonts: DM Serif Display, DM Sans
- Farbpalette: Navy `#1C2B3A`, Teal `#1E656D`, Teal-light `#8DD4D9`, Amber `#B45309`

## Beitragen

1. Repository forken
2. Feature-Branch erstellen: `git checkout -b feature/mein-feature`
3. Änderungen committen: `git commit -m "Beschreibung der Änderung"`
4. Branch pushen: `git push origin feature/mein-feature`
5. Pull Request erstellen
