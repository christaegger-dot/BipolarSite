# Inhaltsanalyse Website (Stand: 24.03.2026)

## Ziel

Schnelle redaktionelle Qualitätsprüfung auf **inhaltliche Fehler**, **Lücken** und **Ungenauigkeiten** auf Basis des aktuellen Codes.

## Methode

- Manuelle Sichtprüfung zentraler Inhaltsseiten (`Home`, `Soforthilfe`, `Genesung`, `FAQ`, `Selbsthilfegruppen`, `Materialien`, `UeberUns`).
- Fokus auf: medizinische Aussagen, Krisenkommunikation, Quellenlage, regionale Gültigkeit, Aktualitätsrisiken.

---

## A) Inhaltliche Fehler / kritische Risiken

### 1) Zu absolute Handlungsanweisung in Krisensektion

- Auf der Soforthilfe-Seite steht: „Bei akuter Lebensgefahr immer zuerst 144 / 117 / 112 – **auch gegen den Willen der Person**.“
- Das ist in der Praxis oft richtig, aber rechtlich und klinisch zu absolut formuliert (Zwang, Urteilsfähigkeit, regionale Rechtslage).
- **Risiko:** Juristische/ethische Fehldeutung durch Angehörige.

**Empfehlung:** Umformulieren in „… auch wenn die betroffene Person nicht einverstanden ist, sofern akute Selbst- oder Fremdgefährdung vorliegt; im Zweifel Notruf/ärztliche Stelle umgehend einbeziehen“ plus kurzer Haftungshinweis.

Referenz: `client/src/pages/Soforthilfe.tsx`.

### 2) Evidenz-Claim vs. tatsächliche Quellenpraxis

- Auf „Über uns“ wird explizit versprochen: „Wir nennen unsere Quellen.“
- Gleichzeitig enthalten mehrere stark evidenzbasierte Aussagen (z. B. Prognose-/Therapiezahlen in FAQ) keine direkten Quellenangaben auf derselben Seite.
- **Risiko:** Vertrauensbruch/Angreifbarkeit bei fachlicher Prüfung.

**Empfehlung:** Pro Seite mit medizinischen Kennzahlen einen kleinen „Quellen“-Block (2–5 Primärquellen) ergänzen.

Referenzen: `client/src/pages/UeberUns.tsx`, `client/src/pages/FAQ.tsx`.

---

## B) Lücken

### 3) Regionale Gültigkeit ist nicht überall deutlich genug

- Die Soforthilfe-Inhalte und Kontaktdaten sind stark auf Zürich/Schweiz ausgerichtet.
- Gleichzeitig wirken viele Seiten sprachlich allgemein deutschsprachig/überregional.
- **Lücke:** Kein klarer global sichtbarer Scope-Hinweis („Diese Notfallkontakte gelten für CH/ZH“).

**Empfehlung:** Globalen Banner/Badge im Header oder auf jeder Krisenseite: „Notfallkontakte: Schweiz (Kanton Zürich)“ + Link zu Alternativen für DE/AT/andere Regionen.

Referenzen: `client/src/pages/Soforthilfe.tsx`, `client/src/data/kontakte.ts`, `client/src/components/Layout.tsx`.

### 4) Fehlende Datumsstempel an volatilen Kontaktdaten

- Bei Selbsthilfe-/Beratungszeiten fehlen sichtbare „zuletzt geprüft am“-Hinweise.
- **Lücke:** Nutzer können Aktualität kaum einschätzen.

**Empfehlung:** Bei jedem Block mit Sprechzeiten/Nummern: „Zuletzt verifiziert: TT.MM.JJJJ“.

Referenz: `client/src/pages/Selbsthilfegruppen.tsx`.

### 5) Uneinheitlicher Quellenzugang je Seite

- `Genesung` enthält Literatur/Links, andere Inhalte mit medizinischen Aussagen weniger.
- **Lücke:** Kein konsistentes Muster „Aussage → Quelle“ über alle Kernseiten.

**Empfehlung:** Einheitliche Komponentenlösung (z. B. `EvidenceNote`) einführen und seitenweit nutzen.

Referenzen: `client/src/pages/Genesung.tsx`, `client/src/pages/FAQ.tsx`, `client/src/pages/Verstehen.tsx`.

---

## C) Ungenauigkeiten

### 6) Statischer Kommentar-Stand auf Materialien-Seite

- In der Datei steht „Stand: 10.03.2026“ als statischer Kommentar.
- **Ungenauigkeit:** Dieser Stand ist für Nutzer nicht sichtbar und driftet redaktionell schnell.

**Empfehlung:** Sichtbare Versions-/Prüfdatum-UI nahe Download-Items statt nur Code-Kommentar.

Referenz: `client/src/pages/Materialien.tsx`.

### 7) Prognosezahlen ohne definitorische Kurzreferenz auf mehreren Seiten

- Kennzahlen wie „85–93 % Remission“ und „50 % Recovery“ werden mehrfach verwendet.
- **Ungenauigkeit:** Definitionsrahmen (welche Studie/Definition/Zeitraum) ist nicht überall direkt daneben erläutert.

**Empfehlung:** Ein einheitliches Tooltip/Footnote-Pattern mit Kurzdefinition und Primärquelle.

Referenzen: `client/src/pages/Home.tsx`, `client/src/pages/Glossar.tsx`, `client/src/pages/FAQ.tsx`, `client/src/pages/Genesung.tsx`.

---

## Priorisierte To-do-Liste

1. **Soforthilfe-Formulierung rechtlich/klinisch präzisieren** (hoch).
2. **Quellenbox in FAQ + Verstehen + Unterseiten nachziehen** (hoch).
3. **Regionalitäts-Hinweis (CH/ZH) global sichtbar machen** (hoch).
4. **„Zuletzt geprüft“-Datum für Kontakt-/Öffnungszeitblöcke einführen** (mittel).
5. **Einheitliches Quellen-/Footnote-UI wiederverwenden** (mittel).
6. **Materialien-Stand sichtbar im Frontend statt nur Kommentar** (niedrig-mittel).

---

## Kurzfazit

Die Seite ist inhaltlich bereits solide strukturiert und didaktisch stark. Die grössten Qualitätshebel liegen derzeit **nicht** in komplett falschen Fakten, sondern in **Präzision bei Krisenhinweisen**, **konsistenter Quellenführung** und **klarerer Regionalitätskommunikation**.
