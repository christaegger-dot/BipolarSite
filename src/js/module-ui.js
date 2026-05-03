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
})();
