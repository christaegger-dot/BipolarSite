import { useState, useEffect, useRef, useCallback } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import {
  ChevronUp,
  ChevronRight,
  Home,
  List,
  X,
  ArrowLeft,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { getMobileFloatingMode } from "@/domain/floating-ui";

// Zurück-nach-oben-Button
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();
  const floatingMode = getMobileFloatingMode(location);
  const hideOnMobile = floatingMode !== "default";

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={scrollToTop}
          className={`fixed right-4 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-navy hover:bg-navy-light text-white shadow-lg items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${hideOnMobile ? "hidden sm:flex" : "flex"}`}
          style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
          aria-label="Nach oben scrollen"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Breadcrumb-Navigation mit Zurück-Pfeil und kontextbezogener Hierarchie
const pageNames: Record<string, string> = {
  "/": "Startseite",
  "/verstehen": "Borderline verstehen",
  "/unterstuetzen": "Unterstützen",
  "/unterstuetzen/uebersicht": "Grundlagen",
  "/unterstuetzen/alltag": "Alltag",
  "/unterstuetzen/therapie": "Therapie",
  "/unterstuetzen/krise": "Krise",
  "/kommunizieren": "Kommunizieren",
  "/grenzen": "Grenzen setzen",
  "/selbstfuersorge": "Selbstfürsorge",
  "/soforthilfe": "Soforthilfe",
  "/materialien": "Materialien",
  "/selbsttest": "Selbsttest",
  "/genesung": "Genesung",
  "/beratung": "Beratung & Netzwerke",
  "/selbsthilfegruppen": "Selbsthilfegruppen",
  "/impressum": "Impressum",
  "/datenschutz": "Datenschutz",
  "/ueber-uns": "Über uns",
  "/faq": "Häufige Fragen",
  "/glossar": "Glossar",
  "/buchempfehlungen": "Buchempfehlungen",
  "/feedback": "Feedback",
};

// Kontextbezogene Elternseite bestimmen
function getParentInfo(
  location: string
): { href: string; label: string } | null {
  // Unterstützen-Unterseiten → Elternseite ist Unterstützen
  if (location.startsWith("/unterstuetzen/")) {
    return { href: "/unterstuetzen/uebersicht", label: "Unterstützen" };
  }
  return null;
}

export function Breadcrumbs() {
  const [location] = useLocation();

  // Nicht auf der Startseite anzeigen
  if (location === "/") return null;

  const pageName =
    pageNames[location] || location.split("/").pop()?.replace(/-/g, " ") || "";
  const parent = getParentInfo(location);

  // Zurück-Ziel bestimmen: Elternseite oder Startseite
  const backHref = parent?.href || "/";
  const backLabel = parent?.label || "Startseite";

  return (
    <div className="border-b border-border/40 bg-background/60">
      <nav className="container py-3" aria-label="Breadcrumb">
        <div className="flex items-center justify-between">
          {/* Zurück-Pfeil (Mobile: prominent, Desktop: dezent) */}
          <Link
            href={backHref}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group sm:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>

          {/* Desktop Breadcrumb-Pfad */}
          <ol className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Startseite</span>
              </Link>
            </li>
            {parent && (
              <li className="flex items-center gap-2">
                <ChevronRight
                  className="w-4 h-4 text-muted-foreground/50"
                  aria-hidden="true"
                />
                <Link
                  href={parent.href}
                  className="hover:text-foreground transition-colors"
                >
                  {parent.label}
                </Link>
              </li>
            )}
            <li className="flex items-center gap-2">
              <ChevronRight
                className="w-4 h-4 text-muted-foreground/50"
                aria-hidden="true"
              />
              <span className="text-foreground font-medium">{pageName}</span>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
}

// Inhaltsverzeichnis (Table of Contents) mit aktiver Markierung und Mobile Drawer
interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [location] = useLocation();
  const floatingMode = getMobileFloatingMode(location);
  // Scroll-basierte aktive Markierung (kein IntersectionObserver nötig)
  const activeNavRef = useRef<HTMLButtonElement | null>(null);

  // Headings scannen
  useEffect(() => {
    // Kurz warten, damit ContentSections gerendert sind
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll("h2, h3");
      const items: TOCItem[] = [];

      elements.forEach((el, index) => {
        // Prüfen ob das Heading innerhalb einer ContentSection liegt
        const contentSectionWrapper = el.closest("[id]:not(h2):not(h3)");
        const isInsideContentSection =
          contentSectionWrapper?.querySelector("[aria-expanded]") !== null;

        let id: string;
        if (
          isInsideContentSection &&
          contentSectionWrapper?.id &&
          !contentSectionWrapper.id.startsWith("heading-")
        ) {
          id = contentSectionWrapper.id;
        } else {
          id = el.id || `heading-${index}`;
          if (!el.id) el.id = id;
        }

        // Duplikate vermeiden
        if (!items.some(item => item.id === id)) {
          items.push({
            id,
            text: el.textContent || "",
            level: el.tagName === "H2" ? 2 : 3,
          });
        }
      });

      setHeadings(items);
      // Ersten Eintrag als aktiv setzen
      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Scroll-basierte aktive Markierung
  useEffect(() => {
    if (headings.length === 0) return;

    // Scroll-basierte Erkennung: Welcher Abschnitt ist am nächsten am oberen Viewport-Rand?
    const handleScroll = () => {
      const headerHeight = 80;
      let bestId = headings[0]?.id || "";
      let bestDistance = -Infinity;

      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const distance = rect.top - headerHeight;

        // Wähle den letzten Abschnitt, der den Header-Bereich passiert hat (distance <= 100)
        // oder noch knapp darunter ist
        if (distance <= 100 && distance > bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      });

      // Fallback: Wenn kein Abschnitt den Header passiert hat, nimm den ersten
      if (bestDistance === -Infinity) {
        bestId = headings[0]?.id || "";
      }

      // Wenn wir ganz unten sind, den letzten Eintrag aktivieren
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        bestId = headings[headings.length - 1]?.id || bestId;
      }

      if (bestId) {
        setActiveId(bestId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial ausführen

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  // Aktiven Eintrag in der Desktop-Sidebar in den sichtbaren Bereich scrollen
  useEffect(() => {
    if (activeNavRef.current) {
      activeNavRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeId]);

  useEffect(() => {
    const onScroll = () => setShowFloatingButton(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll-Lock für Mobile-Drawer
  useScrollLock(isOpen);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const isContentSection = el.querySelector("[aria-expanded]") !== null;

      if (isContentSection) {
        window.dispatchEvent(
          new CustomEvent("open-section", { detail: { sectionId: id } })
        );
      } else {
        const header = document.querySelector("header");
        const headerHeight = header?.getBoundingClientRect().height || 80;
        const offset = headerHeight + 20;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }

      setActiveId(id);
      setIsOpen(false);
    }
  }, []);

  if (headings.length < 3) return null;

  // Aktiver Eintrag Styling
  const activeClass =
    "bg-sage-wash text-sage-darker font-semibold border-l-2 border-l-sage-dark";
  const inactiveClass =
    "text-muted-foreground hover:text-foreground hover:bg-muted/60";

  return (
    <>
      {/* ─── Mobile: Floating TOC Button ─── */}
      {floatingMode === "content" && showFloatingButton && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="min-[1800px]:hidden fixed right-4 z-40 h-11 px-4 rounded-full bg-background border border-border shadow-lg flex items-center gap-2 text-sm font-medium text-foreground"
          style={{ bottom: "calc(7.5rem + env(safe-area-inset-bottom, 0px))" }}
          aria-label="Inhaltsverzeichnis öffnen"
        >
          <List className="w-4 h-4" />
          <span>Inhalt</span>
        </motion.button>
      )}

      {/* ─── Mobile: Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-[1800px]:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── Mobile: Drawer von unten ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="min-[1800px]:hidden fixed left-0 right-0 bottom-0 max-h-[70vh] bg-background z-50 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            {/* Drawer Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <span
                className="font-semibold text-foreground text-base"
                role="heading"
                aria-level={2}
              >
                Inhaltsverzeichnis
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                aria-label="Schliessen"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Drawer Content */}
            <nav className="overflow-y-auto overscroll-contain px-3 py-3 flex-1">
              <ul className="space-y-0.5">
                {headings.map(({ id, text, level }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => scrollToHeading(id)}
                      aria-label={`Zum Abschnitt: ${text}`}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors focus-visible:ring-2 focus-visible:ring-sage-dark/40 focus-visible:ring-offset-1 ${
                        level === 3 ? "pl-7" : ""
                      } ${activeId === id ? activeClass : inactiveClass}`}
                    >
                      {text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Desktop: Sticky Sidebar ─── */}
      <div className="hidden min-[1800px]:block fixed left-4 top-1/2 -translate-y-1/2 w-56 z-30 max-h-[70vh]">
        <div className="bg-background/90 backdrop-blur-md rounded-xl border border-border/50 shadow-sm overflow-hidden flex flex-col max-h-[70vh]">
          <div className="px-4 pt-4 pb-2">
            <span
              className="font-semibold text-foreground text-sm"
              role="heading"
              aria-level={2}
            >
              Auf dieser Seite
            </span>
          </div>
          <nav className="overflow-y-auto overscroll-contain px-2 pb-3 flex-1">
            <ul className="space-y-0.5">
              {headings.map(({ id, text, level }) => (
                <li key={id}>
                  <button
                    type="button"
                    ref={activeId === id ? activeNavRef : null}
                    onClick={() => scrollToHeading(id)}
                    aria-label={`Zum Abschnitt: ${text}`}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors line-clamp-2 focus-visible:ring-2 focus-visible:ring-sage-dark/40 focus-visible:ring-offset-1 ${
                      level === 3 ? "pl-5" : ""
                    } ${activeId === id ? activeClass : inactiveClass}`}
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
