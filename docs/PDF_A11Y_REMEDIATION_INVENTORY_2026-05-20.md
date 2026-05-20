# PDF-A11y Remediation Inventory

**Stand:** 20. Mai 2026  
**Scope:** Öffentliche PDFs im Produktionsbuild: 14 kanonische Handouts + 9 aktive Downloads  
**Status:** Layout-/Text-PDFs sind produktiv nutzbar, aber noch nicht PDF/UA-final. Alle geprüften öffentlichen PDFs sind aktuell `Tagged: no`.

## Kurzfazit

Die öffentliche PDF-Fläche ist inhaltlich und layoutseitig bereinigt, aber **nicht vollständig PDF-barrierefrei** im Sinn von PDF/UA. Der aktuelle HTML/Playwright-Produktionsweg erzeugt visuell korrekte, textbasierte PDFs, jedoch ohne Tag-Struktur. Für echte PDF-A11y braucht es deshalb einen separaten Remediation-Schritt in einem PDF/UA-fähigen Tool.

Wichtig: Das ist **kein aktueller Release-Blocker**, solange die Website nicht behauptet, die PDFs seien PDF/UA-konform. Es ist ein separater Qualitätsstrang.

## Methodik

Öffentliche PDF-Liste aus:

```bash
node -e 'require("./src/_data/pdfs.js").groups.canonicalHandouts'
node -e 'require("./src/_data/pdfs.js").groups.publicDownloads'
```

Technische Checks:

```bash
pdfinfo <pdf>
pdftotext <pdf> -
strings <pdf> | rg "de-CH|dc:language|/Lang"
```

Bewertet wurden:

- Produktionspfad (`/handouts/` oder `/downloads/`)
- reale Seitenzahl
- `Tagged: yes/no`
- Sprachmetadatum `de-CH`
- Remediation-Priorität
- erwarteter A11y-Aufwand

## Abnahmekriterien für PDF/UA-Final

Ein PDF gilt erst als PDF-A11y-final, wenn:

- `pdfinfo <pdf>` zeigt `Tagged: yes`
- Dokumentsprache ist `de-CH`
- Titel/Metadaten stimmen
- Lesereihenfolge ist plausibel
- Überschriften, Absätze, Listen und Links sind korrekt getaggt
- dekorative Linien, Flächen und Rahmen sind Artefakte
- informative Diagramme haben sinnvolle Alternativtexte oder eine gleichwertige Textstruktur
- Textextraktion ist lesbar und frei von Ligatur-/Umbruchfehlern
- das finale PDF besteht das vorhandene Gate mit `--final-pdf`

Beispiel:

```bash
python3 scripts/fachstelle-handout/render_measure_verify.py <html> \
  --type orientierung \
  --orientation landscape \
  --final-pdf <final-tagged.pdf>
```

## Priorisierung

**Priorität 1:** Sicherheits-, Krisen-, Rechts- und Kinder-/Familienmaterialien. Diese PDFs werden eher unter Stress oder in folgenreichen Situationen genutzt.  
**Priorität 2:** stark genutzte oder fachlich komplexe Orientierungs-/Praxisblätter.  
**Priorität 3:** entlastende Reflexions- und Beziehungsblätter mit geringerem akutem Handlungsdruck.

## Inventar

| Priorität | Datei | Titel | Seiten | Aktuell | Sprache | Status | Remediation-Hinweis |
|---:|---|---|---:|---|---|---|---|
| 1 | `/downloads/notfallkarte-kanton-zuerich-puk.pdf` | Notfallkarte Kanton Zürich | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Notfallnummern, Triage und Kontaktlogik müssen in sehr klarer Lesereihenfolge stehen. |
| 1 | `/downloads/umgang-mit-suizidgedanken-puk-zuerich.pdf` | Umgang mit Suizidgedanken | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Akutlogik, Warnhinweise und Nummern zuerst; keine dekorative Box vor Lesereihenfolge. |
| 1 | `/downloads/umgang-mit-manie-puk-zuerich.pdf` | Umgang mit Manie | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Handlungsstufen und Sicherheitsgrenze müssen screenreader-tauglich bleiben. |
| 1 | `/downloads/umgang-mit-depression-puk-zuerich.pdf` | Umgang mit Depression | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Suizidgefahr/Sicherheitslogik priorisiert taggen. |
| 1 | `/downloads/umgang-mit-psychose-wahn-puk-zuerich.pdf` | Psychose / Wahn | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Reizreduktion, Sicherheitsgrenze und Hilfeweg in linearer Reihenfolge prüfen. |
| 1 | `/downloads/krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf` | Krisenplan-Vorlage – Bipolare Störung | 2 | `Tagged: no` | `de-CH` | `needs-remediation` | Formular-/Arbeitsfelder brauchen sinnvolle Labels und Lesereihenfolge. |
| 1 | `/downloads/rechtliche-orientierung-angehoerige-puk-zuerich.pdf` | Rechtliche Orientierung | 2 | `Tagged: no` | `de-CH` | `needs-remediation` | Rechtliche Abschnitte, Disclaimer und Kontakt-/Anlaufstellenlogik klar taggen. |
| 1 | `/handouts/eltern_mit_bipolarer_stoerung.pdf` | Eltern bleiben – auch mit bipolarer Erkrankung | 2 | `Tagged: no` | `de-CH` | `needs-remediation` | Schutzkreis braucht Textalternative; Gesprächsskripte und Kinder-Plan müssen sauber linearisiert werden. |
| 2 | `/downloads/kritische-zeitpunkte-angehoerige-puk-zuerich.pdf` | Kritische Zeitpunkte | 2 | `Tagged: no` | `de-CH` | `needs-remediation` | Übergangslogik und Listenstruktur prüfen. |
| 2 | `/downloads/kurzblatt-was-stabilisiert-was-schadet-puk-zuerich.pdf` | Was stabilisiert – was schadet | 2 | `Tagged: no` | `de-CH` | `needs-remediation` | Plus-/Minus- oder Checklistenstruktur korrekt taggen. |
| 2 | `/handouts/behandlung_verstehen.pdf` | Behandlung gemeinsam verstehen | 2 | `Tagged: no` | `de-CH` | `needs-remediation` | Kompass braucht Alternative; Seite 2 mit Fragen und Kernsatz sauber strukturieren. |
| 2 | `/handouts/wenn_behandlung_abgelehnt_wird.pdf` | Wenn Behandlung abgelehnt wird | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Drei-Spuren-Karte als logische Liste/Abschnitte taggen. |
| 2 | `/handouts/a1_bipolare_stoerung_verstehen.pdf` | Die bipolare Störung verstehen | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Phasenwelle braucht Textalternative; Lesereihenfolge links/rechts prüfen. |
| 2 | `/handouts/a2_phasenverlauf.pdf` | Bipolarer Phasenverlauf | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Kurvenmodell alternativ beschreiben; Verlauf vor Detaillegende lesen lassen. |
| 2 | `/handouts/a6_bipolar_i_ii_mischzustaende.pdf` | Bipolar I, II und Mischbilder verstehen | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Schwelle/Mischbild als zwei logische Modelle taggen, nicht als zufällige Layout-Spalten. |
| 2 | `/handouts/a8_warnsignale.pdf` | Warnsignale früh erkennen | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Ampelmetapher braucht lineare Stufenstruktur. |
| 2 | `/handouts/a9_schlaf_fruehwarnsystem.pdf` | Schlaf als Frühwarnsystem | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Schlafmodell alternativ beschreiben; Listen sauber taggen. |
| 2 | `/handouts/absprachen_bevor_es_kippt.pdf` | Absprachen, bevor es kippt | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Absprachekarte/Wenn-dann-Zeile als Arbeitsstruktur taggen. |
| 2 | `/handouts/schwieriges_ruhig_ansprechen.pdf` | Schwieriges ruhig ansprechen | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Drei-Satz-Karte als geordnete Struktur taggen. |
| 3 | `/handouts/b11_hypervigilanz_erschoepfung.pdf` | Ständige Wachsamkeit und Erschöpfung | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Radar-Kreislauf als textliches Zyklusmodell beschreiben. |
| 3 | `/handouts/c6_selbstfuersorge.pdf` | Die eigenen Kräfte schützen | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Akku-Metapher alternativ beschreiben; Entlastungslogik linear halten. |
| 3 | `/handouts/a3_ambivalente_loyalitaet.pdf` | Ambivalente Loyalität | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Spannungsfeld als zwei Pole plus Mitte taggen. |
| 3 | `/handouts/a4_ambiguous_loss.pdf` | Trauer ohne klaren Abschied | 1 | `Tagged: no` | `de-CH` | `needs-remediation` | Modellbeschriftungen und Kernsatz in sinnvoller Reihenfolge taggen. |

## Empfohlene Arbeitswellen

### Welle 1 — Sicherheits- und Krisenmaterialien

Ziel: schnellster Nutzen für vulnerable Nutzungssituationen.

- Notfallkarte
- vier Akutblätter
- Krisenplan-Vorlage
- Rechtliche Orientierung
- Eltern bleiben

### Welle 2 — Komplexe Orientierungs- und Praxisblätter

Ziel: Diagramme mit hoher kognitiver Last screenreader-tauglich machen.

- Behandlung gemeinsam verstehen
- Wenn Behandlung abgelehnt wird
- A1 / A2 / A6
- Warnsignale / Schlaf
- Absprachen / Schwieriges ruhig ansprechen
- Kritische Zeitpunkte
- Kurzblatt Stabilisierung

### Welle 3 — Reflexions- und Belastungsblätter

Ziel: Restbestand abschliessen.

- Hypervigilanz
- Selbstfürsorge
- Ambivalente Loyalität
- Ambiguous Loss

## Übergabe An Externe Remediation

Pro PDF mitgeben:

- finales PDF aus `src/handouts/` oder `src/downloads/`
- zugehörige HTML-Quelle, sofern vorhanden
- gewünschte Sprache: `de-CH`
- Hinweis: dekorative Linien, Rahmen, Flächen, Pfeile und reine Hintergrundformen als Artefakte taggen
- Diagramm-Alternativtext aus dem Handout-Kontext ableiten, keine neuen fachlichen Aussagen hinzufügen
- sichtbaren Wortlaut nicht verändern

## Repo-Rückführung

Nach externer Remediation:

1. finale PDF-Datei im gleichen Pfad ersetzen
2. `pdfinfo` prüfen (`Tagged: yes`)
3. Textextraktion und Lesereihenfolge stichprobenartig prüfen
4. vorhandenes Gate mit `--final-pdf` laufen lassen
5. falls bestanden: Status im Inventar auf `pdfua-ok` ändern
