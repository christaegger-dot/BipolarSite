# Diagramm-Bibliothek Fachstelle-Handouts

Status: Entwurfsbibliothek, Version siehe `VERSION`.

Diese Bibliothek ist ein wachsender Baukasten fuer psychoedukative Fachstelle-Handouts. Sie dient der Auswahl, Sichtpruefung und Weiterentwicklung von Diagrammtypen. Die Aufnahme eines Diagramms in diese Bibliothek bedeutet noch keine Produktionsfreigabe.

## Oeffnen

Direktes Oeffnen der HTML-Datei per `file://` ist nicht robust, weil lokale JSX-Dateien geladen werden. Lokal ueber einen kleinen HTTP-Server oeffnen:

```bash
cd BipolarSite/docs/fachstelle-handout-workflow/diagram-library
python3 -m http.server 8765
```

Dann im Browser:

```text
http://127.0.0.1:8765/
```

## Dateien

- `index.html`: Einstiegspunkt.
- `design-canvas.jsx`: Review-Canvas mit Sortierung, Fokusmodus und Exportfunktion.
- `diagrams.jsx`: Diagramm-Komponenten, Registry, Beispiel-Daten und Freigabe-Metadaten.
- `.design-canvas.state.json`: optionaler Canvas-Zustand.
- `FREIGABE-CHECKLISTE.md`: Gate, bevor ein Diagramm als `approved` gilt.
- `PRODUKTIONS-RENDERING.md`: Adapter-Vertrag fuer finale Handout-PDFs.
- `ACCESSIBILITY.md`: Mindestanforderungen fuer Textalternative, Lesereihenfolge und PDF/UA.
- `CHANGELOG.md`: nachvollziehbare Paket-Aenderungen.
- `VERSION`: aktuelle Paketversion.

## Statusmodell

- `draft`: Entwurf, sichtbar in der Bibliothek, nicht produktionsfreigegeben.
- `review`: fachlich und visuell in Pruefung.
- `approved`: fuer einen definierten Handout-Kontext nach voller Pruefkette freigegeben.
- `deprecated`: historisch erhalten, nicht mehr neu verwenden.

`weasyPrintStatus` und `pdfUaStatus` bleiben getrennt vom visuellen Status. Ein Diagramm kann visuell gut sein und trotzdem fuer finale PDFs gesperrt bleiben.

## Druckoekonomie

Neue Diagramme folgen der `ink-light`-Policy:

- Seite und Diagrammgrund bleiben weiss (`#ffffff`).
- Keine vollflaechigen getoenten Karten, Panels oder Seitenhintergruende.
- Farbe traegt Orientierung ueber Linien, Konturen, Achsen, kleine Marker, Icons und sparsame Akzentflaechen.
- Grossflaechige Verlaufs-, Wasser- oder Quadrantenbereiche werden bevorzugt mit Linien, Labels, Konturen oder sehr hellen Tints umgesetzt.
- Diagramme muessen auch in Graustufen und bei tintensparendem Ausdruck verstaendlich bleiben.

## Datenmodell

`DIAGRAM_EXAMPLE_DATA` enthaelt nur Beispiel-Daten. Finale Handouts muessen eigene, handout-spezifische `data`-Objekte uebergeben. Beispiel-Daten duerfen nicht ungeprueft in Produktions-PDFs uebernommen werden.

## Freigabegrundsatz

Produktionsfreigabe entsteht erst pro Handout nach:

- handout-spezifischem Rendercheck
- Seitenzahl- und Mess-Gate
- visueller Gegenpruefung
- Inhalts- und Krisenhinweispruefung
- PDF/UA- und Lesereihenfolge-Pruefung
