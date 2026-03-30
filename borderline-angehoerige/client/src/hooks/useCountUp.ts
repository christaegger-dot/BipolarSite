import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
}

/**
 * Hook für animierte Zähler, die beim Sichtbarwerden hochzählen.
 * Verwendet IntersectionObserver und requestAnimationFrame.
 *
 * Fix: Zeigt den Endwert sofort als Fallback an (kein "0%" sichtbar).
 * Die Animation läuft nur als visuelles Enhancement, wenn der Block
 * im Viewport sichtbar wird.
 *
 * WICHTIG: Hook-Reihenfolge ist fix (useState → useCallback → useRef → useEffect).
 */
export function useCountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  separator = "",
  decimals = 0,
}: UseCountUpOptions) {
  // 1. useState – Endwert als Initialwert (nie "0%" sichtbar)
  const [displayValue, setDisplayValue] = useState(() => {
    const formatted =
      decimals > 0 ? end.toFixed(decimals) : Math.round(end).toString();
    const withSeparator = separator
      ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      : formatted;
    return `${prefix}${withSeparator}${suffix}`;
  });

  // 2. useState
  const [hasAnimated, setHasAnimated] = useState(false);

  // 3. useCallback
  const formatValue = useCallback(
    (value: number) => {
      const formatted =
        decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
      const withSeparator = separator
        ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
        : formatted;
      return `${prefix}${withSeparator}${suffix}`;
    },
    [prefix, suffix, separator, decimals]
  );

  // 4. useRef
  const ref = useRef<HTMLDivElement>(null);

  // 5. useEffect – IntersectionObserver
  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Kurz den Startwert setzen, dann hochzählen
            setDisplayValue(formatValue(0));

            const startTime = performance.now();
            const step = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Easing: easeOutCubic für natürliches Abbremsen
              const easedProgress = 1 - Math.pow(1 - progress, 3);
              const currentValue = easedProgress * end;
              setDisplayValue(formatValue(currentValue));
              if (progress < 1) {
                requestAnimationFrame(step);
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated, formatValue, duration, end]);

  return { ref, displayValue };
}
