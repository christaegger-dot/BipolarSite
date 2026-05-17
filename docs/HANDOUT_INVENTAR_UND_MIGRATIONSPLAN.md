# Handout-Inventar und Migrationsplan

Stand: 17. Mai 2026  
Scope: Website `BipolarSite`, Fachstelle-Handouts und kuratierte Downloads.

## Kurzfazit

Das Repo ist bereit für neue Handouts, aber der beste nächste Schritt ist keine
blinde Neuproduktion. Der Bestand ist bereits gross und fachlich wertvoll:
13 kuratierte Downloads, 25 aktive Web-Handouts, 4 Legacy-Aliasse und 28
Markdown-Drafts. Die neue A4-quer-Familie beginnt mit HO-27 und HO-28; der Rest
liegt überwiegend im älteren 1- bis 3-seitigen PDF-/Draft-Workflow.

Empfehlung: Bestand zuerst kuratieren, dann gezielt neu bauen. Neue Handouts
sollen nur entstehen, wenn sie eine echte Lücke füllen oder ein bestehendes
Blatt bewusst ersetzen.

## Leitentscheidungen

- **Aktive Downloads bleiben stabil.** `DL-*` sind kuratierte Kernmaterialien
  und dürfen nicht ohne Redirect-/Bookmark-Plan gelöscht werden.
- **Legacy-Aliasse bleiben vorerst.** `notfallkarte`, `kurzblatt_stabilisiert`,
  `b3_kritische_zeitpunkte` und `rechtliche_orientierung` existieren bewusst
  weiter für alte Direktlinks.
- **Neue visuelle Linie:** A4 quer, 1 Seite, weisser Druckgrund, mindestens eine
  Visualisierung, konkreter nächster Schritt, 14 mm Randnorm.
- **PDF/UA bleibt separates Final-Gate.** Der aktuelle Website-Audit prüft
  Metadaten, Textauszug, A4, Quellen und Struktur; er ersetzt kein
  `Tagged: yes`.
- **Löschen erst nach Konsolidierungsentscheid.** Viele vermeintliche Dubletten
  sind bewusst als `download` plus `handout-preview` getrennt.

## Aktueller Bestand

### Kuratierte Downloads

| ID | Key | Titel | Status | Empfehlung |
|---|---|---|---|---|
| DL-01 | `notfallkarte` | Notfallkarte Kanton Zürich | Kern-Download | Behalten; Krisenmaterial, nicht in Querformat-Familie umziehen. |
| DL-02 | `krisenplanVorlage` | Krisenplan-Vorlage – Bipolare Störung | Kern-Download | Behalten; ausfüllbare Vorlage separat behandeln. |
| DL-03 | `kurzblattStabilisiert` | Was stabilisiert - was schadet | Kern-Download | Behalten; später als Praxisblatt neu visualisieren prüfen. |
| DL-04 | `suizidgedanken` | Umgang mit Suizidgedanken | Akut-Download | Behalten; Krisen-Handout, nicht mit Orientierungsblättern mischen. |
| DL-05 | `psychoseWahn` | Psychose / Wahn | Akut-Download | Behalten; Krisen-Handout. |
| DL-06 | `manie` | Umgang mit Manie | Akut-Download | Behalten; Parallelität zu HO-17 bewusst prüfen. |
| DL-07 | `depression` | Umgang mit Depression | Akut-Download | Behalten; Parallelität zu HO-18 bewusst prüfen. |
| DL-08 | `warnsignale` | Warnsignale früh erkennen | Kern-Download | Behalten; mögliche Konsolidierung mit HO-01. |
| DL-09 | `krisenplanGuide` | Krisenplan erstellen | Kern-Download | Behalten; mögliche Konsolidierung mit HO-14. |
| DL-10 | `grenzsetzungPraxis` | Grenzsetzung | Kern-Download | Behalten; mögliche Konsolidierung mit HO-12. |
| DL-11 | `kritischeZeitpunkte` | Kritische Zeitpunkte | Kern-Download | Behalten; Legacy-Pfad bleibt. |
| DL-12 | `rechtlicheOrientierung` | Rechtliche Orientierung | Kern-Download | Behalten; Legacy-Pfad bleibt. |
| DL-13 | `sichtbarkeitBelastung` | Wenn Belastung unterschiedlich sichtbar wird | Kern-Download | Behalten; mögliche Konsolidierung mit HO-26. |

### Aktive Web-Handouts

| ID | Key | Titel | Format/Status | Empfehlung |
|---|---|---|---|---|
| HO-01 | `a8_warnsignale` | Warnsignale früh erkennen | 2 Seiten, regenerated | Hoch priorisieren: als A4-quer-Ampel oder mit DL-08 konsolidieren. |
| HO-02 | `b1_18_belastungen` | 18 Belastungen | 2 Seiten, regenerated | Überarbeiten: vermutlich zu breit; als visuelle Belastungslandkarte oder mehrere Blätter splitten. |
| HO-03 | `a5_affiliate_stigma` | Stigma der Angehörigen | 2 Seiten, regenerated | Migrieren: gute Orientierungsblatt-Kandidatin mit Stigma-Trichter/Spirale. |
| HO-04 | `b9_depression_partner` | Depression bei Angehörigen | 2 Seiten, regenerated | Migrieren: hohe Praxisrelevanz, Abklärungs- oder Belastungsschwelle visualisieren. |
| HO-05 | `b10_trennung_scheidung` | Beziehung an Grenzen | 2 Seiten, regenerated | Später prüfen: komplexes Entscheidungsthema, evtl. Praxisblatt statt Orientierungsblatt. |
| HO-06 | `a4_ambiguous_loss` | Trauer ohne klaren Abschied | 2 Seiten, regenerated | Migrieren: sehr guter visueller Kandidat, Nähe/Verlust-Spannungsfeld. |
| HO-07 | `b2_erosion_solidaritaet` | Beziehung unter Druck | 2 Seiten, regenerated | Migrieren/ersetzen: thematisch nah an neuer Querformat-Familie. |
| HO-08 | `b4_mechanismen_erosion` | Schonhaltung und Co-Isolation | 2 Seiten, regenerated | Mit HO-07 zusammen prüfen; Gefahr von Überlappung. |
| HO-10 | `b5_loyalitaetskonflikte` | Loyalitätskonflikte | 2 Seiten, regenerated | Konsolidieren mit HO-13 prüfen; beide behandeln Loyalitätsdynamik. |
| HO-11 | `expressed_emotions` | Kritik, Überforderung, Teufelskreis | 2 Seiten, regenerated | Migrieren: Kreislauf-Thema, sehr geeignet für A4 quer. |
| HO-12 | `grenzsetzung` | Grenzsetzung | 2 Seiten, regenerated | Mit DL-10 konsolidieren; ggf. als Praxisblatt/Formulierungsbaukasten neu bauen. |
| HO-13 | `a3_ambivalente_loyalitaet` | Ambivalente Loyalität | 2 Seiten, regenerated | Hoch priorisieren: Spannungsfeld-Visual, Standalone/Footer historisch relevant. |
| HO-14 | `c1_krisenplan` | Krisenplan erstellen | 2 Seiten, regenerated | Mit DL-09 konsolidieren; Krisen-/Praxislogik sauber trennen. |
| HO-15 | `c2_suizidgedanken` | Umgang mit Suizidgedanken | 1 Seite, regenerated | Behalten; Krisen-Handout, nicht in Orientierungsblatt-Familie ziehen. |
| HO-16 | `c3_psychose_wahn` | Psychose / Wahn | 1 Seite, regenerated | Behalten; Krisen-Handout. |
| HO-17 | `c4_manie` | Umgang mit Manie | 1 Seite, regenerated | Mit DL-06 abgleichen; Akut-/Orientierungsrolle klären. |
| HO-18 | `c5_depression` | Umgang mit Depression | 1 Seite, regenerated | Mit DL-07 abgleichen; Akut-/Orientierungsrolle klären. |
| HO-19 | `b7_behandlung_ambivalenz` | Behandlung und Ambivalenz | 2 Seiten, regenerated | Migrieren: Entscheidungspfad/Gesprächsspielraum passt A4 quer. |
| HO-22 | `c6_selbstfuersorge` | Selbstfürsorge als Belastungsmanagement | 2 Seiten, regenerated | Hoch priorisieren: Werkzeugkasten/Mini-Plan, sehr kühlschranktauglich. |
| HO-23 | `d4_solidaritaet_wellen` | Was langfristig trägt | 2 Seiten, regenerated | Migrieren: Säulen-/Wellenmodell, gute Querformat-Logik. |
| HO-24 | `transformationsreise` | Veränderung über Zeit | 2 Seiten, regenerated | Später prüfen; eher narratives Orientierungsblatt. |
| HO-25 | `trialog` | Trialog und Zusammenarbeit | 2 Seiten, regenerated | Später prüfen; Dreieck-/Perspektivenvisualisierung. |
| HO-26 | `b6_geschlechtsspezifisch` | Wenn Belastung unterschiedlich sichtbar wird | 3 Seiten, regenerated | Mit DL-13 konsolidieren; nicht neu bauen, bevor Rolle geklärt ist. |
| HO-27 | `a9_schlaf_fruehwarnsystem` | Schlaf als Frühwarnsystem | A4 quer, neu | Behalten; Referenz für neue visuelle Orientierungsblätter. |
| HO-28 | `b11_hypervigilanz_erschoepfung` | Ständige Wachsamkeit und Erschöpfung | A4 quer, neu | Behalten; Referenz für neue visuelle Orientierungsblätter. |

## Dubletten und Konsolidierungscluster

Diese Cluster sollten vor Neuproduktion entschieden werden:

| Cluster | Betroffene Dateien | Problem | Vorschlag |
|---|---|---|---|
| Warnsignale | DL-08, HO-01, HO-27 | Warnsignale allgemein vs. Schlaf als Spezialwarnsignal | HO-27 behalten; DL-08/HO-01 zusammenführen oder HO-01 als neues A4-quer-Ampelblatt ersetzen. |
| Manie/Depression akut | DL-06, DL-07, HO-17, HO-18 | Akutmaterial und Web-Handouts doppeln sich | Krisen-Handouts als Downloads behalten; HO-Versionen nur behalten, wenn sie andere Rolle haben. |
| Krisenplan | DL-02, DL-09, HO-14 | Vorlage, Guide und Handout überlappen | Vorlage behalten; Guide/HO-14 redaktionell konsolidieren. |
| Grenzsetzung | DL-10, HO-12 | Gleicher Titel, ähnliche Funktion | Als Praxisblatt neu aufbauen oder eine Version zur kanonischen machen. |
| Rechtliches | DL-12, Legacy `rechtliche_orientierung` | Download plus alter Handout-Pfad | Behalten; keine Neuproduktion ohne Fachentscheid. |
| Sichtbarkeit/Rollen | DL-13, HO-26 | 3-Seiten-Kernmaterial plus Handout | Konsolidieren, nicht parallel erweitern. |
| Loyalität | HO-10, HO-13 | Loyalitätskonflikte vs. ambivalente Loyalität | Ein Orientierungsblatt und ggf. ein Praxisblatt daraus machen. |
| Erosion/Schonhaltung | HO-07, HO-08, HO-28 | Beziehungserosion, Co-Isolation, Hypervigilanz liegen nahe beieinander | Als thematische Familie ordnen; HO-28 ist neuer Stilanker. |

## Priorisierung

### Sofort als neue Querformat-Familie fortführen

Diese Blätter passen fachlich und gestalterisch am besten zur neuen
Kühlschrank-/Visualisierungslogik:

1. `a8_warnsignale` — Ampel für Frühwarnzeichen, als allgemeiner Gegenpart zu
   `a9_schlaf_fruehwarnsystem`.
2. `a3_ambivalente_loyalitaet` — Spannungsfeld der vier Kräfte.
3. `expressed_emotions` — Kreislauf: Sorge → Kontrolle/Kritik → Stress →
   Symptomdruck.
4. `c6_selbstfuersorge` — Werkzeugkasten oder Wochen-Mini-Plan.
5. `b2_erosion_solidaritaet` und `b4_mechanismen_erosion` — nur nach
   Konsolidierungsentscheid, weil sie eng zusammenliegen.

### Danach migrieren

- `a4_ambiguous_loss`
- `a5_affiliate_stigma`
- `b7_behandlung_ambivalenz`
- `b9_depression_partner`
- `d4_solidaritaet_wellen`
- `trialog`

### Vorerst nicht neu bauen

- Krisen-Handouts: `c2_suizidgedanken`, `c3_psychose_wahn`, `c4_manie`,
  `c5_depression`, plus die akuten Downloads. Diese sind funktional anders und
  sollen nicht in die Orientierungsblatt-Familie vermischt werden.
- Ausfüllbare oder rechtliche Kernmaterialien: `krisenplanVorlage`,
  `rechtlicheOrientierung`.

## Lösch- und Archivierungsregeln

Nicht löschen ohne eigenen PR:

- Dateien in `src/downloads/`
- Legacy-PDFs, die in `legacyPdfAliases` geführt sind
- PDFs, die in `src/_data/pdfs.js` aktiv referenziert sind
- Markdown-Drafts, solange ihre PDF-Version noch aktiv ist

Archivieren/löschen ist erst sinnvoll, wenn:

1. ein Ersatz-PDF im neuen Workflow erzeugt ist,
2. `src/_data/pdfs.js` auf den Ersatz zeigt,
3. alte Direktlinks als Alias oder Redirect dokumentiert sind,
4. `npm run audit:release:ci` grün bleibt,
5. Christa den fachlichen Ersatz bestätigt hat.

## Empfohlener nächster Arbeitsblock

Arbeitsblock 1: **Warnsignale-Familie**

- Ziel: allgemeines Warnsignale-Blatt als A4 quer neu bauen.
- Ausgangsmaterial: `src/handout-drafts/a8_warnsignale.md`, DL-08, HO-01,
  neue Referenz HO-27.
- Visualisierung: echte Ampel oder Frühwarnzeichen-Tacho.
- Entscheidung vor Start: Soll DL-08 durch neue HO-01 ersetzt werden oder als
  Kern-Download separat bleiben?

Arbeitsblock 2: **Loyalität/Bindung**

- Ziel: `a3_ambivalente_loyalitaet` und `b5_loyalitaetskonflikte` entflechten.
- Visualisierung: Spannungsfeld/Kompass.
- Entscheidung vor Start: Ein gemeinsames Orientierungsblatt plus späteres
  Praxisblatt, oder zwei getrennte Blätter?

Arbeitsblock 3: **Selbstschutz**

- Ziel: `c6_selbstfuersorge` als handlungsnahes Praxis-/Orientierungsblatt.
- Visualisierung: Werkzeugkasten, Akku oder Wochen-Mini-Plan.
- Vorteil: hoher Nutzen, wenig Quellenrisiko, sehr gut druckbar.

## Arbeitsweise für jeden Migrations-PR

1. Markdown-Draft lesen und als Inhalt nicht ungeprüft übernehmen.
2. Dokumenttyp festlegen.
3. Visualisierung aus Diagramm-Bibliothek wählen oder neu registrieren.
4. HTML aus `docs/fachstelle-handout-workflow/fachstelle-handout-starter.html`
   ableiten.
5. `npm run handout:render -- _handout_work/<slug>.html --type orientierung --orientation landscape`
   ausführen.
6. PDF/PNG visuell prüfen.
7. `src/_data/pdfs.js` erst aktualisieren, wenn Ersatz und Audit grün sind.
8. Alte Datei nur nach Konsolidierungsentscheidung archivieren oder als Alias
   erhalten.

