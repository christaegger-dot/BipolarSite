# PDF / Handout Migration Plan

Stand: 2026-04-03

## Ziel

Die älteren Handouts in `handouts/` sollen schrittweise auf einen moderneren Standard gebracht werden:

- kleinere Dateigrößen
- textbasierte PDFs statt schwerer, wahrscheinlich bildorientierter Exporte
- bessere Suchbarkeit und bessere Grundlage für PDF-Zugänglichkeit
- konsistente Struktur, Sprache und Gestaltung
- klarere Trennung zwischen:
  - `downloads/` = prominente Kernunterlagen
  - `handouts/` = thematische Vertiefungsblätter

## Zielstandard für neue PDFs

Neue oder neu exportierte Handouts sollten möglichst:

- textbasiert sein
- schlank exportiert werden
- sinnvolle Metadaten enthalten:
  - Titel
  - Autor / Organisation
  - Sprache
  - Erstellungsdatum oder Stand
- auf A4 sauber lesbar sein
- ohne Qualitätsverlust digital lesbar bleiben
- keine unnötigen Hintergrundgrafiken oder eingebetteten Großbilder verwenden
- aus derselben Gestaltungssystematik kommen wie die guten Dateien in `downloads/`

## Empfohlene PDF-Typen

### Typ A: Akutblatt

Einsatz:

- Suizidgedanken
- Manie
- Psychose / Wahn
- Warnsignale

Struktur:

1. Was ist das Problem?
2. Was ist jetzt am wichtigsten?
3. Was tun?
4. Was vermeiden?
5. Wann sofort eskalieren?
6. Wichtige Nummern / Verweis

### Typ B: Kommunikations- / Umgangsblatt

Einsatz:

- Umgang mit Manie
- Umgang mit Depression
- Grenzsetzung
- Behandlung & Ambivalenz
- Expressed Emotions

Struktur:

1. Worum geht es?
2. Was Angehörige oft tun
3. Was eher hilft
4. Was eher schadet
5. Ein realistischer nächster Schritt

### Typ C: Reflexionsblatt

Einsatz:

- Trauer ohne klaren Abschied
- Affiliate Stigma
- Ambivalente Loyalität
- Loyalitätskonflikte

Struktur:

1. Das Phänomen benennen
2. Warum es belastet
3. Woran man es erkennt
4. Was entlasten kann
5. Wohin als Nächstes

### Typ D: Orientierungs- / Überblicksblatt

Einsatz:

- 18 Belastungen
- Kritische Zeitpunkte
- Belastung in Wellen
- Veränderung über Zeit
- Trialog

Struktur:

1. Überblick
2. Kernmodell
3. Typische Dynamiken
4. Praktische Konsequenz
5. Weiterführender Verweis

## Priorisierte Reihenfolge

## Welle 1

Ziel:

- höchste Wirkung
- höchste thematische Relevanz
- große technische Verbesserung

Reihenfolge:

1. `handouts/c4_manie.pdf`
2. `handouts/c2_suizidgedanken.pdf`
3. `handouts/a8_warnsignale.pdf`

Begründung:

- zentrale Sicherheits- und Krisenthemen
- häufige Verlinkung
- klarer Nutzen durch bessere digitale Lesbarkeit

## Welle 2

1. `handouts/c5_depression.pdf`
2. `handouts/c3_psychose_wahn.pdf`
3. `handouts/c1_krisenplan.pdf`
4. `handouts/b7_behandlung_ambivalenz.pdf`

Begründung:

- direkt in den akuten oder praktischen Kernpfaden verankert
- hoher Nutzen für Modul 6, Notfall und Modul 8

## Welle 3

1. `handouts/expressed_emotions.pdf`
2. `handouts/b1_18_belastungen.pdf`
3. `handouts/a4_ambiguous_loss.pdf`
4. `handouts/grenzsetzung.pdf`

Begründung:

- sehr wichtig für Verständnis und Angehörigenperspektive
- etwas weniger akut, aber inhaltlich zentral

## Erste konkrete Neubauten

### 1. `c4_manie.pdf`

Ziel:

- ein klar lesbares 1-Seiten-Akutblatt
- nicht zu viel Theorie
- hoher Scan-Wert

Sollstruktur:

1. Titel:
   Umgang mit Manie
2. Kurzdefinition:
   Woran Manie oder beginnende Entgleisung erkennbar sein kann
3. Sofort wichtig:
   ruhig, kurz, nicht diskutieren
4. Tun:
   Krisenplan aktivieren, Behandlungsteam / 0800 33 66 55, Finanzen schützen
5. Nicht tun:
   moralisch argumentieren, provozieren, allein lösen wollen
6. Sofort eskalieren:
   144 / 117 bei unmittelbarer Gefahr

### 2. `c2_suizidgedanken.pdf`

Ziel:

- maximale Klarheit
- sehr direkte Sprache
- sehr hoher Sicherheitswert

Sollstruktur:

1. Titel:
   Umgang mit Suizidgedanken
2. Direktsatz:
   Jede Äußerung ernst nehmen
3. Direkt fragen:
   konkrete Beispiel-Fragen
4. Tun:
   bei der Person bleiben, Umgebung sichern, Hilfe holen
5. Nicht tun:
   bagatellisieren, relativieren, Versprechen erzwingen
6. Sofort eskalieren:
   144 bei konkretem Plan / Mitteln

### 3. `a8_warnsignale.pdf`

Ziel:

- Orientierung in stabileren Phasen
- Frühwarnzeichen schnell erfassbar machen

Sollstruktur:

1. Titel:
   Warnsignale früh erkennen
2. Frühe Veränderungen:
   Schlaf, Tempo, Reizbarkeit, Geld, Rückzug
3. Was Angehörige beobachten können
4. Was hilfreich ist
5. Was zu spät macht
6. Verweis:
   Krisenplan / Notfallseite / Modul 6

## Gestalterische Empfehlungen

- gleiche Seitenarchitektur für alle neuen Handouts
- maximal 2 Schriftebenen
- klare Zwischenüberschriften
- wenige, aber klare Farbmodi:
  - Rot für Akut / Gefahr
  - Teal für Orientierung / Handlung
  - Warmes Neutral für Einordnung / Reflexion
- keine dekorativen Flächen, die Dateigröße hochtreiben
- Icons nur, wenn sie funktional helfen

## Inhaltliche Qualitätsregeln

- kürzer als die Website, nicht gleich lang
- keine unnötigen Fachbegriffe
- hoher Scan-Wert
- konkrete Verben
- keine moralische Überforderung
- bei Akutblättern:
  - Handlungslogik vor Erklärung

## QA-Checkliste für jeden Neuaufbau

- stimmt der Titel mit dem Web-Kontext überein?
- ist das Blatt in unter 30 Sekunden grob scanbar?
- ist die Datei deutlich kleiner als die alte Version?
- funktioniert Textauswahl / Copy-Paste sinnvoll?
- passen Metadaten?
- ist klar, ob das Blatt für Krise, Vorbereitung oder Reflexion gedacht ist?
- gibt es einen nächsten Schritt oder Verweis?

## Empfehlung

Am sinnvollsten ist jetzt:

1. Welle 1 komplett neu aufbauen
2. dafür ein einziges sauberes Handout-System etablieren
3. danach Welle 2 und 3 schneller aus derselben Struktur ableiten

## Nächster praktischer Schritt

Direkt umsetzen würde ich als Nächstes:

- ein erstes redaktionell-strukturelles Zielgerüst für `c4_manie.pdf`
- danach dieselbe Vorlage für `c2_suizidgedanken.pdf`
- dann `a8_warnsignale.pdf`
