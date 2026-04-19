## Was wurde geändert?

<!-- Kurze Zusammenfassung der Änderungen. Was und warum? -->

Closes #<!-- Issue-Nummer -->

---

## Art der Änderung

- [ ] Bug-Fix
- [ ] Neues Feature / neue Inhalte
- [ ] Refactoring (kein funktionaler Unterschied)
- [ ] Style / Design
- [ ] Barrierefreiheit
- [ ] Performance
- [ ] Dokumentation / Konfiguration

---

## Checkliste

### Allgemein
- [ ] `npm run build` läuft ohne Fehler durch
- [ ] Seiten wurden im Browser geprüft (Desktop + Mobil)
- [ ] Keine hartkodierten Werte — CSS-Tokens (`var(--…)`) verwendet
- [ ] `useSharedCSS: true` im Frontmatter aller neuen Seiten gesetzt

### Barrierefreiheit (WCAG 2.1 AA)
- [ ] Kontrastverhältnis mind. 4,5:1 (Text) bzw. 3:1 (Grafik/UI) geprüft
- [ ] Tastaturnavigation getestet (Tab, Enter, Esc)
- [ ] Fokus-Indikator sichtbar
- [ ] Bilder haben sinnvolle `alt`-Texte (oder `alt=""` für dekorative Grafiken)
- [ ] Semantisches HTML verwendet (`<nav>`, `<main>`, `<section>`, `<h1>`–`<h6>`, …)
- [ ] ARIA-Attribute nur wo nötig und korrekt eingesetzt

### Inhalte
- [ ] Texte sind auf Deutsch und lektoriert
- [ ] Medizinische / psychologische Angaben auf fachliche Richtigkeit geprüft
- [ ] Keine personenbezogenen oder vertraulichen Daten im Code

### CSS-Kaskade
- [ ] Änderungen in der richtigen Datei (`tokens.css` → `shared.css` → `module.css` → `overrides.css`)
- [ ] Keine unnötigen `!important`-Deklarationen hinzugefügt
- [ ] Responsive Breakpoints (900 / 768 / 600 px) geprüft

---

## Testbeschreibung

<!-- Wie wurde die Änderung getestet? Welche Browser / Geräte? -->

---

## Screenshots (falls sinnvoll)

<!-- Vorher / Nachher oder neue UI-Elemente zeigen -->
