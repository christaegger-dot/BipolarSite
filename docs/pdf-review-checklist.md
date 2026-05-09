# PDF Review Checklist

Checkliste für die redaktionelle und barrierefreiheits-bezogene Prüfung eines PDF-Handouts vor Promotion oder Aktualisierung. Pro PDF einmal durchgehen, in der Manifest-Eintrag-Beschreibung dokumentieren oder als Stichpunkt im Commit erwähnen.

## Inhaltlich

- [ ] **Notfallnummern aktuell?** 144 / 117 / 143 / 147 / Ärztefon 0800 33 66 55 — aktueller Stand zum Datum der Prüfung
- [ ] **Quellenstand aktuell?** Zitierte Studien, Leitlinien, NICE-Guideline — kein offensichtlich veralteter Verweis
- [ ] **Keine medizinischen Detail-Aussagen** zu Dosierungen, Wirkstoff-Empfehlungen, Therapie-Kombinationen — Hinweis auf ärztliche Begleitung statt Detail
- [ ] **Hypomanie / Manie / Mischzustände** fachlich präzise (nicht „4–7 Tage"-Verkürzung, sondern „mindestens vier Tage, oft länger")
- [ ] **Valproat-Sicherheitshinweis** vorhanden, wenn Valproat erwähnt wird (Schwangerschaft, Kinderwunsch, individuelle ärztliche Begleitung)
- [ ] **Keine identifizierbaren Fallbeispiele** — Erfahrungsstimmen anonymisiert/typisiert, in Footer/Caption gekennzeichnet
- [ ] **Datenschutz-Hinweis bei Arbeitsblättern** vorhanden, wenn das Handout zum Ausfüllen gedacht ist (Vertraulichkeit der eigenen Notizen)

## Technik & Barrierefreiheit

- [ ] **Sprache gesetzt** (`/Lang (de-CH)` oder `de-DE` im PDF-Metadata)
- [ ] **Dokumenttitel gesetzt** (PDF-Title-Property gefüllt, nicht Default-Filename)
- [ ] **Lesereihenfolge geprüft** (z.B. via Adobe Pre-Flight oder freie Tools wie pdfa.org)
- [ ] **Tag-Struktur vorhanden** (überschriften, Listen, Absätze als Tags markiert — nicht nur visuelles Layout)
- [ ] **Alt-Texte für Bilder/Diagramme** wenn vorhanden
- [ ] **Lesbarkeit in Druckversion** — Schriftgrößen ≥ 9pt, Kontraste auf Druckpapier hinreichend
- [ ] **Bildschirm-Lesbarkeit auf Mobilgeräten** — Spalten-Breite, Schriftgröße im PDF-Reader auf 360px–breiten Geräten
- [ ] **Links funktionieren** (interne Anker, externe URLs auf aktuelle Ziele zeigend)

## Versionierung

- [ ] **Version-/Stand-/Prüfdatum** im PDF sichtbar (Footer, Backside oder Title-Page)
  - Format: `Version 1.0 · Stand: TT.MM.JJJJ · nächste Prüfung: TT.MM.JJJJ`
- [ ] **Manifest-Eintrag** in `src/_data/pdfs.js` aktualisiert (`updated`-Field, `assetId`, `pages`)
- [ ] **Filename-Konvention** eingehalten (URL-Slug = Filename)

## Notfall-Material spezifisch

Wenn das PDF Notfall-relevant ist (Akut-Karte, Krisenplan, Suizidgedanken-Handout):

- [ ] Notfallnummern auf der **ersten Seite** sichtbar (nicht ans Ende geschoben)
- [ ] Hauptaktion klar formuliert (z.B. „Rufen Sie 144")
- [ ] Keine langen Erklärungen vor der Akut-Information
- [ ] Druck-stabil — auch in Schwarzweiß-Druck noch klar

## Nicht-Anforderungen (bewusst nicht prüfen)

- A4-Vorgabe — wird durch CI-Audit `release-audit/checks/pdfManifest.mjs` automatisch geprüft
- Page-Count-Drift — wird durch CI-Audit automatisch geprüft
- Filename ↔ URL ↔ Manifest-Konsistenz — wird durch CI-Audit automatisch geprüft

Diese drei sind Drift-Klassen, die der CI-Gate ab #292 erzwingt.
