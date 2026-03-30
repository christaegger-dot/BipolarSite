import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop-Komponente
 *
 * Behebt das "Scroll-Restore"-Problem auf iOS/Safari:
 * Beim Navigieren merkt sich der Browser die Scroll-Position und setzt
 * den Nutzer auf der neuen Seite an eine ähnliche Stelle – statt ganz oben.
 *
 * Diese Komponente:
 * 1. Deaktiviert die automatische Scroll-Restoration des Browsers
 * 2. Scrollt bei jedem Route-Wechsel nach oben (0, 0)
 * 3. Behandelt auch den iOS/Safari bfcache via pageshow-Event
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Deaktiviere Browser's automatische Scroll-Restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Scrolle nach oben bei Route-Wechsel
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // Zusätzlicher Handler für iOS/Safari bfcache
    const handlePageShow = (event: PageTransitionEvent) => {
      // pageshow triggert auch bei bfcache (iOS/Safari wichtig)
      if (event.persisted) {
        // Seite wurde aus dem bfcache geladen
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
}
