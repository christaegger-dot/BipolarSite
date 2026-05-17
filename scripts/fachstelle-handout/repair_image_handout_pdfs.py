#!/usr/bin/env python3
"""Regenerate image-led handout PDFs with metadata and extractable text.

The source handouts HO-27 and HO-28 are image-led infographics. This helper
keeps the approved visible PNG page intact, but adds a transparent text layer so
repo release audits and basic text extraction no longer treat the PDFs as
image-only files.

This is a release-audit repair, not a PDF/UA remediation path.
"""

from __future__ import annotations

from pathlib import Path
from tempfile import NamedTemporaryFile

import pikepdf
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfgen import canvas


PROJECT_ROOT = Path(__file__).resolve().parents[2]
HANDOUT_DIR = PROJECT_ROOT / "src" / "handouts"
PAGE_SIZE = landscape(A4)


HANDOUTS = [
    {
        "key": "a9_schlaf_fruehwarnsystem",
        "title": "Schlaf als Frühwarnsystem",
        "subtitle": "Warum Schlafveränderungen die erste Warnung vor einer Episode sind",
        "png": HANDOUT_DIR / "a9_schlaf_fruehwarnsystem.png",
        "pdf": HANDOUT_DIR / "a9_schlaf_fruehwarnsystem.pdf",
        "text": """
FACHSTELLE ANGEHÖRIGENARBEIT · ORIENTIERUNGSBLATT

Schlaf als Frühwarnsystem
Warum der Schlafrhythmus bei der bipolaren Störung oft das erste und wichtigste Warnzeichen für eine neue Episode ist.

Der Taktgeber des Gehirns
Für Menschen mit einer bipolaren Störung ist Schlaf nicht nur Erholung, sondern ein zentraler Stabilisator. Der Schlaf-Wach-Rhythmus ist eng mit der Stimmungsregulation verknüpft. Veränderungen im Schlafverhalten treten oft Tage oder sogar Wochen vor den eigentlichen Stimmungsschwankungen auf.

Ein wichtiges Warnsignal für Manie
2 Nächte < 6 Stunden oder 1 Nacht < 4 Stunden — und trotzdem energiegeladen.
Wenn die erkrankte Person deutlich weniger schläft, sich am nächsten Tag aber nicht müde, sondern leistungsfähig fühlt, ist dies ein hochgradiges Warnsignal für eine beginnende Manie.

Schlaf und Depression
Auch vor einer depressiven Episode verändert sich der Schlaf oft drastisch. Dies kann sich als extremes Schlafbedürfnis (Hypersomnie) äussern, bei dem die Person 10–14 Stunden schläft und trotzdem erschöpft bleibt, oder als quälende Schlaflosigkeit (Insomnie) mit frühem Erwachen und Grübeln.

Der typische Verlauf
Rhythmus: Schlaf ist stabil. Erste Risse: Schlaf verändert sich. Kipppunkt: Energie und Stimmung folgen. Episode: Manie oder Depression.

Was Sie als Angehörige tun können
Vorab klären: Besprechen Sie in einer stabilen Phase, dass Sie auf den Schlaf achten werden. Vereinbaren Sie, was passiert, wenn das Warnsignal eintritt, zum Beispiel Arzt anrufen oder Notfallmedikation.
Beobachten, nicht kontrollieren: Teilen Sie Ihre Beobachtung sachlich mit, ohne Vorwürfe zu machen.
Reize reduzieren: Helfen Sie, abends Ruhe einkehren zu lassen, mit weniger Licht und ohne aufregende Diskussionen.

Grenzen der Verantwortung
Sie können warnen und unterstützen, aber Sie können niemanden zum Schlafen zwingen. Wenn die Situation eskaliert, greift der Krisenplan.

Fachstelle Angehörigenarbeit, Psychiatrische Universitätsklinik Zürich · Stand: Mai 2026
Quellen: Harvey, A. G., Kaplan, K. A. & Soehner, A. M. (2015). Interventions for Sleep Disturbance in Bipolar Disorder. Sleep Medicine Clinics, 10(1), 101–105. doi: 10.1016/j.jsmc.2014.11.005 · Schärer, L. (2015). Frühwarnsysteme ohne Krampf. DGBS.
""".strip(),
    },
    {
        "key": "b11_hypervigilanz_erschoepfung",
        "title": "Ständige Wachsamkeit und Erschöpfung",
        "subtitle": "Warum Hypervigilanz Angehörige in chronische Erschöpfung treibt",
        "png": HANDOUT_DIR / "b11_hypervigilanz_erschoepfung.png",
        "pdf": HANDOUT_DIR / "b11_hypervigilanz_erschoepfung.pdf",
        "text": """
FACHSTELLE ANGEHÖRIGENARBEIT · ORIENTIERUNGSBLATT

Ständige Wachsamkeit und Erschöpfung
Warum der Versuch, die nächste Krise rechtzeitig zu erkennen, Angehörige oft in eine chronische Erschöpfung treiben kann.

Das Radar ist immer an
Nach den ersten Krisen entwickeln viele Angehörige eine erhöhte Wachsamkeit (Hypervigilanz). Sie scannen unbewusst Stimmung, Schlaf und Verhalten der erkrankten Person. Jedes Lachen kann wie der Beginn einer Manie wirken, jeder Rückzug wie der Start einer Depression.

Eine normale Reaktion, die auf Dauer erschöpft
Diese Wachsamkeit ist eine normale Reaktion auf erlebte Unberechenbarkeit. Das Gehirn versucht, durch Kontrolle Sicherheit herzustellen. Auf Dauer hält dieser Zustand den Körper jedoch im Stressmodus und lässt kaum echte Erholung zu.

Die Illusion der Kontrolle
«Wenn ich nur gut genug aufpasse, kann ich die nächste Episode verhindern.» Diese Idee ist verständlich — aber sie überfordert. Angehörige können Warnzeichen bemerken und Unterstützung anstossen; sie können eine Episode durch Beobachtung allein nicht verhindern.

Die Erosionskurve der Kraft
Rote Linie: Kraftverlust durch Dauer-Wachsamkeit. Türkise Säulen: Gegenkräfte, die Entlastung schaffen. Akute Sorge, Dauer-Scan, Erschöpfung, Kipppunkt. Anhaltende Wachsamkeit schützt kurzfristig — kostet aber langfristig Kraft.

Gegenkräfte aufbauen
Verantwortung teilen: Die Hauptverantwortung für Stabilität liegt bei der erkrankten Person und dem Behandlungsteam. Sie sind Begleitung, nicht Therapeut:in.
Krankheitsfreie Zonen: Vereinbaren Sie Zeiten oder Räume, in denen die Erkrankung nicht im Mittelpunkt steht.
Radar-Pausen: Erlauben Sie sich Momente, in denen Sie nicht scannen. Nicht jedes Signal muss sofort geprüft werden.

Selbstschutz ist kein Verrat
Wenn Sie selbst ausbrennen, bricht ein wichtiges Stützsystem weg. Für sich selbst zu sorgen und sich abzugrenzen, ist Voraussetzung, um langfristig helfen zu können.

Fachstelle Angehörigenarbeit, Psychiatrische Universitätsklinik Zürich · Stand: Mai 2026
Quellen: Phillips, R., Durkin, M., Engward, H., Cable, G. & Iancu, M. (2022). The impact of caring for family members with mental illnesses on the caregiver: a scoping review. Health Promotion International, 38, daac049. doi: 10.1093/heapro/daac049 · Wiesheu, A. (2009). Angehörige chronisch psychisch Kranker: Belastungen, Bedürfnisse und Coping.
""".strip(),
    },
]


def draw_searchable_text(c: canvas.Canvas, text: str) -> None:
    """Add an extractable text layer without changing the visible infographic."""
    c.saveState()
    c.setFont("Helvetica", 7)
    c.setFillColorRGB(0, 0, 0)
    if hasattr(c, "setFillAlpha"):
        c.setFillAlpha(0)

    x = 28
    y = PAGE_SIZE[1] - 24
    line_height = 8
    for paragraph in text.splitlines():
        line = paragraph.strip()
        if not line:
            y -= line_height
            continue
        while len(line) > 115:
            split_at = line.rfind(" ", 0, 115)
            if split_at < 60:
                split_at = 115
            c.drawString(x, y, line[:split_at])
            y -= line_height
            line = line[split_at:].strip()
        c.drawString(x, y, line)
        y -= line_height
        if y < 24:
            break
    c.restoreState()


def apply_metadata(pdf_path: Path, title: str, subtitle: str) -> None:
    with pikepdf.Pdf.open(pdf_path, allow_overwriting_input=True) as pdf:
        pdf.Root.Lang = pikepdf.String("de-CH")
        with pdf.open_metadata(set_pikepdf_as_editor=True) as metadata:
            metadata["dc:language"] = ["de-CH"]
            metadata["dc:title"] = title
            metadata["dc:description"] = subtitle
            metadata["dc:creator"] = ["PUK Zürich — Fachstelle Angehörigenarbeit"]
        pdf.save(pdf_path)


def render_handout(item: dict[str, object]) -> None:
    png_path = Path(item["png"])
    pdf_path = Path(item["pdf"])
    if not png_path.exists():
        raise FileNotFoundError(png_path)

    with NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp_path = Path(tmp.name)

    c = canvas.Canvas(str(tmp_path), pagesize=PAGE_SIZE)
    c.setTitle(str(item["title"]))
    c.setAuthor("PUK Zürich — Fachstelle Angehörigenarbeit")
    c.setSubject(str(item["subtitle"]))
    c.drawImage(str(png_path), 0, 0, width=PAGE_SIZE[0], height=PAGE_SIZE[1], preserveAspectRatio=False, mask="auto")
    draw_searchable_text(c, str(item["text"]))
    c.showPage()
    c.save()

    apply_metadata(tmp_path, str(item["title"]), str(item["subtitle"]))
    tmp_path.replace(pdf_path)
    print(f"Regenerated {pdf_path.relative_to(PROJECT_ROOT)}")


def main() -> int:
    for item in HANDOUTS:
        render_handout(item)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
