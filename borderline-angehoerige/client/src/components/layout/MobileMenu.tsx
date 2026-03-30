import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  FolderOpen,
  Phone,
  Search as SearchIcon,
} from "lucide-react";
import { navItems, ressourcenItems } from "@/components/layout/navigationData";

interface MobileMenuProps {
  isOpen: boolean;
  location: string;
  mobileRessourcenOpen: boolean;
  setMobileRessourcenOpen: (isOpen: boolean) => void;
  closeMenu: () => void;
  onSearchOpen: () => void;
}

// Ressourcen-Items nach Gruppe sortieren
function groupRessourcenItems(items: typeof ressourcenItems) {
  const groups: Record<string, typeof ressourcenItems> = {};
  for (const item of items) {
    const key = item.group ?? "Weitere";
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }
  return groups;
}

export function MobileMenu({
  isOpen,
  location,
  mobileRessourcenOpen,
  setMobileRessourcenOpen,
  closeMenu,
  onSearchOpen,
}: MobileMenuProps) {
  const isRessourcenActive = ressourcenItems.some(item =>
    location.startsWith(item.href.split("#")[0])
  );

  const groupedRessourcen = groupRessourcenItems(ressourcenItems);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:hidden border-t border-border/50 bg-background overflow-y-auto overscroll-contain"
          style={{
            maxHeight: "calc(100dvh - 5rem)",
            WebkitOverflowScrolling: "touch",
          }}
          onKeyDown={e => {
            if (e.key === "Escape") {
              closeMenu();
            }
          }}
        >
          <nav
            className="container py-4 flex flex-col gap-2"
            style={{
              paddingBottom:
                "calc(16px + env(safe-area-inset-bottom, 0px) + 88px)",
            }}
          >
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "bg-sage-wash text-sage-darker"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-1">
              <button
                type="button"
                onClick={() => setMobileRessourcenOpen(!mobileRessourcenOpen)}
                aria-expanded={mobileRessourcenOpen}
                aria-controls="mobile-ressourcen-menu"
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isRessourcenActive
                    ? "bg-sage-wash text-sage-darker"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span className="flex items-center gap-3">
                  <FolderOpen className="w-5 h-5" />
                  Ressourcen
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${mobileRessourcenOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {mobileRessourcenOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      id="mobile-ressourcen-menu"
                      role="menu"
                      aria-label="Ressourcen-Navigation"
                      className="pl-4 mt-1 flex flex-col gap-0"
                    >
                      {Object.entries(groupedRessourcen).map(
                        ([groupName, items], groupIndex) => (
                          <div
                            key={groupName}
                            className={groupIndex > 0 ? "mt-2" : ""}
                          >
                            <p className="px-4 pt-2 pb-1 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
                              {groupName}
                            </p>
                            {items.map(item => {
                              const Icon = item.icon;
                              const normalizedHref = item.href.split("#")[0];
                              const isActive = location === normalizedHref;

                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  role="menuitem"
                                  onClick={() => {
                                    closeMenu();
                                    setMobileRessourcenOpen(false);
                                  }}
                                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                      ? "bg-sage-wash/50 text-sage-darker"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                  {item.label}
                                </Link>
                              );
                            })}
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/soforthilfe"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium bg-alert text-white mt-2"
            >
              <Phone className="w-5 h-5" />
              Soforthilfe
            </Link>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                onSearchOpen();
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted mt-2 border border-border/50"
              aria-label="Suche öffnen"
            >
              <SearchIcon className="w-5 h-5" />
              Suchen
            </button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
