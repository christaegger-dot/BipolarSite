# Review-Entscheidungen — 24.–25. April 2026

Bezieht sich auf [REVIEW_STARTSEITE_MODUL8_2026-04-24.md](REVIEW_STARTSEITE_MODUL8_2026-04-24.md).
Hält fest, welche Befunde **nicht umgesetzt** wurden und warum — damit die offene Liste nicht als ungelöstes TODO durch die Zeit läuft.

---

## PUK-geblockt (warten auf Kommunikations-Abstimmung)

### K-10 · PUK-Positionierung
Header nennt „Psychiatrische Universitätsklinik Zürich · Fachstelle Angehörigenarbeit", Footer sagt „Kein offizielles Angebot der PUK Zürich". Widerspruch.

**Status:** Muss von PUK-Kommunikation + Ch. Egger gemeinsam entschieden werden (offizielles Angebot vs. eigenständig). Danach Header-Badge oder Footer-Disclaimer anpassen.

**Blocker für:** Impressum-Text, Footer-Disclaimer, Site-Brand-Claim.

---

### M-02 · Gender-Stern „Angehörige*r"
Asterisk wird von Screenreadern als „Sterntaste" vorgelesen; in DE-Gender-Diskussion umstritten. Aktuell ~30 Vorkommen site-weit.

**Status:** Wartet auf PUK-Styleguide-Entscheidung. Kandidaten: Beibehalten, Gender-Doppelpunkt („Angehörige:r"), Plural („Angehörige"), Doppelform („Angehörige und Nahestehende").

**Wenn Entscheidung da:** Global-Replace + Konsistenz-Check, S-Aufwand.

---

## Bewusst belassen (Varianz ist inhaltlich richtig)

### M-01 · Hero-Illustration
Review: „Tisch mit zwei Tassen kommuniziert wenig über das Thema."

**Entscheidung:** Belassen. Neuer Asset-Auftrag gehört in eine eigene Design-Session, nicht in diesen Review-Cleanup. Verfügbare Alternativ-Assets (`modul-einstieg.webp`, `modul8-ressourcen.webp`) bedienen andere Zwecke (Erfahrungsbericht, Modul-8-Hub) und passen nicht zum Hero-Kontext.

**Re-visit:** Wenn eine neue Illustration in Auftrag gegeben wird, an diesem Befund orientieren.

---

### M-03 · Wizard-Antwortformate
Review: Antworten sind inkonsistent formatiert (binär, asymmetrisch, ternär je nach Frage).

**Entscheidung:** Belassen. Die Varianz ist kontextuell sinnvoll:
- Q1 (Gefahr?) — Ja/Nein mit „unklar"-Puffer: Akutlage erlaubt keine Überkomplexität.
- Q1b (Diagnose neu?) — lange Antwortformulierungen transportieren die Phasen-Nuance.
- Q2 (am Limit?) — binär ist ehrlich (man ist es oder man ist es nicht).
- Q3 (Grundlagenwissen?) — nach K-06-Fix drei Optionen mit „Sowohl als auch".
- Q4 (Vordergrund?) — drei sinnvolle Richtungen, keine davon Ja/Nein.

Eine Harmonisierung würde entweder Präzision opfern oder sinnlosen Symmetrie-Zwang einbauen. Die Intro (nach M-04-Fix) macht klar, dass bis zu 5 Fragen folgen und die Antwort direkt zu einem Modul führt — das reicht als Erwartungsmanagement.

---

### M-09 · Tool-Badges-Farben
Review: „Selbsttest / Werkzeug / Interaktiv" sind alle sand-gefärbt.

**Entscheidung:** Belassen (nach Umbenennung in M-10 werden die Badges ohnehin weniger tragend). Drei Badges sind zu wenig Items für sinnvolle Farb-Kategorisierung. Die Badges kommunizieren die Art primär per Text, nicht per Farbe — wenn wir mehr Werkzeuge hinzufügen, kann eine Farb-Systematik nachgezogen werden.

---

### M-16 · Drei Einstiegspunkte zu Werkzeugen
Review: „Header ‚Werkzeuge', Hero-Link ‚Alle Werkzeuge', Tools-Abschnitt ‚Alle Werkzeuge ansehen' — Redundanz."

**Entscheidung:** Belassen. Die drei Einstiege bedienen unterschiedliche Kontexte:
- **Header-Nav** (persistent, navigational): immer verfügbar, für zielgerichtete Navigation.
- **Hero-Entry-Path** (nach K-04-Fix ein echter Button): Teil der „Ich suche …"-Triade für Erst-Entscheider:innen.
- **Tool-Section-CTA** (am Ende der Tool-Previews): natürlicher Follow-up nach dem Sichten einzelner Tools.

Entfernen eines Einstiegs würde den jeweiligen Lese-Fluss unterbrechen.

---

### C-04 · Hero-Illustration-Stil-Konsistenz
Review: „Die zwei Illustrationen (Tisch, Figur am Fenster) haben unterschiedliche Stile."

**Entscheidung:** Belassen. Beide Illustrationen nutzen dieselbe Farbpalette (Teal + Honey + warme Erdtöne) und denselben editorial-warmen Zeichenstil. Die formale Differenz ist Subjekt-bedingt (Objekt-Stillleben vs. Figur), nicht Stil-bedingt. Keine stilistische Inkonsistenz erkennbar; mit M-01 zusammen re-visitierbar, falls eine neue Hero-Illustration in Auftrag geht.

---

## Versteckt erledigt (während anderer Welle)

| Befund | Wo erledigt |
|---|---|
| C-01 Zeitangaben | via M-06 (Welle 1) |
| C-02 Pill-Farben (kosmetisch) | via M-07 (diese Welle) |
| K-12 SEO-Metadaten | Audit ergab: bereits vollständig vorhanden (Welle 3) |
| M-15 Favicon-Fallback | Audit ergab: Setup komplett, `.ico` 2026 nicht nötig (Welle 4) |

---

## Status-Matrix (für Übersicht)

| Tier | Umgesetzt | Bewusst belassen | PUK-geblockt |
|---|---|---|---|
| Kritisch (K) | 13 | — | K-10 |
| Mittel (M) | 9 | M-01, M-03, M-09, M-16 | M-02 |
| Kosmetisch (C) | 2 (C-01, C-02) | C-04 | — |

**23 von 37 Review-Befunden ausgeführt** (plus 4 verifiziert-OK ohne Code-Änderung), 6 bewusst deferred, 2 warten auf PUK.

---

## Referenz-Commits

Alle Review-Commits tragen das Präfix `fix(review-24apr):` für kritische und `chore(review-24apr):` für mittlere/kosmetische Befunde. Befund-Code (z.B. `K-03`) jeweils im Commit-Body. Durchsuchbar über:

```sh
git log --all --grep="review-24apr"
```
