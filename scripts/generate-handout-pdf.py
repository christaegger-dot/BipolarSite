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

import json
import re
import sys
from datetime import datetime
from pathlib import Path
from xml.sax.saxutils import escape

import yaml
import pikepdf
from fontTools.ttLib import TTFont as FontToolsTTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Flowable, HRFlowable, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

# ── Paths ──────────────────────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DRAFTS_DIR = PROJECT_ROOT / "src" / "handout-drafts"
OUTPUT_DIR = PROJECT_ROOT / "src" / "handouts"
FONT_DIR = Path("/tmp/fonts_ttf")
WEBFONT_DIR = PROJECT_ROOT / "src" / "fonts"
REFERENCES_PATH = PROJECT_ROOT / "src" / "_data" / "handoutReferences.json"

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
DIAGRAM_BG = HexColor("#f8fbfb")
DIAGRAM_SOFT = HexColor("#eef7f7")
DIAGRAM_WARM = HexColor("#fafaf7")
DIAGRAM_ALERT = HexColor("#fff7ed")
DIAGRAM_ALERT_LINE = HexColor("#e8c4b8")
DIAGRAM_GREEN = HexColor("#dfeee5")
DIAGRAM_AMBER = HexColor("#fff3d6")

PAGE_W, PAGE_H = A4
MARGIN_L = 22 * mm
MARGIN_R = 22 * mm
MARGIN_T = 12 * mm
MARGIN_B = 12 * mm

# ── Paragraph Styles ──────────────────────────────────────────────────
styles = {}

styles["h1"] = ParagraphStyle(
    "H1", fontName="DMSerif", fontSize=18, leading=22,
    textColor=NAVY, spaceAfter=4 * mm, spaceBefore=0,
)
styles["h2"] = ParagraphStyle(
    "H2", fontName="DMSerif", fontSize=11.5, leading=14,
    textColor=NAVY, spaceAfter=1.5 * mm, spaceBefore=3 * mm,
)
styles["body"] = ParagraphStyle(
    "Body", fontName="DMSans", fontSize=9.3, leading=13,
    textColor=TEXT_C, spaceAfter=1.5 * mm,
)
styles["bullet"] = ParagraphStyle(
    "Bullet", fontName="DMSans", fontSize=9.15, leading=12.7,
    textColor=TEXT_C, leftIndent=5 * mm, bulletIndent=0,
    spaceAfter=0.9 * mm,
)
styles["sub_bullet"] = ParagraphStyle(
    "SubBullet", fontName="DMSans", fontSize=8.6, leading=12,
    textColor=MUTED, leftIndent=10 * mm, bulletIndent=5 * mm,
    spaceAfter=0.8 * mm,
)
styles["footer"] = ParagraphStyle(
    "Footer", fontName="DMSans", fontSize=7, leading=8.5,
    textColor=MUTED, alignment=TA_CENTER,
)
styles["quick_step"] = ParagraphStyle(
    "QuickStep", fontName="DMSans", fontSize=9, leading=12.5,
    textColor=TEXT_C,
)
styles["italic"] = ParagraphStyle(
    "Italic", fontName="DMSans", fontSize=9.5, leading=13,
    textColor=MUTED, spaceAfter=2 * mm,
)
styles["help_title"] = ParagraphStyle(
    "HelpTitle", fontName="DMSans", fontSize=8.5, leading=10.5,
    textColor=MUTED, spaceAfter=1 * mm,
)
styles["help_note"] = ParagraphStyle(
    "HelpNote", fontName="DMSans", fontSize=8.3, leading=11,
    textColor=MUTED, spaceAfter=2 * mm,
)
styles["acute_strip_title"] = ParagraphStyle(
    "AcuteStripTitle", fontName="DMSans", fontSize=8.2, leading=10,
    textColor=MUTED, spaceAfter=0.8 * mm,
)
styles["acute_contact"] = ParagraphStyle(
    "AcuteContact", fontName="DMSans", fontSize=8.5, leading=11.4,
    textColor=TEXT_C,
)
styles["acute_step"] = ParagraphStyle(
    "AcuteStep", fontName="DMSans", fontSize=8.4, leading=11,
    textColor=TEXT_C,
)
styles["focus_title"] = ParagraphStyle(
    "FocusTitle", fontName="DMSans", fontSize=8.6, leading=10.5,
    textColor=MUTED, spaceAfter=1 * mm,
)
styles["focus_item"] = ParagraphStyle(
    "FocusItem", fontName="DMSans", fontSize=8.2, leading=10.5,
    textColor=TEXT_C,
)
styles["practice_box_item"] = ParagraphStyle(
    "PracticeBoxItem", fontName="DMSans", fontSize=7.9, leading=10.3,
    textColor=TEXT_C,
)
styles["acute_note"] = ParagraphStyle(
    "AcuteNote", fontName="DMSans", fontSize=8.4, leading=11.2,
    textColor=TEXT_C,
)
styles["visual_title"] = ParagraphStyle(
    "VisualTitle", fontName="DMSans", fontSize=9.4, leading=11.4,
    textColor=MUTED, spaceAfter=1 * mm,
)
styles["acute_visual_label"] = ParagraphStyle(
    "AcuteVisualLabel", fontName="DMSans", fontSize=8.7, leading=10.4,
    textColor=TEAL, alignment=TA_CENTER,
)
styles["acute_visual_text"] = ParagraphStyle(
    "AcuteVisualText", fontName="DMSans", fontSize=8.25, leading=10.1,
    textColor=TEXT_C, alignment=TA_CENTER,
)
styles["visual_cell"] = ParagraphStyle(
    "VisualCell", fontName="DMSans", fontSize=7.9, leading=10,
    textColor=TEXT_C,
)
styles["visual_note"] = ParagraphStyle(
    "VisualNote", fontName="DMSans", fontSize=7.6, leading=9.4,
    textColor=MUTED, spaceBefore=1 * mm,
)
styles["diagram_label"] = ParagraphStyle(
    "DiagramLabel", fontName="DMSans", fontSize=7.2, leading=8.4,
    textColor=TEAL, spaceAfter=0.2 * mm,
)
styles["diagram_text"] = ParagraphStyle(
    "DiagramText", fontName="DMSans", fontSize=6.8, leading=8.0,
    textColor=TEXT_C,
)
styles["diagram_micro"] = ParagraphStyle(
    "DiagramMicro", fontName="DMSans", fontSize=6.2, leading=7.2,
    textColor=MUTED,
)
styles["diagram_center"] = ParagraphStyle(
    "DiagramCenter", fontName="DMSans", fontSize=6.8, leading=8.0,
    textColor=TEXT_C, alignment=TA_CENTER,
)
styles["source_title"] = ParagraphStyle(
    "SourceTitle", fontName="DMSans", fontSize=6.8, leading=8,
    textColor=MUTED, spaceAfter=0.8 * mm,
)
styles["source_text"] = ParagraphStyle(
    "SourceText", fontName="DMSans", fontSize=5.9, leading=7.1,
    textColor=MUTED, spaceAfter=0.8 * mm,
)
styles["source_title_acute"] = ParagraphStyle(
    "SourceTitleAcute", fontName="DMSans", fontSize=8.0, leading=9.4,
    textColor=MUTED, spaceAfter=0.8 * mm,
)
styles["source_text_acute"] = ParagraphStyle(
    "SourceTextAcute", fontName="DMSans", fontSize=7.2, leading=9.2,
    textColor=MUTED, spaceAfter=1.0 * mm,
)
styles["source_title_compact"] = ParagraphStyle(
    "SourceTitleCompact", fontName="DMSans", fontSize=6.2, leading=6.8,
    textColor=MUTED, spaceAfter=0.3 * mm,
)
styles["source_text_compact"] = ParagraphStyle(
    "SourceTextCompact", fontName="DMSans", fontSize=5.35, leading=5.95,
    textColor=MUTED, spaceAfter=0.4 * mm,
)


# ── Parse Markdown with Frontmatter ───────────────────────────────────
def load_handout_references():
    """Load curated source references used by the generated PDFs."""
    if not REFERENCES_PATH.exists():
        return {"references": {}, "bySlug": {}}
    with REFERENCES_PATH.open(encoding="utf-8") as source_file:
        return json.load(source_file)


HANDOUT_REFERENCES = load_handout_references()


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
    text = "" if text is None else str(text).replace("&nbsp;", " ")
    text = escape(text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    text = re.sub(r'\*(.+?)\*', r'<i>\1</i>', text)
    text = re.sub(r'\[(.+?)\]\((.+?)\)', r'\1', text)
    return text


def plain_text(value):
    """Return a lightweight plain-text representation for matching."""
    return re.sub(r"\s+", " ", str(value or "").replace("&nbsp;", " ")).strip()


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


def extract_phone_like_value(text):
    """Extract a Swiss emergency/contact number from free text when present."""
    normalized = plain_text(text)
    match = re.search(r"\b0\d{3}\s\d{2}\s\d{2}\s\d{2}\b|\b1(?:17|42|43|44|47)\b", normalized)
    return match.group(0) if match else None


def normalize_step_icon(icon, idx):
    """Keep compact emergency markers; fall back from word-icons to numbers."""
    raw = str(icon)
    allowed = re.fullmatch(r"\d|1(?:17|42|43|44|47)|24h|[?!]", raw) or raw in {"↑", "↓", "→", "↘", "↔"}
    if not allowed or not _icon_renderable(raw) or len(raw) > 4:
        return str(idx)
    return raw


def normalize_acute_contacts(meta):
    """Return up to three high-signal contacts for the acute top strip."""
    raw_items = meta.get("emergency_contacts")
    if not isinstance(raw_items, list):
        help_module = normalize_help_module(meta)
        raw_items = help_module["items"] if help_module else []

    contacts = []
    for raw in raw_items:
        if not isinstance(raw, dict):
            continue
        label = plain_text(raw.get("label", ""))
        value = plain_text(raw.get("number", raw.get("value", "")))
        note = plain_text(raw.get("note", ""))
        tone = plain_text(raw.get("tone", ""))
        if label or value or note:
            contacts.append({
                "label": label or "Kontakt",
                "value": value or label,
                "note": note,
                "tone": tone,
            })

    if contacts:
        return contacts[:3]

    quick_steps = meta.get("quick_steps", [])
    for idx, step in enumerate(quick_steps, start=1):
        if not isinstance(step, dict):
            continue
        text = plain_text(step.get("text", ""))
        icon = plain_text(step.get("icon", ""))
        value = extract_phone_like_value(text) or icon or str(idx)
        contacts.append({
            "label": "Sofort" if idx == 1 else f"Schritt {idx}",
            "value": value,
            "note": text,
            "tone": "urgent" if value in {"144", "117"} else "",
        })

    return contacts[:3]


def build_acute_contact_strip(meta, content_width):
    """Build a compact above-the-fold contact strip for acute handouts."""
    contacts = normalize_acute_contacts(meta)
    if not contacts:
        return []

    flowables = [
        Paragraph("<b>Sofortkontakte</b>", styles["acute_strip_title"]),
    ]

    cells = []
    for contact in contacts:
        tone_color = ALERT if contact.get("tone") == "urgent" else TEAL
        value_size = "13" if len(contact["value"]) <= 5 else "11"
        parts = [
            f'<font size="7" color="#{MUTED.hexval()[2:]}"><b>{md_inline(contact["label"]).upper()}</b></font>',
            f'<font color="#{tone_color.hexval()[2:]}" size="{value_size}"><b>{md_inline(contact["value"])}</b></font>',
        ]
        if contact.get("note"):
            parts.append(f'<font size="6.8" color="#{MUTED.hexval()[2:]}">{md_inline(contact["note"])}</font>')
        cells.append(Paragraph("<br/>".join(parts), styles["acute_contact"]))

    col_width = content_width / len(cells)
    contact_table = Table([cells], colWidths=[col_width] * len(cells))
    contact_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#fff7ed")),
        ("BOX", (0, 0), (-1, -1), 0.5, HexColor("#e8c4b8")),
        ("LINEBEFORE", (1, 0), (-1, -1), 0.3, HexColor("#e8c4b8")),
        ("TOPPADDING", (0, 0), (-1, -1), 1.0 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.0 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 1.8 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 1.8 * mm),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    flowables.append(contact_table)
    flowables.append(Spacer(1, 1.2 * mm))
    return flowables


def build_quick_steps_flowables(quick_steps, content_width, compact=False):
    """Build quick-step flowables, with a denser horizontal acute variant."""
    if not quick_steps:
        return []

    if compact:
        cells = []
        for idx, step in enumerate(quick_steps[:3], start=1):
            icon = step.get("icon", str(idx)) if isinstance(step, dict) else str(idx)
            text = step.get("text", "") if isinstance(step, dict) else str(step)
            icon = normalize_step_icon(icon, idx)
            cells.append(Paragraph(
                f'<font color="#{TEAL.hexval()[2:]}" size="10"><b>{md_inline(icon)}</b></font><br/>{md_inline(text)}',
                styles["acute_step"],
            ))

        col_width = content_width / len(cells)
        step_table = Table([cells], colWidths=[col_width] * len(cells))
        step_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), TEAL_SOFT),
            ("BOX", (0, 0), (-1, -1), 0.4, HexColor("#b8d8d8")),
            ("LINEBEFORE", (1, 0), (-1, -1), 0.3, HexColor("#b8d8d8")),
            ("TOPPADDING", (0, 0), (-1, -1), 1.4 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.4 * mm),
            ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm),
            ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ]))
        return [step_table, Spacer(1, 2.4 * mm)]

    step_data = []
    for idx, step in enumerate(quick_steps, start=1):
        icon = step.get("icon", "•") if isinstance(step, dict) else "•"
        text = step.get("text", "") if isinstance(step, dict) else str(step)
        icon = normalize_step_icon(icon, idx)
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
        ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("LEFTPADDING", (0, 0), (0, -1), 3 * mm),
        ("LEFTPADDING", (1, 0), (1, -1), 2 * mm),
        ("RIGHTPADDING", (-1, 0), (-1, -1), 3 * mm),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, HexColor("#b8d8d8")),
    ]))
    return [step_table, Spacer(1, 3 * mm)]


VISUAL_KIND_ALIASES = {
    # Gegenständliche Metaphern
    "ampel": "traffic_light",
    "traffic-light": "traffic_light",
    "traffic_light": "traffic_light",
    "thermometer": "thermometer",
    "tacho": "gauge",
    "gauge": "gauge",
    "skala": "scale",
    "scale": "scale",
    "leiter": "ladder",
    "ladder": "ladder",
    "treppe": "stairs",
    "stairs": "stairs",
    "bruecke": "bridge",
    "brücke": "bridge",
    "bridge": "bridge",
    "anker": "anchor",
    "anchor": "anchor",
    "wegweiser": "signpost",
    "signpost": "signpost",
    "schloss": "lock_key",
    "schluessel": "lock_key",
    "schlüssel": "lock_key",
    "lock": "lock_key",
    "lock_key": "lock_key",
    "notfallkarte": "emergency_card",
    "emergency-card": "emergency_card",
    "emergency_card": "emergency_card",
    "werkzeugkasten": "toolbox",
    "toolbox": "toolbox",
    "rettungsring": "lifebuoy",
    "lifebuoy": "lifebuoy",
    "trichter": "funnel",
    "funnel": "funnel",
    "iceberg": "iceberg",
    "iceberg-modell": "iceberg",
    "eisberg": "iceberg",
    # Strukturdiagramme
    "sequenz": "sequence",
    "sequence": "sequence",
    "zeitstrahl": "timeline",
    "timeline": "timeline",
    "pfeilkette": "sequence",
    "schrittfolge": "sequence",
    "flowchart": "flowchart",
    "zyklus": "cycle",
    "kreislauf": "cycle",
    "cycle": "cycle",
    "schleife": "cycle",
    "spirale": "spiral",
    "spiral": "spiral",
    "phasenrad": "phase_wheel",
    "rad": "phase_wheel",
    "hierarchie": "pyramid",
    "pyramide": "pyramid",
    "pyramid": "pyramid",
    "baum": "tree",
    "tree": "tree",
    "organigramm": "tree",
    "vergleich": "comparison",
    "saeulen": "pillars",
    "säulen": "pillars",
    "balken": "bars",
    "bars": "bars",
    "matrix": "matrix",
    "gegenueberstellung": "comparison",
    "gegenüberstellung": "comparison",
    "tabelle": "matrix",
    "table": "matrix",
    "beziehung": "network",
    "venn": "venn",
    "netzwerk": "network",
    "network": "network",
    "mindmap": "mindmap",
    "oekogramm": "network",
    "ökogramm": "network",
    "komposition": "layers",
    "torte": "pie",
    "pie": "pie",
    "treemap": "treemap",
    "sunburst": "sunburst",
    "schichten": "layers",
    "layer": "layers",
    "layers": "layers",
    "verteilung": "scatter",
    "streudiagramm": "scatter",
    "scatter": "scatter",
    "heatmap": "heatmap",
    "kontinuum": "scale",
    "spektrum": "scale",
    "spectrum": "scale",
    "2x2": "quadrant",
    "2x2-quadrant": "quadrant",
    "2×2": "quadrant",
    "2×2-quadrant": "quadrant",
    "quadrant": "quadrant",
    "entscheidung": "decision_tree",
    "entscheidungsbaum": "decision_tree",
    "decision-tree": "decision_tree",
    "decision_tree": "decision_tree",
    "triage": "triage",
    "triage-algorithmus": "triage",
    "triage_algorithmus": "triage",
    "algorithmus": "triage",
    "clusters": "mindmap",
    "grid": "matrix",
    # Semantische Inhaltsblöcke
    "praxisbox": "practice_box",
    "fokusbox": "focus_box",
    "merkkasten": "memo_box",
    "warnbox": "warning_box",
    "beispielkarte": "example_card",
    "definitionskasten": "definition_box",
    "pullquote": "pullquote",
    "checkliste": "checklist",
    "karteikarte": "index_card",
    "zitatbox": "quote_box",
    "was-hilft-was-schadet": "help_harm",
    "hilft-schadet": "help_harm",
}

METAPHOR_KINDS = {
    "traffic_light",
    "thermometer",
    "gauge",
    "ladder",
    "stairs",
    "bridge",
    "anchor",
    "signpost",
    "lock_key",
    "emergency_card",
    "toolbox",
    "lifebuoy",
    "funnel",
    "iceberg",
}

SEMANTIC_BLOCK_KINDS = {
    "practice_box",
    "focus_box",
    "memo_box",
    "warning_box",
    "example_card",
    "definition_box",
    "pullquote",
    "checklist",
    "index_card",
    "quote_box",
    "help_harm",
}


def canonical_visual_kind(kind):
    """Normalize visual model names into supported diagram families."""
    raw = plain_text(kind or "matrix").lower().replace(" ", "-")
    return VISUAL_KIND_ALIASES.get(raw, raw)


def shortened(text, limit=82):
    """Keep diagram text visually concise; full details stay in the body copy."""
    normalized = plain_text(text)
    if len(normalized) <= limit:
        return normalized
    return normalized[: max(0, limit - 1)].rstrip(" ,.;:") + "…"


class ModelDiagram(Flowable):
    """Draw visual metaphors and structural diagrams from handout frontmatter."""

    def __init__(self, kind, items, width):
        super().__init__()
        self.kind = canonical_visual_kind(kind)
        self.items = items[:6]
        self.width = width
        self.height = self._height_for_kind()

    def _height_for_kind(self):
        if self.kind in {"cycle", "phase_wheel", "spiral", "network", "mindmap", "venn", "iceberg"}:
            return 42 * mm
        if self.kind in {"decision_tree", "triage", "pyramid", "tree", "layers", "treemap", "sunburst"}:
            return 40 * mm
        if self.kind in {"traffic_light", "thermometer", "gauge", "bridge", "funnel", "lifebuoy", "anchor", "signpost", "lock_key", "emergency_card"}:
            return 38 * mm
        return 35 * mm

    def wrap(self, avail_width, avail_height):
        self.width = min(self.width, avail_width)
        return self.width, self.height

    def _hex(self, color):
        return f"#{color.hexval()[2:]}"

    def _para(self, text, style_name="diagram_text", color=None, size=None, bold=False, align=None):
        content = md_inline(shortened(text))
        if color or size or bold:
            attrs = []
            if color:
                attrs.append(f'color="{self._hex(color)}"')
            if size:
                attrs.append(f'size="{size}"')
            tag = "b" if bold else "font"
            inner = f"<{tag}>{content}</{tag}>" if bold else content
            content = f"<font {' '.join(attrs)}>{inner}</font>"
        style = styles[style_name]
        if align == "center" and getattr(style, "alignment", None) != TA_CENTER:
            style = ParagraphStyle(f"{style.name}Center", parent=style, alignment=TA_CENTER)
        return Paragraph(content, style)

    def _draw_para(self, text, x, y_top, width, style_name="diagram_text", limit=82, color=None, size=None, bold=False, align=None):
        original = text
        if limit:
            text = shortened(text, limit)
        paragraph = self._para(text, style_name, color=color, size=size, bold=bold, align=align)
        _, height = paragraph.wrap(width, 40 * mm)
        paragraph.drawOn(self.canv, x, y_top - height)
        return height

    def _card(self, x, y, w, h, item, idx=None, fill=DIAGRAM_BG, stroke=HexColor("#b8d8d8"), accent=TEAL, center=False):
        c = self.canv
        c.setFillColor(fill)
        c.setStrokeColor(stroke)
        c.setLineWidth(0.45)
        c.roundRect(x, y, w, h, 3, fill=1, stroke=1)
        label = item.get("label", "")
        if idx is not None:
            label = f"{idx} · {label}"
        y_top = y + h - 2.2 * mm
        label_h = self._draw_para(
            label,
            x + 2 * mm,
            y_top,
            w - 4 * mm,
            "diagram_label",
            limit=34,
            color=accent,
            bold=True,
            align="center" if center else None,
        )
        remaining = h - label_h - 4.2 * mm
        if remaining > 4.2 * mm and item.get("text"):
            style_name = "diagram_micro" if h < 11 * mm else "diagram_text"
            limit = 46 if h < 11 * mm else 70
            self._draw_para(
                item.get("text", ""),
                x + 2 * mm,
                y_top - label_h - 0.8 * mm,
                w - 4 * mm,
                style_name,
                limit=limit,
                align="center" if center else None,
            )

    def _arrow(self, x1, y1, x2, y2, color=TEAL):
        c = self.canv
        c.setStrokeColor(color)
        c.setFillColor(color)
        c.setLineWidth(0.8)
        c.line(x1, y1, x2, y2)
        if abs(x2 - x1) >= abs(y2 - y1):
            direction = 1 if x2 >= x1 else -1
            c.line(x2, y2, x2 - direction * 3, y2 + 2)
            c.line(x2, y2, x2 - direction * 3, y2 - 2)
        else:
            direction = 1 if y2 >= y1 else -1
            c.line(x2, y2, x2 - 2, y2 - direction * 3)
            c.line(x2, y2, x2 + 2, y2 - direction * 3)

    def _draw_frame(self):
        c = self.canv
        c.setFillColor(HexColor("#ffffff"))
        c.setStrokeColor(LINE)
        c.setLineWidth(0.3)
        c.roundRect(0, 0, self.width, self.height, 4, fill=1, stroke=1)

    def draw(self):
        self.canv.saveState()
        self._draw_frame()
        if self.kind in {"sequence", "timeline", "flowchart"}:
            self._draw_sequence()
        elif self.kind in {"cycle", "phase_wheel", "spiral"}:
            self._draw_cycle()
        elif self.kind in {"pillars", "bars"}:
            self._draw_pillars()
        elif self.kind in {"matrix", "comparison", "quadrant"}:
            self._draw_matrix()
        elif self.kind in {"decision_tree", "triage"}:
            self._draw_decision_tree()
        elif self.kind in {"pyramid", "tree"}:
            self._draw_hierarchy()
        elif self.kind in {"network", "mindmap", "venn"}:
            self._draw_network()
        elif self.kind in {"pie", "treemap", "sunburst", "layers"}:
            self._draw_layers()
        elif self.kind in {"scatter", "heatmap", "scale"}:
            self._draw_scale()
        elif self.kind in METAPHOR_KINDS:
            self._draw_metaphor()
        else:
            self._draw_matrix()
        self.canv.restoreState()

    def _draw_sequence(self):
        items = self.items[:5]
        pad = 5 * mm
        card_gap = 3 * mm
        card_w = (self.width - 2 * pad - card_gap * (len(items) - 1)) / len(items)
        card_h = 20 * mm
        y = (self.height - card_h) / 2
        for idx, item in enumerate(items, start=1):
            x = pad + (idx - 1) * (card_w + card_gap)
            fill = DIAGRAM_BG if idx % 2 else DIAGRAM_WARM
            self._card(x, y, card_w, card_h, item, idx=idx, fill=fill)
            if idx < len(items):
                self._arrow(x + card_w + 1, y + card_h / 2, x + card_w + card_gap - 1, y + card_h / 2)
        if self.kind == "timeline":
            self.canv.setStrokeColor(TEAL)
            self.canv.setLineWidth(1.2)
            self.canv.line(pad, y - 3 * mm, self.width - pad, y - 3 * mm)

    def _draw_cycle(self):
        items = self.items[:4]
        pad = 5 * mm
        card_w = (self.width - 2 * pad - 18 * mm) / 2
        card_h = 13 * mm
        positions = [
            (pad, self.height - pad - card_h),
            (self.width - pad - card_w, self.height - pad - card_h),
            (self.width - pad - card_w, pad),
            (pad, pad),
        ]
        c = self.canv
        center_x = self.width / 2
        center_y = self.height / 2
        radius = 9 * mm
        c.setFillColor(DIAGRAM_SOFT)
        c.setStrokeColor(TEAL)
        c.circle(center_x, center_y, radius, fill=1, stroke=1)
        center_label = "Kreislauf" if self.kind == "cycle" else "Wellen"
        if self.kind == "spiral":
            center_label = "Spirale"
            c.setStrokeColor(TEAL)
            c.arc(center_x - radius, center_y - radius, center_x + radius, center_y + radius, 30, 300)
            c.arc(center_x - radius / 1.6, center_y - radius / 1.6, center_x + radius / 1.6, center_y + radius / 1.6, 30, 300)
        self._draw_para(center_label, center_x - 8 * mm, center_y + 2.5 * mm, 16 * mm, "diagram_center", limit=16, bold=True, align="center")
        for idx, item in enumerate(items, start=1):
            x, y = positions[idx - 1]
            self._card(x, y, card_w, card_h, item, idx=idx, fill=DIAGRAM_BG)
        self._arrow(pad + card_w, self.height - pad - card_h / 2, self.width - pad - card_w, self.height - pad - card_h / 2)
        self._arrow(self.width - pad - card_w / 2, self.height - pad - card_h, self.width - pad - card_w / 2, pad + card_h)
        self._arrow(self.width - pad - card_w, pad + card_h / 2, pad + card_w, pad + card_h / 2)
        self._arrow(pad + card_w / 2, pad + card_h, pad + card_w / 2, self.height - pad - card_h)

    def _draw_matrix(self):
        items = self.items[:4]
        pad = 5 * mm
        gap = 2 * mm
        card_w = (self.width - 2 * pad - gap) / 2
        card_h = (self.height - 2 * pad - gap) / 2
        for idx, item in enumerate(items, start=1):
            col = (idx - 1) % 2
            row = (idx - 1) // 2
            x = pad + col * (card_w + gap)
            y = self.height - pad - (row + 1) * card_h - row * gap
            accent = ALERT if item.get("cue") == "Schutz" else TEAL
            fill = DIAGRAM_ALERT if item.get("cue") == "Schutz" else DIAGRAM_BG
            self._card(x, y, card_w, card_h, item, idx=idx, fill=fill, accent=accent)
        if self.kind == "quadrant":
            self.canv.setStrokeColor(MUTED)
            self._arrow(pad, pad - 1, self.width - pad, pad - 1, MUTED)
            self._arrow(pad - 1, pad, pad - 1, self.height - pad, MUTED)

    def _draw_pillars(self):
        items = self.items[:5]
        pad = 5 * mm
        base_y = 7 * mm
        max_h = self.height - 14 * mm
        slot = (self.width - 2 * pad) / len(items)
        for idx, item in enumerate(items, start=1):
            bar_h = max_h * (0.58 + 0.08 * (idx % 3))
            x = pad + (idx - 1) * slot + slot * 0.16
            w = slot * 0.68
            self.canv.setFillColor(DIAGRAM_SOFT)
            self.canv.setStrokeColor(TEAL)
            self.canv.roundRect(x, base_y, w, bar_h, 3, fill=1, stroke=1)
            self._draw_para(item.get("label", ""), x + 1.3 * mm, base_y + bar_h - 2 * mm, w - 2.6 * mm, "diagram_center", limit=24, bold=True, align="center")
        self.canv.setStrokeColor(LINE)
        self.canv.line(pad, base_y, self.width - pad, base_y)

    def _draw_decision_tree(self):
        items = self.items[:4]
        pad = 5 * mm
        top_w = self.width * 0.42
        top_h = 12 * mm
        top_x = (self.width - top_w) / 2
        top_y = self.height - pad - top_h
        self._card(top_x, top_y, top_w, top_h, items[0], idx=1, fill=DIAGRAM_ALERT if items[0].get("cue") == "Schutz" else DIAGRAM_BG, accent=ALERT if items[0].get("cue") == "Schutz" else TEAL, center=True)
        lower = items[1:] if len(items) > 1 else []
        if not lower:
            return
        gap = 3 * mm
        card_w = (self.width - 2 * pad - gap * (len(lower) - 1)) / len(lower)
        card_h = 15 * mm
        y = pad
        for idx, item in enumerate(lower, start=2):
            x = pad + (idx - 2) * (card_w + gap)
            self._arrow(top_x + top_w / 2, top_y, x + card_w / 2, y + card_h)
            self._card(x, y, card_w, card_h, item, idx=idx, fill=DIAGRAM_BG, center=True)

    def _draw_hierarchy(self):
        items = self.items[:5]
        pad = 6 * mm
        rows = len(items)
        row_h = (self.height - 2 * pad) / rows
        for idx, item in enumerate(items, start=1):
            width_factor = 0.45 + (idx / rows) * 0.45
            w = self.width * width_factor
            x = (self.width - w) / 2
            y = self.height - pad - idx * row_h
            fill = DIAGRAM_SOFT if idx % 2 else DIAGRAM_WARM
            self._card(x, y + 0.7 * mm, w, row_h - 1.4 * mm, item, idx=idx, fill=fill, center=True)

    def _draw_network(self):
        items = self.items[:5]
        c = self.canv
        center_x = self.width / 2
        center_y = self.height / 2
        center_r = 9 * mm
        c.setFillColor(DIAGRAM_SOFT)
        c.setStrokeColor(TEAL)
        c.circle(center_x, center_y, center_r, fill=1, stroke=1)
        self._draw_para("gemeinsam", center_x - 8 * mm, center_y + 2.5 * mm, 16 * mm, "diagram_center", limit=16, bold=True, align="center")
        positions = [
            (7 * mm, self.height - 18 * mm),
            (self.width - 42 * mm, self.height - 18 * mm),
            (7 * mm, 7 * mm),
            (self.width - 42 * mm, 7 * mm),
            (center_x - 18 * mm, self.height - 13 * mm),
        ]
        for idx, item in enumerate(items, start=1):
            x, y = positions[idx - 1]
            w = 35 * mm
            h = 12 * mm
            c.setStrokeColor(LINE)
            c.line(center_x, center_y, x + w / 2, y + h / 2)
            self._card(x, y, w, h, item, idx=idx, fill=DIAGRAM_BG, center=True)
        if self.kind == "venn":
            c.setFillColor(HexColor("#d9ecec"))
            c.setStrokeColor(TEAL)
            c.circle(center_x - 6 * mm, center_y, 10 * mm, fill=0, stroke=1)
            c.circle(center_x + 6 * mm, center_y, 10 * mm, fill=0, stroke=1)

    def _draw_layers(self):
        items = self.items[:5]
        pad = 5 * mm
        band_h = (self.height - 2 * pad) / len(items)
        for idx, item in enumerate(items, start=1):
            y = pad + (len(items) - idx) * band_h
            fill = [DIAGRAM_SOFT, DIAGRAM_BG, DIAGRAM_WARM, DIAGRAM_AMBER, DIAGRAM_ALERT][(idx - 1) % 5]
            self._card(pad + idx * 2, y + 0.5 * mm, self.width - 2 * pad - idx * 4, band_h - 1 * mm, item, idx=idx, fill=fill, center=True)

    def _draw_scale(self):
        items = self.items[:5]
        pad = 7 * mm
        y = self.height / 2
        c = self.canv
        c.setStrokeColor(TEAL)
        c.setLineWidth(3)
        c.line(pad, y, self.width - pad, y)
        for idx, item in enumerate(items, start=1):
            x = pad + (idx - 1) * ((self.width - 2 * pad) / max(1, len(items) - 1))
            c.setFillColor([DIAGRAM_GREEN, DIAGRAM_AMBER, DIAGRAM_ALERT, DIAGRAM_SOFT, DIAGRAM_WARM][(idx - 1) % 5])
            c.setStrokeColor(TEAL)
            c.circle(x, y, 4 * mm, fill=1, stroke=1)
            self._draw_para(item.get("label", ""), x - 16 * mm, y - 7 * mm, 32 * mm, "diagram_center", limit=22, bold=True, align="center")
            self._draw_para(item.get("text", ""), x - 16 * mm, y - 14 * mm, 32 * mm, "diagram_center", limit=38, align="center")

    def _draw_metaphor(self):
        if self.kind == "traffic_light":
            return self._draw_traffic_light()
        if self.kind == "thermometer":
            return self._draw_thermometer()
        if self.kind == "gauge":
            return self._draw_gauge()
        if self.kind in {"ladder", "stairs"}:
            return self._draw_ladder(stairs=self.kind == "stairs")
        if self.kind == "toolbox":
            return self._draw_toolbox()
        if self.kind == "funnel":
            return self._draw_funnel()
        if self.kind == "iceberg":
            return self._draw_iceberg()
        return self._draw_object_with_cards()

    def _draw_traffic_light(self):
        c = self.canv
        pad = 5 * mm
        x = pad
        y = pad
        c.setFillColor(HexColor("#f3f0ec"))
        c.setStrokeColor(MUTED)
        c.roundRect(x, y, 16 * mm, self.height - 2 * pad, 5, fill=1, stroke=1)
        for color, cy in [(ALERT, self.height - 12 * mm), (DIAGRAM_AMBER, self.height / 2), (HexColor("#3f8f65"), 12 * mm)]:
            c.setFillColor(color)
            c.circle(x + 8 * mm, cy, 4 * mm, fill=1, stroke=0)
        self._draw_right_stack(pad + 20 * mm, [DIAGRAM_GREEN, DIAGRAM_AMBER, DIAGRAM_SOFT, DIAGRAM_ALERT])

    def _draw_thermometer(self):
        c = self.canv
        pad = 5 * mm
        x = pad + 5 * mm
        c.setStrokeColor(ALERT)
        c.setLineWidth(4)
        c.line(x, pad + 6 * mm, x, self.height - pad)
        c.setFillColor(DIAGRAM_ALERT)
        c.circle(x, pad + 5 * mm, 5 * mm, fill=1, stroke=1)
        c.setLineWidth(0.6)
        for i in range(4):
            c.line(x + 4 * mm, pad + 12 * mm + i * 6 * mm, x + 9 * mm, pad + 12 * mm + i * 6 * mm)
        self._draw_right_stack(pad + 20 * mm, [DIAGRAM_GREEN, DIAGRAM_AMBER, DIAGRAM_ALERT, DIAGRAM_SOFT])

    def _draw_gauge(self):
        c = self.canv
        pad = 5 * mm
        cx = pad + 11 * mm
        cy = pad + 11 * mm
        c.setStrokeColor(TEAL)
        c.setLineWidth(2)
        c.arc(cx - 10 * mm, cy - 10 * mm, cx + 10 * mm, cy + 10 * mm, 20, 140)
        c.setStrokeColor(ALERT)
        c.line(cx, cy, cx + 7 * mm, cy + 6 * mm)
        c.setFillColor(ALERT)
        c.circle(cx, cy, 1.5 * mm, fill=1, stroke=0)
        self._draw_right_stack(pad + 25 * mm, [DIAGRAM_GREEN, DIAGRAM_AMBER, DIAGRAM_ALERT, DIAGRAM_SOFT])

    def _draw_ladder(self, stairs=False):
        c = self.canv
        pad = 5 * mm
        items = self.items[:5]
        slot = (self.width - 2 * pad) / len(items)
        for idx, item in enumerate(items, start=1):
            x = pad + (idx - 1) * slot
            y = pad + (idx - 1) * (self.height - 2 * pad) / (len(items) + 1) if stairs else pad
            h = 9 * mm if stairs else self.height - 2 * pad
            self._card(x + 1 * mm, y, slot - 2 * mm, h, item, idx=idx, fill=DIAGRAM_BG, center=True)
            if idx < len(items):
                self._arrow(x + slot - 1 * mm, y + h, x + slot + 1 * mm, y + h + 2 * mm)

    def _draw_toolbox(self):
        c = self.canv
        pad = 5 * mm
        c.setFillColor(DIAGRAM_WARM)
        c.setStrokeColor(TEAL)
        c.roundRect(pad, pad, self.width - 2 * pad, self.height - 2 * pad, 5, fill=1, stroke=1)
        c.setFillColor(DIAGRAM_SOFT)
        c.roundRect(self.width / 2 - 13 * mm, self.height - pad - 6 * mm, 26 * mm, 6 * mm, 3, fill=1, stroke=1)
        self._draw_matrix()

    def _draw_funnel(self):
        c = self.canv
        pad = 5 * mm
        left_w = self.width * 0.50
        top_y = self.height - pad
        neck_y = pad + 10 * mm
        path = c.beginPath()
        path.moveTo(pad, top_y)
        path.lineTo(left_w - 10 * mm, neck_y)
        path.lineTo(left_w - 2 * mm, neck_y)
        path.lineTo(left_w + 8 * mm, top_y)
        path.close()
        c.setFillColor(DIAGRAM_SOFT)
        c.setStrokeColor(TEAL)
        c.setLineWidth(0.9)
        c.drawPath(path, fill=1, stroke=1)
        c.setStrokeColor(HexColor("#8fc4c8"))
        for offset in (8 * mm, 15 * mm, 22 * mm):
            c.line(pad + offset * 0.7, top_y - offset, left_w + 8 * mm - offset * 0.4, top_y - offset)
        c.setFillColor(DIAGRAM_ALERT)
        c.roundRect(left_w - 11 * mm, pad + 4 * mm, 10 * mm, 6 * mm, 2, fill=1, stroke=0)
        self._draw_para("enger", left_w - 11 * mm, pad + 8.5 * mm, 10 * mm, "diagram_center", limit=10, color=ALERT, bold=True, align="center")
        self._draw_right_stack(left_w + 12 * mm, [DIAGRAM_BG, DIAGRAM_WARM, DIAGRAM_AMBER, DIAGRAM_ALERT], width=self.width - left_w - 17 * mm)

    def _draw_iceberg(self):
        c = self.canv
        pad = 5 * mm
        water_y = self.height * 0.48
        c.setStrokeColor(TEAL)
        c.setLineWidth(1.2)
        c.line(pad, water_y, self.width - pad, water_y)
        c.setFillColor(HexColor("#eff8fb"))
        c.setStrokeColor(TEAL)
        c.line(self.width * 0.35, water_y, self.width * 0.5, self.height - pad)
        c.line(self.width * 0.5, self.height - pad, self.width * 0.65, water_y)
        c.line(self.width * 0.25, water_y, self.width * 0.5, pad)
        c.line(self.width * 0.5, pad, self.width * 0.75, water_y)
        self._draw_right_stack(self.width * 0.62, [DIAGRAM_BG, DIAGRAM_SOFT, DIAGRAM_WARM, DIAGRAM_ALERT], width=self.width * 0.34)

    def _draw_object_with_cards(self):
        c = self.canv
        pad = 5 * mm
        x = pad + 8 * mm
        y = self.height / 2
        c.setStrokeColor(TEAL)
        c.setFillColor(DIAGRAM_SOFT)
        if self.kind == "anchor":
            c.circle(x, y + 7 * mm, 3 * mm, fill=0, stroke=1)
            c.line(x, y + 4 * mm, x, y - 8 * mm)
            c.arc(x - 8 * mm, y - 12 * mm, x + 8 * mm, y + 4 * mm, 200, 140)
        elif self.kind == "lifebuoy":
            c.circle(x, y, 9 * mm, fill=0, stroke=1)
            c.circle(x, y, 4 * mm, fill=0, stroke=1)
            c.line(x - 9 * mm, y, x - 4 * mm, y)
            c.line(x + 4 * mm, y, x + 9 * mm, y)
        elif self.kind == "signpost":
            c.line(x, pad, x, self.height - pad)
            c.rect(x, self.height - 13 * mm, 18 * mm, 5 * mm, fill=0, stroke=1)
            c.rect(x - 18 * mm, self.height - 22 * mm, 18 * mm, 5 * mm, fill=0, stroke=1)
        elif self.kind == "lock_key":
            c.roundRect(x - 7 * mm, y - 6 * mm, 14 * mm, 12 * mm, 3, fill=0, stroke=1)
            c.arc(x - 5 * mm, y, x + 5 * mm, y + 14 * mm, 0, 180)
        elif self.kind == "emergency_card":
            c.roundRect(x - 9 * mm, y - 12 * mm, 18 * mm, 24 * mm, 3, fill=1, stroke=1)
            c.setFillColor(ALERT)
            c.rect(x - 6 * mm, y + 3 * mm, 12 * mm, 3 * mm, fill=1, stroke=0)
        else:
            c.roundRect(x - 9 * mm, y - 9 * mm, 18 * mm, 18 * mm, 4, fill=1, stroke=1)
        self._draw_right_stack(pad + 25 * mm, [DIAGRAM_BG, DIAGRAM_WARM, DIAGRAM_SOFT, DIAGRAM_ALERT])

    def _draw_right_stack(self, x, fills, width=None):
        items = self.items[:4]
        pad = 5 * mm
        w = width or (self.width - x - pad)
        gap = 1.3 * mm
        h = (self.height - 2 * pad - gap * (len(items) - 1)) / len(items)
        for idx, item in enumerate(items, start=1):
            y = self.height - pad - idx * h - (idx - 1) * gap
            self._card(x, y, w, h, item, idx=idx, fill=fills[(idx - 1) % len(fills)])


class AcuteVisualDiagram(ModelDiagram):
    """Draw compact crisis visuals that can replace dense quick-step tables."""

    def __init__(self, kind, items, width, title=""):
        super().__init__(kind, items, width)
        self.title = plain_text(title)

    def _height_for_kind(self):
        return 34 * mm

    def _urgent_item(self, item):
        joined = plain_text(" ".join([
            item.get("label", ""),
            item.get("text", ""),
            item.get("cue", ""),
        ])).lower()
        return any(token in joined for token in ("144", "117", "gefahr", "schutz", "sofort"))

    def draw(self):
        self.canv.saveState()
        self._draw_frame()
        if self.kind == "traffic_light":
            self._draw_acute_traffic_light()
        elif self.kind == "thermometer":
            self._draw_acute_thermometer()
        elif self.kind == "gauge":
            self._draw_acute_gauge()
        elif self.kind in {"signpost", "flowchart", "sequence"}:
            self._draw_acute_path()
        else:
            self._draw_acute_triage()
        self.canv.restoreState()

    def _acute_card(self, x, y, w, h, item, idx, fill):
        c = self.canv
        accent = ALERT if self._urgent_item(item) else TEAL
        c.setFillColor(fill)
        c.setStrokeColor(HexColor("#b8d8d8"))
        c.setLineWidth(0.45)
        c.roundRect(x, y, w, h, 3, fill=1, stroke=1)
        label = f"{idx} · {item.get('label', '')}"
        label_para = self._para(shortened(label, 36), "acute_visual_label", color=accent, bold=True, align="center")
        _, label_h = label_para.wrap(w - 4.4 * mm, 18 * mm)

        text_para = None
        text_h = 0
        if item.get("text"):
            text_para = self._para(shortened(item.get("text", ""), 52), "acute_visual_text", align="center")
            _, text_h = text_para.wrap(w - 4.4 * mm, 18 * mm)

        gap = 0.9 * mm if text_para else 0
        block_h = label_h + gap + text_h
        block_top = y + h / 2 + block_h / 2
        label_para.drawOn(c, x + 2.2 * mm, block_top - label_h)
        if text_para:
            text_para.drawOn(c, x + 2.2 * mm, block_top - label_h - gap - text_h)

    def _draw_acute_cards(self, x, fills, pad=4.2 * mm):
        items = self.items[:3]
        if not items:
            return
        gap = 2.2 * mm
        w = (self.width - x - pad - gap * (len(items) - 1)) / len(items)
        h = self.height - 2 * pad
        for idx, item in enumerate(items, start=1):
            card_x = x + (idx - 1) * (w + gap)
            fill = fills[(idx - 1) % len(fills)]
            self._acute_card(card_x, pad, w, h, item, idx, fill)
            if idx < len(items):
                self._arrow(card_x + w + 0.5 * mm, pad + h / 2, card_x + w + gap - 0.5 * mm, pad + h / 2, MUTED)

    def _draw_acute_traffic_light(self):
        c = self.canv
        pad = 4.2 * mm
        light_w = 16 * mm
        c.setFillColor(HexColor("#f3f0ec"))
        c.setStrokeColor(MUTED)
        c.roundRect(pad, pad, light_w, self.height - 2 * pad, 5, fill=1, stroke=1)
        for color, cy in [
            (ALERT, self.height - pad - 5 * mm),
            (DIAGRAM_AMBER, self.height / 2),
            (HexColor("#3f8f65"), pad + 5 * mm),
        ]:
            c.setFillColor(color)
            c.circle(pad + light_w / 2, cy, 3.8 * mm, fill=1, stroke=0)
        self._draw_acute_cards(pad + light_w + 6 * mm, [DIAGRAM_GREEN, DIAGRAM_AMBER, DIAGRAM_ALERT], pad=pad)

    def _draw_acute_thermometer(self):
        c = self.canv
        pad = 4.2 * mm
        x = pad + 8 * mm
        tube_top = self.height - pad - 3 * mm
        bulb_y = pad + 6 * mm
        c.setStrokeColor(HexColor("#b8d8d8"))
        c.setLineWidth(7)
        c.line(x, bulb_y, x, tube_top)
        c.setStrokeColor(ALERT)
        c.setLineWidth(4.2)
        c.line(x, bulb_y, x, tube_top - 7 * mm)
        c.setFillColor(DIAGRAM_ALERT)
        c.setStrokeColor(ALERT)
        c.circle(x, bulb_y, 5.8 * mm, fill=1, stroke=1)
        c.setStrokeColor(MUTED)
        c.setLineWidth(0.55)
        for i in range(4):
            y = bulb_y + 7 * mm + i * 6 * mm
            c.line(x + 5 * mm, y, x + 10 * mm, y)
        self._draw_para("Schwere", x - 8 * mm, self.height - pad - 1 * mm, 16 * mm, "diagram_center", limit=12, color=MUTED, bold=True, align="center")
        self._draw_acute_cards(pad + 23 * mm, [DIAGRAM_GREEN, DIAGRAM_AMBER, DIAGRAM_ALERT], pad=pad)

    def _draw_acute_gauge(self):
        c = self.canv
        pad = 4.2 * mm
        cx = pad + 13 * mm
        cy = pad + 12 * mm
        radius = 12 * mm
        c.setStrokeColor(TEAL)
        c.setLineWidth(2.8)
        c.arc(cx - radius, cy - radius, cx + radius, cy + radius, 20, 55)
        c.setStrokeColor(DIAGRAM_AMBER)
        c.arc(cx - radius, cy - radius, cx + radius, cy + radius, 58, 98)
        c.setStrokeColor(ALERT)
        c.arc(cx - radius, cy - radius, cx + radius, cy + radius, 101, 140)
        c.setStrokeColor(ALERT)
        c.setLineWidth(1.3)
        c.line(cx, cy, cx + 9 * mm, cy + 9 * mm)
        c.setFillColor(ALERT)
        c.circle(cx, cy, 2 * mm, fill=1, stroke=0)
        self._draw_para("Tempo", cx - 10 * mm, cy + 7.5 * mm, 20 * mm, "diagram_center", limit=10, color=MUTED, bold=True, align="center")
        self._draw_acute_cards(pad + 31 * mm, [DIAGRAM_GREEN, DIAGRAM_AMBER, DIAGRAM_ALERT], pad=pad)

    def _draw_acute_path(self):
        pad = 4.2 * mm
        c = self.canv
        icon_x = pad + 12 * mm
        y_mid = self.height / 2
        c.setStrokeColor(TEAL)
        c.setLineWidth(1.0)
        c.line(icon_x, y_mid - 11 * mm, icon_x, y_mid + 11 * mm)
        c.setFillColor(DIAGRAM_SOFT)
        c.roundRect(icon_x - 10 * mm, y_mid + 3 * mm, 20 * mm, 6 * mm, 2, fill=1, stroke=1)
        c.setFillColor(DIAGRAM_ALERT)
        c.setStrokeColor(ALERT)
        c.roundRect(icon_x - 5 * mm, y_mid - 7 * mm, 20 * mm, 6 * mm, 2, fill=1, stroke=1)
        self._draw_para("Pfad", icon_x - 9 * mm, y_mid + 7.2 * mm, 18 * mm, "diagram_center", limit=8, color=TEAL, bold=True, align="center")
        self._draw_para("Schutz", icon_x - 4 * mm, y_mid - 2.8 * mm, 18 * mm, "diagram_center", limit=10, color=ALERT, bold=True, align="center")
        self._draw_acute_cards(pad + 25 * mm, [DIAGRAM_GREEN, DIAGRAM_AMBER, DIAGRAM_ALERT], pad=pad)

    def _draw_acute_triage(self):
        c = self.canv
        pad = 4.2 * mm
        cx = pad + 12 * mm
        cy = self.height / 2
        r = 9 * mm
        path = c.beginPath()
        path.moveTo(cx, cy + r)
        path.lineTo(cx + r, cy)
        path.lineTo(cx, cy - r)
        path.lineTo(cx - r, cy)
        path.close()
        c.setFillColor(DIAGRAM_ALERT)
        c.setStrokeColor(ALERT)
        c.drawPath(path, fill=1, stroke=1)
        self._draw_para("Triage", cx - 8 * mm, cy + 3.0 * mm, 16 * mm, "diagram_center", limit=10, color=ALERT, bold=True, align="center")
        self._draw_acute_cards(pad + 28 * mm, [DIAGRAM_ALERT, DIAGRAM_ALERT, DIAGRAM_AMBER], pad=pad)


class SemanticBlockDiagram(ModelDiagram):
    """Draw semantic content blocks as visibly distinct containers."""

    def _height_for_kind(self):
        return 42 * mm

    def draw(self):
        self.canv.saveState()
        self._draw_frame()
        if self.kind == "toolbox":
            self._draw_toolbox()
        elif self.kind == "help_harm":
            self._draw_help_harm()
        elif self.kind == "warning_box":
            self._draw_warning_box()
        elif self.kind == "checklist":
            self._draw_checklist()
        elif self.kind in METAPHOR_KINDS:
            self._draw_metaphor()
        else:
            self._draw_semantic_cards()
        self.canv.restoreState()

    def _draw_semantic_cards(self):
        self._draw_matrix()

    def _draw_checklist(self):
        pad = 5 * mm
        items = self.items[:5]
        row_h = (self.height - 2 * pad) / len(items)
        for idx, item in enumerate(items, start=1):
            y = self.height - pad - idx * row_h
            self.canv.setStrokeColor(TEAL)
            self.canv.rect(pad, y + row_h / 2 - 2 * mm, 4 * mm, 4 * mm, stroke=1, fill=0)
            self._draw_para(item.get("label", ""), pad + 7 * mm, y + row_h - 1 * mm, self.width - 2 * pad - 7 * mm, "diagram_label", limit=32, bold=True)
            self._draw_para(item.get("text", ""), pad + 7 * mm, y + row_h - 8 * mm, self.width - 2 * pad - 7 * mm, "diagram_text", limit=80)

    def _draw_warning_box(self):
        self._draw_right_stack(5 * mm, [DIAGRAM_ALERT, DIAGRAM_AMBER, DIAGRAM_BG, DIAGRAM_SOFT], width=self.width - 10 * mm)

    def _draw_help_harm(self):
        pad = 5 * mm
        harm_tokens = ("schadet", "nicht", "risiko", "belastend")
        harm_items = [
            item for item in self.items
            if any(token in plain_text(item.get("label", "")).lower() for token in harm_tokens)
        ]
        help_items = [item for item in self.items if item not in harm_items]
        cols = [help_items or self.items[:1], harm_items or self.items[1:2]]
        col_w = (self.width - 2 * pad - 3 * mm) / 2
        titles = ["Hilft", "Schadet eher"]
        fills = [DIAGRAM_GREEN, DIAGRAM_ALERT]
        for col, col_items in enumerate(cols):
            x = pad + col * (col_w + 3 * mm)
            self.canv.setFillColor(fills[col])
            self.canv.setStrokeColor(TEAL if col == 0 else ALERT)
            self.canv.roundRect(x, pad, col_w, self.height - 2 * pad, 4, fill=1, stroke=1)
            self._draw_para(titles[col], x + 2 * mm, self.height - pad - 2 * mm, col_w - 4 * mm, "diagram_label", limit=20, bold=True, color=TEAL if col == 0 else ALERT)
            y_top = self.height - pad - 10 * mm
            for item in col_items[:3]:
                h = self._draw_para(f"• {item.get('label', '')}: {item.get('text', '')}", x + 2 * mm, y_top, col_w - 4 * mm, "diagram_text", limit=72)
                y_top -= h + 1 * mm


def build_focus_box_flowables(meta, content_width):
    """Build a compact highlighted scan aid for key worksheet/orientation steps."""
    focus_box = meta.get("focus_box")
    if not isinstance(focus_box, dict):
        return []

    raw_items = focus_box.get("items", [])
    if not isinstance(raw_items, list):
        return []

    items = []
    for raw in raw_items:
        if not isinstance(raw, dict):
            continue
        label = plain_text(raw.get("label", ""))
        text = plain_text(raw.get("text", ""))
        if label or text:
            items.append({"label": label, "text": text})

    if not items:
        return []

    title = plain_text(focus_box.get("title", "Merken"))
    kind = canonical_visual_kind(focus_box.get("kind", "focus_box"))
    flowables = [Paragraph(f"<b>{md_inline(title)}</b>", styles["focus_title"])]
    flowables.append(SemanticBlockDiagram(kind, items, content_width))
    flowables.append(Spacer(1, 2.4 * mm))
    return flowables


def build_visual_model_flowables(meta, content_width):
    """Build a compact diagram-like block for orientation handouts."""
    visual_model = meta.get("visual_model")
    if not isinstance(visual_model, dict):
        return []

    raw_items = visual_model.get("items", [])
    if not isinstance(raw_items, list):
        return []

    items = []
    for raw in raw_items:
        if not isinstance(raw, dict):
            continue
        label = plain_text(raw.get("label", ""))
        text = plain_text(raw.get("text", ""))
        cue = plain_text(raw.get("cue", ""))
        if label or text or cue:
            items.append({"label": label, "text": text, "cue": cue})

    if not items:
        return []

    kind = canonical_visual_kind(visual_model.get("kind", "matrix"))
    title = plain_text(visual_model.get("title", "Orientierung"))
    note = plain_text(visual_model.get("note", ""))
    flowables = [Paragraph(f"<b>{md_inline(title)}</b>", styles["visual_title"])]
    diagram_cls = SemanticBlockDiagram if kind in SEMANTIC_BLOCK_KINDS else ModelDiagram
    flowables.append(diagram_cls(kind, items, content_width))
    if note:
        flowables.append(Paragraph(md_inline(note), styles["visual_note"]))
    flowables.append(Spacer(1, 2.4 * mm))
    return flowables


def build_acute_visual_flowables(meta, content_width):
    """Build one visible visual decision aid for acute handouts."""
    acute_visual = meta.get("acute_visual")
    if not isinstance(acute_visual, dict):
        return build_quick_steps_flowables(meta.get("quick_steps", []), content_width, compact=True)

    raw_items = acute_visual.get("items", [])
    if not isinstance(raw_items, list):
        raw_items = []

    items = []
    for raw in raw_items:
        if not isinstance(raw, dict):
            continue
        label = plain_text(raw.get("label", ""))
        text = plain_text(raw.get("text", ""))
        cue = plain_text(raw.get("cue", ""))
        if label or text or cue:
            items.append({"label": label, "text": text, "cue": cue})

    if not items:
        quick_items = []
        for idx, step in enumerate(meta.get("quick_steps", [])[:3], start=1):
            if not isinstance(step, dict):
                continue
            quick_items.append({
                "label": normalize_step_icon(step.get("icon", idx), idx),
                "text": plain_text(step.get("text", "")),
                "cue": "",
            })
        items = quick_items

    if not items:
        return []

    title = plain_text(acute_visual.get("title", "Schnellentscheidung"))
    kind = canonical_visual_kind(acute_visual.get("kind", "triage"))
    return [
        Paragraph(f"<b>{md_inline(title)}</b>", styles["visual_title"]),
        AcuteVisualDiagram(kind, items, content_width),
        Spacer(1, 2.4 * mm),
    ]


def normalize_acute_practice_boxes(meta, field_name="acute_practice_boxes"):
    """Return optional compact action boxes for acute one-page cards."""
    raw_boxes = meta.get(field_name)
    if not isinstance(raw_boxes, list):
        return []

    boxes = []
    for raw_box in raw_boxes:
        if not isinstance(raw_box, dict):
            continue
        title = plain_text(raw_box.get("title", ""))
        raw_items = raw_box.get("items", [])
        if not isinstance(raw_items, list):
            raw_items = []
        items = [plain_text(item) for item in raw_items if plain_text(item)]
        if title and items:
            boxes.append({"title": title, "items": items[:5]})
    return boxes[:6]


def build_acute_practice_box_flowables(meta, content_width, field_name="acute_practice_boxes", title="Praxis in den ersten Minuten"):
    """Build compact clinical action boxes without decorative empty area."""
    boxes = normalize_acute_practice_boxes(meta, field_name)
    if not boxes:
        return []

    rows = []
    for row_start in range(0, len(boxes), 2):
        row = []
        for box in boxes[row_start:row_start + 2]:
            item_lines = "<br/>".join(f"&bull;&nbsp;{md_inline(item)}" for item in box["items"])
            row.append(Paragraph(
                f'<b>{md_inline(box["title"])}</b><br/>{item_lines}',
                ParagraphStyle(
                    f"PracticeBox-{row_start}-{len(row)}",
                    parent=styles["practice_box_item"],
                    leading=10.6,
                    spaceAfter=0,
                ),
            ))
        if len(row) == 1:
            row.append(Paragraph("", styles["practice_box_item"]))
        rows.append(row)

    box_table = Table(rows, colWidths=[content_width / 2 - 1.5 * mm] * 2, hAlign="LEFT")
    box_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#fbf8f3")),
        ("BOX", (0, 0), (-1, -1), 0.45, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 2.0 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.0 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 2.4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2.4 * mm),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return [
        Paragraph(f"<b>{md_inline(title)}</b>", styles["visual_title"]),
        KeepTogether([box_table]),
        Spacer(1, 2.4 * mm),
    ]


def build_acute_note_flowables(meta, content_width):
    """Show the existing safety note as a compact clinical reminder."""
    note = plain_text(meta.get("emergency_note", ""))
    if not note:
        return []

    note_table = Table(
        [[
            Paragraph(
                f'<font color="#{ALERT.hexval()[2:]}"><b>Merken</b></font><br/>{md_inline(note)}',
                styles["acute_note"],
            )
        ]],
        colWidths=[content_width],
    )
    note_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#fff7ed")),
        ("BOX", (0, 0), (-1, -1), 0.45, HexColor("#e8c4b8")),
        ("TOPPADDING", (0, 0), (-1, -1), 2.0 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.0 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 2.8 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2.8 * mm),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return [note_table, Spacer(1, 2.4 * mm)]


def build_help_module_flowables(help_module, content_width):
    """Create flowables for the optional help module.
    Horizontal 3-column grid (matches HTML preview); saves ~25mm vs.
    vertical row layout — critical for 1-page acute handouts. */"""
    flowables = [Spacer(1, 1 * mm)]
    flowables.append(HRFlowable(width="100%", thickness=0.5, color=LINE, spaceAfter=2 * mm))
    flowables.append(Paragraph(f'<b>{md_inline(help_module["title"])}</b>', styles["help_title"]))
    if help_module.get("note"):
        flowables.append(Paragraph(md_inline(help_module["note"]), styles["help_note"]))

    items = help_module["items"]
    # Horizontal grid: build one cell-Paragraph per item (label / number / note).
    # Each cell stacks label-eyebrow + bold value + note via <br/>.
    cell_style = ParagraphStyle(
        "HelpCard", fontName="DMSans", fontSize=8.5, leading=11.5, textColor=TEXT_C,
    )
    cells = []
    for item in items:
        tone_color = ALERT if item.get("tone") == "urgent" else TEAL
        value_markup = md_inline(item["value"] or item["label"]) or "–"
        label_markup = md_inline(item["label"] or "")
        note_markup = md_inline(item.get("note") or "")

        parts = []
        if label_markup:
            parts.append(
                f'<font size="7" color="#{MUTED.hexval()[2:]}"><b>{label_markup.upper()}</b></font>'
            )
        parts.append(
            f'<font color="#{tone_color.hexval()[2:]}" size="10"><b>{value_markup}</b></font>'
        )
        if note_markup:
            parts.append(
                f'<font size="7" color="#{MUTED.hexval()[2:]}">{note_markup}</font>'
            )
        cells.append(Paragraph("<br/>".join(parts), cell_style))

    # Pad to 3 columns if fewer items, so colWidth math stays predictable.
    while len(cells) < 3:
        cells.append(Paragraph("", cell_style))

    col_width = (content_width - 6 * mm) / len(cells)
    help_table = Table([cells], colWidths=[col_width] * len(cells))
    help_table.setStyle(TableStyle([
        ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#fafaf7")),
        ("BOX", (0, 0), (-1, -1), 0.3, LINE),
        ("LINEBEFORE", (1, 0), (-1, -1), 0.3, LINE),
    ]))
    flowables.append(help_table)
    return flowables


def references_for_meta(meta):
    """Return source reference strings for a handout slug."""
    slug = str(meta.get("slug", "") or "").strip()
    source_ids = HANDOUT_REFERENCES.get("bySlug", {}).get(slug, [])
    references = HANDOUT_REFERENCES.get("references", {})
    return [
        references[source_id]
        for source_id in source_ids
        if isinstance(source_id, str) and source_id in references
    ]


def build_source_flowables(meta):
    """Build the mandatory compact source block shown in every PDF."""
    references = references_for_meta(meta)
    if not references:
        return []

    compact = meta.get("type") == "Akutblatt"
    title_style = styles["source_title_acute"] if compact else styles["source_title"]
    text_style = styles["source_text_acute"] if compact else styles["source_text"]
    source_space = 1.4 * mm if compact else 0.8 * mm
    flowables = [
        HRFlowable(width="100%", thickness=0.35, color=LINE, spaceBefore=source_space, spaceAfter=source_space),
        Paragraph("<b>Quellen (Auswahl)</b>", title_style),
    ]
    if compact:
        for idx, reference in enumerate(references, start=1):
            flowables.append(Paragraph(f"{idx}. {md_inline(reference)}", text_style))
    else:
        source_lines = [f"{idx}. {md_inline(reference)}" for idx, reference in enumerate(references, start=1)]
        flowables.append(Paragraph(" · ".join(source_lines), text_style))
    return [KeepTogether(flowables)]


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
    if doc.page > 1:
        canvas.setFont("DMSans", 7.2)
        canvas.setFillColor(MUTED)
        continuation = f'{meta.get("type", "Handout")} · {meta.get("title", "Handout")} · Fortsetzung'
        canvas.drawString(MARGIN_L, PAGE_H - 7 * mm, continuation)
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.3)
        canvas.line(MARGIN_L, PAGE_H - 9 * mm, PAGE_W - MARGIN_R, PAGE_H - 9 * mm)
    canvas.setFont("DMSans", 7)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(PAGE_W / 2, 4 * mm, build_footer_line(meta))
    canvas.restoreState()


def apply_pdf_metadata(output_path: Path, meta):
    """Add language metadata that ReportLab does not write by itself."""
    with pikepdf.Pdf.open(output_path, allow_overwriting_input=True) as pdf:
        pdf.Root.Lang = pikepdf.String("de-CH")
        with pdf.open_metadata(set_pikepdf_as_editor=True) as metadata:
            metadata["dc:language"] = ["de-CH"]
            metadata["dc:title"] = meta.get("title", "Handout")
            metadata["dc:creator"] = ["PUK Zürich — Fachstelle Angehörigenarbeit"]
        pdf.save(output_path)


# ── Build PDF ─────────────────────────────────────────────────────────
def build_pdf(meta, body, output_path: Path):
    """Generate a PDF from parsed markdown content."""
    is_acute_handout = meta.get("type") == "Akutblatt"

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
        emergency_y_padding = 1.5 * mm if is_acute_handout else 2 * mm
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
            ("TOPPADDING", (0, 0), (-1, -1), emergency_y_padding),
            ("BOTTOMPADDING", (0, 0), (-1, -1), emergency_y_padding),
            ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]))
        story.append(emergency_table)
        story.append(Spacer(1, 1.4 * mm if is_acute_handout else 2.4 * mm))

    quick_steps = meta.get("quick_steps", [])
    if is_acute_handout:
        story.extend(build_acute_contact_strip(meta, content_width))
        story.extend(build_acute_visual_flowables(meta, content_width))
        story.extend(build_acute_practice_box_flowables(meta, content_width))
    else:
        story.extend(build_quick_steps_flowables(quick_steps, content_width))
        story.extend(build_visual_model_flowables(meta, content_width))
        story.extend(build_focus_box_flowables(meta, content_width))

    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE, spaceAfter=2 * mm))

    lines = body.split("\n")
    i = 0
    inserted_acute_page2_boxes = False
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

        if line.strip() == "<!-- pagebreak -->":
            story.append(PageBreak())
            if is_acute_handout and not inserted_acute_page2_boxes:
                story.extend(build_acute_practice_box_flowables(
                    meta,
                    content_width,
                    field_name="acute_page2_boxes",
                    title="Auf einen Blick",
                ))
                story.extend(build_acute_note_flowables(meta, content_width))
                inserted_acute_page2_boxes = True
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

    help_module = None if is_acute_handout else normalize_help_module(meta)
    if help_module:
        story.extend(build_help_module_flowables(help_module, content_width))

    story.extend(build_source_flowables(meta))

    doc.build(
        story,
        onFirstPage=lambda canvas, doc: draw_footer(canvas, doc, meta),
        onLaterPages=lambda canvas, doc: draw_footer(canvas, doc, meta),
    )
    apply_pdf_metadata(output_path, meta)
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
