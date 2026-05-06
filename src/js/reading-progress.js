/**
 * Reading progress tracking — local-only, opt-out per reset link.
 * Module pages: marks H2 sections as visited via IntersectionObserver.
 * Homepage:    renders a small progress strip on module cards.
 */
(() => {
  const KEY = "bipolarsite:reading";
  const VISIBLE_THRESHOLD = 0.5;
  const VISIT_DURATION_MS = 1000;

  const readState = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {
      return {};
    }
  };

  const writeState = (state) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  };

  const setModuleTotal = (path, total) => {
    const state = readState();
    const entry = state[path] || { visited: [], lastSection: null, ts: null };
    entry.total = total;
    state[path] = entry;
    writeState(state);
  };

  const recordSectionVisit = (path, sectionId) => {
    const state = readState();
    const entry = state[path] || { visited: [], lastSection: null, ts: null };
    if (!entry.visited.includes(sectionId)) entry.visited.push(sectionId);
    entry.lastSection = sectionId;
    entry.ts = new Date().toISOString();
    state[path] = entry;
    writeState(state);
  };

  const resetAll = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
  };

  const path = window.location.pathname;
  const isModulePage = /^\/modul\/[1-8]\/$/.test(path);
  const isHomepage = path === "/";

  if (isModulePage) initModulePage();
  if (isHomepage) initHomepage();

  function initModulePage() {
    const main = document.querySelector("main.content");
    if (!main) return;

    const sections = [...main.querySelectorAll("h2[id]")];
    if (!sections.length) return;

    setModuleTotal(path, sections.length);

    const existing = readState()[path];
    if (existing && existing.lastSection) {
      const lastH2 = sections.find((h) => h.id === existing.lastSection);
      if (lastH2) renderContinueHint(main, lastH2);
    }

    if (!("IntersectionObserver" in window)) return;

    const timers = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && entry.intersectionRatio >= VISIBLE_THRESHOLD) {
            if (timers.has(id)) return;
            const handle = window.setTimeout(() => {
              recordSectionVisit(path, id);
              timers.delete(id);
            }, VISIT_DURATION_MS);
            timers.set(id, handle);
          } else {
            const handle = timers.get(id);
            if (handle !== undefined) {
              clearTimeout(handle);
              timers.delete(id);
            }
          }
        });
      },
      { threshold: [VISIBLE_THRESHOLD] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function renderContinueHint(main, lastH2) {
    const sectionTitle = lastH2.textContent.trim();
    const hint = document.createElement("div");
    hint.className = "reading-continue-hint";

    const label = document.createElement("span");
    label.className = "reading-continue-hint__label";
    label.textContent = "Beim letzten Besuch zuletzt gelesen:";
    hint.appendChild(label);

    const link = document.createElement("a");
    link.className = "reading-continue-hint__link";
    link.href = `#${lastH2.id}`;
    link.textContent = sectionTitle;
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = " →";
    link.appendChild(arrow);
    hint.appendChild(link);

    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "reading-continue-hint__reset";
    reset.textContent = "Zurücksetzen";
    reset.setAttribute("aria-label", "Lese-Verlauf für alle Module zurücksetzen");
    reset.addEventListener("click", () => {
      resetAll();
      hint.remove();
    });
    hint.appendChild(reset);

    main.insertBefore(hint, main.firstElementChild);
  }

  function initHomepage() {
    const cards = document.querySelectorAll('.module-card[href^="/modul/"]');
    if (!cards.length) return;

    const state = readState();
    let anyAnnotated = false;
    let firstGrid = null;

    cards.forEach((card) => {
      const href = card.getAttribute("href");
      const progress = state[href];
      if (!progress || !progress.total || !progress.visited?.length) return;

      const visited = progress.visited.length;
      const total = progress.total;
      const ratio = Math.min(visited / total, 1);

      const strip = document.createElement("div");
      strip.className = "module-card-progress";
      strip.setAttribute("aria-hidden", "true");

      const fill = document.createElement("div");
      fill.className = "module-card-progress__fill";
      fill.style.width = `${ratio * 100}%`;
      strip.appendChild(fill);
      card.appendChild(strip);

      const original = card.getAttribute("aria-label") || "";
      if (!/gelesen$/i.test(original)) {
        card.setAttribute(
          "aria-label",
          `${original}, ${visited} von ${total} Abschnitten gelesen`
        );
      }

      anyAnnotated = true;
      if (!firstGrid) firstGrid = card.closest(".modules-grid");
    });

    if (anyAnnotated && firstGrid && firstGrid.parentElement) {
      const wrap = document.createElement("p");
      wrap.className = "module-progress-reset";
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Lese-Verlauf zurücksetzen";
      button.addEventListener("click", () => {
        resetAll();
        document
          .querySelectorAll(".module-card-progress")
          .forEach((element) => element.remove());
        wrap.remove();
      });
      wrap.appendChild(button);
      firstGrid.parentElement.insertBefore(wrap, firstGrid.nextElementSibling);
    }
  }
})();
