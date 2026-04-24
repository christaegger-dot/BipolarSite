# Review Startseite und Modul 8 — 24. April 2026

**Scope:** Startseite (bipolarsite.netlify.app) und Modul 8 (/modul/8/).
Andere Module, Werkzeuge, Notfall, Impressum sind in diesem Review
nicht enthalten — nur durch Referenzen wo relevant.

**Reviewer:** externe Zweitmeinung (via Claude).

**Methodik:** PDF-Export der Desktop-Ansicht, Live-HTML-Fetch,
Detail-Screenshots von einzelnen Komponenten, Live-Screenshot Modul 8.

**Status:** 37 Einzelbefunde identifiziert, davon:
- 16 kritisch (sollten vor nächster öffentlicher Distribution adressiert werden)
- 17 mittel (gestaffelt abarbeitbar)
- 4 kosmetisch (nice-to-have)
- 2 verworfen (falsche Annahmen aus dem PDF-Review — hier dokumentiert für Nachvollziehbarkeit)

**Blinde Flecken dieses Reviews:**
- Mobile-/Tablet-Verhalten nicht geprüft
- Hover-States, Focus-Ringe, Animation nicht geprüft
- Screenreader-Erfahrung nur aus HTML ableitbar, nicht real getestet
- Keine PAC-/WCAG-Compliance-Prüfung mit Tools

---

## Executive Summary

Die Startseite ist **inhaltlich und ethisch sorgfältig gemacht**.
Typografie auf hohem Niveau, Farbwelt konsistent, partner-dezentrierte
Sprache. Technische Basis-Accessibility (Skip-Link, `tel:`/`mailto:`-Links,
Fiktionalitäts-Hinweis am Zitat, Impressum-Tieflinks) ist vorbildlich.

**Die kritischsten Handlungsfelder:**

1. **Primärer CTA hat schweren Kontrast-Defekt.** Der Hauptbutton „Jetzt
   starten: Modul 1 lesen" ist auf teal-Hintergrund kaum lesbar. Das ist
   ein WCAG-AA-Verstoss am wichtigsten Klick der Seite.
2. **Modul 8 hat massive Layout- und Konzept-Probleme.** Der Navigations-
   Reiter „Modul 8" verwirrt neue Besucher. Die Modul-8-Seite selbst hat
   überlagerte Elemente im Header, ein kontextloses Kompass-Icon in der
   TOC, ein Mindmap-Diagramm das mehr verwirrt als informiert, und eine
   Template-Struktur die dem Zweck (Ressourcen-Hub statt Lernmodul) nicht
   gerecht wird.
3. **Semantische HTML-Struktur ist unvollständig.** Heading-Hierarchie
   springt, Alt-Texte sind uneinheitlich, SEO-Metadata muss verifiziert werden.
4. **Positionierung zu PUK Zürich ist in sich widersprüchlich.** Header
   nennt „Psychiatrische Universitätsklinik Zürich · Fachstelle
   Angehörigenarbeit", Footer sagt „Kein offizielles Angebot der PUK
   Zürich". Das muss konsistent werden — entweder offiziell oder klar
   eigenständig.

Neben diesen vier Handlungsfeldern gibt es viele mittlere und kleine
Befunde, die gestaffelt adressiert werden können.

---

## Kritische Befunde (16)

### Header und Navigation

#### K-01 · Navigationseintrag „Modul 8" durch sprechenden Namen ersetzen
Ein nummerierter Modul-Link ohne Kontext in der Haupt-Navigation verwirrt
neue Besucher. „Modul 8" kommuniziert nicht, warum es diesen Platz
verdient.

**Entscheidung:** Reiter umbenennen zu `Anlaufstellen` (bestätigt durch
Christa). URL `/modul/8/` beibehalten. Aria-Label entsprechend anpassen.

**Aufwand:** S.
**Abhängigkeiten:** Keine.

#### K-02 · Inkonsistente Reiter-Beschriftung „SOS" vs „SOS Krise"
Im HTML sind zwei getrennte Notfall-Links vorhanden — ein Desktop-Link
„SOS Krise" und ein Mobile-Link „SOS". Beide zeigen auf `/notfall/`.
Uneinheitliche Beschriftung für denselben Ziel-Link.

**Vorschlag:** Beide auf `SOS Krise` vereinheitlichen (gleiche Länge passt
auch mobil noch auf den Button).

**Aufwand:** XS.
**Abhängigkeiten:** Keine.

### Hero-Bereich

#### K-03 · Primärer CTA-Button hat Kontrast-Defekt (WCAG-AA-Verstoss)
Der Button „Jetzt starten: Modul 1 lesen →" zeigt dunklen Text auf
teal-Hintergrund. Visuell kaum lesbar. Geschätzter Kontrast ca. 2:1 —
WCAG AA fordert 4.5:1 für Fliesstext, 3:1 für grossen Text.

**Fix:** Button-Text auf Weiss setzen. Oder Button-Hintergrund deutlich
verdunkeln. Anschliessend mit WebAIM Contrast Checker oder Lighthouse
verifizieren.

**Aufwand:** XS.
**Abhängigkeiten:** Keine. Dies ist der dringlichste Einzelbefund des
gesamten Reviews.

#### K-04 · Drei Hero-Textlinks ohne Button-Affordance
„Ich bin gerade in einer Krise → Sofort-Hilfe", „Ich möchte die Krankheit
verstehen → Modul 1", „Ich suche praktische Werkzeuge → Alle Werkzeuge"
sind die wichtigsten Entscheidungs-Momente der Seite, wirken aber wie
Fliesstext ohne klare Klickbarkeits-Signale.

**Fix:** Als echte Buttons, Karten, oder mindestens mit Hover-Unterstreichung
+ stärkerer Farb-Differenzierung gestalten.

**Aufwand:** S.
**Abhängigkeiten:** Design-Entscheidung (Button vs. Karten vs. verlinkte
Liste).

### „Wo anfangen?"-Wizard

#### K-05 · Warnhinweis bei Akutsituationen sitzt nach den Wizard-Buttons
Der rote Hinweis „Bei Suizidgedanken, Manie, Psychose oder Gewalt → Direkt
zum Notfallweg" steht *unter* den Wizard-Fragen. Ein Nutzer in Akutlage
muss zuerst klicken, bevor er den richtigen Weg sieht.

**Fix:** Warnhinweis *vor* oder *neben* den Wizard-Fragen platzieren.
Sicherheits-first vor Orientierungs-Logik.

**Aufwand:** S.
**Abhängigkeiten:** Keine.

#### K-06 · Wizard-Frage 4 erzwingt falsche Entweder-Oder-Entscheidung
„Brauchen Sie vor allem Grundlagenwissen über die Erkrankung?" mit
Antworten „Ja" / „Nein, eher Werkzeuge und Orientierung". Viele Angehörige
brauchen beides.

**Fix:** Frage umformulieren oder dritte Option hinzufügen („Sowohl als
auch / ich weiss noch nicht").

**Aufwand:** S (Content) + XS (Code wenn dritte Option).
**Abhängigkeiten:** Inhaltliche Entscheidung.

#### K-07 · Wizard-Frage 5 ist underbeleuchtet
„Was steht bei Ihnen gerade am meisten im Vordergrund?" (mit 3 Optionen)
ist die Schlüsselfrage für die Navigation, aber ohne Vorschau, was die
Antworten produzieren.

**Fix:** Meta-Hinweis einfügen: „Ihre Antwort leitet Sie zu einem
passenden Modul oder Werkzeug." Oder Ergebnis-Vorschau nach dem Klick.

**Aufwand:** S.
**Abhängigkeiten:** Wizard-Logik muss Ergebnis-Pfade kennen.

### Inhaltliche Struktur

#### K-08 · Modul 2 Titel „Was das mit Ihnen macht" ist mehrdeutig
Das „das" ist referenziell unklar. Kann als Krankheit, Lektüre oder
allgemein verstanden werden.

**Fix:** Klarerer Titel. Vorschläge: „Was die Erkrankung mit Ihnen als
Angehörige\*r macht" oder „Die eigene Belastung verstehen".

**Aufwand:** XS.
**Abhängigkeiten:** Inhaltliche Entscheidung + ggf. URL-Slug.

### Bilder und Illustrationen

#### K-09 · Zweite Illustration ohne Alt-Text
Die Illustration der sitzenden Figur am Fenster beim Erfahrungsbericht
hat kein Alt-Attribut (oder ein leeres) im HTML-Output. Erste Illustration
hat einen sehr guten Alt-Text — hier fehlt er.

**Fix:** Passenden Alt-Text ergänzen. Z.B. „Illustration einer Person,
die nachdenklich in einem Sessel am Fenster sitzt — stille Szene der
Selbstreflexion".

**Aufwand:** XS.
**Abhängigkeiten:** Keine.

### Footer und rechtlicher Status

#### K-10 · Positionierung zu PUK Zürich ist in sich widersprüchlich
Header: „Psychiatrische Universitätsklinik Zürich · Fachstelle
Angehörigenarbeit".
Footer: „Kein offizielles Angebot der PUK Zürich".

Das widerspricht sich. Entweder ist die Site ein offizielles Angebot
(dann muss der Footer-Disclaimer neu formuliert werden), oder sie ist
eigenständig (dann muss die Header-Attribution reduziert werden).

**Fix:** Inhaltliche Klärung mit der PUK-Kommunikationsverantwortlichen,
dann Texte harmonisieren.

**Aufwand:** S (Text) + inhaltliche Klärung (Zeit).
**Abhängigkeiten:** PUK-interne Klärung. Das ist *keine* Claude-Code-Aufgabe.

### Semantik und SEO

#### K-11 · Heading-Hierarchie springt
Aus dem HTML-Output nicht eindeutig sichtbar, ob ein echter `<h1>`
existiert. Unter-Überschriften („Die 8 Module im Überblick") sind `<h2>`,
Modul-Karten haben `<h3>` — aber die Modul-Nummern-Pills („MODUL 1")
wirken visuell wie Überschriften, ohne semantisch welche zu sein.

**Fix:** Im DOM-Inspector prüfen. H1-Element muss genau einmal vorkommen
(Hero-Titel). H2 für Sektions-Überschriften. H3 für Karten-Titel. Keine
Sprünge.

**Aufwand:** S.
**Abhängigkeiten:** Accessibility-Audit.

#### K-12 · SEO-Metadaten verifizieren
`<meta name="description">` und Open-Graph-Tags sind aus dem HTML-Output
nicht sicher sichtbar. Für klinisch-seriöse Site elementar.

**Fix:** Prüfen und ergänzen:
- Meta-Description (ca. 150 Zeichen)
- `og:title`, `og:description`, `og:image`, `og:url`
- `twitter:card`

**Aufwand:** S.
**Abhängigkeiten:** Keine.

### Modul 8 (siehe auch Cross-Cutting-Sektion)

#### K-13 · Kompass-Icon auf Modul 8 Sidebar-TOC ist kontextlos
Das Icon rutscht zwischen TOC-Einträgen 2 und 3 hinein, gehört aber
offenbar zu keinem konkreten Element. Entweder CSS-Positionierungsbug
oder vergessenes Dekorations-Asset.

**Fix:** DOM-Inspector aufrufen, Herkunft identifizieren. Entweder sauber
positionieren (falls beabsichtigt) oder entfernen.

**Aufwand:** XS (Diagnose) + XS (Fix).
**Abhängigkeiten:** Keine.

#### K-14 · Modul 8 Header-Zone ist layoutmässig kollidiert
Sidebar-TOC, Breadcrumb, H1-Titel und MODUL-8/8-Badge teilen sich denselben
vertikalen Bereich ohne klare Abgrenzung. Der H1 verliert seine visuelle
Dominanz. Der Badge „MODUL 8 / 8" sitzt auf gleicher Zeile wie ein
TOC-Eintrag.

**Fix:** Layout neu ordnen. H1-Zone ausreichend Platz geben. Badge an
den H1 ankern, nicht neben den TOC.

**Aufwand:** M.
**Abhängigkeiten:** Keine.

#### K-15 · Mindmap-Diagramm auf Modul 8 ist dekorativ, nicht informativ
Das Diagramm oben rechts zeigt Kategorien (Beratung / Notfallweg /
Selbsthilfe / Materialien / Recht-Ombuds / Nächster Schritt), die **nicht
mit der Sidebar-TOC übereinstimmen** (TOC: Wie weitergehen / Orientierung
nach Situation / Anlaufstellen nach Zweck / Die wichtigsten Materialien).
Enthält ein kontextloses zentrales Icon. Konkurriert visuell mit dem H1.

**Fix:** Entscheidung zwischen drei Optionen:
1. Entfernen (pragmatisch)
2. Radikal vereinfachen (z.B. nur als dekorative Abschluss-Grafik unten
   auf der Seite)
3. Inhaltlich mit dem Modul synchronisieren (alle Kategorien identisch zu
   TOC und Content-Struktur)

**Aufwand:** M (Entfernen) bis L (Synchronisieren).
**Abhängigkeiten:** Strategische Entscheidung.

#### K-16 · Modul 8 Lead-Absatz-Typografie bricht aus dem Stil aus
Der erste Absatz („Dieses Modul ist zuerst ein Schnellstart-Arbeitsbereich.")
hat deutlich grössere Schrift und Zeilenhöhe als der Folge-Absatz.
Möglicherweise als Lead-Absatz gemeint, aber Kontrast so stark, dass es
wie ein Bug wirkt.

**Fix:** Entweder CSS-Token „lead paragraph" sauber definieren und konsistent
anwenden, oder Grösse auf Body-Text normalisieren.

**Aufwand:** S.
**Abhängigkeiten:** Designsystem-Entscheidung.

---

## Mittlere Befunde (17)

### Startseite

#### M-01 · Hero-Teaser-Illustration ist inhaltsarm
Kleiner Tisch mit zwei Tassen — charmant, aber kommuniziert wenig über
das Thema. Die zweite Illustration weiter unten (Figur am Fenster) ist
inhaltlich stärker.

**Vorschlag:** Prominente Hero-Illustration inhaltlich stärker wählen.
**Aufwand:** S (wenn Asset existiert) bis L (neue Illustration).

#### M-02 · Gender-Stern „Angehörige\*r" prüfen
Der Asterisk wird von Screenreadern als „Sterntaste" vorgelesen und ist
in der deutschen Gender-Diskussion umstritten. Für eine klinische
Institution zu klären.

**Vorschlag:** Mit PUK-Kommunikation abstimmen. Alternativen: „Angehörige
und Nahestehende", oder durchgehend Gender-Doppelpunkt, oder Plural-Form.
**Aufwand:** S (Text) + Konsistenz-Check.
**Abhängigkeiten:** Institutionelle Styleguide-Entscheidung.

### „Wo anfangen?"-Wizard

#### M-03 · Wizard-Antwortformate inkonsistent
Frage 1: binär asymmetrisch („Ja oder unklar" / „Nein").
Frage 2: lang-formuliert („Ja, die Diagnose ist ganz neu" / „Nein…").
Frage 3: kurz-binär.
Frage 4: asymmetrisch lang-binär.
Frage 5: ternär ohne Ja/Nein.

**Vorschlag:** Formate vereinheitlichen oder Wechsel im Intro erklären.
**Aufwand:** S.

#### M-04 · Wizard-Fortschritts-Indikator fehlt
Nutzer sieht nicht, wieviele Fragen folgen oder wohin die Antworten führen.

**Vorschlag:** „Frage 1 von 5 — Ergebnis leitet Sie zu einem passenden
Einstieg" als Header.
**Aufwand:** S.

### Module-Übersicht

#### M-05 · Modul-Karten-Höhen ungleichmässig
Inhalte unterschiedlicher Länge, gleiche Karten-Höhe fehlt.

**Vorschlag:** `min-height` setzen oder Content auf einheitliche Zeilenzahl
normieren.
**Aufwand:** XS (CSS) oder S (Content).

#### M-06 · Zeitformatierungen uneinheitlich
„10–12 Min.", „8–10 Min.", „12 Min. mit Vertiefungen 22", „Schnellstart
3–5 Min.". Mal mit, mal ohne Bindestrich, mal mit Zusatzangaben.

**Vorschlag:** Einheitliche Notation wählen und durchziehen.
**Aufwand:** XS.

#### M-07 · Modul-Nummer-Pills alle in gleicher teal-Farbe
Wenn Module inhaltlichen Gruppen angehören (Grundlagen / Praxis / Ressourcen),
könnte dezente Farb-Differenzierung die Struktur kommunizieren.

**Vorschlag:** Design-Entscheidung zu gruppierter Farbgebung.
**Aufwand:** S.
**Abhängigkeiten:** Modul-Gruppierungs-Konzept.

#### M-08 · Modul-Karten-Aria-Labels sind lang
Der gesamte Karten-Text ist Link-Text, was für Screenreader ein sehr
langer Link wird.

**Vorschlag:** Kürzere `aria-label` auf der Link-Komponente: z.B. „Modul
1: Die bipolare Störung verstehen — ca. 10 Minuten".
**Aufwand:** S.

### „Direkt ausprobieren"

#### M-09 · Werkzeug-Kategorie-Badges uniform gefärbt
SELBSTTEST / WERKZEUG / INTERAKTIV in gleicher Sand-Farbe. Suggerieren
Kategorien, sehen gleich aus.

**Vorschlag:** Drei klar unterschiedene Farben, oder nur eine einheitliche
Kategorie.
**Aufwand:** XS.

#### M-10 · Werkzeug-Titel wiederholen die Kategorie-Badges
„Belastungs-Selbsttest" unter Badge „SELBSTTEST"; „Krisenplan-Werkzeug"
unter Badge „WERKZEUG". Redundanz.

**Vorschlag:** Titel kürzen: „Belastung einschätzen" und „Krisenplan".
**Aufwand:** XS.

### Erfahrungsbericht

#### M-11 · Anonymisiert-Disclaimer zu klein
„(anonymisiert, keine reale Person)" steht in Klammern in sehr kleiner
Schrift. Für ethische Transparenz wichtig.

**Vorschlag:** Visuell stärker hervorheben oder in eigene Zeile.
**Aufwand:** XS.

### CTA-Block „Sie müssen nicht wissen…"

#### M-12 · Primär/Sekundär-Hierarchie im Kontaktbereich fehlt
Telefon-Button und E-Mail-Button visuell gleich gewichtet. Telefon (direkter,
schneller Kontakt) sollte primäre Aktion sein.

**Vorschlag:** Telefon-Button stärker hervorgehoben (gefüllt), E-Mail als
sekundär (outlined).
**Aufwand:** XS.

### Footer

#### M-13 · „Inhaltliche Verantwortung: Ch. Egger" ohne visuelle Akzentuierung
Wichtige Attribution, steht aber im Fliess-Stil der Footer-Zeile.

**Vorschlag:** Leicht hervorheben (z.B. bold, oder mit Link auf
Ansprechpartner-Seite).
**Aufwand:** XS.

#### M-14 · „Stand: April 2026" statisch
Manuelle Aktualisierung nötig bei jedem Content-Update.

**Vorschlag:** Dynamisches Datum (beim Build generiert).
**Aufwand:** S.

### Technisch

#### M-15 · Favicon-Fallback fehlt möglicherweise
Nur `/favicon.svg` sichtbar. Ältere Browser brauchen `.ico` oder `.png`.

**Vorschlag:** `favicon.ico` und PNG-Varianten ergänzen.
**Aufwand:** XS.

#### M-16 · Drei Einstiegspunkte zu Werkzeugen
Header „Werkzeuge", Hero-Link „Alle Werkzeuge", Tools-Abschnitt „Alle
Werkzeuge ansehen". Redundanz.

**Vorschlag:** Prüfen, ob alle drei nötig sind. Hero-Link optional durch
konkreten Tool-Link ersetzen.
**Aufwand:** S.

### Modul 8

#### M-17 · Modul 8 ist konzeptionell kein „Modul" sondern ein Ressourcen-Hub
Die Anwendung der Modul-Template-Logik auf einen Abschlussbereich, der
funktional anders ist, erzeugt strukturelle Reibung (siehe auch K-13
bis K-16).

**Strategie-Optionen:**
- **A (gross):** Eigene Page-Vorlage für Modul 8. Kein Mindmap, direkt
  handlungsorientierte Kategorien als Karten.
- **B (pragmatisch):** Aufräumen im bestehenden Rahmen. Die vier Einzel-
  Befunde K-13 bis K-16 adressieren.

**Entscheidung aussteht.** Empfehlung: zuerst B, später bei Gelegenheit A
als Refactoring.

---

## Kosmetische Befunde (4)

#### C-01 · Zeitangaben vereinheitlichen
Siehe M-06, aber in der kosmetischen Variante (falls M-06 bereits als
einheitlich eingestuft wird und dies nur noch Feinabstimmung ist).

#### C-02 · Modul-Kategorie-Pills Farb-Differenzierung
Siehe M-07. Nur als Kosmetik relevant, wenn keine inhaltliche Gruppierung
der Module existiert.

#### C-03 · Pfeile in Karten-CTAs ohne Hover-Animation
Die → rechts in Karten könnten beim Hover 2-3px nach rechts gleiten.

**Aufwand:** XS.

#### C-04 · Hero-Illustration-Stil prüfen
Die beiden Illustrationen (Tisch mit Tassen, Figur am Fenster) haben
unterschiedliche Stile. Design-Konsistenz prüfen.

**Aufwand:** S (Prüfung) + variabler Aufwand je nach Ergebnis.

---

## Verworfene Befunde (2)

Diese Punkte waren in einer früheren PDF-basierten Review-Runde enthalten,
sind aber beim Live-HTML-Check verworfen worden. Hier für Nachvollziehbarkeit
dokumentiert.

#### V-01 · Telefonnummer ist kein `tel:`-Link — **FALSCH**
Im HTML korrekt als `tel:+41583843800` gesetzt. Kein Handlungsbedarf.

#### V-02 · E-Mail-Adresse ist kein `mailto:`-Link — **FALSCH**
Im HTML korrekt als `mailto:angehoerigenarbeit@pukzh.ch` gesetzt. Kein
Handlungsbedarf.

---

## Cross-Cutting-Themen

Diese Punkte betreffen mehrere Einzelbefunde und bilden eigene Arbeitspakete.

### CC-01 · Modul-8-Gesamt-Refactoring
Umfasst: K-13, K-14, K-15, K-16, M-17.

Empfehlung: als eigene Session anpacken. Nicht mit Startseite-Fixes
vermischen. Strategische Vorfrage (Pragmatisch oder Grosser Refactor)
erst entscheiden.

### CC-02 · Kontrast-Audit seitenweit
Auslöser: K-03. Wenn der primäre CTA einen schweren Kontrast-Defekt hat,
ist zu prüfen, ob andere teal-Flächen mit Text betroffen sind. Audit mit
Lighthouse oder Axe DevTools.

Umfang: alle Seiten, alle teal-auf-Text-Kombinationen.

### CC-03 · Heading-Hierarchie-Audit
Auslöser: K-11. Nicht nur auf der Startseite prüfen, sondern auf allen
Modul-Seiten, Werkzeugen und Impressum.

Tool: Browser-DevTools Accessibility-Tab, oder axe-core.

### CC-04 · SEO- und Social-Media-Metadata-Audit
Auslöser: K-12. Neben der Meta-Description auch:
- Canonical URLs
- Robots-Meta
- Sitemap.xml Existenz
- Social-Media-Cards

### CC-05 · Positionierungs-Klärung zu PUK Zürich
Auslöser: K-10. Das ist die inhaltlich wichtigste Klärung, sie beeinflusst
Header, Footer, Impressum, und eventuell weitere Stellen.

**Entscheidungsbefugte:** PUK-Kommunikation + Ch. Egger. Nicht Claude
Code CLI.

---

## Empfohlene Abarbeitungs-Sequenz

### Welle 1 — Kritische Quick-Wins (ca. 1 Session)
K-01 (Modul 8 → Anlaufstellen), K-02 (SOS-Benennung), K-03 (CTA-Kontrast),
K-09 (Alt-Text), K-13 (Kompass-Icon diagnostizieren und fixen), K-16
(Lead-Absatz), M-06 (Zeitangaben), M-10 (Werkzeug-Titel).

Alles XS bis S, alles reine Frontend-Fixes, keine inhaltlichen
Entscheidungen nötig.

### Welle 2 — Kritische Frontend-Strukturarbeit (ca. 1 Session)
K-04 (Hero-Textlinks als Buttons), K-05 (Warnhinweis-Position), K-11
(Heading-Hierarchie), K-14 (Modul-8-Header-Zone), K-15 (Mindmap
entscheiden + umsetzen).

Grössere Eingriffe, eine klare Design-Entscheidung bei K-04 und K-15.

### Welle 3 — Content- und Strategie-Entscheidungen
K-06 (Wizard-Frage 4), K-07 (Wizard-Frage 5 Vorschau), K-08 (Modul-2
Titel), K-10 (PUK-Positionierung), K-12 (SEO-Metadaten), M-02 (Gender-
Stern), M-17 (Modul-8-Architektur-Entscheidung).

Diese Welle braucht inhaltliche Abstimmung mit PUK-Verantwortlichen und
strategische Entscheidungen. Nicht eilig.

### Welle 4 — Mittlere Pflege-Arbeiten
M-01, M-03, M-04, M-05, M-07, M-08, M-09, M-11, M-12, M-13, M-14, M-15,
M-16.

Kann gestaffelt in kleineren Sessions abgearbeitet werden.

### Welle 5 — Kosmetisch
C-01 bis C-04. Wenn Zeit ist.

---

## Anmerkung zur Review-Qualität

Dieser Review wurde in zwei Iterationen erstellt: zuerst auf Basis eines
PDF-Exports (ergab 20 Punkte, davon einige mit falschen Annahmen), dann
mit Live-HTML-Fetch und Detail-Screenshots korrigiert und erweitert auf
37 Punkte. Die 2 verworfenen Annahmen sind dokumentiert (V-01, V-02).

Die Beobachtungen zum Modul-8-Layout, zum CTA-Kontrast und zur
Modul-8-Navigationsfrage kamen von Christa direkt. Diese Makro-Befunde
wären einem externen Reviewer ohne Kontext-Kenntnis nicht zugänglich
gewesen.

**Nächste Review-Runde empfohlen:** nach Welle 1 und 2 erneut prüfen,
mit Fokus auf:
- Mobile-Ansicht (dieser Review: nur Desktop)
- Notfall-Seite (ausserhalb dieses Scopes)
- Werkzeuge-Unterseiten
- Einzelne Modulseiten 1–7

**Für Claude Code CLI:** Beim Umsetzen jeden Befund als eigenen atomaren
Commit. Commit-Message-Präfix: `fix(review-24apr):` für kritische Fixes,
`chore(review-24apr):` für mittlere und kosmetische. Im Commit-Body den
Befund-Code (z.B. K-03) nennen, damit Rückverfolgbarkeit zu diesem Review
möglich ist.
