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
| Aktive Web-Handouts | 28 | Hauptquelle für die Migration. |
| Legacy-Aliasse | 4 | Behalten, solange alte Direktlinks existieren. |
| Markdown-Drafts | 31 | Inhaltliche Rohquelle, nicht ungeprüft übernehmen. |
| Neue A4-quer-Referenzen | 11 | `a1_bipolare_stoerung_verstehen`, `a2_phasenverlauf`, `a6_bipolar_i_ii_mischzustaende`, `a8_warnsignale`, `absprachen_bevor_es_kippt`, `schwieriges_ruhig_ansprechen`, `a3_ambivalente_loyalitaet`, `a4_ambiguous_loss`, `a9_schlaf_fruehwarnsystem`, `b11_hypervigilanz_erschoepfung`, `c6_selbstfuersorge`. |

Die lokalen HTML-Vorläufer zu HO-27/HO-28 sind als Herkunftsmaterial unter
`docs/handout-design-archive/ho-27-ho-28-source-html/` archiviert. Sie sind
Referenz, aber keine kanonische Produktionsquelle. Die neu gebauten
Produktionsquellen für HO-01, HO-06 und HO-13 liegen je als eigenes
Source-HTML unter `docs/handout-design-archive/`.

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
| Warnsignale | DL-08, HO-01, HO-27 | HO-01 ist als A4-quer-Handout neu gebaut. DL-08 bleibt vorerst als kuratierter Download parallel, bis ein eigener Ersatz-/Alias-PR entschieden ist. |
| Krisenplan | DL-02, DL-09, HO-14 | Vorlage, Guide und Handout getrennt halten oder reduzieren? |
| Grenzsetzung | DL-10, HO-12 | Praxisblatt/Formulierungsbaukasten oder kompaktes Orientierungsblatt? |
| Loyalität | HO-10, HO-13 | HO-13 ist als Orientierungsblatt neu gebaut. HO-10 bleibt als separater Kandidat nur dann sinnvoll, wenn daraus ein klar anderes Praxis- oder Entscheidungsblatt wird. |
| Sichtbarkeit/Rollen | DL-13, HO-26 | Kanonische Version bestimmen, bevor erweitert wird. |
| Erosion/Schonhaltung | HO-07, HO-08, HO-28 | Als Familie ordnen; HO-28 bleibt Stilanker. |

### Spur C: Gebaut und Als Referenz Verwenden

Diese Handouts sind bereits im neuen A4-quer-Stil im Repo und dienen als
Referenz für weitere Neubauten. Sie müssen nicht erneut konzipiert werden;
offen bleibt nur der separate PDF/UA-Finalschritt.

| Handout | Status | Rolle für weitere Arbeit |
|---|---|---|
| `a1_bipolare_stoerung_verstehen` | neu gebaut | Referenz für Grund-Psychoedukation und Phasenwellen-Logik. |
| `a2_phasenverlauf` | neu gebaut | Referenz für Phasen-/Kurvenlogik und Kühlschrank-taugliche Verlaufsmodelle. |
| `a6_bipolar_i_ii_mischzustaende` | neu gebaut | Referenz für Schwellen-/Mischbild-Logik und diagnostiknahe Psychoedukation ohne Angehörigen-Diagnostik. |
| `a8_warnsignale` | neu gebaut und gemerged | Referenz für Ampel-/Handlungslogik. |
| `absprachen_bevor_es_kippt` | neu gebaut | Referenz für handlungsnahe Absprachekarten zwischen Warnsignalen und Krisenplan. |
| `schwieriges_ruhig_ansprechen` | neu gebaut | Referenz für Drei-Satz-Kommunikation: Beobachtung, Sorge und nächster kleiner Schritt. |
| `a3_ambivalente_loyalitaet` | neu gebaut und gemerged | Referenz für Spannungsfeld-Metaphern und warme Entlastungssprache. |
| `a4_ambiguous_loss` | neu gebaut und gemerged | Referenz für Zwischenlage-/Verlustlogik und vorsichtige Moralwort-Reduktion. |
| `a9_schlaf_fruehwarnsystem` | aktiv im Repo, Source-Vorläufer archiviert | Fachlich wertvoll, aber bei späterer Überarbeitung erst gegen neue Starter-/Verifier-Kette prüfen. |
| `b11_hypervigilanz_erschoepfung` | aktiv im Repo, Source-Vorläufer archiviert | Stilanker für Erschöpfungs-/Erosionsfamilie, aber noch nicht kanonische Produktionsquelle. |
| `c6_selbstfuersorge` | neu gebaut und gemerged | Referenz für Akku-Metapher, Selbstfürsorge und handlungsnahe Orientierungsblätter. |

### Spur D: Jetzt Bauen

Diese Reihenfolge ist die beste Startbahn für den Neubau, weil sie fachlichen
Nutzen, Visualisierbarkeit und geringe technische Risiken verbindet.

| Rang | Ziel | Ausgangsmaterial | Visualisierung | Vor Start klären |
|---:|---|---|---|---|
| 1 | `c6_selbstfuersorge` neu bauen | HO-22, Draft `c6_selbstfuersorge.md` | Werkzeugkasten, Akku oder Wochen-Mini-Plan | Orientierungsblatt oder Praxisblatt? Empfehlung: Praxisblatt, wenn Formulierungen/Minischritte dominieren; sonst Orientierungsblatt. |
| 2 | `expressed_emotions` neu bauen | HO-11, Draft `expressed_emotions.md` | Kreislauf Sorge - Kontrolle - Stress - Symptomdruck | Schuldentlastende Formulierung besonders sorgfältig setzen; keine Schuldspirale visualisieren, ohne Ausstiegspunkt. |
| 3 | Erosion-Familie ordnen | HO-07, HO-08, HO-28 | Beziehungserosion, Schonhaltung, Co-Isolation | Erst Cluster-Entscheid: ein Familien-Set aus 2-3 Blättern statt ein überladenes Sammelblatt. |
| 4 | `a5_affiliate_stigma` neu bauen | HO-03, Draft `a5_affiliate_stigma.md` | Stigma-Schichten, Scham-Mantel oder Schweigespirale | Sensible Sprache: Beschämung benennen, ohne Angehörige erneut zu beschämen. |
| 5 | `b7_behandlung_ambivalenz` neu bauen | HO-19, Draft `b7_behandlung_ambivalenz.md` | Waage, Türschwelle oder Annäherungs-/Vermeidungskurve | Dokumenttyp klären: Orientierungsblatt zu Ambivalenz oder Praxisblatt für Gesprächsvorbereitung. |

### Spur E: Danach Migrieren

Diese Themen sind geeignet, aber weniger dringlich als Spur D:

- `b9_depression_partner`
- `d4_solidaritaet_wellen`
- `trialog`
- `transformationsreise`
- `b5_loyalitaetskonflikte`, falls nach HO-13 noch ein eigenständiger Nutzen bleibt

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

## Empfohlener Nächster PR

**PR: Selbstfürsorge / Eigene Mittel**

Ziel: `c6_selbstfuersorge` aus dem regenerierten 2-Seiten-Bestand in ein
neues, einseitiges A4-quer-Handout überführen. Das Blatt soll nicht als
allgemeiner Appell «achten Sie auf sich» funktionieren, sondern als konkrete
Orientierung: Woran merke ich, dass eigene Mittel knapp werden, und welcher
kleine nächste Schritt schützt mich heute?

Arbeitsfolge:

1. `src/handout-drafts/c6_selbstfuersorge.md` und das aktive PDF HO-22
   redaktionell vergleichen.
2. Dokumenttyp festlegen: Orientierungsblatt, wenn die Kernlogik
   Belastungsmanagement ist; Praxisblatt, wenn Formulierungen und konkrete
   Wochenplanung dominieren.
3. Visualisierung wählen: Akku, Werkzeugkasten oder Wochen-Mini-Plan.
4. Inhalt zuerst als freigegebenen Markdown-Draft straffen.
5. Einseitiges HTML aus der aktuellen Starter-/Workflow-Vorlage bauen.
6. Render-/Measure-/Verify-Kette laufen lassen und PDF/UA-Status ehrlich
   dokumentieren.

Warum dieser PR jetzt:

- Er ergänzt die bereits gebauten Belastungsblätter logisch.
- Das Thema ist für Angehörige unmittelbar handlungsrelevant.
- Die Visualisierung ist gut lösbar, ohne Spezialwissen oder akute
  Krisenlogik zu berühren.
- Er testet, ob der neue Workflow nicht nur reine Orientierungs-, sondern
  auch handlungsnähere Blätter sauber trägt.

## Nicht Löschen Ohne Eigenen PR

Nicht beiläufig löschen oder ersetzen:

- Dateien in `src/downloads/`
- PDFs, die in `src/_data/pdfs.js` referenziert sind
- Legacy-Pfade aus `legacyPdfAliases`
- Markdown-Drafts, solange ihre PDF-Version noch aktiv ist
- archivierte Herkunftsdateien unter `docs/handout-design-archive/`

Archivieren ist erst sinnvoll, wenn Ersatz, Verweise, Audit und fachliche
Freigabe gemeinsam stehen.
