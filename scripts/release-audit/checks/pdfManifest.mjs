import path from "node:path";
import {
  createCheckResult,
  createRepoRequire,
  fileExists,
  loadHtmlPages,
  normalizeWhitespace,
  relativeToRepo,
  runCommand,
  walkFiles,
} from "../lib/shared.mjs";

const PDF_SOURCE_DIRS = [
  path.join("src", "downloads"),
  path.join("src", "handouts"),
];
const MIN_EXTRACTABLE_TEXT_CHARS = 250;
const PDF_CONTENT_FILL_MIN_RATIO = 0.70;
const PDF_FOOTER_IGNORE_POINTS = 46;
const CRITICAL_LANGUAGE_METADATA_KEYS = new Set([
  "notfallkarte",
  "suizidgedanken",
  "psychoseWahn",
  "manie",
  "depression",
  "c2_suizidgedanken",
  "c3_psychose_wahn",
  "c4_manie",
  "c5_depression",
  "krisenplanVorlage",
  "krisenplanGuide",
  "rechtlicheOrientierung",
  "c1_krisenplan",
  "kritischeZeitpunkte",
  "sichtbarkeitBelastung",
  "b1_18_belastungen",
  "b6_geschlechtsspezifisch",
  "warnsignale",
  "kurzblattStabilisiert",
  "grenzsetzungPraxis",
  "a1_bipolare_stoerung_verstehen",
  "a2_phasenverlauf",
  "a6_bipolar_i_ii_mischzustaende",
  "absprachen_bevor_es_kippt",
  "schwieriges_ruhig_ansprechen",
  "a3_ambivalente_loyalitaet",
  "a4_ambiguous_loss",
  "a5_affiliate_stigma",
  "a8_warnsignale",
  "b10_trennung_scheidung",
  "b2_erosion_solidaritaet",
  "b4_mechanismen_erosion",
  "b5_loyalitaetskonflikte",
  "b7_behandlung_ambivalenz",
  "b9_depression_partner",
  "c6_selbstfuersorge",
  "d4_solidaritaet_wellen",
  "expressed_emotions",
  "grenzsetzung",
  "kurzblatt_stabilisiert",
  "transformationsreise",
  "trialog",
  "legacy.notfallkarte",
  "legacy.kurzblattStabilisiert",
  "legacy.kritischeZeitpunkte",
  "legacy.rechtlicheOrientierung",
]);
const REQUIRED_PDF_TEXT_SNIPPETS = {
  notfallkarte: [
    "KRISEN-HANDOUT",
    "Rettungsring: welcher Weg jetzt?",
    "ersetzt keine Diagnostik",
    "Lebensgefahr oder Bewusstlosigkeit: 144",
    "Psychiatrische Krise ohne unmittelbare Lebensgefahr",
    "Was zuerst tun?",
    "Was am Telefon sagen?",
  ],
  krisenplanVorlage: [
    "sensible Gesundheitsdaten",
    "sicher auf",
    "digitale Kopien",
  ],
  krisenplanGuide: [
    "zuerst drei Felder",
    "sensible Gesundheitsdaten",
    "ergänzt Behandlung und Notfallwege",
    "keine Dosierungen ohne Behandlungsteam",
  ],
  c1_krisenplan: [
    "zuerst drei Felder",
    "sensible Gesundheitsdaten",
    "ergänzt Behandlung und Notfallwege",
    "keine Dosierungen ohne Behandlungsteam",
  ],
  suizidgedanken: [
    "nicht versuchen, mit einem Risiko-Score",
    "Bei konkreter Gefahr: 144",
  ],
  c2_suizidgedanken: [
    "Suizid-Ampel",
    "nicht versuchen, mit einem Risiko-Score",
    "Bei konkreter Gefahr: 144",
  ],
  psychoseWahn: [
    "ersetzt keine fachliche Abklärung",
    "professionelle Einschätzung",
    "Sicherheit von Kindern",
  ],
  c3_psychose_wahn: [
    "Schutzpfad",
    "ersetzt keine fachliche Abklärung",
    "professionelle Einschätzung",
    "Sicherheit von Kindern",
  ],
  manie: [
    "ersetzt keine Diagnose",
    "nichts körperlich oder rechtlich erzwingen",
    "nicht auf volle Eskalation warten",
  ],
  c4_manie: [
    // Stable, high-signal phrases from the current one-page acute layout (verified 2026-05-14)
    "Manie-Tacho",
    "Orientierung in der Manie",
    "ersetzt keine Diagnose",
    "nicht auf volle Eskalation warten",
  ],
  depression: [
    "ersetzt keine fachliche Einschätzung",
    "ohne Dosierungen zu ändern",
    "Bei konkreter Suizidgefahr: 144",
  ],
  c5_depression: [
    "Depressions-Thermometer",
    "ersetzt keine fachliche Einschätzung",
    "ohne Dosierungen zu ändern",
    "Bei konkreter Suizidgefahr: 144",
  ],
  rechtlicheOrientierung: [
    "keine Rechtsberatung",
    "Erst sortieren",
    "fachliche oder juristische Beratung",
    "In der Regel erteilt",
    "Beobachtungen mitteilen",
  ],
  "legacy.rechtlicheOrientierung": [
    "keine Rechtsberatung",
    "Erst sortieren",
    "fachliche oder juristische Beratung",
    "In der Regel erteilt",
    "Beobachtungen mitteilen",
  ],
  b1_18_belastungen: [
    "Vier Belastungsfelder",
    "Wissen und Unsicherheit",
    "Körper und Alarm",
  ],
  a1_bipolare_stoerung_verstehen: [
    "Phasenwelle",
    "Verlauf statt Charakterfrage",
    "Vier wichtige Einordnungen",
    "Konkreter nächster Schritt",
  ],
  a2_phasenverlauf: [
    "Phasenwelle",
    "Manie",
    "Hypomanie",
    "Konkreter nächster Schritt",
  ],
  a6_bipolar_i_ii_mischzustaende: [
    "Schwelle und Mischbild",
    "Bipolar I",
    "Bipolar II",
    "Mischbild",
    "Konkreter nächster Schritt",
  ],
  warnsignale: [
    "Ampel für Frühwarnzeichen",
    "Krisenplan prüfen",
    "Nicht jedes Zeichen",
  ],
  a8_warnsignale: [
    "Ampel für Frühwarnzeichen",
    "Vereinbarten Schritt nutzen",
    "Nicht jedes Zeichen",
  ],
  absprachen_bevor_es_kippt: [
    "Die Absprachekarte",
    "Wenn-dann-Absprache",
    "Eine Absprache ist kein Misstrauen",
    "Konkreter nächster Schritt",
  ],
  schwieriges_ruhig_ansprechen: [
    "Drei-Satz-Modell",
    "Mir fällt auf, dass",
    "Ich mache mir Sorgen",
    "Konkreter nächster Schritt",
  ],
  a3_ambivalente_loyalitaet: [
    "Vier innere Kräfte",
    "Bindung",
    "Erschöpfung",
  ],
  a4_ambiguous_loss: [
    "Verlust ohne klaren Abschied",
    "Vertrautheit",
    "Eigenes Leben",
  ],
  a5_affiliate_stigma: [
    "Wie Stigma Angehörige enger macht",
    "Schweigen",
    "Selbstzweifel",
  ],
  b10_trennung_scheidung: [
    "Schutz- und Abstandspfade",
    "Bewusst Abstand",
    "Bewusst gehen",
  ],
  b2_erosion_solidaritaet: [
    "Erosion als Verlauf",
    "Chronische Belastung",
    "Gegensteuerung",
  ],
  b4_mechanismen_erosion: [
    "Vom Schutzmuster zur Gegenbewegung",
    "Co-Isolation",
    "Identitätsverlust",
  ],
  b5_loyalitaetskonflikte: [
    "Loyalität hat mehr als eine Richtung",
    "Zu sich selbst",
    "Zur Realität",
  ],
  b7_behandlung_ambivalenz: [
    "Gesprächsspielraum oder Notfallpfad",
    "Behandlungsabbruch",
    "Akute Gefahr",
  ],
  b9_depression_partner: [
    "Von Überlastung zu eigener Abklärung",
    "Anhaltende Mitbelastung",
    "Mögliche Depression",
  ],
  c6_selbstfuersorge: [
    "Der Akku",
    "Konkreter nächster Schritt",
    "Entlastung",
    "krankheitsfreie Insel",
  ],
  d4_solidaritaet_wellen: [
    "Fünf Säulen langfristiger Tragfähigkeit",
    "Krankheitsfreie Inseln",
    "Eigene Entlastung",
  ],
  expressed_emotions: [
    "Der EE-Kreislauf",
    "Überengagement",
    "Kritik oder Rückzug",
  ],
  grenzsetzungPraxis: [
    "Formulierungsbaukasten",
    "Ich lasse mich nicht anschreien",
    "Notfallpfad",
  ],
  grenzsetzung: [
    "Formulierungsbaukasten",
    "Ich lasse mich nicht anschreien",
    "Notfallpfad",
  ],
  kurzblattStabilisiert: [
    "Alltagskompass",
    "Stabilisiert",
    "Schadet eher",
  ],
  "legacy.kurzblattStabilisiert": [
    "Alltagskompass",
    "Stabilisiert",
    "Schadet eher",
  ],
  kritischeZeitpunkte: [
    "Zeitpunkt-Landkarte",
    "Vorboten",
    "Fragile Ruhe",
  ],
  "legacy.kritischeZeitpunkte": [
    "Zeitpunkt-Landkarte",
    "Vorboten",
    "Fragile Ruhe",
  ],
  sichtbarkeitBelastung: [
    "Sichtbare Last",
    "Stille Last",
    "Nicht einordnen",
  ],
  b6_geschlechtsspezifisch: [
    "Sichtbare Last",
    "Stille Last",
    "Nicht einordnen",
  ],
  transformationsreise: [
    "Veränderung verläuft in Wellen",
    "Wachstum ist möglich",
    "Rückschläge",
  ],
  trialog: [
    "Drei Perspektiven im Trialog",
    "Betroffene",
    "Angehörige",
  ],
};
const MIN_PAGE_COUNT_BY_KEY = {};
const ACUTE_LAYOUT_BALANCE_KEYS = new Set([
  "notfallkarte",
  "legacy.notfallkarte",
  "suizidgedanken",
  "psychoseWahn",
  "manie",
  "depression",
  "c2_suizidgedanken",
  "c3_psychose_wahn",
  "c4_manie",
  "c5_depression",
]);
const SOURCE_REFERENCE_MARKERS = [
  "doi:",
  "https://doi.org/",
  "isbn",
  "pmid",
  "nice",
  "who",
  "dgbs",
  "awmf",
  "fedlex",
  "pro mente sana",
  "puk",
  "ärztefon",
  "dargebotene hand",
];

function flattenAssets(pdfs) {
  return [...Object.values(pdfs.downloads), ...Object.values(pdfs.handouts)];
}

function sourcePathFromPdfUrl(repoRoot, url) {
  return path.join(repoRoot, "src", url.replace(/^\/+/, ""));
}

export function findUntrackedPdfSourceFiles(repoRoot, sourcePdfFiles, trackedPdfs) {
  const trackedSourcePaths = new Set(
    trackedPdfs.map((pdf) => sourcePathFromPdfUrl(repoRoot, pdf.url))
  );

  return sourcePdfFiles.filter((filePath) => !trackedSourcePaths.has(filePath));
}

async function findSourcePdfFiles(repoRoot) {
  const sourcePdfFiles = [];

  for (const relativeDir of PDF_SOURCE_DIRS) {
    const dir = path.join(repoRoot, relativeDir);
    const files = await walkFiles(dir, (filePath) => filePath.endsWith(".pdf"));
    sourcePdfFiles.push(...files);
  }

  return sourcePdfFiles.sort();
}

function parseDeclaredPageCount(pagesLabel) {
  const match = pagesLabel.match(/(\d+)\s+Seite/);
  return match ? Number.parseInt(match[1], 10) : null;
}

function parsePdfInfo(output) {
  const lines = output.split("\n");
  const info = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes(":")) {
      continue;
    }
    const [rawKey, ...rest] = trimmed.split(":");
    info[rawKey.trim()] = rest.join(":").trim();
  }

  return info;
}

function isA4(pageSize) {
  if (!pageSize) {
    return false;
  }

  if (pageSize.includes("(A4)")) {
    return true;
  }

  const match = pageSize.match(/([\d.]+)\s+x\s+([\d.]+)\s+pts/i);
  if (!match) {
    return false;
  }

  const width = Number.parseFloat(match[1]);
  const height = Number.parseFloat(match[2]);
  const portrait = Math.abs(width - 595.3) < 16 && Math.abs(height - 841.9) < 16;
  const landscape = Math.abs(width - 841.9) < 16 && Math.abs(height - 595.3) < 16;
  return portrait || landscape;
}

export function requiresCriticalLanguageMetadata(pdfKey) {
  return CRITICAL_LANGUAGE_METADATA_KEYS.has(pdfKey);
}

export function pdfMetadataDeclaresLanguage(metadata, language = "de-CH") {
  return String(metadata || "").includes(language);
}

export function requiredPdfTextSnippets(pdfKey) {
  return REQUIRED_PDF_TEXT_SNIPPETS[pdfKey] || [];
}

export function minRequiredPdfPages(pdfKey) {
  return MIN_PAGE_COUNT_BY_KEY[pdfKey] || null;
}

export function findMissingRequiredPdfTextSnippets(pdfKey, pdfText) {
  const normalizedText = normalizeWhitespace(pdfText).toLowerCase();
  return requiredPdfTextSnippets(pdfKey).filter(
    (snippet) => !normalizedText.includes(normalizeWhitespace(snippet).toLowerCase())
  );
}

export function pdfTextHasSourceReferences(pdfText) {
  const normalizedText = normalizeWhitespace(pdfText).toLowerCase();
  return (
    /\bquellen\b/.test(normalizedText) &&
    SOURCE_REFERENCE_MARKERS.some((marker) => normalizedText.includes(marker))
  );
}

function xmlAttr(tag, attributeName) {
  const match = tag.match(new RegExp(`\\b${attributeName}="([^"]*)"`, "i"));
  return match ? match[1] : null;
}

export function parsePdfBboxLayout(bboxText) {
  const pages = [];
  const pageRegex = /<page\b([^>]*)>([\s\S]*?)<\/page>/gi;
  let pageMatch;

  while ((pageMatch = pageRegex.exec(bboxText))) {
    const pageTag = pageMatch[1];
    const pageBody = pageMatch[2];
    const width = Number.parseFloat(xmlAttr(pageTag, "width") || "0");
    const height = Number.parseFloat(xmlAttr(pageTag, "height") || "0");
    const words = [];
    const wordRegex = /<word\b([^>]*)>/gi;
    let wordMatch;

    while ((wordMatch = wordRegex.exec(pageBody))) {
      const wordTag = wordMatch[1];
      const xMin = Number.parseFloat(xmlAttr(wordTag, "xMin") || "0");
      const yMin = Number.parseFloat(xmlAttr(wordTag, "yMin") || "0");
      const xMax = Number.parseFloat(xmlAttr(wordTag, "xMax") || "0");
      const yMax = Number.parseFloat(xmlAttr(wordTag, "yMax") || "0");
      if ([xMin, yMin, xMax, yMax].every(Number.isFinite)) {
        words.push({ xMin, yMin, xMax, yMax });
      }
    }

    pages.push({ width, height, words });
  }

  return pages;
}

export function findSparsePdfPages(bboxText, options = {}) {
  const {
    includeFinalPage = false,
    minContentBottomRatio = PDF_CONTENT_FILL_MIN_RATIO,
    footerIgnorePoints = PDF_FOOTER_IGNORE_POINTS,
  } = options;
  const pages = parsePdfBboxLayout(bboxText);
  const inspectedPages = includeFinalPage ? pages : pages.slice(0, -1);

  return inspectedPages.flatMap((page, index) => {
    if (!page.height || !page.words.length) {
      return [];
    }

    const footerLimit = page.height - footerIgnorePoints;
    const contentWords = page.words.filter((word) => word.yMin < footerLimit);
    if (!contentWords.length) {
      return [];
    }

    const contentBottom = Math.max(...contentWords.map((word) => word.yMax));
    const contentBottomRatio = contentBottom / page.height;
    if (contentBottomRatio >= minContentBottomRatio) {
      return [];
    }

    return [{
      page: index + 1,
      contentBottom: Number(contentBottom.toFixed(1)),
      pageHeight: Number(page.height.toFixed(1)),
      contentBottomRatio: Number(contentBottomRatio.toFixed(3)),
      minContentBottomRatio,
    }];
  });
}

export function findSparseNonFinalPdfPages(bboxText, options = {}) {
  return findSparsePdfPages(bboxText, { ...options, includeFinalPage: false });
}

async function validateExtractableText(context, pdfKey, sourcePath, findings) {
  const textResult = await runCommand("pdftotext", ["-layout", sourcePath, "-"], { cwd: context.repoRoot });
  const rawTextResult = await runCommand("pdftotext", ["-raw", sourcePath, "-"], { cwd: context.repoRoot });

  if (!textResult.ok) {
    findings.push({
      severity: "high",
      message: `${pdfKey} could not be inspected via pdftotext (${textResult.message || "unknown error"}).`,
    });
    return;
  }

  const normalizedText = normalizeWhitespace(textResult.stdout);
  const searchableText = normalizeWhitespace(
    rawTextResult.ok ? `${textResult.stdout}\n${rawTextResult.stdout}` : textResult.stdout
  );
  const textLength = normalizedText.length;
  if (textLength < MIN_EXTRACTABLE_TEXT_CHARS) {
    findings.push({
      severity: "high",
      message: `${pdfKey} has only ${textLength} extractable text characters; PDFs must not ship as image-only handouts.`,
    });
  }

  const missingRequiredSnippets = findMissingRequiredPdfTextSnippets(pdfKey, searchableText);
  for (const snippet of missingRequiredSnippets) {
    findings.push({
      severity: "high",
      message: `${pdfKey} is missing required PDF text snippet "${snippet}".`,
    });
  }

  if (!pdfTextHasSourceReferences(searchableText)) {
    findings.push({
      severity: "high",
      message: `${pdfKey} is missing visible source references ("Quellen").`,
    });
  }
}

async function validateAcutePdfLayoutBalance(context, pdfKey, sourcePath, findings) {
  if (!ACUTE_LAYOUT_BALANCE_KEYS.has(pdfKey)) {
    return;
  }

  const bboxResult = await runCommand("pdftotext", ["-bbox-layout", sourcePath, "-"], { cwd: context.repoRoot });
  if (!bboxResult.ok) {
    findings.push({
      severity: "medium",
      message: `${pdfKey} could not be inspected for page-fill layout balance (${bboxResult.message || "unknown error"}).`,
    });
    return;
  }

  const sparsePages = findSparseNonFinalPdfPages(bboxResult.stdout);
  for (const page of sparsePages) {
    findings.push({
      severity: "high",
      message: `${pdfKey} page ${page.page} ends at ${(page.contentBottomRatio * 100).toFixed(0)}% of A4 height before a following page; acute PDFs must not leave large unused page areas.`,
    });
  }
}

async function validateCriticalLanguageMetadata(context, pdfKey, sourcePath, findings) {
  if (!requiresCriticalLanguageMetadata(pdfKey)) {
    return;
  }

  const metadataResult = await runCommand("pdfinfo", ["-meta", sourcePath], { cwd: context.repoRoot });
  if (!metadataResult.ok) {
    findings.push({
      severity: "medium",
      message: `${pdfKey} could not be inspected for PDF language metadata (${metadataResult.message || "unknown error"}).`,
    });
    return;
  }

  if (!pdfMetadataDeclaresLanguage(metadataResult.stdout)) {
    findings.push({
      severity: "medium",
      message: `${pdfKey} is a critical acute PDF but does not expose de-CH language metadata.`,
    });
  }
}

export async function runPdfManifestCheck(context) {
  const requireFromRepo = createRepoRequire(context.repoRoot);
  const pdfs = requireFromRepo("./src/_data/pdfs.js");
  const assets = flattenAssets(pdfs);
  const legacyPdfAliases = pdfs.legacyPdfAliases || [];
  const trackedPdfs = [...assets, ...legacyPdfAliases];
  const pages = await loadHtmlPages(context.siteDir);
  const htmlIndex = pages.map((page) => page.html).join("\n");

  const findings = [];
  const assetIds = new Map();

  const pdfInfoCheck = await runCommand("pdfinfo", ["-v"], { cwd: context.repoRoot });
  const pdftotextCheck = await runCommand("pdftotext", ["-v"], { cwd: context.repoRoot });
  if (!pdfInfoCheck.ok || !pdftotextCheck.ok) {
    return createCheckResult({
      id: "pdf-manifest",
      title: "PDF manifest and assets",
      status: "fail",
      summary: "Poppler PDF tools are required for PDF-QA and are missing in this environment.",
      findings: [
        ...(pdfInfoCheck.ok
          ? []
          : [
              {
                severity: "high",
                message:
                  "Install poppler-utils (provides pdfinfo). PDF page-count/title/A4 checks are mandatory and cannot be skipped.",
              },
              {
                severity: "medium",
                message: `pdfinfo command failed: ${pdfInfoCheck.message || "unknown error"}.`,
              },
            ]),
        ...(pdftotextCheck.ok
          ? []
          : [
              {
                severity: "high",
                message:
                  "Install poppler-utils (provides pdftotext). Extractable text checks are mandatory and cannot be skipped.",
              },
              {
                severity: "medium",
                message: `pdftotext command failed: ${pdftotextCheck.message || "unknown error"}.`,
              },
            ]),
      ],
      metrics: {
        assets: assets.length,
        pdfinfoRequired: true,
        pdftotextRequired: true,
        sourceDownloadsDir: relativeToRepo(context.repoRoot, path.join(context.repoRoot, "src", "downloads")),
        sourceHandoutsDir: relativeToRepo(context.repoRoot, path.join(context.repoRoot, "src", "handouts")),
      },
    });
  }

  const sourcePdfFiles = await findSourcePdfFiles(context.repoRoot);
  const untrackedPdfFiles = findUntrackedPdfSourceFiles(context.repoRoot, sourcePdfFiles, trackedPdfs);

  for (const filePath of untrackedPdfFiles) {
    findings.push({
      severity: "high",
      message: `${relativeToRepo(context.repoRoot, filePath)} is copied into the public site but is not declared in src/_data/pdfs.js as an active PDF or legacy alias.`,
    });
  }

  const activeAssetUrls = new Set(assets.map((asset) => asset.url));

  for (const asset of assets) {
    const expectedFilename = path.posix.basename(asset.url);
    const sourcePath = sourcePathFromPdfUrl(context.repoRoot, asset.url);
    const buildPath = path.join(context.siteDir, asset.url.replace(/^\/+/, ""));

    if (asset.filename !== expectedFilename) {
      findings.push({
        severity: "high",
        message: `${asset.key} declares filename ${asset.filename}, but URL resolves to ${expectedFilename}.`,
      });
    }

    if (!(await fileExists(sourcePath))) {
      findings.push({
        severity: "high",
        message: `${asset.key} is missing its source PDF at ${relativeToRepo(context.repoRoot, sourcePath)}.`,
      });
      continue;
    }

    if (!(await fileExists(buildPath))) {
      findings.push({
        severity: "high",
        message: `${asset.key} is missing from the Eleventy output at ${relativeToRepo(context.repoRoot, buildPath)}.`,
      });
    }

    if (!htmlIndex.includes(asset.url)) {
      findings.push({
        severity: "medium",
        message: `${asset.key} (${asset.url}) is not referenced from built public HTML.`,
      });
    }

    if (assetIds.has(asset.assetId)) {
      findings.push({
        severity: "high",
        message: `Duplicate assetId ${asset.assetId} is used by ${assetIds.get(asset.assetId)} and ${asset.key}.`,
      });
    } else {
      assetIds.set(asset.assetId, asset.key);
    }

    const pdfInfoResult = await runCommand("pdfinfo", [sourcePath], { cwd: context.repoRoot });
    if (!pdfInfoResult.ok) {
      findings.push({
        severity: "high",
        message: `${asset.key} could not be inspected via pdfinfo (${pdfInfoResult.message || "unknown error"}).`,
      });
      continue;
    }

    const pdfInfo = parsePdfInfo(pdfInfoResult.stdout);
    const declaredPages = parseDeclaredPageCount(asset.pages);
    const actualPages = Number.parseInt(pdfInfo.Pages || "", 10);

    if (declaredPages && Number.isFinite(actualPages) && declaredPages !== actualPages) {
      findings.push({
        severity: "high",
        message: `${asset.key} declares ${declaredPages} pages but the real PDF has ${actualPages}.`,
      });
    }

    const minRequiredPages = minRequiredPdfPages(asset.key);
    if (minRequiredPages && Number.isFinite(actualPages) && actualPages < minRequiredPages) {
      findings.push({
        severity: "high",
        message: `${asset.key} is an acute clinical handout and must stay at least ${minRequiredPages} pages so the core visual and sources remain readable; real PDF has ${actualPages}.`,
      });
    }

    if (pdfInfo.Title && normalizeWhitespace(pdfInfo.Title) !== normalizeWhitespace(asset.title)) {
      findings.push({
        severity: "medium",
        message: `${asset.key} title drift: metadata says "${pdfInfo.Title}", manifest says "${asset.title}".`,
      });
    }

    if (!isA4(pdfInfo["Page size"])) {
      findings.push({
        severity: "high",
        message: `${asset.key} is not A4 according to pdfinfo (${pdfInfo["Page size"] || "unknown size"}).`,
      });
    }

    await validateExtractableText(context, asset.key, sourcePath, findings);
    await validateAcutePdfLayoutBalance(context, asset.key, sourcePath, findings);
    await validateCriticalLanguageMetadata(context, asset.key, sourcePath, findings);
  }

  for (const alias of legacyPdfAliases) {
    const sourcePath = sourcePathFromPdfUrl(context.repoRoot, alias.url);
    const buildPath = path.join(context.siteDir, alias.url.replace(/^\/+/, ""));

    if (!activeAssetUrls.has(alias.currentUrl)) {
      findings.push({
        severity: "high",
        message: `${alias.key} points to currentUrl ${alias.currentUrl}, but that URL is not declared as an active PDF asset.`,
      });
    }

    if (!(await fileExists(sourcePath))) {
      findings.push({
        severity: "high",
        message: `${alias.key} is missing its legacy source PDF at ${relativeToRepo(context.repoRoot, sourcePath)}.`,
      });
      continue;
    }

    if (!(await fileExists(buildPath))) {
      findings.push({
        severity: "high",
        message: `${alias.key} is missing from the Eleventy output at ${relativeToRepo(context.repoRoot, buildPath)}.`,
      });
    }

    const pdfInfoResult = await runCommand("pdfinfo", [sourcePath], { cwd: context.repoRoot });
    if (!pdfInfoResult.ok) {
      findings.push({
        severity: "high",
        message: `${alias.key} could not be inspected via pdfinfo (${pdfInfoResult.message || "unknown error"}).`,
      });
      continue;
    }

    const pdfInfo = parsePdfInfo(pdfInfoResult.stdout);
    const declaredPages = parseDeclaredPageCount(alias.pages);
    const actualPages = Number.parseInt(pdfInfo.Pages || "", 10);

    if (declaredPages && Number.isFinite(actualPages) && declaredPages !== actualPages) {
      findings.push({
        severity: "high",
        message: `${alias.key} declares ${declaredPages} pages but the real legacy PDF has ${actualPages}.`,
      });
    }

    const minRequiredPages = minRequiredPdfPages(alias.key);
    if (minRequiredPages && Number.isFinite(actualPages) && actualPages < minRequiredPages) {
      findings.push({
        severity: "high",
        message: `${alias.key} is an acute clinical handout and must stay at least ${minRequiredPages} pages so the core visual and sources remain readable; real legacy PDF has ${actualPages}.`,
      });
    }

    if (alias.title && pdfInfo.Title && normalizeWhitespace(pdfInfo.Title) !== normalizeWhitespace(alias.title)) {
      findings.push({
        severity: "medium",
        message: `${alias.key} title drift: metadata says "${pdfInfo.Title}", legacy alias says "${alias.title}".`,
      });
    }

    if (!isA4(pdfInfo["Page size"])) {
      findings.push({
        severity: "high",
        message: `${alias.key} is not A4 according to pdfinfo (${pdfInfo["Page size"] || "unknown size"}).`,
      });
    }

    await validateExtractableText(context, alias.key, sourcePath, findings);
    await validateAcutePdfLayoutBalance(context, alias.key, sourcePath, findings);
    await validateCriticalLanguageMetadata(context, alias.key, sourcePath, findings);
  }

  const hasBlockingFindings = findings.some((finding) => finding.severity === "high");

  return createCheckResult({
    id: "pdf-manifest",
    title: "PDF manifest and assets",
    status: hasBlockingFindings ? "fail" : findings.length > 0 ? "warn" : "pass",
    summary:
      findings.length > 0
        ? `Checked ${assets.length} active PDFs and ${legacyPdfAliases.length} legacy aliases, and found ${findings.length} manifest or file issues.`
        : `Checked ${assets.length} active PDFs and ${legacyPdfAliases.length} legacy aliases with matching filenames, output files, metadata, A4 sizes, and extractable text.`,
    findings,
    metrics: {
      assets: assets.length,
      legacyPdfAliases: legacyPdfAliases.length,
      minimumExtractableTextChars: MIN_EXTRACTABLE_TEXT_CHARS,
      criticalLanguageMetadataAssets: CRITICAL_LANGUAGE_METADATA_KEYS.size,
      requiredPdfTextSnippetAssets: Object.keys(REQUIRED_PDF_TEXT_SNIPPETS).length,
      sourceReferenceMarkers: SOURCE_REFERENCE_MARKERS.length,
      sourcePdfFiles: sourcePdfFiles.length,
      sourceDownloadsDir: relativeToRepo(context.repoRoot, path.join(context.repoRoot, "src", "downloads")),
      sourceHandoutsDir: relativeToRepo(context.repoRoot, path.join(context.repoRoot, "src", "handouts")),
    },
  });
}
