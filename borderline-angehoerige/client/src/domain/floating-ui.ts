export type MobileFloatingMode = "crisis" | "content" | "default";

const CRISIS_ROUTES = ["/soforthilfe", "/unterstuetzen/krise"];
const CONTENT_ROUTES = [
  "/verstehen",
  "/unterstuetzen/uebersicht",
  "/selbstfuersorge",
  "/materialien",
  "/genesung",
  "/kommunizieren",
  "/grenzen",
];

export function getMobileFloatingMode(location: string): MobileFloatingMode {
  if (CRISIS_ROUTES.some(route => location.startsWith(route))) {
    return "crisis";
  }
  if (CONTENT_ROUTES.some(route => location.startsWith(route))) {
    return "content";
  }
  return "default";
}
