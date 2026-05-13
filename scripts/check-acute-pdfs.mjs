import { execFile } from "node:child_process";
import { copyFile, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { findSparsePdfPages } from "./release-audit/checks/pdfManifest.mjs";

const execFileAsync = promisify(execFile);
const repoRoot = process.cwd();
const qaDir = path.join(repoRoot, ".acute-pdf-qa");
const screenshotDir = path.join(qaDir, "screenshots");
const noGenerate = process.argv.includes("--no-generate");

const acutePdfs = [
  {
    slug: "notfallkarte",
    key: "notfallkarte",
    pdfPath: path.join(repoRoot, "src", "downloads", "notfallkarte-kanton-zuerich-puk.pdf"),
    generatedPath: path.join(repoRoot, "src", "handouts", "notfallkarte.pdf"),
  },
  {
    slug: "c2_suizidgedanken",
    key: "c2_suizidgedanken",
    pdfPath: path.join(repoRoot, "src", "handouts", "c2_suizidgedanken.pdf"),
    copyTo: [path.join(repoRoot, "src", "downloads", "umgang-mit-suizidgedanken-puk-zuerich.pdf")],
  },
  {
    slug: "c3_psychose_wahn",
    key: "c3_psychose_wahn",
    pdfPath: path.join(repoRoot, "src", "handouts", "c3_psychose_wahn.pdf"),
    copyTo: [path.join(repoRoot, "src", "downloads", "umgang-mit-psychose-wahn-puk-zuerich.pdf")],
  },
  {
    slug: "c4_manie",
    key: "c4_manie",
    pdfPath: path.join(repoRoot, "src", "handouts", "c4_manie.pdf"),
    copyTo: [path.join(repoRoot, "src", "downloads", "umgang-mit-manie-puk-zuerich.pdf")],
  },
  {
    slug: "c5_depression",
    key: "c5_depression",
    pdfPath: path.join(repoRoot, "src", "handouts", "c5_depression.pdf"),
    copyTo: [path.join(repoRoot, "src", "downloads", "umgang-mit-depression-puk-zuerich.pdf")],
  },
];

async function run(command, args) {
  try {
    const result = await execFileAsync(command, args, {
      cwd: repoRoot,
      maxBuffer: 30 * 1024 * 1024,
    });
    return { ok: true, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout || "",
      stderr: error.stderr || "",
      message: error.message,
    };
  }
}

function parsePdfInfo(stdout) {
  const info = {};
  for (const line of stdout.split("\n")) {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      info[match[1].trim()] = match[2].trim();
    }
  }
  return info;
}

async function inspectGeneratorRules(errors, warnings) {
  const generator = await readFile(path.join(repoRoot, "scripts", "generate-handout-pdf.py"), "utf8");
  const acuteHeightMatch = generator.match(/class AcuteVisualDiagram[\s\S]*?def _height_for_kind\(self\):\s*return\s+([0-9.]+)\s*\*\s*mm/);
  const sourceFontMatch = generator.match(/styles\["source_text_acute"\][\s\S]*?fontSize=([0-9.]+)/);
  const sourceLeadingMatch = generator.match(/styles\["source_text_acute"\][\s\S]*?leading=([0-9.]+)/);

  const acuteHeight = acuteHeightMatch ? Number.parseFloat(acuteHeightMatch[1]) : null;
  const sourceFontSize = sourceFontMatch ? Number.parseFloat(sourceFontMatch[1]) : null;
  const sourceLeading = sourceLeadingMatch ? Number.parseFloat(sourceLeadingMatch[1]) : null;

  if (!acuteHeight || acuteHeight > 36) {
    errors.push(`Akutdiagramm-Höhe ist ${acuteHeight || "unbekannt"} mm; Ziel ist maximal 36 mm.`);
  }
  if (!sourceFontSize || sourceFontSize < 7) {
    errors.push(`Akut-Quellen sind ${sourceFontSize || "unbekannt"} pt; Mindestgrösse ist 7 pt.`);
  }
  if (!sourceLeading || sourceLeading < 8.8) {
    warnings.push(`Akut-Quellen-Zeilenhöhe ist ${sourceLeading || "unbekannt"} pt; empfohlen sind mindestens 8.8 pt.`);
  }
}

async function generateAcutePdfs(errors) {
  if (noGenerate) {
    return;
  }

  for (const pdf of acutePdfs) {
    const result = await run("python3", ["scripts/generate-handout-pdf.py", pdf.slug]);
    if (!result.ok) {
      errors.push(`${pdf.key}: Generator fehlgeschlagen (${result.message || result.stderr || "unknown error"}).`);
    }
  }

  for (const pdf of acutePdfs) {
    const sourcePath = pdf.generatedPath || pdf.pdfPath;
    const copyTargets = pdf.generatedPath ? [pdf.pdfPath, ...(pdf.copyTo || [])] : (pdf.copyTo || []);
    for (const targetPath of copyTargets) {
      try {
        await copyFile(sourcePath, targetPath);
      } catch (error) {
        errors.push(`${pdf.key}: Kopieren nach ${path.relative(repoRoot, targetPath)} fehlgeschlagen (${error.message}).`);
      }
    }
  }
}

async function renderScreenshots(pdf, errors) {
  const outputPrefix = path.join(screenshotDir, pdf.slug);
  const result = await run("pdftoppm", ["-png", "-r", "120", pdf.pdfPath, outputPrefix]);
  if (!result.ok) {
    errors.push(`${pdf.key}: PNG-Reviewshot konnte nicht erzeugt werden (${result.message || result.stderr || "unknown error"}).`);
  }
}

async function inspectPdf(pdf, errors, warnings) {
  const pdfInfoResult = await run("pdfinfo", [pdf.pdfPath]);
  if (!pdfInfoResult.ok) {
    errors.push(`${pdf.key}: pdfinfo fehlgeschlagen (${pdfInfoResult.message || pdfInfoResult.stderr || "unknown error"}).`);
    return;
  }

  const pdfInfo = parsePdfInfo(pdfInfoResult.stdout);
  const pageCount = Number.parseInt(pdfInfo.Pages || "", 10);
  if (!Number.isFinite(pageCount) || pageCount < 1) {
    errors.push(`${pdf.key}: Seitenzahl konnte nicht gelesen werden.`);
    return;
  }

  const bboxResult = await run("pdftotext", ["-bbox-layout", pdf.pdfPath, "-"]);
  if (!bboxResult.ok) {
    errors.push(`${pdf.key}: pdftotext -bbox-layout fehlgeschlagen (${bboxResult.message || bboxResult.stderr || "unknown error"}).`);
    return;
  }

  const sparsePages = findSparsePdfPages(bboxResult.stdout, { includeFinalPage: true });
  for (const page of sparsePages) {
    const message = `${pdf.key}: Seite ${page.page} endet bei ${(page.contentBottomRatio * 100).toFixed(0)}% der Seitenhöhe.`;
    if (page.page < pageCount) {
      errors.push(`${message} Nicht-finale Akutblatt-Seiten dürfen nicht halb leer umbrechen.`);
    } else {
      warnings.push(`${message} Bitte im Screenshot prüfen, ob das bewusst als Kurzkarte balanciert wirkt.`);
    }
  }

  await renderScreenshots(pdf, errors);
}

async function main() {
  const errors = [];
  const warnings = [];

  await rm(qaDir, { recursive: true, force: true });
  await mkdir(screenshotDir, { recursive: true });

  await inspectGeneratorRules(errors, warnings);
  await generateAcutePdfs(errors);

  for (const pdf of acutePdfs) {
    await inspectPdf(pdf, errors, warnings);
  }

  console.log("Acute PDF QA");
  console.log(`Mode: ${noGenerate ? "inspect committed PDFs" : "generate and inspect PDFs"}`);
  console.log(`Screenshots: ${path.relative(repoRoot, screenshotDir)}`);
  console.log("");

  for (const warning of warnings) {
    console.log(`WARN ${warning}`);
  }
  for (const error of errors) {
    console.log(`FAIL ${error}`);
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log("PASS Keine Layout-Ausreisser gefunden.");
  } else if (errors.length === 0) {
    console.log(`PASS mit ${warnings.length} Warnung(en).`);
  }

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}

await main();
