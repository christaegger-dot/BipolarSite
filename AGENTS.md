# AGENTS.md — Projektspezifische Vorgaben für Codex

Dieses Dokument legt verbindliche Arbeitsanweisungen für Codex (und andere
Coding-Agenten) im Repository `BipolarSite` fest.

---

## Pflicht-Skill: querformat-handout-render

**Für alle A4-Querformat-Handouts** (Fachstelle Angehörigenarbeit PUK Zürich)
ist der Skill `querformat-handout-render` verbindlich einzusetzen.

Pfad im Repository:

```
.agents/skills/querformat-handout-render/SKILL.md
```

### Wann dieser Skill greift

- Bau oder Reparatur eines A4-Querformat-Handouts (HTML/CSS/SVG → WeasyPrint → PDF)
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

**Nicht freigeben, wenn:**
- mehr als die geplante Seitenzahl entsteht
- Inhalte abgeschnitten sind
- Quellen oder Footer allein auf einer Restseite landen
- die Prüfung nur nach Augenschein erfolgt

---

## Weitere Skills

| Skill | Pfad | Zweck |
|---|---|---|
| `fachstelle-handout` | `.agents/skills/fachstelle-handout/SKILL.md` | Editorial-Policy, Visualisierungs-Wahl |
| `pdf-handout-production` | `.agents/skills/pdf-handout-production/SKILL.md` | Allgemeine PDF-Handout-Produktion |
| `querformat-handout-render` | `.agents/skills/querformat-handout-render/SKILL.md` | Technisches Rendering A4-Querformat |

---

## Allgemeine Regeln

- Fachliche Inhalte **nicht** ohne Rückfrage ändern.
- Layout-Freigabe **nur** nach Messung, nie nach Augenschein.
- Abhängigkeiten (`weasyprint`, `pdftoppm`, `pdfinfo`, Python-Pakete) vor dem
  Render-Lauf prüfen und fehlende im Bericht dokumentieren.
