#!/usr/bin/env python3
"""
Generate text-based PDF handouts from Markdown drafts.

Usage:
    python scripts/generate-handout-pdf.py [slug]

    Without slug: generates all handouts in src/handout-drafts/
    With slug: generates only that handout (e.g. "c2_suizidgedanken")

Output: src/handouts/{slug}.pdf

Design tokens match the website's "warm-editorial" palette.
Fonts: DM Sans (body) + DM Serif Display (headings).
"""

import os
import sys
import re
import yaml
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, KeepTogether, ListFlowable, ListItem
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Paths ──────────────────────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DRAFTS_DIR = PROJECT_ROOT / "src" / "handout-drafts"
OUTPUT_DIR = PROJECT_ROOT / "src" / "handouts"
FONT_DIR = Path("/tmp/fonts_ttf")

# ── Register Fonts ─────────────────────────────────────────────────────
pdfmetrics.registerFont(TTFont("DMSans", str(FONT_DIR / "dm-sans-variable.ttf")))
pdfmetrics.registerFont(TTFont("DMSerif", str(FONT_DIR / "dm-serif-display-400.ttf")))

# ── Design Tokens (matching handout-draft.njk print tokens) ───────────
NAVY    = HexColor("#7a6f66")
TEAL    = HexColor("#3a9aa3")
TEAL_SOFT = HexColor("#d9ecec")
WARM    = HexColor("#fcf8f4")
SAND    = HexColor("#ddd2bf")
ALERT   = HexColor("#9a3412")
TEXT_C  = HexColor("#2d2823")
MUTED   = HexColor("#5c5a56")
LINE    = HexColor("#d6d0c8")
PAPER   = HexColor("#fffdf9")
WHITE   = HexColor("#ffffff")

PAGE_W, PAGE_H = A4
MARGIN_L = 22 * mm
MARGIN_R = 22 * mm
MARGIN_T = 18 * mm
MARGIN_B = 16 * mm

# ── Paragraph Styles ──────────────────────────────────────────────────
styles = {}

styles["h1"] = ParagraphStyle(
    "H1", fontName="DMSerif", fontSize=19, leading=24,
    textColor=NAVY, spaceAfter=6 * mm, spaceBefore=0,
)
styles["h2"] = ParagraphStyle(
    "H2", fontName="DMSerif", fontSize=13, leading=17,
    textColor=NAVY, spaceAfter=3 * mm, spaceBefore=6 * mm,
)
styles["body"] = ParagraphStyle(
    "Body", fontName="DMSans", fontSize=9.5, leading=14.5,
    textColor=TEXT_C, spaceAfter=2.5 * mm,
)
styles["body_bold"] = ParagraphStyle(
    "BodyBold", parent=styles["body"], fontName="DMSans",
)
styles["bullet"] = ParagraphStyle(
    "Bullet", fontName="DMSans", fontSize=9.5, leading=14,
    textColor=TEXT_C, leftIndent=5 * mm, bulletIndent=0,
    spaceAfter=1.2 * mm,
)
styles["sub_bullet"] = ParagraphStyle(
    "SubBullet", fontName="DMSans", fontSize=9, leading=13,
    textColor=MUTED, leftIndent=10 * mm, bulletIndent=5 * mm,
    spaceAfter=1 * mm,
)
styles["emergency_num"] = ParagraphStyle(
    "EmNum", fontName="DMSans", fontSize=11, leading=14,
    textColor=ALERT, spaceAfter=0,
)
styles["emergency_label"] = ParagraphStyle(
    "EmLabel", fontName="DMSans", fontSize=8, leading=11,
    textColor=MUTED, spaceAfter=0,
)
styles["footer"] = ParagraphStyle(
    "Footer", fontName="DMSans", fontSize=7.5, leading=10,
    textColor=MUTED, alignment=TA_CENTER,
)
styles["quick_step"] = ParagraphStyle(
    "QuickStep", fontName="DMSans", fontSize=9, leading=13,
    textColor=TEXT_C,
)
styles["callout"] = ParagraphStyle(
    "Callout", fontName="DMSans", fontSize=9.5, leading=14,
    textColor=ALERT, spaceAfter=2 * mm,
)
styles["italic"] = ParagraphStyle(
    "Italic", fontName="DMSans", fontSize=9.5, leading=14.5,
    textColor=MUTED, spaceAfter=2.5 * mm,
)
styles["link"] = ParagraphStyle(
    "Link", fontName="DMSans", fontSize=8.5, leading=12,
    textColor=TEAL, spaceAfter=1.5 * mm,
)


# ── Parse Markdown with Frontmatter ───────────────────────────────────
def parse_draft(path: Path):
    """Parse a markdown file with YAML frontmatter."""
    content = path.read_text(encoding="utf-8")

    # Split frontmatter
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            meta = yaml.safe_load(parts[1])
            body = parts[2].strip()
        else:
            meta = {}
            body = content
    else:
        meta = {}
        body = content

    return meta, body


def md_inline(text):
    """Convert inline markdown to reportlab XML."""
    # Bold
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    # Italic
    text = re.sub(r'\*(.+?)\*', r'<i>\1</i>', text)
    # Links - strip to text only for PDF
    text = re.sub(r'\[(.+?)\]\((.+?)\)', r'\1', text)
    # Escape XML entities that aren't already tags
    # (reportlab uses XML-like markup)
    return text


# ── Build PDF ─────────────────────────────────────────────────────────
def build_pdf(meta, body, output_path: Path):
    """Generate a PDF from parsed markdown content."""

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title=meta.get("title", "Handout"),
        author="PUK Zürich — Fachstelle Angehörigenarbeit",
        subject=meta.get("goal", ""),
    )

    story = []
    content_width = PAGE_W - MARGIN_L - MARGIN_R

    # ── Header: Type badge + Title ──
    handout_type = meta.get("type", "Handout")
    story.append(Paragraph(
        f'<font color="#{TEAL.hexval()[2:]}" size="8">{handout_type.upper()}</font>',
        styles["body"]
    ))
    story.append(Spacer(1, 1 * mm))

    title = meta.get("title", "Handout")
    story.append(Paragraph(title, styles["h1"]))

    # ── Emergency Strip ──
    if meta.get("emergency_callout"):
        # Build emergency box as a table
        emergency_data = [[
            Paragraph(
                f'<b>{meta.get("emergency_label", "Notfall")}</b>',
                ParagraphStyle("el", fontName="DMSans", fontSize=8, textColor=ALERT, leading=11)
            ),
            Paragraph(
                md_inline(meta["emergency_callout"]),
                ParagraphStyle("ec", fontName="DMSans", fontSize=9.5, textColor=ALERT, leading=13)
            ),
        ]]

        emergency_table = Table(emergency_data, colWidths=[35 * mm, content_width - 35 * mm])
        emergency_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), HexColor("#fef2f2")),
            ("BOX", (0, 0), (-1, -1), 0.5, HexColor("#e8c4b8")),
            ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
            ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]))
        story.append(emergency_table)
        story.append(Spacer(1, 4 * mm))

    # ── Quick Steps ──
    quick_steps = meta.get("quick_steps", [])
    if quick_steps:
        step_data = []
        for step in quick_steps:
            icon = step.get("icon", "•")
            text = step.get("text", "")
            step_data.append([
                Paragraph(
                    f'<font color="#{TEAL.hexval()[2:]}" size="11"><b>{icon}</b></font>',
                    ParagraphStyle("si", fontName="DMSans", fontSize=11, alignment=TA_CENTER, leading=14)
                ),
                Paragraph(md_inline(text), styles["quick_step"]),
            ])

        step_table = Table(step_data, colWidths=[12 * mm, content_width - 12 * mm])
        step_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), TEAL_SOFT),
            ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
            ("LEFTPADDING", (0, 0), (0, -1), 3 * mm),
            ("LEFTPADDING", (1, 0), (1, -1), 2 * mm),
            ("RIGHTPADDING", (-1, 0), (-1, -1), 3 * mm),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LINEBELOW", (0, 0), (-1, -2), 0.3, HexColor("#b8d8d8")),
        ]))
        story.append(step_table)
        story.append(Spacer(1, 4 * mm))

    # Divider
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE, spaceAfter=3 * mm))

    # ── Body Content ──
    lines = body.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()

        # H1 (skip — already rendered from frontmatter)
        if line.startswith("# ") and not line.startswith("## "):
            i += 1
            continue

        # H2
        if line.startswith("## "):
            heading = line[3:].strip()
            story.append(Paragraph(md_inline(heading), styles["h2"]))
            i += 1
            continue

        # Horizontal rule
        if line.strip() == "---":
            story.append(Spacer(1, 2 * mm))
            story.append(HRFlowable(width="100%", thickness=0.3, color=LINE, spaceAfter=2 * mm))
            i += 1
            continue

        # Bullet list
        if line.startswith("- "):
            bullet_text = line[2:].strip()
            # Check for sub-bullets
            sub_items = []
            j = i + 1
            while j < len(lines) and lines[j].startswith("  - "):
                sub_items.append(lines[j].strip()[2:])
                j += 1

            story.append(Paragraph(
                f'<bullet>&bull;</bullet>{md_inline(bullet_text)}',
                styles["bullet"]
            ))

            for sub in sub_items:
                story.append(Paragraph(
                    f'<bullet>–</bullet>{md_inline(sub)}',
                    styles["sub_bullet"]
                ))

            i = j
            continue

        # Empty line
        if not line.strip():
            i += 1
            continue

        # Italic paragraph (starts with *)
        if line.startswith("*") and line.endswith("*") and not line.startswith("**"):
            inner = line.strip("*").strip()
            story.append(Paragraph(f'<i>{md_inline(inner)}</i>', styles["italic"]))
            i += 1
            continue

        # Regular paragraph
        para_lines = [line]
        j = i + 1
        while j < len(lines) and lines[j].strip() and not lines[j].startswith("#") and not lines[j].startswith("- ") and not lines[j].startswith("*") and lines[j].strip() != "---":
            para_lines.append(lines[j].rstrip())
            j += 1

        text = " ".join(para_lines)
        story.append(Paragraph(md_inline(text), styles["body"]))
        i = j

    # ── Emergency Contacts Footer ──
    contacts = meta.get("emergency_contacts", [])
    if contacts:
        story.append(Spacer(1, 3 * mm))
        story.append(HRFlowable(width="100%", thickness=0.5, color=LINE, spaceAfter=3 * mm))

        contact_data = []
        for c in contacts:
            tone = c.get("tone", "")
            num_color = ALERT if tone == "urgent" else TEAL
            contact_data.append([
                Paragraph(
                    f'<font color="#{num_color.hexval()[2:]}"><b>{c["number"]}</b></font>',
                    ParagraphStyle("cn", fontName="DMSans", fontSize=10, leading=13)
                ),
                Paragraph(
                    f'<b>{c["label"]}</b><br/><font size="7.5" color="#{MUTED.hexval()[2:]}">{c.get("note", "")}</font>',
                    ParagraphStyle("cl", fontName="DMSans", fontSize=8.5, leading=12, textColor=TEXT_C)
                ),
            ])

        col_w = content_width / len(contact_data)
        # Transpose to single row
        row = [item for pair in contact_data for item in [pair]]
        contact_table = Table(contact_data, colWidths=[30 * mm, content_width - 30 * mm])
        contact_table.setStyle(TableStyle([
            ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("LINEBELOW", (0, 0), (-1, -2), 0.3, LINE),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ]))
        story.append(contact_table)

    # ── Footer ──
    story.append(Spacer(1, 4 * mm))
    org = "PUK Zürich · Fachstelle Angehörigenarbeit"
    url = "bipolarsite.netlify.app"
    story.append(Paragraph(
        f'{org} · {url}',
        styles["footer"]
    ))

    # Build
    doc.build(story)
    return output_path


# ── Main ──────────────────────────────────────────────────────────────
def main():
    target_slug = sys.argv[1] if len(sys.argv) > 1 else None

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    md_files = sorted(DRAFTS_DIR.glob("*.md"))
    if not md_files:
        print("No markdown drafts found.")
        return

    for md_path in md_files:
        slug = md_path.stem
        if slug == "index":
            continue
        if target_slug and slug != target_slug:
            continue

        meta, body = parse_draft(md_path)
        if not body.strip():
            print(f"  SKIP {slug} (empty body)")
            continue

        output = OUTPUT_DIR / f"{slug}.pdf"
        build_pdf(meta, body, output)

        size_kb = output.stat().st_size / 1024
        print(f"  OK   {slug}.pdf  ({size_kb:.0f} KB)")


if __name__ == "__main__":
    main()
