# Post-Release Hardening Backlog

**Datum:** 2026-05-19  
**Status:** L-01 bis L-04 umgesetzt; automatisierte Gates bleiben verbindlich.

Dieser Backlog hielt die verbleibenden Low-Themen aus dem Pre-Release-Audit fest. L-01 bis L-04 wurden im Hardening-Pass geschlossen oder in eine engere Restaufgabe ueberfuehrt. Der Repo-Cleanup bleibt bewusst separat.

## L-01: Notfallnummern ausserhalb `/notfall/`

**Status:** erledigt.

Notfallnummern duerfen ausserhalb der Notfallseite oder eines Krisen-Handouts nur erscheinen, wenn der konkrete Abschnitt eine unmittelbare Sicherheitslogik hat. Allgemeine Psychoedukationsseiten sollen keine Krisennummern streuen. Der Release-Audit prueft diese Regel nun fuer sichtbare Inhalte ausserhalb der erlaubten Pfade.

## L-02: Pagefind Component UI pruefen

**Status:** erledigt.

Die Suche nutzt nicht mehr die Pagefind Default UI. Stattdessen rendert die Website eine eigene, schlanke Suchoberflaeche mit Pagefind als Index-Backend. Damit entfaellt der Default-UI-Hinweis und das Styling bleibt im eigenen Designsystem.

## L-03: CSP weiter haerten

**Status:** gehaertet; Rest ist bewusste Tool-Altlast.

Die breite Direktive `style-src 'unsafe-inline'` wurde entfernt. `style-src` und `style-src-elem` erlauben nur noch `self`; `style-src-attr 'unsafe-inline'` bleibt eng begrenzt fuer bestehende interaktive Tool-Styles, die per Runtime gesetzt werden. Ein vollstaendiges Entfernen dieser Rest-Erlaubnis waere ein separater Tool-Refactor.

## L-04: Design-Token-Drift reduzieren

**Status:** fuer aktive Modul-SVGs/Marker erledigt.

Die aktiven Inline-SVGs in den Modulen 1 bis 5 sowie die Marker in Modul 7 wurden auf vorhandene Tokens oder semantische CSS-Variablen umgestellt. Einzelne externe Marken-, OG- oder Archiv-Assets koennen weiterhin feste Farben enthalten; sie sind nicht Teil dieses Release-Blockers.

## Repo-Cleanup: historische Handout-Quellen

**Status:** Produktionsflaeche bereinigt; Repo-Archiv bewusst separat klaeren.

Der Produktionsbuild liefert nur die 14 kanonischen Handouts plus 5 aktiv verlinkte Downloads aus. Historische PDF-Quellen und alte Draft-Markdowns liegen weiterhin im Repo, sind aber nicht oeffentlich. Ein spaeterer Cleanup sollte entscheiden, ob diese Dateien geloescht, in ein Archiv verschoben oder als interne Quellenhistorie behalten werden.
