#!/usr/bin/env python3
"""verify_handout.py — eine zentrale Prüfkette statt verstreuter Snippets.

Warum dieses Skript existiert: Der Skill verlangte Seitenzahl-,
Seitenzuordnungs-, Pflichtinhalte- und Überlauf-Prüfung — aber als vier
einzeln zu tippende Snippets. Verteilte Pflichtprüfungen werden unter
Druck unvollständig ausgeführt; genau so blieb einmal die Seitenzahl
ungeprüft, während das Mess-Gate fälschlich Entwarnung gab. Dieses
Skript macht die ganze Kette zu EINEM Aufruf mit hartem Exit-Code.

Aufruf (Beispiel Zweiseiter):
    python3 verify_handout.py out.pdf \
      --expected-pages 2 \
      --margin-top-mm 14 --margin-right-mm 14 \
      --margin-bottom-mm 14 --margin-left-mm 14 \
      --page1-must "Belastung verstehen" \
      --page1-must "Schleichendes Muster" \
      --page1-must-not "doi:" \
      --page2-must "Was jetzt helfen kann" \
      --page2-must "Merksatz" \
      --page2-must "10.3390/healthcare10122423"

Exit-Code 0 nur, wenn ALLE Stufen bestehen. Sonst 1, mit Angabe welche
Stufe und warum. Stufen, in dieser Reihenfolge:
  1. Seitenzahl == expected-pages         (eigene Stufe, zuerst)
  2. Seitenzuordnung pageN-must/-must-not (richtiger Block, richtige Seite)
  3. Mess-Gate (delegiert an verify_pdf.py, inkl. Top-Overflow)
"""
import argparse, subprocess, sys, os, collections

HERE = os.path.dirname(os.path.abspath(__file__))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf")
    ap.add_argument("--expected-pages", type=int, required=True)
    ap.add_argument("--margin-top-mm", type=float, default=14.0)
    ap.add_argument("--margin-right-mm", type=float, default=14.0)
    ap.add_argument("--margin-bottom-mm", type=float, default=14.0)
    ap.add_argument("--margin-left-mm", type=float, default=14.0)
    # je Seite wiederholbar: --pageN-must / --pageN-must-not
    for n in (1, 2, 3):
        ap.add_argument(f"--page{n}-must", action="append", default=[])
        ap.add_argument(f"--page{n}-must-not", action="append", default=[])
    a = ap.parse_args()

    import pdfplumber
    fails = []

    with pdfplumber.open(a.pdf) as doc:
        n = len(doc.pages)
        # --- Stufe 1: Seitenzahl ---
        if n != a.expected_pages:
            fails.append(f"SEITENZAHL: {n}, erwartet {a.expected_pages}")
        # --- Stufe 2: Seitenzuordnung ---
        page_text = []
        for p in doc.pages:
            page_text.append(p.extract_text() or "")
        for idx in (1, 2, 3):
            must = getattr(a, f"page{idx}_must")
            mustnot = getattr(a, f"page{idx}_must_not")
            if idx - 1 >= len(page_text):
                if must:
                    fails.append(f"Seite {idx} fehlt, aber "
                                 f"{len(must)} must-Begriffe gefordert")
                continue
            t = page_text[idx - 1]
            for kw in must:
                if kw not in t:
                    fails.append(f"Seite {idx} MUSS enthalten, fehlt: {kw!r}")
            for kw in mustnot:
                if kw in t:
                    fails.append(f"Seite {idx} darf NICHT enthalten, "
                                 f"steht aber drin: {kw!r}")

    # --- Stufe 3: Mess-Gate delegieren (inkl. Top-Overflow) ---
    r = subprocess.run(
        [sys.executable, os.path.join(HERE, "verify_pdf.py"), a.pdf,
         "--margin-top-mm", str(a.margin_top_mm),
         "--margin-right-mm", str(a.margin_right_mm),
         "--margin-bottom-mm", str(a.margin_bottom_mm),
         "--margin-left-mm", str(a.margin_left_mm)],
        capture_output=True, text=True)
    if r.returncode != 0:
        fails.append("MESS-GATE (verify_pdf.py) meldete Überlauf:\n"
                     + (r.stdout or "") + (r.stderr or ""))

    print("=== verify_handout.py ===")
    if not fails:
        print(f"PASS — {a.expected_pages} Seite(n), Zuordnung korrekt, "
              f"kein Überlauf.")
        sys.exit(0)
    print("FAIL — folgende Stufen nicht bestanden:")
    for f in fails:
        print("  - " + f)
    sys.exit(1)


if __name__ == "__main__":
    main()
