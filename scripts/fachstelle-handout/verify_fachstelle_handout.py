#!/usr/bin/env python3
"""Lightweight gate for Fachstelle handout HTML/PDF files."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path


CRISIS_NUMBERS = (
    "144",
    "117",
    "143",
    "0800 33 66 55",
    "058 384 38 00",
)


class HandoutHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.html_lang = ""
        self.tags: list[str] = []
        self.attrs: list[tuple[str, dict[str, str]]] = []
        self.text_parts: list[str] = []
        self.svg_total = 0
        self.svg_decorative = 0
        self.svg_informative = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = {k: v or "" for k, v in attrs}
        self.tags.append(tag)
        self.attrs.append((tag, attr))
        if tag == "html":
            self.html_lang = attr.get("lang", "")
        if tag == "svg":
            self.svg_total += 1
            if attr.get("aria-hidden") == "true" and attr.get("focusable") == "false":
                self.svg_decorative += 1
            if attr.get("role") == "img" or attr.get("aria-label"):
                self.svg_informative += 1

    def handle_data(self, data: str) -> None:
        if data.strip():
            self.text_parts.append(data)

    @property
    def text(self) -> str:
        return " ".join(self.text_parts)


def check(condition: bool, ok: str, fail: str, failures: list[str]) -> None:
    if condition:
        print(f"OK  {ok}")
    else:
        print(f"ERR {fail}")
        failures.append(fail)


def run_pdfinfo(pdf: Path) -> str:
    if not shutil.which("pdfinfo"):
        raise RuntimeError("pdfinfo not found; install Poppler to verify PDF size.")
    return subprocess.check_output(["pdfinfo", str(pdf)], text=True, stderr=subprocess.STDOUT)


def page_size_is_a4(info: str, expected: str) -> bool:
    match = re.search(r"Page size:\s+([0-9.]+)\s+x\s+([0-9.]+)\s+pts", info)
    if not match:
        return False
    w, h = (float(match.group(1)), float(match.group(2)))
    if expected == "landscape":
        return abs(w - 841.9) < 3 and abs(h - 595.3) < 3
    return abs(w - 595.3) < 3 and abs(h - 841.9) < 3


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("html", type=Path, help="HTML handout to verify")
    parser.add_argument("--pdf", type=Path, help="Optional rendered PDF to verify")
    parser.add_argument("--type", choices=["orientierung", "praxis", "krise"], default="orientierung")
    parser.add_argument("--orientation", choices=["landscape", "portrait"], default="landscape")
    parser.add_argument("--allow-untagged-pdf", action="store_true", help="Warn instead of failing when pdfinfo reports Tagged: no.")
    parser.add_argument("--allow-template-placeholders", action="store_true", help="Allow starter-template placeholder text such as Handout Titel or Kernquelle 1.")
    args = parser.parse_args()

    html = args.html.read_text(encoding="utf-8")
    parsed = HandoutHTMLParser()
    parsed.feed(html)
    attrs = parsed.attrs
    tags = set(parsed.tags)
    failures: list[str] = []

    check(parsed.html_lang == "de", "html lang is de", "html lang=\"de\" missing", failures)
    for tag in ("main", "article", "header", "section", "footer"):
        check(tag in tags, f"{tag} present", f"{tag} missing", failures)

    check("@page" in html, "@page rule present", "@page rule missing", failures)
    expected_page = "A4 landscape" if args.orientation == "landscape" else "A4 portrait"
    check(expected_page in html, f"{expected_page} declared", f"{expected_page} not declared", failures)
    check("background: #fff" in html or "background:#fff" in html, "white print background declared", "white print background missing", failures)
    check("print-color-adjust" in html, "print-color-adjust present", "print-color-adjust missing", failures)
    check("data-om-id" not in html, "no data-om-id attributes", "data-om-id attributes found", failures)

    has_14mm_margin = bool(
        (
            re.search(r"--margin-x\s*:\s*14mm", html)
            and re.search(r"--margin-y\s*:\s*14mm", html)
        )
        or re.search(r"padding\s*:\s*14mm(?:\s+14mm){0,3}\s*;", html)
    )
    old_asymmetric_margin = bool(
        re.search(r"--margin-x\s*:\s*15mm", html)
        or re.search(r"--margin-y\s*:\s*12mm", html)
        or re.search(r"padding\s*:\s*var\(--margin-y\)\s+var\(--margin-x\)\s+9mm", html)
    )
    check(
        has_14mm_margin and not old_asymmetric_margin,
        "14mm symmetric margin norm declared",
        "14mm symmetric margin norm missing or old asymmetric margins found",
        failures,
    )

    inline_style_count = len(re.findall(r"\sstyle=", html))
    check(inline_style_count <= 10, f"inline styles acceptable ({inline_style_count})", f"too many inline styles ({inline_style_count})", failures)

    full_tint = re.search(r"\b(body|html|\.print-page|\.handout)\s*{[^}]*background\s*:\s*#(?:fffdf9|faf8f5|f4f1ec|f6f0e7)", html, re.I | re.S)
    check(not full_tint, "no tinted full-page background", "tinted full-page background found", failures)

    if parsed.svg_total:
        check(
            parsed.svg_total == parsed.svg_decorative + parsed.svg_informative,
            "SVGs have decorative or informative semantics",
            "some SVGs lack aria-hidden or role/img labelling",
            failures,
        )

    has_visual = bool(re.search(r"visual|diagram|metaphor|metapher|role=\"img\"|<svg", html, re.I))
    check(has_visual, "visual anchor likely present", "no visual anchor detected", failures)

    has_next_action_slot = bool(re.search(r'data-required=["\']next-action["\']', html, re.I))
    has_next_action_text = bool(re.search(r"konkreter nächster schritt|konkreter naechster schritt|konkret tun|vorbereiten|vereinbaren", parsed.text, re.I))
    check(
        has_next_action_slot and has_next_action_text,
        "mandatory next-action slot present",
        "mandatory next-action slot missing",
        failures,
    )

    has_relief_statement = bool(re.search(r"entlastend|schuldentlast|nicht,\s*dass jemand versagt|versagt hat|gescheitert", parsed.text, re.I))
    check(
        has_relief_statement,
        "relief statement present",
        "relief statement missing",
        failures,
    )

    placeholder_patterns = (
        r"\bHandout Titel\b",
        r"\bhandout-slug\b",
        r"\bKernquelle\s+\d\b",
        r"\bLeitlinie oder\b",
        r"\bEin erster konkret beobachtbarer Punkt\b",
        r"\bEin zweiter Punkt\b",
        r"\bEin dritter Punkt\b",
        r"\bHier steht der kurze Textkern\b",
    )
    placeholders = [p for p in placeholder_patterns if re.search(p, parsed.text, re.I)]
    if placeholders and args.allow_template_placeholders:
        print(f"WARN template placeholders present ({len(placeholders)}); acceptable only for the starter template")
    else:
        check(
            not placeholders,
            "no starter-template placeholders in visible text",
            f"starter-template placeholders found ({len(placeholders)})",
            failures,
        )

    if args.type in ("orientierung", "praxis"):
        normalized_text = re.sub(r"\s+", " ", parsed.text)
        found_crisis = [n for n in CRISIS_NUMBERS if n in normalized_text]
        check(not found_crisis, "no crisis numbers in visible text", f"crisis numbers found: {', '.join(found_crisis)}", failures)
        forbidden = re.search(r"weiterführend|weiterfuehrend|anlaufstellen|ressourcen", normalized_text, re.I)
        check(not forbidden, "no standalone-breaking footer cross-reference", "standalone-breaking cross-reference found", failures)

    if args.pdf:
        info = run_pdfinfo(args.pdf)
        check("Pages:" in info and re.search(r"Pages:\s+1\b", info) is not None, "PDF has one page", "PDF page count is not one", failures)
        check(page_size_is_a4(info, args.orientation), "PDF page size is expected A4 orientation", "PDF page size/orientation is wrong", failures)
        if "Tagged:" in info:
            tagged = "Tagged:          yes" in info
            if tagged:
                print("OK  PDF is tagged")
            elif args.allow_untagged_pdf:
                print("WARN PDF is not tagged; acceptable only for early layout drafts, not final release")
            else:
                check(False, "PDF is tagged", "PDF is not tagged (PDF/UA blocker)", failures)

    if failures:
        print("\nFAILED")
        return 1
    print("\nPASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
