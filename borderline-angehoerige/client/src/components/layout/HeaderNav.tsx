import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Phone, Search as SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navItems } from "@/components/layout/navigationData";
import { RessourcenMenu } from "@/components/layout/RessourcenMenu";

interface HeaderNavProps {
  onSearchOpen: () => void;
}

export function HeaderNav({ onSearchOpen }: HeaderNavProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileRessourcenOpen, setMobileRessourcenOpen] = useState(false);
  const [ressourcenOpen, setRessourcenOpen] = useState(false);

  useEffect(() => {
    setRessourcenOpen(false);
    setMobileRessourcenOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.setAttribute("data-mobile-menu", "open");
    } else {
      document.body.removeAttribute("data-mobile-menu");
    }

    return () => document.body.removeAttribute("data-mobile-menu");
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container">
        <div className="flex items-center justify-between gap-2 lg:gap-4 h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/favicon-192.png"
              alt="Startseite"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              width={40}
              height={40}
              loading="eager"
              decoding="async"
            />
            <span className="hidden 2xl:inline font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
              Borderline · Hilfe für Angehörige
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0"
            aria-label="Hauptnavigation"
          >
            {navItems.map(item => {
              const isActive =
                location === item.href || location.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 lg:px-3 xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-500 whitespace-nowrap ${
                    isActive
                      ? "bg-sage-wash text-sage-darker"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <RessourcenMenu
              location={location}
              isOpen={ressourcenOpen}
              setIsOpen={setRessourcenOpen}
            />
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onSearchOpen}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors text-sm"
              aria-label="Suchen"
            >
              <SearchIcon className="w-4 h-4" />
              <span>Suchen</span>
            </button>

            <button
              type="button"
              onClick={onSearchOpen}
              className="sm:hidden p-2.5 -m-0.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label="Suche öffnen"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            <Link
              href="/soforthilfe"
              aria-label="Soforthilfe – Notfallnummern und Krisenberatung"
            >
              <Button
                variant="default"
                size="sm"
                className="bg-alert hover:bg-alert/85 text-white hidden sm:flex"
                tabIndex={-1}
              >
                <Phone className="w-4 h-4 lg:mr-0 xl:mr-2" />
                <span className="hidden xl:inline">Soforthilfe</span>
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 -m-0.5 rounded-lg hover:bg-muted transition-colors"
              aria-label={mobileMenuOpen ? "Menü schliessen" : "Menü öffnen"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        location={location}
        mobileRessourcenOpen={mobileRessourcenOpen}
        setMobileRessourcenOpen={setMobileRessourcenOpen}
        closeMenu={() => setMobileMenuOpen(false)}
        onSearchOpen={onSearchOpen}
      />
    </header>
  );
}
