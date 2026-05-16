# Diagramm-Geometrie

`scripts/diagram_geometry.py` (`--type cycle|sequence|pyramid|spannungsfeld|erosion|waage|erosion_hybrid`) erzeugt SVG-Fragmente für Struktur- und Metaphern-Diagramme. Hintergrund und Parameter.

---

## Prinzip

Ein Strukturdiagramm trägt **Beziehungslogik**, nicht Volltext. Ein Kreis mit
Radius 50 (100 px Durchmesser) fasst eine Nummer und einen kurzen Namen —
mehr nicht. Ein ganzer Erklärsatz («Sie reagieren auf den Zwang.») braucht
~150 px und läuft zwangsläufig über; gleichzeitig schneiden Verbindungspfeile
durch den überlaufenden Text. Das war der erste Blocker des
Family-Accommodation-Blatts. Konsequenz: Knoten = Nummer + Name. Die
Erklärung steht in einer Spalte daneben, nicht im Knoten.

---

## Parameter (CONFIG-Block im Skript)

| Parameter | Bedeutung | Default |
|---|---|---|
| `CX, CY` | Polygon-Zentrum in der viewBox | 240, 200 |
| `R` | Distanz Zentrum → Stationsmittelpunkt | 132 |
| `r` | Stationskreis-Radius | 52 |
| `GAP` | Abstand Pfeilspitze/-fuss zum Kreisrand | 5 |
| `AL`, `AW` | Pfeilkopf Länge / halbe Breite | 10 / 4.6 |
| `BADGE_R` | Radius der Ausstiegs-Badges | 10.5 |
| `STATIONS` | Liste der Stationsnamen (N = Länge) | 5 Einträge |
| `EXIT_AT` | 0-basierte Indizes mit Ausstiegs-Badge | [1,2,3] |
| `VIEWBOX_W/H` | viewBox-Dimensionen | 480 × 400 |

N Stationen werden gleichmässig auf einem regelmässigen N-Eck verteilt,
oben beginnend, im Uhrzeigersinn. Innere Pfeile starten und enden exakt auf
dem Kreisrand plus `GAP`. Pfeilköpfe sind explizite Polygone (keine SVG-
Marker — die rendert WeasyPrint unzuverlässig).

---

## Die Badge-Kopplung (der didaktische Kern)

Die Ausstiegs-Badges am Diagramm verwenden **dieselbe Farbe und dieselben
Ziffern** wie die nummerierten Interventionspunkte in der danebenliegenden
Spalte (`COL["exit"]`, der Salbei-Ton). Dadurch erkennt die Leserin ohne ein
einziges erklärendes Wort, dass «der gestrichelte Pfeil an Station 3» und
«Ausstiegspunkt 3 in der Spalte» dasselbe meinen. Wird die Spalte
umnummeriert, muss `EXIT_AT` synchron bleiben.

Welche Stationen einen Ausstieg bekommen, ist eine inhaltliche Entscheidung
(aus `fachstelle-handout` / der Visualisierungs-Taxonomie), keine technische:
Stationen ohne realistischen Interventionshebel bekommen bewusst keinen
Badge.

---

## Bounding-Check

Das Skript prüft selbst, ob Stationen + Badges in die viewBox passen, und
gibt sonst eine `<!-- WARNING -->`-Zeile aus. Bei Warnung `R` verkleinern
oder `r` reduzieren, nicht die viewBox aufblähen (sonst schrumpft das
Diagramm in der festen mm-Spalte).

## Bekannte Grenze: lange Stationsnamen

Der Bounding-Check prüft Kreismittelpunkte und Badges, **nicht** die Breite
des Stationsnamens im Kreis. Namen ab ~12 Zeichen («Akkommodation»)
berühren bei `r=52` und `font-size=12.5` den Kreisrand. Optionen, wenn das
auftritt: `r` auf 56–60 erhöhen (dann Bounding-Check beachten), die
Namens-`font-size` im Skript auf 11–11.5 senken, oder den Namen inhaltlich
kürzen (oft die beste Lösung — Knoten tragen Schlagworte, keine Begriffe in
Vollform). Kein Geometriefehler, sondern eine Typografie-Entscheidung.

---

## Übertragbarkeit

`scripts/diagram_geometry.py` ist eine kleine Bibliothek mit sieben dokumentierten `--type`-Werten:

- **cycle** — N Stationen auf Polygon, innere Schleifenpfeile, farb-
  gekoppelte Ausstiegs-Badges. Trägt jeden Teufelskreis mit Ausstiegen
  (Borderline-Anspannungszyklus, Expressed-Emotions-Schleife). Nur
  `STATIONS` und `EXIT_AT` ändern.
- **sequence** — Links-nach-rechts-Schrittkette mit Verbindungspfeilen,
  serpentinen-Umbruch bei >5 Schritten. Für lineare Abläufe
  (Eskalationsstufen, Behandlungspfad).
- **pyramid** — gestapelte Tiers, breiteste Basis unten. Für Hierarchien
  (Bedürfnis-, Versorgungsstufen).
- **spannungsfeld** — zwei Pole mit Spannungs-/Zwischenraum. Für Themen,
  bei denen nicht ein Ablauf, sondern ein auszubalancierender Gegensatz
  sichtbar werden soll.
- **erosion** — abfallende Beziehungskurve mit Schutzsäulen. Für schleichende
  Belastungs-/Erosionsprozesse über Zeit.
- **waage** — Waage-/Balance-Metapher. Für Last, Gegengewicht, Verantwortung
  und Entlastung.
- **erosion_hybrid** — Synthese aus Erosionskurve und konkreten
  Schutzfaktoren. Aktueller Typ für die Belastung-verstehen/Erosions-
  Handout-Familie; besonders geeignet für „Orientierungsblatt mit
  sichtbarem Handlungsausgang“.

Palette über `PAL` an das Site-Design anpassen. Welcher Typ — entscheidet
die fachstelle-Taxonomie (Spec §6), nicht dieses Skript. Nach jeder Änderung
an Konfiguration, Labeln oder Anzeigegrösse bleibt die volle Prüfkette
pflichtig: Geometrie erzeugen → HTML rendern → `verify_handout.py`/
`verify_pdf.py` → visuelle Gegenprüfung.

## Bekannte Grenzen (aus dem Test gefunden, nicht behebbar — bewusst zu handhaben)

Diese Grenzen fängt das Mess-Gate **nicht**, weil sie box-internen
Textüberlauf betreffen, nicht Seitengrenzen. Darum hier explizit:

- **cycle:** Stationsnamen ab ~12 Zeichen («Akkommodation») berühren bei
  `r=52` den Kreisrand. `r` erhöhen, `font-size` senken, oder Namen kürzen
  (meist beste Lösung — Knoten tragen Schlagworte).
- **sequence:** Einzelne Wörter, die breiter sind als die Box, werden hart
  umgebrochen (max. 3 Zeilen). Sehr lange Begriffe vorher inhaltlich
  kürzen; `BOX_W` ist mit 76 px auf die längsten realistischen
  Schritt-Begriffe ausgelegt.
- **pyramid:** Die obersten (schmalen) Tiers fassen nur kurze Begriffe
  (≤12 Zeichen). Längere Labels ragen über die Spitzenkante — *inhärent*
  in der Pyramidenform, kein Bug. Lösung: kurze Begriffe in den oberen
  Tiers, oder Label seitlich aus dem Tier herausführen (mit Linie). Eine
  Designentscheidung des Nutzers, die das Skript bewusst nicht kaschiert.
- **spannungsfeld/waage:** Die Bildmetapher ist schnell verständlich, kann
  aber zu dekorativ wirken, wenn die danebenstehende Textbox nicht die
  fachliche Übersetzung liefert. Bild und Text müssen bewusst gekoppelt sein.
- **erosion/erosion_hybrid:** Lange gedrehte SVG-Labels brauchen entweder
  kurze Ankerbegriffe im Diagramm oder echten `tspan`-Umbruch. Ein `\n` im
  SVG-`<text>` erzeugt keinen zuverlässigen Zeilenumbruch. Langformen gehören
  in die Handlungsbox, wenn die geprüfte Geometrie nicht neu gehärtet werden
  soll.

Diese Grenzen sind der Grund, warum **die visuelle Gegenprüfung nicht
entfällt**, auch wenn das Mess-Gate grün ist. Gate UND Auge — das ist die
Lehre dieser Skill-Familie.
