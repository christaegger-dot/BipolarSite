---
name: fachstelle-handout
description: Use this skill whenever working on A4-Handouts (Orientierungsblätter, Praxisblätter, Krisen-Handouts) der Fachstelle Angehörigenarbeit PUK Zürich für Angehörige von Menschen mit psychiatrischen Erkrankungen. Triggers Reviewing, creating, or migrating handouts on themes wie Manie, Depression, Bipolar, Borderline, Zwangsstörungen, Grenzsetzung, Selbstfürsorge, Warnsignale, Krisenplan, Notfallkarte, Expressed Emotions, Stigma der Angehörigen, Ambivalente Loyalität, Ambiguous Loss, Trialog — auch wenn nur das Thema genannt wird ohne explizites «Handout». Also use beim Briefing oder Reviewen von Claude design Output, beim Ausdiskutieren von Editorial-Rules (keine Krisennummern in Psychoedukation, Standalone-Prinzip, Schweizer Orthografie), Visualisierungs-Auswahl (Metapher schlägt Strukturdiagramm schlägt Inhalts-Block), Template-Spec, oder Dokumenttyp-Taxonomie. Auch für Fragen zur Konsolidierung, Themenliste, Quellen-Format, oder Migrations-Pfad bestehender Handouts.
---

# Fachstelle Handout — Workflow

Skill für die Arbeit an A4-Handouts der Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich. Übertragbar auf alle thematischen Sites der Fachstelle (bipolarsite, borderline-angehoerige, zwangsstörungen). Adressiert: Review, Migration, Erstellung, Briefing.

## Erste Handlung: Spec lesen

Bei jeder Aktivierung dieses Skills zuerst `references/HANDOUT_TEMPLATE.md` lesen. Diese enthält die verbindlichen Regeln, Visualisierungs-Taxonomie, Akzeptanz-Checklisten und Migration-Pfade in voller Tiefe. Dieser SKILL.md gibt den Workflow; die Spec gibt die Substanz.

## Anwendungsbereiche

- **Review** eines bestehenden oder gerade erstellten Handouts (Editorial-Pass, Template-Drift, Sprache, Visualisierung)
- **Migration** eines Bestand-Handouts auf das neue Template (Editorial-Policy + Visual)
- **Erstellung** eines neuen Handouts inhaltlich (Markdown-Draft als Vorstufe zur visuellen Umsetzung)
- **Briefing** für Claude design (Übergabe an Visual-Implementation)
- **Strategie-Klärung** auf Set-Ebene (Konsolidierung, Themenliste, Dokumenttyp-Taxonomie, DL/HO-Auflösung)

## Drei Dokumenttypen — strikte Trennung

| Typ | Zweck | Krisennummern |
|---|---|---|
| **ORIENTIERUNGSBLATT** | Psychoedukation, Verständnis | ✗ NIE |
| **PRAXISBLATT** | Handlungsbefähigung, Formulierungen | ✗ NIE (Verweis ohne Nummer erlaubt) |
| **KRISEN-HANDOUT** | Akutpfad, Sofortinformation | ✓ explizit, prominent |

Vollständige Definitionen, Inhaltsregeln und Beispiele: Spec Sektion 1.

## Die fünf Kern-Regeln (häufigste Verletzungen)

Diese werden in der Praxis am häufigsten verletzt. Bei jedem Review explizit prüfen:

1. **Keine Krisennummern auf Orientierungs- oder Praxisblättern.** Nicht im Text, nicht im Diagramm, nicht im Footer. Die Nummern 144, 117, 143, 0800 33 66 55, 058 384 38 00 etc. gehören ausschliesslich auf Krisen-Handouts.
2. **Standalone-Prinzip.** Keine Cross-References zu Modulen, Tools, Notfallseite, anderen Handouts. Einzige erlaubte externe URL: Vollbibliographie im Quellen-Footer.
3. **Schweizer Orthografie.** ss statt ß. Anführungszeichen «...» für Hervorhebungen, „..." für direkte Zitate. Halbgeviertstrich — mit Leerzeichen davor und danach.
4. **Headline/Subtitle ohne Wort-Wiederholung.** Beispiel-Fehler: «Warnsignale früh erkennen» + «Frühe Veränderungen schneller erkennen».
5. **Fachstelle-Footer-Konstante.** «Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich» auf jeder Seite, nicht editierbar pro Handout.

## Visualisierungs-Heuristik

**Metapher schlägt Diagramm schlägt Container.**

Bei jeder Visualisierungs-Entscheidung in dieser Reihenfolge fragen:

1. Gibt es eine **visuelle Metapher** (Ampel, Tacho, Werkzeugkasten, Rettungsring, Spannungsfeld, Brücke, Anker, Wegweiser …), die das Hauptthema trägt? → ~0.3s-Lesezeit, Stress-tauglich
2. Falls nein: Welche **Beziehungslogik** liegt vor (Zyklus, Komposition, Kontinuum, Entscheidung, Vergleich …)? → Strukturdiagramm
3. **Inhalts-Blöcke** (Karteikarten, Definitionskasten, Pullquote, «Was hilft / Was schadet» …) als Container für Sekundärinhalt

Pro Dokumenttyp gewichtet:
- **Krisen-Handout** — Metapher quasi obligatorisch
- **Praxisblatt** — Metapher + Container kombinieren
- **Orientierungsblatt** — Strukturdiagramm zulässig, wenn Beziehungslogik komplex ist; Metapher bevorzugen wo möglich

Vollständige Tabellen, Bestand-Mapping und Auswahl-Workflow: Spec Sektion 6.

## Review-Workflow

Wenn ein Handout zur Begutachtung vorliegt:

1. **Dokumenttyp identifizieren** — Eyebrow lesen (ORIENTIERUNGSBLATT / PRAXISBLATT / KRISEN-HANDOUT). Falls falsch klassifiziert oder Inhalt nicht zum Typ passt: erste Frage.
2. **Editorial-Pass** — fünf Kern-Regeln durchgehen.
3. **Sprachpräzision** prüfen:
   - Headline/Subtitle-Redundanz
   - Asymmetrische Listen (z. B. nur eine Pol-Richtung beschrieben)
   - Ungewöhnliche Kollokationen
   - «Eigene Mittel»-Achse konsequent nutzen, wo Eskalation passend
4. **Visualisierungs-Check** — passt die Kategorie (Metapher / Diagramm / Container)? Upgrade-Potenzial?
5. **Akzeptanz-Checkliste** durchgehen (Spec Sektion 7).
6. **Strukturierte Rückmeldung** in vier Sektionen:
   - **Was sitzt** — was funktioniert
   - **Muss korrigiert** — Blocker
   - **Kleinkram / Mikro-Punkte** — kein Blocker, aber zu beheben
   - **Status / Empfehlung** — nächster Schritt

Reviewton: direkt, opinionated, mit konkreten Beispielen aus dem Material. Keine diplomatische Weichzeichnung. Akzeptanz-Kriterien explizit. Christa schätzt Direktheit und keine Sycophancy.

## Migrations-Workflow

Wenn ein Bestand-Handout auf das neue Template migriert wird:

1. **Editorial-Pass vor Layout** (auf Markdown-Ebene, vor jedem Visual-Schritt):
   - Krisennummern raus
   - Cross-Refs (Module, Tools, Notfallseite) raus
   - Quellen-Format harmonisieren: `DSM-5 (APA 2013)`, nicht `DSM-5 · APA 2013`
   - Sprachregeln-Check
   - Disclaimer ergänzen falls fehlt
   - Dokumenttyp bestätigen — Bestand hat oft Orientierungsblätter mit Krisennummern, die nach Migration entweder Orientierungsblätter ohne Krisennummern werden oder ggf. zu Krisen-Handouts umetikettiert (selten — Vorsicht)
2. **Visualisierungs-Re-Evaluation** — Auswahl-Workflow durchgehen, nicht 1:1 das aktuelle Diagramm übernehmen. Insbesondere: Metapher prüfen, wo aktuell Strukturdiagramm steht. Aktuell identifizierte Upgrade-Kandidaten (Spec Sektion 10.4): Warnsignale → Ampel-Metapher, Ambivalente Loyalität → Spannungsfeld, Selbstfürsorge → Werkzeugkasten, Notfallkarte → Rettungsring/Wegweiser.
3. **Markdown-Freigabe** durch Christa — niemals visuell weitergeben, bevor Inhalt freigegeben ist.
4. **Übergabe an Claude design** mit klarem Brief (Markdown + Template-Verweis + Akzeptanz-Checkliste).

## Erstellungs-Workflow (neue Handouts)

Wenn ein neues Handout erstellt wird:

1. **Dokumenttyp festlegen** (Orientierung / Praxis / Krise).
2. **Zielgruppe und Thema präzisieren** — wer liest, wozu, in welcher Lage?
3. **Inhalt als Markdown drafting** vor jedem Layout-Schritt:
   - Headline + differenzierender Subtitle/Lead
   - Disclaimer
   - Diagramm-Konzept (zuerst: Metapher prüfen, dann Strukturdiagramm)
   - Hauptsektionen
   - Hilfreicher Satz / Einstieg (Eyebrow-Variante wählen)
   - Was hilft / Was schadet (wenn passend)
   - Reflexions-Impuls oder Nächster-Schritt-Box
   - Quellen mit Mindeststandard: für klinische Themen mindestens eine Leitlinien-Referenz aus NICE CG185, S3-Leitlinie DGBS/DGPPN/AWMF, oder CANMAT/ISBD; für Belastungs-Themen peer-reviewed plus Sammelreferenz (z. B. Karambelas 2022)
4. **Editorial-Review** durch Christa.
5. **Übergabe an Claude design** mit Markdown + Template + Checkliste.

## Briefing für Claude design

Wenn Claude design ein Handout visuell umsetzen soll, immer mitgeben:

- Den freigegebenen Markdown-Draft
- `references/HANDOUT_TEMPLATE.md` (oder Verweis darauf im Repo)
- Akzeptanz-Checkliste (Spec Sektion 7) für Self-Check vor Abgabe
- Bestehende Pilot-Beispiele (mindestens das EE-Pilot-Handout)
- Bei Metaphern: konkreter Hinweis welche Metapher und welche Darstellung (z. B. «Ampel als echte Ampel rendern, nicht als Linear-Stufen-Boxen»)
- Hinweis auf Format (A4 hoch/quer, 1 oder 2 Seiten)

Reibungspunkte, die Claude design oft übersieht (also explizit ansprechen):
- Pull-Quote-Style (Teal-Box, Eyebrow oben, nicht zentriert unten)
- +/− Marker als gefüllte Kreise mit Symbol-Icon
- Round bullets (•), nicht em-Strich (—)
- Diagramm-Container als Sand-Box mit Eyebrow innen
- Quellen-Footer in Footer-Typografie (klein, gedämpft), nicht als prominente Box

### Briefing-Template (zum Kopieren)

Folgenden Block als Brief an Claude design verwenden, mit eingefügtem Markdown-Inhalt:

```text
Bitte erstelle ein A4-Handout der Fachstelle Angehörigenarbeit PUK Zürich gemäss folgender Spezifikation.

ECKDATEN
- Dokumenttyp: {ORIENTIERUNGSBLATT / PRAXISBLATT / KRISEN-HANDOUT}
- Site: {bipolarsite / borderline / zwangsstörungen / weitere}
- Format: A4 {hoch / quer}, {1 / 2} Seite(n)
- Identifier-Slug: {themenname-mit-bindestrichen}
- Version: v01 (oder bei Migration: vNN)

MARKDOWN-INHALT (freigegeben, NICHT mehr inhaltlich verändern)

[hier den freigegebenen Markdown-Block einfügen]

VISUALISIERUNG
- Hauptdiagramm: {Metapher: Name + Beschreibung / oder Strukturdiagramm-Typ aus Spec 6.2}
- Inhalts-Blöcke: {Liste der semantischen Container, z. B. Pull-Quote, Was-hilft/Was-schadet, Reflexions-Box}

VERBINDLICHE SPEZIFIKATION
Folge HANDOUT_TEMPLATE.md vollständig, insbesondere:
- Sektion 1: Dokumenttyp-Definitionen (welcher Typ darf was enthalten)
- Sektion 2: Editorial-Policy — keine Krisennummern auf Orientierungs- oder Praxisblättern; Standalone-Prinzip (keine Cross-Refs)
- Sektion 3: Sprachregeln — Schweizer Orthografie (ss, «», em-Strich mit Leerzeichen), keine Headline/Subtitle-Wortwiederholung
- Sektion 4: Visuelle Komponenten (Farbsystem, Typografie, Header, Diagramm-Container, Pull-Quote, +/− Marker, Footer)
- Sektion 6: Visualisierungs-Taxonomie — Metapher schlägt Diagramm schlägt Container

AKZEPTANZ-CHECKLISTE — vor Abgabe selbst durchgehen
(Spec Sektion 7, alle relevanten Punkte für den Dokumenttyp).
Häufig übersehene Punkte:
- Bullets rund (•), nicht em-Strich
- Pull-Quote in Teal-Box mit Eyebrow oben (nicht zentriert unten)
- +/− als gefüllte Kreise mit Symbol-Icon
- Diagramm in Sand-Container mit Eyebrow innen
- Quellen-Footer in kleiner Footer-Typografie, nicht prominent
- Fachstelle-Footer-Konstante auf jeder Seite
- Headline/Subtitle ohne Wortwiederholung

ÜBERGABEFORMAT
PDF (A4) plus PNG-Vorschau für visuelle Kontrolle.

BESTEHENDE PILOT-REFERENZ
{Verweis auf EE-Pilot / Manie-Blatt / oder ggf. spezifisches Krisen-/Praxisblatt-Pilot}
```

Bei Migration eines Bestand-Handouts den Block erweitern um:

```text
MIGRATION VON BESTAND-HANDOUT
- Bestand-Pfad: {z. B. /handouts/c4_manie.pdf}
- Visualisierungs-Upgrade: {ja/nein — falls ja: was wird ersetzt durch was, z. B. «Linear-Stufen → echte Ampel-Metapher»}
- Konsolidierung mit anderen Handouts: {ja/nein — falls ja: welche werden zusammengeführt}
- Redirect-Plan: {alter Pfad → neuer Pfad}
```

## Wiederkehrende Sprach-Patterns

Quer durch Handouts wiederverwendbar:

- **«Eigene Mittel»-Eskalation**: «Eigene Mittel tragen noch / reichen knapp / reichen nicht mehr» — wo Eskalation vorkommt.
- **«Belastung, nicht persönliches Versagen»** — Re-Framing von Selbstvorwürfen.
- **«Nicht zuerst, wer schuld ist»** — Reflexionsfrage, die Schuldfokus auflöst.

Mehr Patterns: Spec Sektion 3.3.

## Sicherheits-Anker (nicht verhandelbar)

- Krisennummern nur auf Krisen-Handouts. Kein «kleines bisschen» auf Orientierungs- oder Praxisblättern.
- Wenn Suizidalität, Mental-Health-Krise oder Selbst-/Fremdgefährdung im Handout-Inhalt vorkommen: niemals methoden-spezifische Informationen liefern. Verweis auf professionelle Hilfe ist immer richtig.
- Fachstelle-Footer als institutionelle Verankerung pflichtweise.
- Schweizer Orthografie pflichtweise.

## Übertragung auf andere Fachstelle-Sites

Der Skill und die Spec sind primär für `bipolarsite.netlify.app` geschrieben, aber übertragbar auf:
- `borderline-angehoerige.netlify.app` (Borderline-Site)
- Künftige Sites (Zwangsstörungen / OCD, Depression-Angehörige etc.)

Bei Übertragung:
- Vollbibliographie-URL anpassen (z. B. `borderline.puk-zh.ch/quellen`)
- Themen-spezifische Quellen-Pflichtreferenzen ergänzen
- Sonst Editorial-Policy und Visualisierungs-Heuristik unverändert übernehmen

## Wenn die Spec eine Frage nicht beantwortet

Spec Sektion 11 listet offene Strategie-Fragen. Wenn ein Konflikt damit auftaucht, mit Christa klären, nicht autonom entscheiden. Beispiele für offene Fragen: DL/HO-Auflösung, finale Themenliste, Krisen-Handout-Eyebrow-Begriff, Behandlung von Konsolidierungs-Clustern.
