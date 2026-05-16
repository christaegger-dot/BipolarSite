#!/usr/bin/env python3
"""
verify_pdf.py — Hard overflow check for A4 landscape handouts (one or more pages).

Why this exists: a layout bug (text running past the right page edge) was
mis-diagnosed FOUR times because verification was visual. The rendered preview
deceived the eye. This script removes the eye from the loop: it measures the
real coordinates of every filled box and every word in the produced PDF and
asserts them against the printable page boundary.

Usage:
    python3 verify_pdf.py <pdf> [--margin-mm 14] [--tolerance-mm 0.5]
    python3 verify_pdf.py <pdf> --margin-top-mm 14 --margin-right-mm 14 \
        --margin-bottom-mm 14 --margin-left-mm 14

Exit code 0  -> everything within the printable area. Safe to say "fixed".
Exit code 1  -> overflow detected; prints exactly which element, where, by how much.
Exit code 2  -> could not run (missing dependency / unreadable file).

"Fixed" must never be claimed unless this script returned 0.
"""
import sys
import argparse

PT_PER_MM = 72.0 / 25.4


def mm(pt):
    return pt / PT_PER_MM


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf")
    ap.add_argument("--margin-mm", type=float, default=14.0,
                    help="Uniform page margin in mm. Overridden by the "
                         "side-specific options below if those are given.")
    ap.add_argument("--margin-top-mm", type=float, default=None)
    ap.add_argument("--margin-right-mm", type=float, default=None)
    ap.add_argument("--margin-bottom-mm", type=float, default=None)
    ap.add_argument("--margin-left-mm", type=float, default=None)
    ap.add_argument("--tolerance-mm", type=float, default=0.5,
                    help="Allowed slack in mm before flagging overflow (default 0.5).")
    args = ap.parse_args()

    m_top    = args.margin_top_mm    if args.margin_top_mm    is not None else args.margin_mm
    m_right  = args.margin_right_mm  if args.margin_right_mm  is not None else args.margin_mm
    m_bottom = args.margin_bottom_mm if args.margin_bottom_mm is not None else args.margin_mm
    m_left   = args.margin_left_mm   if args.margin_left_mm   is not None else args.margin_mm

    try:
        import pdfplumber
    except ImportError:
        print("ERROR: pdfplumber not installed. Run:")
        print("  pip install pdfplumber --break-system-packages -q")
        return 2

    try:
        pdf = pdfplumber.open(args.pdf)
    except Exception as e:
        print(f"ERROR: cannot open {args.pdf}: {e}")
        return 2

    problems = []
    info = []

    for pidx, page in enumerate(pdf.pages):
        pw_mm = mm(page.width)
        ph_mm = mm(page.height)
        left_edge = m_left
        right_edge = pw_mm - m_right
        top_edge = m_top
        bottom_edge = ph_mm - m_bottom
        tol = args.tolerance_mm

        info.append(
            f"Page {pidx+1}: {pw_mm:.0f}×{ph_mm:.0f} mm  "
            f"printable x[{left_edge:.0f}..{right_edge:.0f}]  "
            f"y[{top_edge:.0f}..{bottom_edge:.0f}]")

        # --- Filled rectangles (column/background boxes) ---
        for r in page.rects:
            x0, x1 = mm(r["x0"]), mm(r["x1"])
            y0, y1 = mm(r["top"]), mm(r["bottom"])
            w = x1 - x0
            h = y1 - y0
            if w < 8 and h < 8:
                continue  # ignore hairlines / tiny artefacts
            # Ignore full-page background rects (WeasyPrint @page background artefact)
            # A rect is considered a full-page background if it covers ≥95% of page area
            page_area = pw_mm * ph_mm
            rect_area = w * h
            if rect_area >= 0.95 * page_area:
                continue  # full-page background — not a content overflow
            if x1 > right_edge + tol:
                problems.append(
                    f"  [box] right edge x1={x1:.1f}mm exceeds page right "
                    f"{right_edge:.1f}mm by {x1-right_edge:.1f}mm "
                    f"(box x0={x0:.1f} y[{y0:.1f}..{y1:.1f}])")
            if x0 < left_edge - tol:
                problems.append(
                    f"  [box] left edge x0={x0:.1f}mm before page left "
                    f"{left_edge:.1f}mm by {left_edge-x0:.1f}mm")
            if y1 > bottom_edge + tol:
                problems.append(
                    f"  [box] bottom y1={y1:.1f}mm exceeds page bottom "
                    f"{bottom_edge:.1f}mm by {y1-bottom_edge:.1f}mm")
            if y0 < top_edge - tol:
                problems.append(
                    f"  [box] top y0={y0:.1f}mm above page top "
                    f"{top_edge:.1f}mm by {top_edge-y0:.1f}mm "
                    f"(box x[{x0:.1f}..{x1:.1f}])")

        # --- Words (the text itself) ---
        try:
            words = page.extract_words()
        except Exception:
            words = []
        rightmost = None
        for wd in words:
            x1 = mm(wd["x1"])
            x0 = mm(wd["x0"])
            y1 = mm(wd["bottom"])
            y0 = mm(wd["top"])
            if rightmost is None or x1 > rightmost[0]:
                rightmost = (x1, wd["text"])
            if x1 > right_edge + tol:
                problems.append(
                    f"  [word] '{wd['text']}' ends x1={x1:.1f}mm, exceeds "
                    f"page right {right_edge:.1f}mm by {x1-right_edge:.1f}mm")
            if x0 < left_edge - tol:
                problems.append(
                    f"  [word] '{wd['text']}' starts x0={x0:.1f}mm, before "
                    f"page left {left_edge:.1f}mm")
            if y1 > bottom_edge + tol:
                problems.append(
                    f"  [word] '{wd['text']}' bottom y1={y1:.1f}mm, exceeds "
                    f"page bottom {bottom_edge:.1f}mm")
            if y0 < top_edge - tol:
                problems.append(
                    f"  [word] '{wd['text']}' top y0={y0:.1f}mm, above "
                    f"page top {top_edge:.1f}mm by {top_edge-y0:.1f}mm")
        if rightmost:
            info.append(
                f"  rightmost word: '{rightmost[1]}' ends at "
                f"{rightmost[0]:.1f}mm (limit {right_edge:.1f}mm)")

    pdf.close()

    print("\n".join(info))
    print()

    if problems:
        print(f"OVERFLOW DETECTED — {len(problems)} issue(s):")
        # de-duplicate identical lines but keep order
        seen = set()
        for p in problems:
            if p not in seen:
                print(p)
                seen.add(p)
        print()
        print("Do NOT report 'fixed'. Return to the layout (column-width "
              "arithmetic first) and re-run this script until it exits 0.")
        return 1

    print("PASS — all boxes and words within the printable area.")
    print("Safe to proceed to visual check and to report the measured number.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
