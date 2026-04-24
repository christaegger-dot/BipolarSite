# Technical Backlog

**Stand:** 2026-04-25
**Zweck:** Cross-cut technische Inkonsistenzen und Daten-Drift, die nicht in eine Modul-spezifische oder Welle-spezifische Arbeitsliste passen. Einträge werden beim Beheben entfernt oder in ein konkretes Paket überführt.

---

## P3 — `pages`-Feld aus Render-Output ableiten statt manuell pflegen

**Befund (2026-04-24):**
Der ursprüngliche Label-Drift (P2, siehe Erledigt-Sektion) entstand, weil `pages` in `src/_data/pdfs.js` manuell gesetzt wird, während die PDFs automatisiert über `generate-handout-pdf.py` gerendert werden. Solange diese beiden Pfade nicht gekoppelt sind, driftet das Label beim nächsten Content-Update erneut.

**Mögliche Lösung:**
Build-Schritt im Generator (oder als 11ty-Hook) ergänzen, der `pdfinfo` (Poppler) gegen jedes finale PDF laufen lässt und die Seitenzahl in eine Manifest-Datei (`src/_data/pdf-pages.json`) schreibt. `pdfs.js` liest dann `pages` mit Fallback auf einen statischen Default.

Alternativ minimaler: ein Validierungs-Script (`scripts/check-pdf-labels.js`), das CI failed wenn Label und reale Seitenzahl auseinanderlaufen. Kein Auto-Update, aber Drift wird laut.

**Trigger:** Nächste größere Iteration am PDF-Generator-Flow.

---

## P3 — Selektive Kürzung der Akut-Notfallblätter auf 1 Seite

**Befund (2026-04-24):**
Die Label-Korrektur (P2) hat sichtbar gemacht, dass auch Akut-Blätter (Suizidgedanken, Manie, Psychose, Depression, Notfallkarte-Zusatz) inzwischen 2 Seiten sind. Für Notfall-Zugriff ist 1-Seiten-Form inhaltlich relevanter als bei Vertiefungs-Handouts: Eine ausgedruckte Akutkarte gehört auf 1 Blatt.

**Kandidaten:**
- `umgang-mit-suizidgedanken-puk-zuerich.pdf` (DL-04)
- `umgang-mit-manie-puk-zuerich.pdf` (DL-06)
- `umgang-mit-psychose-wahn-puk-zuerich.pdf` (DL-05)
- `umgang-mit-depression-puk-zuerich.pdf` (DL-07)
- ggf. `warnsignale-frueh-erkennen-puk-zuerich.pdf` (DL-08) — Grenzfall

**Vorgehen:**
Pro Blatt: Draft in `src/handout-drafts/` redaktionell straffen (Bullet-Listen kürzen, eine Section zusammenfassen oder weglassen), neu rendern, manuell prüfen ob 1 Seite passt, sonst noch eine Iteration. Danach `pages`-Label aktualisieren.

**Bewusst nicht in Scope:**
Vertiefungs-Handouts (Stigma, Belastungen, Loyalität, Selbstfürsorge) — bei denen ist 2–3 Seiten inhaltlich richtig.

**Trigger:** Nächster Akut-Blätter-Pass oder nach Nutzer-Feedback aus PUK.

---

## P3 — Build/CI-Infrastruktur (Reviewer-Empfehlungen 2026-04-25)

Aus dem Browser-Review nach den Welle-A/B/C-Audits stehen drei CI/Build-Punkte offen, die nicht akut sind, aber langfristig Drift / Regressionen abfangen würden:

### a) Stylelint — 26 deaktivierte Regeln schrittweise re-aktivieren
`.stylelintrc.json` hat aktuell 26 Regeln deaktiviert. Schritt für Schritt wieder einschalten, beginnend mit den sicheren: `color-no-invalid-hex`, `declaration-block-no-duplicate-properties`, `no-duplicate-selectors`. Eine Regel pro PR — kein Big-Bang. Bei Aktivierung läuft erstmal `npm run lint:css` durch und meldet alle Verstöße — fixen, dann mergen.

### b) Link-Checker als wöchentlicher Cron-Job
Bei 24+ PDFs und vielen externen Zielen (VASK, Pro Mente Sana, Ombudsstelle, GitHub) wird irgendwann einer tot sein. `lychee-action` oder `linkinator` als wöchentlicher GitHub-Action-Cron-Job, **nicht** als Merge-Blocker (externe Flakes). Ergebnis als GitHub-Issue posten lassen.

### c) Playwright-Smoke-Tests
`package.json` hat aktuell kein `test`-Script. Drei minimale Tests fangen 90% der Regressionen:
- Landing lädt, H1 sichtbar
- `/modul/8/` → Pathway-Card „Akut" klickbar → landet auf `/notfall/`
- `/notfall/` → `tel:144`-Link hat korrektes `href`
- Mini-Plan: Eintrag speichern → reload → da → Löschen → weg

Ein `.reveal`-Race-Condition-Bug wie in 2026-04-25 (Modul 8 hatte 16 reveal-Elemente ohne Observer, sichtbar nur durch versteckten CSS-Override) wäre durch einen Smoke-Test sofort aufgefallen.

**Trigger:** Eigene Session — keine Sofort-Notwendigkeit, aber wertvoll vor nächster großer Refactor-Welle.

---

## P3 — Pa11y lokal auf Apple Silicon

**Befund (2026-04-25):**
`npm run lint:a11y` schlägt lokal fehl mit `spawn Error -86` — Puppeteer's gebundeltes Chromium passt nicht zur ARM64-Architektur. Auf Linux-CI läuft es ohne Probleme.

**Workaround für lokale Verifikation:**
- Pa11y mit `chromeLaunchConfig.executablePath` auf system-Chrome zeigen lassen
- Oder: Test nur in CI laufen lassen, lokal nur HTML-/CSS-Lint

**Niedrige Priorität:** CI fängt Violations zuverlässig ab.

---

## Erledigt

### ~~P2 — PDF-Label-Inkonsistenz: "1 Seite A4" vs. reale Seitenzahl~~ (2026-04-24)

Behoben: alle 37 falschen `pages`-Labels in `src/_data/pdfs.js` an die reale, per `mdls`/`pdfinfo` verifizierte Seitenzahl angepasst. Scope-Befund war im Backlog ursprünglich auf 11 promoted Downloads beschränkt; bei der Umsetzung zeigte sich, dass auch alle 25 Archiv-Handouts mislabelled waren (19 × 2 Seiten, 6 × 3 Seiten). Einzig `notfallkarte-kanton-zuerich-puk.pdf` (DL-01) war korrekt 1-seitig.

Ursache nicht behoben (nur Symptom) — siehe P3 oben für die strukturelle Folge-Aufgabe.

### ~~Review Startseite + Modul 8 (2026-04-24)~~ (Sessions 24.–25.4.2026)

37-Befunde-Review extern erhalten. **25 von 37 Befunden** in 5 Wellen umgesetzt + 4 verifiziert-OK ohne Code-Änderung + 5 bewusst deferred. Details: `docs/REVIEW_STARTSEITE_MODUL8_2026-04-24.md` + `docs/REVIEW_DECISIONS_2026-04-24.md`.

Highlights:
- **K-03 Hero-CTA-Kontrast** (`a4aea32`)
- **K-10 PUK-Positionierung** (`757e9dd`) — Fachstelle Angehörigenarbeit als Publisher, PUK als Kontext
- **M-02 Gender-Stern** (`93bff3b`) + Folge-Sweep (`8479fe8`, `746b343`) — Doppelform site-weit (Angehörige, Partner, Psychiater, Therapeut)
- **M-17 Modul-8-Hub-Refactor** (`6335dd0`) — eigene Page-Vorlage statt Modul-Template

### ~~Accessibility-Audit (Welle A/B/C + Re-Audit-Nachzug)~~ (2026-04-25)

WCAG-AA-Audit nach den Review-Wellen. Drei Implementierungs-Wellen plus Re-Audit-Nachzug:
- **Welle A** (`65caa8d`): 18× `--teal-dark` → `--teal-text`, Focus-Outlines, säulen-check-buttons, einsicht-tag
- **Welle B** (`dae99fa`): 62 H4→H3 Heading-Flips in Modul 2, 3, 4, 5, 7 + 32 CSS-Selektor-Swaps
- **Welle C** (`007c174`): Form-Focus-Ring stärker, SVG-Button :focus-visible
- **Re-Audit** (`2bfb17d`): F-1 bis F-6 Restbefunde

### ~~Browser-Review-Fixes~~ (2026-04-25)

Live-Test nach Welle-A/B/C + Hub-Refactor:
- **Hub-Karten visuell präsenter** (`309aa81`) — box-shadow + border-warm-md
- **5 Browser-Review-Patches** (`7fa4dcd`) — Nav-Height-Variable, Drop-Cap-Mobile, tel-nowrap, Triage-Grid, Hub-Contact-Focus
- **`.reveal` Race-Condition** (`7a46440`) — entdeckt: Modul 8 hatte 16 reveal-Elemente ohne Observer, sichtbar nur durch versteckten CSS-Override `.reveal { opacity: 1 }`. Pattern refaktoriert: Default sichtbar, JS opt-in via `.js-reveal-active`.

### ~~Lighthouse Tool-Coverage~~ (2026-04-25, `7a46440`)

`lighthouserc.json` von 6 auf 14 URLs erweitert (alle 9 Tools + ursprüngliche 6).

---

## Verwandte Referenzen

- `docs/REVIEW_STARTSEITE_MODUL8_2026-04-24.md` — externer Review, Quelle der Wellen-Arbeit
- `docs/REVIEW_DECISIONS_2026-04-24.md` — bewusst-belassen-Entscheidungen + Status-Matrix
- `docs/AUDIT_STATE_2026-04-22.md` — vor-Review-CSS-Audit (historisch)
- `docs/UX_BACKLOG_MODUL_1.md` — Modul-1-UX, anderer Scope
- `docs/WORK_PLAN_2026-04-23.md` — PDF-Welle-Replay-Plan (historisch)

## Browser-Verifikation noch offen

Die folgenden Punkte aus dem Browser-Review wurden im Code adressiert, sollten aber im Browser bestätigt werden:

- **PDF-Modal Focus-Trap** auf `/modul/8/`: Tab + Shift-Tab + Escape + Fokus-Restaurierung
- **Form-Input Focus** in Mini-Plan + Krisenplan-Werkzeug: Tab durch Felder, sichtbarer Fokus-Ring
- **Breadcrumb-Sichtbarkeit** auf Hub + Modul-Seiten nach `--nav-height`-Fix
