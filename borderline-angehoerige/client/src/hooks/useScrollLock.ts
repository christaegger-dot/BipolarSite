import { useEffect, useRef } from "react";

/**
 * Globaler Referenzzähler für Body-Scroll-Lock.
 *
 * Mehrere Komponenten (Search, TableOfContents-Drawer) können gleichzeitig
 * einen Lock anfordern. Der Body-Scroll wird erst wieder freigegeben, wenn
 * alle Locks aufgehoben sind. So überschreiben sich die Cleanup-Funktionen
 * nicht gegenseitig.
 */
let lockCount = 0;
let savedScrollY = 0;

function lock() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }
  lockCount++;
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, savedScrollY);
  }
}

/**
 * Hook: Sperrt den Body-Scroll solange `isLocked` true ist.
 * Mehrere Instanzen arbeiten koordiniert über einen Referenzzähler.
 */
export function useScrollLock(isLocked: boolean) {
  const wasLocked = useRef(false);

  useEffect(() => {
    if (isLocked && !wasLocked.current) {
      lock();
      wasLocked.current = true;
    } else if (!isLocked && wasLocked.current) {
      unlock();
      wasLocked.current = false;
    }

    return () => {
      if (wasLocked.current) {
        unlock();
        wasLocked.current = false;
      }
    };
  }, [isLocked]);
}
