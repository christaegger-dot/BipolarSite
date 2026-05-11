/**
 * tool-embed.js — Inline Tool Panel
 * Öffnet/schliesst Tool-Panels inline in Modulen.
 * Das Tool-JS wird lazy geladen wenn das Panel zum ersten Mal geöffnet wird.
 * Panels sind im geschlossenen Zustand aria-hidden + inert, damit
 * Accessibility-Checker (pa11y, axe) den versteckten Inhalt ignorieren.
 */
(() => {
  document.querySelectorAll('.tool-embed').forEach((embed) => {
    const toggle = embed.querySelector('.tool-embed-toggle');
    if (!toggle) return;

    const panel = embed.querySelector('.tool-embed-panel');
    const scriptSrc = embed.dataset.toolScript;
    let scriptLoaded = false;

    // Initialzustand: Panel ist geschlossen → für AT und pa11y unsichtbar
    if (panel) {
      panel.setAttribute('aria-hidden', 'true');
      panel.setAttribute('inert', '');
    }

    toggle.addEventListener('click', () => {
      const isOpen = embed.hasAttribute('data-open');

      if (isOpen) {
        embed.removeAttribute('data-open');
        toggle.setAttribute('aria-expanded', 'false');
        if (panel) {
          panel.setAttribute('aria-hidden', 'true');
          panel.setAttribute('inert', '');
        }
      } else {
        embed.setAttribute('data-open', '');
        toggle.setAttribute('aria-expanded', 'true');
        if (panel) {
          panel.removeAttribute('aria-hidden');
          panel.removeAttribute('inert');
        }

        // Lazy-load Tool-JS beim ersten Öffnen
        if (scriptSrc && !scriptLoaded) {
          scriptLoaded = true;
          const script = document.createElement('script');
          script.src = scriptSrc;
          document.body.appendChild(script);
        }

        // Sanftes Scrollen zum Panel
        window.setTimeout(() => {
          embed.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    });
  });
})();
