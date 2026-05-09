# Editorial Review — Wartungsstruktur

Welche Inhalte wann redaktionell zu prüfen sind. Trennt **jährliche Routine-Prüfung** von **anlassbezogener Sofort-Prüfung**.

## Jährlich (Routine)

| Bereich | Was prüfen | Speicherort | Verantwortlich |
|---|---|---|---|
| **Notfallnummern** | 144, 117, 143, 147, Ärztefon-Nummer 0800 33 66 55 noch gültig? Kanton-Zürich-Spezifikum noch aktuell? | `src/_data/site.js` Variablen, `src/notfall/`, alle Modul-Seiten mit Notfall-Hinweis | Fachstelle |
| **Quellen / Leitlinien** | NICE Guideline CG185, S3-Leitlinie Bipolare Störung, Tabelle „letzte Aktualisierung" — gibt es neuere Versionen oder Erratum? | `src/quellen/` (falls existiert), Modul-Footer-Quellenblöcke | Fachstelle |
| **Anlaufstellen** | Pro Mente Sana, VASK, Selbsthilfegruppen, Beratungsstellen — URLs aktuell? Telefonnummern aktuell? Adressen? | `src/modul/8/`, `src/notfall/`, `src/_data/site.js` | Fachstelle |
| **PDFs** | Pro Handout: Quellenstand, Versionierung, Aufnahme in PDF Review Checklist (`docs/pdf-review-checklist.md`) | `src/handouts/`, `src/downloads/`, `src/_data/pdfs.js` | Fachstelle + Tech |
| **Externe Links** | Stichproben über Modul-/Hub-Seiten; Link-Checker-Cron (`.github/workflows/link-check.yml`) erfasst tote Links wöchentlich automatisch | gesamte Site | Tech |
| **Datenschutz / Hosting** | Hosting-Anbieter unverändert (Netlify)? Aussagen zu Tracking/Cookies noch korrekt? | `src/impressum/` | Fachstelle + Tech |
| **Barrierefreiheit** | WCAG-Selbst-Erklärung — Stichprobenprüfung auf Modul-Seiten, Tools, PDFs. Externe Audit-Termine? | `src/barrierefreiheit/` | Fachstelle + Tech |
| **Kontaktangaben** | Adresse PUK Lenggstrasse 31, Telefonnummer Fachstelle, E-Mail-Adresse `angehoerigenarbeit@pukzh.ch` | `src/_data/site.js`, `src/impressum/`, Footer | Fachstelle |
| **Inhaltliche Verantwortung** | Person noch aktiv? Vertretung dokumentiert? | `src/_data/site.js`, Impressum, Footer | Fachstelle |

**Empfehlung:** Diese Routine-Prüfung einmal pro Jahr (z.B. im Januar) durchführen. Befunde als Issues oder PRs umsetzen.

## Anlassbezogen (Sofort-Prüfung bei Auslöser)

Diese Themen werden **nicht** in fixen Intervallen geprüft, sondern **immer wenn ein konkreter Auslöser eintritt**.

### Notfallnummern

**Auslöser:**
- Bekanntwerden einer Änderung (Pressemitteilung, Verband, Kanton)
- Hinweis aus dem Behandlungsteam, dass eine Nummer nicht mehr funktioniert
- Nutzer:innen-Rückmeldung über Kontaktformular oder E-Mail

**Aktion:** Sofortige Anpassung in `src/_data/site.js` und allen referenzierenden Stellen, separater PR mit klarer Commit-Message.

### Arzneimittelsicherheit (insbesondere Valproat)

**Auslöser:**
- Rote-Hand-Brief von Swissmedic/EMA/FDA zu Valproat oder anderem Stimmungsstabilisator
- Veröffentlichung neuer Sicherheits-Empfehlungen zu Schwangerschaft/Kinderwunsch
- Aktualisierung der Fach- oder Patienteninformation

**Aktion:** Modul-Stellen mit Medikamenten-Erwähnung prüfen, Sicherheits-Hinweistext anpassen oder ergänzen, **fachliche Freigabe einholen**, dann PR.

> **Wichtig:** Keine eigenmächtige Aufnahme oder Veränderung medizinischer Detail-Aussagen ohne fachliche Person mit ärztlicher Verantwortung. Bei Unsicherheit lieber einen TODO-Hinweis stehenlassen als eine fragliche Aussage publizieren.

### Quellen / Leitlinien

**Auslöser:**
- Neue Hauptversion einer relevanten Leitlinie (NICE, S3, APA)
- Erratum zu einer zitierten Studie
- Empfehlung aus dem Fachkreis, eine bestimmte Quelle zu ersetzen

**Aktion:** Quelle aktualisieren, ggf. begleitende Aussagen im Modul prüfen.

### Datenschutz / Hosting

**Auslöser:**
- Wechsel des Hosting-Anbieters
- Einführung neuer Tools (Forms, Analytics — sollte nicht passieren ohne expliziten Beschluss)
- Änderung in der EU-/CH-Datenschutz-Gesetzgebung mit Auswirkung auf statische Sites

**Aktion:** Impressum/Datenschutz-Sektion überarbeiten.

### Externe Links

**Auslöser:**
- Wöchentlicher Link-Checker-Cron meldet 404 oder Redirect-Chain
- Manuelle Meldung über tote Links

**Aktion:** Fehlerhafte URLs ersetzen oder entfernen. Bei systemischen Problemen (komplette Domain weg) Modul-Stelle inhaltlich prüfen.

### Erfahrungsstimmen

**Auslöser:**
- Hinweis, dass eine als typisiert markierte Stimme einer realen Person zugeordnet werden könnte
- Wunsch einer Person, die als Inspiration diente, dass die Stimme nicht mehr verwendet wird

**Aktion:** Stimme umformulieren oder entfernen, Anonymisierung verstärken.

## Verantwortlichkeiten

| Rolle | Aufgabe |
|---|---|
| **Fachstelle Angehörigenarbeit (PUK)** | Inhaltliche Routine-Prüfung, fachliche Freigabe medizinischer Aussagen, Stakeholder-Entscheidungen |
| **Inhaltlich verantwortliche Person (aktuell: Ch. Egger)** | Letztabnahme von Inhalts-Änderungen |
| **Tech-Wartung** | CI-Pipeline, Link-Checker, Build, automatisierte Audits |

## Werkzeuge, die Routine-Prüfung erleichtern

- `npm run audit:release:ci` — prüft PDF-Manifest, interne Links, SEO-Local, Build/Lint vor jedem PR ab #292
- `.github/workflows/link-check.yml` — wöchentlicher Lychee-Cron, postet Findings als GitHub-Issue
- `tests/e2e/core.spec.ts` — Playwright-Smoke auf jedem PR (Routing, Privacy-Pfade, Navigation)
- `docs/pdf-review-checklist.md` — Checkliste pro PDF-Promotion oder -Aktualisierung

## TODOs (offen, redaktionell zu klären)

- [ ] **Aktualisierungsstand** prominenter im Footer / Impressum kommunizieren (aktuell als `{{ build.stand }}` und `{{ site.contentReviewedDisplay }}` vorhanden, aber nicht aufmerksamkeitsstark)
- [ ] **PUK-Verlinkung** prüfen: Gibt es eine Rückverlinkung von einer offiziellen PUK-Seite auf bipolarsite.netlify.app, damit die Herausgeberschaft eindeutig nachvollziehbar ist? Falls nein: Verhandeln oder Disclaimer „Inoffizielles Begleitangebot" verstärken.
- [ ] **Datenschutzkontakt** explizit ausweisen (aktuell nur indirekt via `angehoerigenarbeit@pukzh.ch`-Mail)
- [ ] **Barrierefreiheits-Standard** konkretisieren — aktuell WCAG 2.1 AA in `src/impressum/`. Prüfen, ob 2.2 AA mit eCH-0059-Anschluss zielführend ist und ob entsprechende externe Prüfung machbar ist.
