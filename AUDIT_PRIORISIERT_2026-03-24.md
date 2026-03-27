# Priorisierter Repository-Audit – BipolarSite

**Datum:** 24.03.2026 · **Aktualisiert:** 27.03.2026  
**Prinzip:** erst prüfen → belegen → priorisieren → empfehlen  
**Scope:** statische Website (`index`, `modul/*`, `tools/*`, `notfall`, `impressum`, Deploy-Konfiguration)

---

## Implementierungsstatus (Stand 27.03.2026)

| Befund | Priorität | Status |
|---|---|---|
| Inline-`onclick` aus direktem HTML entfernt | P0-1 | ✅ Umgesetzt |
| `<main>`-Landmarke auf allen Seiten | P0-1 | ✅ Bereits vorhanden |
| Formular-Labels in Krisenplan korrekt (`for`/`id`) | P0-1 | ✅ Bereits korrekt |
| Content-Security-Policy in netlify.toml | P1-5 | ✅ Umgesetzt |
| X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | P1-5 | ✅ Bereits vorhanden |
| Google Fonts self-hosted | P1-4 | ⏳ Ausstehend – WOFF2-Dateien manuell herunterladen |
| CSS modularisieren | P1-2 | ⏳ Ausstehend |
| Template-Duplikation (Nav/Footer) | P1-1 | ⏳ Ausstehend |
| Externe JS-Dateien statt Inline-Scripts | P1-3 | ⏳ Ausstehend |
| CI-Gates (Link-Check, a11y, lint) | P2-3 | ⏳ Ausstehend |

---

## Methodik (kurz)

1. Struktur- und Pattern-Scan der HTML-Dateien (Styles, Skripte, Inline-Handler, Wiederholungen).
2. Stichprobenprüfung kritischer Seiten/Tools mit Fokus auf Accessibility, Datenschutz, Wartbarkeit, Robustheit.
3. Priorisierung nach Risiko (Nutzerwirkung, Betriebsrisiko, rechtl./datenschutzl. Risiko, Änderungsaufwand).

---

## Executive Summary

- **Höchstes Risiko (P0):** ~~Inkonsistenz zwischen behauptetem WCAG-AA-Status und tatsächlicher Tool-Umsetzung~~ → **Behoben:** Inline-`onclick`-Handler aus allen direktem HTML entfernt und auf unobtrusive `addEventListener`-Muster migriert. `<main>`-Landmarken und Formular-Labels waren bereits korrekt.
- **Hoher Hebel (P1):** Sehr viel duplizierter HTML/CSS/JS-Layoutcode (Navigation, Footer, Hero, Handout-Karten, Mobile-Menü-Script) bremst Wartbarkeit und erzeugt Drift zwischen Seiten.  
- **Datenschutz (P1):** Externe Google-Fonts werden auf fast allen Seiten direkt geladen; in sensiblem Gesundheitskontext ist datenschutzärmere Auslieferung (self-hosted) empfehlenswert.  
- **Robustheit/Performance (P1/P2):** Große Inline-CSS-Blöcke pro Seite, ~~fehlende zentrale Security-Header-Konfiguration~~ → **Behoben:** Content-Security-Policy sowie weitere Sicherheitsheader in `netlify.toml` konfiguriert.

---

## Priorisierte Befunde

## P0 – kritisch

### P0-1: Accessibility-Qualität ist nicht konsistent mit dem eigenen AA-Anspruch
**Status: ✅ Teilweise behoben (27.03.2026)**

- **Datei/Pfad:** `impressum/index.html`, mehrere `tools/*/index.html`, `modul/1/index.html`, `modul/4/index.html`  
- **Bereich:** A11y-Governance / Interaktionsmuster  
- **Befund:** Die Impressumsseite erklärt WCAG-2.1-AA als umgesetzt, gleichzeitig nutzen mehrere Interaktionen Inline-`onclick`-Muster und Tool-Seiten ohne `<main>`-Landmarke; im Krisenplan sind `<label>`-Elemente nicht über `for` mit Controls verknüpft.  
  - AA-Claim in Impressum: `impressum/index.html`.  
  - Inline-Event-Muster z. B. in Modul/Tools: `modul/1/index.html`, `modul/4/index.html`, `tools/krisenplan/index.html`, `tools/selbsttest/index.html`, `tools/solidaritaets-chart/index.html`.  
  - Tool-Seiten ohne `<main>`: z. B. `tools/ee-kreislauf/index.html`, `tools/krisenplan/index.html`.  
- **Behobene Punkte (27.03.2026):**
  - Alle direkten `onclick`-Attribute aus direktem HTML entfernt: `tools/krisenplan`, `tools/phasenverlauf`, `tools/solidaritaets-chart`, `tools/ee-kreislauf`, `modul/1`, `modul/4`.
  - Auf `addEventListener`-/Event-Delegation-Muster migriert.
  - `<main>`-Landmarken waren auf allen Seiten bereits vorhanden.
  - Formular-Labels im Krisenplan waren bereits korrekt mit `for`/`id` verknüpft.
- **Offene Punkte:**
  - Inline-`onclick` in dynamisch via JS generierten HTML-Strings (`tools/eisberg`, `tools/komm-trainer`, `tools/saeulen-check`, `tools/selbsttest`) – diese erfordern grössere Refaktorisierung.
  - Vollständiges automatisiertes a11y-Testing (axe/pa11y) als CI-Gate fehlt noch.
- **Risiko/Folge:** Risiko für inkonsistente Tastatur-/Screenreader-Bedienung, schwieriger Nachweis echter AA-Konformität, Reputations- und Compliance-Risiko (insb. bei öffentlicher Einrichtung).  
- **Empfehlung:**  
  1. Accessibility-Baseline definieren (Semantik + Keyboard + Focus + Name/Role/Value) und als Release-Gate einführen.  
  2. Restliche Tool-Interaktionen (Eisberg, Komm-Trainer, Säulen-Check, Selbsttest) ebenfalls auf Event-Delegation migrieren.  
- **Aufwand:** mittel

---

## P1 – wichtig

### P1-1: Starke Template-Duplikation in Navigation, Footer, Hero, Handout- und CTA-Bausteinen
- **Datei/Pfad:** `index.html`, `notfall/index.html`, `impressum/index.html`, `modul/*/index.html`  
- **Bereich:** Struktur/Wartbarkeit  
- **Befund:** Navigation + Mobile-Menü-Logik + Footer sind in vielen Seiten nahezu identisch mehrfach kopiert. Gleiches gilt für Hero-Rahmen, Handout-Karten und CTA-Bausteine in Modulen.  
- **Risiko/Folge:** Hohe Änderungs- und Fehlerkosten; Styles/Verhalten driften auseinander (mehrere Varianten derselben Nav-Logik).  
- **Empfehlung:**  
  1. Kurzfristig: gemeinsame Partials/Includes für Header/Footer/CTA/Handout-Karten.  
  2. Mittelfristig: SSG-Einführung (Eleventy/Hugo) für Layout-Templates und Daten-getriebene Seitengenerierung.  
- **Aufwand:** mittel

### P1-2: Große Inline-CSS-Blöcke pro Seite statt modularer Styleschichten
- **Datei/Pfad:** vor allem `index.html`, `modul/1/index.html`, `modul/2-8/index.html`, `tools/*/index.html`  
- **Bereich:** CSS-Architektur / Performance / Wartung  
- **Befund:** Sehr umfangreiche `<style>`-Blöcke je Seite (z. B. Startseite ~670 Style-Zeilen, Modul 1 ~525 Style-Zeilen).  
- **Risiko/Folge:** Redundanz, größere HTML-Payloads, erschwerte systematische Designänderungen, höheres Risiko inkonsistenter Tokens.  
- **Empfehlung:** Modulare CSS-Struktur einführen (z. B. `base/`, `layout/`, `components/`, `utilities/`, `tokens/`) und gemeinsame Tokens zentralisieren.  
- **Aufwand:** mittel-hoch

### P1-3: Inline-JavaScript und gemischte Interaktionsparadigmen
- **Datei/Pfad:** `modul/1/index.html`, `modul/4/index.html`, `tools/*/index.html`, `notfall/index.html`, `modul/8/index.html`  
- **Bereich:** Verhalten/JS-Architektur  
- **Befund:** Mischung aus Inline-`onclick` und addEventListener-Ansatz; identische Logik (z. B. Mobile-Menü) mehrfach verteilt; PDF-Preview-Logik in mehreren Seiten ähnlich.  
- **Risiko/Folge:** Schwer testbar, fehleranfällig bei Änderungen, inkonsistente UX zwischen Seiten.  
- **Empfehlung:**  
  1. Externe JS-Dateien pro Feature (`nav.js`, `pdf-preview.js`, `accordion.js`, `tools/*.js`).  
  2. Schrittweise auf ES-Module migrieren (start: shared utilities + nav + pdf preview).  
- **Aufwand:** mittel

### P1-4: Datenschutzärmere Auslieferung möglich – Google Fonts extern eingebunden
- **Datei/Pfad:** praktisch alle HTML-Seiten, z. B. `index.html`, `impressum/index.html`, `modul/*`, `tools/*`  
- **Bereich:** Datenschutz / Compliance  
- **Befund:** Schriften werden via `fonts.googleapis.com` geladen; Datenschutzhinweis existiert, aber technische Minimierung ist nicht umgesetzt.  
- **Risiko/Folge:** Externe Requests zu Drittanbietern bei Seitenaufruf; im Gesundheitskontext erhöhtes Sensibilitäts- und Diskussionsrisiko.  
- **Empfehlung:** Fonts self-hosten, lokale `@font-face`, Subsetting, Preload nur für benötigte Schnitte.  
- **Aufwand:** niedrig-mittel

### P1-5: Security/Hardening-Header nicht zentral konfiguriert
**Status: ✅ Behoben (27.03.2026)**

- **Datei/Pfad:** `netlify.toml`  
- **Bereich:** Robustheit / Sicherheit  
- **Befund:** Netlify-Konfiguration enthielt nur Build-Publish; keine Header-Policy (CSP, X-Frame-Options, Referrer-Policy etc.).  
- **Umgesetzte Massnahmen (27.03.2026):**
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'`
  - Cache-Header für CSS, HTML, Modul/Tools und PDFs konfiguriert.
- **Hinweis:** `unsafe-inline` für Script und Style ist wegen des umfangreichen Inline-Code-Einsatzes notwendig. Nach Modularisierung von CSS/JS kann dieser Wert durch Nonces/Hashes ersetzt werden.
- **Aufwand:** niedrig

---

## P2 – sinnvoll

### P2-1: Inhaltsstruktur stark seitengebunden statt datengetrieben
- **Datei/Pfad:** `modul/*/index.html`, `tools/*/index.html`  
- **Bereich:** Content-Management  
- **Befund:** Inhalte, Metadaten, Quellen, Handouts, CTA-Texte sind direkt im Markup verteilt.  
- **Risiko/Folge:** Redaktionelle Änderungen sind fehleranfällig, Wiederverwendung schwierig, Übersetzbarkeit eingeschränkt.  
- **Empfehlung:** Inhalte in Markdown/JSON (pro Modul) auslagern; Templates rendern daraus Seiten + Listen + Quellen.  
- **Aufwand:** mittel-hoch

### P2-2: Uneinheitliche UI-Konventionen zwischen Tools und Modulseiten
- **Datei/Pfad:** `tools/*/index.html` vs. `modul/*/index.html`  
- **Bereich:** Konsistenz / Design-System  
- **Befund:** Tool-Seiten nutzen eigene Mini-Designsysteme (eigene Klassen-/Farblogik/Komponenten), die vom Modul-Look abweichen.  
- **Risiko/Folge:** Inkonsistente UX und erhöhte Pflegekosten.  
- **Empfehlung:** Gemeinsame Komponentenbibliothek (Button, Card, Badge, Tool-Nav, Feedback, Dialog).  
- **Aufwand:** mittel

### P2-3: Formale Qualitäts-Gates fehlen (Linting/Automations)
- **Datei/Pfad:** Repository-weit  
- **Bereich:** Qualitätssicherung  
- **Befund:** Kein sichtbarer automatisierter Check für HTML-A11y/Lint/Links in der Repo-Struktur.  
- **Risiko/Folge:** Regressionen werden spät bemerkt, manuelle QA-Last steigt.  
- **Empfehlung:** CI mit mindestens Link-Check + HTML-Lint + a11y Smoke Tests (z. B. pa11y/axe in Kernseiten).  
- **Aufwand:** niedrig-mittel

---

## P3 – optional

### P3-1: Erweiterte Performance-Optimierung nach Modularisierung
- **Datei/Pfad:** global  
- **Bereich:** Performance  
- **Befund:** Optimierungspotential bei kritischen Pfaden (CSS-Splitting, script defer/async-Strategie, Asset-Budgeting) ist vorhanden, aber derzeit gegenüber Struktur-/A11y-Themen nachrangig.  
- **Risiko/Folge:** Kein akuter Produktionsblocker, aber suboptimale Ladepfade.  
- **Empfehlung:** Nach Architekturkonsolidierung ein Performance-Budget und Lighthouse-CI etablieren.  
- **Aufwand:** mittel

---

## Architektur-Bewertung (begründet, nicht dogmatisch)

### 1) Templates / Includes
**Bewertung: klar sinnvoll (kurzfristig)**  
Begründung: wiederholte Header/Footer/Nav/CTA/Handout-Blöcke über viele Seiten erzeugen Drift und hohen Pflegeaufwand.

### 2) Content-Auslagerung in Markdown/JSON
**Bewertung: sinnvoll (mittelfristig)**  
Begründung: aktuelle Inhalte sind eng an Seitenmarkups gekoppelt; datengetriebene Inhalte würden redaktionelle Änderungen vereinfachen.

### 3) Static Site Generator (Eleventy/Hugo)
**Bewertung: sinnvoll bei nächstem größeren Wartungszyklus**  
Begründung: Viele statische Seiten mit wiederkehrenden Strukturen und Content-Listen sind ein klassischer SSG-Fit. Kein sofortiger Zwang, aber hoher mittelfristiger Nutzen.

### 4) Modulare CSS-Struktur
**Bewertung: dringend sinnvoll**  
Begründung: große, seitenlokale CSS-Blöcke erschweren konsistente Weiterentwicklung.

### 5) Externe JS-Dateien statt Inline-Skripte
**Bewertung: sinnvoll, stufenweise**  
Begründung: aktuell verteilte Scripts sind schwer wiederverwendbar und erschweren QA/Tests.

### 6) ES-Module
**Bewertung: sinnvoll nach Entkopplung der Inline-Logik**  
Begründung: erst shared JS extrahieren, dann modulare Imports einführen.

---

## Empfohlene Umsetzungsreihenfolge

1. **Phase A (P0/P1, 1–2 Sprints):**
   - A11y-Baseline + Behebung Landmark/Label/Interaktionsmuster
   - Shared Header/Footer/Nav-Script
   - Security-Header in Netlify
   - Google Fonts self-hosted
2. **Phase B (P1/P2, 2–4 Sprints):**
   - CSS modularisieren
   - PDF-Preview/Accordion/Tool-Interaktionen in gemeinsame JS-Module
   - Erste Content-Auslagerung (Handouts, Quellen, CTA)
3. **Phase C (P2/P3):**
   - SSG-Migration (inkrementell)
   - CI-Gates für a11y, links, lint
   - Performance-Budget/Lighthouse-CI

---

## Belege (Dateien mit besonders hoher Relevanz)

- Startseite mit großem Inline-CSS/JS und globaler Navigation: `index.html`.
- Umfangreiche Modulseite mit Inline-Interaktionen: `modul/1/index.html`.
- Repräsentative Modulseiten mit duplizierter Struktur: `modul/4/index.html`, `modul/5/index.html`, `modul/7/index.html`.
- Notfall-/Modul-PDF-Preview-Muster: `notfall/index.html`, `modul/8/index.html`, `modul/1/index.html`.
- Tool-Seiten mit eigenständigen Interaktionsmustern: `tools/krisenplan/index.html`, `tools/solidaritaets-chart/index.html`, `tools/ee-kreislauf/index.html`, `tools/selbsttest/index.html`.
- Datenschutz-/AA-Selbstaussage: `impressum/index.html`.
- Deployment-Konfiguration ohne Header-Härtung: `netlify.toml`.

