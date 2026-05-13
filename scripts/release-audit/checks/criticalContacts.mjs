import path from "node:path";
import { createRequire } from "node:module";
import {
  createCheckResult,
  loadHtmlPages,
  relativeToRepo,
} from "../lib/shared.mjs";

const ACCEPTED_EXTERNAL_STATUSES = new Set([403, 429]);
const REQUEST_TIMEOUT_MS = 10_000;
const REQUEST_ATTEMPTS = 3;
const RETRY_DELAY_MS = 750;

function normalizePhoneDigits(value) {
  return value.replace(/[^\d+]/g, "");
}

export function comparableSwissPhone(value) {
  const normalized = normalizePhoneDigits(value);
  if (normalized.startsWith("+41")) {
    return normalized.slice(1);
  }
  if (normalized.startsWith("0")) {
    return `41${normalized.slice(1)}`;
  }
  return normalized.replace(/^\+/, "");
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isAllowedExternalStatus(status) {
  return (status >= 200 && status < 400) || ACCEPTED_EXTERNAL_STATUSES.has(status);
}

function shouldRetryResult(result) {
  if (result.ok) {
    return false;
  }
  if (result.status === null) {
    return true;
  }
  return result.status >= 500;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchExternalUrlOnce(url, fetchImpl = fetch) {
  const requestOptions = {
    redirect: "follow",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      "user-agent": "BipolarSite release audit (+https://bipolarsite.netlify.app)",
    },
  };

  let headError = null;
  try {
    const headResponse = await fetchImpl(url, { ...requestOptions, method: "HEAD" });
    if (isAllowedExternalStatus(headResponse.status)) {
      return { ok: true, status: headResponse.status, finalUrl: headResponse.url };
    }
  } catch (error) {
    headError = error instanceof Error ? error.message : String(error);
  }

  try {
    const getResponse = await fetchImpl(url, { ...requestOptions, method: "GET" });
    return {
      ok: isAllowedExternalStatus(getResponse.status),
      status: getResponse.status,
      finalUrl: getResponse.url,
      message: headError ? `HEAD failed (${headError}); GET returned HTTP ${getResponse.status}` : undefined,
    };
  } catch (error) {
    const getError = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      status: null,
      finalUrl: url,
      message: headError ? `HEAD failed (${headError}); GET failed (${getError})` : getError,
    };
  }
}

export async function fetchExternalUrl(url, options = {}) {
  const {
    attempts = REQUEST_ATTEMPTS,
    retryDelayMs = RETRY_DELAY_MS,
    fetchImpl = fetch,
  } = options;
  let lastResult = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    lastResult = await fetchExternalUrlOnce(url, fetchImpl);
    if (!shouldRetryResult(lastResult) || attempt === attempts) {
      return { ...lastResult, attempts: attempt };
    }
    if (retryDelayMs > 0) {
      await sleep(retryDelayMs);
    }
  }

  return lastResult ? { ...lastResult, attempts } : {
    ok: false,
    status: null,
    finalUrl: url,
    message: "No request attempts were made.",
    attempts: 0,
  };
}

function createHtmlHrefSet(pages) {
  const hrefs = new Set();
  for (const page of pages) {
    for (const href of page.hrefs) {
      hrefs.add(href);
    }
  }
  return hrefs;
}

export async function runCriticalContactsCheck(context) {
  const require = createRequire(path.join(context.repoRoot, "package.json"));
  const sources = require(path.join(context.repoRoot, "src/_data/sources.js"));
  const pages = await loadHtmlPages(context.siteDir);
  const hrefs = createHtmlHrefSet(pages);
  const contacts = Object.values(sources.contacts || {});
  const checkedExternalUrls = new Map();
  const findings = [];

  for (const contact of contacts) {
    const label = contact.label || contact.title || contact.id;

    if (!contact.id) {
      findings.push({
        severity: "high",
        message: "A centrally maintained contact is missing an id.",
      });
    }

    if (!contact.sourceId || !sources.byId?.[contact.sourceId]) {
      findings.push({
        severity: "high",
        message: `${label} is missing a valid sourceId that points to the bibliography.`,
      });
    }

    if (!contact.href || !contact.href.startsWith("tel:")) {
      findings.push({
        severity: "high",
        message: `${label} is missing a tel: href.`,
      });
    } else if (!/^tel:\+?\d{3,15}$/.test(contact.href)) {
      findings.push({
        severity: "high",
        message: `${label} has an invalid tel: href (${contact.href}).`,
      });
    }

    if (!contact.display) {
      findings.push({
        severity: "high",
        message: `${label} is missing a display phone number.`,
      });
    } else if (contact.href && comparableSwissPhone(contact.href.slice("tel:".length)) !== comparableSwissPhone(contact.display)) {
      findings.push({
        severity: "high",
        message: `${label} display number (${contact.display}) does not match href (${contact.href}).`,
      });
    }

    if (!contact.url) {
      findings.push({
        severity: "high",
        message: `${label} is missing an external contact URL.`,
      });
    } else {
      let parsedUrl = null;
      try {
        parsedUrl = new URL(contact.url);
      } catch {
        findings.push({
          severity: "high",
          message: `${label} has an invalid external URL (${contact.url}).`,
        });
      }

      if (parsedUrl && parsedUrl.protocol !== "https:") {
        findings.push({
          severity: "high",
          message: `${label} external URL must use https (${contact.url}).`,
        });
      }

      if (parsedUrl && !checkedExternalUrls.has(contact.url)) {
        checkedExternalUrls.set(contact.url, await fetchExternalUrl(contact.url));
      }
    }

    if (contact.email && !isValidEmail(contact.email)) {
      findings.push({
        severity: "high",
        message: `${label} has an invalid email address (${contact.email}).`,
      });
    }

    for (const requiredHref of [contact.href, contact.url, contact.email ? `mailto:${contact.email}` : null].filter(Boolean)) {
      if (!hrefs.has(requiredHref)) {
        findings.push({
          severity: "medium",
          message: `${label} href is centrally maintained but not present in the built site (${requiredHref}).`,
        });
      }
    }
  }

  for (const [url, result] of checkedExternalUrls.entries()) {
    if (!result.ok) {
      findings.push({
        severity: "high",
        message: result.status
          ? `Critical contact URL returned HTTP ${result.status}: ${url}`
          : `Critical contact URL could not be reached: ${url} (${result.message})`,
      });
    }
  }

  if (findings.length > 0) {
    return createCheckResult({
      id: "critical-contacts",
      title: "Critical external contacts",
      status: "fail",
      summary: `Checked ${contacts.length} central contacts and ${checkedExternalUrls.size} unique external URLs; found ${findings.length} issues.`,
      findings,
      metrics: {
        contacts: contacts.length,
        checkedExternalUrls: checkedExternalUrls.size,
        pages: pages.length,
        siteDir: relativeToRepo(context.repoRoot, path.join(context.siteDir)),
      },
    });
  }

  return createCheckResult({
    id: "critical-contacts",
    title: "Critical external contacts",
    status: "pass",
    summary: `Checked ${contacts.length} central contacts and ${checkedExternalUrls.size} unique external URLs with no release-blocking issues.`,
    findings: [],
    metrics: {
      contacts: contacts.length,
      checkedExternalUrls: checkedExternalUrls.size,
      pages: pages.length,
      acceptedExternalStatuses: ["2xx", "3xx", ...ACCEPTED_EXTERNAL_STATUSES].join(", "),
      siteDir: relativeToRepo(context.repoRoot, path.join(context.siteDir)),
    },
  });
}
