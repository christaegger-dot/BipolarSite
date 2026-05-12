# Release Audit

Der Release-Audit ist die erste repo-native MVP-Version eines wiederholbaren Freigabe-Checks fuer die BipolarSite. Er soll nicht menschliche Fachfreigaben ersetzen, aber die bisher manuell wiederkehrenden technischen und strukturellen Audits zu einem einzelnen Befehl buendeln.

## Ziele

- Build- und Lint-Gates in einem Lauf pruefen
- interne Links, Anker und Build-Output systematisch kontrollieren
- PDF-Manifest, Dateivorhandensein und Basis-Metadaten abgleichen
- lokale SEO-/Metadatenlogik gegen den Build pruefen
- Produktionsheader, Cache-Regeln und zentrale Live-Metadaten verifizieren
- verbleibende manuelle Hand-off-Gates explizit sichtbar machen

## Befehle

```bash
npm run audit:release
```

Fuehrt den kompletten MVP-Audit aus:

- `npm run build`
- `npm run lint`
- lokale Build-Checks
- Produktions-Header- und Metadaten-Checks (mit resilienter Reachability-Logik im Full-Audit)
- Browser-Abdeckung plus verbleibender Hand-off-Hinweis

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


## Voraussetzungen

- **`pdfinfo` ist verpflichtend** fuer den Check `PDF manifest and assets` (Seitenzahl, PDF-Titel, A4-Format).
- In CI wird das ueber `poppler-utils` bereitgestellt.
- Lokal bitte ebenfalls `poppler-utils` (oder ein Paket mit `pdfinfo`) installieren; ohne `pdfinfo` endet der Audit mit `FAIL`.

## Aktuelle Check-Bloecke

1. `Config and documentation drift`
2. `Build and lint`
3. `Internal links and anchors`
4. `PDF manifest and assets`
5. `Local SEO and metadata`
6. `Production headers and metadata`
7. `Browser coverage and manual hand-off`

## Statuslogik

- `PASS`: keine Befunde
- `WARN`: kein technischer Blocker, aber offener Nachlauf oder manuelle Freigabe noetig
- `FAIL`: bestaetigter Produkt-/Content-/Konfigurations-Blocker

Infra-Fehler (z. B. fehlende Tooling-Dependency oder temporaere Netzwerkprobleme) koennen auf Check-Ebene weiterhin als `fail` sichtbar sein, werden fuer den **overallStatus** jedoch als `WARN` gewichtet, damit transiente Betriebsprobleme nicht denselben Impact wie Produktregressionen haben.

Der Prozess beendet sich nur bei `FAIL` mit Exit-Code `1`. `WARN` bleibt bewusst nicht-blockierend, damit offene manuelle Gates sichtbar bleiben, ohne lokale oder CI-Laeufe unnoetig zu brechen.

Reachability-Sonderfall Produktion:
- Im **Full-Audit** (`npm run audit:release` / `:json`) wird ein reiner Reachability-Ausfall der Live-URL als `WARN` bewertet, damit lokale Qualitätsgates nicht false-negativ blockieren.
- Im **Production-Only-Audit** (`npm run audit:release:prod`) bleibt Reachability **blocking** (`FAIL`), da dieser Modus explizit die Live-Prüfung darstellt.

PDF-QA-Policy:
- `pdfinfo` ist verbindlich. Wenn `pdfinfo` fehlt oder nicht ausführbar ist, wird `pdf-manifest` als `FAIL` gewertet (kein stilles Skip von Seitenzahl-/Titel-/A4-Prüfungen).

## Was die MVP noch nicht automatisiert

- reale iPhone-Safari- und iPhone-Chrome-Freigabe
- fachliche Endfreigabe fuer Kontakte, Rechtsformulierungen und Krisenhinweise
- tagesaktuelle externe Quellenverifikation fuer alle Kontaktstellen

## Naechste sinnvolle Ausbaustufen

- noch tiefere Browser-Flow-Checks fuer `KP1` bis `KP5`
- Screenshot-Anhaenge bei Browser-Fehlern
- strukturierter Kontakt-/Quellen-Audit auf Basis von `src/_data/sources.js`
- Markdown-Reportdatei fuer PR-Anhaenge
