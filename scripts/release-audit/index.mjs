#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { runBuildLintCheck } from "./checks/buildLint.mjs";
import { runBrowserHandOffCheck } from "./checks/browserHandOff.mjs";
import { runConfigDocsCheck } from "./checks/configDocs.mjs";
import { runInternalLinksCheck } from "./checks/internalLinks.mjs";
import { runPdfManifestCheck } from "./checks/pdfManifest.mjs";
import { runProductionHeadersCheck } from "./checks/productionHeaders.mjs";
import { runSeoLocalCheck } from "./checks/seoLocal.mjs";
import { buildReport, createCheckResult, renderTextReport } from "./lib/shared.mjs";

function parseArgs(argv) {
  return {
    json: argv.includes("--json"),
    skipProduction: argv.includes("--skip-production"),
    productionOnly: argv.includes("--production-only"),
  };
}

function createSkippedCheck(id, title, reason) {
  return createCheckResult({
    id,
    title,
    status: "skip",
    summary: reason,
    findings: [],
    metrics: {},
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(scriptDir, "..", "..");
  const siteDir = path.join(repoRoot, "_site");
  const context = { repoRoot, siteDir, args };
  const results = [];

  if (args.productionOnly) {
    results.push(await runProductionHeadersCheck(context));
  } else {
    results.push(await runConfigDocsCheck(context));

    const buildLint = await runBuildLintCheck(context);
    results.push(buildLint);

    if (buildLint.status === "pass") {
      results.push(await runInternalLinksCheck(context));
      results.push(await runPdfManifestCheck(context));
      results.push(await runSeoLocalCheck(context));
    } else {
      results.push(
        createSkippedCheck(
          "internal-links",
          "Internal links and anchors",
          "Skipped because the build/lint gate did not complete successfully."
        )
      );
      results.push(
        createSkippedCheck(
          "pdf-manifest",
          "PDF manifest and assets",
          "Skipped because the build/lint gate did not complete successfully."
        )
      );
      results.push(
        createSkippedCheck(
          "seo-local",
          "Local SEO and metadata",
          "Skipped because the build/lint gate did not complete successfully."
        )
      );
    }

    results.push(await runBrowserHandOffCheck(context));

    if (!args.skipProduction) {
      results.push(await runProductionHeadersCheck(context));
    }
  }

  const report = buildReport(results, args);

  if (args.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(`${renderTextReport(report)}\n`);
  }

  process.exit(report.overallStatus === "fail" ? 1 : 0);
}

await main();
