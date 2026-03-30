# UX / Layout Regression Audit – borderline-angehoerige

**Datum:** 2026-03-24  
**Modus:** Audit (kein Redesign)  
**Scope-Fokus:** `/`, `/verstehen`, `/kommunizieren`, `/grenzen`, `/selbstfuersorge`, `/materialien`, `/beratung` (`Fachstelle`), `/faq`

---

## 1) Executive Summary

- Das Layout-System ist insgesamt **stabil und gut standardisiert**: die fokussierten Seiten nutzen wiederholt das Muster `section > .container > .max-w-3xl` für Hero- und Leseblöcke, was eine ruhige Leseführung unterstützt.
- Ein klarer Regression-Befund lag in der **Breitenlogik der globalen Top-Zone**: Header und Notfall-Hinweisleiste nutzten einen breiteren Wrapper als die restliche Seite (früher `max-w-screen-2xl`), während der Rest auf dem globalen `.container` (`max-width: 1280px`) basiert.
- Dieser Defekt war technisch eindeutig (inkonsistente Wrapper-Logik) und wurde als **Minimal-Fix** korrigiert: beide Bereiche verwenden jetzt denselben `.container`-Wrapper.
- Raster, Card-Gaps, Card-Höhen und Section-Struktur sind danach weiterhin konsistent und ohne offensichtliche Grid-Brüche.

---

## 2) Gesamturteil

**Gesamturteil:** **kleinere Layout-Korrekturen empfohlen** (und die wichtigste wurde als Minimal-Fix bereits umgesetzt).

Kein Hinweis auf einen strukturellen Systembruch, aber einzelne Feinjustierungen (v. a. Flächeneffizienz auf großen Desktops in einzelnen Modulen) könnten als separater Task priorisiert werden.

---

## 3) PASS / FAIL pro Bereich

| Bereich            | Status               | Kurzbegründung                                                                                                                    |
| ------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Breitenlogik       | **FAIL → behoben**   | Global inkonsistenter Wrapper in Header/Notfallleiste vs. restlicher Seitencontainer; Minimal-Fix umgesetzt.                      |
| Rasterharmonie     | **PASS**             | Grid-Konfigurationen in Fokusseiten konsistent, keine klaren Spalten-/Row-Brüche.                                                 |
| Box-Ausrichtung    | **PASS**             | Cards/ContentSections sind visuell aus gleicher Fluchtlinie aufgebaut; keine systematischen Offsets sichtbar.                     |
| Section-Konsistenz | **PASS**             | Wiederholtes Hero+Content-Muster (`py-*`, `container`, `max-w-3xl`) stabil über mehrere Seiten.                                   |
| Layout-Systematik  | **PASS mit Hinweis** | Großteils einheitliches Pattern; lokal einzelne Utility-Ausnahmen (z. B. mobile Overflow-Streifen) sind funktional, nicht defekt. |

---

## 4) Priorisierte Befundtabelle

| Prio | Datei / Komponente                                 | Sichtbares Problem                                                                                                         | Technische Ursache                                                                                                | Empfohlene Maßnahme                                                                                                         |
| ---- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| P1   | `components/layout/HeaderNav`, `components/Layout` | Top-Navigation und Hinweisleiste liefen auf Desktop breiter als Hauptinhalt/Footer; vertikale Kanten nicht deckungsgleich. | Inkonsequenter Wrapper (`max-w-screen-2xl` + eigenes `px-*`) statt globalem `.container` mit `max-width: 1280px`. | **Minimal-Fix umgesetzt:** beide Bereiche auf `.container` vereinheitlicht.                                                 |
| P2   | `components/interactive/Schnelleinstieg`           | Auf sehr breiten Screens wirkt der 4er-Kachelblock eher kompakt/zentriert statt flächig.                                   | Zusätzliche Begrenzung `max-w-3xl mx-auto` auf einem ohnehin in `.container` liegenden Grid.                      | Nur bei Wunsch nach höherer Flächennutzung: auf `max-w-4xl/5xl` erweitern oder entfernen (Designentscheidung, kein Defekt). |
| P2   | `pages/Materialien` (Filterleiste)                 | Mobile Filterchips haben bewusstes „edge-to-edge“-Scrollgefühl, kann als leichter Fluchtbruch wahrgenommen werden.         | Kombi `-mx-4 px-4` innerhalb `.container` erzeugt kontrollierten Überstand.                                       | Beibehalten (funktionaler Mobile-Pattern). Nur angleichen, wenn strikt bündige Kanten überall priorisiert werden.           |

---

## 5) Verantwortliche Container / Wrapper / Utility-Klassen

### Primär verantwortlich (systemisch)

- `.container` (globales Layout-Fundament, inkl. `max-width: 1280px` ab `lg`)
- `max-w-3xl` / `mx-auto` (Lesebreite in Inhaltsseiten)
- `grid grid-cols-*` + `gap-*` (Kachel-/Card-Raster)

### Relevante Auslöser für den gefundenen Defekt

- (vor Fix) `max-w-screen-2xl` + `px-4 sm:px-6 lg:px-10` in Top-Wrappern

### Lokale Utilities mit Layout-Effekt

- `-mx-4 px-4 md:mx-0 md:px-0` (horizontale Chip-Scroller auf Mobile)
- `sm:col-span-2` bei hervorgehobenen ersten Kacheln in Gallery-/Card-Grids

---

## 6) Punkte, die gestalterisch auffallen, aber technisch nicht defekt sind

1. Enge Lesespalten (`max-w-3xl`) auf mehreren Inhaltsseiten wirken editorial und ruhig; das ist eher UX-Tonality als Layoutfehler.
2. Dynamische `col-span`-Hervorhebung erster Karten in manchen Grids erzeugt bewusst Hierarchie (kann asymmetrisch wirken, ist aber funktional konsistent).
3. Sticky-Filter in `/materialien` priorisiert mobile Nutzbarkeit vor strikter Grid-Kantenreinheit.

---

## 7) Klare Empfehlung für den nächsten Schritt

**Empfehlung:** **nur kleine Korrekturen nötig.**

Die zentrale technische Inkonsistenz in der Breitenlogik wurde bereits minimal behoben. Falls weitere Optimierung gewünscht ist, sollte ein kleiner, gezielter Folge-Task auf Flächeneffizienz (nicht auf Redesign) fokussieren.

---

## Explizite Abschlussbewertung (angefordert)

- **Verfügbare Desktop-Breite:** Wird nach dem Minimal-Fix insgesamt ausreichend und konsistent genutzt; keine systematische Unterausnutzung durch konkurrierende Haupt-Wrapper mehr.
- **Boxen/Cards im Raster:** Überwiegend harmonisch eingebunden; keine klaren technischen Grid-Defekte in den Fokusseiten.
- **Optische Ruhe/Konsistenz:** Insgesamt ruhig und konsistent, v. a. durch wiederkehrende Section-Muster und einheitliche Lesebreiten.

### 3–5 Korrekturen mit größtem sichtbaren Effekt

1. (**bereits umgesetzt**) Top-Wrapper vollständig auf `.container` harmonisieren (Header + Hinweisleiste).
2. `Schnelleinstieg`-Block-Breite auf großen Desktops optional leicht erhöhen (`max-w-4xl/5xl`) für mehr Flächeneffizienz.
3. Optionales Review der `sm:col-span-2`-Hero-Karten in gemischten Grids (nur falls strengere Symmetrie gewünscht ist).
4. Optional: Mobile Filterleisten-Kanten (`-mx-4`) projektweit vereinheitlichen oder bewusst als Pattern dokumentieren.
