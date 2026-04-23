# Harmony Audit — BipolarSite
**Datum:** 2026-04-05 | **Methodik:** CSS-Analyse + Playwright (Chromium, 1280px + 390px)

> **Status:** Abgelöst durch [`AUDIT_STATE_2026-04-22.md`](./AUDIT_STATE_2026-04-22.md). Die dort dokumentierten Ist-Messwerte (22.4.2026) sind die aktuelle Kanonik-Quelle. Dieses Dokument bleibt als historische Vergleichsbasis erhalten.

---

## 1. Spacing-Token Abweichungen (Inline Styles)

**64 inline `style="..."` Attribute** mit Spacing-/Radius-Werten in M1–M8 gefunden.
Alle sind Abweichungen, weil Inline-Werte bei Token-Änderungen nicht mitziehen.

### Verteilung nach Modul

| Modul | Inline Spacing | Schwere |
|-------|---------------|---------|
| M1 | ~30 | Hoch — fast alle im `#neu`-Diagnoseschock-Block (Z.178–235) |
| M4 | ~10 | Mittel — verstreut in custom Grids + Selbsttest |
| M8 | ~10 | Mittel — Rollen-Grid und Completion-Block |
| M2 | ~4 | Klein |
| M3 | ~3 | Klein |
| M5 | ~5 | Klein |
| M6 | ~5 | Klein |
| M7 | ~3 | Klein |

### Häufigste Abweichungen

| Inline-Wert | Häufigkeit | Nächster Token | Delta |
|-------------|-----------|----------------|-------|
| `margin-bottom:5px` | 6× (M1) | kein Token | — |
| `margin-bottom:7px` | 2× (M1) | kein Token | — |
| `margin-bottom:8px` | 3× (M1) | kein Token | — |
| `margin-bottom:10px` | 3× (M1, M8) | kein Token | — |
| `margin-bottom:12px` | 4× (M4, M8) | kein Token | — |
| `margin-bottom:14px` | 3× (M2, M5) | kein Token | — |
| `padding:16px 18px` | 5× (M1) | `--space-md` (16px) für first, 18px hat keinen Token | +2px |
| `border-radius:16px` | 2× (M4, M8) | kein Token (Lücke zwischen --radius-xl:14px und --radius-pill:20px) | — |
| `gap:20px` | 4× (M1) | kein Token | — |
| `margin-bottom:28px` | 2× (M2, M4) | kein Token (zwischen --space-lg:24 und --space-xl:32) | — |

### Besonders kritisch: M1 `#neu`-Block (Z.178–235)

Der Diagnoseschock-Block in M1 enthält ~25 Inline-Spacing-Deklarationen für ein custom Grid/Card-Layout. Dieses Layout wurde als einmaliger Block gebaut und nicht in `module.css` abstrahiert. Die Werte (5px, 7px, 14px, 18px) kommen sonst nirgends vor.

---

## 2. Komponenten-Konsistenz

### Ergebnis: Fast perfekt

| Komponente | padding | border-radius | Konsistent? |
|-----------|---------|---------------|-------------|
| `.alert-box` | 24px 28px | 12px (--radius-lg) | Ja |
| `.quote-block` | 32px 36px | 12px (--radius-lg) | Ja |
| `.tldr-card` | 24px 28px | 14px (--radius-xl) | Ja |
| `.community-block` | 28px 32px | 0 12px 12px 0 | Ja |
| `.situation-card` | 24px 24px | 12px (--radius-lg) | Ja |
| `.handout-card` | 20px 20px | 12px (--radius-lg) | Ja¹ |
| `.takeaways` | 40px 40px | 14px (--radius-xl) | Ja |
| `.action-card` | 24px 24px | 12px (--radius-lg) | **Nein** |
| `.tool-cta` | 24px 28px | 14px (--radius-xl) | Ja |
| `.quick-summary` | 24px 28px | 14px (--radius-xl) | Ja |
| `.bright-moment` | 24px 28px | 0 12px 12px 0 | Ja |
| `.reflection` | 36px 36px | 14px (--radius-xl) | Ja |

¹ Nur weil `handout-card` per class gesteuert wird — keine Inline-Overrides.

### Einzige Inkonsistenz: `.action-card` in M8

In M8 haben 4 von 8 `.action-card`-Instanzen **abweichende Werte**:
- **padding:** `18px 0px` statt `24px 24px` (M8 Z.~466–475, Rollen-Navigation)
- **border-radius:** `0px` statt `12px`

**Ursache:** M8 verwendet `.action-card` für die Rollen-Navigation, aber das Markup hat wahrscheinlich ein umschliessendes Element, das padding/border-radius überschreibt oder die Karten erscheinen anders im Layout-Kontext.

---

## 3. Vertikale Rhythmus-Analyse

### 3a — Section Gaps (takeaways → community → sources → handouts)

| Modul | takeaways→community | community→sources | sources→handouts |
|-------|--------------------:|------------------:|-----------------:|
| M1 | 48px | 48px | 48px |
| M2 | 48px | 48px | 48px |
| M3 | 48px | 48px | 48px |
| M4 | 48px | 48px | 48px |
| M5 | 48px | 48px | 48px |
| M6 | 48px | 48px | 48px |
| M7 | 48px | 48px | 48px |
| **M8** | **−972px** | **315px** | — |

**Befund:** M1–M7 perfekt konsistent (48px = `margin: 48px 0` aus module.css). **M8 ist der Ausreisser** — der negative Wert (−972px) bedeutet, dass `takeaways` und `community-block` sich optisch überlappen oder in ungünstiger Reihenfolge stehen. Der 315px-Abstand community→sources ist ebenfalls anomal.

**Ursache:** M8 hat zwischen takeaways und community-block einen grossen Completion-Block und Module-Nav, die die Reihenfolge durchbrechen.

### 3b — Mobile Section Gaps

Mobile identisch zu Desktop (48px) für M1–M7. **M8 verschlechtert sich auf Mobile** (−1509px statt −972px, 419px statt 315px).

### 3c — Mobile Gap Inversions (grösser auf Mobile als Desktop)

| Modul | Gap | Desktop | Mobile | Delta |
|-------|-----|--------:|-------:|------:|
| M8 | community→sources | 315px | 419px | +104px |

Nur ein Fall — und nur in M8.

---

## 4. Raumnutzung

### 4a — Content-Breite (Desktop, 1280px)

| Seite | .content | Ratio | .content-wide | Breiter? |
|-------|----------|-------|---------------|----------|
| M1–M8 | 720px | 56% | 656px | **Nein** |
| Homepage | — | — | — | — |

**Problem:** `.content-wide` (656px) ist **schmaler** als `.content` (720px). Das Token `--content-width-wide: 900px` wird nie erreicht, weil `.content-wide` innerhalb von `.content` (max-width: 720px) steht und vom Eltern-Container beschränkt wird. Die `max-width: var(--content-width-wide)` greift nur bei `margin-left/right: auto`, aber die Elemente erben die 720px-Beschränkung plus Padding.

**Auswirkung:** Ampel-Karten, Entscheidungsleitern, Grids — alles, was `.content-wide` nutzt, ist faktisch *schmaler* als normaler Text. Das ist das Gegenteil der Intention.

### 4b — Maximale Zeilenlänge (Zeichen)

| Modul | Max Zeichen |
|-------|-------------|
| M1 | 452 |
| M2 | 398 |
| M3 | 361 |
| M4 | 486 |
| M5 | 495 |
| M6 | 496 |
| M7 | 435 |
| M8 | 320 |

**Hinweis:** Diese Werte zählen den gesamten Textinhalt eines `<p>`-Elements, nicht die visuelle Zeilenlänge. Bei 720px Content-Breite und 1rem/16px Font ergibt das ca. 80–90 Zeichen pro visuelle Zeile — im empfohlenen Bereich (65–90).

### 4c — Mobile (390px)

Alle Module nutzen 100% Breite auf Mobile — korrekt.

---

## 5. Priorisierte Fixliste

### Hoch (sichtbare Disharmonie)

1. **`.content-wide` ist schmaler als `.content`**
   - `src/css/module.css:377–381`
   - Problem: `max-width: var(--content-width-wide)` greift nicht, weil der Eltern-Container `.content` auf 720px limitiert.
   - Empfehlung: `.content-wide`-Elemente müssen aus dem `.content`-Container ausbrechen. Entweder via negative Margins (`margin-left: calc((var(--content-width) - var(--content-width-wide)) / 2)`) oder die Elemente ausserhalb von `.content` platzieren.

2. **M8: Section-Reihenfolge bricht vertikalen Rhythmus**
   - `src/modul/8/index.njk` (Completion-Block + Module-Nav zwischen takeaways und community)
   - Problem: −972px Overlap deutet auf Elemente zwischen takeaways und community, die die erwartete Reihenfolge brechen.
   - Empfehlung: Prüfen, ob `.completion-block` und `.module-nav` vor oder nach dem community-block stehen sollen.

3. **M1 `#neu`-Block: 25+ Inline-Spacing-Deklarationen**
   - `src/modul/1/index.njk:178–235`
   - Problem: Custom Card-Layout mit Ad-hoc-Werten (5px, 7px, 18px), die ausserhalb des Token-Systems stehen.
   - Empfehlung: Eigene CSS-Klassen in `module.css` (z.B. `.diagnosis-card`, `.diagnosis-grid`) mit Token-basierten Werten.

### Mittel (kleine Abweichungen)

4. **M8 `.action-card`: padding/radius-Inkonsistenz**
   - `src/modul/8/index.njk:~466–475` (Rollen-Navigation)
   - 4 Instanzen mit `18px 0px` padding + `0px` border-radius statt Standard `24px 24px` + `12px`.
   - Empfehlung: Eigene Klasse (`.role-nav-card`) oder Override-Regel statt das Standard-Styling zu brechen.

5. **Token-Lücke: `border-radius:16px`**
   - `src/modul/4/index.njk:148`, `src/modul/8/index.njk:218`
   - Zwischen `--radius-xl:14px` und `--radius-pill:20px` wird 16px als Inline-Wert verwendet.
   - Empfehlung: Entweder `--radius-pill` (20px) verwenden oder neuen Token `--radius-lg2: 16px` einführen.

6. **Token-Lücke: Kleine Abstände (< 16px)**
   - Tokens beginnen bei `--space-md: 16px`. Werte wie 4px, 5px, 7px, 8px, 10px, 12px, 14px haben keinen Token.
   - Empfehlung: `--space-xs: 4px`, `--space-sm: 8px`, `--space-base: 12px` ergänzen.

7. **Einheiten-Mix: rem vs. px**
   - `src/modul/7/index.njk:498` (`0.5rem`), `src/modul/8/index.njk:514–515` (`0.25rem`, `1rem`)
   - Tokens nutzen px, Inline-Styles nutzen teilweise rem.
   - Empfehlung: Konsistent bei px bleiben oder Tokens mit rem definieren.

### Klein (Feinschliff)

8. **`gap:20px` ohne Token** (M1, 4 Instanzen)
   - Liegt zwischen `--space-md:16px` und `--space-lg:24px`.
   - Empfehlung: Auf `--space-lg` (24px) aufrunden oder `--space-md-lg: 20px` Token einführen.

9. **`margin-bottom:28px` ohne Token** (M2:141, M4:145)
   - Zwischen `--space-lg:24px` und `--space-xl:32px`.
   - Empfehlung: Auf einen bestehenden Token runden.

10. **`padding-left:14px`** (M1:500, M2:141, M4:145, M4:332)
    - Für eingerückte Listen verwendet. Kein Token.
    - Empfehlung: Neuer Token `--space-indent: 14px` oder auf `--space-md` (16px) setzen.

---

## Screenshots

Gespeichert unter:
- `/tmp/audit-harmony-m1.png` — M1 Content-Block
- `/tmp/audit-harmony-m3.png` — M3 Quote-Block
- `/tmp/audit-harmony-m5.png` — M5 Content-Block
- `/tmp/audit-harmony-m6.png` — M6 Ampel-Karten
- `/tmp/audit-harmony-m7.png` — M7 Content-Block
