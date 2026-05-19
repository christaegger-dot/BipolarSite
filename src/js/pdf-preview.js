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

  const isPreviewablePdfLink = (link) => {
    if (!link) return false;

    const href = link.getAttribute("href");
    return Boolean(href && href.startsWith("/") && href.endsWith(".pdf") && !href.startsWith("/downloads/"));
  };

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
    [pdfPreviewOpen, pdfPreviewDownload].forEach((action) => {
      action.href = "#pdf-preview";
      action.setAttribute("aria-disabled", "true");
      action.setAttribute("tabindex", "-1");
    });
    if (pdfPreviewTrigger) pdfPreviewTrigger.focus();
  };

  const openPdfPreview = (link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    pdfPreviewTrigger = link;
    pdfPreviewTitle.textContent = getPdfTitle(link);
    pdfPreviewFrame.src = `${href}#view=FitH`;
    [pdfPreviewOpen, pdfPreviewDownload].forEach((action) => {
      action.href = href;
      action.removeAttribute("aria-disabled");
      action.removeAttribute("tabindex");
    });
    pdfPreview.hidden = false;
    document.body.classList.add("pdf-preview-open");
    setPageInert(true);
    pdfPreviewClose.focus();
  };

  const setupPdfPreviewLink = (link) => {
    if (!isPreviewablePdfLink(link)) return;
    link.dataset.pdfPreviewBound = "true";
  };

  window.setupPdfPreviewLink = setupPdfPreviewLink;

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.('a[href$=".pdf"]');
    if (!isPreviewablePdfLink(link)) return;

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
    openPdfPreview(link);
  });

  pdfPreviewClose.addEventListener("click", closePdfPreview);
  pdfPreviewDialog.addEventListener("keydown", (event) => trapFocus(event, pdfPreviewDialog));
  pdfPreview.addEventListener("click", (event) => {
    if (event.target === pdfPreview) closePdfPreview();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !pdfPreview.hidden) closePdfPreview();
  });
})();
