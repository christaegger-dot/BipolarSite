# Handout Content & Layout Audit

Stand: 2026-05-12

## Kurzfazit

Die Handouts sind inzwischen technisch deutlich besser als im April-Audit: Die aktiven PDFs sind A4, klein, gueltig, textbasiert und ueber das Release-Audit auffindbar. Inhaltlich ist der Bestand stark validierend, gut an die Website angebunden und besonders in Akutblaettern klar handlungsorientiert.

Nicht fertig ist der Bestand trotzdem. Die groessten offenen Risiken liegen nicht mehr bei kaputten PDFs, sondern bei drei Qualitaetsfragen:

1. **PDF-Barrierefreiheit**: Alle aktiven PDFs sind ungetaggt (`Tagged: no`). Fast alle ReportLab-generierten PDFs haben keine XMP-Sprachmetadaten. Das ist fuer Screenreader-PDF-Nutzung und Langzeitqualitaet ein echter Gap.
2. **Layout-Dichte**: Das aktuelle A4-Template ist konsistent, aber sehr textlastig. Viele Blaetter wirken wie verdichtete Website-Texte auf Papier, nicht wie eigenstaendige Handouts mit visueller Fuehrung.
3. **Redaktionelle Differenzierung**: Viele Angehoerigen-Handouts enden mit sehr aehnlichen Entlastungs-, Unterstuetzungs- und Naechster-Schritt-Mustern. Das ist warm und sicher, aber teilweise redundant.

Release-Urteil: **kein P0-Blocker**, aber ein sinnvoller naechster Qualitaetsschritt waere ein fokussierter Redesign-/Redaktions-PR fuer die Akutblaetter und den PDF-Generator.

## Methodik

Geprueft wurden:

- `src/_data/pdfs.js`
- alle aktiven PDFs in `src/handouts/` und `src/downloads/`
- alle Markdown-Quellen in `src/handout-drafts/`
- `scripts/generate-handout-pdf.py`
- technische PDF-Metadaten via `pdfinfo`
- Text-Extraktion via `pdftotext -layout`
- erstes Seitenrendering aller aktiven PDFs via `pdftoppm`

Der inhaltliche Review ist redaktionell, UX- und A11y-orientiert. Er ersetzt keine medizinische, juristische oder institutionelle Fachfreigabe.

## Externe Plausibilitaetsquellen

Stichprobenartig wurden zentrale Kontaktangaben gegen offizielle Quellen abgeglichen:

- Aerztefon bestaetigt `0800 33 66 55` und verweist bei akuter Lebensgefahr auf `144`: https://www.aerztefon.ch/
- PUK Notfallseite nennt Erwachsene `+41 58 384 20 00` und Kinder/Jugendliche `+41 58 384 66 66`: https://www.pukzh.ch/ueber-uns/kontakt/notfall/
- Dargebotene Hand verwendet `143`: https://www.143.ch/
- Pro Juventute 147 beschreibt `147` als kostenlose, vertrauliche Beratung fuer Kinder/Jugendliche: https://www.147.ch/de/beratung/147/
- Kanton Zuerich beschreibt `142` als 24/7-Opferhilfe-Nummer: https://www.zh.ch/de/sicherheit-justiz/opferhilfe.html

## Bestand

Aktive PDFs:

- `src/downloads/`: 13 Dateien
- `src/handouts/`: 27 Dateien
- davon mehrere Byte-identische Inhalte zwischen Archiv-Handout und promoted Download, z.B. `c2_suizidgedanken.pdf` und `umgang-mit-suizidgedanken-puk-zuerich.pdf`

Technischer Status:

- alle geprueften aktiven PDFs: A4
- alle geprueften aktiven PDFs: `Tagged: no`
- fast alle ReportLab-generierten PDFs: kein XMP-Sprachmetadata-Stream
- `krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf`: XMP-Sprache `de-CH`, aber ebenfalls ungetaggt
- Text ist extrahierbar und die Dateien sind klein

## P1 Befunde

### P1.1 PDF-Barrierefreiheit endet aktuell bei "text-extrahierbar"

Der Release-Audit prueft A4, Manifest, Metadaten-Titel und extrahierbaren Text. Das ist stark, aber nicht genug fuer echte PDF-A11y:

- alle aktiven PDFs sind ungetaggt
- Ueberschriften, Listen und Abschnitte sind nicht als semantische PDF-Struktur vorhanden
- Lesereihenfolge wird indirekt ueber Layout-Text angenaehert, aber nicht semantisch garantiert
- Sprache ist nicht systematisch als PDF/XMP-Metadatum gesetzt

Konkreter Fix:

- Generator um konsistente XMP-Sprachmetadaten `de-CH` erweitern
- CI-Check fuer `Tagged: no` noch nicht hart machen, aber als Warnung im PDF-Audit ausgeben
- fuer die wichtigsten Akutblaetter zusaetzlich einen barrierearmen HTML-Text-Alternativpfad oder sauber getaggten Export pruefen

Prioritaet: zuerst `notfallkarte`, `c2_suizidgedanken`, `c3_psychose_wahn`, `c4_manie`, `c5_depression`, `c1_krisenplan`.

### P1.2 Akutblaetter sind klar, aber die Notfalllogik sollte visuell noch frueher greifen

Die Akutblaetter enthalten die richtigen harten Signale: 144/117, nicht allein tragen, Schutz vor Kommunikation. Inhaltlich ist das gut. Layoutseitig sitzen die Hilfekontakte aber oft unten als kleines Hilfemodul. In einer akuten Lage ist das zu spaet und zu klein.

Betroffen:

- `src/handout-drafts/c2_suizidgedanken.md`
- `src/handout-drafts/c3_psychose_wahn.md`
- `src/handout-drafts/c4_manie.md`
- `src/handout-drafts/c5_depression.md`
- promoted Download-Kopien derselben Inhalte

Konkreter Fix:

- Akutblatt-Template als eigene Variante einfuehren
- oben rechts oder direkt unter dem roten Callout eine kompakte "Jetzt anrufen"-Leiste setzen
- Telefonnummern groesser als normalen Body setzen
- "Wenn konkret: 144/117" staerker als Blickfang fuehren
- Help-Module unten nur als zweite Ebene behalten

### P1.3 Layout-Dichte ist fuer psychoedukative Handouts zu hoch

Die Renderings zeigen ein sehr konsistentes, aber stark verdichtetes Muster: kleiner Body, viele Listen, wenig visuelle Modelle. Das ist fuer ein Wartungstemplate effizient, aber nicht fuer alle Inhalte ideal. Gerade Angehoerige in Ueberlastung profitieren von weniger Text und klareren Entscheidungshilfen.

Besonders dicht:

| Datei | Seiten | Woerter | Befund |
|---|---:|---:|---|
| `b6_geschlechtsspezifisch.pdf` / `belastung-unterschiedlich-sichtbar...pdf` | 3 | ca. 918 | inhaltlich differenziert, aber sehr viel Fliesstext; braucht Diagramm/Matrix |
| `b1_18_belastungen.pdf` | 3 | ca. 676 | Listen stark, aber "18 Belastungen" sollte visuell gruppierter werden |
| `rechtliche_orientierung.pdf` | 2 | ca. 614 | hochdichtes Recht/System-Thema; braucht Disclaimer und Entscheidungsbaum |
| `b10_trennung_scheidung.pdf` | 2 | ca. 603 | gutes Thema, aber Entscheidungspfade koennten visuell klarer sein |
| `b3_kritische_zeitpunkte.pdf` | 2 | ca. 601 | starker Inhalt, aber "Zeitpunkt-Typen" sollten als Phasenkarte erscheinen |

Konkreter Fix:

- Standard-Template nicht weiter komprimieren, sondern fuer Nicht-Akut-Handouts 2- bis 3-Seiten als normal akzeptieren
- pro Handout einen sichtbaren Kernmechanismus einbauen: Matrix, Zeitlinie, Entscheidungsbaum, Saeulen, Ampel oder Kreislauf
- weniger Endlisten, mehr "Was ist der eine naechste Schritt?"

### P1.4 Einige Frontmatter-Ziele sind stale

Mehrere Drafts behaupten `target_format: "A4, 1 Seite"`, erzeugen aber 2 oder 3 Seiten. Das ist kein User-Facing-Bug, aber ein Review-Problem: Es laedt dazu ein, Layoutqualitaet gegen ein falsches Ziel zu bewerten.

Beispiele:

- `a3_ambivalente_loyalitaet`: 2 Seiten trotz Ziel "1 Seite"
- `a4_ambiguous_loss`: 2 Seiten trotz Ziel "1 Seite"
- `a5_affiliate_stigma`: 3 Seiten trotz Ziel "1 Seite"
- `b1_18_belastungen`: 3 Seiten trotz Ziel "1 Seite"
- `b6_geschlechtsspezifisch`: 3 Seiten trotz Ziel "1 Seite"
- `rechtliche_orientierung`: 2 Seiten trotz Ziel "1 Seite"

Konkreter Fix:

- `target_format` in den Drafts auf realistische Zielwerte aktualisieren
- optional CI-Warnung: Frontmatter-Ziel darf nicht grob vom echten PDF-Seitenumfang abweichen

## P2 Befunde

### P2.1 Viele Handouts wiederholen dieselbe Trost- und Entlastungsdramaturgie

Die warme Tonalitaet ist eine Staerke. Aber viele Handouts folgen fast identisch:

- "Worum es geht"
- "Woran Sie es merken"
- "Was hilft"
- "Was nicht hilft"
- "Ein hilfreicher Satz"
- "Naechster sinnvoller Schritt"
- Dargebotene Hand / Aerztefon

Das ist sicher und konsistent, aber auf Dauer monoton. Besonders bei thematisch nahen Blaettern wie `a3`, `a4`, `a5`, `b5`, `b9`, `c6` entsteht Wiederholung.

Konkreter Fix:

- pro Cluster bewusst unterschiedliche Dramaturgien definieren
- nicht jedes Handout braucht "Ein hilfreicher Satz"
- "Naechster Schritt" staerker handlungsspezifisch machen
- Dargebotene Hand/Aerztefon nicht reflexhaft in jedem nicht-akuten Blatt, sondern kontextbezogen

### P2.2 Rechtliche Orientierung braucht eine klarere Abgrenzung

`rechtliche_orientierung` ist ruhig und hilfreich, aber das Thema ist rechtlich sensibel. Das Blatt sollte deutlicher sagen, dass es Orientierung ist und keine Rechtsberatung ersetzt. Ausserdem sollte es die Eskalationslogik zwischen Schutz, Behandlung, Schweigepflicht, FU/KESB und externer Beratung noch staerker als Entscheidungsbaum zeigen.

Konkreter Fix:

- Hinweis "keine Rechtsberatung" aufnehmen
- Pro Mente Sana / Ombudsstellen / kantonale Stellen als naechste Beratungslogik klarer differenzieren
- Inhalt fachlich-juristisch freigeben lassen

### P2.3 Arbeitsblaetter brauchen Datenschutz-/Aufbewahrungs-Hinweis

Die Krisenplan-Vorlage ist ein ausfuellbares bzw. ausfuellorientiertes Material. Die PDF-Review-Checkliste fordert bereits einen Datenschutz-Hinweis bei Arbeitsblaettern. Inhaltlich sollte klarer sein:

- ausgefuellte Blaetter enthalten sensible Gesundheitsdaten
- nur mit vertrauenswuerdigen Personen teilen
- Ausdruck sicher aufbewahren
- digitale Kopien bewusst speichern

Betroffen:

- `src/downloads/krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf`
- `src/handout-drafts/c1_krisenplan.md` indirekt, wenn auf die Vorlage verwiesen wird

### P2.4 Akut- und Langstrecken-Handouts brauchen sichtbar verschiedene Layout-Sprachen

Aktuell sieht fast alles nach demselben Template aus. Fuer die Website ist Konsistenz gut, fuer Nutzungssituationen waere Differenzierung besser:

- Akut: gross, wenig Text, Nummern sofort, Schutzlogik
- Orientierung: Diagramm + kurze Erklaerung
- Reflexion: ruhiger Text, Notiz-/Frageimpuls
- Arbeitsblatt: Felder, Datenschutz, Drucklogik

Konkreter Fix:

- `type` aus Frontmatter als Template-Variante nutzen
- mindestens Varianten fuer `Akutblatt`, `Orientierungsblatt`, `Reflexionsblatt`, `Arbeitsblatt`

## Per-PDF Priorisierung

| Prioritaet | PDF / Draft | Empfehlung |
|---|---|---|
| P1 | `c2_suizidgedanken` | Akutlayout, Nummern frueher/groesser, PDF-Metadaten |
| P1 | `c3_psychose_wahn` | Akutlayout, Schutz-vor-Gespraech visuell staerker |
| P1 | `c4_manie` | Akutlayout, 144/117-Leiste, Risiko-Trigger klarer scannbar |
| P1 | `c5_depression` | Akutlayout, Suizidfrage und Hilfen visuell nach oben |
| P1 | `notfallkarte` | Nummern sehr gut; Sprache/Tags/Print-A11y nachziehen |
| P1 | `krisenplan-vorlage` | Datenschutz-/Aufbewahrungshinweis; PDF-A11y |
| P1 | `rechtliche_orientierung` | Rechtsberatungs-Abgrenzung, Entscheidungsbaum, Fachfreigabe |
| P2 | `b6_geschlechtsspezifisch` | Textdichte reduzieren, sichtbare/unsichtbare Belastung als Matrix |
| P2 | `b1_18_belastungen` | 18 Punkte clustern und visuell ordnen |
| P2 | `b3_kritische_zeitpunkte` | Phasen-/Zeitpunktkarte statt reiner Textlogik |
| P2 | `b10_trennung_scheidung` | Schutz-/Abstands-/Trennungspfade als Entscheidungsmodell |
| P2 | `grenzsetzung` | Beispiel-Saetze sehr gut; als Formulierungsbaukasten layouten |
| P2 | `expressed_emotions` | Kreislauf-Visual priorisieren; bestehende Learnings systematisieren |
| P2 | `c1_krisenplan` | stärker mit Vorlage verzahnen; "erst 3 Felder" visuell hervorheben |
| P3 | `a3_ambivalente_loyalitaet` | Redundanz zu `b5` reduzieren; staerker gefuehlsorientiert halten |
| P3 | `a4_ambiguous_loss` | gutes Validierungsblatt; als Trauer-/Verlustkarte visualisieren |
| P3 | `a5_affiliate_stigma` | sehr textdicht; soziale Isolation als Eskalationspfad zeigen |
| P3 | `b2_erosion_solidaritaet` | Beziehungserosion als 3-Phasen-Modell staerker visualisieren |
| P3 | `b4_mechanismen_erosion` | Schonhaltung/Co-Isolation als Zwei-Spalten-Modell stark geeignet |
| P3 | `b5_loyalitaetskonflikte` | Pole gut; mit `a3` und `b10` dramaturgisch entdoppeln |
| P3 | `b7_behandlung_ambivalenz` | fachlich solide; Entscheidungslogik "Gesprächsspielraum vs. Notfall" visualisieren |
| P3 | `b9_depression_partner` | guter Inhalt; Selbstcheck-Box wuerde Nutzung verbessern |
| P3 | `c6_selbstfuersorge` | inhaltlich gut; eigenes Termin-/Ressourcen-Miniplan-Element |
| P3 | `d4_solidaritaet_wellen` | Saeulen-Metapher sehr passend; als echtes Saeulendiagramm |
| P3 | `kurzblatt_stabilisiert` | Funktional stark; Layout als schnelle Checkliste optimieren |
| P3 | `transformationsreise` | vorsichtig formuliert; gutes Reflexionsblatt, weniger Akutlogik noetig |
| P3 | `trialog` | Rollenmodell visuell stark geeignet; Gespraechsvorbereitung als Checkliste |

## Empfohlene Umsetzung

### PR 1: PDF-Generator und Akutlayout

- Generator setzt XMP-Sprache `de-CH`
- Generator unterscheidet `type: "Akutblatt"` layoutseitig
- Akutblaetter zeigen Nummern/Schutzlogik frueher und groesser
- `target_format` fuer die bearbeiteten Drafts korrigieren
- PDFs neu generieren
- Release-Audit erweitert um Warnung fuer fehlende XMP-Sprache

Betroffene Erstgruppe:

- `c2_suizidgedanken`
- `c3_psychose_wahn`
- `c4_manie`
- `c5_depression`
- `notfallkarte`

### PR 2: Arbeitsblatt- und Rechtsmaterial

- Krisenplan-Vorlage mit Datenschutz-/Aufbewahrungshinweis
- `c1_krisenplan` staerker mit Vorlage verzahnen
- `rechtliche_orientierung` mit Disclaimer und Entscheidungsbaum
- fachliche/juristische Review-Notiz im PR dokumentieren

### PR 3: Layoutsystem fuer Orientierungsblaetter

- Matrix/Diagramm-Block fuer `b6`, `b1`, `b3`, `b10`, `grenzsetzung`
- weniger rein lineare Listen
- Cluster-spezifische Dramaturgie statt identischer Abschlussformel

## Was bereits gut ist

- Tonalitaet ist ueberwiegend nicht stigmatisierend und nicht moralisierend.
- Akutblaetter vermeiden Bagatellisierung und benennen klare Handlungsgrenzen.
- Schweizer Kontext und Kanton-Zuerich-Pfade sind sichtbar.
- Inhalte sind stark an Website-Module angebunden.
- PDF-Bestand ist klein, A4 und textbasiert.
- Release-Audit schuetzt inzwischen vor Manifest-/Datei-/Text-Drift.

## Offene fachliche Freigaben

Vor einem umfassenden inhaltlichen Redesign sollten diese Punkte fachlich bestaetigt werden:

- medizinische Akutformulierungen in Suizid, Psychose, Manie, Depression
- Telefonnummern und Zustandslogik fuer Kanton Zuerich
- rechtliche Aussagen zu Schweigepflicht, FU/KESB, Vorsorgeauftrag, Patientenverfuegung
- Datenschutzhinweise fuer ausgefuellte Krisenplaene

Die redaktionelle Richtung ist klar genug fuer einen technischen/UX-PR. Die fachliche Schlussfreigabe bleibt bei der Fachstelle bzw. einer qualifizierten medizinisch-juristischen Verantwortung.
