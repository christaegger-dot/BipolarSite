# Kontaktdaten-Check

Automatisch extrahiert am 2026-03-09.
Bitte regelmässig prüfen, ob alle Nummern, E-Mails, URLs und Adressen noch aktuell sind.

---

## Telefonnummern

### Notruf- und Kurznummern

| Nummer | Beschreibung         | Datei                              | Zeile           |
| ------ | -------------------- | ---------------------------------- | --------------- |
| 144    | Sanitätsnotruf       | `client/src/data/kontakte.ts`      | 85–86           |
| 145    | Tox Info Suisse      | `client/src/data/kontakte.ts`      | 115–116         |
| 143    | Die Dargebotene Hand | `client/src/data/kontakte.ts`      | 190–191         |
| 147    | Pro Juventute        | `client/src/data/kontakte.ts`      | 200–201         |
| 117    | Polizei              | `client/src/components/Search.tsx` | 167 (Suchindex) |
| 112    | Euronotruf           | `client/src/pages/Soforthilfe.tsx` | 45, 271, 383    |

### PUK Zürich (058-Nummern)

| Nummer        | Beschreibung                                            | Datei                         | Zeile |
| ------------- | ------------------------------------------------------- | ----------------------------- | ----- |
| 058 384 66 66 | PUK Notfall/Krisenanfragen                              | `client/src/data/kontakte.ts` | 141   |
| 058 384 20 00 | PUK Erwachsene                                          | `client/src/data/kontakte.ts` | 152   |
| 058 384 46 82 | PUK Erwachsene ab 65 ✅ verifiziert pukzh.ch 09.03.2026 | `client/src/data/kontakte.ts` | 163   |
| 058 384 65 00 | PUK KIZ (Kriseninterventionszentrum)                    | `client/src/data/kontakte.ts` | 174   |
| 058 384 21 11 | PUK Zentrale                                            | `client/src/data/kontakte.ts` | 238   |
| 058 384 66 00 | PUK Direktion                                           | `client/src/data/kontakte.ts` | 247   |
| 058 384 38 00 | Fachstelle Angehörigenarbeit                            | `client/src/data/kontakte.ts` | 256   |

### Weitere Nummern

| Nummer            | Beschreibung                     | Datei                                                        | Zeile |
| ----------------- | -------------------------------- | ------------------------------------------------------------ | ----- |
| 0848 35 45 55     | Elternnotruf                     | `client/src/data/kontakte.ts`                                | 212   |
| 044 240 48 68     | VASK Zürich                      | `client/src/pages/Selbsthilfegruppen.tsx`                    | 287   |
| ~~044 384 26 00~~ | ~~korrigiert auf 058 384 38 00~~ | `client/src/components/interactive/SelbstfuersorgeCheck.tsx` | 139   |

---

## E-Mail-Adressen

| E-Mail                      | Beschreibung                 | Datei                                     | Zeile   |
| --------------------------- | ---------------------------- | ----------------------------------------- | ------- |
| angehoerigenarbeit@pukzh.ch | Fachstelle Angehörigenarbeit | `client/src/data/kontakte.ts`             | 296     |
| kjpp.ambizh@pukzh.ch        | KJP Ambulatorium             | `client/src/data/kontakte.ts`             | 303     |
| klinik.hard@pukzh.ch        | Klinik Hard                  | `client/src/data/kontakte.ts`             | 310     |
| info@vaskzuerich.ch         | VASK Zürich                  | `client/src/pages/Selbsthilfegruppen.tsx` | 301–303 |

---

## Physische Adressen

| Adresse                      | Beschreibung                        | Datei                                     | Zeile   |
| ---------------------------- | ----------------------------------- | ----------------------------------------- | ------- |
| Lenggstrasse 31, 8032 Zürich | PUK / Fachstelle Angehörigenarbeit  | `client/src/data/kontakte.ts`             | 322     |
| Lenggstrasse 31, 8032 Zürich | (auch auf Fachstelle-Seite)         | `client/src/pages/Fachstelle.tsx`         | 140–142 |
| Lenggstrasse 31, 8032 Zürich | (auch auf Selbsthilfegruppen-Seite) | `client/src/pages/Selbsthilfegruppen.tsx` | 126–127 |
| Langstrasse 149, 8004 Zürich | VASK Zürich                         | `client/src/pages/Selbsthilfegruppen.tsx` | 294–295 |

---

## Externe Websites (nicht manuscdn)

| URL                         | Beschreibung                 | Datei                                     | Zeile   |
| --------------------------- | ---------------------------- | ----------------------------------------- | ------- |
| stand-by-you.ch             | Stand by You                 | `client/src/data/kontakte.ts`             | 333     |
| selbsthilfeschweiz.ch       | Selbsthilfe Schweiz          | `client/src/data/kontakte.ts`             | 340     |
| promentesana.ch             | Pro Mente Sana               | `client/src/data/kontakte.ts`             | 346     |
| depressionen.ch             | iFightDepression             | `client/src/data/kontakte.ts`             | 352     |
| clienia.ch/.../a2/          | Clienia Schlössli Station A2 | `client/src/data/kontakte.ts`             | 358     |
| dachverband-dbt.de          | DBT-Therapieangebote         | `client/src/data/kontakte.ts`             | 364     |
| pukzh.ch                    | PUK Zürich                   | `client/src/data/kontakte.ts`             | 370     |
| vaskzuerich.ch              | VASK Zürich                  | `client/src/pages/Selbsthilfegruppen.tsx` | 306     |
| amazon.de/...               | 6 Buchempfehlungen           | `client/src/pages/Buchempfehlungen.tsx`   | 44–187  |
| pubmed.ncbi.nlm.nih.gov/... | 3 Studien-Referenzen         | `client/src/pages/Genesung.tsx`           | 710–728 |

---

## Hinweise

- **PUK-Nummern**: Alle 058 384 xx xx Nummern stammen von der PUK Zürich. Bei Umstrukturierungen können sich diese ändern.
- ~~044 384 26 00~~ → **korrigiert auf 058 384 38 00** in `SelbstfuersorgeCheck.tsx:139` (bestätigt: Fachstelle Angehörigenarbeit PUK Zürich).
- **manuscdn.com-URLs**: Alle Bilder/PDFs liegen auf manuscdn.com CDN. Bei Ablauf dieser URLs sind ALLE Materialien betroffen.
- ~~**Notfallkarte v04**~~: CloudFront-URLs ersetzt → **v05 als lokale HTML-Datei** (`client/public/notfallkarte.html`). Block 2 jetzt mit drei korrekten PUK-Nummern: 058 384 20 00 (18+), 058 384 66 66 (Kinder/Jugendliche), 058 384 46 82 (ab 65). ✅ Erledigt 09.03.2026.
- **058 384 46 82**: ✅ Verifiziert via pukzh.ch am 09.03.2026 als PUK-Nummer für Erwachsene ab 65.
- **044 389 16 82** (auf uzh.ch): Veraltet — pukzh.ch ist massgebend. Nummer kommt in unserem Code nicht vor, kein Handlungsbedarf.
