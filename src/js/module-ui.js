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
    const showPhase = (phase) => {
      document.querySelectorAll(".phase-content").forEach((element) => {
        element.classList.remove("visible");
      });

      document.querySelectorAll(".phase-tab").forEach((element) => {
        element.className = "phase-tab";
        element.setAttribute("aria-selected", "false");
      });

      const panel = document.getElementById(`phase-${phase}`);
      const tab = document.querySelector(`.phase-tab[data-phase="${phase}"]`);
      if (!panel || !tab) return;

      panel.classList.add("visible");
      tab.setAttribute("aria-selected", "true");
      tab.classList.add(`active-${phase}`);
    };

    phaseTabs.addEventListener("click", (event) => {
      const button = event.target.closest(".phase-tab[data-phase]");
      if (!button) return;
      showPhase(button.dataset.phase);
    });
  }

  document.addEventListener("click", (event) => {
    const header = event.target.closest(".accordion-header");
    if (!header) return;

    const item = header.closest(".accordion-item");
    const group = header.closest(".accordion-group");
    if (!item || !group) return;

    const wasOpen = item.classList.contains("open");
    group.querySelectorAll(".accordion-item").forEach((element) => {
      element.classList.remove("open");
    });

    if (!wasOpen) item.classList.add("open");
  });
})();
