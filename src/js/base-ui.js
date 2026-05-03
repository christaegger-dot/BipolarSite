(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-sources-toggle]").forEach((button, index) => {
    const section = button.closest(".sources");
    const list = section ? section.querySelector("ul") : null;
    if (!section || !list) return;

    if (!list.id) list.id = `sources-list-${index + 1}`;
    const isOpen =
      section.classList.contains("sources-open") ||
      button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-controls", list.id);
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    section.classList.toggle("sources-open", isOpen);
    list.hidden = !isOpen;

    button.addEventListener("click", () => {
      const nextOpen = !section.classList.contains("sources-open");
      section.classList.toggle("sources-open", nextOpen);
      button.setAttribute("aria-expanded", nextOpen ? "true" : "false");
      list.hidden = !nextOpen;
    });
  });

  if (window.innerWidth <= 768) {
    document.querySelectorAll(".toc").forEach((toc) => {
      const ol = toc.querySelector("ol");
      const tocTitle = toc.querySelector(".toc-title");
      if (!ol || !tocTitle || toc.querySelector(".toc-mobile-toggle")) return;

      ol.hidden = true;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "toc-mobile-toggle";
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "Inhaltsverzeichnis anzeigen ▾";
      tocTitle.after(btn);

      btn.addEventListener("click", () => {
        const open = ol.hidden;
        ol.hidden = !open;
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open
          ? "Inhaltsverzeichnis ausblenden ▴"
          : "Inhaltsverzeichnis anzeigen ▾";

        if (open) {
          const firstLink = ol.querySelector("a");
          if (firstLink) firstLink.focus();
        }
      });
    });
  }

  if (window.innerWidth >= 1100) {
    const tocOl = document.querySelector(".toc ol");
    const contentEl = document.querySelector("main.content");

    if (tocOl && contentEl && !document.querySelector(".toc-sidebar")) {
      const nav = document.createElement("nav");
      nav.className = "toc-sidebar";
      nav.setAttribute("aria-label", "Inhaltsverzeichnis");

      const ol = document.createElement("ol");
      tocOl.querySelectorAll("li > a").forEach((anchor) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = anchor.getAttribute("href");
        link.textContent = (anchor.childNodes[0]?.textContent ?? anchor.textContent).trim();
        li.appendChild(link);
        ol.appendChild(li);
      });

      nav.appendChild(ol);
      contentEl.parentNode.insertBefore(nav, contentEl);

      const headings = Array.from(contentEl.querySelectorAll("h2[id]"));
      const sidebarLinks = Array.from(nav.querySelectorAll("a"));

      if (headings.length && sidebarLinks.length) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              const id = entry.target.id;
              sidebarLinks.forEach((link) =>
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`)
              );
            });
          },
          { rootMargin: "-80px 0px -70% 0px" }
        );

        headings.forEach((heading) => observer.observe(heading));
      }
    }
  }

  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        backToTopButton.classList.toggle(
          "visible",
          window.scrollY > window.innerHeight
        );
        ticking = false;
      });

      ticking = true;
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  document.querySelectorAll(".expandable-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const more = button.previousElementSibling;
      if (!more || !more.classList.contains("expandable-more")) return;

      const open = more.hidden;
      more.hidden = !open;
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.textContent = open ? "Weniger anzeigen ▴" : "Weiterlesen ▾";
    });
  });
})();
