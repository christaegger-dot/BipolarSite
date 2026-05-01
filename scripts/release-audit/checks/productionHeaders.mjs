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

export async function runProductionHeadersCheck(context) {
  const requireFromRepo = createRepoRequire(context.repoRoot);
  const site = requireFromRepo("./src/_data/site.js");
  const findings = [];

  try {
    const home = await fetchTextResponse(site.url);
    if (!home.response.ok) {
      return createCheckResult({
        id: "production-headers",
        title: "Production headers and metadata",
        status: "fail",
        summary: `Could not fetch ${site.url} successfully.`,
        findings: [
          {
            severity: "high",
            message: `${site.url} returned HTTP ${home.response.status}.`,
          },
        ],
        metrics: { siteUrl: site.url },
      });
    }

    expectHeader(findings, site.url, home.response.headers, "x-frame-options", "SAMEORIGIN");
    expectHeader(findings, site.url, home.response.headers, "x-content-type-options", "nosniff");
    expectHeader(findings, site.url, home.response.headers, "content-security-policy", "default-src 'self'");
    expectHeader(findings, site.url, home.response.headers, "cache-control", "max-age=300", "medium");

    const canonical = extractCanonical(home.text);
    if (canonical !== `${site.url}/`) {
      findings.push({
        severity: "high",
        message: `Production home canonical should be ${site.url}/ but is ${canonical || "missing"}.`,
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
    if (ogUrl !== `${site.url}/`) {
      findings.push({
        severity: "medium",
        message: `Production home og:url should be ${site.url}/ but is ${ogUrl || "missing"}.`,
      });
    }

    const cleanHtmlUrls = [`${site.url}/module/`, `${site.url}/notfall/`];
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
      `${site.url}/downloads/notfallkarte-kanton-zuerich-puk.pdf`,
      `${site.url}/handouts/grenzsetzung.pdf`,
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
      expectHeader(findings, url, response.headers, "cache-control", "max-age=604800", "medium");
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/pdf")) {
        findings.push({
          severity: "high",
          message: `${url} should be served as application/pdf but is ${contentType || "missing"}.`,
        });
      }
    }

    const robotsUrl = `${site.url}/robots.txt`;
    const robots = await fetchTextResponse(robotsUrl);
    if (!robots.response.ok) {
      findings.push({
        severity: "high",
        message: `${robotsUrl} returned HTTP ${robots.response.status}.`,
      });
    } else if (!robots.text.includes(`${site.url}/sitemap.xml`)) {
      findings.push({
        severity: "high",
        message: "Production robots.txt does not point to the production sitemap URL.",
      });
    }

    const sitemapUrl = `${site.url}/sitemap.xml`;
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
    return createCheckResult({
      id: "production-headers",
      title: "Production headers and metadata",
      status: "fail",
      summary: "Production audit could not complete because the live site was unreachable.",
      findings: [
        {
          severity: "high",
          message: error.message,
        },
      ],
      metrics: { siteUrl: site.url },
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
      siteUrl: site.url,
      htmlUrls: 3,
      pdfUrls: 2,
    },
  });
}
