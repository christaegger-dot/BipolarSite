(() => {
  const KEY = "krisenplan-v1";
  const form = document.getElementById("form");
  if (!form) return;

  const fields = form.querySelectorAll("textarea,input");
  const totalFields = fields.length;
  const progFill = document.getElementById("progFill");
  const progLabel = document.getElementById("progLabel");
  const confirmDialog = document.getElementById("confirm");
  const savedMsg = document.getElementById("savedMsg");
  const printDate = document.getElementById("printDate");
  const btnPrint = document.getElementById("btnPrint");
  const btnReset = document.getElementById("btnReset");
  const btnConfirmCancel = document.getElementById("btnConfirmCancel");
  const btnConfirmDelete = document.getElementById("btnConfirmDelete");

  let saveTimer;
  let confirmTrigger = null;
  let lastFilled = 0;
  let hintShown = false;

  const updateProg = () => {
    lastFilled = 0;
    fields.forEach((field) => {
      if (field.value.trim().length > 0) lastFilled += 1;
    });

    const pct = Math.round((lastFilled / totalFields) * 100);
    if (progFill) progFill.style.width = `${pct}%`;
    if (progLabel) {
      progLabel.textContent = `${lastFilled} von ${totalFields} Feldern ausgefüllt (${pct}%)`;
    }
  };

  const load = () => {
    try {
      const data = JSON.parse(localStorage.getItem(KEY));
      if (data) {
        fields.forEach((field) => {
          if (data[field.name]) field.value = data[field.name];
        });
      }
    } catch (error) {
      console.warn("Storage unavailable:", error.message);
    }

    updateProg();
  };

  const save = () => {
    const data = {};
    fields.forEach((field) => {
      if (field.value.trim()) data[field.name] = field.value.trim();
    });

    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      if (savedMsg) {
        savedMsg.textContent = "Gespeichert ✓";
        savedMsg.classList.add("vis");
      }
    } catch (error) {
      if (savedMsg) {
        savedMsg.textContent = "Speichern nicht möglich — privater Modus?";
        savedMsg.style.background = "var(--alert)";
        savedMsg.classList.add("vis");
      }
    }

    window.setTimeout(() => {
      if (!savedMsg) return;
      savedMsg.classList.remove("vis");
      savedMsg.style.background = "";
    }, 2500);
  };

  const hideConfirm = () => {
    if (!confirmDialog) return;
    confirmDialog.close();
    if (confirmTrigger && typeof confirmTrigger.focus === "function") {
      confirmTrigger.focus();
    }
  };

  const showConfirm = () => {
    if (!confirmDialog) return;
    confirmTrigger = document.activeElement;
    confirmDialog.showModal();
  };

  const doReset = () => {
    fields.forEach((field) => {
      field.value = "";
    });

    try {
      localStorage.removeItem(KEY);
    } catch (error) {
      console.warn("Storage unavailable:", error.message);
    }

    hideConfirm();
    updateProg();
  };

  const showNextStepHint = () => {
    if (hintShown || lastFilled < 3 || !savedMsg) return;
    hintShown = true;
    savedMsg.textContent =
      "Gespeichert ✓ — Drucken Sie den Plan und besprechen Sie ihn mit Ihrer Fachperson.";
    savedMsg.classList.add("vis");
    window.setTimeout(() => savedMsg.classList.remove("vis"), 5000);
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      updateProg();
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(save, 1500);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    save();
    window.setTimeout(showNextStepHint, 2600);
  });

  if (btnPrint) {
    btnPrint.addEventListener("click", () => window.print());
  }

  if (btnReset) {
    btnReset.addEventListener("click", showConfirm);
  }

  if (btnConfirmCancel) {
    btnConfirmCancel.addEventListener("click", hideConfirm);
  }

  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener("click", doReset);
  }

  if (confirmDialog) {
    confirmDialog.addEventListener("click", (event) => {
      if (event.target === confirmDialog) hideConfirm();
    });
  }

  if (printDate) {
    printDate.textContent = new Date().toLocaleDateString("de-CH");
  }

  load();
})();
