# TOOL LAYOUT STRATEGY

## Ziel dieses Dokuments

Dieses Dokument beschreibt die gemeinsame Layout-Strategie für die interaktiven Werkzeuge unter `src/tools/`. Es ist bewusst kein vollständiger Refactor-Plan für alle Tools, sondern eine kleine, belastbare Arbeitsgrundlage für spätere Einzel-PRs.

Die Werkzeuge sollen funktional bleiben, sich aber klarer als Teil derselben psychoedukativen Website anfühlen:

- Ruhe vor Wirkung
- Wärme vor Neutralität
- Verlässlichkeit vor Überraschung
- keine Dashboard- oder App-Optik
- keine gleichförmige Notfall-Rhetorik auf allen Tool-Seiten

## Aktuelle Tool-Typen

Alle bestehenden Tools werden einem von drei Layout-Typen zugeordnet.

| Tool | URL | Typ | Warum |
| --- | --- | --- | --- |
| Durchatmen | `/tools/durchatmen/` | A. Akut-/Sofort-Tool | Minimale Textmenge, sofortige Handlung, sehr schmale Entscheidungsanforderung |
| Krisenplan-Werkzeug | `/tools/krisenplan/` | B. Arbeitsblatt-Tool | Mehrschrittiges gemeinsames Ausfüllen, lokale Speicherung, Drucken, Rücksetzen |
| Fünf-Säulen-Check | `/tools/saeulen-check/` | B. Arbeitsblatt-Tool | Geführte Standortbestimmung mit ruhigem Ergebniszustand |
| Kommunikations-Trainer | `/tools/komm-trainer/` | B. Arbeitsblatt-Tool | Schrittweise Bearbeitung von Situationen mit unmittelbarer Rückmeldung |
| Selbsttest | `/tools/selbsttest/` | B. Arbeitsblatt-Tool | Kurze, geführte Selbsteinordnung mit Ergebnislogik |
| Der Eisberg der Angehörigen | `/tools/eisberg/` | C. Erklär-Visualisierung | Sichtbar machen, was ober- und unterhalb der Oberfläche liegt, dann Reflexion |
| Bipolarer Phasenverlauf | `/tools/phasenverlauf/` | C. Erklär-Visualisierung | Zeitliches Muster erklären statt Daten erfassen |
| Wie Überlastung zum Kreislauf wird | `/tools/ee-kreislauf/` | C. Erklär-Visualisierung | Zusammenhang und Dynamik sichtbar machen |
| Belastungsverlauf über Episoden | `/tools/solidaritaets-chart/` | C. Erklär-Visualisierung | Konzeptionelles Muster mit episodischer Vertiefung |

### Einordnungshinweis

Einige Tools haben Mischformen, zum Beispiel Ergebniszustände oder kurze Trainer-Interaktionen. Für Layout-Entscheidungen ist aber wichtiger, **welche Hauptaufgabe** das Tool erfüllt:

- sofort beruhigen
- gemeinsam oder allein strukturiert durcharbeiten
- ein Muster erklären und Reflexion auslösen

## Gemeinsames Tool-Shell-Pattern

Unabhängig vom Tool-Typ soll künftig dieselbe grobe Shell-Logik erkennbar bleiben.

### 1. Tool-Navigation

- obere Hauptnavigation mit Rückweg in die Website
- lokale Werkzeug-Navigation mit eindeutigem Rücksprung zu Modul oder Startseite
- keine zusätzliche Mini-Informationsarchitektur pro Tool

### 2. Breadcrumb

- steht im Headerbereich
- verortet das Tool im Gesamtangebot
- soll knapp bleiben und keine zweite Hauptnavigation ersetzen

### 3. Tool-Header

Der Header soll in allen Tool-Typen dieselbe Grundfunktion erfüllen:

- Titel
- 1 bis 2 Sätze Einordnung
- optionales Icon/Glyph
- kein übergroßer Hero
- keine pseudo-appige Kontrollleiste als visuelles Zentrum

### 4. Kurzer Intro- oder Sicherheitshinweis

Nur wenn inhaltlich sinnvoll:

- Datenschutz-Hinweis bei lokaler Speicherung
- nicht-diagnostischer Hinweis bei Selbsttests
- kurze Sicherheits- oder Nutzungseinordnung

Nicht jedes Tool braucht einen Warnblock. Hinweise sollen ruhig, knapp und fachlich begründet sein.

### 5. Hauptinteraktion

Das Hauptwerkzeug steht sichtbar vor allen sekundären Elementen.

- Akut-Tool: eine unmittelbare Aktion
- Arbeitsblatt-Tool: klar gegliederte Schritte oder Formularabschnitte
- Visualisierung: das Modell selbst ist das Zentrum, nicht die Rahmenerklärung

### 6. Ergebnis- oder Reflexionsbereich

Nach der Interaktion soll ein klarer zweiter Bereich folgen:

- Ergebnis
- Einordnung
- Reflexion
- nächster sinnvoller Schritt

Dieser Bereich soll nicht mit dem eigentlichen Werkzeug konkurrieren, sondern bewusst nachgeordnet sein.

### 7. Rückweg

Jedes Tool braucht einen ruhigen, klaren Rückweg:

- zurück zum zugehörigen Modul
- oder zurück zur Werkzeugübersicht

Rückwege sind Teil der Orientierung, nicht nur Navigation.

### 8. Notfall-Querverweis

Ein Notfall-Querverweis gehört **nicht automatisch** in jedes Tool. Er ist nur sinnvoll, wenn das Tool realistisch in eine akute Lage hinein genutzt wird oder während der Nutzung akute Eskalation sichtbar werden kann.

Faustregel:

- **ja** bei Akut-/Sofort-Tools und klar krisenrelevanten Arbeitsblatt-Tools
- **zurückhaltend** bei Selbsttests oder Tools mit Belastungsbezug
- **nicht als Standardbaustein** bei reinen Erklär-Visualisierungen

## Typ-spezifische Layout-Regeln

### A. Akut-/Sofort-Tool

Beispiel: `Durchatmen`

### Ziel

Maximale Ruhe bei minimaler Entscheidungslast.

### Layout-Merkmale

- schmalere Inhaltsbreite
- sehr wenig Text
- eine einzige primäre Handlung
- reduzierte Zahl an Links und Nebensignalen
- klare Rückkehrmöglichkeit nach der akuten Minute

### Was vermieden werden soll

- lange Intros
- konkurrierende CTAs
- dichte Sekundärnavigation
- jede Form von Trainings- oder Dashboard-Optik

### B. Arbeitsblatt-Tool

Beispiele: `Krisenplan`, `Säulen-Check`, `Kommunikations-Trainer`, `Selbsttest`

### Ziel

Geführtes Bearbeiten mit ruhiger Formular- oder Schrittlogik.

### Layout-Merkmale

- gemeinsamer Header mit kurzer Einordnung
- optionaler Sicherheits- oder Datenschutzhinweis
- klarer Abstand bis zur ersten Interaktion
- sichtbare, aber unaufgeregte Fortschrittslogik
- eindeutige Button-Hierarchie
- Ergebnis oder nächste Schritte deutlich getrennt vom Eingabebereich

### Was vermieden werden soll

- app-artige Kontrollflächen als dominantes Gestaltungselement
- zu viele gleich starke Buttons auf engem Raum
- springende Layouts zwischen Frage-, Ergebnis- und Reset-Zustand

### C. Erklär-Visualisierung

Beispiele: `Eisberg`, `Phasenverlauf`, `EE-Kreislauf`, `Solidaritäts-Chart`

### Ziel

Muster sichtbar machen und anschließende Reflexion ermöglichen.

### Layout-Merkmale

- kurzer Header mit Leseschlüssel
- Visualisierung als Hauptbühne
- Details bei Interaktion nachgeordnet einblenden
- Reflexions- oder Einordnungsblock nach dem Modell

### Was vermieden werden soll

- zu viel Erklärung vor der Visualisierung
- dauerhafte Warnkommunikation
- visuelle Übersteuerung durch starke UI-Rahmen

## Zukünftiges gemeinsames Markup-Muster

Langfristig soll sich für neue oder überarbeitete Tools folgende Reihenfolge durchsetzen:

1. Hauptnavigation / Werkzeugnavigation
2. Header mit Breadcrumb, Titel, Intro
3. optionaler Hinweisblock
4. Hauptinteraktion
5. Ergebnis- oder Reflexionsbereich
6. Rückweg / nächster Schritt

Vorhandene Hilfsklassen und Token sollen bevorzugt weiterverwendet werden, insbesondere:

- `--content-width`
- `--content-width-narrow`
- `--card-radius`
- `--card-padding`
- `--section-tight`
- `--space-*`
- `--text-*`

## Pilot-Entscheidung in diesem PR

In diesem Strategie-PR wird **kein zusätzlicher Pilot-Umbau** erzwungen.

Begründung:

- Der letzte Layout-Pass hat die Tool-Shell bereits sichtbar beruhigt.
- Für einen belastbaren Folge-Refactor ist die dokumentierte Typisierung im Moment wertvoller als ein halb vorbereiteter Zweitumbau.
- Einzelne Pilot-PRs sollen danach gezielt pro Tool-Typ folgen, statt im Strategie-PR schon mehrere Designrichtungen zu vermischen.

## Empfohlene nächste Einzel-PRs

1. `Krisenplan` als erstes bewusstes Arbeitsblatt-Referenztool nach diesem Muster weiter schärfen
2. `Selbsttest`, `Säulen-Check` und `Kommunikations-Trainer` als Worksheet-Familie angleichen
3. `Eisberg`, `Phasenverlauf`, `EE-Kreislauf` und `Solidaritäts-Chart` als Visualisierungsfamilie angleichen
4. `Durchatmen` als Sonderfall mit maximal reduzierter Akut-Logik separat bewahren
