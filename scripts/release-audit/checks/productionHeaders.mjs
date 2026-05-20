import {
  createCheckResult,
  createRepoRequire,
  extractCanonical,
  extractMetaContent,
} from "../lib/shared.mjs";

async function fetchTextResponse(url) {
  const response = await fetch(url, { redirect: "follow" });
  const text = await response.text();
  return { response, text };
}

async function fetchResponse(url) {
  const response = await fetch(url, { redirect: "follow" });
  await response.arrayBuffer();
  return response;
}

function expectHeader(findings, url, headers, name, expectedFragment, severity = "high") {
  const actual = headers.get(name);
  if (!actual || !actual.includes(expectedFragment)) {
    findings.push({
      severity,
      message: `${url} is missing ${name}: ${expectedFragment}. Actual value: ${actual || "none"}.`,
    });
  }
}

function createUnreachableResult(baseUrl, reason, { blocking = false } = {}) {
  return createCheckResult({
    id: "production-headers",
    title: "Production headers and metadata",
    status: blocking ? "fail" : "warn",
    summary: blocking
      ? "Production-only audit could not complete because the live site was unreachable."
      : "Production reachability check did not complete; local release checks remain valid.",
    findings: [
      {
        severity: blocking ? "high" : "medium",
        message: `Reachability error for ${baseUrl}: ${reason}`,
      },
    ],
    metrics: {
      siteUrl: baseUrl,
      reachable: false,
      mode: blocking ? "production-only" : "full-audit",
    },
  });
}

export async function runProductionHeadersCheck(context) {
  const requireFromRepo = createRepoRequire(context.repoRoot);
  const site = requireFromRepo("./src/_data/site.js");
  const baseUrl = context.baseUrl || site.url;
  const findings = [];

  try {
    const home = await fetchTextResponse(baseUrl);
    if (!home.response.ok) {
      return createUnreachableResult(baseUrl, `${baseUrl} returned HTTP ${home.response.status}.`, {
        blocking: context.args?.productionOnly === true,
      });
    }

    expectHeader(findings, baseUrl, home.response.headers, "x-frame-options", "SAMEORIGIN");
    expectHeader(findings, baseUrl, home.response.headers, "x-content-type-options", "nosniff");
    expectHeader(findings, baseUrl, home.response.headers, "content-security-policy", "default-src 'self'");
    expectHeader(findings, baseUrl, home.response.headers, "content-security-policy", "style-src 'self'");
    expectHeader(findings, baseUrl, home.response.headers, "content-security-policy", "style-src-elem 'self'");
    expectHeader(findings, baseUrl, home.response.headers, "cache-control", "max-age=300", "medium");

    const csp = home.response.headers.get("content-security-policy") || "";
    if (/style-src\s+[^;]*'unsafe-inline'/.test(csp)) {
      findings.push({
        severity: "high",
        message: "Production CSP still allows broad inline CSS via style-src 'unsafe-inline'.",
      });
    }

    const canonical = extractCanonical(home.text);
    if (canonical !== `${baseUrl}/`) {
      findings.push({
        severity: "high",
        message: `Production home canonical should be ${baseUrl}/ but is ${canonical || "missing"}.`,
      });
    }

    const robotsMeta = extractMetaContent(home.text, "name", "robots");
    if (robotsMeta && robotsMeta.includes("noindex")) {
      findings.push({
        severity: "high",
        message: "Production home unexpectedly exposes a noindex robots meta tag.",
      });
    }

    const ogUrl = extractMetaContent(home.text, "property", "og:url");
    if (ogUrl !== `${baseUrl}/`) {
      findings.push({
        severity: "medium",
        message: `Production home og:url should be ${baseUrl}/ but is ${ogUrl || "missing"}.`,
      });
    }

    const cleanHtmlUrls = [`${baseUrl}/module/`, `${baseUrl}/notfall/`];
    for (const url of cleanHtmlUrls) {
      const response = await fetchTextResponse(url);
      if (!response.response.ok) {
        findings.push({
          severity: "high",
          message: `${url} returned HTTP ${response.response.status}.`,
        });
        continue;
      }
      expectHeader(findings, url, response.response.headers, "cache-control", "max-age=300", "medium");
      const pageRobots = extractMetaContent(response.text, "name", "robots");
      if (pageRobots && pageRobots.includes("noindex")) {
        findings.push({
          severity: "high",
          message: `${url} unexpectedly exposes a noindex robots meta tag.`,
        });
      }
    }

    const staticPdfUrls = [
      `${baseUrl}/downloads/notfallkarte-kanton-zuerich-puk.pdf`,
      `${baseUrl}/handouts/a1_bipolare_stoerung_verstehen.pdf`,
    ];
    for (const url of staticPdfUrls) {
      const response = await fetchResponse(url);
      if (!response.ok) {
        findings.push({
          severity: "high",
          message: `${url} returned HTTP ${response.status}.`,
        });
        continue;
      }
      expectHeader(findings, url, response.headers, "cache-control", "max-age=300", "medium");
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/pdf")) {
        findings.push({
          severity: "high",
          message: `${url} should be served as application/pdf but is ${contentType || "missing"}.`,
        });
      }
    }

    const robotsUrl = `${baseUrl}/robots.txt`;
    const robots = await fetchTextResponse(robotsUrl);
    if (!robots.response.ok) {
      findings.push({
        severity: "high",
        message: `${robotsUrl} returned HTTP ${robots.response.status}.`,
      });
    } else if (!robots.text.includes(`${baseUrl}/sitemap.xml`)) {
      findings.push({
        severity: "high",
        message: "Production robots.txt does not point to the production sitemap URL.",
      });
    }

    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    const sitemap = await fetchTextResponse(sitemapUrl);
    if (!sitemap.response.ok) {
      findings.push({
        severity: "high",
        message: `${sitemapUrl} returned HTTP ${sitemap.response.status}.`,
      });
    } else if (!sitemap.text.includes(`<loc>${site.url}/</loc>`)) {
      findings.push({
        severity: "medium",
        message: "Production sitemap.xml does not include the home URL entry.",
      });
    }
  } catch (error) {
    return createUnreachableResult(baseUrl, error.message, {
      blocking: context.args?.productionOnly === true,
    });
  }

  const hasBlockingFindings = findings.some((finding) => finding.severity === "high");

  return createCheckResult({
    id: "production-headers",
    title: "Production headers and metadata",
    status: hasBlockingFindings ? "fail" : findings.length > 0 ? "warn" : "pass",
    summary:
      findings.length > 0
        ? `Production headers and metadata were checked on representative HTML and PDF URLs; found ${findings.length} issues.`
        : "Production HTML, PDF, cache, robots, sitemap, canonical, and security headers look consistent.",
    findings,
    metrics: {
      siteUrl: baseUrl,
      htmlUrls: 3,
      pdfUrls: 2,
    },
  });
}
