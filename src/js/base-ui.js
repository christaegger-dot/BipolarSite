(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileTocQuery = window.matchMedia("(max-width: 768px)");

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

  const syncMobileToc = () => {
    document.querySelectorAll(".toc").forEach((toc) => {
      const ol = toc.querySelector("ol");
      const tocTitle = toc.querySelector(".toc-title");
      if (!ol || !tocTitle) return;

      let btn = toc.querySelector(".toc-mobile-toggle");

      if (mobileTocQuery.matches) {
        if (!btn) {
          btn = document.createElement("button");
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
        }

        const isOpen = btn.getAttribute("aria-expanded") === "true";
        ol.hidden = !isOpen;
        return;
      }

      if (btn) btn.remove();
      ol.hidden = false;
    });
  };

  syncMobileToc();

  if (typeof mobileTocQuery.addEventListener === "function") {
    mobileTocQuery.addEventListener("change", syncMobileToc);
  } else {
    mobileTocQuery.addListener(syncMobileToc);
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

      const sidebarLinks = Array.from(nav.querySelectorAll("a"));
      const sidebarTargets = sidebarLinks
        .map((link) => {
          const href = link.getAttribute("href");
          if (!href || !href.startsWith("#")) return null;

          const target = document.getElementById(decodeURIComponent(href.slice(1)));
          return target && contentEl.contains(target) ? target : null;
        })
        .filter((target, index, targets) => target && targets.indexOf(target) === index);

      if (sidebarTargets.length && sidebarLinks.length) {
        const setActiveLink = (href) => {
          sidebarLinks.forEach((link) =>
            link.classList.toggle("active", link.getAttribute("href") === href)
          );
        };

        const updateActiveLink = () => {
          const threshold = 140;
          let currentTarget = sidebarTargets[0];

          sidebarTargets.forEach((target) => {
            if (target.getBoundingClientRect().top <= threshold) {
              currentTarget = target;
            }
          });

          if (currentTarget?.id) {
            setActiveLink(`#${currentTarget.id}`);
          }
        };

        let activeLinkTicking = false;
        const requestActiveLinkUpdate = () => {
          if (activeLinkTicking) return;

          window.requestAnimationFrame(() => {
            updateActiveLink();
            activeLinkTicking = false;
          });

          activeLinkTicking = true;
        };

        setActiveLink(window.location.hash || sidebarLinks[0]?.getAttribute("href"));
        requestActiveLinkUpdate();
        window.addEventListener("hashchange", () => {
          if (window.location.hash) {
            setActiveLink(window.location.hash);
          }
        });
        window.addEventListener("scroll", requestActiveLinkUpdate, { passive: true });
        window.addEventListener("resize", requestActiveLinkUpdate);
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
