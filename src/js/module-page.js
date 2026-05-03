(() => {
  const progressBar = document.getElementById("readingProgress");
  if (progressBar) {
    const updateReadingProgress = () => {
      const availableHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width =
        availableHeight > 0 ? `${(window.scrollY / availableHeight) * 100}%` : "0%";
    };

    window.addEventListener("scroll", updateReadingProgress, { passive: true });
    updateReadingProgress();
  }

  const barCharts = document.querySelectorAll(".bar-chart");
  if (barCharts.length && "IntersectionObserver" in window) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.querySelectorAll(".bar-fill").forEach((bar, index) => {
            window.setTimeout(() => {
              bar.style.width = `${bar.dataset.width}%`;
            }, index * 150);
          });

          barObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );

    barCharts.forEach((element) => barObserver.observe(element));
  }

  const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && "IntersectionObserver" in window) {
    const tocSections = Array.from(tocLinks)
      .map((link) => {
        const id = link.getAttribute("href").slice(1);
        return { link, el: document.getElementById(id) };
      })
      .filter((section) => section.el);

    if (tocSections.length) {
      const tocObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            tocLinks.forEach((link) => link.classList.remove("active"));
            const match = tocSections.find((section) => section.el === entry.target);
            if (match) match.link.classList.add("active");
          });
        },
        { threshold: 0.1, rootMargin: "-100px 0px -60% 0px" }
      );

      tocSections.forEach((section) => tocObserver.observe(section.el));
    }
  }

  const phaseTabs = document.querySelector(".phase-tabs");
  if (phaseTabs) {
    const tabs = [...phaseTabs.querySelectorAll(".phase-tab[data-phase]")];
    const panels = tabs
      .map((tab) => ({
        tab,
        panel: document.getElementById(tab.getAttribute("aria-controls")),
      }))
      .filter(({ panel }) => panel);

    const activateTab = (nextTab, { focus = true } = {}) => {
      const phase = nextTab?.dataset.phase;
      if (!phase) return;

      panels.forEach(({ tab, panel }) => {
        const isActive = tab === nextTab;
        tab.classList.remove("active-mania", "active-stable", "active-depression");
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.tabIndex = isActive ? 0 : -1;
        panel.classList.toggle("visible", isActive);
        panel.hidden = !isActive;
      });

      nextTab.classList.add(`active-${phase}`);
      if (focus) nextTab.focus();
    };

    phaseTabs.addEventListener("click", (event) => {
      const button = event.target.closest(".phase-tab[data-phase]");
      if (!button) return;
      activateTab(button, { focus: false });
    });

    phaseTabs.addEventListener("keydown", (event) => {
      const currentTab = event.target.closest(".phase-tab[data-phase]");
      if (!currentTab) return;

      const currentIndex = tabs.indexOf(currentTab);
      if (currentIndex < 0) return;

      let nextIndex = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex === null) return;
      event.preventDefault();
      activateTab(tabs[nextIndex]);
    });

    const initialTab =
      tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabs[0];
    if (initialTab) activateTab(initialTab, { focus: false });
  }

  const setAccordionState = (item, isOpen) => {
    const header = item.querySelector(".accordion-header");
    const body = item.querySelector(".accordion-body");
    if (!header || !body) return;

    item.classList.toggle("open", isOpen);
    header.setAttribute("aria-expanded", isOpen ? "true" : "false");
    body.hidden = !isOpen;
  };

  document.querySelectorAll(".accordion-item").forEach((item) => {
    const header = item.querySelector(".accordion-header");
    if (!header) return;
    const isOpen =
      item.classList.contains("open") || header.getAttribute("aria-expanded") === "true";
    setAccordionState(item, isOpen);
  });

  document.addEventListener("click", (event) => {
    const header = event.target.closest(".accordion-header");
    if (!header) return;

    const item = header.closest(".accordion-item");
    if (!item) return;

    const group = header.closest(".accordion-group");
    const wasOpen = item.classList.contains("open");

    if (group) {
      group.querySelectorAll(".accordion-item").forEach((element) => {
        setAccordionState(element, false);
      });
      setAccordionState(item, !wasOpen);
      return;
    }

    setAccordionState(item, !wasOpen);
  });

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
    if (pdfPreviewTrigger) pdfPreviewTrigger.focus();
  };

  const openPdfPreview = (link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    pdfPreviewTrigger = link;
    pdfPreviewTitle.textContent = getPdfTitle(link);
    pdfPreviewFrame.src = `${href}#view=FitH`;
    pdfPreviewOpen.href = href;
    pdfPreviewDownload.href = href;
    pdfPreview.hidden = false;
    document.body.classList.add("pdf-preview-open");
    setPageInert(true);
    pdfPreviewClose.focus();
  };

  window.setupPdfPreviewLink = (link) => {
    if (!isPreviewablePdfLink(link)) return;
    link.dataset.pdfPreviewBound = "true";
  };

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
