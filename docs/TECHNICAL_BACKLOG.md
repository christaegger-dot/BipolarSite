# Technical Backlog

**Stand:** 2026-04-24
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

## Erledigt

### ~~P2 — PDF-Label-Inkonsistenz: "1 Seite A4" vs. reale Seitenzahl~~ (2026-04-24)

Behoben: alle 37 falschen `pages`-Labels in `src/_data/pdfs.js` an die reale, per `mdls`/`pdfinfo` verifizierte Seitenzahl angepasst. Scope-Befund war im Backlog ursprünglich auf 11 promoted Downloads beschränkt; bei der Umsetzung zeigte sich, dass auch alle 25 Archiv-Handouts mislabelled waren (19 × 2 Seiten, 6 × 3 Seiten). Einzig `notfallkarte-kanton-zuerich-puk.pdf` (DL-01) war korrekt 1-seitig.

Ursache nicht behoben (nur Symptom) — siehe P3 oben für die strukturelle Folge-Aufgabe.

---

## Verwandte Referenzen

- `docs/AUDIT_STATE_2026-04-22.md` — CSS-Audit, betrifft dieses Thema nicht
- `docs/UX_BACKLOG_MODUL_1.md` — Modul-1-UX, anderer Scope
- `docs/WORK_PLAN_2026-04-23.md` — Paket A (Welle 8) hat das Label-Feld bewusst nicht angefasst, um die 9181c05-Konvention nicht im laufenden Replay zu ändern
- Commits `9181c05` (Welle-8-Start) + `30b3315` (b3 + rechtliche Orientierung) + `73cb027` (Welle 9, b6)
