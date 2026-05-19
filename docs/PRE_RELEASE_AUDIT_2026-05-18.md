# Pre-Release-Audit BipolarSite

**Datum:** 2026-05-18  
**Repo:** `christaegger-dot/BipolarSite`  
**Branch zum Audit:** `main`  
**Modus:** Read-only Audit; keine Produktcode-Änderungen, kein Push, kein PR.

## Executive Summary

**Release-Empfehlung nach Fix-Pass: GO.**

Der aktuelle Stand ist technisch deutlich stabil: Production-Build, HTML/CSS-Lint, Release-Audit, Pa11y, Playwright-E2E, Live-Redirects, PDF-Manifest und die kuratierte Handout-Integration sind grün. Auf der Materialien-Seite werden im Produktionsbuild genau die 14 kanonischen neuen Handouts ausgeliefert; ältere sichtbare Direkt-Links wie `/handouts/grenzsetzung.pdf` sind live nicht mehr verfügbar.

Es gibt **keinen Critical-Befund**. Der erste Auditlauf fand drei Medium-Punkte: zwei Schweizer-Orthografie-Ausreisser in publiziertem Content, `lang="de"` statt `lang="de-CH"`, und eine Lighthouse-CI-Konfiguration, deren Assertions wegen dynamischem Port nicht zuverlässig griffen. Diese drei Punkte wurden im anschliessenden Fix-Pass behoben und erneut verifiziert. Die übrigen Punkte sind Low und betreffen Härtung, Dokumentation oder langfristige Designsystem-Konsistenz.

Hinweis zur Audit-Spezifikation: Die im Auftrag erwähnte Tailwind-v4-/`client/public/_redirects`-Annahme passt nicht zum aktuellen Repo. Dieses Projekt nutzt Eleventy mit eigener CSS-Schicht; Redirects liegen in `netlify.toml`.

## Befundtabelle

| ID | Severity | Dimension | Datei:Zeile | Beschreibung | Empfohlener Fix |
|---|---|---|---|---|---|
| M-01 | Medium | Inhalt & Sprache | `src/_data/sources.js:758`; `src/tools/krisenplan/index.njk:58` | Zwei publizierte Texte enthalten deutsches `ß`: `einschließlich` auf der Quellen-Seite und `anschließend` im Krisenplan-Werkzeug. Das verletzt die Schweizer-Orthografie-Baseline. | `einschließlich` → `einschliesslich`; `anschließend` → `anschliessend`. Danach `rg -n "ß" src _site` für produktive Inhalte wiederholen. |
| M-02 | Medium | SEO & Meta / Accessibility | `src/_layouts/base.njk:2` | Live-Seiten rendern `<html lang="de">`; die Qualitätsbaseline fordert `lang="de-CH"`. `de` ist gültig, aber weniger präzis für Schweizer Orthografie, Suchmaschinen- und Screenreader-Kontext. | Base-Layout auf `lang="de-CH"` umstellen; falls Draft-/Standalone-Layouts je publiziert werden, dort ebenfalls anpassen. |
| M-03 | Medium | Performance / Audit-Integrität | `lighthouserc.json:31`, `:60`, `:89`, `:118` | Lighthouse läuft erfolgreich, aber die Assertion-Patterns matchen `127.0.0.1:8080`, während LHCI im aktuellen Lauf dynamische Ports wie `49169` verwendet. Dadurch können Schwellenwerte faktisch ins Leere laufen. Im lokalen Lauf lagen SEO-Scores bei 69, ohne dass der Lauf fehlschlug. | Assertion-Patterns port-agnostisch machen, z. B. `^http://127\\.0\\.0\\.1:\\d+/...`, oder LHCI fix auf Port 8080 betreiben. Zusätzlich entscheiden, ob SEO lokal mit Production-Kontext laufen soll, damit `noindex` im lokalen Build die SEO-Scores nicht verfälscht. |
| L-01 | Low | Crisis-Safety & Editorial-Ton | `src/modul/2/index.njk:346`; `src/modul/3/index.njk:295` | Notfallnummern erscheinen ausserhalb der eigentlichen Notfallseite: in Modul 2 bei akuter Suizidgefahr und in Modul 3 bei akuter Gewalt. Inhaltlich wirken beide Stellen begründet und korrekt, sollten aber als bewusste Editorial-Ausnahmen dokumentiert bleiben. | In der redaktionellen Checkliste festhalten: Notfallnummern ausserhalb `/notfall/` nur bei unmittelbarer Sicherheitslogik, nicht in allgemeinen Psychoedukationsblöcken. |
| L-02 | Low | Accessibility / Suche | `src/suche/index.njk:34` | Pagefind meldet beim Build einen Hinweis: Die Default UI bleibt unterstützt, die Component UI wird aber für neue Integrationen wegen besserer Accessibility/Customizing empfohlen. Kein Blocker. | Bei der nächsten Suche-Iteration Pagefind Component UI prüfen; vorerst kein Release-Blocker. |
| L-03 | Low | Security / Deploy-Integrität | `netlify.toml:49` | CSP enthält weiterhin `style-src 'unsafe-inline'`. Der Kommentar in `netlify.toml` erklärt, dass inline styles noch vorhanden sind. Das ist bewusst, aber weniger hart als möglich. | Langfristig Inline-Styles aus Templates und generiertem Markup entfernen; danach CSP auf `style-src 'self'` härten. |
| L-04 | Low | Designsystem-Konsistenz | `src/modul/2/index.njk:211`; `src/modul/5/index.njk:122`; `src/modul/7/index.njk:199` | Mehrere ältere Inline-SVGs und Marker nutzen hartkodierte Hex-Farben statt Design-Tokens. Das widerspricht der Token-Konvention, ist aber aktuell kein visueller Release-Blocker. | Bei der nächsten Diagramm-/Modulpflege SVG-Farben auf vorhandene Tokens oder CSS-Variablen umstellen. Keine Big-Bang-Bereinigung nötig. |

## Fix-Nachtrag M-01 bis M-03

Status nach Fix-Pass am 2026-05-18:

- **M-01 behoben:** produktive `ß`-Ausreisser in `src/_data/sources.js` und `src/tools/krisenplan/index.njk` korrigiert; zusätzlicher CSS-Kommentar ebenfalls auf Schweizer Schreibweise umgestellt.
- **M-02 behoben:** Base-Layout und Handout-Draft-Layout rendern `lang="de-CH"`. Der Production-Build/Pagefind-Lauf erkennt die Sprache als `de-ch`.
- **M-03 behoben:** Lighthouse-CI-Regex matcht dynamische lokale Ports; `npm run lint:lighthouse` erzeugt vor dem Lighthouse-Lauf explizit einen Production-Build. Verifikation: 16 URLs x 3 Läufe, Exit 0, niedrigste Scores: Performance 92, Accessibility 95, Best Practices 100, SEO 100.

## Critical-Befunde

Keine.

## Verifiziert

### Gegen echten Produktionsbuild geprüft

- `CONTEXT=production npm run build` erfolgreich.
  - Eleventy: `Copied 71 files / Wrote 42 files`
  - Pagefind: 28 Seiten, 4478 Wörter indexiert
  - Hinweis nur zu Pagefind Default UI, kein Buildfehler.
- Produktionsbuild enthält genau 14 PDFs unter `_site/handouts/`:
  - `a1_bipolare_stoerung_verstehen.pdf`
  - `a2_phasenverlauf.pdf`
  - `a3_ambivalente_loyalitaet.pdf`
  - `a4_ambiguous_loss.pdf`
  - `a6_bipolar_i_ii_mischzustaende.pdf`
  - `a8_warnsignale.pdf`
  - `a9_schlaf_fruehwarnsystem.pdf`
  - `absprachen_bevor_es_kippt.pdf`
  - `b11_hypervigilanz_erschoepfung.pdf`
  - `behandlung_verstehen.pdf`
  - `c6_selbstfuersorge.pdf`
  - `eltern_mit_bipolarer_stoerung.pdf`
  - `schwieriges_ruhig_ansprechen.pdf`
  - `wenn_behandlung_abgelehnt_wird.pdf`
- Produktionsbuild enthält keine `_site/handout-drafts/`.
- Produktionsbuild enthält keine alten sichtbaren Handout-Dateien wie `_site/handouts/grenzsetzung.pdf`.

### Gegen Live-Site geprüft

- `https://bipolarsite.netlify.app/` → 200, HTML.
- `https://bipolarsite.netlify.app/notfall/` → 200, HTML.
- `https://bipolarsite.netlify.app/materialien/` → 200, HTML.
- `https://bipolarsite.netlify.app/modul/8/` → 301 nach `/anlaufstellen/`, dann 200.
- `https://bipolarsite.netlify.app/handouts/a1_bipolare_stoerung_verstehen.pdf` → 200, `application/pdf`.
- `https://bipolarsite.netlify.app/handouts/grenzsetzung.pdf` → 404.
- `https://bipolarsite.netlify.app/handout-drafts/a3_ambivalente_loyalitaet/` → 404.
- `robots.txt` erlaubt Crawling und verweist auf `https://bipolarsite.netlify.app/sitemap.xml`.
- Live-Meta auf Startseite, Notfallseite und Materialien enthält Title, Description, Canonical und OG-Tags. Kein `noindex` auf diesen Live-Seiten.

### Lokale automatisierte Prüfungen

- `npm run lint` → grün.
- `npm run audit:release:ci` → `overallStatus: pass`, 7 pass, 0 warn, 0 fail.
- `npm run audit:release:prod` → `Release Audit: PASS`.
- `npm run lint:a11y` → Pa11y 20/20 URLs mit 0 Errors, inkl. `/notfall/`.
- `npm run test:e2e` → 98 passed, 2 skipped.
- `npm run lint:lighthouse` → Exit 0; 16 URLs × 3 Läufe. Aktuelle lokale Lighthouse-Spannen:
  - Performance: 96–99
  - Accessibility: 95–100
  - Best Practices: 100
  - SEO: 69 lokal, wegen `is-crawlable`/`noindex` im lokalen Nicht-Production-Kontext; siehe M-03 zur Assertion-Konfiguration.
- No-JS-Smoke mit JavaScript deaktiviert:
  - `_site/notfall/index.html`: lesbar, 18 `tel:`-Links, kein horizontaler Overflow.
  - `_site/index.html`: lesbar, kein horizontaler Overflow.
  - `_site/materialien/index.html`: lesbar, kein horizontaler Overflow.

### Statisch analysiert

- Quellen- und Build-Konfiguration: `package.json`, `.eleventy.js`, `netlify.toml`.
- Redirects und Header in `netlify.toml`.
- Public HTML aus `_site` nach Production-Build.
- Produktive Source-Scans nach `ß`, Platzhaltern, Notfallnummern, PDF-/Handout-Referenzen, `lang`, `noindex`, Pagefind und hardkodierten Farben.
- Designsystem-/CSS-Stichprobe auf Focus, Skip-Link, `prefers-reduced-motion`, Touch-Target-Konventionen und Token-Nutzung.

## Release-Entscheidung

**GO.**

Die drei Medium-Punkte M-01 bis M-03 wurden behoben und verifiziert. Die verbleibenden Low-Punkte sind kein Release-Blocker.
