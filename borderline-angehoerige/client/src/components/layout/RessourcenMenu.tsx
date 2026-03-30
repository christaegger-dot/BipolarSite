import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ressourcenItems } from "@/components/layout/navigationData";
import { useRessourcenMenuA11y } from "@/components/layout/useRessourcenMenuA11y";

interface RessourcenMenuProps {
  location: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function RessourcenMenu({
  location,
  isOpen,
  setIsOpen,
}: RessourcenMenuProps) {
  const isRessourcenActive = ressourcenItems.some(item =>
    location.startsWith(item.href.split("#")[0])
  );

  const {
    menuContainerRef,
    triggerRef,
    handleMenuKeyDown,
    openAndFocusFirst,
    closeDropdown,
    handleMouseEnter,
    handleMouseLeave,
    setMenuItemRef,
    onMenuItemFocus,
    triggerA11yProps,
    menuA11yProps,
  } = useRessourcenMenuA11y({
    isOpen,
    setIsOpen,
    itemCount: ressourcenItems.length,
  });

  return (
    <div
      ref={menuContainerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        ref={triggerRef}
        onClick={() => (isOpen ? setIsOpen(false) : openAndFocusFirst())}
        onKeyDown={e => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            openAndFocusFirst();
          }
        }}
        className={`flex items-center gap-1 px-2.5 lg:px-3 xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-500 whitespace-nowrap ${
          isRessourcenActive || isOpen
            ? "bg-sage-wash text-sage-darker"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        {...triggerA11yProps}
      >
        Ressourcen
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onKeyDown={handleMenuKeyDown}
            className="absolute right-0 top-full mt-1 w-64 bg-background border border-border/60 rounded-xl shadow-lg shadow-black/8 overflow-hidden z-50"
            {...menuA11yProps}
          >
            <div className="py-2">
              {ressourcenItems.map((item, index) => {
                const Icon = item.icon;
                const normalizedHref = item.href.split("#")[0];
                const isActive =
                  location === normalizedHref ||
                  location.startsWith(`${normalizedHref}/`);
                const prevItem = ressourcenItems[index - 1];
                const isNewGroup = index > 0 && item.group !== prevItem?.group;

                return (
                  <div key={item.href}>
                    {isNewGroup && (
                      <div className="mx-3 my-1 border-t border-border/40" />
                    )}
                    <Link
                      href={item.href}
                      role="menuitem"
                      tabIndex={-1}
                      ref={(el: HTMLAnchorElement | null) => {
                        setMenuItemRef(index, el);
                      }}
                      onFocus={() => {
                        onMenuItemFocus(index);
                      }}
                      onClick={closeDropdown}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-sage-dark/40 focus-visible:ring-inset ${
                        isActive
                          ? "bg-sage-wash/50 text-sage-darker font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60 focus:text-foreground focus:bg-muted/60"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
