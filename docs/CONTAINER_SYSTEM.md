# Container-System

Referenz für Container-Breiten und Layout-Tokens in BipolarSite. Lebende Doku — bei Änderungen am Token-System bitte mitpflegen.

Begleitendes (historisches) Audit: [`AUDIT_CONTAINER_2026-05-06.md`](./AUDIT_CONTAINER_2026-05-06.md).

## Tokens

Alle Container-Tokens liegen in `src/css/tokens.css` (`:root`). Hartcodierte Pixel-Werte gehören nicht in CSS — wenn ein Container nicht zur Tabelle passt, fehlt entweder ein Token oder es ist ein Komponenten-Maß (siehe „Nicht-Container").

### Editorial-Hierarchie (4 Stufen)

| Token | Wert | Bei ≥ 1728px | Anwendung |
|---|---|---|---|
| `--content-width-narrow` | 560px | — | Schmale Tool-Wraps, einzelne Lese-Spalte |
| `--content-width` | 780px | — | Standard-Lesefluss (~68 Zeichen) |
| `--content-width-wide` | 1040px | 1140px | Module-Hero, breite Prose |
| `--wide-width` | 1200px | 1400px | Editorial-wide (Section-Default), Modul-/Tool-Grids |

### Tool-Wrap-Familie

Spezifische Tool-Layouts (zentriert, fix breit). Eigene Familie, weil sie nicht der Editorial-Logik folgen, sondern Werkzeug-Komposition.

| Token | Wert | Werkzeuge |
|---|---|---|
| `--tool-wrap-narrow` | 560px | Durchatmen, EE-Kreislauf, generisches `.tool-wrap` |
| `--tool-wrap-medium` | 600px | Komm-Trainer, Säulen-Check, Selbsttest |
| `--tool-wrap-wide` | 680px | Phasenverlauf, Solidaritäts-Chart |

`--tool-wrap-narrow` ist mit `--content-width-narrow` wertgleich, semantisch aber tool-spezifisch.

## Globale Container-Regel

In `shared.css`:

```css
#main-content > section,
#main-content > aside {
  max-width: var(--wide-width);
  margin-inline: auto;
  padding-inline: 2rem;
}
```

Jede `<section>`/`<aside>` direkt unter `#main-content` erhält automatisch Editorial-Wide. Innen kann Lesetext via `max-width: var(--content-width)` weiter eingeschränkt werden.

## Decision-Tree: welcher Container?

1. **Volle Browserbreite mit Hintergrundfarbe?** → Full-bleed-Ausnahme (siehe unten). Section bekommt `max-width: none`, der Inner-Wrapper begrenzt auf `--content-width-wide` o.ä.
2. **Modul-/Tool-Grid mit Karten?** → Default (`--wide-width`, 1200px). Nichts tun.
3. **Hero mit prominentem Bild + Text?** → `--content-width-wide` (1040 / 1140px) am Inner-Wrapper.
4. **Reine Lese-Sektion (Fließtext)?** → `--content-width` (780px) auf Text-Container. Bei sehr knappen Lead-Texten zusätzlich `max-width: 56–68ch`.
5. **Schmale, zentrierte Werkzeug-Komposition?** → Eines der `--tool-wrap-*` Tokens nach Inhalt.

**Faustregel:** Editorial → `content-width-*` und `wide-width`. Werkzeuge → `tool-wrap-*`. Keine Pixel.

## Character-basierte Limits (`Nch`)

Lese-Begrenzungen über `max-width: Nch` (≈ N Zeichen) sind **bewusste Praxis**, keine Magic Numbers. Übliche Werte:

- 18–48ch: Lead-Texte, Section-Descriptions, Tool-Headers
- 30–44ch: Card-Beschreibungen
- 58–72ch: Story-Body, Modul-Lese, Hub-Hero-Lead

Nicht auf Pixel-Tokens umstellen — `ch` skaliert mit Schrift und sichert Lesefluss.

## Full-bleed-Ausnahmen

Sections, die die globale `--wide-width`-Regel mit `max-width: none` durchbrechen:

| Selektor | Datei | Zweck |
|---|---|---|
| `#main-content > .story-section` | `shared.css` (Full-bleed-Override-Block) | Erfahrungsbericht mit Rosé-Hintergrund |
| `#main-content > .invitation-section` | dito | Einladungsband mit Akzent-Hintergrund |

Beide haben innen einen begrenzten `.story-split` / `.invitation-inner`-Wrapper auf Editorial-Maß. **Neue Full-bleed-Section heißt: Eintrag in dieser Tabelle.**

Andere `max-width: none`-Vorkommen sind **keine** Full-bleed-Sections, sondern Komponenten-interne Resets (z.B. Hero-Subtitle innerhalb eines bereits begrenzten Hero-Wrappers, Hero-Path-Visualisierung). Diese gehören nicht in diese Tabelle.

## Nicht-Container (komponenten-spezifisch)

Folgende Pixel-Werte sind **keine** Container-Breiten und sollen pixel-basiert bleiben:

- SVG-Container und Visualisierungs-Geometrie (`.cycle-svg-wrap`, EE-Kreislauf-SVG, Säulen-SVG)
- Komponenten-Layout (Button-Gruppen, Modal-Inner, Pillar-Bar)
- Responsive-Sicherungen innerhalb von `@media`-Blöcken

Wenn ein Wert in 2+ Komponenten auftaucht und semantisch eine Container-Breite ist, ist es Zeit für einen Token.

## Ändern

- Werte in `tokens.css` ändern → cascade-weit. Vorher prüfen: welche Sektionen/Tools nutzen den Token?
- Neuer Token: bevorzugt Editorial- oder Tool-Familie erweitern, nicht eine dritte Familie aufmachen.
- Ein-mal-Wert (Komponente, SVG): inline lassen, nicht in Tokens schmuggeln.
