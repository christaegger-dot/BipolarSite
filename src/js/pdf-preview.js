(() => {
  const pdfPreview = document.getElementById("pdf-preview");
  if (!pdfPreview) return;

  const pdfPreviewFrame = document.getElementById("pdf-preview-frame");
  const pdfPreviewTitle = document.getElementById("pdf-preview-title");
  const pdfPreviewOpen = document.getElementById("pdf-preview-open");
  const pdfPreviewDownload = document.getElementById("pdf-preview-download");
  const pdfPreviewClose = document.getElementById("pdf-preview-close");
  const pdfPreviewDialog = pdfPreview.querySelector(".pdf-preview-dialog");
  const FOCUSABLE_SELECTOR =
    'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

  let pdfPreviewTrigger = null;

  const setPageInert = (isInert) => {
    [...document.body.children]
      .filter((element) => element !== pdfPreview)
      .forEach((element) => {
        element.inert = isInert;
      });
  };

  const trapFocus = (event, container) => {
    if (event.key !== "Tab") return;

    const focusable = [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
      (element) => !element.hidden && element.offsetParent !== null
    );

    if (!focusable.length) {
      event.preventDefault();
      container.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const getPdfTitle = (link) => {
    const scopedTitle = link.querySelector(".handout-card-title, .hc-title, .guide-title, .dl-body h3");
    if (scopedTitle) return scopedTitle.textContent.trim();

    const guideTitle = link.closest(".guide")?.querySelector(".guide-title");
    if (guideTitle) return guideTitle.textContent.trim();

    return (
      link.textContent.replace(/\s+/g, " ").replace(/^↓\s*PDF:\s*/i, "").trim() ||
      "PDF-Vorschau"
    );
  };

  const closePdfPreview = () => {
    pdfPreview.hidden = true;
    document.body.classList.remove("pdf-preview-open");
    setPageInert(false);
    if (pdfPreviewFrame) pdfPreviewFrame.src = "about:blank";
    if (pdfPreviewTrigger) pdfPreviewTrigger.focus();
  };

  const setupPdfPreviewLink = (link) => {
    if (!link || link.dataset.pdfPreviewBound === "true") return;

    const href = link.getAttribute("href");
    if (!href || !href.startsWith("/") || href.startsWith("/downloads/")) return;

    link.dataset.pdfPreviewBound = "true";
    link.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      pdfPreviewTrigger = link;
      pdfPreviewTitle.textContent = getPdfTitle(link);
      pdfPreviewFrame.src = `${href}#view=FitH`;
      pdfPreviewOpen.href = href;
      pdfPreviewDownload.href = href;
      pdfPreview.hidden = false;
      document.body.classList.add("pdf-preview-open");
      setPageInert(true);
      pdfPreviewClose.focus();
    });
  };

  window.setupPdfPreviewLink = setupPdfPreviewLink;

  document.querySelectorAll('a[href$=".pdf"]').forEach(setupPdfPreviewLink);
  pdfPreviewClose.addEventListener("click", closePdfPreview);
  pdfPreviewDialog.addEventListener("keydown", (event) => trapFocus(event, pdfPreviewDialog));
  pdfPreview.addEventListener("click", (event) => {
    if (event.target === pdfPreview) closePdfPreview();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !pdfPreview.hidden) closePdfPreview();
  });
})();
