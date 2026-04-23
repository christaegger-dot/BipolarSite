# UX-Backlog — Modul 1

**Datum:** 2026-04-23
**Quelle:** Session-Review während Paket-C-Spot-Check. Nicht Teil der laufenden Arbeitspakete A/B/C. Als eigenes Refactoring-Paket zu behandeln.
**Fokus:** `/modul/1/` (mit Generalisierungen auf andere Modul-Seiten).

---

## Gesamtbefund

Inhalt + Typografie auf hohem Niveau. Primäres Problem: **Komponenten-Vielfalt**. Zehn+ unterschiedliche visuelle Muster auf einer Seite (Hero, Zitat, Orientierungs-Box, Fliesstext, Drop-Cap-Box, Tab-Komponente, Accordions, Chart, Cards mit Pfeilen, Zusammenfassungsbox, Handout-Liste). Typisches Ergebnis iterativer Entwicklung — ein Refactoring-Durchgang, der 2–3 Patterns zusammenführt, würde die Seite ruhiger machen ohne Inhalt zu verlieren.

---

## P1 — Gewichtige Punkte

### 1. "Erste Orientierung"-Box konkurriert mit H1
Die Box mit Drop-Cap "S" sitzt weit genug von der H1 entfernt und hat eigene starke Visual-Language. Sie wirkt wie eine zweite Hero-Zone. Entscheidung nötig:
- **Variante A:** als "Rettungsinsel für Eilige" direkt unter H1 verschieben (vor Zitat)
- **Variante B:** Drop-Cap + Rahmen zurücknehmen, damit Hierarchie klar bleibt

### 2. Tab-Komponente "Mania / Hypomanie / Mixed / Depression" hat schwache Affordance
Im Desktop-Layout in der Textflut kaum als interaktiv erkennbar. Orange Unterstreichung signalisiert aktiv, aber nicht "klickbar". Default-Tab-Nutzer sehen die anderen drei Phasen nie. Empfehlung: kleiner Hinweis-Text wie *"4 Phasen — klicken zum Wechseln"* oder visuelles Affordance-Signal.

### 3. Bipolar-I/II-Cards: Expandability unklar
Die beiden großen Karten nebeneinander haben ein kleines Icon rechts, aber ohne deutliches "+" / Chevron ist unklar, ob sie aufklappen. Fix: sichtbareres expand-Icon + evtl. CTA-Text "Details".

### 4. Wellen-Chart ohne Achsen-Labels
Die zwei gegenläufigen Linien (rot/teal) sind konzeptuell stark, aber X- und Y-Achse sind unbeschriftet. Für psychoedukativen Kontext zu vage:
- **X:** Zeit (Tage/Monate/Jahre?)
- **Y:** Stimmung / Energie / Symptomintensität?
Mindestens Minimal-Labels ergänzen.

### 5. "Was Sie jetzt tun können"-Sektion: Modus unklar
Die vier Punkte wirken wie Wiederholung des Seiteninhalts. Entweder konsequent imperativ ausformulieren ("Sprechen Sie mit der Ärztin — aber nicht alleine.") oder als reine Merkpunkte kennzeichnen.

---

## P2 — Mittelgewichtige Punkte

### 6. Zwei Zitate mit identischem Pattern
Pullquote oben ("Als ich endlich begriffen habe…") + Zitat-Kasten in der Mitte ("Ich will Ruhe…"). Brechen den Lesefluss zweimal gleich auf. Empfehlung: eines davon in Fliesstext einweben oder streichen.

### 7. Komponenten-Inflation auf einer Seite
Siehe Gesamtbefund. Zähle beim nächsten Refactoring: wie oft wechselt die visuelle Sprache? Realistisches Ziel: 5–6 Patterns statt 10+.

### 8. "Passende Handouts"-Liste zu ähnlich zu Content-Cards
Die Handout-Cards am Seitenende (Pfeile rechts) sind visuell fast identisch mit den Accordion-Cards in der Mitte ("Wenn Verläufe nicht sauber in Phasen passen"). Pattern-Verwechslung: *"Habe ich das schon gesehen?"* Alternative für Handouts: Liste mit Download-Icon (klarere Navigation vs. Content-Trennung).

---

## P3 — Kleinere Punkte

### 9. Bipolar-I/II-Boxen mit abweichender Hintergrundfarbe
Sehr hell grünlich — gewollt oder CSS-Erbe? Bei Gelegenheit auf Token-Konsistenz prüfen.

### 10. Meta-Zeile unter Modul-Badge: Icon-Sichtbarkeit
Icons in der Sidebar-Meta-Zeile (`module-meta`) wirken in manchen Renderings sehr klein oder verschwinden. Prüfen ob Icon-Size und -Color token-konsistent sind.

### 11. Welle-Ornament oben rechts neben Breadcrumb
Funktioniert. Subtil, gut. Keine Aktion nötig — als positive Referenz für andere Module dokumentieren.

---

## Was nicht angefasst werden sollte

- **Typografie** — Serif-Display + Sans-Body harmonieren, Zeilenlängen + Farbkontraste sind durchdacht.
- **Sand/Teal/Aubergine-Palette** — konsistent angewendet, seltene Rotbraun-Nutzung als Akzent passt.
- **Sidebar-TOC mit 1–7 Ankern** — funktional stark, Nutzer-Werkzeug für lange Module.
- **Sprachliche Haltung** — präzise, partner-dezentriert, fachlich ohne Jargon.

---

## Übertragbarkeit auf andere Module

Die Befunde 1 (Orientierungs-Box), 2 (Tab-Affordance), 6 (Pullquote-Inflation), 8 (Pattern-Doppelung Handouts/Cards) betreffen mit Anpassungen auch Modul 2–8. Beim Refactoring pro Modul prüfen, welche Patterns sich wirklich als erwünschtes Vokabular halten lassen.

---

## Als Session-Auftrag formuliert

> "Refactoring Modul 1 — UX-Reduktion: Komponenten-Inventar erstellen, zwei bis drei Patterns konsolidieren, P1-Befunde (Orientierungs-Box, Tab-Affordance, Chart-Labels, Bipolar-Cards, Zusammenfassungs-Modus) adressieren. Keine inhaltlichen Kürzungen. Typografie und Farbpalette unangetastet lassen."
