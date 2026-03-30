import { useState, useEffect, useRef } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { searchableContent, type SearchEntry } from "@/content/searchIndex";

// Suchbare Inhalte der Website
interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Body-Scroll-Lock: Verhindert Hintergrund-Scrollen auf iOS/Safari
  useScrollLock(isOpen);

  // Search logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchTerms = query
      .toLowerCase()
      .split(" ")
      .filter(t => t.length > 1);

    const matches = searchableContent.filter(item => {
      const searchText = [
        item.title,
        item.description,
        ...item.keywords,
        item.section,
      ]
        .join(" ")
        .toLowerCase();

      return searchTerms.every(term => searchText.includes(term));
    });

    // Sort by relevance (title matches first)
    matches.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const queryLower = query.toLowerCase();

      if (aTitle.includes(queryLower) && !bTitle.includes(queryLower))
        return -1;
      if (!aTitle.includes(queryLower) && bTitle.includes(queryLower)) return 1;
      return 0;
    });

    setResults(matches.slice(0, 8));
    setActiveIndex(-1);
  }, [query]);

  const handleResultClick = () => {
    setQuery("");
    onClose();
  };

  // Arrow key navigation in results
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => {
        const next = prev < results.length - 1 ? prev + 1 : 0;
        resultsRef.current
          ?.querySelectorAll("a")
          [next]?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => {
        const next = prev > 0 ? prev - 1 : results.length - 1;
        resultsRef.current
          ?.querySelectorAll("a")
          [next]?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const link = resultsRef.current?.querySelectorAll("a")[activeIndex] as
        | HTMLAnchorElement
        | undefined;
      link?.click();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-black/35 z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Suche"
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
                <SearchIcon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Suchen Sie nach Themen, z.B. 'Validierung', 'Grenzen setzen', 'Notfall'..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
                  role="combobox"
                  aria-label="Website durchsuchen"
                  aria-autocomplete="list"
                  aria-expanded={results.length > 0}
                  aria-controls="search-results"
                  aria-activedescendant={
                    activeIndex >= 0
                      ? `search-result-${activeIndex}`
                      : undefined
                  }
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                    aria-label="Sucheingabe löschen"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto" aria-live="polite">
                {query.length < 2 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Geben Sie mindestens 2 Zeichen ein, um zu suchen
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {[
                        "Validierung",
                        "Grenzen",
                        "Krise",
                        "Selbstfürsorge",
                        "DBT",
                      ].map(term => (
                        <button
                          type="button"
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Nach ${term} suchen`}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground">
                      Keine Ergebnisse für \"{query}\"
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Versuchen Sie andere Suchbegriffe oder schauen Sie in der
                      Navigation
                    </p>
                  </div>
                ) : (
                  <div
                    className="py-2"
                    ref={resultsRef}
                    role="listbox"
                    id="search-results"
                  >
                    {results.map((result, index) => (
                      <Link
                        key={`${result.href}-${index}`}
                        href={result.href}
                        onClick={handleResultClick}
                        id={`search-result-${index}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`flex items-start gap-4 px-4 py-3 transition-colors group ${index === activeIndex ? "bg-muted/70" : "hover:bg-muted/50"}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-sage-mid bg-sage-lighter px-2 py-0.5 rounded">
                              {result.section}
                            </span>
                          </div>
                          <h4 className="font-medium text-foreground mt-1 group-hover:text-sage-mid transition-colors">
                            {result.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-6" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span>
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">
                      \u2191\u2193
                    </kbd>{" "}
                    navigieren
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">
                      ESC
                    </kbd>{" "}
                    schliessen
                  </span>
                </span>
                {results.length > 0 && (
                  <span>
                    {results.length} Ergebnis{results.length !== 1 ? "se" : ""}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
