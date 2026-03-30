# Modul-Audit – Logik & Stringenz

**Projekt:** borderline-angehoerige  
**Datum:** 2026-03-24  
**Scope:** Frontend (`client/src`), geteilte Module (`shared`), Server-Einstieg (`server/index.ts`)

## 1) Kurzfazit

Die Architektur ist **funktional und nachvollziehbar**, aber in mehreren Bereichen nicht mehr stringent genug für langfristige Wartbarkeit. Das Projekt folgt grob einer sinnvollen Trennung (`pages`, `components`, `hooks`, `data`), hat aber gleichzeitig einige **zu große, multipurpose Module** und **ungenutzte/angelegte aber nicht integrierte Bausteine**.

Das Risiko liegt weniger in „falscher“ Architektur, sondern in **schleichender Komplexität**: Inhalte, UI-Logik, Navigation und Datenhaltung sind an mehreren Stellen gekoppelt.

---

## 2) Methodik

Bewertet wurden:

- Modulzuschnitt (Single Responsibility / Kohäsion)
- Kopplung zwischen Bereichen (Pages ↔ Komponenten ↔ Daten)
- Wiederverwendbarkeit und Auffindbarkeit
- Skalierbarkeit der Routing- und Inhaltsstruktur
- Hinweise auf Architektur-Drift (ungenutzte oder redundante Module)

---

## 3) Positives (bereits gut gelöst)

1. **Saubere Hauptordner-Struktur im Frontend** (`pages`, `components`, `hooks`, `data`).
2. **Lazy Loading im Router** reduziert Initial-Bundle und verbessert Startverhalten.
3. **UI-Bausteine unter `components/ui`** sind grundsätzlich als wiederverwendbare Bibliothek angelegt.
4. **Kontaktdaten zentralisiert** in `client/src/data/kontakte.ts` statt in jeder Seite separat.

---

## 4) Hauptbefunde mit Optimierungsvorschlägen

## Befund A – Router ist zentral, aber nicht datengetrieben

**Beobachtung:** In `App.tsx` werden viele Seiten einzeln lazy importiert und dann manuell als `<Route>` gepflegt.  
**Auswirkung:** Bei jeder neuen/umbenannten Seite steigt die Pflegearbeit; Redirects und Pfadkonventionen können auseinanderlaufen.

**Optimierung:**

- Einführung einer zentralen Route-Registry, z. B. `client/src/routes.ts`.
- Struktur pro Route: `path`, `loader`, `seo`, optional `redirectTo`.
- `App.tsx` rendert Routes aus dieser Liste statt deklarativer Einzeldefinitionen.

**Nutzen:** Weniger Fehler bei Wachstum, klarere Navigation als einheitliche Quelle.

---

## Befund B – `Layout.tsx` bündelt zu viele Verantwortlichkeiten

**Beobachtung:** `Layout.tsx` übernimmt Header/UI, Dropdown-Interaktionen, Keyboard-Navigation, Mobile-Menü-Status, Body-Attribute-Management, Search-Lazy-Loading etc.  
**Auswirkung:** Hohe kognitive Last, erschwerte Tests, höhere Regression-Gefahr bei kleinen Anpassungen.

**Optimierung:**

- Extraktion in Submodule:
  - `layout/HeaderNav.tsx`
  - `layout/RessourcenMenu.tsx`
  - `layout/MobileMenu.tsx`
  - `layout/useRessourcenMenuA11y.ts`
- `Layout.tsx` nur noch als Orchestrator mit Komposition.

**Nutzen:** Bessere Lesbarkeit, klarere Verantwortlichkeiten, gezieltere Tests.

---

## Befund C – Große Seitenmodule mischen Inhalt, Daten und Interaktionslogik

**Beobachtung:** Mehrere Seiten sind sehr groß (z. B. `Selbstfuersorge.tsx`, `Genesung.tsx`, `Verstehen.tsx`, `Kommunizieren.tsx`, `Materialien.tsx`) und enthalten neben Rendering auch umfangreiche Inline-Datenstrukturen.  
**Auswirkung:** Änderungen an Content erzeugen Code-Noise; Wiederverwendung zwischen Seiten ist schwierig.

**Optimierung:**

- Inhaltliche Blöcke in strukturierte Content-Dateien auslagern (`client/src/content/...`).
- Seiten in Abschnittsmodule splitten (`pages/<seite>/sections/*.tsx`).
- Einheitliche Typschemas für Content einführen (z. B. `PageSection`, `ResourceCard`, `EvidenceSource`).

**Nutzen:** Trennung von Content und UI-Logik, bessere Redaktionsfähigkeit, kleinere PRs.

---

## Befund D – Architektur-Drift durch ungenutzte Module

**Beobachtung:** Es existieren Dateien, die aktuell keine Integration zeigen (`client/src/const.ts`, `shared/const.ts`, Hook `useProgress`).  
**Auswirkung:** Unklare Zielarchitektur, unnötige Such- und Review-Kosten, erhöhte Verwirrung im Team.

**Optimierung:**

- Klären: „geplant vs. obsolet“.
- Entweder aktiv integrieren (mit Use-Case) oder entfernen.
- Ergänzend: „Architecture Decision Note“ (kurz) im Repo, warum `shared` aktuell leer/minimal ist.

**Nutzen:** Weniger Ballast, klarere Modulgrenzen.

---

## Befund E – Domain-/Inhaltslogik ist nur teilweise zentralisiert

**Beobachtung:** Kontaktdaten sind bereits zentral, aber andere domänenspezifische Strukturen (z. B. Kategorien, Ressourcentypen, Verweislogiken) sind häufig seitenlokal implementiert.  
**Auswirkung:** Inkonsistente Benennung und semantische Doppelungen über Seiten hinweg.

**Optimierung:**

- Einführung einer kleinen Domain-Schicht unter `client/src/domain/`:
  - `domain/resources.ts` (Kategorien, Filter, Label-Konstanten)
  - `domain/navigation.ts` (Navigationsmetadaten)
  - `domain/content-types.ts` (gemeinsame Typen)

**Nutzen:** Einheitliche Begriffe, bessere Konsistenz über alle Module.

---

## 5) Empfohlene Zielstruktur (inkrementell)

```text
client/src/
  app/
    AppProviders.tsx
    Router.tsx
    routes.ts
  pages/
    Verstehen/
      index.tsx
      sections/
      content.ts
    ...
  components/
    layout/
      Layout.tsx
      HeaderNav.tsx
      RessourcenMenu.tsx
      MobileMenu.tsx
      hooks/
  domain/
    navigation.ts
    resources.ts
    content-types.ts
  content/
    verstehen.ts
    selbstfuersorge.ts
  data/
    kontakte.ts
```

---

## 6) Priorisierte Roadmap

### Kurzfristig (1–2 Sprints)

1. Route-Registry einführen (ohne Seiteninhalte umzubauen).
2. `Layout.tsx` in 2–3 Teilmodule extrahieren.
3. Ungenutzte Module bereinigen oder markieren.

### Mittelfristig (2–4 Sprints)

4. 2 größte Seiten (`Selbstfuersorge`, `Verstehen`) modularisieren (Sections + Content-Dateien).
5. Gemeinsame Domain-Typen für Karten/Abschnitte/Navigation einführen.

### Langfristig

6. Einheitliches Content-Modell für alle redaktionellen Seiten.
7. Optional: Lint-Regeln für maximale Dateigröße/Komplexität (z. B. Soft-Limits ab 300–400 LOC pro React-Datei).

---

## 7) Konkrete Quick Wins

- `App.tsx` in `Router.tsx` + `AppProviders.tsx` splitten.
- `Layout.tsx` Keyboard-/Dropdown-Handling in Hook auslagern.
- Große Inline-Arrays aus Seiten in separate `content/*.ts` verschieben.
- `client/src/const.ts` und `shared/const.ts` entweder befüllen oder löschen.
- `useProgress` nur behalten, wenn ein konkreter Verbraucher kurzfristig folgt.

---

## 8) Audit-Urteil

**Gesamtbewertung:** 7/10

- **Logik:** gut, aber an einzelnen Knoten überladen
- **Stringenz:** mittel bis gut, mit klaren Drift-Signalen
- **Skalierbarkeit:** aktuell ausreichend, mittelfristig refaktorierungsbedürftig

Mit den oben genannten Maßnahmen kann die Struktur ohne Big-Bang-Refactoring in eine deutlich robustere, teamfreundlichere Architektur überführt werden.
