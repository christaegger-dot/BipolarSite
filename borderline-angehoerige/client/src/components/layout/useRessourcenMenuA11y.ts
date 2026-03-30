import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

interface UseRessourcenMenuA11yProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  itemCount: number;
  menuId?: string;
}

export function useRessourcenMenuA11y({
  isOpen,
  setIsOpen,
  itemCount,
  menuId = "ressourcen-menu",
}: UseRessourcenMenuA11yProps) {
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const focusedIndexRef = useRef(-1);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRef = useRef(isOpen);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const focusMenuItem = useCallback((index: number) => {
    const items = menuItemsRef.current.filter(Boolean) as HTMLAnchorElement[];
    if (items.length === 0) return;

    const clamped = ((index % items.length) + items.length) % items.length;
    focusedIndexRef.current = clamped;
    items[clamped]?.focus();
  }, []);

  const openAndFocusFirst = useCallback(() => {
    setIsOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        focusMenuItem(0);
      });
    });
  }, [focusMenuItem, setIsOpen]);

  const closeAndFocusTrigger = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, [setIsOpen]);

  const handleMenuKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (itemCount === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusMenuItem(focusedIndexRef.current + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          focusMenuItem(focusedIndexRef.current - 1);
          break;
        case "Home":
          e.preventDefault();
          focusMenuItem(0);
          break;
        case "End":
          e.preventDefault();
          focusMenuItem(itemCount - 1);
          break;
        case "Tab":
          e.preventDefault();
          focusMenuItem(focusedIndexRef.current + (e.shiftKey ? -1 : 1));
          break;
        default:
          break;
      }
    },
    [focusMenuItem, itemCount]
  );

  useEffect(() => {
    openRef.current = isOpen;
    if (!isOpen) {
      focusedIndexRef.current = -1;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleDocumentKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) {
        e.stopPropagation();
        closeAndFocusTrigger();
      }
    };

    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => document.removeEventListener("keydown", handleDocumentKeyDown);
  }, [closeAndFocusTrigger]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, [clearCloseTimeout]);

  const triggerA11yProps = {
    "aria-expanded": isOpen,
    "aria-haspopup": "menu",
    "aria-controls": menuId,
  } as const;

  const menuA11yProps = {
    id: menuId,
    role: "menu",
    "aria-label": "Ressourcen-Navigation",
  };

  const handleMouseEnter = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(true);
  }, [clearCloseTimeout, setIsOpen]);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  }, [setIsOpen]);

  const closeDropdown = useCallback(() => setIsOpen(false), [setIsOpen]);

  const setMenuItemRef = useCallback(
    (index: number, element: HTMLAnchorElement | null) => {
      menuItemsRef.current[index] = element;
    },
    []
  );

  const onMenuItemFocus = useCallback((index: number) => {
    focusedIndexRef.current = index;
  }, []);

  return {
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
  };
}
