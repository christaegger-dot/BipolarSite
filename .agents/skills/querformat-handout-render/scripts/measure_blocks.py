#!/usr/bin/env python3
"""measure_blocks.py — reale gerenderte Blockhöhen messen, VOR dem Layout.

Warum dieses Skript existiert: Der Skill fordert "erst messen, dann
layouten". Diese Methode wurde einmal ad hoc und FALSCH selbst gebaut —
zweimal in Folge mit unbrauchbarem Ergebnis, weil die Höhenmessung
entweder die volle-Seiten-Geisterfläche mitzählte (Messung "alle rects":
jeder Block schien 182 mm) oder echte Boxen ohne Wörter ignorierte
(Messung "nur words": ein 130-mm-Platzhalter schien 0 mm). Beide
Fehler kosteten je einen ganzen Iterationszyklus.

Die KORREKTE Messung, hier verbindlich codiert:
- Wörter UND echte Boxen (rects) zählen mit,
- ABER rects mit Höhe >= GHOST_MM (volle bedruckbare Höhe) werden als
  Renderer-Geisterfläche ausgeschlossen.

Aufruf:
    python3 measure_blocks.py blocks.json [--width-mm 269] [--ghost-mm 180]

blocks.json: {"BlockName": "<html-fragment>", ...}  (CSS muss inline oder
in einem mitgelieferten <style> im Fragment stecken; siehe --css-file).

Gibt je Block die reale Höhe in mm und die Summe aus. Summe gegen das
182-mm-Budget (symmetrische 14-mm-Ränder) zu halten ist Aufgabe des
Aufrufers — das Skript misst nur, es entscheidet nicht.
"""
import argparse, json, subprocess, sys, os, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))


def render(html, pdf):
    subprocess.run([sys.executable, os.path.join(HERE, "render.py"), html, pdf],
                   capture_output=True)


def block_height_mm(fragment, css, width_mm, ghost_mm):
    import pdfplumber
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(f'<!DOCTYPE html><html><head><meta charset="UTF-8">'
                f'{css}</head><body>'
                f'<div style="width:{width_mm}mm">{fragment}</div>'
                f'</body></html>')
        html = f.name
    pdf = html[:-5] + ".pdf"
    render(html, pdf)
    with pdfplumber.open(pdf) as doc:
        p = doc.pages[0]
        words = p.extract_words()
        # KERNREGEL: echte Boxen ja, Vollhöhen-Geisterfläche nein.
        real_rects = [r for r in p.rects
                      if r["height"] / 72 * 25.4 < ghost_mm]
        ys = [w["bottom"] for w in words] + [r["bottom"] for r in real_rects]
        ts = [w["top"] for w in words] + [r["top"] for r in real_rects]
        if not ys:
            return 0.0
        return (max(ys) - min(ts)) / 72 * 25.4


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("blocks_json")
    ap.add_argument("--width-mm", type=float, default=269.0)
    ap.add_argument("--ghost-mm", type=float, default=180.0,
                    help="rects >= dieser Höhe gelten als Geisterfläche")
    ap.add_argument("--css-file", default=None,
                    help="optionale CSS-Datei, wird als <style> injiziert")
    ap.add_argument("--budget-mm", type=float, default=182.0,
                    help="nur zur Anzeige: Höhenbudget pro Seite")
    a = ap.parse_args()

    blocks = json.load(open(a.blocks_json))
    css = ""
    if a.css_file:
        css = "<style>" + open(a.css_file).read() + "</style>"

    print(f"=== Blockhöhen (real gerendert, Geisterfläche >= "
          f"{a.ghost_mm:.0f}mm ausgeschlossen) ===")
    total = 0.0
    for name, frag in blocks.items():
        h = block_height_mm(frag, css, a.width_mm, a.ghost_mm)
        total += h
        print(f"  {h:7.1f} mm  {name}")
    print("  " + "-" * 7)
    print(f"  {total:7.1f} mm  SUMME (ohne vertikale Abstände)")
    print(f"\nBudget/Seite: {a.budget_mm:.0f} mm "
          f"(symmetrische 14-mm-Ränder).")
    print("Diagramm/Abstände kommen ZUSÄTZLICH — Aufrufer entscheidet "
          "Seitenaufteilung.")
    # Exit-Code 2 als Frühwarnung, wenn schon der reine Text das
    # Einseiten-Budget sprengt (wie real geschehen: 225 > 182).
    sys.exit(2 if total > a.budget_mm else 0)


if __name__ == "__main__":
    main()
