export const automatedBrowserProjects = [
  {
    name: "desktop-chrome",
    device: "Desktop Chrome",
    auditLabel: "Desktop Chrome",
    priority: "P1",
    coverage: "full",
  },
  {
    name: "desktop-firefox",
    device: "Desktop Firefox",
    auditLabel: "Desktop Firefox",
    priority: "P1",
    coverage: "full",
  },
  {
    name: "mobile-android-chrome",
    device: "Pixel 7",
    auditLabel: "Android Chrome (Pixel 7)",
    priority: "P2",
    coverage: "sample",
  },
  {
    name: "mobile-iphone-safari-approx",
    device: "iPhone 13",
    auditLabel: "iPhone Safari approximation (WebKit)",
    priority: "P1",
    coverage: "approximation",
  },
];

export const manualBrowserHandOff = [
  {
    label: "real iPhone Safari",
    reason: "final confidence for mobile navigation, layout, and tool interactions",
  },
  {
    label: "real iPhone Chrome",
    reason: "final confidence for mobile navigation, layout, and tool interactions",
  },
];
