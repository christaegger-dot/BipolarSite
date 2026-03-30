# Content & Logic Validation Audit (24.03.2026)

## 1) Executive Summary

Dieses Audit prüft die vorliegende externe Kritik **nicht pauschal**, sondern textnah auf Basis des aktuellen Repos.

**Ergebnis in Kürze:**

- Ein Teil der Kritik ist **valide** (v. a. ICD-11-Lücke im Fließtext, punktuelle sprachliche Vereinfachungen, mindestens eine echte technische Inkonsistenz aus der Modul-Weiterentwicklung).
- Ein Teil ist **teilweise valide / kontextabhängig** (US-Zentrierung trifft auf wissenschaftliche Referenzen teils zu, auf Versorgungsressourcen aber nicht; Therapielandschaft ist im Kern da, aber ausbaufähig).
- Einzelne Punkte sind **nicht hinreichend belegt** (z. B. NIMH/NAMI-Übergewicht als dominantes Problem im aktuellen Stand).

**Gesamtbild:** Die Seite ist klar auf den DACH-/Schweiz-Kontext (v. a. Zürich) ausgerichtet, fachlich grundsätzlich tragfähig und bereits remissionsorientiert. Verbesserungsbedarf besteht vor allem in der **diagnostischen Einordnung (DSM/ICD)**, in der **Differenzierung mancher Angehörigen-Frames** und in **Inkonsistenzen aus Content-/Modulfortschreibung**.

---

## 2) Gesamturteil

**Audit-Urteil:**

- **Fachlich-inhaltlich:** solide mit klaren Präzisierungsbedarfen.
- **Technisch-strukturell:** grundsätzlich konsistent; es gibt aber **reale, konkrete Drift-Stellen**.
- **Sprachlich:** überwiegend entstigmatisierend, mit **einzelnen Formulierungen** (insb. im Umfeld Mason/Kreger), die differenzierter gefasst werden sollten.

**Empfehlte Gesamtstrategie:**

1. **DSM beibehalten**, aber **ICD-11 systematisch ergänzen** (kein Komplettumbau).
2. Quellenlogik trennen in **Wissenschaft** vs. **Versorgung/Hilfe** und je Zielgruppe labeln.
3. Technische Driftpunkte gezielt korrigieren (kein Big-Bang-Refactor).

---

## 3) Bewertungstabelle aller Kritikpunkte

| Kritikpunkt                                         | Bewertung                              | Betroffene Datei / Seite / Modul                                                    | Begründung                                                                                                                                                                                                                                                              | Empfohlene Maßnahme                                                                                                     |
| --------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| Website sei US-zentriert                            | **teilweise valide / kontextabhängig** | `Verstehen`, `UeberUns`, `Impressum`, `UnterstuetzenTherapie`, `Selbsthilfegruppen` | In wissenschaftlichen Grundlagentexten dominieren teils US-geprägte Referenzen (APA/Linehan/Mason-Kreger), gleichzeitig sind Versorgungs- und Notfallinhalte klar CH/ZH-lokal (PUK, Pro Mente Sana, Stand by You, Zürcher Angebote).                                    | Quellen-Labels einführen: „Wissenschaftliche Evidenz (international)“ vs. „Versorgung (CH/ZH)“.                         |
| DSM statt ICD                                       | **valide**                             | `Verstehen.tsx`, `SEO.tsx`                                                          | Diagnoseerklärung im Fließtext ist stark DSM-zentriert („9 DSM-5 Kriterien“); ICD wird nur indirekt im Schema-Markup (ICD-10 F60.3) geführt. ICD-11 wird inhaltlich nicht erklärt.                                                                                      | DSM-Abschnitt behalten, daneben kompakten ICD-11-Abschnitt ergänzen (Crosswalk/Einordnung für DACH).                    |
| NIMH/NAMI statt DACH-Ressourcen                     | **nicht hinreichend belegt**           | Ressourcenseiten (`Selbsthilfegruppen`, `Fachstelle`, `UnterstuetzenTherapie`)      | In den untersuchten Ressourcenbereichen finden sich primär CH-/ZH-nahe Hilfen; ein dominantes NIMH/NAMI-Übergewicht ist im aktuellen Stand nicht ersichtlich.                                                                                                           | Kein großer Eingriff nötig; bei Bedarf DACH-Alternative-Liste als optionale Ergänzung.                                  |
| Therapielandschaft unvollständig                    | **teilweise valide / kontextabhängig** | `UnterstuetzenTherapie.tsx`, `FAQ.tsx`                                              | DBT, MBT, Schematherapie, TFP sind genannt; Family-/Angehörigenformate sind punktuell erwähnt. Gleichzeitig fehlen strukturierte Hinweise zu Kombinationsbehandlung, Komorbiditätsbehandlung und Übergängen zwischen ambulant/teilstationär/stationär außerhalb Zürich. | Therapieübersicht um „Versorgungswege & Komorbidität“ erweitern (knapp, ohne Redesign).                                 |
| Remissionsdaten fehlen                              | **nicht hinreichend belegt**           | `Genesung.tsx`, `Home.tsx`, `FAQ.tsx`, `Glossar.tsx`, `Materialien.tsx`             | Remissions-/Recoverydaten sind mehrfach präsent (85–93 %, 50 %, inkl. Begriffsklärungen und Quellenblöcken).                                                                                                                                                            | Keine Grundkorrektur; eher einheitliche Quellen- und Definitionsdarstellung auf allen Seiten.                           |
| Einzelne Beispiele seien zu vereinfachend           | **teilweise valide / kontextabhängig** | v. a. `FAQ.tsx`, `Verstehen.tsx`, `UnterstuetzenTherapie.tsx`                       | Didaktische Vereinfachungen sind für Angehörigen-Psychoedukation sinnvoll, wirken an einzelnen Stellen aber kategorisch („typisch“, „Kernmerkmal“) und ohne Kontextgrenzen.                                                                                             | Bei kritischen Aussagen Kurzqualifikatoren ergänzen („häufig“, „kann“, „nicht bei allen“).                              |
| 6→8 Module hätten technische Inkonsistenzen erzeugt | **valide (punktuell)**                 | `Materialien.tsx`, `Search.tsx`                                                     | Konkrete Drift: Materialien-Text nennt 6 Kategorien, Filter/Datensatz enthalten zusätzlich `soforthilfe` als 7. Kategorie. In der Suche verweisen mehrere Unterstützen-Einträge pauschal auf `/unterstuetzen` statt auf präzisere Unterseiten.                          | 1) Kategorien-Text an tatsächliche Taxonomie anpassen. 2) Suchziele granular auf `/unterstuetzen/alltag                 | therapie | krise` mappen. |
| Formulierungen könnten stigmatisierend wirken       | **teilweise valide / kontextabhängig** | `UeberUns.tsx`, `Verstehen.tsx`, `FAQ.tsx`                                          | Großteil ist entstigmatisierend; einzelne Begriffe/Frames („Eiertanz“, teils polarisierende Beispielsprache) können bei Betroffenen als einseitig erlebt werden, besonders ohne Gegenrahmung.                                                                           | Kontextualisieren: Angehörigenperspektive klar markieren + Betroffenenperspektive/Recovery-Frame direkt daneben setzen. |

---

## 4) Befunde nach Prüffeldern

### A) Diagnostischer Rahmen

**Beobachtung:**

- DSM wird explizit didaktisch genutzt (9 Kriterien, APA-Verweis).
- ICD ist nur technisch im strukturierten Datenobjekt sichtbar (ICD-10-Code), nicht als inhaltliche, deutschsprachige Einordnung.

**Bewertung:** **valider Gap** (insb. für DACH-Orientierung).

**Empfohlene Einordnung:**

- **DSM beibehalten + ICD ergänzen** (präferiert).
- Keine „größere Korrektur“ nötig, solange Begriffe und Diagnosekontext sauber parallelisiert werden.

### B) Quellen- und Ressourcenlogik

**Beobachtung:**

- Wissenschaftliche Referenzen sind international/US-geprägt (klinisch üblich).
- Versorgungs-/Hilfsressourcen sind klar CH-/ZH-zentriert.

**Bewertung:** **teilweise valide**, aber nur wenn Wissenschafts- und Versorgungsebene nicht getrennt werden.

**Empfehlung:** Quellenlogik explizit zweigleisig kennzeichnen.

### C) Therapielandschaft

**Beobachtung:**

- Wesentliche evidenzbasierte Verfahren sind vorhanden.
- Versorgungspfade sind gut für Zürich, weniger generalisiert für DACH.

**Bewertung:** **teilweise valide** (Vollständigkeit für Angehörige kann erweitert werden).

### D) Verlauf / Prognose / Remission

**Beobachtung:**

- Remissions- und Recovery-Daten sind gut sichtbar vorhanden und wiederholt eingebettet.

**Bewertung:** Kritik „fehlt“ ist **nicht hinreichend belegt**.

### E) Sprache / Stigma

**Beobachtung:**

- Gesamtton: überwiegend entstigmatisierend.
- Punktuell: Begriffe mit hoher emotionaler Last (u. a. Kreger-Bezug „Eiertanz“) ohne unmittelbare Gegenperspektive.

**Bewertung:** **teilweise valide**.

### F) Technische Inkonsistenzen aus Modulumbau

**Beobachtung (nur reale Punkte):**

1. Materialienseite kommuniziert 6 Kategorien, führt aber faktisch eine zusätzliche `soforthilfe`-Kategorie.
2. Suchindex nutzt bei mehreren „Unterstützen“-Treffern ein Sammelziel (`/unterstuetzen`) statt die inzwischen getrennten Untermodule.

**Bewertung:** **valide (punktuell, nicht flächig)**.

---

## 5) Wichtigste Korrekturen (separat)

### Fachlich wichtigste Korrekturen

1. **DSM/ICD-Dual-Frame ergänzen** (DSM-5-TR + ICD-11-Kurzmapping für DACH).
2. **Therapielandschaft um Versorgungswege ergänzen** (ambulant/teilstationär/stationär, Komorbidität, Angehörigenprogramme).
3. **Quellenlogik sichtbar trennen** (Wissenschaft vs. Versorgung).

### Technisch wichtigste Korrekturen

1. **Materialien-Kategorietext an reale Taxonomie anpassen** (inkl. Soforthilfe).
2. **Search-Ziele für Unterstützen granularisieren** (Alltag/Therapie/Krise).

### Sprachlich wichtigste Korrekturen

1. **Kontextmarker bei verallgemeinernden Aussagen** ("häufig", "kann", "nicht bei allen").
2. **Kreger-/Angehörigenframe balancieren** durch unmittelbare Betroffenen-/Recovery-Einordnung.

---

## 6) Priorisierung (P0 / P1 / P2)

### P0 (hoch)

- DSM/ICD-Einordnung korrigieren (ICD-11 ergänzen, klarer DACH-Bezug).
- Reale technische Drift korrigieren (Materialien-Kategorien-Text, Search-Zielgenauigkeit).

### P1 (mittel)

- Therapie- und Versorgungswege für Angehörige strukturierter darstellen.
- Sprachliche Präzisierung bei potenziell polarisierenden Aussagen.

### P2 (niedrig)

- Zusätzliche DACH-Ressourcen als optionale Ergänzung außerhalb Zürich.
- Feinschliff Quellenkomponenten für konsistente Seitentemplates.

---

## 7) Klare Empfehlung für den nächsten Umsetzungs-Task

**Empfohlener nächster Task (ein Sprint, klar abgegrenzt):**

> **Task: „Diagnose- & Taxonomie-Konsistenz“**
>
> 1. In `Verstehen` einen kompakten Abschnitt „DSM-5-TR und ICD-11 im Überblick“ ergänzen (nur Einordnung, kein Redesign).
> 2. In `SEO` die MedicalCode-Referenz auf konsistenten aktuellen Diagnose-Rahmen prüfen/aktualisieren.
> 3. In `Materialien` die Kategoriekommunikation an die tatsächliche Taxonomie angleichen.
> 4. In `Search` die Unterstützen-Treffer auf die drei Unterseiten mappen.

**Warum dieser Task zuerst?**

- Er reduziert gleichzeitig das **höchste fachliche Risiko (Diagnostik-Rahmen)** und die **klar nachweisbaren technischen Inkonsistenzen**, ohne in einen vollständigen inhaltlichen Umbau zu kippen.
