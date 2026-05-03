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
    "q1-yes": {
      html: '<a href="/notfall/">Zum Notfallweg &rarr;</a>',
      cls: "triage-result--urgent",
    },
    "q1b-yes": {
      html: '<a href="/modul/1/#neu">Erste Orientierung: Diagnose neu &rarr;</a>',
      cls: "triage-result--safe",
    },
    "q2-yes": {
      html: '<a href="/modul/4/">Modul 4: Wenn die Kraft nachlässt &rarr;</a>',
      cls: "",
    },
    "q3-yes": {
      html: '<a href="/modul/1/">Modul 1: Die bipolare Störung verstehen &rarr;</a>',
      cls: "",
    },
    "q4-beziehung": {
      html: '<a href="/modul/3/">Modul 3: Wie Beziehungen unter Druck geraten &rarr;</a>',
      cls: "triage-result--safe",
    },
    "q4-handeln": {
      html: '<a href="/modul/6/">Modul 6: Was Sie konkret tun können &rarr;</a>',
      cls: "triage-result--safe",
    },
    "q4-selbst": {
      html: '<a href="/modul/2/">Modul 2: Die eigene Belastung verstehen &rarr;</a>',
      cls: "triage-result--safe",
    },
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
      result.className = `triage-result${response.cls ? ` ${response.cls}` : ""}`;
      result.innerHTML =
        `${response.html}<button type="button" class="triage-restart" data-triage="restart">Nochmal beantworten</button>`;
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
      result.className = "triage-result";
      if (!firstQuestion) return;
      firstQuestion.hidden = false;
      focusQuestion(firstQuestion);
    }
  });
})();
