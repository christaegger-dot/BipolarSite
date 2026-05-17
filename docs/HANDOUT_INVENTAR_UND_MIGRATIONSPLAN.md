# Handout-Inventar und Migrationsplan

Stand: 17. Mai 2026  
Scope: Website `BipolarSite`, Fachstelle-Handouts und kuratierte Downloads.

## Zweck

Dieses Dokument ist die Baukarte für den Neubau der Fachstelle-Handouts. Es
ersetzt kein Archiv, sondern beantwortet drei operative Fragen:

1. Was bleibt stabil und wird nicht angefasst?
2. Wo braucht es vor dem Neubau eine Konsolidierungsentscheidung?
3. Welche Handouts werden als Nächstes im neuen A4-quer-Workflow gebaut?

## Executive Decision

Das Paket ist geordnet genug, um mit neuen Handouts zu starten. Der beste Start
ist aber eine kontrollierte Migration aus dem vorhandenen Bestand, nicht eine
freie Neuproduktion auf leerer Fläche.

Die erste Neubauwelle soll bestehende, fachlich wertvolle Themen in die neue
visuelle Linie bringen:

- A4 quer, eine Seite, weisser Druckgrund
- mindestens eine Visualisierung, Diagramm oder Metapher
- entlastender Kernsatz plus konkreter nächster Schritt
- 14 mm symmetrische Randnorm
- Quellen- und Vollbibliographie-Entscheid pro Handout
- PDF/UA als separates Final-Gate, solange Playwright-PDFs `Tagged: no` bleiben

## Inventar-Snapshot

| Bereich | Bestand | Neubau-Relevanz |
|---|---:|---|
| Kuratierte Downloads | 13 | Stabil halten; nur mit Redirect-/Alias-Plan ersetzen. |
| Aktive Web-Handouts | 25 | Hauptquelle für die Migration. |
| Legacy-Aliasse | 4 | Behalten, solange alte Direktlinks existieren. |
| Markdown-Drafts | 28 | Inhaltliche Rohquelle, nicht ungeprüft übernehmen. |
| Neue A4-quer-Referenzen | 2 | `a9_schlaf_fruehwarnsystem`, `b11_hypervigilanz_erschoepfung`. |

Die lokalen HTML-Vorläufer zu HO-27/HO-28 sind als Herkunftsmaterial unter
`docs/handout-design-archive/ho-27-ho-28-source-html/` archiviert. Sie sind
Referenz, aber keine kanonische Produktionsquelle.

## Arbeits-Spuren

### Spur A: Stabil Halten

Diese Dateien sind funktionsrelevant und sollen nicht Teil der ersten
Neubau-Welle sein:

| Bereich | Beispiele | Regel |
|---|---|---|
| Akut- und Krisenmaterial | `suizidgedanken`, `psychoseWahn`, `manie`, `depression`, HO-15 bis HO-18 | Behalten; nicht mit Orientierungsblättern vermischen. |
| Ausfüllbare Materialien | `krisenplanVorlage` | Separater Dokumenttyp; nicht als Kühlschrank-Handout umbauen. |
| Rechtliche Kernmaterialien | `rechtlicheOrientierung`, Legacy-Alias `rechtliche_orientierung` | Nur mit fachlichem Review ändern. |
| Bestehende Direktlinks | alle `legacyPdfAliases` | Behalten oder bewusst redirecten. |
| Aktive Downloads | alle `DL-*` | Nicht löschen, bevor Ersatz, Alias und Audit stehen. |

### Spur B: Erst Konsolidieren

Diese Themen sind wertvoll, aber im Bestand überlappend. Vor einem Neubau muss
klar sein, welche Datei künftig die kanonische Version ist.

| Cluster | Dateien | Entscheidung vor Neubau |
|---|---|---|
| Warnsignale | DL-08, HO-01, HO-27 | Allgemeines Warnsignale-Blatt neu bauen; DL-08 ersetzen oder separat behalten? |
| Krisenplan | DL-02, DL-09, HO-14 | Vorlage, Guide und Handout getrennt halten oder reduzieren? |
| Grenzsetzung | DL-10, HO-12 | Praxisblatt/Formulierungsbaukasten oder kompaktes Orientierungsblatt? |
| Loyalität | HO-10, HO-13 | Ein Orientierungsblatt plus späteres Praxisblatt oder zwei getrennte Blätter? |
| Sichtbarkeit/Rollen | DL-13, HO-26 | Kanonische Version bestimmen, bevor erweitert wird. |
| Erosion/Schonhaltung | HO-07, HO-08, HO-28 | Als Familie ordnen; HO-28 bleibt Stilanker. |

### Spur C: Jetzt Bauen

Diese Reihenfolge ist die beste Startbahn für den Neubau, weil sie fachlichen
Nutzen, Visualisierbarkeit und geringe technische Risiken verbindet.

| Rang | Ziel | Ausgangsmaterial | Visualisierung | Vor Start klären |
|---:|---|---|---|---|
| 1 | `a8_warnsignale` neu als A4-quer-Orientierungsblatt | HO-01, DL-08, Draft `a8_warnsignale.md`, Referenz HO-27 | Ampel, Tacho oder Frühwarn-Leiter | Ersetzt das neue PDF DL-08 oder bleibt DL-08 parallel? |
| 2 | `a3_ambivalente_loyalitaet` neu bauen | HO-13, ggf. HO-10 | Spannungsfeld, Kompass oder Doppelbindung | Verhältnis zu `b5_loyalitaetskonflikte`. |
| 3 | `c6_selbstfuersorge` neu bauen | HO-22 | Werkzeugkasten, Akku oder Wochen-Mini-Plan | Orientierungsblatt oder Praxisblatt? |
| 4 | `expressed_emotions` neu bauen | HO-11 | Kreislauf Sorge - Kontrolle - Stress - Symptomdruck | Schuldentlastende Formulierung besonders sorgfältig setzen. |
| 5 | Erosion-Familie ordnen | HO-07, HO-08, HO-28 | Beziehungserosion, Schonhaltung, Co-Isolation | Erst Cluster-Entscheid, dann bauen. |

### Spur D: Danach Migrieren

Diese Themen sind geeignet, aber weniger dringlich als Spur C:

- `a4_ambiguous_loss`
- `a5_affiliate_stigma`
- `b7_behandlung_ambivalenz`
- `b9_depression_partner`
- `d4_solidaritaet_wellen`
- `trialog`
- `transformationsreise`

## Definition Of Ready

Ein Handout ist erst baubereit, wenn diese Punkte geklärt sind:

| Frage | Muss beantwortet sein |
|---|---|
| Rolle | Orientierungsblatt, Praxisblatt oder Krisen-Handout? |
| Ersatzlogik | Ersetzt es ein bestehendes PDF, ergänzt es eines oder bleibt es Website-only? |
| Zielgruppe | Angehörige allgemein, Partner:innen, Eltern, Kinder, Fachpersonen? |
| Visualisierung | Welche Metapher oder welches Diagramm trägt das Blatt? |
| Handlungsausgang | Welcher konkrete nächste Schritt steht am Ende? |
| Quellen | Welche Kernquellen sind belegt und welche Vollbibliographie-URL gilt? |
| Offene Entscheide | Keine Platzhalter, geratenen URLs oder ungeklärten Footer-Regeln. |

## Definition Of Done

Ein Migrations-PR ist erst fertig, wenn:

1. das HTML aus dem Starter oder der aktuellen Workflow-Vorlage abgeleitet ist,
2. die Visualisierung druckökonomisch bleibt: weisse Seite, sparsame Farbe,
3. `npm run handout:render -- <html> --type orientierung --orientation landscape`
   ohne Überlauf läuft,
4. PDF und PNG visuell geprüft sind,
5. `pdfinfo`, `qpdf` und Textauszug keine offensichtlichen Release-Fehler zeigen,
6. `npm run audit:release:ci` grün bleibt,
7. `src/_data/pdfs.js`, Suchindex und Website-Verweise nur dann angepasst sind,
   wenn der Ersatz wirklich freigegeben ist,
8. alte PDFs nur mit Alias-/Redirect-Plan ersetzt oder archiviert werden,
9. PDF/UA-Status ehrlich dokumentiert ist, falls das finale PDF noch
   `Tagged: no` ist.

## Empfohlener Erster PR

**PR 1: Warnsignale-Familie**

Ziel: Das allgemeine Warnsignale-Blatt als A4-quer-Handout neu bauen und als
Gegenstück zu `a9_schlaf_fruehwarnsystem` etablieren.

Arbeitsfolge:

1. `src/handout-drafts/a8_warnsignale.md`, HO-01 und DL-08 vergleichen.
2. Entscheiden, ob der neue Stand DL-08 ersetzt oder als separate Web-Version
   neben DL-08 bleibt.
3. Visualisierung wählen: Ampel ist wahrscheinlich am klarsten und am
   druckökonomischsten.
4. Einseitiges HTML aus dem Starter bauen.
5. Render-/Measure-/Verify-Kette laufen lassen.
6. Erst danach Datenverweise, Suchindex und alte Dateien anfassen.

Warum dieser PR zuerst:

- Das Thema ist zentral.
- Die Visualisierung ist klar.
- Es gibt mit HO-27 bereits eine Spezialvariante, an die das neue Blatt
  logisch anschliessen kann.
- Der PR testet den neuen Workflow an einem repräsentativen, aber gut
  begrenzbaren Thema.

## Nicht Löschen Ohne Eigenen PR

Nicht beiläufig löschen oder ersetzen:

- Dateien in `src/downloads/`
- PDFs, die in `src/_data/pdfs.js` referenziert sind
- Legacy-Pfade aus `legacyPdfAliases`
- Markdown-Drafts, solange ihre PDF-Version noch aktiv ist
- archivierte Herkunftsdateien unter `docs/handout-design-archive/`

Archivieren ist erst sinnvoll, wenn Ersatz, Verweise, Audit und fachliche
Freigabe gemeinsam stehen.
