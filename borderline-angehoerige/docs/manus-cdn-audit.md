# Manus CDN Audit (Follow-up)

Stand: 2026-03-26

## Ergebnis

- Verbleibende produktive Referenzen in priorisierten Dateien: **62**.
- Diese Referenzen liegen jetzt zentraler in Content-Dateien (`content/*.ts`) statt verteilt in Seitenkomponenten.

## Warum nicht lokalisiert?

In dieser Ausführungsumgebung sind direkte Downloads von `files.manuscdn.com` technisch blockiert (Verbindungsfehler über Proxy und ohne Proxy). Daher war eine echte Dateiübernahme nach `public/assets/...` nicht automatisierbar möglich.

## Bereits umgesetzt

- Logo/Hero der Startseite wurden auf lokale Assets umgestellt.
- Doppelte Referenzen in Seiten reduziert (z. B. Verstehen, Unterstützen, Genesung jetzt über zentrale Content-Dateien).
- CSP `connect-src` wurde bereits bereinigt; `img-src/media-src` bleiben wegen verbleibender produktiver Referenzen auf Manus offen.
