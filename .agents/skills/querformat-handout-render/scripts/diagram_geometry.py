#!/usr/bin/env python3
"""
diagram_geometry.py — Compute an exact SVG fragment for a structural diagram.

Supported --type values:
    cycle           N stations on a polygon, inner loop arrows, colour-coupled
                    exit badges. (The original, battle-tested generator.)
    sequence        Left-to-right (or wrapped) step chain with connecting arrows.
    pyramid         Stacked horizontal tiers, widest at the base.
    spannungsfeld   Two-pole tension field with labelled forces and middle zone.
    erosion         Descending relationship-substance curve with supporting pillars.
    waage           Balance/scale metaphor for relational load and counterweight.
    erosion_hybrid  Erosion curve plus concrete support anchors; current generator
                    for the Belastung-verstehen/Erosions handout family.

Rationale (unchanged across all types): diagram coordinates must never be
estimated by hand, and colours must be inline fill/stroke attributes — never
CSS classes — because WeasyPrint's SVG renderer applies class styles
unreliably.

Usage:
    python3 diagram_geometry.py --type cycle           > frag.txt
    python3 diagram_geometry.py --type sequence        > frag.txt
    python3 diagram_geometry.py --type pyramid         > frag.txt
    python3 diagram_geometry.py --type spannungsfeld   > frag.txt
    python3 diagram_geometry.py --type erosion         > frag.txt
    python3 diagram_geometry.py --type waage           > frag.txt
    python3 diagram_geometry.py --type erosion_hybrid  > frag.txt

Each type has its own CONFIG block below. Tune there, or import build_<type>()
programmatically.

Which type to use is decided UPSTREAM by the fachstelle-handout
visualisation taxonomy (Spec §6) and references/didaktisches-reasoning.md —
this script only renders the chosen structure exactly.
"""
import math
import argparse

# ===================== SHARED HELPERS =====================

def _unit(ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    L = math.hypot(dx, dy)
    return dx / L, dy / L, L


def _f(v):
    return f"{v:.1f}"


def _indent(lines):
    return "\n".join("          " + ln if ln else "" for ln in lines)


FONT_NUM  = "Liberation Sans, Arial, sans-serif"
FONT_NAME = "DejaVu Serif, Georgia, serif"

# Palette shared by all types. Adjust per site design system if needed
# (Sand/Aubergine/Salbei here; swap for the Bipolar tokens elsewhere).
PAL = {
    "ink":       "#4A2E44",   # primary stroke / names
    "accent":    "#1A6B72",   # numbers
    "muted":     "#6F6168",
    "fill":      "#FAF4E7",   # node fill
    "exit":      "#4A5F46",   # exits / coupled badges (salbei)
    "badge_txt": "#FFFFFF",
}

VIEWBOX_W, VIEWBOX_H = 480, 400


# ===================== TYPE: CYCLE =====================
# (Carried over unchanged from the validated cycle_geometry.py.)

CYCLE_CFG = dict(
    CX=240.0, CY=200.0, R=132.0, r=52.0, GAP=5.0, AL=10.0, AW=4.6,
    BADGE_R=10.5,
    STATIONS=["Anspannung", "Bitte um Hilfe", "Akkommodation",
              "Entlastung", "Verstärkung"],
    EXIT_AT=[1, 2, 3],
)


def build_cycle(cfg=CYCLE_CFG):
    CX, CY = cfg["CX"], cfg["CY"]
    R, r = cfg["R"], cfg["r"]
    GAP, AL, AW = cfg["GAP"], cfg["AL"], cfg["AW"]
    BADGE_R = cfg["BADGE_R"]
    STATIONS, EXIT_AT = cfg["STATIONS"], cfg["EXIT_AT"]
    n = len(STATIONS)

    def sc(i):
        t = math.radians(360.0 / n * i)
        return (CX + R * math.sin(t), CY - R * math.cos(t))

    S = [sc(i) for i in range(n)]
    out = []

    for i in range(n):
        ax, ay = S[i]
        bx, by = S[(i + 1) % n]
        ux, uy, _ = _unit(ax, ay, bx, by)
        sx, sy = ax + (r + GAP) * ux, ay + (r + GAP) * uy
        ex, ey = bx - (r + GAP) * ux, by - (r + GAP) * uy
        bkx, bky = ex - AL * ux, ey - AL * uy
        px, py = -uy, ux
        c1 = (bkx + AW * px, bky + AW * py)
        c2 = (bkx - AW * px, bky - AW * py)
        out.append(f'<line x1="{_f(sx)}" y1="{_f(sy)}" x2="{_f(ex)}" '
                   f'y2="{_f(ey)}" stroke="{PAL["ink"]}" stroke-width="1.7" '
                   f'fill="none" stroke-linecap="round"/>')
        out.append(f'<polygon points="{_f(ex)},{_f(ey)} {_f(c1[0])},'
                   f'{_f(c1[1])} {_f(c2[0])},{_f(c2[1])}" '
                   f'fill="{PAL["ink"]}" stroke="none"/>')
    out.append("")
    for i, (x, y) in enumerate(S):
        out.append(f'<circle cx="{_f(x)}" cy="{_f(y)}" r="{_f(r)}" '
                   f'fill="{PAL["fill"]}" stroke="{PAL["ink"]}" '
                   f'stroke-width="1.4"/>')
        out.append(f'<text x="{_f(x)}" y="{_f(y-9)}" fill="{PAL["accent"]}" '
                   f'font-family="{FONT_NUM}" font-size="20" '
                   f'font-weight="700" text-anchor="middle">{i+1}</text>')
        out.append(f'<text x="{_f(x)}" y="{_f(y+14)}" fill="{PAL["ink"]}" '
                   f'font-family="{FONT_NAME}" font-size="12.5" '
                   f'font-weight="700" text-anchor="middle">'
                   f'{STATIONS[i]}</text>')
    out.append("")
    for idx in EXIT_AT:
        x, y = S[idx]
        rx, ry, _ = _unit(CX, CY, x, y)
        es = (x + (r + 3) * rx, y + (r + 3) * ry)
        ee = (x + (r + 22) * rx, y + (r + 22) * ry)
        bc = (x + (r + 22 + BADGE_R) * rx, y + (r + 22 + BADGE_R) * ry)
        out.append(f'<line x1="{_f(es[0])}" y1="{_f(es[1])}" '
                   f'x2="{_f(ee[0])}" y2="{_f(ee[1])}" '
                   f'stroke="{PAL["exit"]}" stroke-width="1.9" fill="none" '
                   f'stroke-linecap="round" stroke-dasharray="2.6 2.2"/>')
        out.append(f'<circle cx="{_f(bc[0])}" cy="{_f(bc[1])}" '
                   f'r="{_f(BADGE_R)}" fill="{PAL["exit"]}" stroke="none"/>')
        out.append(f'<text x="{_f(bc[0])}" y="{_f(bc[1]+3.6)}" '
                   f'fill="{PAL["badge_txt"]}" font-family="{FONT_NUM}" '
                   f'font-size="11" font-weight="700" '
                   f'text-anchor="middle">{idx+1}</text>')

    xs, ys = [], []
    for (x, y) in S:
        xs += [x - r, x + r]; ys += [y - r, y + r]
    for idx in EXIT_AT:
        x, y = S[idx]
        rx, ry, _ = _unit(CX, CY, x, y)
        xs.append(x + (r + 22 + 2 * BADGE_R) * rx)
        ys.append(y + (r + 22 + 2 * BADGE_R) * ry)
    return _wrap("cycle", out, min(xs), max(xs), min(ys), max(ys))


# ===================== TYPE: SEQUENCE =====================

SEQUENCE_CFG = dict(
    STEPS=["Auslöser", "Erste Reaktion", "Eskalation", "Umkehrpunkt",
           "Beruhigung"],
    BOX_W=76.0, BOX_H=66.0, GAP_X=14.0,
    MARGIN_X=14.0, ROW_Y=170.0, MAX_PER_ROW=5,
)


def build_sequence(cfg=SEQUENCE_CFG):
    """Left-to-right step chain. Wraps to a second row if MAX_PER_ROW
    exceeded (serpentine: row 2 reads right-to-left with a return arrow)."""
    STEPS = cfg["STEPS"]
    BW, BH = cfg["BOX_W"], cfg["BOX_H"]
    GX = cfg["GAP_X"]
    MX = cfg["MARGIN_X"]
    ROW_Y = cfg["ROW_Y"]
    MPR = cfg["MAX_PER_ROW"]
    n = len(STEPS)
    out = []

    # position each box
    pos = []
    for i in range(n):
        row = i // MPR
        col = i % MPR
        if row % 2 == 1:                       # serpentine: reverse odd rows
            col = MPR - 1 - col
        x = MX + col * (BW + GX)
        y = ROW_Y + row * (BH + 46)
        pos.append((x, y, row))

    # connecting arrows (between consecutive steps)
    for i in range(n - 1):
        x0, y0, r0 = pos[i]
        x1, y1, r1 = pos[i + 1]
        if r0 == r1:
            # horizontal arrow within a row
            if x1 > x0:                        # rightward
                sx, ex = x0 + BW, x1
            else:                              # leftward (serpentine row)
                sx, ex = x0, x1 + BW
            yy = y0 + BH / 2
            out.append(f'<line x1="{_f(sx)}" y1="{_f(yy)}" x2="{_f(ex)}" '
                       f'y2="{_f(yy)}" stroke="{PAL["ink"]}" '
                       f'stroke-width="1.7" stroke-linecap="round"/>')
            d = 1 if ex > sx else -1
            out.append(f'<polygon points="{_f(ex)},{_f(yy)} '
                       f'{_f(ex-7*d)},{_f(yy-4)} {_f(ex-7*d)},{_f(yy+4)}" '
                       f'fill="{PAL["ink"]}" stroke="none"/>')
        else:
            # vertical drop to next row (serpentine turn)
            xx = x0 + BW / 2 if (r0 % 2 == 0) else x0 + BW / 2
            sy, ey = y0 + BH, y1
            out.append(f'<line x1="{_f(xx)}" y1="{_f(sy)}" x2="{_f(xx)}" '
                       f'y2="{_f(ey)}" stroke="{PAL["ink"]}" '
                       f'stroke-width="1.7" stroke-linecap="round"/>')
            out.append(f'<polygon points="{_f(xx)},{_f(ey)} '
                       f'{_f(xx-4)},{_f(ey-7)} {_f(xx+4)},{_f(ey-7)}" '
                       f'fill="{PAL["ink"]}" stroke="none"/>')
    out.append("")
    # boxes + labels
    for i, (x, y, _r) in enumerate(pos):
        out.append(f'<rect x="{_f(x)}" y="{_f(y)}" width="{_f(BW)}" '
                   f'height="{_f(BH)}" rx="6" fill="{PAL["fill"]}" '
                   f'stroke="{PAL["ink"]}" stroke-width="1.4"/>')
        out.append(f'<text x="{_f(x+BW/2)}" y="{_f(y+20)}" '
                   f'fill="{PAL["accent"]}" font-family="{FONT_NUM}" '
                   f'font-size="17" font-weight="700" '
                   f'text-anchor="middle">{i+1}</text>')
        # wrap long labels: break to <=9 chars/line, hard-split overlong
        # single words so nothing exceeds the box width.
        words = STEPS[i].split()
        parts = []
        for w in words:
            while len(w) > 11:
                parts.append(w[:11])
                w = w[11:]
            parts.append(w)
        lines, cur = [], ""
        for w in parts:
            if len(cur + " " + w) <= 11 or not cur:
                cur = (cur + " " + w).strip()
            else:
                lines.append(cur); cur = w
        if cur:
            lines.append(cur)
        lines = lines[:3]
        ty0 = y + 42 if len(lines) == 1 else (y + 36 if len(lines) == 2
                                              else y + 30)
        for li, ln in enumerate(lines):
            out.append(f'<text x="{_f(x+BW/2)}" y="{_f(ty0+li*12)}" '
                       f'fill="{PAL["ink"]}" font-family="{FONT_NAME}" '
                       f'font-size="9.5" font-weight="700" '
                       f'text-anchor="middle">{ln}</text>')

    xs = [p[0] for p in pos] + [p[0] + BW for p in pos]
    ys = [p[1] for p in pos] + [p[1] + BH for p in pos]
    return _wrap("sequence", out, min(xs), max(xs), min(ys), max(ys))


# ===================== TYPE: PYRAMID =====================

PYRAMID_CFG = dict(
    # top tier first; base last (widest)
    TIERS=["Selbstverwirklichung", "Wertschätzung", "Zugehörigkeit",
           "Sicherheit", "Grundbedürfnisse"],
    APEX_X=240.0, APEX_Y=70.0,
    BASE_W=300.0, TOTAL_H=250.0,
)


def build_pyramid(cfg=PYRAMID_CFG):
    """Stacked trapezoidal tiers, widest at the base. Tier 0 = apex."""
    TIERS = cfg["TIERS"]
    AX, AY = cfg["APEX_X"], cfg["APEX_Y"]
    BASE_W = cfg["BASE_W"]
    TOTAL_H = cfg["TOTAL_H"]
    n = len(TIERS)
    tier_h = TOTAL_H / n
    out = []

    # width grows linearly from a small apex to BASE_W
    def half_w(level_bottom_frac):
        return (BASE_W * level_bottom_frac) / 2.0

    for i in range(n):
        top_frac = i / n
        bot_frac = (i + 1) / n
        yt = AY + i * tier_h
        yb = AY + (i + 1) * tier_h
        htw = half_w(top_frac)
        hbw = half_w(bot_frac)
        pts = [(AX - htw, yt), (AX + htw, yt),
               (AX + hbw, yb), (AX - hbw, yb)]
        pstr = " ".join(f"{_f(px)},{_f(py)}" for px, py in pts)
        fill = PAL["fill"] if i % 2 == 0 else "#F1E4D9"
        out.append(f'<polygon points="{pstr}" fill="{fill}" '
                   f'stroke="{PAL["ink"]}" stroke-width="1.4"/>')
        # Place the label LOW in the tier, where the trapezoid is widest,
        # not at the vertical centre (the apex tiers are too narrow there).
        label_y = yb - tier_h * 0.32
        avail_w = 2 * hbw - 14          # usable width near the tier base
        # font size scaled so the longest label roughly fits avail_w
        # (~0.62 * font-size per char for this serif at bold)
        label = TIERS[i]
        fs = min(14.0, max(8.5, avail_w / (len(label) * 0.62)))
        out.append(f'<text x="{_f(AX)}" y="{_f(label_y)}" '
                   f'fill="{PAL["ink"]}" font-family="{FONT_NAME}" '
                   f'font-size="{fs:.1f}" font-weight="700" '
                   f'text-anchor="middle">{label}</text>')

    xs = [AX - BASE_W / 2, AX + BASE_W / 2]
    ys = [AY, AY + TOTAL_H]
    return _wrap("pyramid", out, min(xs), max(xs), min(ys), max(ys))


# ===================== TYPE: SPANNUNGSFELD =====================
# Multipolare Spannung: N forces pull radially on a centre ("Ich"/person).
# Distinct from cycle: NO sequence, NO arrows between forces — every force
# pulls the centre SIMULTANEOUSLY. That simultaneity is the didactic point
# (see references/didaktisches-reasoning.md: "Gleichzeitigkeit, kein
# Mechanismus"). Each force = an outer node + a tension arrow pointing
# INWARD at the centre. The centre is the reader ("Ich").

SPANNUNGSFELD_CFG = dict(
    CX=240.0, CY=200.0,
    CENTRE_R=44.0,            # radius of the "Ich" centre disc
    FORCE_R=58.0,             # radius of each outer force node
    PLACE_R=132.0,            # centre -> force-node-centre distance
                              # (132+58=190 each side, fits 400 viewBox
                              #  centred at y=200 with safety margin)
    GAP=6.0,                  # clearance between arrow tip and centre edge
    AL=11.0, AW=5.0,          # tension-arrow head length / half-width
    CENTRE_LABEL="Ich",
    # name + one-line gloss per force; order = clockwise from top
    FORCES=[
        ("Bindung",     "Liebe, Geschichte, Hoffnung"),
        ("Erschöpfung", "Daueranspannung, wenig Kraft"),
        ("Verlust",     "Nähe und Leichtigkeit fehlen"),
        ("Schuld",      "Grenzen fühlen sich wie Verrat"),
    ],
)


def build_spannungsfeld(cfg=SPANNUNGSFELD_CFG):
    CX, CY = cfg["CX"], cfg["CY"]
    CR = cfg["CENTRE_R"]
    FR = cfg["FORCE_R"]
    PR = cfg["PLACE_R"]
    GAP, AL, AW = cfg["GAP"], cfg["AL"], cfg["AW"]
    FORCES = cfg["FORCES"]
    n = len(FORCES)

    def fc(i):
        # clockwise from top; for 4 forces this is a clean diamond
        t = math.radians(360.0 / n * i)
        return (CX + PR * math.sin(t), CY - PR * math.cos(t))

    F = [fc(i) for i in range(n)]
    out = []

    # 1. Tension arrows: from each force node EDGE inward to the centre EDGE.
    #    Pointing at the centre = the centre (the person) is pulled.
    for (fx, fy) in F:
        ux, uy, _ = _unit(fx, fy, CX, CY)          # force -> centre
        sx, sy = fx + FR * ux, fy + FR * uy        # start at force edge
        ex, ey = CX - (CR + GAP) * ux, CY - (CR + GAP) * uy  # stop at centre edge
        bkx, bky = ex - AL * ux, ey - AL * uy
        px, py = -uy, ux
        c1 = (bkx + AW * px, bky + AW * py)
        c2 = (bkx - AW * px, bky - AW * py)
        out.append(f'<line x1="{_f(sx)}" y1="{_f(sy)}" x2="{_f(ex)}" '
                   f'y2="{_f(ey)}" stroke="{PAL["exit"]}" '
                   f'stroke-width="2.0" fill="none" stroke-linecap="round"/>')
        out.append(f'<polygon points="{_f(ex)},{_f(ey)} {_f(c1[0])},'
                   f'{_f(c1[1])} {_f(c2[0])},{_f(c2[1])}" '
                   f'fill="{PAL["exit"]}" stroke="none"/>')
    out.append("")

    # 2. Force nodes (outer). Name + gloss, no number — they are not
    #    ordered steps; numbering would imply a sequence that isn't there.
    for i, (fx, fy) in enumerate(F):
        name, gloss = FORCES[i]
        out.append(f'<circle cx="{_f(fx)}" cy="{_f(fy)}" r="{_f(FR)}" '
                   f'fill="{PAL["fill"]}" stroke="{PAL["ink"]}" '
                   f'stroke-width="1.4"/>')
        out.append(f'<text x="{_f(fx)}" y="{_f(fy-4)}" fill="{PAL["ink"]}" '
                   f'font-family="{FONT_NAME}" font-size="14" '
                   f'font-weight="700" text-anchor="middle">{name}</text>')
        # wrap gloss to <=16 chars/line, max 3 lines (kept inside FORCE_R)
        words = gloss.split()
        lines, cur = [], ""
        for w in words:
            if len(cur + " " + w) <= 16 or not cur:
                cur = (cur + " " + w).strip()
            else:
                lines.append(cur); cur = w
        if cur:
            lines.append(cur)
        lines = lines[:3]
        gy0 = fy + 12 if len(lines) <= 2 else fy + 10
        for li, ln in enumerate(lines):
            out.append(f'<text x="{_f(fx)}" y="{_f(gy0+li*11)}" '
                       f'fill="{PAL["muted"]}" font-family="{FONT_NAME}" '
                       f'font-style="italic" font-size="8.5" '
                       f'text-anchor="middle">{ln}</text>')
    out.append("")

    # 3. Centre disc LAST so the arrowheads sit visually behind its edge.
    out.append(f'<circle cx="{_f(CX)}" cy="{_f(CY)}" r="{_f(CR)}" '
               f'fill="{PAL["exit"]}" stroke="none"/>')
    out.append(f'<text x="{_f(CX)}" y="{_f(CY+6)}" '
               f'fill="{PAL["badge_txt"]}" font-family="{FONT_NAME}" '
               f'font-size="18" font-weight="700" '
               f'text-anchor="middle">{cfg["CENTRE_LABEL"]}</text>')

    xs, ys = [], []
    for (fx, fy) in F:
        xs += [fx - FR, fx + FR]; ys += [fy - FR, fy + FR]
    return _wrap("spannungsfeld", out, min(xs), max(xs), min(ys), max(ys))


# ===================== TYPE: EROSION =====================
# Didaktische Brücke (Schritt 0, fünf Erosions-Quelltexte):
#   1. Es geht ABWÄRTS — Beziehungssubstanz nimmt ab. -> fallende Bahn,
#      keine neutrale Horizontale.
#   2. RATSCHE (aus b2 "Beziehung unter Druck"): jede Episode lässt etwas
#      zurück, der Pegel kehrt nie ganz auf das alte Niveau zurück. ->
#      Treppe: kurzer Teil-Anstieg ("Erholung"), aber Boden tiefer als
#      vor der Episode. Das ist der Kern; ohne ihn verharmlost das Bild.
#   3. GEGENKRÄFTE (aus d4 "Was langfristig trägt"): tragende Säulen
#      bremsen das Abgleiten. -> Stützen, die von unten an der Bahn
#      ansetzen und sie abfangen, nicht die Erosion leugnen.
# Bewusst KEIN Pfeil-Kreis (kein Zyklus) und KEINE neutrale Sequenz:
# beide würden die gerichtete Verschlechterung unterschlagen.

EROSION_CFG = dict(
    X0=70.0, X1=430.0,          # Bahn-Spanne (innerhalb viewBox 480)
    Y_TOP=70.0, Y_BOT=300.0,    # oberer Start / tiefster Pegel
    N_EP=4,                     # Anzahl Episoden (Ratschen-Stufen)
    REBOUND=0.42,               # Anteil der Stufe, der sich "erholt"
    LABEL_TOP="Beziehungssubstanz: Vertrauen · Nähe · Leichtigkeit",
    PILLARS=["Verständnis", "Inseln", "faire Last",
             "Krisenplan", "Entlastung"],
    PILLAR_LABEL="Tragende Säulen bremsen das Abgleiten",
)


def build_erosion(cfg=EROSION_CFG):
    X0, X1 = cfg["X0"], cfg["X1"]
    YT, YB = cfg["Y_TOP"], cfg["Y_BOT"]
    N = cfg["N_EP"]
    REB = cfg["REBOUND"]
    out = []

    # --- Ratschen-Bahn berechnen --------------------------------------
    # Jede Episode: kurzer Abfall (Krise) + Teil-Erholung (Rebound),
    # aber Netto-Boden sinkt pro Episode. Punkte als Polyline.
    span_x = X1 - X0
    span_y = YB - YT
    step_x = span_x / (N + 0.5)
    step_y = span_y / N
    pts = [(X0, YT)]
    x, y = X0, YT
    for i in range(N):
        # Krisen-Abfall (steil herunter)
        x += step_x * 0.55
        y += step_y
        pts.append((x, y))
        # Teil-Erholung (kürzer hoch, REB < 1 -> nie ganz zurück)
        x += step_x * 0.45
        y -= step_y * REB
        pts.append((x, y))
    # bis zum rechten Rand ausziehen
    pts.append((X1, y))

    poly = " ".join(f"{_f(px)},{_f(py)}" for px, py in pts)
    out.append(f'<polyline points="{poly}" fill="none" '
               f'stroke="{PAL["ink"]}" stroke-width="2.6" '
               f'stroke-linejoin="round" stroke-linecap="round"/>')

    # Episoden-Tiefpunkte markieren (die "Ratschen-Zähne")
    for i in range(1, len(pts) - 1, 2):
        px, py = pts[i]
        out.append(f'<circle cx="{_f(px)}" cy="{_f(py)}" r="3.4" '
                   f'fill="{PAL["ink"]}" stroke="none"/>')
    out.append("")

    # --- Referenzlinie "Ausgangsniveau" -------------------------------
    # Gestrichelt auf Höhe Y_TOP: macht sichtbar, wie weit der Pegel
    # unter den Startwert gefallen ist (die Ratsche wird messbar).
    out.append(f'<line x1="{_f(X0)}" y1="{_f(YT)}" x2="{_f(X1)}" '
               f'y2="{_f(YT)}" stroke="{PAL["muted"]}" '
               f'stroke-width="1.0" stroke-dasharray="3,3"/>')
    out.append(f'<text x="{_f(X0)}" y="{_f(YT - 8)}" '
               f'fill="{PAL["muted"]}" font-family="{FONT_NAME}" '
               f'font-size="10" font-style="italic">'
               f'{cfg["LABEL_TOP"]}</text>')
    out.append("")

    # --- Gegenkräfte: tragende Säulen ---------------------------------
    # Setzen UNTER der Endbahn an und stützen nach oben (bremsen das
    # Abgleiten). Bewusst unter dem tiefsten Punkt, damit klar wird:
    # sie leugnen die Erosion nicht, sie fangen sie ab.
    pillars = cfg["PILLARS"]
    np_ = len(pillars)
    base_y = YB + 56
    seg = (X1 - X0) / np_
    for i, name in enumerate(pillars):
        cx = X0 + seg * (i + 0.5)
        top_y = YB + 14
        # Stütze (vertikaler Träger)
        out.append(f'<line x1="{_f(cx)}" y1="{_f(base_y)}" '
                   f'x2="{_f(cx)}" y2="{_f(top_y)}" '
                   f'stroke="{PAL["exit"]}" stroke-width="3.0" '
                   f'stroke-linecap="round"/>')
        # Auflager-Dreieck (drückt nach oben gegen die Bahn)
        out.append(f'<polygon points="{_f(cx)},{_f(top_y - 9)} '
                   f'{_f(cx - 6)},{_f(top_y)} {_f(cx + 6)},{_f(top_y)}" '
                   f'fill="{PAL["exit"]}" stroke="none"/>')
        # Säulen-Label
        out.append(f'<text x="{_f(cx)}" y="{_f(base_y + 14)}" '
                   f'fill="{PAL["ink"]}" font-family="{FONT_NAME}" '
                   f'font-size="10.5" text-anchor="middle">{name}</text>')
    out.append(f'<text x="{_f((X0 + X1) / 2)}" y="{_f(base_y + 32)}" '
               f'fill="{PAL["muted"]}" font-family="{FONT_NAME}" '
               f'font-size="10" font-style="italic" '
               f'text-anchor="middle">{cfg["PILLAR_LABEL"]}</text>')

    xs = [X0 - 4, X1 + 4]
    ys = [YT - 22, base_y + 38]
    return _wrap("erosion", out, min(xs), max(xs), min(ys), max(ys))


# ===================== TYPE: EROSION_HYBRID =====================
# Synthese aus erosion + waage (Schritt 0, fünf Erosions-Quelltexte +
# Vergleichsrunde). Nimmt von jeder Vorvariante das Bewährte:
#   - von EROSION: die ZEIT. Ratschen-Kurve, die über Episoden
#     abgleitet und nie ganz auf den Startwert zurückkehrt (b2).
#     Das ist das didaktische Herzstück, das die fünf Blätter
#     überhaupt zu EINEM Mechanismus zusammenführbar macht.
#   - von WAAGE: die ehrliche WIRKUNG der Gegenkraft. Die Säulen
#     sind kein isoliertes Dekor mehr (Mangel der erosion-Skizze),
#     sondern setzen sichtbar an der Kurve an.
# Die didaktische Gratwanderung (KERN dieses Generators):
#   Die Säulen dürfen die Erosion NICHT hart stoppen (zu optimistisch,
#   untreu zu d4 "Was langfristig trägt": dort heisst es nicht
#   "Säulen stoppen die Erosion", sondern "erhöhen Tragfähigkeit,
#   schwächste Säule zuerst"). Sie dürfen sie auch nicht unverändert
#   lassen (zu pessimistisch, untreu zur Entlastungsbotschaft aller
#   fünf Texte). Ehrliche Mitte: ZWEI REGIME. Phase 1 = steiler
#   Abfall, volle Ratsche, ohne Gegenkraft. Ab Säulen-Ansatzpunkt
#   Phase 2 = die Kurve gleitet WEITER ab, aber sichtbar FLACHER.
#   Die Erosion hört nicht auf; sie verlangsamt sich. Genau das ist
#   die einzige Aussage, die allen fünf Quelltexten treu ist.

EROSION_HYBRID_CFG = dict(
    X0=66.0, X1=434.0,
    Y_TOP=78.0, Y_BOT=250.0,
    N_EP1=2,                    # Episoden in Phase 1 (ohne Gegenkraft)
    N_EP2=2,                    # Episoden in Phase 2 (mit Säulen, flacher)
    REBOUND=0.40,               # Teil-Erholung je Episode (<1 = Ratsche)
    SLOWDOWN=0.45,              # Phase-2-Abfall = SLOWDOWN * Phase-1-Abfall
    LABEL_TOP="Was die Beziehung trägt: Vertrauen · Nähe · Leichtigkeit",
    PILLARS=["Verstehen", "Inseln", "faire Last",
             "Krisenplan", "Entlastung"],
    PILLAR_LABEL="Schutzfaktoren bremsen den Abwärtstrend — Schritt für Schritt",
    # (PHASE1_NOTE/PHASE2_NOTE entfernt: die Phasen-Notizen wurden aus
    #  dem Generator gestrichen — Kollision mit gedrehten Namen +
    #  Redundanz zu PILLAR_LABEL. Kein totes Config-Feld zurücklassen.)
)


def build_erosion_hybrid(cfg=EROSION_HYBRID_CFG):
    X0, X1 = cfg["X0"], cfg["X1"]
    YT, YB = cfg["Y_TOP"], cfg["Y_BOT"]
    N1, N2 = cfg["N_EP1"], cfg["N_EP2"]
    REB = cfg["REBOUND"]
    SLOW = cfg["SLOWDOWN"]
    out = []

    # --- Kurve in zwei Regimen berechnen ------------------------------
    # Phase 1: N1 Episoden, voller Abfall pro Episode (step_y1).
    # Phase 2: N2 Episoden, gedämpfter Abfall (step_y1 * SLOW) -> die
    #          Kurve fällt weiter, aber die Steigung ist sichtbar
    #          geringer. DAS ist die ehrliche Wirkung der Gegenkraft.
    span_x = X1 - X0
    total_ep = N1 + N2
    step_x = span_x / (total_ep + 0.6)
    # Phase-1-Tiefe so wählen, dass Gesamtbild in [YT, YB] bleibt
    step_y1 = (YB - YT) / (N1 + N2 * SLOW) * 0.92
    step_y2 = step_y1 * SLOW

    pts = [(X0, YT)]
    x, y = X0, YT
    # Phase 1 — ohne Gegenkraft, steil
    for _ in range(N1):
        x += step_x * 0.55
        y += step_y1
        pts.append((x, y))
        x += step_x * 0.45
        y -= step_y1 * REB
        pts.append((x, y))
    x_pillar_start = x          # hier setzen die Säulen an
    # Phase 2 — mit Säulen, flacher
    for _ in range(N2):
        x += step_x * 0.55
        y += step_y2
        pts.append((x, y))
        x += step_x * 0.45
        y -= step_y2 * REB
        pts.append((x, y))
    pts.append((X1, y))
    y_curve_end = y

    poly = " ".join(f"{_f(px)},{_f(py)}" for px, py in pts)
    out.append(f'<polyline points="{poly}" fill="none" '
               f'stroke="{PAL["ink"]}" stroke-width="2.6" '
               f'stroke-linejoin="round" stroke-linecap="round"/>')

    # Ratschen-Zähne (Episoden-Tiefpunkte) markieren
    for i in range(1, len(pts) - 1, 2):
        px, py = pts[i]
        out.append(f'<circle cx="{_f(px)}" cy="{_f(py)}" r="3.2" '
                   f'fill="{PAL["ink"]}" stroke="none"/>')

    # Vertikale Trennlinie: hier wechselt das Regime
    out.append(f'<line x1="{_f(x_pillar_start)}" y1="{_f(YT - 6)}" '
               f'x2="{_f(x_pillar_start)}" y2="{_f(YB + 70)}" '
               f'stroke="{PAL["muted"]}" stroke-width="0.8" '
               f'stroke-dasharray="2,3"/>')
    out.append("")

    # --- Referenzlinie Ausgangsniveau (Ratsche messbar machen) --------
    out.append(f'<line x1="{_f(X0)}" y1="{_f(YT)}" x2="{_f(X1)}" '
               f'y2="{_f(YT)}" stroke="{PAL["muted"]}" '
               f'stroke-width="1.0" stroke-dasharray="3,3"/>')
    out.append(f'<text x="{_f(X0)}" y="{_f(YT - 8)}" '
               f'fill="{PAL["muted"]}" font-family="{FONT_NAME}" '
               f'font-size="10" font-style="italic">'
               f'{cfg["LABEL_TOP"]}</text>')

    # --- MECHANISMUS-MARKIERUNG (Schritt-0-Nachjustierung) -----------
    # Didaktischer Grund: Die fallende Kurve allein erklärt nicht,
    # WARUM sie fällt. Eine Leserin ohne den begleitenden Fliesstext
    # könnte das Abgleiten als Schicksal lesen — genau die schwerste
    # Fehl-Lesart, denn die entlastende Kernbotschaft aller fünf
    # Quelltexte ist: dies ist ein erkennbares Muster, kein Verhängnis
    # und kein persönliches Versagen. Diese eine kurze, ruhige Zeile
    # rahmt die steile Phase als Mechanismus.
    # Position: oberer linker Leerraum (zwischen Referenzlinie y=YT
    # und der erst tiefer verlaufenden Kurve). Vollständige Vorab-
    # Geometrie gegen ALLE Elemente gerechnet (Ref-Label, Kurve,
    # Trennlinie, viewBox-Rand) — konservativ gesetzt mit Puffer:
    # bewusst weiter links/höher als das rechnerische Limit (x=236),
    # damit kleine Render-Abweichungen nicht in Kollision kippen.
    mark_x = X0 + 6
    mark_y = YT + 24
    out.append(f'<text x="{_f(mark_x)}" y="{_f(mark_y)}" '
               f'fill="{PAL["exit"]}" font-family="{FONT_NAME}" '
               f'font-size="9.5" font-style="italic" '
               f'text-anchor="start">'
               f'Schleichendes Muster \u2014 kein Schicksal</text>')

    # --- DREI ENTFLOCHTENE TEXTEBENEN (Behebung der Kollision) --------
    # Ursache des alten Mangels: Säulennamen (YB+70), Phasen-Notizen
    # (YB+78) und Sammelbeschriftung (YB+88) lagen übereinander.
    # ENTWICKLUNG: Die früher hier sitzenden Phasen-Notizen
    # ("ohne Gegenkraft: steiler Abfall" / "mit Säulen: flacher")
    # wurden ENTFERNT. Grund: (1) sie kollidierten mit den gedrehten
    # Säulennamen, die senkrecht in ihr Band hineinreichen;
    # (2) sie waren inhaltlich redundant zur Sammelbeschriftung
    # LANE_C, die dasselbe in einem Satz sagt. Wegfall löst die
    # Kollision strukturell (kein Element mehr auf Wort-Höhe) UND
    # beseitigt die Redundanz — der sauberste Lösungstyp.
    # Verbleibend: nur noch eine Textebene unter den Säulen.
    #   LANE_C (YB+112): die eine knappe Sammelbeschriftung
    LANE_C = YB + 112

    # --- Gegenkräfte: Säulen, die an der Kurve ANSETZEN ---------------
    # Säulen stehen NUR in Phase 2 (didaktisch zwingend: erst ab
    # Regimewechsel). Behebung der horizontalen Enge: die fünf Säulen
    # über die VOLLE Phase-2-Breite spreizen, inkl. kleiner Innen-
    # Randzugabe, statt sie mittig zu drängen. Stütze endet kurz über
    # LANE_A, Name sitzt allein auf Ebene B (kollidiert mit nichts).
    pillars = cfg["PILLARS"]
    npl = len(pillars)
    base_y = YB + 30                       # Stützenfuss (über Ebene A)
    span2 = X1 - x_pillar_start
    pad = span2 * 0.06                      # kleine Innenrand-Zugabe
    usable = span2 - 2 * pad
    seg = usable / (npl - 1) if npl > 1 else usable
    for i, name in enumerate(pillars):
        cx = x_pillar_start + pad + seg * i
        top_y = YB + 8
        out.append(f'<line x1="{_f(cx)}" y1="{_f(base_y)}" '
                   f'x2="{_f(cx)}" y2="{_f(top_y)}" '
                   f'stroke="{PAL["exit"]}" stroke-width="2.4" '
                   f'stroke-linecap="round"/>')
        out.append(f'<polygon points="{_f(cx)},{_f(top_y - 8)} '
                   f'{_f(cx - 5)},{_f(top_y)} {_f(cx + 5)},{_f(top_y)}" '
                   f'fill="{PAL["exit"]}" stroke="none"/>')
        # --- Gedrehte Säulenbeschriftung (90°, wie Achsenlabel) ------
        # WARUM gedreht: fünf deutsche Wörter passen horizontal nicht
        # in die halbe Bildbreite (nachgerechnet: ~36px verfügbar,
        # ~60px je Wort nötig). Drehung verlegt die Wortlänge in die
        # vertikal reichlich vorhandene Achse.
        # KRITISCHE FEINHEIT (Ursache des früheren Waage-Fehlers):
        # transform="rotate(deg, px, py)" dreht den Text UM (px,py).
        # Drehpunkt MUSS exакt der Textanker sein, sonst schwingt das
        # Wort vom Sollort weg. Hier: Anker = Säulenfuss (cx, label_y),
        # text-anchor="end" -> nach -90°-Drehung hängt das Wort von
        # dort senkrecht NACH UNTEN, bündig an seiner Säule.
        label_y = base_y + 6
        out.append(f'<text x="{_f(cx)}" y="{_f(label_y)}" '
                   f'fill="{PAL["ink"]}" font-family="{FONT_NAME}" '
                   f'font-size="9.5" text-anchor="end" '
                   f'transform="rotate(-90 {_f(cx)} {_f(label_y)})">'
                   f'{name}</text>')

    # Ebene C — eine knappe Sammelbeschriftung (gekürzt; die lange
    # Erklärung gehört in den Fliesstext des Handouts, nicht ins Bild)
    out.append(f'<text x="{_f((X0 + X1) / 2)}" y="{_f(LANE_C)}" '
               f'fill="{PAL["muted"]}" font-family="{FONT_NAME}" '
               f'font-size="9.5" font-style="italic" '
               f'text-anchor="middle">{cfg["PILLAR_LABEL"]}</text>')

    xs = [X0 - 4, X1 + 4]
    ys = [YT - 22, LANE_C + 10]
    return _wrap("erosion_hybrid", out, min(xs), max(xs),
                 min(ys), max(ys))


# ===================== TYPE: WAAGE =====================
# Didaktische Brücke (Schritt 0): Gleichgewichts-Lesart desselben
# Mechanismus. Kernaussage NICHT "es geht bergab", sondern "es ist
# beeinflussbar". Eine Wippe: links die kumulierte Last, rechts die
# fünf tragenden Säulen. Der Balken neigt sich lastseitig — aber das
# Bild zeigt, dass schon EINE gestärkte Säule die Neigung ändert
# (entlastender Schlussgedanke aus d4: nicht alle Säulen zugleich,
# sondern die schwächste zuerst). Bewusst leicht last-geneigt, nicht
# waagrecht: waagrecht würde die reale Schwere verharmlosen.

WAAGE_CFG = dict(
    CX=240.0, PIVOT_Y=250.0, BEAM_LEN=300.0,
    TILT_DEG=11.0,              # Lastseite sinkt; >0, nicht 0
    FULCRUM_H=58.0,
    LOAD_LABEL="Kumulierte Belastung",
    LOAD_ITEMS=["Daueranspannung", "Verlust von Nähe",
                "Schonhaltung", "Isolation"],
    PILLAR_LABEL="Fünf tragende Säulen",
    PILLARS=["Verständnis", "Inseln", "faire Last",
             "Krisenplan", "Entlastung"],
    HINT="Schon eine gestärkte Säule verändert die Neigung",
)


def build_waage(cfg=WAAGE_CFG):
    CX = cfg["CX"]
    PY = cfg["PIVOT_Y"]
    BL = cfg["BEAM_LEN"]
    tilt = math.radians(cfg["TILT_DEG"])
    FH = cfg["FULCRUM_H"]
    out = []

    # Balken-Endpunkte (links = Last, sinkt; rechts = Säulen, steigt)
    half = BL / 2
    lx = CX - half * math.cos(tilt)
    ly = PY - half * math.sin(tilt) + 0  # links tiefer
    # links soll SINKEN -> y grösser links
    lx = CX - half * math.cos(tilt)
    ly = PY + half * math.sin(tilt)
    rx = CX + half * math.cos(tilt)
    ry = PY - half * math.sin(tilt)

    # --- Drehpunkt (Dreieck) ------------------------------------------
    out.append(f'<polygon points="{_f(CX)},{_f(PY)} '
               f'{_f(CX - 26)},{_f(PY + FH)} '
               f'{_f(CX + 26)},{_f(PY + FH)}" '
               f'fill="{PAL["exit"]}" stroke="none"/>')

    # --- Balken --------------------------------------------------------
    out.append(f'<line x1="{_f(lx)}" y1="{_f(ly)}" x2="{_f(rx)}" '
               f'y2="{_f(ry)}" stroke="{PAL["ink"]}" '
               f'stroke-width="4.0" stroke-linecap="round"/>')
    out.append(f'<circle cx="{_f(CX)}" cy="{_f(PY)}" r="4.5" '
               f'fill="{PAL["ink"]}" stroke="none"/>')
    out.append("")

    # --- Lastseite (links): gestapelter Block --------------------------
    bw, bh = 116.0, 20.0
    bx = lx - bw / 2
    by = ly - 14
    items = cfg["LOAD_ITEMS"]
    out.append(f'<text x="{_f(lx)}" y="{_f(by - 10 - len(items)*bh)}" '
               f'fill="{PAL["ink"]}" font-family="{FONT_NAME}" '
               f'font-size="11" font-weight="700" '
               f'text-anchor="middle">{cfg["LOAD_LABEL"]}</text>')
    for i, it in enumerate(items):
        ry_ = by - (i + 1) * bh
        out.append(f'<rect x="{_f(bx)}" y="{_f(ry_)}" width="{_f(bw)}" '
                   f'height="{_f(bh - 3)}" rx="2" '
                   f'fill="{PAL["fill"]}" stroke="{PAL["ink"]}" '
                   f'stroke-width="1.0"/>')
        out.append(f'<text x="{_f(lx)}" y="{_f(ry_ + bh - 8)}" '
                   f'fill="{PAL["ink"]}" font-family="{FONT_NAME}" '
                   f'font-size="9.5" text-anchor="middle">{it}</text>')
    # Verbinder Block -> Balken
    out.append(f'<line x1="{_f(lx)}" y1="{_f(by)}" x2="{_f(lx)}" '
               f'y2="{_f(ly)}" stroke="{PAL["ink"]}" '
               f'stroke-width="1.4"/>')
    out.append("")

    # --- Säulenseite (rechts): fünf Stützen ---------------------------
    pillars = cfg["PILLARS"]
    npl = len(pillars)
    grp_w = 150.0
    gx0 = rx - grp_w / 2
    pgap = grp_w / npl
    out.append(f'<text x="{_f(rx)}" y="{_f(ry - 78)}" '
               f'fill="{PAL["ink"]}" font-family="{FONT_NAME}" '
               f'font-size="11" font-weight="700" '
               f'text-anchor="middle">{cfg["PILLAR_LABEL"]}</text>')
    for i, name in enumerate(pillars):
        px = gx0 + pgap * (i + 0.5)
        p_top = ry - 64
        p_bot = ry - 6
        out.append(f'<line x1="{_f(px)}" y1="{_f(p_bot)}" '
                   f'x2="{_f(px)}" y2="{_f(p_top)}" '
                   f'stroke="{PAL["exit"]}" stroke-width="3.0" '
                   f'stroke-linecap="round"/>')
        out.append(f'<text x="{_f(px)}" y="{_f(p_top - 5)}" '
                   f'fill="{PAL["muted"]}" font-family="{FONT_NAME}" '
                   f'font-size="8" text-anchor="middle" '
                   f'transform="rotate(-90 {_f(px)} {_f(p_top - 5)})">'
                   f'{name}</text>')
    out.append(f'<line x1="{_f(rx)}" y1="{_f(ry - 6)}" x2="{_f(rx)}" '
               f'y2="{_f(ry)}" stroke="{PAL["ink"]}" '
               f'stroke-width="1.4"/>')
    out.append("")

    # --- Hinweis (entlastender Kernsatz) ------------------------------
    out.append(f'<text x="{_f(CX)}" y="{_f(PY + FH + 22)}" '
               f'fill="{PAL["exit"]}" font-family="{FONT_NAME}" '
               f'font-size="10.5" font-style="italic" '
               f'text-anchor="middle">{cfg["HINT"]}</text>')

    xs = [bx - 4, rx + grp_w / 2 + 4]
    ys = [by - len(items) * bh - 26, PY + FH + 30]
    return _wrap("waage", out, min(xs), max(xs), min(ys), max(ys))


# ===================== WRAP + CLI =====================

def _wrap(kind, lines, bx0, bx1, by0, by1):
    warn = ""
    if bx0 < 0 or by0 < 0 or bx1 > VIEWBOX_W or by1 > VIEWBOX_H:
        warn = (f"  <!-- WARNING: {kind} geometry exceeds viewBox "
                f"{VIEWBOX_W}x{VIEWBOX_H}; adjust CONFIG -->")
    meta = (f"<!-- {kind}: bbox x[{bx0:.0f}..{bx1:.0f}] "
            f"y[{by0:.0f}..{by1:.0f}] of {VIEWBOX_W}x{VIEWBOX_H} -->")
    body = _indent(lines)
    return meta + ("\n" + warn if warn else "") + "\n" + body


BUILDERS = {
    "cycle": build_cycle,
    "sequence": build_sequence,
    "pyramid": build_pyramid,
    "spannungsfeld": build_spannungsfeld,
    "erosion": build_erosion,
    "waage": build_waage,
    "erosion_hybrid": build_erosion_hybrid,
}

if __name__ == "__main__":
    import sys
    ap = argparse.ArgumentParser()
    ap.add_argument("--type", choices=sorted(BUILDERS), default="cycle")
    args = ap.parse_args()
    try:
        print(BUILDERS[args.type]())
    except BrokenPipeError:
        try:
            sys.stdout.close()
        except Exception:
            pass
