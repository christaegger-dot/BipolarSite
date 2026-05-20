# PDF-Layout-Dichte-Audit der 14 kanonischen Handouts

**Stand:** 20. Mai 2026
**Scope:** Nur die 14 kanonischen Handouts aus `pdfs.groups.canonicalHandouts` / Materialien-Seite
**Modus:** Layout-Audit mit nachträglichem Umsetzungsnachtrag für P1- und P2-Dichtebefunde.

## 1. Kurzfazit

Die 14 neuen kanonischen Handouts sind layoutseitig insgesamt **releasefähig mit gezielten Verbesserungen**. Der deutliche Qualitätssprung gegenüber älteren Beständen ist sichtbar: Fast jedes Blatt hat ein tragendes Modell, eine klare linke/rechte Informationsarchitektur und eine wiedererkennbare Handout-Sprache. Es gibt keine Hinweise auf abgeschnittene Inhalte, falsche Seitenformate oder grobe Renderfehler.

Gleichzeitig ist die Serie an mehreren Stellen am oberen Dichtelimit. Das betrifft nicht nur Wortzahlen, sondern die Nutzungssituation: Angehörige lesen diese Blätter häufig unter Stress, in Erschöpfung oder mit wenig Zeit. Ein formal lesbares A4-Blatt kann dann praktisch zu viel auf einmal verlangen.

**Am dichtesten / kritischsten nach P1-/P2-Fix:**

1. `eltern_mit_bipolarer_stoerung.pdf`, Seite 2 — nach Entlastung noch 593 Wörter; gut gegliedert, aber weiterhin die dichteste Einzelseite.
2. `wenn_behandlung_abgelehnt_wird.pdf` — nach Kürzung 414 Wörter; komplexes Entscheidungs-/Rechtsthema, aber nicht mehr über der 450er-Risikomarke.
3. `a6_bipolar_i_ii_mischzustaende.pdf` — 407 Wörter; fachlich dicht, durch Schwellen-/Mischmodell aber tragfähig.
4. `schwieriges_ruhig_ansprechen.pdf` / `a2_phasenverlauf.pdf` — 405 bzw. 396 Wörter; im Beobachtungsbereich, aber nach Kürzung deutlich ruhiger.
5. `a1_bipolare_stoerung_verstehen.pdf` — 393 Wörter; Grundwissen bleibt dicht, aber die Phasenwelle trägt.

**Layoutseitig besonders gelungen:**

1. `a9_schlaf_fruehwarnsystem.pdf` — gute Dichte, klares Modell, stress-tauglich.
2. `a8_warnsignale.pdf` — starke Ampelmetapher, sehr scanbar.
3. `a3_ambivalente_loyalitaet.pdf` — ruhig, viel Weissraum, Spannungsfeld trägt.
4. `b11_hypervigilanz_erschoepfung.pdf` — nach Korrektur klare Radar-Metapher, gute Handlungslogik unten.
5. `a4_ambiguous_loss.pdf` — gute Balance aus Erklärung, Modell und entlastendem Satz.

**Gesamturteil:** Kein Layout-Blocker für die aktuelle Website-Integration. Die zwei P1-Befunde wurden nach dem Audit umgesetzt: `behandlung_verstehen.pdf` ist jetzt auf 2 Quer-Seiten verteilt; Seite 2 von `eltern_mit_bipolarer_stoerung.pdf` wurde gekürzt und der Kinder-Plan stärker gewichtet. Die anschliessenden P2-Kürzungen senken die Dichte der verbliebenen knappen Einseiter deutlich; offen bleiben nur langfristige P3-Optimierungen und PDF-A11y.

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
| `a1_bipolare_stoerung_verstehen.pdf` | Die bipolare Störung verstehen | A4 quer | 1 | 393 | 393 | gut bis beobachten | Gute Phasenwelle; Grundwissen bleibt anspruchsvoll, aber gekürzt | P2-Kürzung umgesetzt; keine weitere Sofortmassnahme |
| `a2_phasenverlauf.pdf` | Bipolarer Phasenverlauf | A4 quer | 1 | 396 | 396 | gut bis beobachten | Kurve trägt; Legende und Unterboxen wurden gestrafft | P2-Kürzung umgesetzt; keine weitere Sofortmassnahme |
| `a6_bipolar_i_ii_mischzustaende.pdf` | Bipolar I, II und Mischbilder verstehen | A4 quer | 1 | 407 | 407 | beobachten | Fachlich komplexe Sortierung, aber Modelltexte knapper | P2-Kürzung umgesetzt; Modell behalten |
| `behandlung_verstehen.pdf` | Behandlung gemeinsam verstehen | A4 quer | 2 | 751 | 348 / 403 | gut | P1-Dichtebefund behoben; Inhalt auf Kompass-Seite und Gesprächsseite verteilt | Behalten; bei künftigen Änderungen keine zusätzliche Verdichtung |
| `a9_schlaf_fruehwarnsystem.pdf` | Schlaf als Frühwarnsystem | A4 quer | 1 | 307 | 307 | gut | Kein relevanter Dichtebefund | Behalten |
| `a8_warnsignale.pdf` | Warnsignale früh erkennen | A4 quer | 1 | 314 | 314 | gut | Kein relevanter Dichtebefund | Behalten |
| `b11_hypervigilanz_erschoepfung.pdf` | Ständige Wachsamkeit und Erschöpfung | A4 quer | 1 | 329 | 329 | gut | Radar-Metapher braucht Raum, ist aber gut lesbar | Behalten |
| `c6_selbstfuersorge.pdf` | Die eigenen Kräfte schützen | A4 quer | 1 | 370 | 370 | gut | Akku-Metapher trägt, Entlastungs-/Warntexte gestrafft | P2/P3-Kürzung umgesetzt; behalten |
| `a3_ambivalente_loyalitaet.pdf` | Ambivalente Loyalität | A4 quer | 1 | 282 | 282 | gut | Kein relevanter Dichtebefund | Behalten |
| `a4_ambiguous_loss.pdf` | Trauer ohne klaren Abschied | A4 quer | 1 | 329 | 329 | gut | Einzelne Modellbeschriftungen klein, aber stimmig | Behalten |
| `eltern_mit_bipolarer_stoerung.pdf` | Eltern bleiben – auch mit bipolarer Erkrankung | A4 hoch | 2 | 972 | 379 / 593 | beobachten | Seite 2 bleibt stoffreich, ist aber entlastet und der Kinder-Plan stärker priorisiert | Behalten; langfristig Anlaufstellen-Kompaktblatt prüfen |
| `absprachen_bevor_es_kippt.pdf` | Absprachen, bevor es kippt | A4 quer | 1 | 374 | 374 | gut | Absprachekarte und Wenn-dann-Zeile stehen stärker im Vordergrund | P2-Kürzung umgesetzt; behalten |
| `schwieriges_ruhig_ansprechen.pdf` | Schwieriges ruhig ansprechen | A4 quer | 1 | 405 | 405 | gut bis beobachten | Satzbaukasten stark; linke Stolperstellen auf 4 Punkte reduziert; Akut-Grenze bleibt sichtbar | P2-Kürzung umgesetzt; behalten |
| `wenn_behandlung_abgelehnt_wird.pdf` | Wenn Behandlung abgelehnt wird | A4 quer | 1 | 414 | 414 | beobachten | Drei-Spuren-Logik klarer; Thema bleibt rechtlich/ethisch anspruchsvoll | P2-Kürzung umgesetzt; langfristig 2-Seiten-Variante nur bei Bedarf |

## 4. Einzelbefunde

### 4.1 `behandlung_verstehen.pdf` — P1-Dichtebefund behoben

**Ursprünglicher Befund:** 569 Wörter auf einer A4-Querformat-Seite. Kompass, vier Phasen, Fragenblock und Medikationsteil konkurrierten auf engem Raum.

**Umsetzung:** Das Blatt wurde auf zwei A4-Quer-Seiten verteilt. Seite 1 trägt jetzt Behandlungskompass, vier Phasen und Einordnung. Seite 2 trägt «Nicht nur Medikation», die vier Gesprächsfragen, den Kernsatz und den konkreten nächsten Schritt.

**Aktueller Stand:** 751 Wörter gesamt, verteilt auf 348 / 403 Wörter pro Seite. Das ist für ein komplexes Orientierungsblatt gut tragfähig, weil die fachliche Behandlungssystematik und die Gesprächsfragen nicht mehr auf einer Seite konkurrieren.

### 4.2 `eltern_mit_bipolarer_stoerung.pdf` — Seite 2 entlastet, bleibt aber stoffreich

**Ursprünglicher Befund:** Zwei Seiten A4 hoch, insgesamt 1004 Wörter. Seite 2 hatte 625 Wörter und bündelte Gesprächsskripte, Kindeswohl, Kinder-Plan, Beratungsstellen, Was-guttut/Was-belastet und den konkreten nächsten Schritt.

**Umsetzung:** Seite 2 wurde sprachlich gestrafft; Gesprächsskripte, Kindeswohl-Absatz und Beratungsstellen sind kompakter. Der Kinder-Plan ist visuell stärker als Arbeitsblock gewichtet.

**Aktueller Stand:** 972 Wörter gesamt, verteilt auf 379 / 593 Wörter. Seite 2 bleibt die dichteste Seite des Sets, ist aber ruhiger und funktionaler. Eine spätere Auslagerung der Beratungsstellen in ein separates Kompaktblatt bleibt sinnvoll, aber ist kein Release-Blocker.

### 4.3 `wenn_behandlung_abgelehnt_wird.pdf` — P2 gekürzt, bleibt anspruchsvoll

**Ursprünglicher Befund:** 447 Wörter auf einer Seite. Die Drei-Spuren-Karte war klarer als ein Fliesstextblatt, aber für ein rechtlich, ethisch und akut geprägtes Thema knapp.

**Umsetzung:** Worum-es-geht, Warnzeichenliste, Drei-Spuren-Texte, Dokumentationsblock und nächster Schritt wurden gekürzt. Die Karte bleibt ein 1-Seiter, aber die drei Spuren lesen sich schneller.

**Aktueller Stand:** 414 Wörter. Kein Release-Blocker. Eine 2-Seiten-Fassung wäre nur nötig, falls das Blatt später mehr Rechts-/Dokumentationslogik aufnehmen soll.

### 4.4 `absprachen_bevor_es_kippt.pdf` — P2 gekürzt, Arbeitsfläche gestärkt

**Ursprünglicher Befund:** 415 Wörter. Die Absprachekarte war gut, links blieb aber relativ viel erklärender Text.

**Umsetzung:** Linke Spalte gekürzt, fehlende-Absprache-Liste gestrafft, Kartentexte gekürzt und der nächste Schritt auf das Ausfüllen der Wenn-dann-Zeile fokussiert.

**Aktueller Stand:** 374 Wörter. Die Praxisfunktion ist jetzt schneller erkennbar.

### 4.5 `schwieriges_ruhig_ansprechen.pdf` — P2 gekürzt, Satzbaukasten schneller

**Ursprünglicher Befund:** 416 Wörter. Die rechte Drei-Satz-Karte war sehr gut scanbar, links nahm die Kippstellen-Liste Tempo heraus.

**Umsetzung:** Einleitung gekürzt, Kippstellen von sechs auf vier Punkte reduziert, nächster Schritt auf drei Satzanfänge fokussiert.

**Aktueller Stand:** 405 Wörter. Das Blatt bleibt substanzreich, aber die Gesprächsformel tritt klarer hervor; die kurze Akut-Grenze bleibt erhalten.

### 4.6 `a1_bipolare_stoerung_verstehen.pdf`, `a2_phasenverlauf.pdf`, `a6_bipolar_i_ii_mischzustaende.pdf`

**Ursprünglicher Befund:** Alle drei lagen bei 428-435 Wörtern. Nach reiner Wortzahl waren sie kritisch zu prüfen, visuell aber deutlich besser als klassische Textblätter.

**Umsetzung:** A1 und A2 wurden in Legende, Erklärblöcken und nächstem Schritt gestrafft. A6 wurde in Worum-es-geht, Mischbild-Erklärung, Callouts und nächstem Schritt gekürzt.

**Aktueller Stand:** A1 393 Wörter, A2 396 Wörter, A6 407 Wörter. Keine weitere Sofortkorrektur.

### 4.7 `c6_selbstfuersorge.pdf` — P2/P3 gekürzt

**Ursprünglicher Befund:** 412 Wörter. Der Akku war ein starkes Modell, aber für ein Entlastungsthema eher am oberen Rand.

**Umsetzung:** Worum-es-geht, Akku-Legende, Hilfs-/Warnblock und nächster Schritt wurden gekürzt.

**Aktueller Stand:** 370 Wörter. Das Blatt liegt jetzt im Zielbereich für A4-Quer-Einseiter.

## 5. Priorisierte Empfehlungen

### P1 — Umgesetzt

1. **`behandlung_verstehen.pdf` entschärft.**
   Das Blatt ist jetzt zweiseitig im Querformat und nicht mehr der Dichte-Ausreisser.

2. **`eltern_mit_bipolarer_stoerung.pdf`, Seite 2 entlastet.**
   Seite 2 wurde gekürzt und der Kinder-Plan stärker gewichtet; langfristige Auslagerung der Beratungsstellen bleibt optional.

### P2 — Umgesetzt

1. **`wenn_behandlung_abgelehnt_wird.pdf` gekürzt.**
   Die Drei-Spuren-Logik bleibt ein 1-Seiter, ist aber nicht mehr über der 450er-Risikomarke.

2. **Praxisblätter stärker als Arbeitsflächen gestaltet.**
   `absprachen_bevor_es_kippt.pdf` fokussiert stärker auf die Wenn-dann-Zeile; `schwieriges_ruhig_ansprechen.pdf` fokussiert stärker auf die drei Satzanfänge.

3. **Fachliche Orientierungsblätter leicht entschlackt.**
   A1, A2 und A6 wurden um ca. 7-10 % gestrafft, ohne ihre Modelle zu verändern.

### P3 — Langfristige Optimierungen

1. **Serie mit Dichtebudget führen.**
   Für neue A4-Querformat-Einseiter: Zielwert 300-380 Wörter, absolute Obergrenze 450 nur bei starkem Visual.

2. **Druck- und Stresslesbarkeit systematisch prüfen.**
   Jede neue PDF-Freigabe sollte neben Inhalt auch einen 100-%-Zoom- und A4-Druckcheck enthalten: «Kann ich in 10 Sekunden die Hauptstruktur erkennen?»

3. **PDF-A11y separat prüfen.**
   Dieser Audit bewertet Layout und Lesbarkeit, nicht PDF-Tagging. Die fehlende Tagging-Barrierefreiheit bleibt ein eigener Qualitätsstrang.

## 6. Schlussbewertung

Die 14 Handouts sind als Set **klar besser, ruhiger und visuell professioneller** als ein klassischer PDF-Bestand. Die stärksten Blätter schaffen genau das, was Angehörigen hilft: ein visuelles Modell, wenige Sätze, ein nächster Schritt.

Die Grenze liegt dort, wo ein komplexes Thema auf eine A4-Querformat-Seite gezwungen wird. Der stärkste Fall (`behandlung_verstehen.pdf`) wurde deshalb auf zwei Seiten verteilt. Eltern/Kindeswohl bleibt auf Seite 2 anspruchsvoll, ist aber nach der Entlastung tragfähiger; die übrigen knappen Einseiter wurden in der P2-Runde spürbar entschlackt.

**Empfehlung:** Aktuelles Set nicht stoppen. Nächste Qualitätsrunde auf P3-Themen konzentrieren: Dichtebudget, Druck-/Stresslesbarkeit und PDF-A11y.
