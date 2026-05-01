import path from "node:path";
import {
  createCheckResult,
  findExistingOutputPath,
  loadHtmlPages,
  relativeToRepo,
} from "../lib/shared.mjs";

const IGNORE_PROTOCOLS = ["http:", "https:", "mailto:", "tel:", "javascript:", "data:"];

export async function runInternalLinksCheck(context) {
  const pages = await loadHtmlPages(context.siteDir);
  const pageByFilePath = new Map(pages.map((page) => [page.filePath, page]));

  let checkedLinks = 0;
  let checkedAnchors = 0;
  const findings = [];

  for (const page of pages) {
    for (const href of page.hrefs) {
      if (!href || href.startsWith("//")) {
        continue;
      }

      if (IGNORE_PROTOCOLS.some((protocol) => href.startsWith(protocol))) {
        continue;
      }

      if (href.startsWith("?")) {
        continue;
      }

      checkedLinks += 1;

      const resolvedUrl = new URL(href, `https://audit.local${page.url}`);
      const targetPath = resolvedUrl.pathname;
      const targetHash = resolvedUrl.hash ? resolvedUrl.hash.slice(1) : "";

      if (targetPath === page.url && targetHash) {
        checkedAnchors += 1;
        if (!page.ids.has(targetHash)) {
          findings.push({
            severity: "high",
            message: `${page.url} links to missing local anchor #${targetHash}.`,
          });
        }
        continue;
      }

      const targetFilePath = await findExistingOutputPath(context.siteDir, targetPath);
      if (!targetFilePath) {
        findings.push({
          severity: "high",
          message: `${page.url} links to missing internal target ${targetPath}.`,
        });
        continue;
      }

      if (!targetHash) {
        continue;
      }

      if (!targetFilePath.endsWith(".html")) {
        findings.push({
          severity: "medium",
          message: `${page.url} uses anchor ${resolvedUrl.hash} on non-HTML target ${targetPath}.`,
        });
        continue;
      }

      checkedAnchors += 1;
      const targetPage = pageByFilePath.get(targetFilePath);
      if (!targetPage || !targetPage.ids.has(targetHash)) {
        findings.push({
          severity: "high",
          message: `${page.url} links to missing anchor ${resolvedUrl.hash} on ${targetPath}.`,
        });
      }
    }
  }

  if (findings.length > 0) {
    return createCheckResult({
      id: "internal-links",
      title: "Internal links and anchors",
      status: "fail",
      summary: `Checked ${checkedLinks} internal links and ${checkedAnchors} anchors in ${pages.length} built HTML pages; found ${findings.length} issues.`,
      findings,
      metrics: {
        pages: pages.length,
        checkedLinks,
        checkedAnchors,
      },
    });
  }

  return createCheckResult({
    id: "internal-links",
    title: "Internal links and anchors",
    status: "pass",
    summary: `Checked ${checkedLinks} internal links and ${checkedAnchors} anchors in ${pages.length} built HTML pages with no issues.`,
    findings: [],
    metrics: {
      pages: pages.length,
      checkedLinks,
      checkedAnchors,
      siteDir: relativeToRepo(context.repoRoot, path.join(context.siteDir)),
    },
  });
}
