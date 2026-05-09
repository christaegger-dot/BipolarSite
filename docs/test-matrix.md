# Test-Matrix für Geräte- und Browser-Readiness

Diese Matrix definiert, **welche Kombinationen aus Gerät, Browser und Kernpfad** für die Qualitätssicherung der BipolarSite priorisiert werden. Sie verbindet jetzt zwei Ebenen:

- repo-native Automatisierung über Playwright in CI
- gezielte manuelle oder reale Geräte-Freigaben für die letzten risikoreichen Pfade

Ziel ist keine vollständige Marktdeckung, sondern eine belastbare Grundabdeckung für die wichtigsten realen Nutzungssituationen der Website.

## Teststrategie

Die Website ist ein psychoedukatives Hilfesystem mit langen Lesestrecken, Orientierungseinstiegen, Tools und einem besonders sensiblen Notfallpfad. Deshalb richtet sich die Matrix nicht nur nach technischen Engines, sondern auch nach **Nutzungskritikalität**. Priorität haben Geräte und Browser, bei denen kleine Layout-, Fokus- oder Interaktionsprobleme besonders schnell zu Reibung oder Abbruch führen können.

| Priorität | Gerät / Viewport | Browser | Repo-native Abdeckung | Reale Freigabe |
|---|---|---|---|---|
| P1 | iPhone | Safari | angenähert via Playwright WebKit mit `iPhone 13`-Profil | weiterhin empfohlen bei Mobile-/Nav-/Tool-Änderungen |
| P1 | iPhone | Chrome | nicht direkt auf iOS automatisierbar | weiterhin empfohlen bei Mobile-/Nav-/Tool-Änderungen |
| P1 | Desktop | Chrome | voll automatisiert in CI | nur bei konkretem Befund zusätzlich |
| P1 | Desktop | Firefox | voll automatisiert in CI | nur bei konkretem Befund zusätzlich |
| P2 | Android | Chrome | automatisiert in CI via `Pixel 7`-Profil | bei Bedarf stichprobenartig real gegenprüfen |

## Bedeutung der Testtiefe

Die Begriffe „vollständig“ und „stichprobenartig“ sollen im Projekt einheitlich verstanden werden. Nur so bleiben Testläufe über mehrere PRs hinweg vergleichbar.

| Testtiefe | Bedeutung |
|---|---|
| vollständig | alle definierten Kernpfade durchführen und die Pflichtprüfungen aus `docs/qa-checklist.md` bewusst prüfen |
| stichprobenartig | mindestens Startseite, ein Modul, ein Tool und die Notfallseite prüfen |
| angenähert | Browser-Engine und Gerätetyp werden sinnvoll simuliert, ersetzen aber kein echtes Gerät |

## Kernpfade

Die Kernpfade beschreiben die wichtigsten realen Wege durch das System. Sie sind absichtlich funktional formuliert, damit sie auch dann gültig bleiben, wenn einzelne Einstiege oder Textformulierungen im Detail verändert werden.

| Kürzel | Kernpfad | Pfadbeschreibung | Testziel |
|---|---|---|---|
| KP1 | Orientierungspfad | Startseite → `/module/` oder Lernpfad-Bereich → `modul/1/` → nächster Anschlussschritt | prüft linearen Einstieg und Anschlusslogik |
| KP2 | Situativer Einstieg | Startseite → prominenter Einstiegs- oder Orientierungspfad → passende Inhaltsseite → Rückweg | prüft nichtlineare Nutzung |
| KP3 | Tool-Pfad | Startseite oder Modul → Tool unter `/tools/` → zentrale Interaktion oder Sichtprüfung → Rückweg | prüft handlungsorientierte Seitentypen |
| KP4 | Notfall-Pfad | beliebige Standardseite → `/notfall/` → Hilfsoptionen und Telefonnummern → sicherer Rückweg | prüft Krisenzugang und Priorisierung |
| KP5 | Tiefenstruktur-Pfad | längere Modulseite → interner Sprung, TOC oder Abschnittswechsel → Rückweg oder Weiterpfad | prüft Scroll-, Fokus- und Strukturverhalten |

## Aktueller automatisierter Stand

Die repo-native Smoke-Matrix läuft aktuell über diese vier Playwright-Projekte:

| Projekt | Zweck | Priorität |
|---|---|---|
| `desktop-chrome` | Referenz-Desktoppfad | P1 |
| `desktop-firefox` | zusätzlicher Rendering- und Fokuspfad | P1 |
| `mobile-android-chrome` | mobiler Chrome-Pfad mit Android-Profil | P2 |
| `mobile-iphone-safari-approx` | WebKit-basierte iPhone-Safari-Näherung | P1 angenähert |

Damit ist die frühere pauschale Browser-Warnung im Release-Audit nicht mehr nötig. Offen bleibt bewusst nur die reale iPhone-Freigabe für Änderungen mit hohem Mobile-Risiko.

## Pflichtabdeckung je Testumgebung

Nicht jede Umgebung muss gleich viel leisten. Für die P1-Kombinationen ist die volle Kernpfad-Abdeckung Pflicht, sofern die Kombination repo-nativ automatisiert ist. Bei realen iPhone-Freigaben oder P2-Kombinationen genügt ein reduzierter Test, solange keine konkreten Vorfälle oder Regressionen bekannt sind.

| Gerät / Browser | KP1 | KP2 | KP3 | KP4 | KP5 |
|---|---|---|---|---|---|
| iPhone Safari (real) | ja | ja | ja | ja | ja |
| iPhone Chrome (real) | ja | ja | ja | ja | ja |
| Desktop Chrome | ja | ja | ja | ja | ja |
| Desktop Firefox | ja | ja | ja | ja | ja |
| Android Chrome | ja | optional | ja | ja | optional |

## Beobachtungsschwerpunkte je Umgebung

Je nach Kombination gibt es leicht unterschiedliche Risikobereiche. Diese Schwerpunkte helfen, Befunde nicht nur zu sammeln, sondern gezielt zu suchen.

| Gerät / Browser | Beobachtungsschwerpunkte |
|---|---|
| iPhone Safari | Tap-Ziele, Sticky-/Overlay-Verhalten, Umbruch langer Karten, Details-/Summary-Interaktion, Rückweg-Logik |
| iPhone Chrome | gleiche Mobile-Pfade mit Fokus auf bedienbare CTAs, Scrollverhalten und Tool-Interaktionen |
| Desktop Chrome | Referenzlayout, Fokusführung, Lesefluss, sichtbare Regressionen in Karten und CTA-Gruppen |
| Desktop Firefox | Browser-spezifische Layoutabweichungen, Fokusdarstellung, Interaktion mit Navigation und längeren Inhaltsseiten |
| Android Chrome | mobile Breiten, Lesbarkeit, Erreichbarkeit zentraler Aktionen und Notfallzugänge |

## Dokumentation von Findings

Befunde aus der Matrix sollen in einer Form festgehalten werden, die nachträgliche Priorisierung ermöglicht. Für PR #188 genügt eine einfache Textstruktur; ein neues Tracking-System wird ausdrücklich nicht eingeführt.

| Feld | Erwartung |
|---|---|
| Priorität | P1, P2 oder P3 bezogen auf Nutzungsrisiko |
| Gerät / Browser | klar benennen |
| betroffener Kernpfad | KP1 bis KP5 |
| URL oder Seitentyp | konkret notieren |
| Schritt zur Reproduktion | kurz und nachvollziehbar |
| beobachtetes Verhalten | konkret beschreiben |
| erwartetes Verhalten | knapp gegenüberstellen |

## Praktische Anwendung vor dem Merge

Vor einem Merge reicht ein grüner CI-Lauf plus ein kurzer, frischer Testdurchlauf auf einer P1-Umgebung, wenn der PR nur kleine Änderungen enthält. Bei Layout-, Navigations- oder Tool-Änderungen auf mobilen Pfaden soll zusätzlich mindestens ein reales iPhone geprüft werden. In jedem Fall gilt: Die Matrix ergänzt die CI und ersetzt sie nicht.
