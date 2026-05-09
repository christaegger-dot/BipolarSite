/**
 * tool-embed.js — Inline Tool Panel
 * Öffnet/schliesst Tool-Panels inline in Modulen.
 * Das Tool-JS wird lazy geladen wenn das Panel zum ersten Mal geöffnet wird.
 */
(() => {
  document.querySelectorAll('.tool-embed').forEach((embed) => {
    const toggle = embed.querySelector('.tool-embed-toggle');
    if (!toggle) return;

    const scriptSrc = embed.dataset.toolScript;
    let scriptLoaded = false;

    toggle.addEventListener('click', () => {
      const isOpen = embed.hasAttribute('data-open');

      if (isOpen) {
        embed.removeAttribute('data-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        embed.setAttribute('data-open', '');
        toggle.setAttribute('aria-expanded', 'true');

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
