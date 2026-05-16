# WeasyPrint-Invarianten für Querformat-Handouts

Vier Konstruktionsregeln. Jede entspricht einem real aufgetretenen Fehler.
Sie sind nicht stilistisch, sondern verhindern konkrete Render-Bugs.

---

## Invariante 1 — Layout-Tabelle mit fester mm-Breite, kein border-spacing

**Falsch (verursachte den 5. und schwersten Bug):**

```css
table.main-grid {
  width: 100%;
  border-collapse: separate;
  border-spacing: 5mm 0;          /* ← Falle */
  margin: 4mm -2.5mm 3.5mm -2.5mm; /* ← Falle */
  table-layout: fixed;
}
td.col-left   { width: 70mm; }
td.col-center { width: 116mm; }
td.col-right  { width: 75mm; }
```

`border-spacing` bei `border-collapse: separate` legt WeasyPrint **auch an
die beiden Tabellen-Aussenkanten** an, nicht nur zwischen die Spalten. Die
Tabelle wird dadurch breiter als die deklarierte Spaltensumme. Zusammen mit
den negativen Margins schob das die rechte Spalte 5 mm in den weissen
Seitenrand. Visuell sah die überlaufende Sand-Hintergrundkante wie eine
eigenständige vertikale «Geisterlinie» aus — was zu vier Fehldiagnosen führte
(Badge-Abstand, Tabellenüberlauf, Zellgrenze), bis eine PDF-Messung die wahre
Ursache zeigte.

**Richtig:**

```css
table.main-grid {
  width: 269mm;               /* feste Breite = bedruckbare Inhaltsbreite */
  border-collapse: collapse;
  border-spacing: 0;
  margin: 4mm 0 3.5mm 0;
  table-layout: fixed;
}
td.col-left   { width: 70.5mm; padding-right: 2.5mm; }
td.col-center { width: 121mm;  padding-left: 2.5mm; padding-right: 2.5mm; }
td.col-right  { width: 77.5mm; padding-left: 2.5mm; }
/* 70.5 + 121 + 77.5 = 269 (Padding ist bei collapse+fixed in der
   Spaltenbreite enthalten). Netto-Textbreiten: 68 / 116 / 75 mm. */
```

Spaltenabstände kommen aus Zell-`padding`, nicht aus `border-spacing`.
Dann ist die Tabellenbreite exakt die Summe der Spalten — nichts, was der
Renderer unsichtbar dazurechnet.

---

## Invariante 2 — Breitenarithmetik muss exakt aufgehen

A4 quer = 297 mm breit. Bei 14 mm Rand links und rechts:
**bedruckbare Inhaltsbreite = 297 − 28 = 269 mm.**

Die Summe aller Spaltenbreiten **inklusive Zell-Padding** muss exakt 269 mm
ergeben. Nicht ungefähr, nicht «passt schon» — nachrechnen, im Zweifel mit
einem Dreizeiler in Python. Eine 2-mm-Differenz, die irgendwo fehlt, holt
sich der Renderer aus der schwächsten Spalte, und genau deren Text läuft dann
über.

Vertikal analog: 210 mm hoch, 14 mm Rand → 182 mm nutzbar. Selten das
Problem, aber dieselbe Logik.

---

## Invariante 3 — SVG-Farben als inline-Attribute

WeasyPrints SVG-Renderer wendet CSS-Klassen-Styles auf SVG-Elemente
**unzuverlässig** an. Im ersten Render wurden alle Stationskreise solid
schwarz, obwohl `.station-bg { fill: #FAF4E7; }` definiert war.

**Falsch:**
```html
<style> svg .station-bg { fill:#FAF4E7; stroke:#4A2E44; } </style>
<circle class="station-bg" cx="240" cy="55" r="50"/>
```

**Richtig:**
```html
<circle cx="240" cy="55" r="50" fill="#FAF4E7" stroke="#4A2E44"
        stroke-width="1.3"/>
```

`scripts/diagram_geometry.py` emittiert grundsätzlich inline-Attribute. Wenn
SVG von Hand ergänzt wird: jede Farbe direkt ans Element.

---

## Invariante 4 — Kein Grid, kein @import, Mini-Layouts als Flex nicht Tabelle

Drei separate WeasyPrint-Hänger/Bugs, dieselbe Lehre — die simpelste robuste
Konstruktion gewinnt:

1. **`@import` von Google Fonts hängt den Render** (Netzwerk-Wartezeit bis
   Timeout). Schriften über System-Stack einbinden
   (`'DejaVu Serif', Georgia, serif` / `'Liberation Sans', Arial,
   sans-serif`), oder lokal via `@font-face` mit Dateipfad. Nie remote
   `@import`.

2. **CSS Grid + verschachtelte Flex-Container mit `height:100%`+`flex:1`
   bringen die Layout-Engine zum Hängen** — auch ganz ohne SVG. Mehrspaltiges
   Seitenlayout = **eine** Tabelle mit `table-layout: fixed` (siehe
   Invariante 1).

3. **Badge + Titel nebeneinander: ein Flex-Div, niemals eine Mini-Tabelle.**
   Drei gleich breite Mini-Tabellen mit `table-layout: fixed` erzeugen je
   eine Zellgrenze an identischer x-Position; übereinander gelesen addieren
   sie sich zu einer scheinbar durchgehenden vertikalen Linie. Lösung:

```css
.head { display: flex; align-items: center; margin-bottom: 1mm; }
.head .num   { flex: 0 0 5.4mm; width:5.4mm; height:5.4mm;
               border-radius:50%; text-align:center; line-height:5.4mm;
               margin-right: 3.2mm; }
.head .title { flex: 1 1 auto; overflow-wrap: break-word; }
```

---

## Fehler-Historie (warum dieser Skill existiert)

Ein einziger Bug — Text über die rechte Seitenkante — fünf Iterationen:

1. Als zu kleiner Badge-Abstand gedeutet → Padding erhöht. Falsch.
2. Als Tabellenüberlauf gedeutet → `table-layout:fixed`+`width:100%` auf die
   Kopfzeilen-Mini-Tabelle. Falsch (führte zu Bug 3).
3. Als Zellgrenzen-«Geisterlinie» gedeutet → Mini-Tabelle zu Flex
   umgebaut. Behob die Linie, aber nicht den Überlauf.
4. Als Spaltenarithmetik-Differenz gedeutet → Spaltenbreiten angepasst,
   aber border-spacing-Modell blieb. Falsch.
5. **PDF mit pdfplumber vermessen** → rechte Spalte bei 288 mm, Grenze bei
   283 mm. Ursache eindeutig: border-spacing an den Aussenkanten. Behoben
   durch Invariante 1.

Lehre, codiert in `verify_pdf.py`: Verifikation muss gemessen sein.
«Sieht behoben aus» ist keine Verifikation. Bei einem Symptom, das nach
mehreren lokalen Fixes wiederkehrt, sitzt die Ursache eine Ebene tiefer als
die sichtbare Stelle — fast immer in der Container-Arithmetik.

---

## Invariante 5 — SVG-`<text>` rendert `\n` NICHT als Zeilenumbruch

**Falsch (real selbst eingebaut):**

```python
PILLARS=["Verstehen", "krankheitsfreie\nMomente", "Last fair\nverteilen", ...]
# -> generator schreibt:  <text ...>krankheitsfreie\nMomente</text>
```

In SVG erzeugt ein `\n` (oder `<br>`) innerhalb eines `<text>`-Elements
**keinen** Zeilenumbruch. WeasyPrint rendert das Zeichen je nach Fall als
Leerzeichen oder gar nicht — das Wort steht einzeilig und ggf. zu lang am
Anker, statt umzubrechen. Mehrzeiliger SVG-Text braucht explizite
`<tspan x=… dy=…>`-Segmente mit eigener Position relativ zum Dreh-/
Textanker.

**Richtig:** Im gedrehten Säulen-/Beschriftungstext nur einzeilige Begriffe
verwenden. Lange Begriffe NICHT im Diagramm umbrechen, sondern in einen
danebenstehenden Textblock/Box auslagern (Arbeitsteilung Bild ↔ Text).
Mehrzeilen-tspan nur einführen, wenn unvermeidbar — dann jeden tspan
einzeln gegen den Dreh-Anker rechnen (Drehpunkt = Textanker, sonst
schwingt das Segment weg, vgl. Geometrie-Referenz).

Diese Fehlerklasse fällt durch ALLE automatischen Gates: Bounding-Check
(Geometrie ok), Mess-Gate (nichts überläuft), Textextraktion (Wort ist ja
da). Nur Code-Review des Generators VOR dem Render oder die visuelle
Gegenprüfung fangen sie. Lehre: bei jeder Generator-Textänderung zuerst
prüfen, WIE der Generator Text rendert, bevor die Änderung als erledigt
gilt.
