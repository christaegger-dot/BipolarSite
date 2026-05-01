import path from "node:path";
import {
  createCheckResult,
  createRepoRequire,
  fileExists,
  loadHtmlPages,
  normalizeWhitespace,
  relativeToRepo,
  runCommand,
} from "../lib/shared.mjs";

function flattenAssets(pdfs) {
  return [...Object.values(pdfs.downloads), ...Object.values(pdfs.handouts)];
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

export async function runPdfManifestCheck(context) {
  const requireFromRepo = createRepoRequire(context.repoRoot);
  const pdfs = requireFromRepo("./src/_data/pdfs.js");
  const assets = flattenAssets(pdfs);
  const pages = await loadHtmlPages(context.siteDir);
  const htmlIndex = pages.map((page) => page.html).join("\n");

  const findings = [];
  const assetIds = new Map();
  let pdfInfoAvailable = true;

  for (const asset of assets) {
    const expectedFilename = path.posix.basename(asset.url);
    const sourcePath = path.join(context.repoRoot, "src", asset.url.replace(/^\/+/, ""));
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

    if (!pdfInfoAvailable) {
      continue;
    }

    const pdfInfoResult = await runCommand("pdfinfo", [sourcePath], { cwd: context.repoRoot });
    if (!pdfInfoResult.ok) {
      pdfInfoAvailable = false;
      findings.push({
        severity: "medium",
        message: `pdfinfo is unavailable, so page-count/title/A4 checks were skipped (${pdfInfoResult.message || "unknown error"}).`,
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
  }

  const hasBlockingFindings = findings.some((finding) => finding.severity === "high");

  return createCheckResult({
    id: "pdf-manifest",
    title: "PDF manifest and assets",
    status: hasBlockingFindings ? "fail" : findings.length > 0 ? "warn" : "pass",
    summary:
      findings.length > 0
        ? `Checked ${assets.length} PDFs and found ${findings.length} manifest or file issues.`
        : `Checked ${assets.length} PDFs with matching filenames, output files, metadata, and A4 sizes.`,
    findings,
    metrics: {
      assets: assets.length,
      sourceDownloadsDir: relativeToRepo(context.repoRoot, path.join(context.repoRoot, "src", "downloads")),
      sourceHandoutsDir: relativeToRepo(context.repoRoot, path.join(context.repoRoot, "src", "handouts")),
    },
  });
}
