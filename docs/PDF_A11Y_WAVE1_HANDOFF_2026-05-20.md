# PDF-A11y Welle 1 — Handoff für externe Remediation

**Stand:** 20. Mai 2026  
**Scope:** Priorität-1-PDFs aus `docs/PDF_A11Y_REMEDIATION_INVENTORY_2026-05-20.md`  
**Ziel:** Externe PDF/UA-Remediation vorbereiten, ohne sichtbaren Inhalt, Layout oder Dateipfade zu verändern.

## Grundregel

Diese Welle ist **keine redaktionelle oder visuelle Überarbeitung**. Die PDFs sind inhaltlich und layoutseitig freigegeben. Die Remediation darf nur die PDF-Struktur verbessern:

- Tags, Lesereihenfolge, Sprache und Metadaten ergänzen
- Überschriften, Absätze, Listen, Links und Formular-/Arbeitsfelder korrekt auszeichnen
- dekorative Elemente als Artefakte markieren
- informative Diagramme mit Alternativtext oder gleichwertiger Textstruktur versehen

Nicht erlaubt:

- sichtbaren Wortlaut ändern
- Telefonnummern, URLs, Quellen oder Footer ergänzen/streichen
- Layout, Zeilenumbruch, Seitenzahl oder Dateinamen verändern
- klinische Aussagen im Alternativtext neu formulieren oder erweitern

## Gemeinsame Abnahmekriterien

Jede Datei gilt erst als zurückgeführt, wenn:

- `pdfinfo <pdf>` zeigt `Tagged: yes`
- Dokumentsprache ist `de-CH`
- Titel/Metadaten entsprechen dem sichtbaren PDF-Titel
- Lesereihenfolge folgt dem fachlichen Nutzungspfad, nicht der zufälligen Layout-Geometrie
- Links sind als Links getaggt und im Text erkennbar
- dekorative Linien, Rahmen, Farbflächen, Icons, Pfeile und Hintergrundformen sind Artefakte
- informative Diagramme haben Alternativtext oder werden als sinnvolle Abschnittsstruktur linearisiert
- Textextraktion ist lesbar und frei von Ligatur-/Umbruchfehlern
- das finale PDF besteht das vorhandene Gate mit `--final-pdf`

Beispiel für die Rückprüfung:

```bash
pdfinfo src/downloads/notfallkarte-kanton-zuerich-puk.pdf | rg "Tagged|Title|Pages|Page size"
pdftotext src/downloads/notfallkarte-kanton-zuerich-puk.pdf -
python3 scripts/fachstelle-handout/render_measure_verify.py <html> \
  --type krise \
  --orientation portrait \
  --final-pdf src/downloads/notfallkarte-kanton-zuerich-puk.pdf
```

Wenn keine HTML-Quelle existiert, wird mit `pdfinfo`, `pdftotext`, visueller Stichprobe und manuellem Tag-/Lesereihenfolge-Check geprüft.

## Welle-1-Dateien

| Nr. | Quelle | Öffentlich | Titel | Seiten | Aktuell | Primärer A11y-Fokus |
|---:|---|---|---|---:|---|---|
| 1 | `src/downloads/notfallkarte-kanton-zuerich-puk.pdf` | `/downloads/notfallkarte-kanton-zuerich-puk.pdf` | Notfallkarte Kanton Zürich | 1 | `Tagged: no` | Notfallnummern und Triage zuerst, klare Lesereihenfolge |
| 2 | `src/downloads/umgang-mit-suizidgedanken-puk-zuerich.pdf` | `/downloads/umgang-mit-suizidgedanken-puk-zuerich.pdf` | Umgang mit Suizidgedanken | 1 | `Tagged: no` | Akutwarnung, Sofortkontakte, Ampellogik |
| 3 | `src/downloads/umgang-mit-manie-puk-zuerich.pdf` | `/downloads/umgang-mit-manie-puk-zuerich.pdf` | Umgang mit Manie | 1 | `Tagged: no` | Tacho-Stufen und Sicherheitsgrenze |
| 4 | `src/downloads/umgang-mit-depression-puk-zuerich.pdf` | `/downloads/umgang-mit-depression-puk-zuerich.pdf` | Umgang mit Depression | 1 | `Tagged: no` | Suizidgefahr und Schutz-vor-Gespräch-Logik |
| 5 | `src/downloads/umgang-mit-psychose-wahn-puk-zuerich.pdf` | `/downloads/umgang-mit-psychose-wahn-puk-zuerich.pdf` | Psychose / Wahn | 1 | `Tagged: no` | Schutzpfad, Reizreduktion, Sicherheitsgrenze |
| 6 | `src/downloads/krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf` | `/downloads/krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf` | Krisenplan-Vorlage – Bipolare Störung | 2 | `Tagged: no` | Arbeitsfelder und Formularlabels |
| 7 | `src/downloads/rechtliche-orientierung-angehoerige-puk-zuerich.pdf` | `/downloads/rechtliche-orientierung-angehoerige-puk-zuerich.pdf` | Rechtliche Orientierung | 2 | `Tagged: no` | Rechtsabschnitte, Disclaimer, Kontakt-/Beratungslogik |
| 8 | `src/handouts/eltern_mit_bipolarer_stoerung.pdf` | `/handouts/eltern_mit_bipolarer_stoerung.pdf` | Eltern bleiben – auch mit bipolarer Erkrankung | 2 | `Tagged: no` | Schutzkreis-Alternative, Gesprächsskripte, Kinder-Plan |

## Einzel-Handoff

### 1. Notfallkarte Kanton Zürich

**Datei:** `src/downloads/notfallkarte-kanton-zuerich-puk.pdf`  
**Dokumenttyp:** Krisen-Handout  
**HTML-Quelle:** keine separate Source-HTML im Archiv gefunden; PDF ist Remediation-Quelle.

Empfohlene Lesereihenfolge:

1. Dokumenttyp, Stand, Titel
2. Lead «Zuerst klären»
3. Rettungsring/Triage als drei geordnete Wege: Sanität 144, Polizei 117, Ärztefon 0800 33 66 55
4. Praxis in den ersten Minuten: zuerst tun, am Telefon sagen, bis Hilfe da ist, wenn nicht lebensbedrohlich
5. Kurzregel
6. Quellen und Footer

Tagging-Hinweise:

- Rettungsring-Grafik nicht als zufällige Grafikfolge lesen lassen; als geordnete Liste mit drei Wegen taggen.
- Pfeile, Kreise, Linien, Farbflächen und dekorative Icons als Artefakte markieren.
- Telefonnummern müssen in der Lesereihenfolge unmittelbar beim passenden Weg stehen.

### 2. Umgang mit Suizidgedanken

**Datei:** `src/downloads/umgang-mit-suizidgedanken-puk-zuerich.pdf`  
**Dokumenttyp:** Akutblatt / Krisen-Handout  
**HTML-Quelle:** keine separate Source-HTML im Archiv gefunden; PDF ist Remediation-Quelle.

Empfohlene Lesereihenfolge:

1. Titel und Akutlead: bei konkretem Plan, verfügbaren Mitteln oder fehlender Sicherheit sofort 144
2. Sofortkontakte: Sanität 144, Notfalldienst Zürich 0800 33 66 55, Dargebotene Hand 143
3. Suizid-Ampel: Sorge, Konkret, Notfall
4. Suizidgedanken ernst nehmen
5. Woran aufmerksam werden
6. Direkt fragen
7. Was jetzt hilft
8. Was eher schadet
9. Wann sofort handeln
10. Nächster Schritt, Quellen, Footer

Tagging-Hinweise:

- Ampel als geordnete Stufenstruktur taggen, nicht nur als Grafik.
- Akutwarnung und 144 müssen vor Detailtexten kommen.
- Bulletlisten als echte Listen auszeichnen.
- Keine methodenspezifischen Details im Alternativtext ergänzen.

### 3. Umgang mit Manie

**Datei:** `src/downloads/umgang-mit-manie-puk-zuerich.pdf`  
**Dokumenttyp:** Akutblatt / Krisen-Handout  
**HTML-Quelle:** keine separate Source-HTML im Archiv gefunden; PDF ist Remediation-Quelle.

Empfohlene Lesereihenfolge:

1. Titel und Akutlead: Gewalt, Selbstgefährdung, Kontrollverlust, Sicherheit
2. Sofortkontakte: Notfalldienst Zürich, Sanität 144, Polizei 117
3. Manie-Tacho: ansprechbar, kippend, Gefahr
4. Orientierung in der Manie
5. Woran Manie erkennen
6. Im ersten Gespräch
7. Was eher schadet
8. Wann sofort handeln
9. Nächster Schritt, Quellen, Footer

Tagging-Hinweise:

- Tacho als drei Eskalationsstufen taggen.
- Sicherheitsgrenze «144/117: Schutz vor Gespräch» nicht im Layout verlieren.
- Dekorative Tachoelemente als Artefakte markieren.

### 4. Umgang mit Depression

**Datei:** `src/downloads/umgang-mit-depression-puk-zuerich.pdf`  
**Dokumenttyp:** Akutblatt / Krisen-Handout  
**HTML-Quelle:** keine separate Source-HTML im Archiv gefunden; PDF ist Remediation-Quelle.

Empfohlene Lesereihenfolge:

1. Titel und Akutlead: bei konkretem Plan, verfügbaren Mitteln oder fehlender Sicherheit sofort 144
2. Sofortkontakte: Notfalldienst Zürich, Sanität 144, Dargebotene Hand 143
3. Depressions-Thermometer: schwere Phase, Suizidhinweise, konkret/unsicher
4. Orientierung in der Depression
5. Woran schwere Phase erkennen
6. Wie Kontakt gelingt
7. Was eher schadet
8. Wann sofort handeln
9. Nächster Schritt, Quellen, Footer

Tagging-Hinweise:

- Suizidgefahr/Sicherheitslogik muss vor allgemeiner Depressionserklärung kommen.
- Thermometer als drei Stufen auszeichnen.
- Direkte Zitate als normale Textinhalte in sinnvoller Reihenfolge taggen.

### 5. Psychose / Wahn

**Datei:** `src/downloads/umgang-mit-psychose-wahn-puk-zuerich.pdf`  
**Dokumenttyp:** Akutblatt / Krisen-Handout  
**HTML-Quelle:** keine separate Source-HTML im Archiv gefunden; PDF ist Remediation-Quelle.

Empfohlene Lesereihenfolge:

1. Titel und Akutlead: bedrohliche Lage, kein ruhiger Kontakt, Kinder gefährdet
2. Sofortkontakte: Notfalldienst Zürich, Polizei 117, Sanität 144
3. Schutzpfad: Kontakt möglich, Realität entgleitet, Bedrohung
4. Orientierung bei Psychose oder Wahn
5. Woran aufmerksam werden
6. Im Kontakt
7. Was eher schadet
8. Wann sofort handeln
9. Nächster Schritt, Quellen, Footer

Tagging-Hinweise:

- Schutzpfad als lineare Entscheidungshilfe taggen.
- Sicherheits- und Kinder-Schutz-Hinweise nicht nach Quellen oder Footer verschieben.
- Reine Pfeile und Pfad-Grafik als Artefakte markieren, wenn die Stufen textlich vorhanden sind.

### 6. Krisenplan-Vorlage – Bipolare Störung

**Datei:** `src/downloads/krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf`  
**Dokumenttyp:** Arbeitsblatt  
**HTML-Quelle:** keine separate Source-HTML im Archiv gefunden; PDF ist Remediation-Quelle.

Empfohlene Lesereihenfolge Seite 1:

1. Titel, Untertitel, Datenschutz- und Aufbewahrungshinweis
2. Metafelder: erstellt am, gemeinsam von, Version
3. Einstiegsentlastung: zuerst drei Felder ausfüllen
4. Frühwarnzeichen: Manie/Hypomanie, Depression, Schlafhinweis
5. Erste Kontakte: erster Anruf, zweiter Anruf, bei akuter Gefahr
6. Erste hilfreiche Massnahme
7. Medikamente und Behandlung

Empfohlene Lesereihenfolge Seite 2:

1. Grenzen, Klinik und Alltag
2. Meine Grenzen
3. Klinik oder Notfallweg
4. Kinder, Haushalt und Finanzen
5. Ablage und Zugriff
6. Regelmässig prüfen, Gültigkeit, nächste Überprüfung, Einverständnis
7. Sicherheitshinweis, Quellen, Footer

Tagging-Hinweise:

- Ausfüllfelder brauchen sinnvolle Formular-/Arbeitsfeldlabels. Falls echte Formularfelder nicht möglich sind, Feldtitel und Hinweistext als zusammenhängende Textstruktur taggen.
- Leere Linien, Kästen und Eingabeflächen als Artefakte markieren, sofern sie nicht als Formularfelder umgesetzt werden.
- Die Datenschutzpassage bleibt am Anfang der Lesereihenfolge.

### 7. Rechtliche Orientierung

**Datei:** `src/downloads/rechtliche-orientierung-angehoerige-puk-zuerich.pdf`  
**Dokumenttyp:** Orientierungsblatt mit Sicherheitsbezug  
**HTML-Quelle:** keine separate Source-HTML im Archiv gefunden; PDF ist Remediation-Quelle.

Empfohlene Lesereihenfolge Seite 1:

1. Titel und Lead: Schutz geht vor juristischer Klärung
2. Vier-Schritt-/Vier-Bereich-Modell: Schutz, Information, Vorsorge, Blockade
3. Wozu rechtliche Orientierung dient
4. Vier Bereiche, die oft verwechselt werden
5. Schweigepflicht richtig einordnen
6. Was eine Freigabe praktisch klären kann
7. Vorsorge nicht verwechseln

Empfohlene Lesereihenfolge Seite 2:

1. Fortsetzung Vorsorge
2. Was Sie möglichst früh klären können
3. Wann externe Beratung besonders sinnvoll ist
4. Nächster sinnvoller Schritt
5. Weiterführend-Block, Quellen, Footer

Tagging-Hinweise:

- Das Vier-Bereich-Modell als geordnete Orientierungsstruktur taggen.
- Disclaimer «ersetzt keine Rechtsberatung» muss vor Detailabschnitten liegen.
- Externe Links in Quellen als Links taggen; sichtbaren Wortlaut nicht verändern.
- Diese Datei enthält noch sichtbare Cross-References aus dem älteren Download-Bestand. Für diese A11y-Welle bleiben sie unverändert; keine redaktionelle Korrektur im Remediation-Schritt.

### 8. Eltern bleiben – auch mit bipolarer Erkrankung

**Datei:** `src/handouts/eltern_mit_bipolarer_stoerung.pdf`  
**Dokumenttyp:** Praxisblatt  
**HTML-Quelle:** `docs/handout-design-archive/eltern-mit-bipolarer-stoerung-a4-hoch-source-html/eltern_mit_bipolarer_stoerung.html`

Empfohlene Lesereihenfolge Seite 1:

1. Header, Titel, Lead
2. Worum es geht
3. Risiko heisst nicht Schicksal
4. Schutzkreis als Textalternative
5. Entlastender Kernsatz
6. Footer

Textalternative Schutzkreis:

> Der Schutzkreis zeigt fünf Bereiche, die Kinder tragen: Erklärung, Routinen, Bezugsperson, Krisenplan und Entlastung. Im Zentrum steht: Kinder spüren oft, wenn sich etwas verändert, und brauchen es nicht allein zu tragen. Nicht perfekte Kontrolle schützt Kinder, sondern frühe, verlässliche Unterstützung.

Empfohlene Lesereihenfolge Seite 2:

1. Header, Seitentitel «Konkret handeln», kurzer Lead
2. Wie man mit Kindern sprechen kann: jüngere Kinder, Schulkinder, Jugendliche
3. Kinder-Plan für schwierige Phasen
4. Worauf beim Kind achten
5. Wann es um Kindeswohl geht: Belastung, Unterstützungsbedarf, Dringlichkeit
6. Wenn Sie Unterstützung brauchen
7. Was Kindern guttut / Was Kinder zusätzlich belasten kann
8. Konkreter nächster Schritt
9. Quellen und Footer

Tagging-Hinweise:

- Schutzkreis-Grafik nicht als Bild ohne Alternative belassen.
- Gesprächsskripte als Zitat-/Textblöcke in Altersgruppen-Reihenfolge taggen.
- Kinder-Plan als Checkliste/Arbeitsstruktur taggen.
- Plus-/Minus-Block als zwei getrennte Listen taggen.

## Rückführung Ins Repo

Nach externer Remediation pro Datei:

1. Remediated PDF in demselben Pfad ersetzen.
2. Prüfen:

   ```bash
   pdfinfo <pdf> | rg "Title|Tagged|Pages|Page size"
   pdftotext <pdf> - | sed -n '1,120p'
   strings <pdf> | rg "de-CH|dc:language|/Lang"
   ```

3. Sichtprüfung: erste Seite, letzte Seite, Quellen/Footer, Nummern/Links.
4. Falls eine HTML-Quelle vorhanden ist, zusätzlich `render_measure_verify.py --final-pdf` verwenden.
5. Erst danach Status im Inventar von `needs-remediation` auf `pdfua-ok` ändern.
