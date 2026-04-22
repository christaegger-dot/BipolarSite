# Design-Verifikations-Audit — BipolarSite

**Datum:** 6. April 2026
**Prüferin:** Claude (im Auftrag von C. Egger)
**Gegenstand:** Harter Abgleich des Design-Refactors gegen das Zielbild «warm-professional editorial»
**Repository:** christaegger-dot/BipolarSite · Stand: Commit `fdbbb36`
**Methode:** Nur prüfen, belegen, klassifizieren, entscheiden. Kein neuer Refactor.

---

## 1. EXECUTIVE VERIFICATION SUMMARY

1. **Token-System existiert und ist funktionsfähig.** 137 Custom Properties in tokens.css definiert. 6-Stufen-Typografie, 3-Stufen-Sektionsrhythmus, 7-Stufen-Spacing, Farbsystem mit Phase-Kodierung — alles vorhanden und korrekt deklariert.

2. **Token-Adoption ist unvollständig.** 149+ hardcodierte `font-size`-Deklarationen in module.css umgehen die Typografie-Skala. 34 hardcodierte px-Werte für margin/padding in module.css statt Token-Referenzen.

3. **Card-System korrekt implementiert.** `--card-shadow: none`, Border-only-Ansatz mit `1px solid var(--border-warm)`. Hover-Effekt über `var(--shadow-soft)`. Ziel erreicht.

4. **Typografie-Hierarchie korrekt.** DM Serif Display auf allen Headings, DM Sans auf Body/UI. Schriftpaare konsistent eingesetzt. Die 6-Stufen-Skala ist sauber definiert, wird aber in module.css zu oft durch Literalwerte ersetzt.

5. **Sektionsrhythmus (40/64/96px) eingehalten.** shared.css und module.css verwenden die Token `--section-tight`, `--section-standard`, `--section-wide` konsistent für Hauptsektionen. Kleinere Abstände weichen teilweise ab.

6. **Notfall-Seite: ROT dominant, kein Teal.** Crisis-Page nutzt ausschliesslich `--alert`-Rot für CTAs, Badges und Situationskarten. Null Teal-Kontamination. Ziel erreicht.

7. **CTA-Zurückhaltung auf Content-Seiten erreicht.** Klasse `.link-teal` (19×) und `.link-alert` (10×) klassenbasiert, keine Inline-CTA-Styles auf Modulseiten.

8. **Tool-Seiten sind Mini-Apps, nicht Editorial-Worksheets.** Alle 9 Tools folgen einem JavaScript-first-Muster mit eigenem State-Management. Sie teilen das Base-Layout, weichen aber gestalterisch vom Editorial-Zielbild ab.

9. **!important-Last bleibt hoch: 593 Deklarationen.** Davon 476 allein in tarif-kompass-theme.css (Durchatmen-Tool). Shared/Module/Overrides zusammen: 117.

10. **Inline-Styles moderat: 134 Instanzen.** Überwiegend in Tools (SVG-Daten, interaktive Zustände) und Noscript-Fallbacks. Auf Content-Seiten minimal.

11. **CSS-Gesamtumfang: 7'296 Zeilen** über 7 Dateien. overrides.css (1'580 Zeilen) ist konzeptionell problematisch — sie existiert primär, um Inline-Styles und Legacy-Patterns zu überschreiben.

12. **3 Legacy-Aliase in tokens.css** (`--text-2xs`, `--text-sm`, `--text-md`) sind als Weiterleitungen implementiert und können nach Migration entfernt werden.

---

## 2. VERIFIKATIONSTABELLE NACH REFACTOR-CLUSTERN

| # | Cluster | Status | Evidenz | Verbleibende Lücken |
|---|---------|--------|---------|---------------------|
| 1 | **Design-Token-System** | ✅ Erreicht | 137 Custom Properties, 6-Stufen-Typo, 3-Stufen-Rhythmus, 7-Stufen-Spacing, Phase-Farben | 3 Legacy-Aliase noch aktiv; 5 redundante Farbpaare (z.B. `--teal-light` = `--teal-border`) |
| 2 | **Typografie** | ⚠️ Teilweise | DM Serif Display/DM Sans korrekt zugewiesen; Skala sauber definiert | 149+ hardcodierte font-size in module.css umgehen Token |
| 3 | **Spacing / Sektionsrhythmus** | ⚠️ Teilweise | Hauptsektionen nutzen 40/64/96px-Token | 34 hardcodierte px-Werte in module.css |
| 4 | **Komponenten (Cards)** | ✅ Erreicht | shadow: none, border-only, hover via --shadow-soft | — |
| 5 | **Hero / Sektionen** | ✅ Erreicht | 4 konsistente Hero-Patterns (Home, Module, Tool, Notfall) | — |
| 6 | **CTA-Zurückhaltung** | ✅ Erreicht (Content) | Klassenbasiert, keine Inline-CTAs auf Modulseiten | Tools nutzen eigene CTA-Systeme (tool-cta-btn, triage-btn) |
| 7 | **Notfall-Seite** | ✅ Erreicht | Rot-dominant, 0 Teal, emergency-call--red Klassen | — |
| 8 | **Tool-Seiten** | ❌ Nicht erreicht | Alle 9 Tools sind JS-Mini-Apps mit eigenem State | Kein Editorial-Worksheet-Muster; eigene Farbsysteme (Ampel in Selbsttest) |
| 9 | **CSS-Architektur** | ⚠️ Teilweise | Token-Layer sauber; shared.css gut strukturiert | 593 !important (476 in tarif-kompass-theme.css); overrides.css als Gegenstück zu Inline-Styles |
| 10 | **Regressionen** | ✅ Keine gefunden | Modulseiten 1–8, Home, Notfall visuell konsistent | — |

---

## 3. IST-/ZIEL-ABGLEICH NACH BEREICHEN

### 3.1 Farbtoken

| Aspekt | ZIEL | IST | Bewertung |
|--------|------|-----|-----------|
| Phasenfarben (Manie/Hypo/Depression) | WCAG-AA-konform, semantisch klar | ✅ Definiert mit -light/-border/-text Varianten | Erreicht |
| Teal als Primärfarbe | Konsistent, keine Kontamination auf Notfall | ✅ Teal nur auf Content-Seiten | Erreicht |
| Rot für Notfall | Exklusiv auf Krisenkontext | ✅ --alert als einzige CTA-Farbe auf Notfall | Erreicht |
| Redundante Token | Keine Duplikate | ❌ 5 Paare: --teal-light/--teal-border, --success-soft/--phase-green-light, --amber-phase-border/--amber-border, --amber-bg/--amber-phase-light, --card/--cta-primary-text (#fff) | Teilweise |

### 3.2 Typografie

| Aspekt | ZIEL | IST | Bewertung |
|--------|------|-----|-----------|
| Schriftpaare | DM Serif Display (Headings) + DM Sans (Body) | ✅ Korrekt zugewiesen | Erreicht |
| 6-Stufen-Skala | xs/base/lg/xl/2xl/3xl durchgängig | ⚠️ Definiert, aber 149+ Literalwerte in module.css | Teilweise |
| Legacy-Aliase | Keine | ⚠️ 3 aktiv (--text-2xs, --text-sm, --text-md) | Migration ausstehend |

### 3.3 Spacing

| Aspekt | ZIEL | IST | Bewertung |
|--------|------|-----|-----------|
| Sektionsrhythmus | 40/64/96px via Token | ✅ Hauptsektionen nutzen Token | Erreicht |
| Mikro-Spacing | Über --space-Token | ⚠️ 34 hardcodierte px-Werte | Teilweise |

### 3.4 Komponenten

| Aspekt | ZIEL | IST | Bewertung |
|--------|------|-----|-----------|
| Cards | Border-only, kein Shadow | ✅ --card-shadow: none, 1px border | Erreicht |
| Hero-Patterns | Konsistent pro Seitentyp | ✅ 4 klare Patterns | Erreicht |
| CTAs | Zurückhaltend, klassenbasiert | ✅ Auf Content-Seiten | Erreicht |

### 3.5 Seitentypen

| Aspekt | ZIEL | IST | Bewertung |
|--------|------|-----|-----------|
| Home | Warm-professional editorial | ✅ | Erreicht |
| Module 1–8 | Warm-professional editorial | ✅ | Erreicht |
| Modul-Übersicht | Warm-professional editorial | ✅ | Erreicht |
| Notfall | Rot-dominant, Krisenkontext | ✅ | Erreicht |
| Tool-Übersicht | Editorial | ✅ | Erreicht |
| Tool-Seiten (9) | Editorial Worksheets | ❌ Mini-Apps | Nicht erreicht |

### 3.6 CSS-Architektur

| Aspekt | ZIEL | IST | Bewertung |
|--------|------|-----|-----------|
| Token-Layer | Einzige Quelle der Wahrheit | ⚠️ Definiert, aber oft umgangen | Teilweise |
| !important | Minimal | ❌ 593 total (476 in Durchatmen-Theme) | Nicht erreicht |
| overrides.css | Nicht nötig | ❌ 1'580 Zeilen, 58 !important | Nicht erreicht |
| Inline-Styles | Keine | ⚠️ 134 (überwiegend in Tools, akzeptabel) | Teilweise |

---

## 4. REGRESSIONS-CHECK

| Bereich | Prüfung | Ergebnis |
|---------|---------|----------|
| Homepage | Layout, Farben, Typografie | ✅ Keine Regression |
| Module 1–8 | Seitenstruktur, Cards, Spacing | ✅ Keine Regression |
| Modul-Übersicht | Grid, Navigation | ✅ Keine Regression |
| Notfall | Rot-Dominanz, CTAs, Situationskarten | ✅ Keine Regression |
| Navigation | Desktop + Mobil | ✅ Keine Regression |
| Footer | Layout, Links | ✅ Keine Regression |
| Print-Stylesheet | Grundfunktion | ✅ Keine Regression |
| Durchatmen (Dark Theme) | **Nicht geprüft** | ⚠️ Audit ausstehend (tarif-kompass-theme.css mit 476 !important separat zu bewerten) |

**Fazit Regressionen:** Keine Regressionen auf Content-Seiten festgestellt. Durchatmen-Tool noch nicht visuell verifiziert.

---

## 5. PRIORISIERTER RESTAUFTRAG

### P0 — Blockers (vor nächstem Deploy zu klären)

*Keine P0-Items identifiziert.* Der aktuelle Stand ist deploybar. Alle Content-Seiten entsprechen dem Zielbild.

### P1 — Hohe Priorität (nächster Sprint)

| # | Aufgabe | Umfang | Begründung |
|---|---------|--------|------------|
| P1.1 | **149+ hardcodierte font-size in module.css auf Token migrieren** | Gross | Token-System wird unterlaufen; Inkonsistenzen bei Responsive-Verhalten möglich |
| P1.2 | **34 hardcodierte margin/padding in module.css auf Spacing-Token migrieren** | Mittel | Sektionsrhythmus-Versprechen nur auf Makro-Ebene eingelöst |
| P1.3 | **5 redundante Farbtoken konsolidieren** | Klein | Wartbarkeit, Single Source of Truth |
| P1.4 | **3 Legacy-Aliase (--text-2xs, --text-sm, --text-md) entfernen** | Klein | Grep → Replace → Delete aus tokens.css |

### P2 — Mittlere Priorität (kommende Wochen)

| # | Aufgabe | Umfang | Begründung |
|---|---------|--------|------------|
| P2.1 | **overrides.css refaktorieren oder eliminieren** | Gross | 1'580 Zeilen Override-Layer ist architektonisches Schulden-Signal |
| P2.2 | **tarif-kompass-theme.css: 476 !important reduzieren** | Gross | Dark-Theme-Isolation über Cascade Layers oder Scoped Styles statt !important |
| P2.3 | **Tool-Seiten: Editorial-Worksheet-Muster evaluieren** | Strategisch | Entscheidung nötig: Bleiben Tools Mini-Apps oder werden sie Editorial-Worksheets? Beides kann richtig sein — aber die Entscheidung muss bewusst getroffen werden |
| P2.4 | **Durchatmen-Tool visuell auditieren** | Mittel | Einzige Seite, die im Audit nicht visuell verifiziert wurde |
| P2.5 | **Inline-Styles in Tools auf CSS-Klassen migrieren (wo möglich)** | Mittel | 134 Instanzen, davon ~80 in Tools |

---

## 6. ABSCHLUSSBEWERTUNG

### Erreichungsgrad nach Kategorie

| Kategorie | Bewertung |
|-----------|-----------|
| Token-System (Definition) | ✅ **Erreicht** |
| Token-System (Adoption) | ⚠️ **Teilweise erreicht** — Hauptsektionen ja, module.css-Detail nein |
| Typografie (Schriftpaare) | ✅ **Erreicht** |
| Typografie (Skalenkonsistenz) | ⚠️ **Teilweise erreicht** — 149+ Literalwerte |
| Spacing / Sektionsrhythmus | ⚠️ **Teilweise erreicht** — Makro ja, Mikro nein |
| Card-System | ✅ **Erreicht** |
| Hero-Patterns | ✅ **Erreicht** |
| CTA-Zurückhaltung (Content) | ✅ **Erreicht** |
| Notfall-Seite | ✅ **Erreicht** |
| Tool-Seiten → Editorial | ❌ **Nicht erreicht** — bewusste Architektur-Entscheidung nötig |
| CSS-Architektur (!important) | ❌ **Nicht erreicht** — 593 Deklarationen |
| CSS-Architektur (overrides) | ❌ **Nicht erreicht** — Override-Layer aktiv |
| Regressionen | ✅ **Keine festgestellt** |

### Gesamturteil

**Das Zielbild «warm-professional editorial» ist auf allen Content-Seiten (Home, Module 1–8, Übersichten, Notfall) erreicht.** Die Typografie-Hierarchie stimmt, die Farbsemantik ist klar, der Sektionsrhythmus ist auf Makro-Ebene eingehalten, Cards sind clean. Keine Regressionen.

**Die Token-Infrastruktur ist gebaut, aber noch nicht vollständig durchgesetzt.** module.css enthält 149+ font-size- und 34 spacing-Literalwerte, die das Token-System unterlaufen. Das ist keine Regression, sondern unvollständige Migration.

**Die CSS-Architektur trägt technische Schulden.** 593 !important, ein 1'580-Zeilen-Override-Layer und ein 1'894-Zeilen-Dark-Theme mit 476 !important sind Wartungsrisiken, beeinträchtigen aber aktuell nicht das visuelle Ergebnis.

**Tool-Seiten folgen bewusst einem anderen Muster (Mini-Apps).** Ob das richtig oder falsch ist, ist eine Produktentscheidung, kein Bug.

### Gestalterisch freigabefähig?

**Ja — mit Einschränkung.** Die Content-Seiten (Home, Module, Notfall, Übersichten) sind freigabefähig im Sinne des Zielbilds «warm-professional editorial». Die Tool-Seiten erfordern eine bewusste Produktentscheidung, ob sie im aktuellen Mini-App-Muster verbleiben oder zum Editorial-Worksheet migriert werden sollen. Der CSS-Unterbau hat Optimierungspotenzial, das die Freigabe nicht blockiert, aber mittelfristig adressiert werden sollte.

---

*Erstellt am 6. April 2026 · Methode: Statische CSS-Analyse + Template-Audit + Rendering-Verifikation · Kein Refactor durchgeführt*
