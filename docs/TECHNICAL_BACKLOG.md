# Technical Backlog

**Stand:** 2026-04-23
**Zweck:** Cross-cut technische Inkonsistenzen und Daten-Drift, die nicht in eine Modul-spezifische oder Welle-spezifische Arbeitsliste passen. Einträge werden beim Beheben entfernt oder in ein konkretes Paket überführt.

---

## P2 — PDF-Label-Inkonsistenz: "1 Seite A4" vs. reale Seitenzahl

**Befund (2026-04-23, bei Paket A / Welle 8):**
`src/_data/pdfs.js` labelt fast alle promoted Downloads mit `pages: "PDF · 1 Seite A4"`. Real sind **9 von 10** Downloads aus Commit 9181c05 (und beide neu aus Commit 30b3315) jedoch **2 Seiten A4**. Einzig `notfallkarte-kanton-zuerich-puk.pdf` ist tatsächlich 1-seitig.

**Ursache:**
Der `generate-handout-pdf.py`-Flow produziert bei den inhaltlichen Drafts (6 Prosa-Sections + Bullet-Listen + emergency-callout + help-Module) systematisch eine zweite Seite. Das `pages`-Feld im Manifest wurde nie an die Realität angepasst — es blieb als Ziel-Spezifikation stehen, obwohl der Output konsistent davon abweicht.

**Betroffene Einträge in `src/_data/pdfs.js`:**
- `downloads.suizidgedanken` (DL-04) — 2 Seiten
- `downloads.psychoseWahn` (DL-05) — 2 Seiten
- `downloads.manie` (DL-06) — 2 Seiten
- `downloads.depression` (DL-07) — 2 Seiten
- `downloads.warnsignale` (DL-08) — 2 Seiten
- `downloads.krisenplanGuide` (DL-09) — 2 Seiten
- `downloads.grenzsetzungPraxis` (DL-10) — 2 Seiten
- `downloads.kritischeZeitpunkte` (DL-11) — 2 Seiten (aus 30b3315)
- `downloads.rechtlicheOrientierung` (DL-12) — 2 Seiten (aus 30b3315)
- `downloads.sichtbarkeitBelastung` (DL-13) — **3 Seiten** (Welle 9, Outlier — inhaltsreichster Draft)

Zusätzlich betroffen (ältere Einträge):
- `downloads.krisenplanVorlage` (DL-02) — 2 Seiten
- `downloads.kurzblattStabilisiert` (DL-03) — 2 Seiten

**Mögliche Lösungen (zur Entscheidung):**
1. **Labels an Realität anpassen** — `pages: "PDF · 1 Seite A4"` → `pages: "PDF · 2 Seiten A4"` bei den 11 betroffenen Einträgen. Schnell, ehrlich, Manifest-only, kein PDF-Re-Render. Risiko: "2 Seiten" klingt nach mehr Last — Download-Conversion könnte leicht sinken.
2. **PDFs redaktionell auf 1 Seite kürzen** — Body-Content + Bullet-Listen in den Drafts straffen, bis der Output tatsächlich 1 Seite passt. Teuer: 11 Drafts × redaktionelle Kürzung × QA. Risiko: Inhalt verliert Präzision.
3. **Layout-Eingriff im Generator** — `MARGIN_T/MARGIN_B` reduzieren oder `spaceAfter` in den Styles verringern, um mehr Content auf Seite 1 zu zwingen. Mittleres Risiko: Typografie kippt visuell.
4. **Labels ganz entfernen** — `pages` aus Card-Rendering rausnehmen, weil die Information niedrigen Nutzen hat. UX-Entscheidung.

**Empfehlung:** Variante 1 (Label-Korrektur) als Sofortmaßnahme. Variante 2 gezielt nur für Blätter, bei denen 1 Seite A4 inhaltlich wichtig ist (Akutblätter, Notfall-Zugriff).

**Trigger:** als Teil des nächsten PDF-Wellen-Commits (oder als `chore(pdfs): ...`-Standalone).

---

## Verwandte Referenzen

- `docs/AUDIT_STATE_2026-04-22.md` — CSS-Audit, betrifft dieses Thema nicht
- `docs/UX_BACKLOG_MODUL_1.md` — Modul-1-UX, anderer Scope
- `docs/WORK_PLAN_2026-04-23.md` — Paket A (Welle 8) hat das Label-Feld bewusst nicht angefasst, um die 9181c05-Konvention nicht im laufenden Replay zu ändern
- Commits `9181c05` (Welle-8-Start) + `30b3315` (b3 + rechtliche Orientierung)
