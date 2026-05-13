#!/usr/bin/env python3
"""Generate the printable crisis-plan worksheet PDF."""

import json
from pathlib import Path
from xml.sax.saxutils import escape

import pikepdf
from fontTools.ttLib import TTFont as FontToolsTTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = PROJECT_ROOT / "src" / "downloads" / "krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf"
FONT_DIR = Path("/tmp/fonts_ttf")
WEBFONT_DIR = PROJECT_ROOT / "src" / "fonts"
REFERENCES_PATH = PROJECT_ROOT / "src" / "_data" / "handoutReferences.json"

TITLE = "Krisenplan-Vorlage – Bipolare Störung"
AUTHOR = "PUK Zürich — Fachstelle Angehörigenarbeit"
STAND = "12.05.2026"


def ensure_pdf_fonts():
    FONT_DIR.mkdir(parents=True, exist_ok=True)
    font_map = {
        "dm-sans-variable.ttf": WEBFONT_DIR / "dm-sans-variable.woff2",
        "dm-serif-display-400.ttf": WEBFONT_DIR / "dm-serif-display-400.woff2",
    }

    for target_name, source_path in font_map.items():
        target_path = FONT_DIR / target_name
        if target_path.exists():
            continue
        font = FontToolsTTFont(str(source_path))
        font.flavor = None
        font.save(str(target_path))

    return {
        "DMSans": FONT_DIR / "dm-sans-variable.ttf",
        "DMSerif": FONT_DIR / "dm-serif-display-400.ttf",
    }


PDF_FONT_PATHS = ensure_pdf_fonts()
pdfmetrics.registerFont(TTFont("DMSans", str(PDF_FONT_PATHS["DMSans"])))
pdfmetrics.registerFont(TTFont("DMSerif", str(PDF_FONT_PATHS["DMSerif"])))

NAVY = HexColor("#7a6f66")
TEAL = HexColor("#3a9aa3")
TEAL_SOFT = HexColor("#d9ecec")
ALERT = HexColor("#9a3412")
TEXT_C = HexColor("#2d2823")
MUTED = HexColor("#5c5a56")
LINE = HexColor("#d6d0c8")
PAPER = HexColor("#fafaf7")
WARNING_BG = HexColor("#fff7ed")

PAGE_W, _ = A4
MARGIN_L = 18 * mm
MARGIN_R = 18 * mm
MARGIN_T = 12 * mm
MARGIN_B = 10 * mm

styles = {
    "eyebrow": ParagraphStyle(
        "Eyebrow", fontName="DMSans", fontSize=7.5, leading=9,
        textColor=TEAL, spaceAfter=1.2 * mm,
    ),
    "h1": ParagraphStyle(
        "H1", fontName="DMSerif", fontSize=19, leading=23,
        textColor=NAVY, spaceAfter=1 * mm,
    ),
    "subtitle": ParagraphStyle(
        "Subtitle", fontName="DMSans", fontSize=8.5, leading=11,
        textColor=MUTED, spaceAfter=2.5 * mm,
    ),
    "h2": ParagraphStyle(
        "H2", fontName="DMSerif", fontSize=11.5, leading=14,
        textColor=NAVY, spaceBefore=2 * mm, spaceAfter=1.2 * mm,
    ),
    "body": ParagraphStyle(
        "Body", fontName="DMSans", fontSize=8.4, leading=10.6,
        textColor=TEXT_C, spaceAfter=1 * mm,
    ),
    "small": ParagraphStyle(
        "Small", fontName="DMSans", fontSize=7.2, leading=8.8,
        textColor=MUTED,
    ),
    "label": ParagraphStyle(
        "Label", fontName="DMSans", fontSize=7.8, leading=9.5,
        textColor=MUTED,
    ),
    "field": ParagraphStyle(
        "Field", fontName="DMSans", fontSize=8.2, leading=10,
        textColor=TEXT_C,
    ),
    "footer": ParagraphStyle(
        "Footer", fontName="DMSans", fontSize=7, leading=8.5,
        textColor=MUTED, alignment=TA_CENTER,
    ),
    "source_title": ParagraphStyle(
        "SourceTitle", fontName="DMSans", fontSize=7.2, leading=8.5,
        textColor=MUTED, spaceAfter=0.8 * mm,
    ),
    "source_text": ParagraphStyle(
        "SourceText", fontName="DMSans", fontSize=6.5, leading=8,
        textColor=MUTED,
    ),
}


def inline(text):
    return escape(str(text or "").replace("&nbsp;", " "))


def p(text, style="body"):
    return Paragraph(text, styles[style])


def field_box(label, hint="", height=17 * mm):
    label_text = f"<b>{label}</b>"
    if hint:
        label_text += f"<br/><font size='7' color='#5c5a56'>{hint}</font>"
    table = Table(
        [[p(label_text, "field")], [Spacer(1, height)]],
        colWidths=[None],
    )
    table.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.45, LINE),
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#ffffff")),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return table


def row(fields, widths=None):
    widths = widths or [1 / len(fields)] * len(fields)
    content_width = PAGE_W - MARGIN_L - MARGIN_R
    table = Table([fields], colWidths=[content_width * width for width in widths])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.8 * mm),
    ]))
    return table


def callout(text, color=TEAL_SOFT, border=HexColor("#b8d8d8")):
    table = Table([[p(text, "body")]], colWidths=[PAGE_W - MARGIN_L - MARGIN_R])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("BOX", (0, 0), (-1, -1), 0.5, border),
        ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    return table


def source_references():
    with REFERENCES_PATH.open(encoding="utf-8") as source_file:
        source_data = json.load(source_file)
    refs = source_data.get("references", {})
    source_ids = source_data.get("bySlug", {}).get("krisenplan_vorlage", [])
    return [refs[source_id] for source_id in source_ids if source_id in refs]


def source_block():
    source_lines = [
        f"{idx}. {inline(reference)}"
        for idx, reference in enumerate(source_references(), start=1)
    ]
    return [
        HRFlowable(width="100%", thickness=0.4, color=LINE, spaceBefore=1 * mm, spaceAfter=1.2 * mm),
        p("<b>Quellen (Auswahl)</b>", "source_title"),
        p("<br/>".join(source_lines), "source_text"),
    ]


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("DMSans", 7)
    canvas.setFillColor(MUTED)
    footer_line = (
        f"PUK Zürich · Fachstelle Angehörigenarbeit · Version core_v02 · "
        f"Stand: {STAND} · bipolarsite.netlify.app"
    )
    canvas.drawCentredString(PAGE_W / 2, 6.5 * mm, footer_line)
    canvas.restoreState()


def apply_pdf_metadata(output_path: Path):
    with pikepdf.Pdf.open(output_path, allow_overwriting_input=True) as pdf:
        pdf.Root.Lang = pikepdf.String("de-CH")
        with pdf.open_metadata(set_pikepdf_as_editor=True) as metadata:
            metadata["dc:language"] = ["de-CH"]
            metadata["dc:title"] = TITLE
            metadata["dc:creator"] = [AUTHOR]
        pdf.save(output_path)


def build_pdf(output_path: Path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title=TITLE,
        author=AUTHOR,
        subject="Ausfüllbare Krisenplan-Vorlage für Angehörige in stabilen Phasen",
    )

    story = [
        p("ARBEITSBLATT", "eyebrow"),
        p("Unser Krisenplan", "h1"),
        p("Bipolare Störung · gemeinsam in stabiler Phase erstellt", "subtitle"),
        callout(
            "<b>Datenschutz und Aufbewahrung:</b> Ausgefüllte Blätter enthalten sensible Gesundheitsdaten. "
            "Teilen Sie den Plan nur mit vertrauenswürdigen Personen, bewahren Sie Ausdrucke sicher auf und "
            "speichern Sie digitale Kopien bewusst.",
            color=WARNING_BG,
            border=HexColor("#e8c4b8"),
        ),
        Spacer(1, 2 * mm),
        row([
            field_box("Erstellt am", height=6 * mm),
            field_box("Gemeinsam von", height=6 * mm),
            field_box("Version", height=6 * mm),
        ], widths=[0.25, 0.55, 0.20]),
        callout(
            "<b>Wenn es zu gross wirkt:</b> Füllen Sie zuerst nur drei Felder aus: Frühwarnzeichen, erste Kontakte "
            "und eine Massnahme, die beim letzten Mal geholfen hat.",
        ),
        p("1 · Frühwarnzeichen", "h2"),
        row([
            field_box("Manie / Hypomanie - typische Zeichen bei uns", "z. B. Schlaf, Tempo, Geld, Reizbarkeit", 22 * mm),
            field_box("Depression - typische Zeichen bei uns", "z. B. Rückzug, Grübeln, Antrieb, Suizidgedanken", 22 * mm),
        ]),
        callout(
            "<b>Schlaf ernst nehmen:</b> Weniger als 5-6 Stunden Schlaf über mehrere Nächte kann ein frühes Warnsignal sein.",
        ),
        p("2 · Erste Kontakte", "h2"),
        row([
            field_box("Erster Anruf", "Name, Rolle, Telefonnummer", 12 * mm),
            field_box("Zweiter Anruf", "wenn der erste Kontakt nicht erreichbar ist", 12 * mm),
            field_box("Bei akuter Gefahr", "144 / 117 / 0800 33 66 55", 12 * mm),
        ]),
        p("3 · Erste hilfreiche Massnahme", "h2"),
        row([
            field_box("Was hat beim letzten Mal am meisten geholfen?", "", 17 * mm),
            field_box("Was soll nicht mehr versucht werden?", "", 17 * mm),
        ]),
        p("Medikamente und Behandlung", "h2"),
        row([
            field_box("Aktuelle Medikamente", "nur Name / zuständige Praxis, keine Dosierungsdetails nötig", 14 * mm),
            field_box("Wenn Medikamente abgesetzt werden", "wer wird informiert, ab wann wird gehandelt?", 14 * mm),
        ]),
        PageBreak(),
        p("Grenzen, Klinik und Alltag", "h1"),
        p("Diese Seite ergänzt die ersten drei Felder, sobald genug Ruhe dafür da ist.", "subtitle"),
        p("Meine Grenzen - was ich nicht alleine entscheide", "h2"),
        row([
            field_box("Ich entscheide nicht alleine über", "z. B. Geld, Klinik, Kinderbetreuung, Sicherheit", 19 * mm),
            field_box("Meine Grenze ist erreicht, wenn", "konkrete beobachtbare Zeichen", 19 * mm),
        ]),
        p("Klinik oder Notfallweg", "h2"),
        row([
            field_box("Klinik / Notfall ab wann?", "welche Situation reicht aus, um Hilfe zu holen?", 18 * mm),
            field_box("Bevorzugte Stelle / wichtige Unterlagen", "Klinik, Praxis, Medikamentenliste, Versicherungskarte", 18 * mm),
        ]),
        p("Kinder, Haushalt und Finanzen", "h2"),
        row([
            field_box("Kinderbetreuung", "wer übernimmt kurzfristig?", 15 * mm),
            field_box("Haushalt / Termine", "was muss abgesagt oder delegiert werden?", 15 * mm),
            field_box("Finanzen / Ausgaben", "welche Grenze schützt in der Krise?", 15 * mm),
        ]),
        p("Ablage und Zugriff", "h2"),
        row([
            field_box("Der Ausdruck liegt hier", "Ort, Mappe, Ansprechperson", 12 * mm),
            field_box("Diese Personen dürfen ihn im Ernstfall nutzen", "", 12 * mm),
        ]),
        callout(
            "<b>Regelmässig prüfen:</b> Kontakte, Zuständigkeiten und Wünsche verändern sich. Nach einer Episode oder "
            "spätestens alle sechs Monate gemeinsam kurz aktualisieren.",
        ),
        Spacer(1, 1.5 * mm),
        row([
            field_box("Dieser Plan gilt ab", height=8 * mm),
            field_box("Nächste Überprüfung", height=8 * mm),
            field_box("Beide einverstanden", "Ja / Nein / noch offen", 8 * mm),
        ]),
        HRFlowable(width="100%", thickness=0.4, color=LINE, spaceBefore=1 * mm, spaceAfter=1.5 * mm),
        p(
            "Erstellen Sie diesen Plan gemeinsam in einer stabilen Phase - idealerweise mit Unterstützung des Behandlungsteams. "
            "In akuter Selbst- oder Fremdgefährdung nicht weiter ausfüllen, sondern Notfallwege nutzen.",
            "small",
        ),
        *source_block(),
    ]

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    apply_pdf_metadata(output_path)


if __name__ == "__main__":
    build_pdf(OUTPUT_PATH)
    print(f"OK {OUTPUT_PATH.relative_to(PROJECT_ROOT)}")
