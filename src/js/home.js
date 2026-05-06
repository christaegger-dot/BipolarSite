(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    document.documentElement.classList.add("js-reveal-active");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
  }

  const quickTriage = document.getElementById("quickTriage");
  const result = document.getElementById("triageResult");
  if (!quickTriage || !result) return;

  const responses = {
    "q1b-yes": {
      type: "module",
      number: "Modul 1",
      accent: "blue",
      eyebrow: "Empfohlener Einstieg",
      title: "Die bipolare Störung verstehen",
      subtitle: "Erste Orientierung, wenn die Diagnose neu ist.",
      href: "/modul/1/#neu",
      cta: "Modul 1 öffnen",
    },
    "q2-yes": {
      type: "module",
      number: "Modul 4",
      accent: "amber",
      eyebrow: "Empfohlener Einstieg",
      title: "Wenn die Kraft nachlässt",
      subtitle: "Eigene Erschöpfung erkennen, bevor sie zu viel wird.",
      href: "/modul/4/",
      cta: "Modul 4 öffnen",
    },
    "q3-yes": {
      type: "module",
      number: "Modul 1",
      accent: "blue",
      eyebrow: "Empfohlener Einstieg",
      title: "Die bipolare Störung verstehen",
      subtitle: "Grundlagen über Phasen, Symptome und Verlauf.",
      href: "/modul/1/",
      cta: "Modul 1 öffnen",
    },
    "q4-beziehung": {
      type: "module",
      number: "Modul 3",
      accent: "purple",
      eyebrow: "Empfohlener Einstieg",
      title: "Wie Beziehungen unter Druck geraten",
      subtitle: "Was die Erkrankung mit dem Miteinander macht.",
      href: "/modul/3/",
      cta: "Modul 3 öffnen",
    },
    "q4-handeln": {
      type: "module",
      number: "Modul 6",
      accent: "green",
      eyebrow: "Empfohlener Einstieg",
      title: "Was Sie konkret tun können",
      subtitle: "Konkrete Schritte und Werkzeuge für den Alltag.",
      href: "/modul/6/",
      cta: "Modul 6 öffnen",
    },
    "q4-selbst": {
      type: "module",
      number: "Modul 2",
      accent: "amber",
      eyebrow: "Empfohlener Einstieg",
      title: "Die eigene Belastung verstehen",
      subtitle: "Was passiert mit Ihnen, wenn jemand Nahestehender erkrankt.",
      href: "/modul/2/",
      cta: "Modul 2 öffnen",
    },
  };

  const escape = (str) =>
    String(str).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[ch]);

  const renderResult = (response) => {
    const isUrgent = response.type === "urgent";
    const accentAttr = response.accent ? ` data-accent="${escape(response.accent)}"` : "";
    const urgentMod = isUrgent ? " triage-result-card--urgent" : "";
    const eyebrowMod = isUrgent ? " triage-result-eyebrow--urgent" : "";
    const ctaMod = isUrgent ? " triage-result-card__cta--urgent" : "";
    const badge = response.number
      ? `<span class="triage-result-card__badge">${escape(response.number)}</span>`
      : "";

    return (
      `<div class="triage-result-card${urgentMod}"${accentAttr}>` +
        `<span class="triage-result-eyebrow${eyebrowMod}">${escape(response.eyebrow)}</span>` +
        `<div class="triage-result-card__head">` +
          badge +
          `<div class="triage-result-card__text">` +
            `<strong class="triage-result-card__title">${escape(response.title)}</strong>` +
            `<span class="triage-result-card__subtitle">${escape(response.subtitle)}</span>` +
          `</div>` +
        `</div>` +
        `<a href="${escape(response.href)}" class="triage-result-card__cta${ctaMod}">` +
          `${escape(response.cta)} <span aria-hidden="true">→</span>` +
        `</a>` +
      `</div>` +
      `<button type="button" class="triage-restart" data-triage="restart">Nochmal beantworten</button>`
    );
  };

  const focusQuestion = (question) => {
    const questionText = question?.querySelector(".triage-q-text");
    if (!questionText) return;
    questionText.setAttribute("tabindex", "-1");
    questionText.focus();
  };

  const showNext = (hideId, showId) => {
    const current = document.getElementById(hideId);
    const next = document.getElementById(showId);
    if (!current || !next) return;

    current.hidden = true;
    next.hidden = false;
    focusQuestion(next);
  };

  quickTriage.addEventListener("click", (event) => {
    const button = event.target.closest("[data-triage]");
    if (!button) return;

    const action = button.dataset.triage;

    if (action === "q1-yes") {
      window.location.assign("/notfall/");
      return;
    }

    if (action === "q1-no") {
      showNext("triageQ1", "triageQ1b");
      return;
    }

    if (action === "q1b-no") {
      showNext("triageQ1b", "triageQ2");
      return;
    }

    if (action === "q2-no") {
      showNext("triageQ2", "triageQ3");
      return;
    }

    if (action === "q3-no" || action === "q3-both") {
      showNext("triageQ3", "triageQ4");
      return;
    }

    if (responses[action]) {
      const response = responses[action];
      result.className = "triage-result";
      result.innerHTML = renderResult(response);
      result.hidden = false;
      result.setAttribute("tabindex", "-1");
      result.focus();
      document.querySelectorAll(".triage-question").forEach((question) => {
        question.hidden = true;
      });
      return;
    }

    if (action === "restart") {
      const firstQuestion = document.getElementById("triageQ1");
      result.hidden = true;
      result.innerHTML = "";
      if (!firstQuestion) return;
      firstQuestion.hidden = false;
      focusQuestion(firstQuestion);
    }
  });
})();
