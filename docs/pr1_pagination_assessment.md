# PR 1 – Pagination-Prüfung

Die zusätzliche Pagination-Auffälligkeit wurde für die beiden in PR 1 verwendeten Referenzfälle überprüft. Die Ergebnisse zeigen, dass **kein einheitlicher PR-1-Defekt** vorliegt, sondern zwei unterschiedliche Situationen.

| PDF | HEAD vor PR 1 | aktueller Stand in PR 1 | Einordnung |
|---|---:|---:|---|
| `c2_suizidgedanken.pdf` | 2 Seiten | 3 Seiten | neuer Mehrseiten-Effekt im technischen Referenzfall |
| `b6_geschlechtsspezifisch.pdf` | 3 Seiten | 3 Seiten | unverändertes Altverhalten |

Bei `c2_suizidgedanken` ist die Ursache **nicht** die alte generische Kontaktlogik, sondern die neue Kombination aus bestehendem Langtext, weiterhin im Body stehenden Hilfekontakten unter `Weiterführend` und dem zusätzlich bewusst gesetzten `help_module`. Dadurch wird die Schlusszone länger; im aktuellen Rendering kippt am Ende sogar im Wesentlichen nur noch der Footer auf eine dritte Seite. Ein testweises Reduzieren der vertikalen Abstände und eine kompaktere Footer-Typografie haben die Seitigkeit **nicht** wieder auf zwei Seiten zurückgebracht.

Bei `b6_geschlechtsspezifisch` ist die 3-Seitigkeit hingegen **kein neuer Effekt von PR 1**. Der Fall war bereits vor dem Template-Umbau dreiseitig und bestätigt damit, dass hier ein allgemeineres Pagination-Thema des bestehenden PDF-Systems vorliegt.

## Empfehlung für den Scope von PR 1

Für **PR 1** sollte die neue Schlusslogik beibehalten werden. Die Pagination-Frage sollte **nicht** mehr im selben PR grundsätzlich gelöst werden, weil sie bereits in die Inhalte und die spätere Migrationslogik von PR 2 hineinragt.

Die saubere PR-1-Entscheidung lautet daher:

1. PR 1 bleibt auf **Template-Infrastruktur** fokussiert.
2. `c2_suizidgedanken` bleibt als **technischer Referenzfall** für das optionale Hilfemodul bestehen.
3. Die eigentliche Seitigkeitsoptimierung von `c2_suizidgedanken` wird erst in **PR 2** zusammen mit der konzeptionellen Bereinigung von `Weiterführend` versus `Hilfe` vorgenommen.
4. Das breitere Pagination-Thema mehrseitiger PDFs wird als **eigener Folgepunkt** für Pilotgruppe oder separaten Render-PR behandelt.

## Konkreter nächster Schritt

Wenn keine weitere inhaltliche Anpassung für PR 1 gewünscht ist, kann der aktuelle Stand nun in einen sauberen Review-Zustand überführt werden: kurzer Git-Diff-Review, dann Commit, Push und PR-Eröffnung mit explizitem Hinweis auf den dokumentierten Pagination-Folgepunkt.
