#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import yaml
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, StyleSheet1, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BalancedColumns,
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DRAFTS = ROOT / "src" / "handout-drafts"
OUTPUT = ROOT / "handouts"

NAVY = colors.HexColor("#1c2b3a")
TEAL = colors.HexColor("#1e656d")
TEAL_SOFT = colors.HexColor("#d9ecec")
ALERT = colors.HexColor("#9a3412")
ALERT_SOFT = colors.HexColor("#f7e5dd")
WARM = colors.HexColor("#fcf8f4")
TEXT = colors.HexColor("#2d2823")
MUTED = colors.HexColor("#5c5a56")
LINE = colors.HexColor("#ddd5cc")
PAPER = colors.HexColor("#fffdf9")
SURFACE = colors.HexColor("#f5f1eb")


def parse_frontmatter(path: Path) -> tuple[dict[str, Any], str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError(f"Missing frontmatter in {path}")
    _, fm, body = text.split("---\n", 2)
    data = yaml.safe_load(fm) or {}
    return data, body.strip()


def make_styles() -> StyleSheet1:
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="DraftBadge",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.2,
            leading=8,
            textColor=NAVY,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DraftTitle",
            parent=styles["Heading1"],
            fontName="Times-Bold",
            fontSize=17,
            leading=18.5,
            textColor=NAVY,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DraftSubtitle",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=9.1,
            textColor=MUTED,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="MetaLabel",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=6.6,
            leading=7.5,
            textColor=colors.HexColor("#6f6b65"),
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="MetaValue",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=6.9,
            leading=8.1,
            textColor=TEXT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="AlertEyebrow",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=6.8,
            leading=8,
            textColor=ALERT,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="AlertLine",
            parent=styles["BodyText"],
            fontName="Times-Bold",
            fontSize=9.9,
            leading=10.5,
            textColor=colors.HexColor("#68200b"),
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="AlertCopy",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.2,
            leading=8.5,
            textColor=colors.HexColor("#5d372e"),
            spaceAfter=0,
        )
    )
    styles.add(
        ParagraphStyle(
            name="StepIcon",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=10,
            textColor=colors.white,
            alignment=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="StepText",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.4,
            leading=8.8,
            textColor=NAVY,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="NumberLabel",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=6.6,
            leading=8,
            textColor=colors.HexColor("#6f6b65"),
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="NumberValue",
            parent=styles["BodyText"],
            fontName="Times-Bold",
            fontSize=10.5,
            leading=11,
            textColor=NAVY,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="NumberNote",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=5.9,
            leading=7,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Lead",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.3,
            leading=8.8,
            textColor=TEXT,
            spaceAfter=2.5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionHeading",
            parent=styles["Heading2"],
            fontName="Times-Bold",
            fontSize=9.3,
            leading=10,
            textColor=NAVY,
            spaceBefore=4,
            spaceAfter=2.5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyCompact",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=6.8,
            leading=8.1,
            textColor=TEXT,
            spaceAfter=1.5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Footer",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7,
            leading=8,
            textColor=colors.HexColor("#6f6b65"),
        )
    )
    return styles


def inline_markup(text: str) -> str:
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = text.replace("  \n", "<br/>")
    return text


def badge(text: str, bg: colors.Color, fg: colors.Color, styles: StyleSheet1) -> Table:
    cell = Paragraph(inline_markup(text.upper()), styles["DraftBadge"])
    table = Table([[cell]])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("TEXTCOLOR", (0, 0), (-1, -1), fg),
                ("BOX", (0, 0), (-1, -1), 0, bg),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return table


def build_header(data: dict[str, Any], styles: StyleSheet1, width: float) -> list[Any]:
    header: list[Any] = []

    badges = [
        badge(
            str(data.get("type", "")),
            ALERT_SOFT if data.get("type") == "Akutblatt" else TEAL_SOFT,
            ALERT if data.get("type") == "Akutblatt" else NAVY,
            styles,
        )
    ]
    badge_table = Table([badges], colWidths=[None])
    badge_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    header.append(badge_table)
    header.append(Spacer(1, 7))
    header.append(Paragraph(inline_markup(data["title"]), styles["DraftTitle"]))
    header.append(Paragraph(inline_markup(data["goal"]), styles["DraftSubtitle"]))

    meta_cards = []
    for label, value in [("Zielgruppe", data["audience"]), ("Stand", data["last_updated"])]:
        meta_cards.append(
            Table(
                [[Paragraph(label.upper(), styles["MetaLabel"])], [Paragraph(inline_markup(str(value)), styles["MetaValue"])]],
                colWidths=[(width - 10) / 2],
            )
        )
    meta = Table([meta_cards], colWidths=[(width - 10) / 2, (width - 10) / 2], hAlign="LEFT")
    meta.setStyle(
        TableStyle(
            [
                ("LINEBELOW", (0, 0), (-1, -1), 0.7, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    header.append(meta)

    if data.get("emergency_callout") or data.get("quick_steps"):
        header.append(Spacer(1, 8))
        header.extend(build_alert_panel(data, styles, width))
    header.append(Spacer(1, 6))
    header.append(HRFlowable(width="100%", thickness=0.8, color=LINE, spaceBefore=0, spaceAfter=0))
    return header


def build_alert_panel(data: dict[str, Any], styles: StyleSheet1, width: float) -> list[Any]:
    is_acute = data.get("type") == "Akutblatt"
    eyebrow = Paragraph(inline_markup(str(data.get("emergency_label", ""))), styles["AlertEyebrow"])
    line = Paragraph(inline_markup(str(data.get("emergency_callout", ""))), styles["AlertLine"])
    note = Paragraph(inline_markup(str(data.get("emergency_note", ""))), styles["AlertCopy"])

    top = Table([[eyebrow], [line], [note]], colWidths=[width - 18])
    top.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), ALERT_SOFT if is_acute else WARM),
                ("LINEABOVE", (0, 0), (-1, -1), 1.2, ALERT if is_acute else TEAL),
                ("BOX", (0, 0), (-1, -1), 0.35, colors.HexColor("#e6c8bc") if is_acute else LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    blocks: list[Any] = [top]
    quick_steps = data.get("quick_steps", [])
    if quick_steps:
        step_width = (width - 8) / len(quick_steps)
        row_cells = []
        for step in quick_steps:
            icon = str(step.get("icon", "")) if isinstance(step, dict) else ""
            text = str(step.get("text", "")) if isinstance(step, dict) else str(step)
            icon_box = Table([[Paragraph(inline_markup(icon), styles["StepIcon"])]], colWidths=[16], rowHeights=[16])
            icon_box.setStyle(
                TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), ALERT if is_acute else TEAL),
                        ("BOX", (0, 0), (-1, -1), 0, ALERT if is_acute else TEAL),
                        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ]
                )
            )
            text_para = Paragraph(inline_markup(text), styles["StepText"])
            inner = Table([[icon_box, text_para]], colWidths=[18, step_width - 28])
            inner.setStyle(
                TableStyle(
                    [
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 6),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                        ("TOPPADDING", (0, 0), (-1, -1), 5),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                    ]
                )
            )
            outer = Table([[inner]], colWidths=[step_width])
            outer.setStyle(
                TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                        ("BOX", (0, 0), (-1, -1), 0.35, colors.HexColor("#ead7cf") if is_acute else LINE),
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ]
                )
            )
            row_cells.append(outer)
        step_row = Table([row_cells], colWidths=[step_width] * len(quick_steps))
        step_row.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))
        blocks.extend([Spacer(1, 4), step_row])

    return blocks


def build_number_bar(data: dict[str, Any], styles: StyleSheet1, width: float) -> Table | None:
    contacts = data.get("emergency_contacts") or []
    if not contacts:
        return None

    cards = []
    for item in contacts:
        label = Paragraph(inline_markup(str(item["label"]).upper()), styles["NumberLabel"])
        value_style = styles["NumberValue"].clone("NumberValueClone")
        if item.get("tone") == "urgent":
            value_style.textColor = colors.HexColor("#68200b")
            value_style.fontSize = 12.4
            value_style.leading = 12.8
        note = Paragraph(inline_markup(str(item.get("note", ""))), styles["NumberNote"])
        body = Table([[label], [Paragraph(inline_markup(str(item["number"])), value_style)], [note]], colWidths=[width - 20])
        body.setStyle(
            TableStyle(
                [
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ]
            )
        )
        cards.append((item, body))

    if data.get("type") == "Akutblatt" and len(cards) == 3:
        urgent_item, urgent_body = next((pair for pair in cards if pair[0].get("tone") == "urgent"), cards[0])
        secondary = [pair for pair in cards if pair is not (urgent_item, urgent_body)]

        urgent_card = Table([[urgent_body]], colWidths=[width])
        urgent_card.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), ALERT_SOFT),
                    ("BOX", (0, 0), (-1, -1), 0.45, colors.HexColor("#e6c8bc")),
                    ("LINEABOVE", (0, 0), (-1, -1), 1.2, ALERT),
                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            )
        )

        secondary_width = (width - 8) / 2
        secondary_cards = []
        for item, body in secondary:
            card = Table([[body]], colWidths=[secondary_width])
            card.setStyle(
                TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                        ("BOX", (0, 0), (-1, -1), 0.35, LINE),
                        ("LEFTPADDING", (0, 0), (-1, -1), 8),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                        ("TOPPADDING", (0, 0), (-1, -1), 6),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                    ]
                )
            )
            secondary_cards.append(card)
        secondary_row = Table([secondary_cards], colWidths=[secondary_width, secondary_width])
        secondary_row.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))
        return KeepTogether([urgent_card, Spacer(1, 4), secondary_row])

    col_width = (width - 8) / len(cards)
    row_cards = []
    for _, body in cards:
        card = Table([[body]], colWidths=[col_width])
        card.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                    ("BOX", (0, 0), (-1, -1), 0.35, LINE),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ]
            )
        )
        row_cards.append(card)

    bar = Table([row_cards], colWidths=[col_width] * len(row_cards))
    bar.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return bar


def parse_blocks(body: str) -> list[tuple[str, Any]]:
    lines = body.splitlines()
    blocks: list[tuple[str, Any]] = []
    paragraph: list[str] = []
    bullets: list[tuple[int, str]] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            blocks.append(("p", " ".join(item.strip() for item in paragraph)))
            paragraph = []

    def flush_bullets() -> None:
        nonlocal bullets
        if bullets:
            blocks.append(("ul", bullets[:]))
            bullets = []

    for raw in lines:
        if raw.startswith("# "):
            continue
        if not raw.strip():
            flush_paragraph()
            flush_bullets()
            continue
        if raw.startswith("## "):
            flush_paragraph()
            flush_bullets()
            blocks.append(("h2", raw[3:].strip()))
            continue
        if re.match(r"^\s*-\s+", raw):
            flush_paragraph()
            indent = len(raw) - len(raw.lstrip(" "))
            bullets.append((indent, re.sub(r"^\s*-\s+", "", raw).strip()))
            continue
        flush_bullets()
        paragraph.append(raw)

    flush_paragraph()
    flush_bullets()
    return blocks


def build_list(items: list[tuple[int, str]], styles: StyleSheet1) -> ListFlowable:
    flowables = []
    current_parent: list[ListItem] = []
    nested_map: dict[int, list[ListItem]] = {}

    for indent, text in items:
        paragraph = Paragraph(inline_markup(text), styles["BodyCompact"])
        list_item = ListItem(paragraph)
        if indent >= 2 and current_parent:
            parent_index = len(current_parent) - 1
            nested_map.setdefault(parent_index, []).append(list_item)
        else:
            current_parent.append(list_item)

    final_items = []
    for idx, item in enumerate(current_parent):
        if idx in nested_map:
            nested = ListFlowable(nested_map[idx], bulletType="bullet", leftIndent=10)
            final_items.append(ListItem([item._flowables[0], nested]))
        else:
            final_items.append(item)

    return ListFlowable(final_items, bulletType="bullet", start="circle", leftIndent=14, bulletFontName="Helvetica", bulletFontSize=7)


def build_story(path: Path) -> list[Any]:
    data, body = parse_frontmatter(path)
    styles = make_styles()
    page_width, page_height = A4
    doc_width = page_width - 18 * mm

    story: list[Any] = []
    story.extend(build_header(data, styles, doc_width))
    story.append(Spacer(1, 3))

    number_bar = build_number_bar(data, styles, doc_width)
    if number_bar is not None:
        story.append(number_bar)
        story.append(Spacer(1, 6))

    blocks = parse_blocks(body)
    body_flowables: list[Any] = []
    first_paragraph_done = False
    for kind, payload in blocks:
        if kind == "h2":
            body_flowables.append(Paragraph(inline_markup(payload), styles["SectionHeading"]))
        elif kind == "p":
            style = styles["Lead"] if not first_paragraph_done else styles["BodyCompact"]
            body_flowables.append(Paragraph(inline_markup(payload), style))
            first_paragraph_done = True
        elif kind == "ul":
            body_flowables.append(build_list(payload, styles))
            body_flowables.append(Spacer(1, 1))

    story.append(
        BalancedColumns(
            body_flowables,
            nCols=2,
            innerPadding=8,
            topPadding=0,
            bottomPadding=0,
            leftPadding=0,
            rightPadding=0,
        )
    )
    return story


def draw_page(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#efe8df"))
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setFillColor(PAPER)
    canvas.roundRect(10 * mm, 10 * mm, A4[0] - 20 * mm, A4[1] - 20 * mm, 6 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(colors.HexColor("#e1d9d0"))
    canvas.roundRect(10 * mm, 10 * mm, A4[0] - 20 * mm, A4[1] - 20 * mm, 6 * mm, fill=0, stroke=1)
    canvas.restoreState()


def build_one(path: Path) -> Path:
    slug = path.stem
    target = OUTPUT / f"{slug}.pdf"
    doc = SimpleDocTemplate(
        str(target),
        pagesize=A4,
        leftMargin=9 * mm,
        rightMargin=9 * mm,
        topMargin=9 * mm,
        bottomMargin=9 * mm,
        title=slug,
        author="PUK Zürich",
    )
    story = build_story(path)
    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
    return target


def main() -> None:
    for slug in ["c2_suizidgedanken", "c4_manie", "a8_warnsignale"]:
        out = build_one(DRAFTS / f"{slug}.md")
        print(f"built {out}")


if __name__ == "__main__":
    main()
