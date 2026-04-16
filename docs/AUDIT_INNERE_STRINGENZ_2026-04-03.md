# Audit – Innere Stringenz und Logik der Website

**Datum:** 03.04.2026  
**Scope:** Startseite, `modul/1-8`, `notfall`, zentrale Tools und Übergänge zwischen den Inhaltsräumen  
**Ziel:** Prüfen, ob die Website als zusammenhängendes Hilfesystem logisch, konsistent und nachvollziehbar aufgebaut ist

---

## Executive Summary

Die Website ist insgesamt **inhaltlich stark und in ihrer Grunddramaturgie überzeugend** aufgebaut:

- Sie hat eine klare Kernbewegung von **Verstehen → Selbstwahrnehmung → Beziehung → chronische Belastung → Dilemmata → Handeln → Langstrecke → Ressourcen**.
- Die Module verweisen meist sinnvoll aufeinander.
- Der Notfallbereich ist klar als eigener Krisenraum vom Lernpfad getrennt.
- Tools und PDFs sind überwiegend passend an den Stellen verankert, an denen sie inhaltlich entstehen.

Die wichtigste offene Herausforderung ist nicht inhaltliche Qualität, sondern **Architektur-Klarheit**:

- Die Website verfolgt **mehrere Logiken gleichzeitig**: linearer Lernpfad, situativer Einstieg, Rollen-Einstieg, Tool-Einstieg und Notfallpfad.
- Diese Mehrfachlogik ist grundsätzlich sinnvoll, aber **nicht überall gleich sauber aufeinander abgestimmt**.
- Dadurch entstehen einige Stellen, an denen Nutzer*innen sich fragen könnten:
  - Was ist hier eigentlich der “Hauptweg”?
  - Ist Modul 8 Abschluss, Einstieg oder beides?
  - Warum wird ein neuer Abschnitt oder Fokus angeboten, aber im Inhaltsverzeichnis oder auf der Startseite nicht ganz konsequent mitgeführt?

---

## Stärken

### 1. Starke Grunddramaturgie der Module

Die lineare Modulfolge ist in sich schlüssig:

1. [Modul 1](/Users/christaegger/Downloads/BipolarSite-main/src/modul/1/index.njk) erklärt die Krankheit.
2. [Modul 2](/Users/christaegger/Downloads/BipolarSite-main/src/modul/2/index.njk) verschiebt den Blick auf die Angehörigenbelastung.
3. [Modul 3](/Users/christaegger/Downloads/BipolarSite-main/src/modul/3/index.njk) zeigt die Beziehungsebene.
4. [Modul 4](/Users/christaegger/Downloads/BipolarSite-main/src/modul/4/index.njk) vertieft die Langzeitfolgen.
5. [Modul 5](/Users/christaegger/Downloads/BipolarSite-main/src/modul/5/index.njk) bearbeitet Loyalitäts- und Entscheidungsdilemmata.
6. [Modul 6](/Users/christaegger/Downloads/BipolarSite-main/src/modul/6/index.njk) übersetzt in Handlungslogik.
7. [Modul 7](/Users/christaegger/Downloads/BipolarSite-main/src/modul/7/index.njk) öffnet die Perspektive auf Tragfähigkeit.
8. [Modul 8](/Users/christaegger/Downloads/BipolarSite-main/src/modul/8/index.njk) führt in Hilfesystem und Materialien.

Das ist redaktionell gut gedacht und für ein sensibles Thema bemerkenswert stabil.

### 2. Gute Trennung von Notfall- und Lernlogik

[notfall/index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/notfall/index.njk#L199) macht klar: Hier geht es nicht um lange Reflexion, sondern um die ersten sicheren Schritte. Gleichzeitig verweist die Seite sauber zurück auf [Modul 6](/Users/christaegger/Downloads/BipolarSite-main/src/modul/6/index.njk) und [Modul 8](/Users/christaegger/Downloads/BipolarSite-main/src/modul/8/index.njk), sobald die Akutphase verlassen wird.

### 3. Übergänge zwischen den Modulen sind meistens sauber

Die “Next Module”-Karten in [Modul 1](/Users/christaegger/Downloads/BipolarSite-main/src/modul/1/index.njk#L946), [Modul 2](/Users/christaegger/Downloads/BipolarSite-main/src/modul/2/index.njk#L619), [Modul 3](/Users/christaegger/Downloads/BipolarSite-main/src/modul/3/index.njk#L553), [Modul 4](/Users/christaegger/Downloads/BipolarSite-main/src/modul/4/index.njk#L604), [Modul 5](/Users/christaegger/Downloads/BipolarSite-main/src/modul/5/index.njk#L466), [Modul 6](/Users/christaegger/Downloads/BipolarSite-main/src/modul/6/index.njk#L664) und [Modul 7](/Users/christaegger/Downloads/BipolarSite-main/src/modul/7/index.njk#L584) bilden eine gut nachvollziehbare Leserführung.

---

## Priorisierte Findings

### P1: Die Website hat mehrere gleichzeitige Hauptlogiken, aber keine ganz explizite Meta-Ordnung

- **Dateien:** [index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/index.njk#L602), [index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/index.njk#L671), [index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/index.njk#L716), [index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/index.njk#L796)
- **Befund:** Die Startseite bietet nebeneinander:
  - situative Orientierung (`Wo stehen Sie gerade?`)
  - alternative Einstiege (`Wenn Sie neu hier sind`)
  - Rollen-Einstiege
  - einen linearen Lernpfad
- **Problem:** Jede dieser Ordnungen ist sinnvoll, aber es fehlt eine übergeordnete Erklärung, wie sie zueinander stehen. Die Seite sagt zwar an mehreren Stellen “Sie müssen nicht linear gehen”, aber sie erklärt nicht ganz klar, **welche Logik im Zweifel Vorrang hat**.
- **Risiko:** Nutzer*innen mit hoher Belastung könnten die Fülle eher als zusätzliche Sortieraufgabe erleben.
- **Empfehlung:** Auf der Startseite eine kurze Meta-Orientierung ergänzen, z. B.:
  - `Wenn es akut ist: Notfall`
  - `Wenn Sie Orientierung brauchen: Situativer Einstieg`
  - `Wenn Sie systematisch lesen möchten: Lernpfad`

### P1: Modul 8 erfüllt gleichzeitig zwei Rollen, die noch leicht gegeneinander arbeiten

- **Dateien:** [index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/index.njk#L657), [index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/index.njk#L872), [modul/8/index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/modul/8/index.njk#L174)
- **Befund:** Modul 8 wird auf der Startseite sowohl als **früher Hilfe-Einstieg** als auch als **letztes Modul im Lernpfad** positioniert. Im Modul selbst wird es als “Anschlussseite” beschrieben.
- **Problem:** Diese Doppelrolle ist verständlich, aber sie erzeugt eine leichte Spannnung:
  - Im Lernpfad ist Modul 8 der Abschluss.
  - In der situativen Logik ist es oft ein Sofort-Einstieg.
- **Risiko:** Nicht gravierend, aber die inhaltliche Funktion des Moduls bleibt etwas hybrid.
- **Empfehlung:** Modul 8 explizit als `Ressourcenmodul, das sowohl am Ende als auch als Direkteinstieg funktioniert` markieren. Damit wäre die Doppelrolle nicht nur implizit, sondern konzeptionell benannt.

### P2: Die neue Zielgruppen-Erweiterung ist noch nicht vollständig symmetrisch umgesetzt

- **Datei:** [index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/index.njk#L716)
- **Befund:** Die Einleitung sagt, die Website sei auch für “Mutter, Vater, Schwester, Bruder oder erwachsenes Kind” gedacht, aber die Rollen-Karten auf der Startseite decken nur `Partner*in`, `Elternteil` und `Geschwister` explizit ab.
- **Problem:** “Erwachsenes Kind” wird angekündigt, aber nicht als eigener Einstieg sichtbar gemacht.
- **Risiko:** Kleine, aber spürbare Inkonsistenz zwischen Anspruch und sichtbarer Struktur.
- **Empfehlung:** Entweder:
  - vierte Rollenkarte ergänzen, oder
  - die Einleitung sprachlich enger auf die tatsächlich sichtbaren Rollen zuschneiden.

### P2: Der neue Komorbiditäts-/Suchtblock in Modul 6 ist inhaltlich sinnvoll, aber strukturell noch leicht versteckt

- **Datei:** [modul/6/index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/modul/6/index.njk#L325)
- **Befund:** Der Abschnitt `Wenn Sucht oder andere Belastungen mitlaufen` ist fachlich sinnvoll und schließt eine echte Lücke. Er taucht aber nicht im TOC von Modul 6 auf.
- **Problem:** Dadurch bleibt ein relevanter neuer Themenblock in der Seitenarchitektur untergeordnet, obwohl er für manche Nutzer*innen hoch relevant ist.
- **Risiko:** Nutzer*innen entdecken den Abschnitt eher zufällig.
- **Empfehlung:** TOC von Modul 6 um einen Verweis auf `#komorbid` ergänzen oder den Block als deutlicheren Unterpfad kennzeichnen.

### P2: Die Startseite priorisiert situative Einstiege, der lineare Modulverlauf bleibt aber visuell fast gleich stark

- **Datei:** [index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/index.njk#L602)
- **Befund:** Die Startseite enthält mehrere starke Raster nacheinander: Orientierung, Einstiege, Rollen, Tools, Lernpfad.
- **Problem:** Inhaltlich ist das reichhaltig, aber der kognitive Schwerpunkt verteilt sich stark. Es ist nicht ganz eindeutig, welcher Block als primäre Handlungsentscheidung gedacht ist.
- **Empfehlung:** Den `Orientierung`-Block noch klarer als Hauptentscheidung markieren und spätere Raster sprachlich stärker als optional oder ergänzend labeln.

### P3: Einige starke Verweissätze setzen gute Querlogik, aber nicht alle Module arbeiten damit gleich konsequent

- **Dateien:** [modul/4/index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/modul/4/index.njk#L257), [modul/6/index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/modul/6/index.njk#L564), [modul/7/index.njk](/Users/christaegger/Downloads/BipolarSite-main/src/modul/7/index.njk#L441)
- **Befund:** Einige Module benennen sehr gut, wie sie auf frühere Module aufbauen. Andere tun das eher implizit.
- **Problem:** Dadurch ist die Querlogik mal sehr sichtbar, mal eher verborgen.
- **Empfehlung:** Das Pattern `In Modul X ging es um ..., hier geht es um ...` als bewusstes Standardmuster in allen späteren Modulen vereinheitlichen.

---

## Gesamturteil

Die Website ist **inhaltlich und dramaturgisch deutlich stringenter als viele vergleichbare psychoedukative Angebote**. Die Grundlogik funktioniert:

- vom Einordnen
- über die Erfahrung der Angehörigen
- in Beziehungs- und Langzeitfolgen
- bis zu Handlung, Nachsorge und Ressourcen

Die verbleibenden Probleme liegen weniger in Widersprüchen als in **Architektur-Reibung zwischen mehreren gleichzeitig richtigen Ordnungen**.

Kurz gesagt:

- **Die Website hat eine starke innere Logik.**
- **Sie ist nicht unlogisch, sondern an einigen Stellen zu reich an parallelen Logiken.**
- **Der nächste Qualitätssprung liegt weniger im neuen Content als in der noch expliziteren Leserführung.**

---

## Empfohlene nächste Schritte

### 1. Startseite um eine klare Meta-Navigation ergänzen

Ein sehr kurzer Block direkt unter dem Hero könnte reichen:

- `Akut? → Notfall`
- `Unsicher, wo anfangen? → Orientierung`
- `Systematisch lesen? → Lernpfad`

### 2. Modul 8 als Doppelrolle explizit benennen

Zum Beispiel:

> Dieses Modul funktioniert auf zwei Arten: als letzter Schritt im Lernpfad und als direkter Einstieg, wenn Sie vor allem Anlaufstellen und konkrete Unterstützung suchen.

### 3. TOC in Modul 6 um `Komorbidität / Sucht` ergänzen

Der Abschnitt ist zu relevant, um nur “mitzulaufen”.

### 4. Querlogik standardisieren

Für Modul 4–8 jeweils ein kurzer Satz nach dem Einstieg:

- `Was kam davor?`
- `Was ist hier neu?`
- `Was folgt danach?`

---

## Kurzfazit

**Die Website ist logisch, tragfähig und redaktionell bemerkenswert gut gebaut.**  
Der Audit zeigt keine gravierenden inneren Widersprüche, sondern vor allem ein Optimierungsthema:

> Die vielen guten Einstiegs- und Lesewege brauchen noch eine etwas explizitere Oberlogik, damit Nutzer*innen nicht selbst entscheiden müssen, welche der mehreren sinnvollen Ordnungen gerade die richtige ist.
