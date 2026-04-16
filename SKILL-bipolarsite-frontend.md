---
name: bipolarsite-frontend
description: Frontend-Gestaltungsrichtlinien für BipolarSite — eine medizinische Psychoedukations-Website für Angehörige bipolarer Störungen. Verwende diesen Skill bei Änderungen an Layout, Komponenten, CSS, Templates oder visuellen Elementen der Site.
---

Dieser Skill leitet die Frontend-Gestaltung der BipolarSite — einer Eleventy/Nunjucks-Website zur Psychoedukation für Angehörige von Menschen mit bipolarer Störung (PUK Zürich). Die Zielgruppe sind Menschen in Belastungssituationen. Jede gestalterische Entscheidung muss dem dienen.

## Design-Haltung: «Luftig warm-editorial»

Bevor du Code schreibst, vergegenwärtige dir die drei Leitprinzipien:

1. **Ruhe vor Wirkung.** Die Nutzer*innen befinden sich häufig in Krisensituationen oder chronischer Erschöpfung. Jedes Element, das Aufmerksamkeit verlangt, muss diese Aufmerksamkeit verdienen. Im Zweifel: weglassen.
2. **Wärme vor Neutralität.** Klinische Kühle erzeugt Distanz. Die Palette, Typografie und Tonalität transportieren: «Hier dürfen Sie sein, wie Sie gerade sind.»
3. **Verlässlichkeit vor Überraschung.** Vorhersehbare Strukturen entlasten kognitiv. Konsistenz ist kein Mangel an Kreativität — sie ist Fürsorge.

**KRITISCH**: Dieses Projekt ist keine Portfolio-Arbeit, kein SaaS-Dashboard, kein Marketing-Onepager. Es ist ein therapeutisches Werkzeug. «Beeindruckend» bedeutet hier: jemand in einer Krise findet in 3 Sekunden, was er braucht, und fühlt sich dabei nicht überfordert.

## Farbsystem (tokens.css)

Drei Temperaturpole, strikt über CSS Custom Properties gesteuert:

| Pol | Zweck | Leitfarbe | Anwendung |
|---|---|---|---|
| Warm-Neutral | Struktur, Text, Orientierung | `--navy` (#7a6f66), `--slate`, `--sand` | Headings, Body, Badges, Hintergründe |
| Teal (transparent) | Aktion, Tools, CTAs | `--teal-cta` (#287f87) | Buttons, Links, Fortschrittsanzeigen |
| Rosé | Emotion, Reflexion, sanfte Aufmerksamkeit | `--rose-text` (#8A504B) | Reflexionsblöcke, Zitate, emotionale Marker |

**Transparenz-Prinzip**: Farben werden über Opacity-Stufen gesteuert (`--teal-faint` → `--teal-subtle` → `--teal-muted` → `--teal` → `--teal-dark`), nicht durch neue Hex-Werte. Das hält die Palette leicht.

**Regeln**:
- Neue Farben: NIE direkt als Hex in Komponenten. Immer erst als Token in `tokens.css` definieren.
- Kontraste: Jede Text-Hintergrund-Kombination muss WCAG AA bestehen (≥ 4.5:1 für normalen Text, ≥ 3:1 für grossen Text). Kontrastverhältnisse als Kommentar dokumentieren.
- Alert-Rot (`--alert`, #B91C1C): Nur für echte Gefahrensituationen (Suizid, Psychose, Gewalt). Nie als Deko.

## Typografie

| Rolle | Font | Grössen-Tokens | Gewicht |
|---|---|---|---|
| Body, UI, Buttons | DM Sans | `--text-xs` bis `--text-base` | 400 (Body), 600 (Emphasis), 700 (Buttons) |
| Headings, Zitate | DM Serif Display | `--text-lg` bis `--text-2xl` | 400 |

**Regeln**:
- Zeilenhöhe Body: 1.75 (grosszügig — Lesbarkeit bei langen Texten).
- Keine weiteren Fonts ohne guten Grund einführen. Die Paarung DM Sans / DM Serif Display ist bewusst gewählt.
- `font-size` immer über Tokens, nie als direkte rem/px-Angabe.

## Spacing & Layout

Das Token-System definiert eine Spacing-Skala. **Verwende sie.**

- `--space-sm` (8px), `--space-base` (12px), `--space-md` (16px), `--space-lg` (24px), `--space-xl` (32px), `--space-2xl` (48px)
- Hardcodierte Pixelwerte (z.B. `padding: 10px 20px`) sind technische Schuld. Ersetze sie durch Token-Referenzen.
- Sektionen: `--section-tight`, `--section-standard`, `--section-wide` für vertikale Abstände.
- Max-Breiten: `--content-width` (Fliesstext), `--wide-width` (Layout-Container).

## Komponenten-Hierarchie

### Button-System (4 Stufen)
Definiert in `shared.css` als BUTTON SYSTEM Block:

1. **Primary** (`--cta-primary-bg` teal, weiss Text): `.cta-primary`, `.btn-c`, `.btn-cont`, `.btn-next`, `.btn-save`
2. **Secondary** (`--cta-secondary-bg` weiss, Border): `.cta-secondary`, `.btn-r`, `.btn-back`, `.btn-print`, `.triage-btn`
3. **Danger** (`--cta-danger-*` rot): `.cta-danger`, `.btn-reset`
4. **Tertiary** (Text-Link): `.cta-tertiary`

Gemeinsame Basis: `font-family`, `font-size` (`--cta-font-size`), `padding` (`--cta-padding`), `border-radius` (`--cta-radius`), `min-height` (`--cta-min-height`: 44px — WCAG Touch-Target).

**Neuen Button-Typ einführen**: Immer prüfen, ob er in eine bestehende Stufe passt. Nur wenn nein: neue Variante mit Token-basiertem Styling.

### Breadcrumbs
Eine einheitliche `.breadcrumb`-Klasse für alle Seitentypen. Separatoren: `<span class="sep" aria-hidden="true">›</span>`. Module.css überschreibt für dunkle Hero-Hintergründe.

### Karten
Schatten-Strategie: Kein Schatten im Ruhezustand, `--card-shadow-hover` bei Hover. Karten sind flach-editorial, nicht «schwebend».

### Collapsible-Sektionen
Pattern: `<details class="hub-details">` mit `<summary>` (kicker, title, intro) und `<div class="hub-details-body">`. Keine `reveal`-Klasse innerhalb von `<details>`.

## Barrierefreiheit (nicht optional)

- **Skip-Link**: Vorhanden in `base.njk`. Nicht entfernen.
- **ARIA**: `aria-label` auf nav, TOC, interaktiven Sektionen. `aria-expanded` auf allen Toggle-Buttons. `aria-live="polite"` auf dynamischen Ergebnissen.
- **Fokus**: `*:focus-visible` mit 2px teal Outline. Auf dunklen Hintergründen hellere Variante verwenden.
- **Reduced Motion**: Alle Animationen hinter `prefers-reduced-motion` prüfen. IntersectionObserver-Reveals fügen sofort `revealed` hinzu wenn Nutzer reduzierte Bewegung bevorzugt.
- **Touch-Targets**: Mindestens 44×44px für alle interaktiven Elemente.
- **Semantisches HTML**: `<nav>`, `<main>`, `<aside>`, `<details>`, `<dialog>` — keine div-Suppen.

## Animation & Bewegung

**Maxime: Weniger ist mehr.**

- IntersectionObserver-basierte Reveals (`.reveal` → `.revealed`): dezentes Einblenden, kein Springen.
- Transition-Dauer: 0.2–0.3s. Nie länger als 0.4s.
- Keine Bibliotheken (kein GSAP, kein Framer Motion). CSS-Transitions und native Web APIs genügen.
- Keine horizontalen Marquees, kein Parallax, keine pinned Sections.
- Atemübung (Durchatmen-Tool) ist die einzige Stelle mit aufwändigerer CSS-Animation.

## CSS-Architektur

| Datei | Verantwortung |
|---|---|
| `tokens.css` | Variablen — keine Selektoren, keine Regeln |
| `shared.css` | Layout, Navigation, Footer, Karten, Buttons, Homepage-Sektionen |
| `module.css` | Modul-Hero, TOC, Phasen-Tabs, Akkordeons, Quellen, Content-Typografie |
| `tools.css` | Werkzeug-spezifische Styles (Krisenplan, Selbsttest, etc.) |
| `print.css` | Druck-Overrides |

**Regeln**:
- Keine `!important`-Deklarationen (Ausnahme: Print-CSS).
- Neue Styles gehören in die thematisch passende Datei, nicht ans Ende von shared.css.
- Minifizierter CSS-Code im Repo: nein. Lesbar formatieren.
- Kommentare: `/* ── Abschnittstitel ── */` für Sektionen, Inline-Kommentare für Kontrast-Ratios und Begründungen.

## Notfall-Kontext

Die Notfall-Seite (`/notfall/`) und das SOS-Element in der Navigation sind der wichtigste Touchpoint in akuten Krisen.

- Alert-Rot nur hier und in Notfall-Querverweisen.
- Nav-Logo-Hintergrund wechselt auf `var(--alert)` auf der Notfall-Seite.
- Telefonnummern als `tel:`-Links. Immer klickbar.
- Keine Animationen auf der Notfall-Seite — Information sofort sichtbar.

## Bevor du Code schreibst

1. **Welche CSS-Datei?** Token → tokens.css. Layout/Nav → shared.css. Modul-Content → module.css. Tool → tools.css.
2. **Gibt es schon ein Pattern?** Prüfe bestehende Klassen. Kein Duplikat-CSS.
3. **Tokens statt Hardcode?** Farben, Spacing, Radien, Schatten — immer über Variablen.
4. **Kontrast geprüft?** Jede neue Text-Hintergrund-Kombination gegen WCAG AA prüfen.
5. **Mobile getestet?** Breakpoints: 600px (Mobile), 768px (TOC), 900px (Nav), 1100px (TOC-Sidebar).
6. **Reduced Motion?** Neue Animationen hinter Media-Query.
