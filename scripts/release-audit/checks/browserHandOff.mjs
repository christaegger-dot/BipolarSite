import { createCheckResult } from "../lib/shared.mjs";

export async function runBrowserHandOffCheck() {
  return createCheckResult({
    id: "browser-hand-off",
    title: "Manual browser hand-off",
    status: "warn",
    summary:
      "The MVP does not automate the full P1 browser matrix yet. Real-device hand-off remains open for iPhone Safari, iPhone Chrome, Desktop Firefox, and Android Chrome as documented in docs/test-matrix.md.",
    findings: [
      {
        severity: "medium",
        message:
          "Treat this as an explicit manual release gate until Playwright-based multi-browser coverage is added in a later phase.",
      },
    ],
    metrics: {
      automatedCoverage: "Desktop build/static/production checks",
      manualCoverageRequired: "P1/P2 browser matrix from docs/test-matrix.md",
    },
  });
}
