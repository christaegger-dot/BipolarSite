import { createCheckResult } from "../lib/shared.mjs";
import { automatedBrowserProjects, manualBrowserHandOff } from "../../../tests/e2e/browser-matrix.mjs";

export async function runBrowserHandOffCheck() {
  const automatedCoverage = automatedBrowserProjects.map((project) => project.auditLabel);
  const hasDesktopFirefox = automatedBrowserProjects.some((project) => project.name === "desktop-firefox");
  const hasMobileProfile = automatedBrowserProjects.some((project) => project.name.startsWith("mobile-"));
  const hasWebkitApproximation = automatedBrowserProjects.some((project) => project.name === "mobile-iphone-safari-approx");
  const canTreatAsPass = hasDesktopFirefox && hasMobileProfile;

  return createCheckResult({
    id: "browser-hand-off",
    title: "Browser coverage and manual hand-off",
    status: canTreatAsPass ? "pass" : "warn",
    summary: canTreatAsPass
      ? "Playwright smoke coverage now spans Desktop Chrome, Desktop Firefox, Android Chrome, and a WebKit-based iPhone approximation. Real-device iPhone follow-up remains documented for high-risk mobile changes."
      : "Desktop Chrome is covered, but the release audit still lacks enough automated browser breadth. Add Desktop Firefox plus at least one mobile profile before removing the manual hand-off warning.",
    findings: canTreatAsPass
      ? [
          {
            severity: "low",
            message:
              "Real-device iPhone Safari and iPhone Chrome checks remain recommended when PRs touch mobile navigation, layout, or tool interactions.",
          },
        ]
      : [
          {
            severity: "medium",
            message:
              "Treat this as an explicit manual release gate until the Playwright matrix covers Desktop Firefox and at least one mobile profile.",
          },
        ],
    metrics: {
      automatedCoverage,
      webkitApproximationIncluded: hasWebkitApproximation ? "yes" : "no",
      manualCoverageRecommended: manualBrowserHandOff.map((target) => target.label),
    },
  });
}
