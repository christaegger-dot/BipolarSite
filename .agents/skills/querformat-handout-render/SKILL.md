---
name: querformat-handout-render
description: >
  Technische Umsetzung und WeasyPrint-Rendering eines A4-Querformat-Handouts
  — einseitig ODER bewusst komponiert zweiseitig (je nach gemessenem
  Höhenbudget) — mit mehrspaltigem Layout und/oder berechneter Diagramm-
  Geometrie (Kreislauf, Pfad, Struktur). Eng auf genau diesen Dokumenttyp
  begrenzt. Use this skill nur wenn ein Fachstelle-Querformat-Handout (quer,
  ein- oder bewusst zweiseitig)
  technisch in HTML/CSS/SVG gebaut, nach WeasyPrint exportiert, oder ein
  Layout-Bug darin behoben wird — Spaltenüberlauf, Text über die Seitenkante,
  vertikale «Geisterlinien», SVG-Kreise die schwarz statt gefüllt rendern,
  hängender Render bei einem solchen Handout. Trigger auch bei «der Text
  läuft über die Kante», «rechts über den Rand», «render dieses Handout als
  PDF», oder einem Foto eines fehlerhaften Querformat-Handout-PDFs. NICHT
  für: mehrseitige Hochkant-Fliesstext-PDFs (html-to-print-pdf), generische
  «als PDF»-Anfragen ohne Querformat-Handout-Kontext, Canva-Handouts
  (canva-handout-creator), inhaltlich-editoriale oder Visualisierungs-Wahl-
  Fragen (fachstelle-handout). Im Zweifel nicht triggern.
---

# Querformat-Handout — Technische Umsetzung & Rendering

Skill für den Bau eines A4-Querformat-Handouts (einseitig oder bewusst
komponiert zweiseitig) der Fachstelle
Angehörigenarbeit PUK Zürich. Die *generische* Visualisierungs-Wahl
(Metapher vs. Strukturdiagramm vs. Inhalts-Block) und die Editorial-Policy
kommen aus `fachstelle-handout`. Dieser Skill übernimmt, sobald dort
«Struktur-/Pfad-Diagramm» gewonnen hat — und zwar nicht erst beim Rendern,
sondern bereits bei der *Konstruktionslogik*: Aus dem erkannten Mechanismus
die konkrete Kreislauf-Form ableiten (Stationszahl, Lernschritt, Ausstiege,
Querformat-Begründung), DANN technisch sauber umsetzen und mess-verifizieren.

Die didaktische Ableitung ist nicht optional und nicht «schon erledigt». Ein
technisch perfekt gerendertes Diagramm mit der falschen Stationszahl ist
wertlos. Reihenfolge ist daher: erst Reasoning (Schritt 0), dann Bau, dann
Mess-Gate.

---

## Die wichtigste Lehre zuerst: messen, nicht schauen

Diese Lehre steht an erster Stelle, weil ihr Fehlen einmal **fünf
Fehlversuche** an einem einzigen Layout-Bug verursacht hat. Der Bug war immer
derselbe (Text lief über die rechte Seitenkante), wurde aber viermal falsch
diagnostiziert, weil die Verifikation **visuell** statt **gemessen** war: Das
gerenderte Vorschaubild täuschte, weil eine überlaufende Hintergrundkante wie
eine eigenständige Linie aussah.

**Regel: «Behoben» darf nie auf Augenschein beruhen. Ein Layout gilt erst dann
als korrekt, wenn `scripts/verify_pdf.py` mit Exit-Code 0 durchläuft.** Das
Skript misst die echten Box- und Wort-Koordinaten im fertigen PDF und prüft
sie per `assert` gegen die bedruckbare Seitengrenze. Es ist nicht möglich,
einen Überlauf zu «übersehen», wenn das Skript Teil des Workflows ist.

Reihenfolge bei JEDEM Render und JEDER Bugfix-Iteration:

1. HTML bauen/ändern
2. Nach PDF rendern (`scripts/render.py`)
3. **`scripts/verify_pdf.py` laufen lassen — Exit-Code 0 ist Pflicht**
4. Erst danach visuell gegenprüfen (Vorschau-PNG), nie umgekehrt
5. Erst dann dem User «behoben» melden — und die Messzahl mitnennen

### Zweite Kernlehre: nach dem ersten Fehlschlag isolieren, nicht raten

Diese Lehre steht direkt hinter der ersten, weil ihr Fehlen einmal **vier
aufeinanderfolgende Fehlversuche** an einem Seitenüberlauf verursacht hat.
Jeder Versuch beruhte auf einer *vermuteten* Ursache (Diagramm zu gross,
Abstand zu weit, Element zu hoch); keine Vermutung war belegt, alle vier
schlugen fehl.

**Regel: Schlägt ein Korrekturversuch fehl, wird KEIN zweiter geraten. Statt
dessen wird die Ursache systematisch isoliert.** Methode bei Seitenüberlauf:
aus einer Testkopie je genau EINEN Block entfernen, rendern, Seitenzahl
messen. Der Block, dessen Entfernung das Problem verschwinden lässt, *ist* die
belegte Ursache — kein Schätzwert mehr. Konkret:

```python
import subprocess, pdfplumber, re
base = open('handout.html').read()
def seiten(html, tag):
    f=f'/tmp/_t_{tag}.html'; open(f,'w').write(html)
    subprocess.run(['python3','scripts/render.py',f,f[:-5]+'.pdf'],
                    capture_output=True)
    with pdfplumber.open(f[:-5]+'.pdf') as p: return len(p.pages)
# je einen Block per Regex entfernen, seiten() vergleichen mit Referenz
```

Erst wenn die Ursache so belegt ist, wird ein gezielter Eingriff gemacht —
und dessen Wirkung wird **erneut gemessen**, nicht angenommen. «Investierte
Mühe» und «der Eingriff klingt plausibel» sind keine Belege. Nur die nach dem
Eingriff neu gemessene Zahl ist einer.



### Dritte Kernlehre: auch die Prüfung selbst kann täuschen

Bei der Konsolidierung dieses Skills schlug die eigene Verifikation
zweimal Fehlalarm — eine zeilenweise grep-Suche meldete Defekte, die
keine waren (gesuchte Zeichenkette durch Zeilenumbruch getrennt, im
historischen Block bzw. im umbrochenen f-String). Dieselbe Artefakt-
Klasse wie die Spaltenvermischung bei pdfplumber-Textextraktion.

**Regel: Ein von einer Prüfung gemeldetes Problem wird weder blind
geglaubt noch blind abgetan, sondern an der Quelle inspiziert.** Erst
die Inspektion entscheidet, ob es ein echter Defekt oder ein Artefakt
der Prüfmethode ist. Das gilt rekursiv: Mess-Gate, Textextraktion,
Seitenzahl-Check UND die grep/Skript-Prüfungen, mit denen man den Skill
selbst kontrolliert. Wer einen Prüf-Fehlalarm ungeprüft "behebt",
zerstört Korrektes.

---

## Workflow

### Schritt 0 — Didaktisches Reasoning (zuerst, bestimmt alles Weitere)

Bevor irgendetwas gebaut wird: `references/didaktisches-reasoning.md` lesen
und die Ableitung für *dieses* Thema durchführen. Konkret beantworten:

- Ist der Hauptpunkt Häufigkeit oder Mechanismus? (Nur bei Mechanismus ist
  ein Kreislauf richtig — sonst zurück zur fachstelle-Taxonomie.)
- Wie viele unterscheidbare Phasen hat *dieser* Mechanismus? Ist die
  Verstärkung als implizite Konsequenz versteckt? Wenn ja → eigene Station.
- Welche Phasen haben einen realistischen Interventionshebel? Nur die
  bekommen einen Ausstieg.
- Sind die Lesephasen parallel (→ Querformat) oder sequenziell (→ Hochkant)?

Das Ergebnis dieser Ableitung sind die Parameter, mit denen Schritt 2 die
Geometrie rechnet. Wer Schritt 0 überspringt, baut ein technisch sauberes
Diagramm mit der falschen Struktur — der teuerste Fehler überhaupt, weil das
Mess-Gate ihn NICHT fängt (es prüft Geometrie, nicht Didaktik).

### Schritt 1 — Voraussetzungen

```bash
pip install weasyprint pdfplumber --break-system-packages -q
# pdftoppm (poppler-utils) ist für die PNG-Vorschau meist schon vorhanden
```

### Schritt 2 — Geometrie aus dem Reasoning berechnen

Diagramm-Koordinaten niemals im Kopf schätzen und niemals direkt ins SVG
tippen. Immer mit `scripts/diagram_geometry.py --type <cycle|sequence|
pyramid|spannungsfeld|erosion|waage|erosion_hybrid>` rechnen — gefüttert mit den Parametern aus Schritt 0 (beim Zyklus:
`STATIONS` = die abgeleiteten Phasen, `EXIT_AT` = die Phasen mit Hebel). Das Skript liefert exakt platzierte Stationen,
Pfeile mit sauberem Kreisrand-Abstand und farb-gekoppelte Ausstiegs-Badges,
plus eine Bounding-Box-Prüfung gegen die viewBox. Details und Parameter:
`references/diagram-geometry.md`.

### Schritt 3 — HTML nach den WeasyPrint-Invarianten bauen

Es gibt vier Konstruktionsregeln, deren Verletzung je einen der fünf
historischen Fehler verursacht hat. Sie sind nicht optional. Volle
Begründung und Code: `references/weasyprint-invariants.md`. Kurzfassung:

- **Layout-Tabelle: feste Breite in mm, `border-collapse: collapse`,
  `border-spacing: 0`.** Spaltenabstände als Zell-`padding`, nicht als
  `border-spacing` (das legt WeasyPrint auch an die Tabellen-Aussenkanten
  → Tabelle wird breiter als die Seite → rechte Spalte läuft über).
- **Spaltenbreiten-Arithmetik muss exakt aufgehen:** Summe aller
  Spaltenbreiten (inkl. Padding) == bedruckbare Inhaltsbreite. Bei A4 quer
  mit 14 mm Rand: 297 − 28 = **269 mm**. Nachrechnen, nicht annehmen.
- **SVG-Farben als inline `fill`/`stroke`-Attribute**, nie nur als
  CSS-Klasse — WeasyPrints SVG-Renderer ignoriert Klassen-Styles
  unzuverlässig (Kreise werden sonst solid schwarz).
- **Kein CSS Grid, keine verschachtelten Flex-Container mit
  `height:100%`+`flex:1`, kein `@import` von Google Fonts** (Netzwerk-Hang).
  Mehrspaltig = eine Tabelle mit `table-layout: fixed`. Badge+Titel
  nebeneinander = ein Flex-Div, nie eine Mini-Tabelle (Zellgrenzen über
  mehrere gleich breite Tabellen addieren sich zur «Geisterlinie»).

### Schritt 4 — Rendern

```bash
python3 scripts/render.py <input.html> <output.pdf>
```

### Schritt 5 — Verifizieren (Pflicht, nicht optional)

```bash
python3 scripts/verify_pdf.py <output.pdf> \
  --margin-top-mm 14 --margin-right-mm 14 \
  --margin-bottom-mm 14 --margin-left-mm 14
```

**Verbindlicher Standard dieses Skills: symmetrische 14-mm-Ränder.**
`@page { size: A4 landscape; margin: 14mm 14mm 14mm 14mm; }`
Daraus folgt eindeutig und überall im Skill identisch:

- Nutzbare Höhe Querformat: 210 − 14 − 14 = **182 mm**
- Nutzbare Breite Querformat: 297 − 14 − 14 = **269 mm**

Die Margin-Werte im verify-Aufruf müssen exakt diesem `@page`-Wert
entsprechen. Symmetrische Ränder reduzieren Fehlannahmen (oben = unten =
links = rechts), sind strenger als asymmetrische (mehr Sicherheitsreserve)
und halten alle Mess-Schlussfolgerungen dieses Skills konsistent auf einer
einzigen Zahlenbasis. Falsche Margin-Annahmen erzeugen Fehlalarme.

> Historisch (NICHT mehr Standard, nur zur Einordnung alter PDFs): frühe
> Handouts nutzten asymmetrisch `12mm 14mm 11mm 14mm` (= 187 mm Höhe).
> Diese Variante darf nicht mehr als Standard verwendet werden.
Exit-Code 0 = alle Boxen und Wörter innerhalb der bedruckbaren Fläche.
Exit-Code 1 = Überlauf, mit genauer mm-Angabe welche Box/welches Wort wo.
**Bei Exit-Code 1: zurück zu Schritt 3 (HTML/Layout, Spaltenarithmetik
zuerst), nicht «sieht trotzdem ok aus».**

**Blinde Stelle des Mess-Gates — zwingend mitprüfen.** `verify_pdf.py`
prüft, ob *Sichtbares über die Kante ragt*. Es prüft NICHT, ob ein
Element *ganz vom Blatt gefallen* ist. Wenn der Inhalt zu hoch wird,
rendert WeasyPrint die unterste(n) Zeile(n) schlicht nicht — und das
Gate meldet trotzdem PASS, weil nichts überläuft. Real passiert: nach
einer vertikalen Streckung fiel der komplette Footer (inkl. Quellen)
unbemerkt aus dem PDF, Gate sagte PASS. Darum bei jedem Handout mit
Footer/Quellen/Pflichtangaben zusätzlich per Textextraktion prüfen,
dass die Pflichtinhalte *wirklich im PDF stehen*:

```python
import pdfplumber
with pdfplumber.open("<output.pdf>") as pdf:
    txt = " ".join(w["text"] for w in pdf.pages[0].extract_words())
for kw in ["Quellen", "Fachstelle", "<jede Pflicht-Quelle>"]:
    assert kw in txt, f"FEHLT im PDF: {kw}"
```

Wiederkehrt das Fehlen nach mehreren lokalen Abstands-Fixes → Ursache
ist strukturell (Element passt nicht ins Höhenbudget), nicht lokal.
Dann die Struktur ändern (z. B. dreizeiligen Footer auf zwei Zeilen
verdichten), nicht weiter Millimeter trimmen.

**Zweite blinde Stelle des Mess-Gates — Seitenzahl-Kontrolle (Pflicht).**
Das Gate prüft pro Seite, ob etwas über die Ränder ragt. Es prüft NICHT,
wie viele Seiten das PDF hat. Ein einseitig konzipiertes Blatt, das auf
zwei Seiten überläuft, besteht das Gate mit PASS — auf der zweiten Seite
ragt ja nichts über die Ränder. Real passiert: ein Blatt lief mehrfach
auf 2 bzw. 3 Seiten, Gate sagte jedes Mal PASS. **Darum ist die
Seitenzahl eine eigene Prüfstufe VOR dem Mess-Gate, mit explizit
benannter Soll-Zahl:**

```python
import pdfplumber
SOLL = 1   # oder 2 bei bewusst komponiertem Zweiseiter
with pdfplumber.open("<output.pdf>") as pdf:
    n = len(pdf.pages)
assert n == SOLL, f"SEITENZAHL: {n}, erwartet {SOLL}"
```

**Dritte blinde Stelle — inhaltliche Zuordnungskontrolle (Pflicht bei
≥2 Seiten).** Bei einem bewusst mehrseitigen Blatt genügt die richtige
Seitenzahl nicht: Der richtige Block muss auf der richtigen Seite
liegen. Ein Zweiseiter mit Quellen auf Seite 1 und Diagramm auf Seite 2
besteht Seitenzahl- UND Mess-Gate und ist trotzdem falsch. Darum pro
Seite per Textextraktion prüfen, dass die für sie vorgesehenen Blöcke
dort stehen UND die der anderen Seite NICHT:

```python
with pdfplumber.open("<output.pdf>") as pdf:
    s1 = pdf.pages[0].extract_text() or ""
    s2 = pdf.pages[1].extract_text() or ""
assert "<Seite-1-Kernbegriff>" in s1 and "<Quelle-DOI>" not in s1
assert "<Seite-2-Kernbegriff>" in s2 and "<Quelle-DOI>" in s2
```

### Mehrseitige & platzkritische Blätter: erst messen, dann layouten

Gilt, sobald absehbar ist, dass der Inhalt knapp wird oder bewusst auf
≥2 Seiten verteilt werden soll. Reihenfolge ist zwingend:

1. Verfügbare Inhaltshöhe pro Querformatseite festhalten:
   210 − (margin-top + margin-bottom). Standard: 210 − 28 = **182 mm**.
2. Höhe **jedes** Blocks einzeln messen oder konservativ abschätzen:
   Titel, Einstieg, jeder Textblock, Boxen, Merksatz, Quellen, Footer.
3. Diagrammgrösse ist eine **abhängige** Grösse — sie ergibt sich aus
   dem auf der Seite verbleibenden Raum, sie wird NICHT vorab geraten.
4. Erst bauen, wenn Σ(Seite 1) ≤ 182 mm UND Σ(Seite 2) ≤ 182 mm
   rechnerisch belegt ist. Nicht „bauen und schauen ob es passt“.

Wer hier zuerst layoutet und dann verdichtet, landet im Rate-Zyklus
(siehe «zweite Kernlehre»). Die Messung kommt VOR dem ersten HTML.

### Schritt 6 — Visuelle Gegenprüfung

Erst *nachdem* Schritt 5 grün ist: PNG-Vorschau erzeugen und das ganze
Blatt ansehen (nicht nur den Ausschnitt — der Ausschnitt hat einmal getäuscht).

```bash
# ALLE Seiten rendern — bei Zweiseiter ist -l 1 ein blinder Fleck.
pdftoppm -r 150 <output.pdf> <preview> -png            # alle Seiten
# erzeugt <preview>-1.png, <preview>-2.png, … — jede einzeln ansehen
```

Bei einem bewusst komponierten Zweiseiter MÜSSEN beide Seiten visuell
gegengeprüft werden: Seite 1 auf ihren entlastenden Abschluss (kein
abgeschnittener Text), Seite 2 auf korrekten Moduswechsel-Kopf und
vollständigen Footer. Nur Seite 1 zu rendern prüft die Hälfte des
Dokuments nicht.

**Was hier geprüft wird, ist Urteil, nicht Messung.** Schritt 5 hat das
Objektive abgedeckt (nichts ragt über die Seitengrenze). Schritt 6 deckt
das ab, was nur ein Mensch beurteilen kann. Konkrete benannte
Urteilspunkte — bewusst KEINE Pass/Fail-Regeln, sondern Fragen, die
deliberat statt per Default beantwortet werden müssen:

1. **Box-interner Textüberlauf:** Läuft Text über einen Kreis-, Box- oder
   Trapezrand? Das Gate fängt das NICHT (es prüft Seitengrenzen, nicht
   Element-Innenränder). Bekannte Stellen: lange Stationsnamen (cycle),
   lange Wörter (sequence), Pyramidenspitze, lange Gloss-Texte
   (spannungsfeld). Siehe `references/diagram-geometry.md`, Abschnitt
   «Bekannte Grenzen».
2. **Spaltenhöhen-Balance:** Enden die Spalten ungefähr gleich hoch?
   Wenn nein: Ist die Asymmetrie *dem Inhalt dienlich oder bekämpft sie
   ihn*? Das ist eine Urteilsfrage, keine Messung. Bei ruhigen,
   emotional schweren Themen kann bewusster Leerraum die bessere Wahl
   sein (die Lesezeit-Logik der fachstelle-Spec warnt: dichter ≠ besser).
   Bewusst entscheiden — nicht per Default „muss balanciert sein"
   annehmen, aber auch nicht ignorieren. Dies ist ABSICHTLICH kein
   automatisches Gate: ein ästhetisch-didaktisches Urteil als objektive
   Messung zu tarnen wäre derselbe Fehler wie «behoben» aus einem
   Vorschaubild zu behaupten.
3. **Diagramm-Aussage:** Transportiert die Visualisierung die didaktische
   Kernbotschaft aus Schritt 0? (Z. B.: zeigt das Spannungsfeld
   *Gleichzeitigkeit*, nicht versehentlich eine Abfolge?)

### Schritt 7 — Ausliefern und Messzahl nennen

Fertige Dateien (PDF + Vorschau aller Seiten) an den Auslieferungsort der
**jeweiligen Umgebung** legen und sichtbar machen. Der Pfad ist
umgebungsabhängig, NICHT fest:

- Claude-/Anthropic-Umgebung: `/mnt/user-data/outputs/` + `present_files`.
- Andere Sandbox-Umgebungen: der dort übliche Ausgabepfad (z. B.
  `/mnt/data/`) + der dort übliche Datei-/Link-Mechanismus.

Vor dem Ausliefern den konkreten Zielpfad der laufenden Umgebung prüfen,
statt einen aus dem Skill blind zu übernehmen. Im Text die Verifikations-
Messzahl nennen (z. B. «rechtestes Wort endet bei 282,7 mm, Grenze
283 mm — gemessen, nicht geschätzt»). Das ist kein Schmuck: Es macht die
Aussage überprüfbar und hält die Disziplin.

---

## Bei Bug-Reports vom User (Foto/Screenshot)

Wenn der User ein fehlerhaftes Handout-Foto schickt, NICHT sofort am
vermuteten Symptom patchen. Stattdessen:

1. `scripts/verify_pdf.py` auf das aktuelle PDF laufen lassen — es sagt
   objektiv, *ob* und *wo* etwas überläuft.
2. Wenn das Skript grün ist, der User aber ein Problem sieht: Es ist
   wahrscheinlich kein Überlauf, sondern Optik (Farbe, Abstand, Kante).
   Dann den konkreten Bereich vermessen, nicht raten.
3. Erst nach der Messung die Ursache benennen. Mehrfach wiederkehrendes
   Symptom nach lokalen Fixes → Ursache sitzt eine Ebene tiefer
   (meist die Layout-Container-Arithmetik), nicht dort wo es sichtbar ist.

Ehrlichkeit bei Fehlversuchen: Wenn ein früherer Fix falsch war, das klar
benennen statt beschönigen. Der User braucht eine verlässliche
Ursachenanalyse, keine optimistische Statusmeldung.

---

## Referenzdateien

- `references/didaktisches-reasoning.md` — **Zuerst lesen (Schritt 0).** Vom
  erkannten Mechanismus zur Kreislauf-Konstruktion: Stationszahl,
  Lernschritt, Ausstiege, Querformat-Begründung. FA als durchgearbeitetes
  Muster (nicht als Vorlage). Ergänzung zur fachstelle-Visualisierungs-
  Taxonomie, keine Doppelung.
- `references/weasyprint-invariants.md` — Die vier Konstruktionsregeln mit
  voller Begründung, Vorher/Nachher-Code und der Fehler-Historie.
- `references/diagram-geometry.md` — Parameter und Logik des
  Geometrie-Skripts (Stationszahl, Radien, Badge-Kopplung).
- `scripts/diagram_geometry.py` — Erzeugt das SVG-Fragment, `--type` aus
  sieben Buildern: `cycle` | `sequence` | `pyramid` | `spannungsfeld` |
  `erosion` | `waage` | `erosion_hybrid`. Alle mess-gate-getestet.
  **`erosion_hybrid`** (Erosionskurve mit Gegenkraft-Säulen) trägt das
  Erosions-Handout dieser Familie und ist der aktuell wichtigste Typ;
  `spannungsfeld` (radiales Kräftefeld) trägt das Loyalitäts-Handout.
- `scripts/render.py` — WeasyPrint-Render mit Timeout und Font-Fallback.
- `scripts/verify_pdf.py` — Harte Überlauf-Prüfung (rechts/links/oben/
  unten), Exit-Code als Gate.
- `scripts/measure_blocks.py` — **Vor dem Layout:** misst reale
  gerenderte Blockhöhen aus einer `blocks.json`, mit Geisterflächen-
  Ausschluss (rects ≥ 180 mm = volle Seitenhöhe werden ignoriert).
  Exit-Code 2, wenn schon der reine Text das 182-mm-Budget sprengt →
  dann ist einseitig ausgeschlossen, Zweiseiter komponieren.
- `scripts/verify_handout.py` — **Zentrale Prüfkette in einem Aufruf:**
  Seitenzahl == erwartet, Seitenzuordnung (pageN-must / -must-not),
  Mess-Gate (delegiert an verify_pdf.py). Ersetzt die früher verstreuten
  Einzel-Snippets; Exit-Code 0 nur wenn ALLE Stufen bestehen.

---
## Verbindliche Design-Token — Fachstellen-Linie (ab 2026-05-16)

Diese Token sind das Ergebnis einer forensischen Analyse des freigegebenen
Referenz-Handouts «Schlaf als Frühwarnsystem» (Mai 2026). Sie sind für
**alle** neuen und überarbeiteten Querformat-Handouts dieser Linie verbindlich.
Abweichungen erfordern eine explizite Begründung.

### Farb-Palette

| Token-Name          | Hex       | Verwendung                                      |
|---------------------|-----------|-------------------------------------------------|
| `color-teal`        | `#4A7C7E` | H2-Überschriften, Eyebrow, Info-Box-Titel, Icons |
| `color-terracotta`  | `#A64D3C` | Warn-Box-Titel, Warn-Icon, Kipppunkt-Kreis       |
| `color-dark`        | `#3D3530` | H1-Titel, Fliesstext, Episode-Kreis              |
| `color-mid`         | `#5A5550` | Lead-Text, H2 (Fallback)                         |
| `color-grey-node`   | `#B0A898` | «Erste Risse»-Kreis in Verlaufsgrafik            |
| `bg-page`           | `#FAF8F5` | Seitenhintergrund (warmes Off-White)             |
| `bg-warn`           | `#FDF5F2` | Hintergrund Warn-Box                            |
| `border-warn`       | `#E8D5CE` | Rahmen Warn-Box                                 |
| `bg-info`           | `#F2F7F7` | Hintergrund Info-Box («Grenzen»)                |
| `border-info`       | `#DCE8E8` | Rahmen Info-Box                                 |
| `color-footer`      | `#555555` | Footer Zeile 1 (Institution/Stand)              |
| `color-footer-src`  | `#888888` | Footer Zeile 2 (Quellen)                        |
| `border-divider`    | `#E0E0E0` | Footer-Trennlinie, Grafik-Rahmen                |

### Typografie

| Element       | Schrift                          | Grösse | Gewicht | Farbe           | Besonderheit                  |
|---------------|----------------------------------|--------|---------|-----------------|-------------------------------|
| Eyebrow       | Helvetica Neue, serifenlos       | 8pt    | normal  | `color-teal`    | uppercase, letter-spacing 1px |
| H1 Titel      | Helvetica Neue, serifenlos       | 30pt   | bold    | `color-dark`    | letter-spacing -0.5px         |
| Lead          | Helvetica Neue, serifenlos       | 10.5pt | normal  | `color-mid`     | kursiv, margin-bottom 8mm     |
| H2            | Helvetica Neue, serifenlos       | 11pt   | bold    | `color-teal`    | margin-top 4mm, -bottom 2mm   |
| Fliesstext    | Helvetica Neue, serifenlos       | 9.5pt  | normal  | `color-dark`    | line-height 1.5               |
| Bullet-Label  | Helvetica Neue, serifenlos       | 9.5pt  | bold    | `color-dark`    | gefolgt von normalem Text     |
| Box-Titel     | Helvetica Neue, serifenlos       | 10pt   | bold    | je Box-Farbe    |                               |
| Box-Text      | Helvetica Neue, serifenlos       | 9.5pt  | normal  | `color-dark`    |                               |
| Footer Z1     | Helvetica Neue, serifenlos       | 8pt    | normal  | `color-footer`  |                               |
| Footer Z2     | Helvetica Neue, serifenlos       | 7.5pt  | normal  | `color-footer-src` |                            |

**Kein Google-Font-Import** (WeasyPrint hängt bei Netzwerkzugriffen).
System-Fallback-Stack: `'Helvetica Neue', Helvetica, Arial, sans-serif`.

### Eyebrow-Zeile (Pflicht)

Jedes Handout beginnt mit einer zweizeiligen Eyebrow-Zeile:
```
FACHSTELLE ANGEHÖRIGENARBEIT · ORIENTIERUNGSBLATT
```
Farbe `color-teal`, 8pt, uppercase, letter-spacing 1px, margin-bottom 3mm.

### Layout-Struktur

Zweispaltig via `<table class="layout">` (WeasyPrint-Invariante):
- Linke Spalte: **127 mm** (inkl. 10 mm Gutter als `padding-right`)
- Rechte Spalte: **142 mm**
- Summe: 127 + 142 = **269 mm** = bedruckbare Breite ✓
- Kein CSS Grid, kein Flex auf Spaltenebene.

### Boxen (Warn-Box und Info-Box)

**Warn-Box** (z. B. «Ein wichtiges Warnsignal für Manie»):
- Hintergrund `bg-warn`, Rahmen `border-warn`, border-radius 4px, padding 4mm
- Flex-Layout: Icon links (24px, `color-terracotta`), Text rechts
- Icon: Unicode ⚠ oder SVG-Dreieck in `color-terracotta`
- Titel: bold, `color-terracotta`, 10pt
- Haupttext: bold, 10.5pt, `color-dark`
- Erklärtext: normal, 9.5pt, `color-dark`

**Info-Box** (z. B. «Grenzen der Verantwortung»):
- Hintergrund `bg-info`, Rahmen `border-info`, border-radius 4px, padding 4mm
- Flex-Layout: Icon links (24px, `color-teal`), Text rechts
- Icon: Herz-in-Händen SVG oder Unicode ♡ in `color-teal`
- Titel: bold, `color-teal`, 10pt
- Text: normal, 9.5pt, `color-dark`

### Verlaufsgrafik (Sequence-Typ)

Standard-SVG-Vorlage für «Rhythmus → Erste Risse → Kipppunkt → Episode»:
- Hintergrund weiss, Rahmen `border-divider`, border-radius 4px, padding 4mm
- Horizontale Linie: `#E0E0E0`, Pfeilspitze rechts
- Stationen als Kreise (r=12):
  - Rhythmus: fill `color-teal`
  - Erste Risse: fill `color-grey-node`
  - Kipppunkt: fill `color-terracotta`
  - Episode: fill `color-dark`
- Labels: bold, 11pt, `color-dark`; Sublabels: 9pt, `#888888`
- Interventions-Box: kleines Rechteck über Erste-Risse→Kipppunkt-Bereich,
  Rahmen `color-terracotta`, Text «Intervention», 8pt
- Gestrichelte Verbindungslinie (stroke-dasharray 3,3) von Box zur Linie

### Footer (Pflicht, zweizeilig)

```
Fachstelle Angehörigenarbeit, Psychiatrische Universitätsklinik Zürich  |  Stand: [Monat Jahr]
Quellen: [Autor (Jahr). Titel. Zeitschrift, Band(Nr.), Seiten.]  ·  [weitere Quellen]
```
- Trennlinie: 1px solid `border-divider`, volle Druckbreite
- Zeile 1: 8pt, `color-footer`
- Zeile 2: 7.5pt, `color-footer-src`
- Kein Netlify-Link, kein bipolarsite.netlify.app im Footer
- Quellen vollständig (Autor, Jahr, Titel, Zeitschrift, Band, Seiten oder URL)

### Schweizer Schreibweise (Pflicht)

Konsequent «ss» statt «ß» im gesamten Text:
- «äussern» (nicht «äußern»)
- «Strasse» (nicht «Straße»)
- «heissen» (nicht «heißen»)
- «weiss» (nicht «weiß»)
