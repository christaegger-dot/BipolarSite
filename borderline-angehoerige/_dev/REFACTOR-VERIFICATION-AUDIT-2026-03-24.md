# Refactor Verification Audit — borderline-angehoerige

**Datum:** 2026-03-24  
**Modus:** Audit (kein Redesign)  
**Scope:** Frontend-Struktur, Routing, Layout, tote/verwaiste Module, technische Integrität nach Refactor

## 1) Executive Summary

Der technische Refactor-Stand ist **weitgehend stabil**: Produktions-Build läuft durch, TypeScript-Check läuft (über vorhandenes `check`-Script), die zentrale Routing-Struktur ist für die geforderten Pfade vollständig, und die Layout-Aufteilung in Header/MobileMenu/RessourcenMenu/Hooks ist konsistent.

Es bestehen jedoch **prozessuale und strukturelle Restpunkte**:

- `npm install` schlägt wegen `workspace:*`-Dependency fehl (Repo ist faktisch auf pnpm ausgerichtet).
- Die geforderten npm-Scripts `lint`, `typecheck`, `test` fehlen.
- Es gibt mehrere wahrscheinlich verwaiste UI-/Domain-Module (ohne Importpfad vom Entry-Graph).
- Bei Container-/Breiten-Definitionen sind Inkonsistenzen erkennbar (`container` vs `max-w-screen-2xl`), was visuell zu Uneinheitlichkeit führen kann.

## 2) Gesamturteil

**Bereit mit kleinen Restpunkten** (kein P0-Befund).

## 3) PASS / FAIL pro Bereich

| Bereich                         | Status                | Kurzbegründung                                                                                          |
| ------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| Build                           | PASS                  | `npm run build` erfolgreich; nur Warnung zu nicht gesetzten Vite-Env-Variablen in `index.html`.         |
| Typecheck                       | FAIL                  | Gefordertes Script `npm run typecheck` fehlt; alternativ vorhandenes `npm run check` läuft erfolgreich. |
| Lint                            | FAIL                  | Script `npm run lint` fehlt.                                                                            |
| Tests                           | FAIL                  | Script `npm test` fehlt.                                                                                |
| Routing                         | PASS                  | Alle geforderten Audit-Pfade sind in Route-Registry/Router abgedeckt (inkl. `/404`, Redirects).         |
| Layout                          | PASS (mit P2-Hinweis) | Desktop-/Mobile-Navigation, Ressourcen-Dropdown, Search-Lazy-Loading und A11y-Keyhandling vorhanden.    |
| Tote Module / Architektur-Drift | FAIL (P1)             | Mehrere Module mutmaßlich ohne aktiven Importpfad (technische Drift/Altbestand).                        |
| Regressionen                    | PASS (mit P2-Hinweis) | Keine Build-/Routing-Regressionsindikatoren; visuelle Inkonsistenzrisiken aus Width-/Container-Mix.     |

## 4) Befundtabelle

| Prio | Datei/Bereich                                                                                                                                                     | Problem                                                                      | Auswirkung                                                                                          | Empfohlene Maßnahme                                                                                  |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| P1   | Tooling / package manager                                                                                                                                         | `npm install` bricht mit `EUNSUPPORTEDPROTOCOL` (`workspace:*`) ab.          | Standard-Setup via npm nicht lauffähig; Onboarding/CI kann scheitern.                               | Offiziell pnpm als Pflicht dokumentieren **oder** npm-kompatible Dependency-Definitionen herstellen. |
| P1   | `package.json` Scripts                                                                                                                                            | `lint`, `typecheck`, `test` fehlen als explizite Scripts.                    | Audit-/CI-Erwartungen nicht direkt erfüllbar; Qualitätsgates uneinheitlich.                         | Scripts ergänzen (z. B. `typecheck` alias auf `check`, lint/test definieren).                        |
| P1   | Modulgraph (`client/src/components/ui/*`, `client/src/domain/resources.ts`, `client/src/components/Map.tsx`, `client/src/components/interactive/ProgressBar.tsx`) | Mutmaßlich verwaiste Module ohne Importpfad vom Entry-Graph.                 | Erhöhte Wartungslast, Verwirrung über aktive Architektur nach Refactor.                             | Verwendungsprüfung und Entfernen/Archivieren oder klar dokumentieren (warum bewusst behalten).       |
| P2   | Layout-Container-Strategie (`Layout.tsx`, `MobileMenu.tsx`)                                                                                                       | Gemischter Einsatz von `container` und `max-w-screen-2xl`.                   | Potenziell sichtbare Breiten-/Ausrichtungs-Inkonsistenzen zwischen Header, Content und Mobile-Menü. | Einheitliche Container-Strategie festlegen (Audit-Befund, kein automatischer Umbau).                 |
| P2   | Build-Warnungen (`index.html` / env)                                                                                                                              | `%VITE_ANALYTICS_ENDPOINT%` und `%VITE_ANALYTICS_WEBSITE_ID%` nicht gesetzt. | Keine Build-Blocker, aber potenziell fehlende Analytics-Funktionalität.                             | Env-Dokumentation ergänzen oder Fallback-Werte definieren.                                           |

## 5) Liste aller tatsächlich ausgeführten Befehle

```bash
npm install
cat package.json
npm run build
npm run lint
npm run typecheck
npm test
npm run check
rg --files
sed -n '1,220p' client/src/app/routes.ts
sed -n '1,240p' client/src/app/Router.tsx
sed -n '1,260p' client/src/components/Layout.tsx
sed -n '1,260p' client/src/components/layout/HeaderNav.tsx
sed -n '1,280p' client/src/components/layout/RessourcenMenu.tsx
sed -n '1,260p' client/src/components/layout/useRessourcenMenuA11y.ts
sed -n '1,280p' client/src/components/layout/MobileMenu.tsx
sed -n '1,260p' client/src/components/layout/navigationData.ts
sed -n '1,260p' client/src/domain/navigation.ts
sed -n '1,260p' client/src/domain/resources.ts
sed -n '1,260p' client/src/domain/content-types.ts
sed -n '1,260p' client/src/App.tsx
sed -n '1,220p' client/src/main.tsx
sed -n '1,260p' client/src/app/AppProviders.tsx
sed -n '1,80p' client/src/pages/Home.tsx
sed -n '1,220p' client/src/pages/NotFound.tsx
cat client/public/_redirects
cat netlify.toml
rg "useComposition" client/src -n
rg "useCountUp" client/src -n
rg "usePersistFn" client/src -n
rg "mainResourceCategories|resourceTypeFilters" client/src -n
rg "@/data/kontakte|from \"@/data/kontakte\"|from '@/data/kontakte'" client/src -n
rg "@/content/genesung|@/content/selbstfuersorge|@/content/verstehen" client/src -n
rg "sections/VerstehenInfografikenSection|SelbstfuersorgeInfografikenSection|GenesungInfografikenSection" client/src -n
rg "@/hooks/useMobile|useMobile\(" client/src -n
python (Import-Graph-Scan auf mutmaßlich unreferenzierte Module)
python (Abgleich geforderter Routen gegen routes.ts/Router.tsx)
pnpm dlx madge --extensions ts,tsx --circular client/src/main.tsx
```

## 6) Liste fehlender Scripts

- `lint`
- `typecheck`
- `test`

(Hinweis: vorhanden sind u. a. `build`, `check`, `dev`, `start`, `preview`, `format`.)

## 7) Liste minimaler Fixes

- **Keine minimalen Code-Fixes vorgenommen** (Audit-only, kein klarer P0/P1-Defekt mit zwingendem Hotfix im laufenden Auftrag).

## 8) Befunde, die bewusst nicht automatisch gefixt wurden

- Fehlende npm-Scripts (`lint`, `typecheck`, `test`)
- npm/pnpm-Installationsinkonsistenz (`workspace:*` via npm)
- Mutmaßlich verwaiste Module
- Visuelle Container-/Breiten-Inkonsistenzen
- Build-Env-Warnungen für Analytics

## 9) Klare Empfehlung für den nächsten Schritt

1. **Tooling stabilisieren (P1):** package-manager-Strategie festziehen (pnpm-only oder npm-kompatibel machen).
2. **CI-/Audit-Scripts ergänzen (P1):** `lint`, `typecheck`, `test` explizit definieren.
3. **Modulbereinigung (P1):** unreferenzierte Dateien prüfen und bereinigen/dokumentieren.
4. **Layout-Konsistenz (P2):** Container-System vereinheitlichen (separater UI-Auftrag).

## Explizite Abschlussaussagen

- **Refactoring technisch sauber?** Größtenteils ja, mit P1-Restpunkten im Tooling/Scripting/Modulbestand.
- **Routing vollständig?** Ja, für die geforderten Routen vollständig und konsistent inkl. Fallback/404.
- **Layout strukturell stabil?** Ja, inklusive Navigation, Mobile-Menü, Ressourcen-Dropdown, Search-Lazy-Loading und A11y-Keyhandling.
- **Breiten-/Container-/Boxen-Probleme vorhanden?** Ja, als P2-Risiko (inkonsistente Container-Strategie) dokumentiert.
- **Repo aktuell merge-fähig?** Ja, **mit kleinen Restpunkten** (kein P0), empfohlen nachnah mit Tooling-/Drift-Bereinigung.
