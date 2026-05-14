# Handout-Taxonomie- und Regelbruch-Audit

**Stand:** 14. Mai 2026

**Basis:** `fachstelle-handout` Skill, `HANDOUT_TEMPLATE.md` v03

**Scope:** `src/handout-drafts/*.md`, PDF-Generator-Quellenmapping, bestehende Migrationswellen

**Nicht Scope:** visuelle PDF-Neugestaltung, fachliche Neufassung, Nummernlogik-Review durch Klinik

## Kurzurteil

Die Handout-Drafts sind fachlich brauchbar, aber noch nicht nach der neuen kanonischen Regelbasis sortiert. Der grosse Systembruch ist nicht Layout, sondern Taxonomie: Viele Blätter sind als Orientierungs- oder Praxisblatt gedacht, tragen aber noch Krisennummern, Notfallboxen und Website-Crossrefs. Dadurch wird fast jedes Blatt implizit zu einem kleinen Krisenblatt. Genau das verbietet die neue Regelbasis.

Der wichtigste Architekturentscheid lautet deshalb:

- `Akutblatt` ist kein kanonischer Zieltyp mehr.
- Nur die `notfallkarte` wird als `KRISEN-HANDOUT` geführt.
- `c2_suizidgedanken`, `c3_psychose_wahn`, `c4_manie` und `c5_depression` werden als krisennahe `ORIENTIERUNGSBLATT`-Migration behandelt. Ihre Akutnummern und Sofortpfade gehören in die Notfallkarte, nicht in diese Blätter.
- `grenzsetzung` und vermutlich `c1_krisenplan` sind `PRAXISBLATT`.
- Alle übrigen Themen sind `ORIENTIERUNGSBLATT`, sofern sie nicht in den Konsolidierungswellen zusammengelegt oder archiviert werden.

## Audit-Regeln

Die Prüfung folgt fünf harten Regeln aus der Spec:

1. Krisennummern nur auf `KRISEN-HANDOUT`.
2. Keine Crossrefs aus Handouts zurück in Module, Tools, Notfallseite, Anlaufstellen oder andere Handouts.
3. Quellen müssen als sichtbarer, lesbarer Quellen-Footer vorhanden sein.
4. Footer-Konstante: `Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich`.
5. Visualisierung zuerst als Metapher prüfen, danach Strukturdiagramm, danach Inhaltsblock.

Hinweis zu Quellen: Alle Draft-Slugs haben aktuell ein Mapping in `src/_data/handoutReferences.json`. Der Regelbruch ist daher nicht «keine Quellen im Repo», sondern: Die Drafts enthalten keine redaktionell freigegebene Quellenzeile, und die Quellen-/Footer-Ausgabe muss bei jeder Migration gegen die neue Spec final geprüft werden.

## Priorisierte Blocker

### P1-A: Falsche Dokumenttypen bei krisennahen Blättern

`c2_suizidgedanken`, `c3_psychose_wahn`, `c4_manie` und `c5_depression` sind aktuell `Akutblatt`. Nach neuer Regelbasis führt das in die falsche Richtung: Diese Blätter enthalten psychoedukative Orientierung, Kontaktverhalten und Warnzeichen. Das ist kein reines Krisen-Handout. Zieltyp: `ORIENTIERUNGSBLATT`.

Konsequenz: Krisennummern, `emergency_contacts`, Notfallseite-Crossrefs und harte Akutaufrufe müssen aus diesen vier Blättern heraus. Es darf ein verbaler Sicherheitssatz bleiben, aber ohne Nummer: zum Beispiel «Wenn unmittelbare Gefahr entsteht, wechseln Sie auf den Notfallpfad.»

### P1-B: Notfallkarte ist der einzige Krisen-Handout-Pilot

`notfallkarte` darf Krisennummern explizit tragen. Sie muss aber von `Akutblatt` zu `KRISEN-HANDOUT` umetikettiert werden und darf keine Website-Crossrefs enthalten. Die aktuelle Fachstellen-Telefonnummer im Fliesstext ist zudem kein Akutpfad und sollte entfernt oder separat klinisch freigegeben werden.

### P1-C: Praxisblätter mit Notfallnummern

`grenzsetzung` ist korrekt als Praxisblatt gedacht, bricht aber die Regel durch explizite `117`, Notfalldienst und Notfallseite-Crossrefs. Ein Praxisblatt darf auf den Notfallpfad verweisen, aber ohne Nummer.

`c1_krisenplan` ist aktuell `Arbeitsblatt`; Zieltyp ist vermutlich `PRAXISBLATT`. Auch hier müssen explizite Nummern und Tool-/Modul-Crossrefs aus dem Handout heraus.

### P1-D: Crossrefs sind systemisch

Fast alle Drafts enden mit `Weiterführend:` und Links auf Module, Notfallseite, Anlaufstellen oder Tools. Das verletzt das Standalone-Prinzip flächig. Diese Sektionen müssen in der Migration entfernt werden; die Website darf von Modulen auf Handouts verlinken, aber das gedruckte Handout verweist nicht zurück auf die Website-Architektur.

## Audit-Matrix

| Draft | Ist-Typ | Zieltyp | Harte Regelbrüche jetzt | Geeignete Visualisierung | Aktion |
|---|---|---|---|---|---|
| `notfallkarte.md` | Akutblatt | KRISEN-HANDOUT | Typname falsch; Crossrefs zu Notfallseite/Modul/Anlaufstellen; Fachstellen-Tel im Fliesstext prüfen | Rettungsring oder Wegweiser plus Triage-Algorithmus | **Welle 1 Pilot:** behalten, umetikettieren, Crossrefs raus, Quellen/Footer finalisieren |
| `grenzsetzung.md` | Praxisblatt | PRAXISBLATT | Explizite `117`, Notfalldienst, Notfallseite; Crossrefs | Karteikarten/Formulierungsbaukasten, ggf. Werkzeugkasten | **Welle 1 Pilot:** migrieren, Nummern raus, Notfallpfad nur verbal |
| `c4_manie.md` | Akutblatt | ORIENTIERUNGSBLATT | Krisennummern, emergency contacts, Notfallseite/Modul-Crossrefs | Tacho/Skala mit «Eigene Mittel»-Achse | Welle 3: als Orientierung final reviewen, Akutpfad in Notfallkarte auslagern |
| `c5_depression.md` | Akutblatt | ORIENTIERUNGSBLATT | Krisennummern, emergency contacts, konkrete Akutaufrufe, Crossrefs | Thermometer/Skala, Suizidgefahr nur als Notfallpfad-Verweis ohne Nummer | Welle 3: neu klassifizieren, Quellen/Disclaimer sauber setzen |
| `c2_suizidgedanken.md` | Akutblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Notfalldienst, Notfallseite/Modul-Crossrefs | Ampel als Risiko-Metapher, ohne Nummern | Welle 3: besonders sensitiv; Akutpfad vollständig über Notfallkarte abdecken |
| `c3_psychose_wahn.md` | Akutblatt | ORIENTIERUNGSBLATT | Krisennummern, emergency contacts, konkrete Schutznummern, Crossrefs | Wegweiser/Schutzpfad oder Anker für Reizreduktion | Welle 3: Typwechsel; Schutzlogik verbal halten |
| `c6_selbstfuersorge.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Crossrefs, Dargebotene Hand | Werkzeugkasten-Metapher | Welle 2: hochfrequent, Metapher upgraden |
| `a8_warnsignale.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Notfallnummer/Notfallseite im Diagramm, Crossrefs | Echte Ampel-Metapher | Welle 2: Nummern raus, Ampel als Hauptmechanismus |
| `b7_behandlung_ambivalenz.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | 144/Notfallseite im Lead und Diagramm, Tool-/Modul-Crossrefs | 2x2-Quadrant/Kontinuum | Welle 2: Struktur behalten, Akutpfad entfernen |
| `expressed_emotions.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Modul-Crossrefs | Kreislauf mit Ausstiegspunkt | Welle 4: Pilot gegen Spec final reviewen |
| `a3_ambivalente_loyalitaet.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Modul-/Anlaufstellen-Crossrefs | Spannungsfeld/Waage | Welle 4: Visual-Upgrade prüfen |
| `a5_affiliate_stigma.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Modul-/Anlaufstellen-Crossrefs | Stigma-Kreislauf | Welle 4: Zyklus behalten, editorial migrieren |
| `b5_loyalitaetskonflikte.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Modul-/Anlaufstellen-Crossrefs | Spannungsfeld oder Matrix | Welle 4: mit Ambivalenz abgleichen, nicht doppeln |
| `b1_18_belastungen.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Crossrefs, harter Pagebreak | Iceberg-Modell oder Belastungslandkarte | Welle 5: Konsolidieren mit Belastungs-Cluster |
| `b2_erosion_solidaritaet.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Crossrefs | Zeitlinie/Phasenrad | Welle 5: Konsolidieren |
| `b4_mechanismen_erosion.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Crossrefs | Schichten/Layer oder Kreislauf | Welle 5: Konsolidieren |
| `b3_kritische_zeitpunkte.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Notfallseite/Modul-Crossrefs, Pagebreak | Zeitstrahl oder Triage ohne Nummern | Welle 6: spezielle Migration |
| `a4_ambiguous_loss.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Modul-/Anlaufstellen-Crossrefs | Anker/Brücke oder Spannungsfeld «da und nicht da» | Welle 6: eigenständig behalten |
| `c1_krisenplan.md` | Arbeitsblatt | PRAXISBLATT | 144/0800, Notfallseite, Tool-/Modul-Crossrefs | Checkliste/Baukasten, ggf. Entscheidungsbaum ohne Nummern | Welle 6: als Praxisblatt migrieren; Vorlage separat |
| `rechtliche_orientierung.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Modul-/Notfallseiten-Crossrefs; Quellen/Fedlex-Footer final prüfen | Schloss/Schlüssel für Schweigepflicht/Einwilligung | Welle 6: fehlenden Quellenblock/alten Link besonders prüfen |
| `transformationsreise.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Crossrefs | Zeitstrahl/Brücke | Welle 7: mit `d4_solidaritaet_wellen` zusammenführen prüfen |
| `d4_solidaritaet_wellen.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Modul-Crossrefs | Säulen oder Brücke | Welle 7: mit Transformationsreise abgleichen |
| `trialog.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Dargebotene Hand, Modul-/Anlaufstellen-Crossrefs | Venn/Ökogramm oder Netzwerk | Welle 7: behalten, Standalone schärfen |
| `b9_depression_partner.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Crossrefs | Belastungs-Thermometer oder Kontinuum | Welle 7: vom klinischen Depressionsblatt abgrenzen |
| `b6_geschlechtsspezifisch.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Crossrefs, Pagebreak | Sichtbarkeits-Matrix | Welle 7: Umfang/3-Seiten-Format prüfen |
| `b10_trennung_scheidung.md` | Orientierungsblatt | ORIENTIERUNGSBLATT | Krisennummern, Dargebotene Hand, Modul-/Anlaufstellen-Crossrefs | Wegweiser/Entscheidungspfad | Welle 7: behalten oder stärker praxisnah zuschneiden |
| `kurzblatt_stabilisiert.md` | Kurzblatt | PRAXISBLATT oder Archiv | Krisennummern, Fachstellen-Tel, Dargebotene Hand, Notfallseite/Modul-Crossrefs | «Was hilft / was schadet»-Gegenüberstellung | Welle 7: Formatfrage; eher konsolidieren oder als Praxisblatt neu bauen |

## Sofort ableitbare Repo-Regeln

Diese Regeln sollten als Folge-PRs technisch abgesichert werden:

1. `type: "Akutblatt"` darf in neuen Drafts nicht mehr vorkommen. Zulässig sind `Orientierungsblatt`, `Praxisblatt`, `Krisen-Handout` oder später deren kanonische Grossschreibungsform.
2. Wenn `type` nicht `Krisen-Handout` ist, darf der Draft keine expliziten Krisennummern enthalten: `144`, `117`, `143`, `0800 33 66 55`, `058 384 38 00`.
3. Kein Draft darf `Weiterführend:` mit internen Links auf `/modul/`, `/notfall/`, `/tools/`, `/werkzeuge/` oder `/anlaufstellen/` enthalten.
4. Jeder Draft-Slug muss in `src/_data/handoutReferences.json` gemappt sein.
5. Die PDF-Ausgabe muss die Fachstelle-Footer-Konstante verwenden, nicht handout-spezifische Kontaktzeilen.

## Empfohlene nächste PRs

1. **Notfallkarte als Krisen-Handout-Pilot migrieren.** Typ umstellen, Crossrefs entfernen, Rettungsring/Wegweiser-Triage sauber definieren, Quellen/Footer gegen Spec prüfen. Das setzt den einzigen erlaubten Ort für Krisennummern.
2. **Grenzsetzung als Praxisblatt-Pilot migrieren.** Explizite Nummern entfernen, Notfallpfad verbal halten, Formulierungsbaukasten als wiederverwendbares Muster festlegen.
3. **c2-c5 ent-akutisieren.** Erst Markdown-Editorial-Pass, nicht PDF-Layout: Typ auf `ORIENTIERUNGSBLATT`, Krisennummern und emergency contacts entfernen, Sicherheitslogik ohne Nummern formulieren, Visualisierung pro Blatt neu bestätigen.
4. **Lint-Regel für Handout-Drafts ergänzen.** Ein kleiner Check soll die Sofort-Regeln aus diesem Audit hart prüfen, bevor wieder PDF-/Layoutarbeit beginnt.

## Offene Review-Punkte

- Der Begriff `KRISEN-HANDOUT` ist in der Spec noch als Eyebrow-Frage offen. Bis zur Entscheidung sollte der Repo-Typ trotzdem nicht mehr `Akutblatt` sein.
- Die aktuelle Quellenlogik ist zentral über `handoutReferences.json` organisiert. Das ist technisch gut, aber die sichtbare Ausgabe muss pro Dokumenttyp mit der neuen Footer-Spec harmonisiert werden.
- Konsolidierungsentscheidungen in Welle 5 und Welle 7 sind redaktionelle Entscheidungen. Sie sollten nicht allein durch Generatorlogik oder PDF-Platzbedarf entschieden werden.
