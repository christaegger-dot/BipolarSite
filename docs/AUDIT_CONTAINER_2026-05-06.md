# Container-Breiten Audit · 2026-05-06

> **Hinweis:** Dieses Dokument ist ein **historischer Audit-Snapshot** (06.05.2026). Die lebende Referenz für das Container-System ist [`CONTAINER_SYSTEM.md`](./CONTAINER_SYSTEM.md).

**Erstellt:** 6. Mai 2026
**Anlass:** Audit-Nachtrag 2.6 (Container-Breiten-System inkonsistent) — Phase-A-Diagnostik
**Methode:** Vollständige `grep`-Inventur über `src/css/{shared,module,tools,print}.css` plus Templates

---

## Token-System (Status quo)

In `src/css/tokens.css`:

```css
--content-width-narrow: 560px;  /* tool wraps, constrained single-column */
--content-width:        780px;  /* default reading width */
--content-width-wide:  1040px;  /* hero + wide prose */
--wide-width:          1200px;  /* module/tool grids */

/* @media (min-width: 1728px) overrides */
--wide-width:          1400px;
--content-width-wide:  1140px;
```

Plus eine globale Container-Regel (`shared.css:879`):

```css
#main-content > section,
#main-content > aside {
  max-width: var(--wide-width);
  margin-inline: auto;
  padding-inline: 2rem;
}
#main-content > .story-section,
#main-content > .invitation-section {
  max-width: none;  /* Full-bleed-Override */
}
```

**Befund:** Es existiert ein 4-stufiges Token-System mit globaler Anwendung. Die Audit-Behauptung „kein Token-System" ist nicht zutreffend.

---

## Inventur: Token-Verwendung

| Token | Vorkommen | Zweck |
|---|---|---|
| `var(--wide-width)` (1200) | ~14× | Editorial-wide Container, Modul-Grid, Hero-Inner |
| `var(--content-width)` (780) | ~25× | Reading column, Quick-Triage-Card, Hub-Hero |
| `var(--content-width-wide)` (1040) | ~7× | Module-Hero, breite Prose |
| `var(--content-width-narrow)` (560) | ~5× | Breathe-Tool, EE-Kreislauf-Tool, Phasenverlauf-Hint |

**Befund:** Die Token-Verteilung ist **breit konsistent**. ~51 Vorkommen, alle 4 Stufen werden gezielt eingesetzt.

---

## Inventur: Character-basiert (Nch)

Lese-Begrenzung über `Nch` (= n × Breite eines Zeichens) — **bewusste Praxis** für Lesefluss, **nicht** als Magic Number zu klassifizieren.

| Werte | Vorkommen | Beispiele |
|---|---|---|
| 18ch–48ch (sehr schmal) | ~15× | Lead-Texte, Section-Descriptions, Tool-Headers |
| 58ch–72ch (Standard-Lesefluss) | ~17× | Story-Body, Modul-Lese, Hub-Hero-Lead |
| 30ch–44ch (mittel) | ~6× | Card-Beschreibungen |

**Befund:** Character-basierte Limits sind editorisch **richtig** und sollten **nicht** auf Pixel-Tokens reduziert werden.

---

## Inventur: Magic Numbers (zu konsolidieren)

### Eindeutig magische Pixel-Werte

| Datei : Zeile | Wert | Kontext | Empfehlung |
|---|---|---|---|
| `shared.css:2232` | `640px` | Vermutlich Modul-Card-Variante | Auf `--content-width-narrow` (560) oder neue Token mappen, je nach Kontext |
| `shared.css:2335` | `1080px` | Editorial-wide-Variante | Auf `--content-width-wide` (1040) mappen |
| `module.css:104` | `1240px` | `.module-layout`-Wrapper (Audit-1.2-Fix) | Eigener Token: `--module-layout-max` oder belassen mit Begründungs-Kommentar |
| `module.css:1775` | `1120px` | Modul 8 Hero | Auf `--content-width-wide` mappen oder beibehalten |
| `module.css:2868` | `1120px` | Modul 8 (zweite Stelle) | Wie 1775 |
| `tools.css:268` | `560px` | Tool-Wrap | **Direkt** auf `--content-width-narrow` |
| `tools.css:315` | `600px` | Komm-Trainer-Wrap | Neuer Token `--tool-wrap-medium` (siehe unten) |
| `tools.css:403` | `680px` | Phasenverlauf-Wrap | Neuer Token `--tool-wrap-wide` |
| `tools.css:455` | `600px` | Säulen-Check-Wrap | Wie tools.css:315 |
| `tools.css:499` | `600px` | Selbsttest-Wrap | Wie tools.css:315 |
| `tools.css:577` | `680px` | Solidaritäts-Chart-Wrap | Wie tools.css:403 |

**Pattern:** Tools nutzen mehrfach `600px` und `680px` — das sind **untokenisierte Tool-Wrap-Breiten**.

### Kontext-spezifische Werte (NICHT Magic Numbers, nur weil unique)

| Datei : Zeile | Wert | Kontext | Empfehlung |
|---|---|---|---|
| `module.css:1407` | `380px` | `.cycle-svg-wrap` SVG-Container | Belassen — SVG-spezifisch |
| `module.css:1760` | `440px` | `.saeulen-legend` Grid | Belassen — Komponenten-spezifisch |
| `module.css:2563` | `340px` | (in @media-Block) | Belassen — Responsive-Begrenzung |
| `tools.css:227` | `320px` | `.breathe-actions` Button-Gruppe | Belassen — Button-Layout |
| `tools.css:240` | `380px` | EE-Kreislauf SVG | Belassen — SVG |
| `tools.css:381` | `100vw` | Confirm-Modal | Belassen — Modal |
| `tools.css:383` | `360px` | Confirm-Box-Inner | Belassen — Modal-Inner |
| `tools.css:474` | `56px` | Pillar-Bar-Width | Belassen — Visualisierung |
| `modul/7/index.njk` (inline) | `300px` | SVG inline | Belassen — SVG-Visualisierung |

**Befund:** Die meisten „Magic Numbers" sind Komponenten-/SVG-spezifisch und korrekt scoped.

---

## Inventur: `max-width: none`-Overrides

| Datei : Zeile | Selektor | Zweck |
|---|---|---|
| `shared.css:890` | `#main-content > .story-section` | Full-bleed Story |
| `shared.css:891` | `#main-content > .invitation-section` | Full-bleed Invitation |
| `shared.css:1962` | weiteres | (zu prüfen) |
| `shared.css:1993` | weiteres | (zu prüfen) |
| `shared.css:2714` | weiteres | (zu prüfen) |
| `module.css:3161` | weiteres | (zu prüfen) |
| `tools.css:192` | weiteres | (zu prüfen) |

**Befund:** 7 `none`-Overrides — alle vermutlich Full-bleed-Sektionen, sollten dokumentiert werden.

---

## Inventur: Inline-Styles

```
src/_layouts/handout-draft.njk:73   max-width:56ch  (handout intro)
src/_layouts/handout-draft.njk:162  max-width:58ch  (handout-prose)
src/_layouts/handout-draft.njk:233  max-width:44ch  (handout-callout)
src/_layouts/handout-draft.njk:296  max-width:36rem (handout-actions)
src/modul/7/index.njk               max-width:300px (Säulen-SVG)
```

**Befund:** Inline-Styles sind im handout-draft-Layout (Standalone-Layout) sowie in einer SVG. Alle character-/komponenten-spezifisch — nicht zu tokenisieren.

---

## Empfehlungen für Phase B (Magic-Number-Cleanup)

### Definitiv aufzuräumen (sicher, niedrig-Risiko)

1. **`tools.css:268`**: `max-width: 560px` → `var(--content-width-narrow)` (Wert identisch, nur Token-isieren)
2. **`shared.css:2335`**: `max-width: 1080px` → `var(--content-width-wide)` (Wert weicht ~4% ab — visuell prüfen, oder neuen Token einführen)
3. **`shared.css:2232`**: `max-width: 640px` — Kontext analysieren, dann mappen

### Tool-Wrap-System einführen (M-Aufwand)

Drei wiederkehrende Tool-Breiten (600, 680, 560) sollten als **eigene Token-Familie** etabliert werden:

```css
/* Vorschlag: tokens.css */
--tool-wrap-narrow:  560px;  /* = --content-width-narrow */
--tool-wrap-medium:  600px;  /* Komm-Trainer, Säulen-Check, Selbsttest */
--tool-wrap-wide:    680px;  /* Phasenverlauf, Solidaritäts-Chart */
```

Dann in `tools.css` die hard-coded Werte durch Tokens ersetzen.

### Dokumentation

Eine `docs/CONTAINER_SYSTEM.md` mit:
- Tabelle der Tokens und Anwendungsregeln
- Decision-Tree „Welcher Container für welche Section"
- Liste der Full-bleed-Ausnahmen

---

## Was NICHT zu tun ist

- **Token-Reduktion 4 → 3 (Audit-Empfehlung)**: Würde alle `--content-width-narrow`-Verwendungen brechen ohne klaren Mehrwert. 4 Stufen funktionieren.
- **Character-basierte Limits in Pixel umwandeln**: Editorisch wichtig für Lesefluss, würde Lesbarkeit verschlechtern.
- **Massive Refactor in einem PR**: Hohe Bruchgefahr. Iterativ pro Cluster.

---

## Phase-C-Diskussionspunkte (Design-Entscheidungen)

### `.quick-triage` Card-Hülle — ✅ erledigt (2026-05-08)

**Status quo (06.05.):** Card mit `background`, `border`, `box-shadow`, `padding xl lg`, eingebettet in 100vw-Banner mit Teal-Tint.

**Audit-Empfehlung:** Card-Hülle entfernen, flach auf Editorial-Wide.

**Tatsächlicher Verlauf:**
1. CSS-Card-Hülle bereits in einer früheren Iteration entfernt (siehe Kommentar `Audit C2 (Container)` in `shared.css`).
2. PR #270/#271 hat die `quick-triage` ganz von der Startseite entfernt — sie lebt jetzt als eigenständiges Werkzeug `/tools/einstiegsfrage/`.
3. Auf der Startseite wurde der frühere Triage-Slot durch eine ruhige `.home-intro`-Sektion ersetzt.

**Stakeholder-Entscheidung:** Implizit dadurch beantwortet — die Triage ist nicht mehr Teil des Startseiten-Flusses, sondern ein optionales Werkzeug. Im Tool-Kontext ist sie flach gerahmt (kein Card-im-Card).

### `.story-section` (Erfahrungsbericht) — ✅ entschieden: zurückhaltend belassen (2026-05-08)

**Status quo:** Full-bleed mit Rosé-Hintergrund, 2-Spalten-Split (Text + Bild), `.story-split` auf `--content-width-wide` (1040px), Bild ~500px breit innerhalb des Grids. Card-Hülle ums Bild bereits entfernt (`Audit D2`-Kommentar in `shared.css`).

**Audit-Empfehlung:** Bild grösser / randabschliessend.

**Stakeholder-Entscheidung (2026-05-08):** Bild bleibt zurückhaltend. Die Rosé-Section ist als emotional-bezogene Pausensektion lesbar; das Bild ordnet sich der Story unter und konkurriert nicht mit dem Werkzeuge-Hero. Keine Vergrösserung auf Werkzeuge-Hero-Niveau, kein Full-bleed-Effekt.

### `.tools-highlight`

Audit-Behauptung: „Eingerückte Card-Hülle". **Faktisch falsch** — `.tools-highlight` hat keine Card-Hülle, ist regulär Editorial-Wide. Kein Refactor nötig.

---

## Zusammenfassung (Stand 2026-05-08)

| Bereich | Status | Erledigt durch |
|---|---|---|
| Token-System | Existiert, funktioniert | — |
| Token-Verwendung | ~51 Vorkommen, breit konsistent | — |
| Character-basierte Limits | Editorisch korrekt | — |
| Magic Numbers (CSS) | ~10 konsolidiert | ✅ #282 |
| Tool-Wrap-Breiten | Tokenisiert (`--tool-wrap-narrow/medium/wide`) | ✅ #282 |
| `.quick-triage` Card-Hülle | Card-Hülle entfernt, Triage als Tool ausgelagert | ✅ Audit C2 + #270/#271 |
| Erfahrungsbericht-Layout | Bild bewusst zurückhaltend | ✅ Stakeholder-Entscheidung |
| Token-Reduktion 4→3 | Nicht empfohlen | — |

**Container-Audit Phase A–D abgeschlossen.**

---

**Erstellt von Claude Code — Phase A der Audit-2.6-Antwort.**
**Aktualisiert 2026-05-08 — Phase B umgesetzt, Phase C/D entschieden.**
