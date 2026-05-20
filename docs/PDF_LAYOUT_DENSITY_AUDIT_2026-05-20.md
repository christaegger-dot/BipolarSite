# PDF-Layout-Dichte-Audit der 14 kanonischen Handouts

**Stand:** 20. Mai 2026  
**Scope:** Nur die 14 kanonischen Handouts aus `pdfs.groups.canonicalHandouts` / Materialien-Seite  
**Modus:** Layout-Audit mit nachträglichem Umsetzungsnachtrag für die zwei P1-Dichtebefunde.  

## 1. Kurzfazit

Die 14 neuen kanonischen Handouts sind layoutseitig insgesamt **releasefähig mit gezielten Verbesserungen**. Der deutliche Qualitätssprung gegenüber älteren Beständen ist sichtbar: Fast jedes Blatt hat ein tragendes Modell, eine klare linke/rechte Informationsarchitektur und eine wiedererkennbare Handout-Sprache. Es gibt keine Hinweise auf abgeschnittene Inhalte, falsche Seitenformate oder grobe Renderfehler.

Gleichzeitig ist die Serie an mehreren Stellen am oberen Dichtelimit. Das betrifft nicht nur Wortzahlen, sondern die Nutzungssituation: Angehörige lesen diese Blätter häufig unter Stress, in Erschöpfung oder mit wenig Zeit. Ein formal lesbares A4-Blatt kann dann praktisch zu viel auf einmal verlangen.

**Am dichtesten / kritischsten nach P1-Fix:**

1. `eltern_mit_bipolarer_stoerung.pdf`, Seite 2 — nach Entlastung noch 593 Wörter; gut gegliedert, aber weiterhin die dichteste Einzelseite.
2. `wenn_behandlung_abgelehnt_wird.pdf` — 447 Wörter; komplexes Entscheidungs-/Rechtsthema auf einer Seite, knapp am Limit.
3. `a2_phasenverlauf.pdf` / `a1_bipolare_stoerung_verstehen.pdf` / `a6_bipolar_i_ii_mischzustaende.pdf` — je ca. 428-435 Wörter; fachlich dicht, aber durch starke Modelle noch tragfähig.
4. `absprachen_bevor_es_kippt.pdf` und `schwieriges_ruhig_ansprechen.pdf` — je ca. 415-416 Wörter; praxisnah, aber mit erklärendem linken Teil.
5. `c6_selbstfuersorge.pdf` — 412 Wörter; durch Akku-Metapher noch tragfähig, aber für Entlastungsthema eher am oberen Rand.

**Layoutseitig besonders gelungen:**

1. `a9_schlaf_fruehwarnsystem.pdf` — gute Dichte, klares Modell, stress-tauglich.
2. `a8_warnsignale.pdf` — starke Ampelmetapher, sehr scanbar.
3. `a3_ambivalente_loyalitaet.pdf` — ruhig, viel Weissraum, Spannungsfeld trägt.
4. `b11_hypervigilanz_erschoepfung.pdf` — nach Korrektur klare Radar-Metapher, gute Handlungslogik unten.
5. `a4_ambiguous_loss.pdf` — gute Balance aus Erklärung, Modell und entlastendem Satz.

**Gesamturteil:** Kein Layout-Blocker für die aktuelle Website-Integration. Die zwei P1-Befunde wurden nach dem Audit umgesetzt: `behandlung_verstehen.pdf` ist jetzt auf 2 Quer-Seiten verteilt; Seite 2 von `eltern_mit_bipolarer_stoerung.pdf` wurde gekürzt und der Kinder-Plan stärker gewichtet. Offen bleiben P2-/P3-Optimierungen.

## 2. Methodik

Geprüft wurden die 14 PDF-Dateien, die im aktuellen Repo über `src/_data/pdfs.js` in `pdfs.groups.canonicalHandouts` definiert sind und auf `src/materialien/index.njk` sichtbar eingebunden werden.

Verwendete Kommandos / Werkzeuge:

```bash
node -e 'require("./src/_data/pdfs.js").groups.canonicalHandouts'
pdfinfo <datei.pdf>
pdftotext -f <seite> -l <seite> <datei.pdf> -
pdftoppm -png -r 110 <datei.pdf> /tmp/bipolarsite-pdf-layout-audit/png/<name>
npx playwright screenshot --full-page file:///tmp/bipolarsite-pdf-layout-audit/contact.html /tmp/bipolarsite-pdf-layout-audit/contact.png
```

Objektiv erhoben:

- Seitenzahl
- A4 hoch / A4 quer über `pdfinfo`
- Wortzahl gesamt und pro Seite über `pdftotext`
- gerenderte Vorschau jeder PDF-Seite über `pdftoppm`
- visuelle Kontaktansicht aller 15 Seiten zur Querprüfung

Bewertungskriterien:

- **A4 quer, 1 Seite:** bis ca. 350 Wörter meist gut; 350-450 Wörter kritisch prüfen; über 450 Wörter wahrscheinlich zu dicht.
- **A4 hoch, 2 Seiten:** über 500 Wörter pro Seite kritisch prüfen.
- Praxisblätter müssen schneller anwendbar sein als Orientierungsblätter.
- Reflexions- und Angehörigenbelastungs-Blätter brauchen mehr Weissraum als fachliche Orientierungsblätter.
- Ein Blatt muss beim ersten Blick eine Hauptstruktur zeigen, nicht nur Textblöcke.

## 3. Übersichtstabelle

| Datei | Titel | Format | Seiten | Wörter gesamt | Wörter pro Seite | Layouturteil | Hauptproblem | Empfohlene Massnahme |
|---|---|---:|---:|---:|---|---|---|---|
| `a1_bipolare_stoerung_verstehen.pdf` | Die bipolare Störung verstehen | A4 quer | 1 | 432 | 432 | beobachten | Gute Phasenwelle, aber viel Grundwissen auf einmal | Bei nächster Runde 10-15 % Text kürzen oder Legende minimal entschlacken |
| `a2_phasenverlauf.pdf` | Bipolarer Phasenverlauf | A4 quer | 1 | 435 | 435 | beobachten | Kurve trägt, aber Diagramm + Legende + drei Unterboxen sind dicht | Keine Sofortkorrektur; bei Redesign untere Boxen weiter kürzen |
| `a6_bipolar_i_ii_mischzustaende.pdf` | Bipolar I, II und Mischbilder verstehen | A4 quer | 1 | 428 | 428 | beobachten | Fachlich komplexe Sortierung, viele kleine Modelltexte | Modell behalten; bei Gelegenheit rechte Erklärboxen noch knapper |
| `behandlung_verstehen.pdf` | Behandlung gemeinsam verstehen | A4 quer | 2 | 683 | 356 / 327 | gut | P1-Dichtebefund behoben; Inhalt auf Kompass-Seite und Gesprächsseite verteilt | Behalten; bei künftigen Änderungen keine zusätzliche Verdichtung |
| `a9_schlaf_fruehwarnsystem.pdf` | Schlaf als Frühwarnsystem | A4 quer | 1 | 307 | 307 | gut | Kein relevanter Dichtebefund | Behalten |
| `a8_warnsignale.pdf` | Warnsignale früh erkennen | A4 quer | 1 | 314 | 314 | gut | Kein relevanter Dichtebefund | Behalten |
| `b11_hypervigilanz_erschoepfung.pdf` | Ständige Wachsamkeit und Erschöpfung | A4 quer | 1 | 329 | 329 | gut | Radar-Metapher braucht Raum, ist aber gut lesbar | Behalten |
| `c6_selbstfuersorge.pdf` | Die eigenen Kräfte schützen | A4 quer | 1 | 412 | 412 | beobachten | Wortzahl erhöht, aber Akku-Metapher und Weissraum tragen | Keine Sofortkorrektur; bei nächster Runde Hilfs-/Erschöpfungsboxen straffen |
| `a3_ambivalente_loyalitaet.pdf` | Ambivalente Loyalität | A4 quer | 1 | 282 | 282 | gut | Kein relevanter Dichtebefund | Behalten |
| `a4_ambiguous_loss.pdf` | Trauer ohne klaren Abschied | A4 quer | 1 | 329 | 329 | gut | Einzelne Modellbeschriftungen klein, aber stimmig | Behalten |
| `eltern_mit_bipolarer_stoerung.pdf` | Eltern bleiben – auch mit bipolarer Erkrankung | A4 hoch | 2 | 972 | 379 / 593 | beobachten | Seite 2 bleibt stoffreich, ist aber entlastet und der Kinder-Plan stärker priorisiert | Behalten; langfristig Anlaufstellen-Kompaktblatt prüfen |
| `absprachen_bevor_es_kippt.pdf` | Absprachen, bevor es kippt | A4 quer | 1 | 415 | 415 | beobachten | Praxisblatt, aber links noch erklärlastig | Linke Spalte bei nächster Runde kürzen; Absprachekarte stärker als Arbeitsfläche lesen lassen |
| `schwieriges_ruhig_ansprechen.pdf` | Schwieriges ruhig ansprechen | A4 quer | 1 | 416 | 416 | beobachten | Satzbaukasten stark, aber Fliesstext links nimmt Tempo heraus | Drei-Satz-Karte behalten; linke Stolperstellen ggf. auf 4 Items reduzieren |
| `wenn_behandlung_abgelehnt_wird.pdf` | Wenn Behandlung abgelehnt wird | A4 quer | 1 | 447 | 447 | beobachten bis zu dicht | Drei-Spuren-Logik klar, aber rechtlich/akut komplex und sehr textnah | Für nächste Runde prüfen: 2-Seiten-Praxisblatt oder stärkere Kürzung der drei Spuren |

## 4. Einzelbefunde

### 4.1 `behandlung_verstehen.pdf` — P1-Dichtebefund behoben

**Ursprünglicher Befund:** 569 Wörter auf einer A4-Querformat-Seite. Kompass, vier Phasen, Fragenblock und Medikationsteil konkurrierten auf engem Raum.

**Umsetzung:** Das Blatt wurde auf zwei A4-Quer-Seiten verteilt. Seite 1 trägt jetzt Behandlungskompass, vier Phasen, Einordnung und Kernsatz. Seite 2 trägt «Nicht nur Medikation», die vier Gesprächsfragen und den konkreten nächsten Schritt.

**Aktueller Stand:** 683 Wörter gesamt, verteilt auf 356 / 327 Wörter pro Seite. Das ist für ein komplexes Orientierungsblatt deutlich lesefreundlicher und nicht mehr der Dichte-Ausreisser der Serie.

### 4.2 `eltern_mit_bipolarer_stoerung.pdf` — Seite 2 entlastet, bleibt aber stoffreich

**Ursprünglicher Befund:** Zwei Seiten A4 hoch, insgesamt 1004 Wörter. Seite 2 hatte 625 Wörter und bündelte Gesprächsskripte, Kindeswohl, Kinder-Plan, Beratungsstellen, Was-guttut/Was-belastet und den konkreten nächsten Schritt.

**Umsetzung:** Seite 2 wurde sprachlich gestrafft; Gesprächsskripte, Kindeswohl-Absatz und Beratungsstellen sind kompakter. Der Kinder-Plan ist visuell stärker als Arbeitsblock gewichtet.

**Aktueller Stand:** 972 Wörter gesamt, verteilt auf 379 / 593 Wörter. Seite 2 bleibt die dichteste Seite des Sets, ist aber ruhiger und funktionaler. Eine spätere Auslagerung der Beratungsstellen in ein separates Kompaktblatt bleibt sinnvoll, aber ist kein Release-Blocker.

### 4.3 `wenn_behandlung_abgelehnt_wird.pdf` — gute Logik, aber knapp am Limit

**Befund:** 447 Wörter auf einer Seite. Die Drei-Spuren-Karte ist klarer als ein Fliesstextblatt und die rechte Seite hat eine gute Modelllogik. Trotzdem ist das Thema rechtlich, ethisch und akut zugleich.

**Warum problematisch:** Bei Behandlungsablehnung lesen Angehörige oft in hohem innerem Druck. Eine Drei-Spuren-Logik hilft, aber die Karte trägt drei Sortierungen gleichzeitig: Selbstbestimmung, freiwilliges Angebot, akuter Schutz. Die kleinen Texte in den Spuren sind knapp lesbar, aber nicht wirklich grosszügig.

**Empfehlung:** P2, bei starkem Anspruch P1. Als 1-Seiter kann es bleiben, wenn es als Kurzorientierung gedacht ist. Für echte Praxistauglichkeit wäre ein 2-Seiten-Praxisblatt stärker: Seite 1 drei Spuren, Seite 2 Dokumentation + nächste Schritte + Grenzen.

### 4.4 `absprachen_bevor_es_kippt.pdf` — Praxisnutzen vorhanden, aber noch erklärlastig

**Befund:** 415 Wörter. Die Absprachekarte rechts ist gut, die Wenn-Dann-Zeile macht das Blatt praktisch. Links bleibt aber relativ viel erklärender Text.

**Warum problematisch:** Das Blatt will zum Absprechen befähigen. Je stärker es erklärt, warum Absprachen sinnvoll sind, desto weniger fühlt es sich wie eine Arbeitskarte an.

**Empfehlung:** P2. Linke Spalte kürzen; die vier Karten und Wenn-Dann-Zeile stärker gewichten. Ziel: Angehörige sollen nach 20 Sekunden wissen, welchen Satz sie ausfüllen.

### 4.5 `schwieriges_ruhig_ansprechen.pdf` — guter Satzbaukasten, aber links könnte schneller sein

**Befund:** 416 Wörter. Die rechte Drei-Satz-Karte ist sehr gut scanbar. Der linke Abschnitt «Woran Gespräche oft kippen» ist treffend, aber relativ lang.

**Warum problematisch:** In einer konkreten Gesprächsvorbereitung braucht die Person schnell den Satzbaukasten. Die Stolperstellen sind hilfreich, dürfen aber den Baukasten nicht verdecken.

**Empfehlung:** P2. Drei-Satz-Modell behalten. Linke Liste eventuell von 6 auf 4 Punkte reduzieren oder stärker in zwei Mini-Cluster teilen: «zu viel auf einmal» / «Diagnose statt Beobachtung».

### 4.6 `a1_bipolare_stoerung_verstehen.pdf`, `a2_phasenverlauf.pdf`, `a6_bipolar_i_ii_mischzustaende.pdf`

**Befund:** Alle drei liegen bei 428-435 Wörtern. Nach reiner Wortzahl sind sie kritisch zu prüfen. Visuell sind sie aber deutlich besser als klassische Textblätter: A1/A2 nutzen die Phasenwelle, A6 trennt Schwelle und Mischbild.

**Warum problematisch:** Die Blätter sind laienverständlich, aber fachlich dicht. Besonders A6 enthält viel diagnostische Sortierlogik. Kleine Modelltexte können im Druck anspruchsvoll sein.

**Empfehlung:** Keine P1-Korrektur. Für die nächste Redesign-Runde:

- A1: Legende oder unteren Erklärblock minimal kürzen.
- A2: untere Boxen weiter komprimieren.
- A6: rechte Erklärboxen und Modelltexte weiter straffen, ohne die klare Schwellen-/Mischbild-Logik zu verlieren.

### 4.7 `c6_selbstfuersorge.pdf` — hohe Wortzahl, aber visuell noch tragfähig

**Befund:** 412 Wörter. Der Akku ist ein starkes Modell und die Seite wirkt nicht überfüllt, weil die rechte Visualisierung gut trägt.

**Warum problematisch:** Inhaltlich geht es um Entlastung. Für ein Selbstfürsorge-Blatt darf die Dichte nicht zu sehr nach Pflichtprogramm wirken.

**Empfehlung:** P3/P2. Bei nächster Runde den unteren rechten Textblock «Was Erschöpfung verstärkt» kürzen oder stärker in eine Warn-/Entlastungslogik übersetzen. Kein aktueller Blocker.

## 5. Priorisierte Empfehlungen

### P1 — Umgesetzt

1. **`behandlung_verstehen.pdf` entschärft.**  
   Das Blatt ist jetzt zweisaitig im Querformat und nicht mehr der Dichte-Ausreisser.

2. **`eltern_mit_bipolarer_stoerung.pdf`, Seite 2 entlastet.**  
   Seite 2 wurde gekürzt und der Kinder-Plan stärker gewichtet; langfristige Auslagerung der Beratungsstellen bleibt optional.

### P2 — Nächste Redesign-Runde

1. **`wenn_behandlung_abgelehnt_wird.pdf` prüfen.**  
   Drei-Spuren-Logik ist gut, aber für Recht/Behandlungsablehnung knapp. Empfehlung: entweder Text kürzen oder als 2-Seiten-Praxisblatt denken.

2. **Praxisblätter stärker als Arbeitsflächen gestalten.**  
   `absprachen_bevor_es_kippt.pdf` und `schwieriges_ruhig_ansprechen.pdf` funktionieren, könnten aber noch weniger erklären und schneller zum Ausfüllen/Formulieren führen.

3. **Fachliche Orientierungsblätter leicht entschlacken.**  
   A1, A2 und A6 sind gut, aber dicht. Bei zukünftigen Änderungen nicht weiter Text hinzufügen; eher 10 % kürzen.

### P3 — Langfristige Optimierungen

1. **Serie mit Dichtebudget führen.**  
   Für neue A4-Querformat-Einseiter: Zielwert 300-380 Wörter, absolute Obergrenze 450 nur bei starkem Visual.

2. **Druck- und Stresslesbarkeit systematisch prüfen.**  
   Jede neue PDF-Freigabe sollte neben Inhalt auch einen 100-%-Zoom- und A4-Druckcheck enthalten: «Kann ich in 10 Sekunden die Hauptstruktur erkennen?»

3. **PDF-A11y separat prüfen.**  
   Dieser Audit bewertet Layout und Lesbarkeit, nicht PDF-Tagging. Die fehlende Tagging-Barrierefreiheit bleibt ein eigener Qualitätsstrang.

## 6. Schlussbewertung

Die 14 Handouts sind als Set **klar besser, ruhiger und visuell professioneller** als ein klassischer PDF-Bestand. Die stärksten Blätter schaffen genau das, was Angehörigen hilft: ein visuelles Modell, wenige Sätze, ein nächster Schritt.

Die Grenze liegt dort, wo ein komplexes Thema auf eine A4-Querformat-Seite gezwungen wird. Der stärkste Fall (`behandlung_verstehen.pdf`) wurde deshalb auf zwei Seiten verteilt. Eltern/Kindeswohl bleibt auf Seite 2 anspruchsvoll, ist aber nach der Entlastung tragfähiger; Behandlungsablehnung bleibt der wichtigste P2-Kandidat.

**Empfehlung:** Aktuelles Set nicht stoppen. Für die nächste Qualitätsrunde gezielt die verbleibenden P2-Blätter überarbeiten, statt die ganze Serie neu anzufassen.
