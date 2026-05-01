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

import re
import sys
from datetime import datetime
from pathlib import Path

import yaml
from fontTools.ttLib import TTFont as FontToolsTTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

# ── Paths ──────────────────────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DRAFTS_DIR = PROJECT_ROOT / "src" / "handout-drafts"
OUTPUT_DIR = PROJECT_ROOT / "src" / "handouts"
FONT_DIR = Path("/tmp/fonts_ttf")
WEBFONT_DIR = PROJECT_ROOT / "src" / "fonts"

# ── Font bootstrap ─────────────────────────────────────────────────────
def ensure_pdf_fonts():
    """Create local TTFs from repo webfonts when the temp cache is empty."""
    FONT_DIR.mkdir(parents=True, exist_ok=True)

    font_map = {
        "dm-sans-variable.ttf": WEBFONT_DIR / "dm-sans-variable.woff2",
        "dm-serif-display-400.ttf": WEBFONT_DIR / "dm-serif-display-400.woff2",
    }

    for target_name, source_path in font_map.items():
        target_path = FONT_DIR / target_name
        if target_path.exists():
            continue
        if not source_path.exists():
            raise FileNotFoundError(f"Missing source webfont: {source_path}")

        font = FontToolsTTFont(str(source_path))
        font.flavor = None
        font.save(str(target_path))

    return {
        "DMSans": FONT_DIR / "dm-sans-variable.ttf",
        "DMSerif": FONT_DIR / "dm-serif-display-400.ttf",
    }


PDF_FONT_PATHS = ensure_pdf_fonts()

# ── Register Fonts ─────────────────────────────────────────────────────
pdfmetrics.registerFont(TTFont("DMSans", str(PDF_FONT_PATHS["DMSans"])))
pdfmetrics.registerFont(TTFont("DMSerif", str(PDF_FONT_PATHS["DMSerif"])))

# Glyphs available in DM Sans — used to decide whether an icon renders
# or needs to fall back to a safe numeric marker. Avoids "tofu" squares
# for emoji/unusual unicode in quick-step icons.
_DM_SANS_CMAP = None


def _icon_renderable(icon: str) -> bool:
    """Return True if every codepoint of `icon` is present in DM Sans."""
    global _DM_SANS_CMAP
    if _DM_SANS_CMAP is None:
        _DM_SANS_CMAP = FontToolsTTFont(str(PDF_FONT_PATHS["DMSans"])).getBestCmap()
    # Ignore variation selectors (U+FE0E/FE0F) — they don't need a glyph
    return all(
        ord(ch) in _DM_SANS_CMAP or 0xFE00 <= ord(ch) <= 0xFE0F
        for ch in icon
    )

# ── Design Tokens (matching handout-draft.njk print tokens) ───────────
NAVY = HexColor("#7a6f66")
TEAL = HexColor("#3a9aa3")
TEAL_SOFT = HexColor("#d9ecec")
ALERT = HexColor("#9a3412")
TEXT_C = HexColor("#2d2823")
MUTED = HexColor("#5c5a56")
LINE = HexColor("#d6d0c8")

PAGE_W, PAGE_H = A4
MARGIN_L = 22 * mm
MARGIN_R = 22 * mm
MARGIN_T = 18 * mm
MARGIN_B = 12 * mm

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
styles["footer"] = ParagraphStyle(
    "Footer", fontName="DMSans", fontSize=7, leading=8.5,
    textColor=MUTED, alignment=TA_CENTER,
)
styles["quick_step"] = ParagraphStyle(
    "QuickStep", fontName="DMSans", fontSize=9, leading=13,
    textColor=TEXT_C,
)
styles["italic"] = ParagraphStyle(
    "Italic", fontName="DMSans", fontSize=9.5, leading=14.5,
    textColor=MUTED, spaceAfter=2.5 * mm,
)
styles["help_title"] = ParagraphStyle(
    "HelpTitle", fontName="DMSans", fontSize=8.5, leading=11,
    textColor=MUTED, spaceAfter=1.2 * mm,
)
styles["help_note"] = ParagraphStyle(
    "HelpNote", fontName="DMSans", fontSize=8.3, leading=11.5,
    textColor=MUTED, spaceAfter=2.5 * mm,
)


# ── Parse Markdown with Frontmatter ───────────────────────────────────
def parse_draft(path: Path):
    """Parse a markdown file with YAML frontmatter."""
    content = path.read_text(encoding="utf-8")

    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            meta = yaml.safe_load(parts[1]) or {}
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
    text = "" if text is None else str(text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    text = re.sub(r'\*(.+?)\*', r'<i>\1</i>', text)
    text = re.sub(r'\[(.+?)\]\((.+?)\)', r'\1', text)
    return text


def format_swiss_date(value):
    """Format yyyy-mm-dd as dd.mm.yyyy for footer usage."""
    if not value:
        return None
    try:
        return datetime.strptime(str(value), "%Y-%m-%d").strftime("%d.%m.%Y")
    except ValueError:
        return str(value)


def normalize_help_module(meta):
    """Return a normalized help module or None when disabled / absent."""
    help_module = meta.get("help_module")
    if not isinstance(help_module, dict):
        return None
    if help_module.get("enabled", True) is False:
        return None

    raw_items = help_module.get("items", [])
    if not isinstance(raw_items, list):
        return None

    items = []
    for raw in raw_items:
        if not isinstance(raw, dict):
            continue
        label = str(raw.get("label", "") or "").strip()
        value = str(raw.get("number", raw.get("text", "")) or "").strip()
        note = str(raw.get("note", "") or "").strip()
        tone = str(raw.get("tone", "") or "").strip()
        if not (label or value or note):
            continue
        items.append({
            "label": label,
            "value": value,
            "note": note,
            "tone": tone,
        })

    if not items:
        return None

    return {
        "title": str(help_module.get("title", "Hilfe") or "Hilfe").strip(),
        "note": str(help_module.get("note", "") or "").strip(),
        "items": items,
    }


def build_help_module_flowables(help_module, content_width):
    """Create flowables for the optional help module."""
    flowables = [Spacer(1, 1.5 * mm)]
    flowables.append(HRFlowable(width="100%", thickness=0.5, color=LINE, spaceAfter=3 * mm))
    flowables.append(Paragraph(f'<b>{md_inline(help_module["title"])}</b>', styles["help_title"]))
    if help_module.get("note"):
        flowables.append(Paragraph(md_inline(help_module["note"]), styles["help_note"]))

    item_rows = []
    for item in help_module["items"]:
        tone_color = ALERT if item.get("tone") == "urgent" else TEAL
        value_markup = md_inline(item["value"] or item["label"]) or "–"
        label_markup = md_inline(item["label"] or "")
        note_markup = md_inline(item.get("note") or "")

        if label_markup and note_markup:
            detail_markup = (
                f'<b>{label_markup}</b><br/>'
                f'<font size="7.5" color="#{MUTED.hexval()[2:]}">{note_markup}</font>'
            )
        elif label_markup:
            detail_markup = f'<b>{label_markup}</b>'
        elif note_markup:
            detail_markup = f'<font size="7.5" color="#{MUTED.hexval()[2:]}">{note_markup}</font>'
        else:
            detail_markup = ""

        item_rows.append([
            Paragraph(
                f'<font color="#{tone_color.hexval()[2:]}"><b>{value_markup}</b></font>',
                ParagraphStyle("hv", fontName="DMSans", fontSize=10, leading=13),
            ),
            Paragraph(
                detail_markup,
                ParagraphStyle("hl", fontName="DMSans", fontSize=8.5, leading=12, textColor=TEXT_C),
            ),
        ])

    help_table = Table(item_rows, colWidths=[30 * mm, content_width - 30 * mm])
    help_table.setStyle(TableStyle([
        ("TOPPADDING", (0, 0), (-1, -1), 1.8 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.8 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, LINE),
    ]))
    flowables.append(help_table)
    return flowables


def build_footer_line(meta):
    """Return a professional footer line without contact content."""
    parts = ["PUK Zürich · Fachstelle Angehörigenarbeit"]
    formatted_date = format_swiss_date(meta.get("last_updated"))
    if formatted_date:
        parts.append(f"Stand: {formatted_date}")
    parts.append("bipolarsite.netlify.app")
    return " · ".join(parts)


def draw_footer(canvas, doc, meta):
    """Draw the footer in the page margin so it does not create extra pages."""
    canvas.saveState()
    canvas.setFont("DMSans", 7)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(PAGE_W / 2, 6.5 * mm, build_footer_line(meta))
    canvas.restoreState()


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

    handout_type = meta.get("type", "Handout")
    story.append(Paragraph(
        f'<font color="#{TEAL.hexval()[2:]}" size="8">{handout_type.upper()}</font>',
        styles["body"],
    ))
    story.append(Spacer(1, 1 * mm))

    title = meta.get("title", "Handout")
    story.append(Paragraph(title, styles["h1"]))

    if meta.get("emergency_callout"):
        emergency_data = [[
            Paragraph(
                f'<b>{md_inline(meta.get("emergency_label", "Notfall"))}</b>',
                ParagraphStyle("el", fontName="DMSans", fontSize=8, textColor=ALERT, leading=11),
            ),
            Paragraph(
                md_inline(meta["emergency_callout"]),
                ParagraphStyle("ec", fontName="DMSans", fontSize=9.5, textColor=ALERT, leading=13),
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

    quick_steps = meta.get("quick_steps", [])
    if quick_steps:
        step_data = []
        for idx, step in enumerate(quick_steps, start=1):
            icon = step.get("icon", "•") if isinstance(step, dict) else "•"
            text = step.get("text", "") if isinstance(step, dict) else str(step)
            # Fallback to step number if glyphs are missing in DM Sans
            # or if the icon is too wide for the 12mm column (>4 chars).
            if not _icon_renderable(str(icon)) or len(str(icon)) > 4:
                icon = str(idx)
            step_data.append([
                Paragraph(
                    f'<font color="#{TEAL.hexval()[2:]}" size="11"><b>{md_inline(icon)}</b></font>',
                    ParagraphStyle("si", fontName="DMSans", fontSize=11, alignment=TA_CENTER, leading=14),
                ),
                Paragraph(md_inline(text), styles["quick_step"]),
            ])

        step_table = Table(step_data, colWidths=[15 * mm, content_width - 15 * mm])
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

    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE, spaceAfter=3 * mm))

    lines = body.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()

        if line.startswith("# ") and not line.startswith("## "):
            i += 1
            continue

        if line.startswith("## "):
            heading = line[3:].strip()
            story.append(Paragraph(md_inline(heading), styles["h2"]))
            i += 1
            continue

        if line.strip() == "---":
            story.append(Spacer(1, 2 * mm))
            story.append(HRFlowable(width="100%", thickness=0.3, color=LINE, spaceAfter=2 * mm))
            i += 1
            continue

        if line.startswith("- "):
            bullet_text = line[2:].strip()
            sub_items = []
            j = i + 1
            while j < len(lines) and lines[j].startswith("  - "):
                sub_items.append(lines[j].strip()[2:])
                j += 1

            story.append(Paragraph(
                f'<bullet>&bull;</bullet>{md_inline(bullet_text)}',
                styles["bullet"],
            ))

            for sub in sub_items:
                story.append(Paragraph(
                    f'<bullet>–</bullet>{md_inline(sub)}',
                    styles["sub_bullet"],
                ))

            i = j
            continue

        if not line.strip():
            i += 1
            continue

        if line.startswith("*") and line.endswith("*") and not line.startswith("**"):
            inner = line.strip("*").strip()
            story.append(Paragraph(f'<i>{md_inline(inner)}</i>', styles["italic"]))
            i += 1
            continue

        para_lines = [line]
        j = i + 1
        while (
            j < len(lines)
            and lines[j].strip()
            and not lines[j].startswith("#")
            and not lines[j].startswith("- ")
            and not lines[j].startswith("*")
            and lines[j].strip() != "---"
        ):
            para_lines.append(lines[j].rstrip())
            j += 1

        text = " ".join(para_lines)
        story.append(Paragraph(md_inline(text), styles["body"]))
        i = j

    help_module = normalize_help_module(meta)
    if help_module:
        story.extend(build_help_module_flowables(help_module, content_width))

    doc.build(
        story,
        onFirstPage=lambda canvas, doc: draw_footer(canvas, doc, meta),
        onLaterPages=lambda canvas, doc: draw_footer(canvas, doc, meta),
    )
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
