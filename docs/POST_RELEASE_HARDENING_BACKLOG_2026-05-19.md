# Post-Release Hardening Backlog

**Datum:** 2026-05-19  
**Status:** nicht release-blockierend; automatisierte Gates sind gruen.

Dieser Backlog haelt die verbleibenden Low-Themen aus dem Pre-Release-Audit fest. Sie sollen bewusst geplant werden und nicht im schnellen Audit-Fix-Pass mit groesseren Seiteneffekten erledigt werden.

## L-01: Notfallnummern ausserhalb `/notfall/`

**Status:** Editorial-Regel dokumentiert.

Notfallnummern duerfen ausserhalb der Notfallseite oder eines Krisen-Handouts nur erscheinen, wenn der konkrete Abschnitt eine unmittelbare Sicherheitslogik hat. Allgemeine Psychoedukationsseiten sollen keine Krisennummern streuen.

## L-02: Pagefind Component UI pruefen

**Status:** spaetere Suche-Iteration.

Der Build-Hinweis zur Pagefind Default UI ist kein Blocker. Bei einer naechsten Suche-Iteration soll die Component UI geprueft werden, weil sie laut Pagefind-Hinweis fuer neue Integrationen die bessere Basis fuer Accessibility und Customizing ist.

## L-03: CSP weiter haerten

**Status:** groesserer Refactor.

`style-src 'unsafe-inline'` bleibt vorerst bewusst aktiv, weil mehrere Templates und generierte Tool-UIs noch Inline-Styles verwenden. Eine Haertung auf `style-src 'self'` ist erst sinnvoll, wenn diese Inline-Styles systematisch in CSS-Klassen, Tokens oder kontrollierte CSS-Variablen ueberfuehrt sind.

## L-04: Design-Token-Drift reduzieren

**Status:** schrittweise bei Modul- und Diagrammpflege.

Mehrere aeltere Inline-SVGs und Marker enthalten noch hartkodierte Hex-Farben. Kein Big-Bang-Refactor: Bei der naechsten Pflege der betroffenen Module sollen Farben auf vorhandene Tokens oder semantische CSS-Variablen umgestellt werden.

## Repo-Cleanup: historische Handout-Quellen

**Status:** Produktionsflaeche bereinigt; Repo-Archiv bewusst separat klaeren.

Der Produktionsbuild liefert nur die 14 kanonischen Handouts plus 5 aktiv verlinkte Downloads aus. Historische PDF-Quellen und alte Draft-Markdowns liegen weiterhin im Repo, sind aber nicht oeffentlich. Ein spaeterer Cleanup sollte entscheiden, ob diese Dateien geloescht, in ein Archiv verschoben oder als interne Quellenhistorie behalten werden.
