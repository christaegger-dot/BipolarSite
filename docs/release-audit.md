# Release Audit

Der Release-Audit ist die erste repo-native MVP-Version eines wiederholbaren Freigabe-Checks fuer die BipolarSite. Er soll nicht menschliche Fachfreigaben ersetzen, aber die bisher manuell wiederkehrenden technischen und strukturellen Audits zu einem einzelnen Befehl buendeln.

## Ziele

- Build- und Lint-Gates in einem Lauf pruefen
- interne Links, Anker und Build-Output systematisch kontrollieren
- PDF-Manifest, Dateivorhandensein und Basis-Metadaten abgleichen
- lokale SEO-/Metadatenlogik gegen den Build pruefen
- Produktionsheader, Cache-Regeln und zentrale Live-Metadaten verifizieren
- offene manuelle Hand-off-Gates explizit sichtbar machen

## Befehle

```bash
npm run audit:release
```

Fuehrt den kompletten MVP-Audit aus:

- `npm run build`
- `npm run lint`
- lokale Build-Checks
- Produktions-Header- und Metadaten-Checks
- manueller Browser-Hand-off als explizite Warnschicht

```bash
npm run audit:release:ci
```

CI-freundliche Variante ohne Produktionsabfrage, JSON auf `stdout`.

```bash
npm run audit:release:prod
```

Prueft nur den Live-Produktionsstand.

```bash
npm run audit:release:json
```

Wie `audit:release`, aber als JSON-Ausgabe.

## Aktuelle Check-Bloecke

1. `Config and documentation drift`
2. `Build and lint`
3. `Internal links and anchors`
4. `PDF manifest and assets`
5. `Local SEO and metadata`
6. `Production headers and metadata`
7. `Manual browser hand-off`

## Statuslogik

- `PASS`: keine Befunde
- `WARN`: kein technischer Blocker, aber offener Nachlauf oder manuelle Freigabe noetig
- `FAIL`: technischer oder struktureller Blocker

Der Prozess beendet sich nur bei `FAIL` mit Exit-Code `1`. `WARN` bleibt bewusst nicht-blockierend, damit offene manuelle Gates sichtbar bleiben, ohne lokale oder CI-Laeufe unnötig zu brechen.

## Was die MVP noch nicht automatisiert

- volle Playwright-basierte Browser-Matrix aus `docs/test-matrix.md`
- reale iPhone-Safari- und Desktop-Firefox-Freigabe
- fachliche Endfreigabe fuer Kontakte, Rechtsformulierungen und Krisenhinweise
- tagesaktuelle externe Quellenverifikation fuer alle Kontaktstellen

## Naechste sinnvolle Ausbaustufen

- echte Browser-Flow-Checks fuer `KP1` bis `KP5`
- Screenshot-Anhaenge bei Browser-Fehlern
- strukturierter Kontakt-/Quellen-Audit auf Basis von `src/_data/sources.js`
- Markdown-Reportdatei fuer PR-Anhaenge
