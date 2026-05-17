#!/usr/bin/env python3
"""Render, measure, and verify Fachstelle handout HTML.

This script intentionally separates two states:

- layout draft: Playwright/Chromium PDF, useful for A4, overflow, and visual QA;
  usually reports ``Tagged: no`` and is not a final PDF/UA release artifact.
- final release: an externally remediated/tagged PDF supplied via
  ``--final-pdf``; this must pass ``pdfinfo`` with ``Tagged: yes``.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent


def find_repo_root(start: Path) -> Path:
    for path in (start, *start.parents):
        if (path / "package.json").exists():
            return path
    return start


REPO_ROOT = find_repo_root(SCRIPT_DIR)
VERIFY = SCRIPT_DIR / "verify_fachstelle_handout.py"


def run(cmd: list[str], *, check: bool = True, cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, text=True, capture_output=True, check=check, cwd=cwd)


def compact(text: str, limit: int = 1600) -> str:
    text = text.strip()
    if len(text) <= limit:
        return text
    return text[:limit] + "\n...[truncated]"


def pdfinfo(pdf: Path) -> str:
    if not shutil.which("pdfinfo"):
        raise SystemExit("pdfinfo not found. Install Poppler before verifying PDFs.")
    return run(["pdfinfo", str(pdf)]).stdout


def tagged_yes(pdf: Path) -> bool:
    return "Tagged:          yes" in pdfinfo(pdf)


def optional_command(name: str, cmd: list[str], *, cwd: Path | None = None) -> dict:
    if not shutil.which(cmd[0]):
        return {"available": False, "status": "skipped", "message": f"{cmd[0]} not found"}
    proc = run(cmd, check=False, cwd=cwd)
    return {
        "available": True,
        "status": "passed" if proc.returncode == 0 else "failed",
        "exitCode": proc.returncode,
        "stdout": compact(proc.stdout),
        "stderr": compact(proc.stderr),
        "name": name,
    }


def html_checks(html: Path) -> dict:
    checks: dict[str, dict] = {}
    checks["htmlValidate"] = optional_command(
        "html-validate",
        ["npx", "html-validate", str(html)],
        cwd=REPO_ROOT,
    ) if shutil.which("npx") else {"available": False, "status": "skipped", "message": "npx not found"}
    checks["axe"] = optional_command(
        "axe",
        ["npx", "axe", html.resolve().as_uri(), "--exit"],
        cwd=REPO_ROOT,
    ) if shutil.which("npx") else {"available": False, "status": "skipped", "message": "npx not found"}
    return checks


def pdf_tool_checks(pdf: Path, *, out_dir: Path, stem: str, prefix: str) -> dict:
    checks: dict[str, dict] = {}
    checks["qpdf"] = optional_command("qpdf", ["qpdf", "--check", str(pdf)])
    checks["mutoolInfo"] = optional_command("mutool info", ["mutool", "info", str(pdf)])
    checks["exiftool"] = optional_command(
        "exiftool",
        ["exiftool", "-Title", "-Creator", "-Producer", "-PDFVersion", "-PageCount", str(pdf)],
    )

    if shutil.which("gs"):
        normalized = out_dir / f"{stem}.{prefix}.ghostscript-normalized.pdf"
        proc = run(
            [
                "gs",
                "-o",
                str(normalized),
                "-sDEVICE=pdfwrite",
                "-dPDFSTOPONERROR",
                "-dBATCH",
                "-dNOPAUSE",
                str(pdf),
            ],
            check=False,
        )
        checks["ghostscriptNormalize"] = {
            "available": True,
            "status": "passed" if proc.returncode == 0 and normalized.exists() else "failed",
            "exitCode": proc.returncode,
            "outputPdf": str(normalized) if normalized.exists() else None,
            "stdout": compact(proc.stdout),
            "stderr": compact(proc.stderr),
            "tagged": tagged_yes(normalized) if normalized.exists() else None,
            "note": "Ghostscript is a syntax/normalization helper, not a PDF/UA tagging path.",
        }
    else:
        checks["ghostscriptNormalize"] = {"available": False, "status": "skipped", "message": "gs not found"}
    return checks


def render_weasyprint(html: Path, *, out_dir: Path, stem: str) -> dict:
    if not shutil.which("weasyprint"):
        return {"available": False, "status": "skipped", "message": "weasyprint not found"}
    out_pdf = out_dir / f"{stem}.weasyprint.pdf"
    proc = run(["weasyprint", str(html), str(out_pdf)], check=False)
    result = {
        "available": True,
        "status": "passed" if proc.returncode == 0 and out_pdf.exists() else "failed",
        "exitCode": proc.returncode,
        "outputPdf": str(out_pdf) if out_pdf.exists() else None,
        "stdout": compact(proc.stdout),
        "stderr": compact(proc.stderr),
        "note": "Alternative renderer only; does not imply PDF/UA.",
    }
    if out_pdf.exists():
        result["pdfinfo"] = compact(pdfinfo(out_pdf))
        result["tagged"] = tagged_yes(out_pdf)
        result["qpdf"] = optional_command("qpdf", ["qpdf", "--check", str(out_pdf)])
    return result


def render_and_measure(html: Path, pdf: Path, screenshot: Path, orientation: str) -> dict:
    if not shutil.which("node"):
        raise SystemExit("node not found. Install Node.js and run: npm install -D playwright")
    if not (
        (REPO_ROOT / "node_modules" / "playwright").exists()
        or (REPO_ROOT / "node_modules" / "@playwright" / "test").exists()
    ):
        raise SystemExit("Node Playwright not found. Run: npm install -D playwright && npx playwright install chromium")

    script = r"""
const { chromium } = require('playwright');
const [html, pdf, screenshot, orientation] = process.argv.slice(2);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('file://' + html, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  const metrics = await page.evaluate((orientation) => {
    const mm = 96 / 25.4;
    const pxToMm = (n) => +(n / mm).toFixed(2);
    const pageEls = [...document.querySelectorAll('.print-page')];
    const pageEl = pageEls[0];
    if (!pageEl) return { error: 'missing .print-page' };
    const pageRect = pageEl.getBoundingClientRect();
    const style = getComputedStyle(pageEl);
    const expectedWidth = orientation === 'landscape' ? 297 : 210;
    const expectedHeight = orientation === 'landscape' ? 210 : 297;
    const pick = (sel, root = document) => {
      const el = root.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const rootRect = root.classList && root.classList.contains('print-page')
        ? root.getBoundingClientRect()
        : pageRect;
      return {
        topMm: pxToMm(r.top - rootRect.top),
        bottomMm: pxToMm(r.bottom - rootRect.top),
        heightMm: pxToMm(r.height),
        text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120),
      };
    };
    const pages = pageEls.map((el, index) => {
      const rect = el.getBoundingClientRect();
      const computed = getComputedStyle(el);
      return {
        index: index + 1,
        pageMm: {
          width: pxToMm(rect.width),
          height: pxToMm(rect.height),
        },
        paddingMm: {
          top: pxToMm(parseFloat(computed.paddingTop)),
          right: pxToMm(parseFloat(computed.paddingRight)),
          bottom: pxToMm(parseFloat(computed.paddingBottom)),
          left: pxToMm(parseFloat(computed.paddingLeft)),
        },
        scrollHeightMm: pxToMm(el.scrollHeight),
        clientHeightMm: pxToMm(el.clientHeight),
        noOverflow: el.scrollHeight <= el.clientHeight + 1,
        header: pick('.sheet-header', el),
        contentGrid: pick('.content-grid', el),
        visualCard: pick('.visual-card', el),
        nextAction: pick('[data-required="next-action"]', el),
        footer: pick('.footer', el),
      };
    });
    return {
      pageCount: pageEls.length,
      pageMm: {
        width: pxToMm(pageRect.width),
        height: pxToMm(pageRect.height),
      },
      paddingMm: {
        top: pxToMm(parseFloat(style.paddingTop)),
        right: pxToMm(parseFloat(style.paddingRight)),
        bottom: pxToMm(parseFloat(style.paddingBottom)),
        left: pxToMm(parseFloat(style.paddingLeft)),
      },
      contentBudgetMm: {
        width: +(expectedWidth - 14 - 14).toFixed(2),
        height: +(expectedHeight - 14 - 14).toFixed(2),
      },
      pages,
      scrollHeightMm: pxToMm(pageEl.scrollHeight),
      clientHeightMm: pxToMm(pageEl.clientHeight),
      noOverflow: pages.every((page) => page.noOverflow),
      visibleNextAction: !!document.querySelector('[data-required="next-action"]'),
      visibleTextHasNextAction:
        (document.body.textContent || '').includes('Konkreter nächster Schritt'),
      blocks: {
        header: pick('.sheet-header'),
        contentGrid: pick('.content-grid'),
        visualCard: pick('.visual-card'),
        nextAction: pick('[data-required="next-action"]'),
        note: pick('.note'),
        footer: pick('.footer'),
      },
    };
  }, orientation);
  await page.screenshot({ path: screenshot, fullPage: true });
  await page.pdf({ path: pdf, printBackground: true, preferCSSPageSize: true, landscape: orientation === 'landscape' });
  await browser.close();
  console.log(JSON.stringify(metrics));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
"""
    with tempfile.NamedTemporaryFile("w", suffix=".cjs", dir=SCRIPT_DIR, delete=False, encoding="utf-8") as handle:
        handle.write(script)
        script_path = Path(handle.name)
    try:
        proc = run(
            ["node", str(script_path), str(html.resolve()), str(pdf.resolve()), str(screenshot.resolve()), orientation],
            check=True,
        )
    finally:
        script_path.unlink(missing_ok=True)
    return json.loads(proc.stdout)


def verify_html_pdf(
    html: Path,
    pdf: Path | None,
    doc_type: str,
    orientation: str,
    pages: int,
    allow_template_placeholders: bool,
    allow_untagged_pdf: bool,
) -> int:
    cmd = [
        sys.executable,
        str(VERIFY),
        str(html),
        "--type",
        doc_type,
        "--orientation",
        orientation,
        "--pages",
        str(pages),
    ]
    if pdf:
        cmd.extend(["--pdf", str(pdf)])
    if allow_template_placeholders:
        cmd.append("--allow-template-placeholders")
    if allow_untagged_pdf:
        cmd.append("--allow-untagged-pdf")
    proc = subprocess.run(cmd, text=True)
    return proc.returncode


def text_extract_check(pdf: Path) -> str:
    if not shutil.which("pdftotext"):
        return "pdftotext not found; text extraction not checked."
    proc = run(["pdftotext", str(pdf), "-"], check=False)
    text = re.sub(r"\s+", " ", proc.stdout).strip()
    if not text:
        return "Text extraction empty or unreadable."
    return text[:500]


def pdfplumber_extract_check(pdf: Path) -> dict:
    code = r"""
import re
import sys
try:
    import pdfplumber
except Exception as exc:
    print(f"IMPORT_ERROR: {exc}", file=sys.stderr)
    raise SystemExit(2)
with pdfplumber.open(sys.argv[1]) as pdf:
    text = "\n".join((page.extract_text() or "") for page in pdf.pages)
text = re.sub(r"\s+", " ", text).strip()
print(text[:800] if text else "EMPTY_TEXT")
"""
    candidates = [Path(sys.executable), Path("/usr/bin/python3")]
    seen: set[Path] = set()
    for py in candidates:
        if py in seen or not py.exists():
            continue
        seen.add(py)
        proc = run([str(py), "-c", code, str(pdf)], check=False)
        if proc.returncode == 0:
            return {
                "available": True,
                "status": "passed" if proc.stdout.strip() and proc.stdout.strip() != "EMPTY_TEXT" else "failed",
                "python": str(py),
                "sample": compact(proc.stdout, 800),
            }
    return {
        "available": False,
        "status": "skipped",
        "message": "pdfplumber not importable from checked Python interpreters; pdftotext fallback used.",
    }


def required_checks_failed(html_quality: dict, pdf_tools: dict) -> bool:
    required_html = ("htmlValidate", "axe")
    for name in required_html:
        check = html_quality.get(name, {})
        if check.get("available") and check.get("status") == "failed":
            return True
    qpdf = pdf_tools.get("qpdf", {})
    if qpdf.get("available") and qpdf.get("status") == "failed":
        return True
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("html", type=Path)
    parser.add_argument("--type", choices=["orientierung", "praxis", "krise"], default="orientierung")
    parser.add_argument("--orientation", choices=["landscape", "portrait"], default="landscape")
    parser.add_argument("--pages", type=int, default=1)
    parser.add_argument("--out-dir", type=Path, default=REPO_ROOT / "_handout_build")
    parser.add_argument("--allow-template-placeholders", action="store_true")
    parser.add_argument(
        "--final-pdf",
        type=Path,
        help="Externally remediated/tagged PDF for final PDF/UA verification.",
    )
    args = parser.parse_args()

    html = args.html.resolve()
    if not html.exists():
        raise SystemExit(f"HTML not found: {html}")
    args.out_dir.mkdir(parents=True, exist_ok=True)
    stem = html.stem.replace(" ", "-")
    layout_pdf = args.out_dir / f"{stem}.layout-draft.pdf"
    screenshot = args.out_dir / f"{stem}.layout-draft.png"
    report_path = args.out_dir / f"{stem}.report.json"

    metrics = render_and_measure(html, layout_pdf, screenshot, args.orientation)
    print("MEASURE")
    print(json.dumps(metrics, indent=2, ensure_ascii=False))

    print("\nHTML CHECKS")
    html_quality = html_checks(html)
    print(json.dumps(html_quality, indent=2, ensure_ascii=False))

    print("\nPDFINFO layout draft")
    print(pdfinfo(layout_pdf).strip())

    print("\nPDF TOOL CHECKS layout draft")
    layout_pdf_tools = pdf_tool_checks(layout_pdf, out_dir=args.out_dir, stem=stem, prefix="layout-draft")
    print(json.dumps(layout_pdf_tools, indent=2, ensure_ascii=False))

    print("\nWEASYPRINT comparison")
    weasyprint_result = render_weasyprint(html, out_dir=args.out_dir, stem=stem)
    print(json.dumps(weasyprint_result, indent=2, ensure_ascii=False))

    print("\nVERIFY layout draft", flush=True)
    layout_rc = verify_html_pdf(
        html,
        layout_pdf,
        args.type,
        args.orientation,
        args.pages,
        args.allow_template_placeholders,
        allow_untagged_pdf=True,
    )

    final = {
        "status": "not_supplied",
        "message": "No --final-pdf supplied. Layout draft is not a PDF/UA release artifact.",
    }
    final_rc = 1
    if args.final_pdf:
        final_pdf = args.final_pdf.resolve()
        print("\nPDFINFO final PDF")
        info = pdfinfo(final_pdf)
        print(info.strip())
        print("\nVERIFY final PDF", flush=True)
        final_rc = verify_html_pdf(
            html,
            final_pdf,
            args.type,
            args.orientation,
            args.pages,
            args.allow_template_placeholders,
            allow_untagged_pdf=False,
        )
        final = {
            "status": "passed" if final_rc == 0 and tagged_yes(final_pdf) else "failed",
            "tagged": tagged_yes(final_pdf),
            "pdftotextSample": text_extract_check(final_pdf),
            "pdfplumber": pdfplumber_extract_check(final_pdf),
            "pdfToolChecks": pdf_tool_checks(final_pdf, out_dir=args.out_dir, stem=stem, prefix="final"),
        }
    else:
        print("\nPDF/UA final")
        print("NOT SUPPLIED - layout draft only. Final release requires --final-pdf with Tagged: yes.")

    report = {
        "html": str(html),
        "layoutPdf": str(layout_pdf),
        "screenshot": str(screenshot),
        "layoutVerifyExitCode": layout_rc,
        "htmlChecks": html_quality,
        "layoutPdfToolChecks": layout_pdf_tools,
        "weasyprintComparison": weasyprint_result,
        "layoutTextExtraction": {
            "pdftotextSample": text_extract_check(layout_pdf),
            "pdfplumber": pdfplumber_extract_check(layout_pdf),
        },
        "finalPdfUa": final,
        "metrics": metrics,
    }
    report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\nREPORT {report_path}")

    layout_gate_rc = 1 if layout_rc != 0 or required_checks_failed(html_quality, layout_pdf_tools) else 0
    if args.final_pdf:
        return 1 if final_rc != 0 or required_checks_failed(html_quality, layout_pdf_tools) else 0
    return layout_gate_rc


if __name__ == "__main__":
    raise SystemExit(main())
