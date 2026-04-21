# PR 1 – Template-Umbau: technischer Referenzstand

## Zweck

Dieses Dokument hält den **technischen Zielzustand von PR 1** fest. PR 1 baut die Renderlogik für Handout-Drafts und PDF-Exports so um, dass Schlussbereiche künftig nicht mehr automatisch über `emergency_contacts` entstehen, sondern über ein **bewusst gesetztes optionales Hilfemodul**.

## Neue Grundlogik

| Bereich | Neuer Standard |
|---|---|
| Schlussbereich nicht-akuter PDFs | endet ohne generischen Kontaktblock |
| Hilfe / Kontakte | erscheinen nur noch über `help_module` |
| `Weiterführend` | bleibt konzeptionell von Hilfe getrennt |
| Footer | enthält nur Branding / Verantwortlichkeit / Stand |

## Neues Feld

```yaml
help_module:
  enabled: true
  title: "Sofort Hilfe dazunehmen"
  note: "Kurze Einordnung, warum dieser Block hier erscheint."
  items:
    - label: "Sanität"
      number: "144"
      note: "Bei akuter Gefahr"
      tone: "urgent"
```

## Feldlogik

| Feld | Bedeutung |
|---|---|
| `enabled` | schaltet das Modul explizit ein oder aus |
| `title` | Überschrift des Hilfemoduls |
| `note` | optionale knappe Einordnung |
| `items` | Liste der Hilfepunkte |
| `items[].label` | Bezeichnung des Eintrags |
| `items[].number` | primärer Wert, z. B. Telefonnummer oder Ziel |
| `items[].text` | Alternative zu `number`, falls kein numerischer Wert passt |
| `items[].note` | optionale Zusatzinformation |
| `items[].tone` | optional `urgent`, um visuell zu priorisieren |

## Legacy-Feld

`emergency_contacts` bleibt vorerst als **Legacy-Feld** in bestehenden Drafts erhalten, wird durch PR 1 aber **nicht mehr als generischer Default-Abschluss gerendert**. Die inhaltliche Migration der Bestands-Drafts erfolgt erst in PR 2 und PR 3.

## Technischer Referenzfall in PR 1

Für die Validierung des neuen Renderpfads enthält `c2_suizidgedanken.md` bereits ein minimales `help_module`. Dieser Fall dient nur der **technischen Pfadprüfung** und ist noch nicht als vollständige Pilotmigration zu verstehen.

## Prüffragen für Folge-PRs

| Frage | Ziel |
|---|---|
| Braucht dieses Blatt überhaupt externe Hilfe am Ende? | Hilfemodule nur selektiv einsetzen |
| Gehören diese Inhalte in `Weiterführend` oder in `help_module`? | Trennung von Vertiefung und Hilfe sichern |
| Gibt es dieselbe Hilfe an mehreren Stellen? | Dopplungen systematisch entfernen |

## Renderziel

Die gewünschte Reihenfolge lautet:

> Inhalt → optionales Hilfemodul → Footer

Damit wird der frühere Standardpfad

> Inhalt → generischer Kontaktblock → Footer

systemweit verlassen.
