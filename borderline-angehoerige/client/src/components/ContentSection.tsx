import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ContentSectionProps {
  /** Überschrift des Abschnitts */
  title: string;
  /** Icon-Komponente (Lucide) */
  icon: React.ReactNode;
  /** HTML-ID für Ankerlinks und Inhaltsverzeichnis */
  id?: string;
  /** Ob der Abschnitt initial geöffnet ist */
  defaultOpen?: boolean;
  /** Inhalt des Abschnitts */
  children: React.ReactNode;
  /** Kurze Vorschau, die im geschlossenen Zustand sichtbar bleibt */
  preview?: React.ReactNode;
}

/**
 * Aufklappbarer Inhaltsabschnitt mit sanfter Animation.
 * Unterstützt programmatisches Öffnen via Custom Event "open-section".
 * Nach dem Öffnen scrollt die Komponente sanft in den Viewport.
 */
export default function ContentSection({
  title,
  icon,
  id,
  defaultOpen = false,
  children,
  preview,
}: ContentSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pendingScrollRef = useRef(false);

  // Ref für isOpen, damit der Event-Listener nicht bei jedem Toggle
  // entfernt und neu registriert wird (kein Event-Verlust möglich)
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const scrollToSection = () => {
    if (!sectionRef.current) return;
    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height || 80;
    const offset = headerHeight + 20;
    const top =
      sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Auf Custom Event "open-section" lauschen
  useEffect(() => {
    if (!id) return;

    const handleOpenSection = (e: Event) => {
      const detail = (e as CustomEvent<{ sectionId: string }>).detail;
      if (detail.sectionId === id) {
        if (!isOpenRef.current) {
          pendingScrollRef.current = true;
          setIsOpen(true);
        } else {
          scrollToSection();
        }
      }
    };

    window.addEventListener("open-section", handleOpenSection);
    return () => window.removeEventListener("open-section", handleOpenSection);
  }, [id]);

  // Nach dem Öffnen (State-Wechsel) sanft scrollen
  useEffect(() => {
    if (isOpen && pendingScrollRef.current) {
      pendingScrollRef.current = false;
      // Kurz warten bis die Animation begonnen hat
      const timer = setTimeout(() => {
        scrollToSection();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div ref={sectionRef} className="mb-6" id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 rounded-xl"
        aria-expanded={isOpen}
        aria-controls={id ? `section-content-${id}` : undefined}
        aria-label={`Abschnitt ${title} ${isOpen ? "zuklappen" : "aufklappen"}`}
      >
        <div className="flex items-center justify-between gap-3 p-4 rounded-[10px] bg-white hover:bg-sage-wash/50 active:bg-sage-wash/50 border border-border border-l-4 border-l-sage-dark transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            {icon}
            <h2 className="text-xl md:text-2xl font-normal text-foreground">
              {title}
            </h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {!isOpen && preview && (
          <p className="text-sm text-muted-foreground mt-2 px-4 line-clamp-2">
            {preview}
          </p>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              id={id ? `section-content-${id}` : undefined}
              className="pt-5 px-1 text-[14.5px] leading-relaxed"
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
