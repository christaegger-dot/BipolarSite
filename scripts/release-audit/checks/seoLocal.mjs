import path from "node:path";
import { readFile } from "node:fs/promises";
import {
  createCheckResult,
  createRepoRequire,
  extractCanonical,
  extractJsonLdBlocks,
  extractMetaContent,
  fileExists,
} from "../lib/shared.mjs";

async function readRequiredFile(filePath) {
  if (!(await fileExists(filePath))) {
    return null;
  }
  return readFile(filePath, "utf8");
}

function extractLastReviewed(html) {
  const blocks = extractJsonLdBlocks(html);
  for (const block of blocks) {
    const match = block.match(/"lastReviewed"\s*:\s*"([^"]+)"/);
    if (match) {
      return match[1];
    }
  }
  return null;
}

export async function runSeoLocalCheck(context) {
  const requireFromRepo = createRepoRequire(context.repoRoot);
  const site = requireFromRepo("./src/_data/site.js");
  const findings = [];

  const robotsPath = path.join(context.siteDir, "robots.txt");
  const sitemapPath = path.join(context.siteDir, "sitemap.xml");
  const robots = await readRequiredFile(robotsPath);
  const sitemap = await readRequiredFile(sitemapPath);

  if (!robots) {
    findings.push({ severity: "high", message: "Local build is missing robots.txt." });
  } else if (!robots.includes(`${site.url}/sitemap.xml`)) {
    findings.push({ severity: "high", message: "robots.txt does not reference the production sitemap URL." });
  }

  if (!sitemap) {
    findings.push({ severity: "high", message: "Local build is missing sitemap.xml." });
  } else if (!sitemap.includes(`<loc>${site.url}/</loc>`)) {
    findings.push({ severity: "medium", message: "sitemap.xml does not include the production home URL." });
  }

  const samplePages = [
    { label: "/", filePath: path.join(context.siteDir, "index.html"), expectMedicalJsonLd: false },
    { label: "/module/", filePath: path.join(context.siteDir, "module", "index.html"), expectMedicalJsonLd: false },
    { label: "/modul/1/", filePath: path.join(context.siteDir, "modul", "1", "index.html"), expectMedicalJsonLd: true },
    { label: "/tools/krisenplan/", filePath: path.join(context.siteDir, "tools", "krisenplan", "index.html"), expectMedicalJsonLd: true },
    { label: "/notfall/", filePath: path.join(context.siteDir, "notfall", "index.html"), expectMedicalJsonLd: true },
  ];

  for (const samplePage of samplePages) {
    const html = await readRequiredFile(samplePage.filePath);
    if (!html) {
      findings.push({
        severity: "high",
        message: `Local build is missing representative page ${samplePage.label}.`,
      });
      continue;
    }

    const canonical = extractCanonical(html);
    if (!canonical) {
      findings.push({
        severity: "high",
        message: `${samplePage.label} is missing a canonical link.`,
      });
    } else if (!canonical.startsWith(site.url)) {
      findings.push({
        severity: "high",
        message: `${samplePage.label} canonical is not absolute production URL based (${canonical}).`,
      });
    }

    const robotsMeta = extractMetaContent(html, "name", "robots");
    if (site.noIndexDeploy) {
      if (!robotsMeta || !robotsMeta.includes("noindex")) {
        findings.push({
          severity: "high",
          message: `${samplePage.label} should be noindex in local builds but is not.`,
        });
      }
    } else if (robotsMeta && robotsMeta.includes("noindex")) {
      findings.push({
        severity: "high",
        message: `${samplePage.label} unexpectedly includes noindex in a production-style build.`,
      });
    }

    const ogUrl = extractMetaContent(html, "property", "og:url");
    if (samplePage.expectMedicalJsonLd && !ogUrl) {
      findings.push({
        severity: "medium",
        message: `${samplePage.label} is missing og:url.`,
      });
    }

    if (!samplePage.expectMedicalJsonLd) {
      continue;
    }

    const lastReviewed = extractLastReviewed(html);
    if (!lastReviewed) {
      findings.push({
        severity: "high",
        message: `${samplePage.label} is missing MedicalWebPage.lastReviewed.`,
      });
    } else if (lastReviewed === "2026-04-06") {
      findings.push({
        severity: "high",
        message: `${samplePage.label} still exposes the legacy hard-coded lastReviewed date 2026-04-06.`,
      });
    }
  }

  const hasBlockingFindings = findings.some((finding) => finding.severity === "high");

  return createCheckResult({
    id: "seo-local",
    title: "Local SEO and metadata",
    status: hasBlockingFindings ? "fail" : findings.length > 0 ? "warn" : "pass",
    summary:
      findings.length > 0
        ? `Checked robots, sitemap, canonicals, noindex behavior, and JSON-LD on representative pages; found ${findings.length} issues.`
        : "Representative local pages expose the expected robots, canonical, Open Graph, and JSON-LD metadata.",
    findings,
    metrics: {
      samplePages: samplePages.length,
      noIndexDeploy: site.noIndexDeploy,
      siteUrl: site.url,
    },
  });
}
