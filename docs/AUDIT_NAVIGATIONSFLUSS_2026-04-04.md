# Audit 4: Navigationsfluss & Nutzerführung

**Site:** bipolarsite.netlify.app  
**Repo:** christaegger-dot/BipolarSite  
**Datum:** 4. April 2026  
**Scope:** Modulnavigation, Tool-Verlinkung, Breadcrumbs, Rückwege, Endpunkte

---

## Zusammenfassung

Die Homepage führt Nutzer*innen jetzt sauber per Triage in ein Modul. Aber sobald sie dort ankommen, wird die Navigation einseitig: Es gibt nur Vorwärts-Links (→ nächstes Modul), keinen einzigen Zurück-Link. Zwei Module (M3, M8) verlinken auf kein Werkzeug, obwohl passende existieren. Zwei Tool-Rücklinks führen zum falschen Modul. Und Modul 8 — der Endpunkt des gesamten Lernpfads — endet ohne Abschluss-Element und ohne Rückweg.

---

## Befund 1: Kein einziger Zurück-Link

Alle 8 Module haben **0 Zurück-/Vorheriges-Modul-Links**. Module 1–7 haben einen «Nächstes Modul»-Link am Ende. Die Navigation ist eine Einbahnstrasse.

| Modul | ← Zurück | → Weiter |
|-------|----------|----------|
| M1 | — | M2 |
| M2 | — | M3 |
| M3 | — | M4 |
| M4 | — | M5 |
| M5 | — | M6 |
| M6 | — | M7 |
| M7 | — | M8 |
| M8 | — | **nichts** |

Für lineare Leser*innen funktioniert die Vorwärts-Kette. Aber die Site betont explizit nicht-lineares Lesen — die Triage schickt Menschen direkt in M2, M3, M4 oder M6. Wer per Triage in Modul 3 gelandet ist und Modul 3 fertig gelesen hat, kann nicht «zurück zur Orientierung» oder «ein anderes Modul wählen», ausser über Breadcrumbs oder Browser-Back.

### Warum das problematisch ist

Breadcrumbs sind vorhanden (Startseite › Module › [Titel]), aber sie sind klein, stehen ganz oben, und nach dem Lesen eines ganzen Moduls ist man ganz unten. Die «nächstes Modul»-Karte am Ende ist prominent und einladend — sie zieht die Person in den linearen Pfad, auch wenn sie per Triage nicht-linear eingestiegen ist.

---

## Befund 2: Tool-Verlinkungslücken

Zwei Module verlinken auf kein einziges interaktives Werkzeug:

### Modul 3 (Beziehungen unter Druck) — 0 Tools

Inhaltlich passende Werkzeuge, die nicht verlinkt sind:
- **EE-Kreislauf** — zeigt genau die Beziehungsdynamik, die Modul 3 beschreibt (Kritik, Überforderung, Teufelskreis). Das Tool hat sogar einen Zurück-Link zu Modul 3 (nicht M5, wo es tatsächlich verlinkt ist).
- **Kommunikations-Trainer** — unterstützt bei schwierigen Gesprächen, die in M3 thematisiert werden.

### Modul 8 (Unterstützung und Ressourcen) — 0 Tools

Das Abschlussmodul bietet PDFs, Kontakte und Anlaufstellen — aber keinen einzigen Link zu den interaktiven Werkzeugen. Passend wären:
- **Krisenplan** — wird in M8 als Konzept erwähnt, aber nicht als Tool verlinkt
- **Selbsttest** — «Wo stehen Sie gerade?» wäre ein guter Abschluss-Check

---

## Befund 3: Tool-Rücklink-Mismatches

Zwei Tools führen Nutzer*innen per Zurück-Link zum falschen Modul:

| Tool | Verlinkt VON | Zurück-Link zeigt auf | Problem |
|------|-------------|----------------------|---------|
| Solidaritätschart | Modul 4 | Modul 2 | Nutzer*in kommt von M4, landet aber in M2 |
| EE-Kreislauf | Modul 5 | Modul 3 | Nutzer*in kommt von M5, landet aber in M3 |

Die anderen 6 Tools haben korrekte Rücklinks.

### Ursache
Die Tool-Rücklinks sind statisch in der Frontmatter definiert (`toolBackHref`, `toolBackLabel`). Sie zeigen auf das Modul, zu dem das Tool *inhaltlich* am besten passt — nicht auf das Modul, von dem die Nutzer*in tatsächlich kommt. Das ist ein architektonisches Problem: Ein Tool kann von mehreren Modulen verlinkt sein, hat aber nur einen festen Rücklink.

---

## Befund 4: Modul 8 als Sackgasse

Modul 8 ist das Abschlussmodul und gleichzeitig ein eigenständiger Einstiegspunkt (über die Hauptnavigation als «Unterstützung» verlinkt). Es hat:

- Kein «nächstes Modul» (logisch — es ist das letzte)
- Keinen Abschlusstext oder Zusammenfassung des Lernpfads
- Keinen «Zurück zur Übersicht»-Link
- Keinen Link zu den interaktiven Werkzeugen
- Kein «Sie haben den Lernpfad abgeschlossen»-Element

Wer alle 8 Module durchgearbeitet hat, bekommt am Ende... einen Mini-Plan-Widget und dann den Footer. Kein Abschluss, keine Würdigung, kein «Was jetzt?».

---

## Befund 5: Breadcrumb-Inkonsistenz (gering)

Alle Module haben Breadcrumbs mit der gleichen Struktur: Startseite › Module › [Titel]. Das ist korrekt und konsistent. Kleine Unterschiede im HTML-Formatting (M1–3 mehrzeilig, M4–8 einzeilig) sind funktional irrelevant.

---

## Befund 6: /module/-Übersichtsseite — ungeklärte Rolle

Die Seite `/module/` zeigt dasselbe Modulkarten-Raster wie die Homepage. Sie bietet zusätzlich:
- Einen Fortschritts-Tracker (der auf der Homepage entfernt wurde)
- Einen «Wenn Sie Schritt für Schritt lesen möchten»-Hinweis
- Einen «Wenn Sie sofort Orientierung brauchen»-Hinweis

Die Breadcrumbs in allen Modulen verlinken auf `/module/`, nicht auf `/`. Das bedeutet: `/module/` ist der primäre «Hub» im Breadcrumb-Pfad — aber die Homepage ist der primäre Hub in der Nutzerführung (Triage). Diese zwei Ebenen widersprechen sich nicht, aber sie könnten klarer zusammenspielen.

---

## Empfehlungen

### E1: Modul-Ende um Zurück + Orientierung erweitern (Priorität 1)

Am Ende jedes Moduls (vor dem Footer) eine kompakte Navigationsleiste einfügen:

```
← Modul [N-1]: [Titel]    |    Modulübersicht    |    Modul [N+1]: [Titel] →
```

Für Modul 1: kein Zurück-Link, dafür «Zur Startseite».
Für Modul 8: kein Weiter-Link, dafür ein Abschluss-Element (siehe E4).

Die bestehende «Nächstes Modul»-Karte kann bleiben, aber sie sollte nicht der einzige Weg sein. Ein kompakter Vor/Zurück-Balken ist schneller zu scannen als die prominente Karte.

### E2: Tool-Verlinkung in M3 und M8 ergänzen (Priorität 1)

**Modul 3:** Am Ende des Moduls (vor Handouts) einen «Passende Werkzeuge»-Block einfügen:
- EE-Kreislauf: «Sehen Sie, wie Kritik und Überforderung sich gegenseitig hochschaukeln.»
- Kommunikations-Trainer: «Schwierige Gespräche klarer vorbereiten.»

**Modul 8:** Im Abschnitt «Nächste Schritte» Tools prominent einbinden:
- Krisenplan: «Noch keinen Krisenplan? → Jetzt erstellen»
- Selbsttest: «Wo stehen Sie gerade? → Kurz einordnen»
- Alle Werkzeuge: Link auf /werkzeuge/

### E3: Tool-Rücklinks dynamisch oder korrekt setzen (Priorität 2)

Zwei Optionen:

**(a) Statisch korrigieren:** Die Zurück-Links im Solidaritätschart auf M4 und im EE-Kreislauf auf M5 ändern. Nachteil: Wenn ein Tool von mehreren Modulen verlinkt ist, stimmt der Rücklink immer nur für eines davon.

**(b) Dynamisch per Referrer:** Den Tool-Zurück-Link per JavaScript dynamisch setzen: `document.referrer` auslesen, prüfen ob er auf `/modul/N/` endet, und den Zurück-Link entsprechend anpassen. Fallback: der statische Wert aus der Frontmatter. Das ist robuster, aber aufwendiger.

Empfehlung: Kurzfristig (a), weil es 2 Zeilen Frontmatter-Änderung ist. Langfristig (b), wenn Tools-Seiten häufiger aus verschiedenen Kontexten aufgerufen werden.

### E4: Modul 8 mit Abschluss-Element versehen (Priorität 2)

Am Ende von Modul 8, nach dem Mini-Plan, ein Abschluss-Block:

- Kurzer Text: «Sie haben den Lernpfad durchgearbeitet — oder dort eingestiegen, wo es am meisten drängte. Beides ist richtig.»
- 3 nächste Schritte:
  1. «Fachstelle Angehörigenarbeit kontaktieren: 058 384 38 00»
  2. «Ein Werkzeug ausprobieren → /werkzeuge/»
  3. «Zur Modulübersicht → /module/»

### E5: Next-Module-Karten mit Kontext-Hinweis versehen (Priorität 3)

Die bestehenden «Nächstes Modul»-Karten sind gut geschrieben — sie erklären, warum das nächste Modul inhaltlich anschliesst. Aber sie setzen lineares Lesen voraus. Ein kleiner Zusatz unter jeder Karte könnte helfen:

«Nicht Ihr Thema? → Zur Modulübersicht»

Das gibt nicht-linearen Leser*innen einen Ausweg, ohne die Karte selbst zu verändern.

### E6: /module/-Seite als bewussten Hub nutzen (Priorität 3)

Die `/module/`-Seite könnte der Ort sein, an dem der Fortschritts-Tracker lebt (er wurde von der Homepage entfernt, existiert aber noch auf /module/). Das würde die Rollentrennung stärken:
- Homepage = Triage + Schnelleinstieg
- /module/ = Lernpfad-Übersicht + Fortschritt
- /werkzeuge/ = Tool-Sammlung

---

## Zusammenfassung der Befunde

| # | Befund | Schwere | Fix-Aufwand |
|---|--------|---------|-------------|
| 1 | Kein Zurück-Link in keinem Modul | Hoch | Mittel (8 Dateien, je ~10 Zeilen) |
| 2 | M3 und M8 ohne Tools | Hoch | Klein (2 Dateien, je ~15 Zeilen) |
| 3 | 2 Tool-Rücklinks falsch | Mittel | Klein (2 Zeilen Frontmatter) |
| 4 | M8 ohne Abschluss | Mittel | Klein (1 Block, ~20 Zeilen) |
| 5 | Next-Karten ohne Ausweg | Gering | Minimal (1 Zeile pro Modul) |
| 6 | /module/ ohne klare Rolle | Gering | Konzeptuell |
