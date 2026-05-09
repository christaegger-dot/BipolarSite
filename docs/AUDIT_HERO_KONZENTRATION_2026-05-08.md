# Hero-Konzentration und Reduktion gleichzeitiger Entscheidungen — Audit

**Erstellt:** 8. Mai 2026
**Anlass:** Editorial-Review-Punkte 9, 10, 13, 14 — strategische Empfehlungen zur Reduktion gleichzeitiger CTAs am Einstieg, hin zu einer „geführten psychoedukativen Wissensreise" statt „Informationsportal mit vielen gleichwertigen Optionen".
**Scope:** Startseite (`/`) und Hub `/modul/8/`. Tools-Übersicht und Notfall-Seite sind aufgabenfokussiert und außerhalb dieses Audits.

---

## Editorial-Prinzipien (Referenz)

| # | Prinzip | Anwendung auf BipolarSite |
|---|---|---|
| 9 | Angehörige lesen erschöpft, belastet, mobil → kürzere Blöcke, klare Prioritäten, weniger Optionen | Texte ruhig, aber Lead-Längen prüfen |
| 10 | „Geführte Wissensreise" statt „Informationsportal" — weniger Gleichzeitigkeit, mehr Progression | Modul-Reihenfolge sichtbarer machen |
| 13 | Größter UX-Fehler: zu viele gleichwertige Entscheidungen am Einstieg | Anzahl simultaner CTAs zählen |
| 14 | Reduzieren: Gleichzeitigkeit, Auswahl, Reizdichte. Verstärken: Führung, Lesefluss, Progression | Gilt für Startseite + alle Hub-Seiten |

---

## Befund Startseite

### CTA-Inventur „above the second scroll" (typischer Desktop-Viewport)

Eine Zähl-Übung, was eine Erstbesucher:in im ersten Drittel der Seite gleichzeitig sieht:

**Im Header (`<nav>`):**
- Module
- Anlaufstellen
- Werkzeuge
- SOS Krise

**Im Hero:**
- H1 + Subtitle + Link „Was Sie hier finden →" (1 CTA)

**Im `.home-hero-paths`-Block (gleiche Header-Section):**
- 4 Entry-Path-Karten (Notfall, Modul 1, Modul 2, Werkzeuge)

**In `.home-intro-section`:**
- Rote SOS-Box mit Link „Direkt zum Notfallweg →"
- Helper-Link „Einstiegsfrage"

**Bilanz: 4 Nav-Items + 1 Hero-Link + 4 Entry-Pfade + 2 Intro-Links = ~11 Optionen** im oberen Drittel der Startseite. Davon sind drei Verweise auf das **gleiche Ziel** (`/notfall/`): Nav-„SOS Krise", Entry-Path „Es ist akut", SOS-Banner. Doppelte Nennung ist gewollte Redundanz für Sicherheit, summiert sich aber zur Reizdichte.

### Sub-Befunde

**Punkt 13 (gleichwertige Entscheidungen):** Die 4 Entry-Path-Karten konkurrieren miteinander, weil keine **visuell hervorgehoben** ist. Notfall hat zwar eine eigene Akut-Variante (`--crisis`), die anderen drei sind formal gleich — das ist weder klare Empfehlung noch klare Sicherheits-Hierarchie.

**Punkt 13 (Doppelung Werkzeuge):** Entry-Path „Ich suche konkrete Werkzeuge" → `/werkzeuge/`. Weiter unten auf derselben Seite die Section `.tools-highlight` mit drei Tool-Karten plus „Alle Werkzeuge ansehen". **Zwei separate Werkzeuge-Einstiege** auf einer Seite.

**Punkt 10 (Wissensreise vs. Portal):** Im `#module`-Grid sind alle 8 Module **gleichwertig** dargestellt. Der Hinweis „Sie müssen nicht bei Modul 1 anfangen" ist freundlich, aber lässt offen, wo man sonst anfangen sollte. Es gibt **keine sichtbare Empfehlung der Reihenfolge** und keinen Marker „Empfohlener Einstieg".

**Punkt 9 (kürzere Blöcke):** Hero-Subtitle hat einen einzigen Satz mit ~50 Wörtern, der vier Themen aufzählt (Module, Notfallhilfe, Werkzeuge, Anlaufstellen). Für müde Leser:innen lang. Zudem repliziert er die Nav-Struktur — informativ, aber redundant.

**Punkt 14 (Reizdichte):** SOS-Banner sitzt zwischen Hero und Intro. Visuell ein **harter Stop** (rote Akzentfarbe, eigene Box), genau dort, wo das erste inhaltliche Setup beginnt. Funktional korrekt (Sicherheit vor Information), aber unterbricht den Lesefluss-Aufbau.

### Was schon gut ist

- **Hero selbst ist schlank** (1 H1, 1 Sub, 1 CTA). Editorial-Review-Punkt 8/11 ist erfüllt.
- **Story-Section + Einladung am Ende** geben einen ruhigen Schluss-Bogen — kein zusätzliches Entscheidungs-Bombardement.
- **Lese-Spalten-Breiten** sind nach den heutigen Patches (PR #294) auf `--measure-prose` / `--measure-lead`.
- **Alle CTAs sind inhaltlich begründet** — keine Marketing-Buttons, keine Pop-ups.

---

## Befund Modul 8 (Hub)

Strukturell ähnlich, mit eigenem Hub-Hero und eigenen Pathways:

- Hub-Hero: H1 + Lead (1 Satz)
- Urgent-Note (gleiche rote SOS-Box wie Startseite)
- Hub-Pathways: 3 Karten (Akut / Reden / Austausch)
- Darunter: Beratung, Tools-Highlight, Modul-8-Inhalte, Materialien, Mini-Plan, Selbsthilfe

**CTAs „above the second scroll": ~3 Pathways + 4 Nav + Urgent-Note + Hub-Lead-Link** = ~9 simultane Optionen.

Der Hub ist insgesamt **stärker handlungsorientiert** als die Startseite (Pathways bereits klar nach Bedarfssituation gruppiert: Akut/Reden/Austausch). Hier ist die Reduktion bereits weiter vollzogen.

**Sub-Befund:** Urgent-Note zwischen Hub-Hero und Hub-Pathways wirkt bei einem **bereits stark Hub-orientierten** Layout doppelt — die Pathways selbst kommunizieren schon „Akut zuerst". Die Urgent-Note dazwischen ist eher Reminder-Doppelung als Sicherheits-Notwendigkeit.

---

## Empfehlungen

Bewusst nach Risiko geordnet — von „klein und unstrittig" zu „strategischer Eingriff".

### R1 — Entry-Path „Werkzeuge" entfernen oder visuell entschärfen

**Befund:** Doppelung zur `.tools-highlight`-Section weiter unten.

**Vorschlag:** Entry-Paths auf 3 reduzieren (Notfall / Verstehen / Eigene Belastung). Werkzeuge bleiben in der `.tools-highlight`-Section weiter unten — dort sind sie passend als „wenn Sie sofort etwas Konkretes wollen" gerahmt.

**Aufwand:** S — eine `<a>`-Karte aus index.njk entfernen.
**Risiko:** Niedrig. Werkzeuge bleiben über Nav + Tools-Section + interne Modul-Verlinkungen erreichbar.
**Editorial-Punkt:** 13 (Reduktion gleichzeitiger Entscheidungen).

### R2 — Hero-Subtitle eindampfen

**Vorher:** „Sie müssen hier nichts auf einmal lösen. Diese Website hilft Angehörigen und Nahestehenden, die Erkrankung, die eigene Belastung und mögliche nächste Schritte einzuordnen — mit verständlichen Modulen, Notfallhilfe, praktischen Werkzeugen und Anlaufstellen."  (~50 Wörter, 4 Themen aufgezählt)

**Nachher (Vorschlag):** „Eine ruhige Begleitung für Angehörige und Nahestehende — Sie müssen hier nichts auf einmal lösen."  (~15 Wörter, keine Themen-Aufzählung)

Die Themen-Aufzählung ist redundant zur Nav und zu den Entry-Paths darunter.

**Aufwand:** S — eine Zeile in index.njk.
**Risiko:** Niedrig — Subtitle wird kürzer, klarere emotionale Lesart.
**Editorial-Punkt:** 9 (kürzere Blöcke).

### R3 — Modul-Grid: visuelle Empfehlung der Reihenfolge

**Befund:** Alle 8 Module gleichwertig — keine Lese-Empfehlung sichtbar.

**Vorschlag:** Modul 1 + Modul 2 als „Empfohlener Einstieg" markieren (z.B. Badge „Anfangen hier" oder dezente visuelle Hervorhebung der ersten zwei Karten). Plus Section-Lead anpassen:

> „**Wenn Sie nicht wissen, wo Sie anfangen sollen — Modul 1 und 2 geben den geordneten Einstieg.** Sie können aber jedes Modul direkt anwählen."

**Aufwand:** M — Frontend-Änderung an Modul-Karten (Badge-Pattern existiert), Section-Lead-Text anpassen.
**Risiko:** Mittel — verändert das Selbstverständnis von „freier Wahl" zu „Empfehlung mit Freiheit". Stakeholder-Entscheidung.
**Editorial-Punkt:** 10 (geführte Wissensreise) + 13 (Reduktion).

### R4 — `.tools-highlight`: 3 → 1 Top-Tool plus Hinweis

**Befund:** 3 Tool-Karten (Selbsttest, Krisenplan, Phasenverlauf) + „Alle Werkzeuge ansehen"-Link auf der Startseite. Sie konkurrieren miteinander; keine ist klar das „eine Top-Werkzeug".

**Vorschlag:** Eine Top-Empfehlung — z.B. **Selbsttest** als Einzel-Karte breiter dargestellt („5 Fragen — wo stehen Sie gerade?"), gefolgt von Sekundär-Link „Alle 9 Werkzeuge ansehen →".

**Aufwand:** M — HTML-Struktur + CSS-Hervorhebung.
**Risiko:** Mittel — privilegiert ein Werkzeug über die anderen. Stakeholder-Entscheidung, welches Tool das wäre (Selbsttest = Diagnose der eigenen Lage; Einstiegsfrage = sehr kurze Triage; Krisenplan = handfest, aber setzt mehr voraus).
**Editorial-Punkt:** 14 (Reduktion gleichzeitiger Optionen).

### R5 — SOS-Banner: Position und Häufigkeit überdenken

**Befund:** Rote SOS-Box erscheint als Standalone-Section nach Hero auf der Startseite und nach Hub-Hero auf Modul 8. Auf der Startseite zwischen Hero und Intro, auf Modul 8 zwischen Hub-Hero und Pathways. Nav hat zudem den „SOS Krise"-Button.

**Drei Optionen:**

a) **Belassen** — bewusst redundant für Sicherheit. Aktuelle Wahl.
b) **Als persistente Top-Bar** über der Nav (immer sichtbar, dünn): „Bei akuten Krisen: 144 / Notfallweg →". Reduziert die Box-Doppelung pro Seite.
c) **Aus Modul 8 entfernen, auf Startseite belassen** — Modul-8-Pathways kommunizieren „Akut" bereits visuell durch eigene `--alert`-Karte. Die Box dazwischen ist Doppelung.

**Aufwand:** S für (c), M für (b).
**Risiko:** Mittel — Sicherheitsgeste auf einer psychoedukatischen Site ist nicht-trivial. Empfehlung: Stakeholder-Entscheidung, ich präferiere (c) als ersten Schritt.
**Editorial-Punkt:** 14 (Reduktion Reizdichte).

### R6 — Optional: „Neu hier?"-Karte als Trichter

**Befund:** Wer auf der Startseite landet und „neu" ist, hat 4 Pfade plus 8 Module plus 3 Tools — viel.

**Vorschlag:** Eine **„Sind Sie neu hier?"**-Karte oben (oder im Helper-Bereich) mit dem direkten Trichter zur **Einstiegsfrage** (`/tools/einstiegsfrage/`). Die Einstiegsfrage existiert bereits und sortiert nach Lage. Der Hinweis steht aktuell als kurze Zeile im Intro versteckt — könnte stärker sichtbar gemacht werden.

**Aufwand:** S — neue Karte als Section, oder Aufwertung des existierenden Helper-Links.
**Risiko:** Niedrig — additiv, keine Entfernung. Macht den Trichter offensichtlicher.
**Editorial-Punkt:** 10 (geführte Wissensreise).

---

## Empfohlene Reihenfolge der Umsetzung

1. **R1 + R2** zusammen — kleinster Eingriff, sofort spürbarer Effekt (3 statt 4 Entry-Pfade, kürzerer Subtitle). Ein PR.
2. **R5(c)** als nächstes — SOS-Banner aus Modul 8 entfernen. Ein PR.
3. **R6** als kleine Aufwertung — Einstiegsfrage als Trichter sichtbarer. Ein PR.
4. **R3** als Stakeholder-Entscheidung — „Empfohlener Einstieg"-Badge. Braucht Diskussion.
5. **R4** als Stakeholder-Entscheidung — Top-Tool-Privilegierung. Braucht Diskussion welches Tool.

R1 + R2 + R5(c) + R6 sind redaktionell unstrittig und können ohne Diskussion in kleine PRs übersetzt werden. R3 + R4 ändern die Selbst-Konzeption der Site (Empfehlung statt freie Wahl) — das verdient eine bewusste Entscheidung.

---

## Was nicht in diesem Audit ist

- Detaillierte A/B-Test-Empfehlungen (kein Tracking-Setup auf der Site)
- Tool-Tiefenanalyse (eigener Scope)
- Mobile-spezifische Reizdichte-Analyse (analog, aber separat)

---

**Erstellt von Claude Code — 8. Mai 2026, im Anschluss an Editorial-Review-Strecke (PR #288–#296).**
