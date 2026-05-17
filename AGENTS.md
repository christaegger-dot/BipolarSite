# AGENTS.md — Projektspezifische Vorgaben für Codex

Dieses Dokument legt verbindliche Arbeitsanweisungen für Codex (und andere
Coding-Agenten) im Repository `BipolarSite` fest.

---

## Pflicht-Skills: fachstelle-handout und querformat-handout-render

**Für alle Fachstelle-Handouts** (Fachstelle Angehörigenarbeit PUK Zürich)
ist zuerst der Skill `fachstelle-handout` verbindlich einzusetzen. Er ist die
kanonische redaktionelle und didaktische Regelbasis.

Pfad im Repository:

```
.agents/skills/fachstelle-handout/SKILL.md
```

Vor Inhalts-, Layout-, Migrations- oder Review-Arbeit zuerst lesen:

```
.agents/skills/fachstelle-handout/references/HANDOUT_TEMPLATE.md
```

Für A4-Querformat-Handouts bleibt zusätzlich der technische Skill
`querformat-handout-render` verbindlich.

Pfad im Repository:

```
.agents/skills/querformat-handout-render/SKILL.md
```

### Wann dieser Skill greift

- Bau oder Reparatur eines A4-Querformat-Handouts (HTML/CSS/SVG → Layout-PDF → finale PDF/UA-Freigabe)
- Spaltenüberlauf, Text über Seitenkante, vertikale Geisterlinien, SVG-Render-Fehler
- Render-Auftrag für ein Querformat-Handout
- Zweiseitiges Layout mit exakt 2 Seiten (keine Restseiten)

### Verbindliche Layoutbasis

| Parameter | Wert |
|---|---|
| Format | A4 Querformat (landscape) |
| Seitenränder | 14 mm / 14 mm / 14 mm / 14 mm |
| Nutzbare Breite | 269 mm |
| Nutzbare Höhe | 182 mm |

### Arbeitsreihenfolge (nicht verhandelbar)

1. Didaktisches Reasoning (Schritt 0 im Skill)
2. Blockhöhen messen (`scripts/measure_blocks.py`)
3. Layout konstruieren
4. Rendern (`scripts/render.py`)
5. Mess-Gate: Seitenzahl und Höhenbudget prüfen (`scripts/verify_pdf.py`, `scripts/verify_handout.py`)
6. Visuelle PNG-Gegenprüfung aller Seiten
7. Finale Freigabe nur mit getaggtem PDF (`pdfinfo`: `Tagged: yes`)

**Nicht freigeben, wenn:**
- mehr als die geplante Seitenzahl entsteht
- Inhalte abgeschnitten sind
- Quellen oder Footer allein auf einer Restseite landen
- die Prüfung nur nach Augenschein erfolgt
- das finale PDF `Tagged: no` meldet

### Neues Handout-Workflow-Paket

Für neue visuelle Fachstelle-Handouts liegt der aktuelle Starter- und
Prüfworkflow hier:

```
docs/fachstelle-handout-workflow/README.md
docs/fachstelle-handout-workflow/fachstelle-handout-starter.html
scripts/fachstelle-handout/render_measure_verify.py
scripts/fachstelle-handout/verify_fachstelle_handout.py
```

Komfortbefehle:

```bash
npm run handout:starter
npm run handout:render -- _handout_work/mein-handout.html --type orientierung --orientation landscape
```

Das automatisch erzeugte Playwright-PDF ist ein Layout-Draft. Es darf nicht als
barrierefreies Freigabe-PDF ausgegeben werden, solange kein extern
remediated/tagged PDF via `--final-pdf` geprüft wurde.

---

## Weitere Skills

| Skill | Pfad | Zweck |
|---|---|---|
| `fachstelle-handout` | `.agents/skills/fachstelle-handout/SKILL.md` | Kanonische Handout-Spec, Editorial-Policy, Visualisierungs-Wahl, PDF/UA-Gates |
| `pdf-handout-production` | `.agents/skills/pdf-handout-production/SKILL.md` | Allgemeine PDF-Handout-Produktion |
| `querformat-handout-render` | `.agents/skills/querformat-handout-render/SKILL.md` | Technisches Rendering A4-Querformat |

---

## Allgemeine Regeln

- Fachliche Inhalte **nicht** ohne Rückfrage ändern.
- Layout-Freigabe **nur** nach Messung, nie nach Augenschein.
- Abhängigkeiten (`weasyprint`, `pdftoppm`, `pdfinfo`, Python-Pakete) vor dem
  Render-Lauf prüfen und fehlende im Bericht dokumentieren.
