import path from "node:path";
import { readFile } from "node:fs/promises";
import { createCheckResult, createRepoRequire } from "../lib/shared.mjs";

export async function runConfigDocsCheck(context) {
  const requireFromRepo = createRepoRequire(context.repoRoot);
  const packageJson = requireFromRepo("./package.json");

  const readme = await readFile(path.join(context.repoRoot, "README.md"), "utf8");
  const qaChecklist = await readFile(path.join(context.repoRoot, "docs", "qa-checklist.md"), "utf8");
  const netlifyToml = await readFile(path.join(context.repoRoot, "netlify.toml"), "utf8");

  const findings = [];

  if (!packageJson.scripts?.build || !packageJson.scripts?.lint || !packageJson.scripts?.["lint:html"]) {
    findings.push({
      severity: "high",
      message: "package.json is missing one of the core scripts: build, lint, or lint:html.",
    });
  }

  if (!readme.includes("npm install && npx eleventy")) {
    findings.push({
      severity: "medium",
      message: "README.md does not mention the current Netlify build command `npm install && npx eleventy`.",
    });
  }

  if (!readme.includes("Node-Version: 22") && !readme.includes("Node-Version: 22".replace("-", " "))) {
    findings.push({
      severity: "medium",
      message: "README.md does not document Node 22 as the deployment runtime.",
    });
  }

  if (!qaChecklist.includes("npm run lint:html")) {
    findings.push({
      severity: "high",
      message: "docs/qa-checklist.md does not reference the real `npm run lint:html` command.",
    });
  }

  if (readme.includes("sw.js") || netlifyToml.includes("sw.js")) {
    findings.push({
      severity: "medium",
      message: "README.md or netlify.toml still references sw.js although the file is no longer part of the project.",
    });
  }

  const hasBlockingFindings = findings.some((finding) => finding.severity === "high");

  return createCheckResult({
    id: "config-docs",
    title: "Config and documentation drift",
    status: hasBlockingFindings ? "fail" : findings.length > 0 ? "warn" : "pass",
    summary:
      findings.length > 0
        ? `Checked package scripts, README, QA docs, and netlify.toml; found ${findings.length} drift issues.`
        : "Config and release-facing documentation look aligned with the current repo setup.",
    findings,
    metrics: {
      scriptsChecked: ["build", "lint", "lint:html"],
    },
  });
}
