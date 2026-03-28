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
│   └── tarif-kompass-theme.css   # Globales Stylesheet (Navy/Teal-Farbpalette)
├── modul/              # Psychoedukations-Module 1–8
│   ├── 1/index.html
│   ├── 2/index.html
│   └── …
├── tools/              # Interaktive Tools
│   ├── eisberg/
│   ├── phasenverlauf/
│   ├── krisenplan/
│   ├── komm-trainer/
│   ├── saeulen-check/
│   ├── selbsttest/
│   ├── solidaritaets-chart/
│   └── ee-kreislauf/
├── notfall/            # Notfallhilfe-Seite
├── impressum/          # Impressum
├── handouts/           # Herunterladbare PDFs
└── downloads/          # Weitere Downloads
```

## Lokale Entwicklung

Da es sich um eine reine statische HTML/CSS/JS-Website ohne Build-Tools handelt, reicht ein einfacher lokaler Webserver aus.

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

### Lokalen Server starten

Mit Python:

```bash
python3 -m http.server 8080
```

Dann im Browser öffnen: [http://localhost:8080](http://localhost:8080)

## Deployment

Die Website wird automatisch über **Netlify** aus dem `main`-Branch deployt. Konfiguration: `netlify.toml`.

- Security-Header (CSP, X-Frame-Options, …)
- Caching-Regeln für CSS, HTML, PDFs

## Technologie

- Reines HTML5, CSS3, JavaScript (keine Frameworks, keine Build-Tools)
- Google Fonts: DM Serif Display, DM Sans
- Farbpalette: Navy `#1C2B3A`, Teal `#1E656D`, Teal-light `#8DD4D9`, Amber `#B45309`

## Beitragen

1. Repository forken
2. Feature-Branch erstellen: `git checkout -b feature/mein-feature`
3. Änderungen committen: `git commit -m "Beschreibung der Änderung"`
4. Branch pushen: `git push origin feature/mein-feature`
5. Pull Request erstellen
