#!/usr/bin/env python3
"""
render.py — WeasyPrint render with the guards learned the hard way.

Usage:
    python3 render.py <input.html> <output.pdf> [--timeout 90]

Guards baked in:
- Suppresses WeasyPrint's noisy warnings.
- Hard timeout via signal: a hung render (Google-Fonts @import over the
  network, or a CSS-Grid + nested-flex layout) must fail loudly, not hang
  forever. If you hit the timeout, the problem is almost always (a) an
  @import of remote fonts in the HTML, or (b) CSS Grid / nested flex with
  height:100% + flex:1. Fix the HTML per references/weasyprint-invariants.md.
- Does NOT inject a print stylesheet: the landscape handout carries its own
  complete @page + CSS. (That is the opposite of html-to-print-pdf, which
  is for multi-page portrait flow text.)
"""
import sys
import signal
import argparse
import warnings


class RenderTimeout(Exception):
    pass


def _alarm(signum, frame):
    raise RenderTimeout()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("html")
    ap.add_argument("pdf")
    ap.add_argument("--timeout", type=int, default=90)
    args = ap.parse_args()

    warnings.filterwarnings("ignore")

    try:
        from weasyprint import HTML
    except ImportError:
        print("ERROR: weasyprint not installed. Run:")
        print("  pip install weasyprint --break-system-packages -q")
        return 2

    signal.signal(signal.SIGALRM, _alarm)
    signal.alarm(args.timeout)
    try:
        HTML(filename=args.html).write_pdf(args.pdf)
    except RenderTimeout:
        print(f"ERROR: render exceeded {args.timeout}s — WeasyPrint hung.")
        print("Most likely cause in the HTML:")
        print("  1. @import of Google Fonts (remove it, use system fonts)")
        print("  2. CSS Grid or nested flex with height:100% + flex:1")
        print("See references/weasyprint-invariants.md.")
        return 2
    except Exception as e:
        print(f"ERROR during render: {e}")
        return 2
    finally:
        signal.alarm(0)

    import os
    size = os.path.getsize(args.pdf)
    print(f"PDF written: {args.pdf} ({size} bytes)")
    print("Next: run verify_pdf.py BEFORE any visual check or 'fixed' claim.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
