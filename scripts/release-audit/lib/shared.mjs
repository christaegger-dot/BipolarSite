import { execFile } from "node:child_process";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const STATUS_PRIORITY = {
  pass: 0,
  skip: 1,
  warn: 1,
  fail: 2,
};

export function createRepoRequire(repoRoot) {
  return createRequire(path.join(repoRoot, "package.json"));
}

export async function runCommand(command, args, options = {}) {
  try {
    const result = await execFileAsync(command, args, {
      cwd: options.cwd,
      env: { ...process.env, ...(options.env || {}) },
      maxBuffer: 20 * 1024 * 1024,
    });
    return { ok: true, code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    return {
      ok: false,
      code: error.code ?? 1,
      stdout: error.stdout ?? "",
      stderr: error.stderr ?? "",
      message: error.message,
    };
  }
}

export async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function walkFiles(rootDir, predicate = () => true) {
  const files = [];

  async function visit(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await visit(fullPath);
      } else if (predicate(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  if (!(await fileExists(rootDir))) {
    return [];
  }

  await visit(rootDir);
  return files.sort();
}

export function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

export function relativeToRepo(repoRoot, targetPath) {
  return toPosixPath(path.relative(repoRoot, targetPath));
}

export function outputFileToUrl(siteDir, filePath) {
  const relativePath = toPosixPath(path.relative(siteDir, filePath));
  if (relativePath === "index.html") {
    return "/";
  }
  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.slice(0, -"index.html".length)}`;
  }
  return `/${relativePath}`;
}

export function extractHrefs(html) {
  const withoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  return [...withoutScripts.matchAll(/\bhref=(["'])(.*?)\1/gs)].map((match) => match[2]);
}

export function extractIds(html) {
  return new Set([...html.matchAll(/\bid=(["'])(.*?)\1/gs)].map((match) => match[2]));
}

export async function loadHtmlPages(siteDir) {
  const files = await walkFiles(siteDir, (filePath) => filePath.endsWith(".html"));
  const pages = [];
  for (const filePath of files) {
    const html = await readFile(filePath, "utf8");
    pages.push({
      filePath,
      url: outputFileToUrl(siteDir, filePath),
      html,
      ids: extractIds(html),
      hrefs: extractHrefs(html),
    });
  }
  return pages;
}

export function resolveOutputCandidates(siteDir, pathname) {
  const cleanPath = decodeURIComponent(pathname);
  const relativePath = cleanPath.replace(/^\/+/, "");

  if (!relativePath) {
    return [path.join(siteDir, "index.html")];
  }

  if (cleanPath.endsWith("/")) {
    return [path.join(siteDir, relativePath, "index.html")];
  }

  if (path.extname(relativePath)) {
    return [path.join(siteDir, relativePath)];
  }

  return [
    path.join(siteDir, relativePath),
    path.join(siteDir, `${relativePath}.html`),
    path.join(siteDir, relativePath, "index.html"),
  ];
}

export async function findExistingOutputPath(siteDir, pathname) {
  const candidates = resolveOutputCandidates(siteDir, pathname);
  for (const candidate of candidates) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }
  return null;
}

export function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

export function extractMetaContent(html, attribute, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const attrValue = extractTagAttribute(tag, attribute);
    if (attrValue !== name) {
      continue;
    }
    const content = extractTagAttribute(tag, "content");
    if (content) {
      return content;
    }
  }
  return null;
}

export function extractCanonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of tags) {
    if (extractTagAttribute(tag, "rel") !== "canonical") {
      continue;
    }
    const href = extractTagAttribute(tag, "href");
    if (href) {
      return href;
    }
  }
  return null;
}

export function extractJsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]+type=(["'])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[2].trim())
    .filter(Boolean);
}

export function extractTagAttribute(tag, attributeName) {
  const regex = new RegExp(`\\b${attributeName}=(["'])(.*?)\\1`, "i");
  const match = tag.match(regex);
  return match ? match[2] : null;
}

export function createCheckResult(result) {
  return {
    id: result.id,
    title: result.title,
    status: result.status,
    summary: result.summary,
    findings: result.findings || [],
    metrics: result.metrics || {},
  };
}

export function buildReport(results, options) {
  const counts = { pass: 0, warn: 0, fail: 0, skip: 0 };
  for (const result of results) {
    counts[result.status] = (counts[result.status] || 0) + 1;
  }

  let overallStatus = "pass";
  for (const result of results) {
    const currentPriority = STATUS_PRIORITY[result.status] ?? 0;
    const overallPriority = STATUS_PRIORITY[overallStatus] ?? 0;
    if (currentPriority > overallPriority) {
      overallStatus = result.status === "skip" ? "warn" : result.status;
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    overallStatus,
    counts,
    options,
    results,
  };
}

export function renderTextReport(report) {
  const lines = [];
  lines.push(`Release Audit: ${report.overallStatus.toUpperCase()}`);
  lines.push("");
  lines.push(
    `Checks: ${report.counts.pass} pass, ${report.counts.warn} warn, ${report.counts.fail} fail, ${report.counts.skip} skip`
  );
  lines.push("");

  for (const result of report.results) {
    lines.push(`[${result.status.toUpperCase()}] ${result.title}`);
    lines.push(result.summary);
    if (result.findings.length > 0) {
      for (const finding of result.findings) {
        const prefix = finding.severity ? `${finding.severity.toUpperCase()}: ` : "";
        lines.push(`- ${prefix}${finding.message}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}
