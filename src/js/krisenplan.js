(() => {
  const KEY = "krisenplan-v1";
  const form = document.getElementById("form");
  if (!form) return;

  const fields = form.querySelectorAll("textarea,input");
  const btnSave = document.getElementById("btnSave");
  const totalFields = fields.length;
  const progFill = document.getElementById("progFill");
  const progLabel = document.getElementById("progLabel");
  const confirmDialog = document.getElementById("confirm");
  const savedMsg = document.getElementById("savedMsg");
  const printDate = document.getElementById("printDate");
  const btnPrint = document.getElementById("btnPrint");
  const btnReset = document.getElementById("btnReset");
  const btnLocalDelete = document.getElementById("btnLocalDelete");
  const btnConfirmCancel = document.getElementById("btnConfirmCancel");
  const btnConfirmDelete = document.getElementById("btnConfirmDelete");
  const storageModeStatus = document.getElementById("storageModeStatus");
  const storageModeRadios = document.querySelectorAll('input[name="storageMode"]');

  let saveTimer;
  let confirmTrigger = null;
  let lastFilled = 0;
  let hintShown = false;
  let storageEnabled = false;
  let loadedFromStorage = false;

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

  const hasData = (data) =>
    Boolean(
      data &&
        Object.values(data).some(
          (value) => typeof value === "string" && value.trim().length > 0
        )
    );

  const hasCurrentValues = () =>
    Array.from(fields).some((field) => field.value.trim().length > 0);

  const readStoredData = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch (error) {
      console.warn("Storage unavailable:", error.message);
      return null;
    }
  };

  const load = () => {
    const data = readStoredData();
    if (!data) return false;

    fields.forEach((field) => {
      if (data[field.name]) field.value = data[field.name];
    });

    loadedFromStorage = true;
    updateProg();
    return true;
  };

  const setSavedMessage = (text, isWarning = false, timeout = 2500) => {
    if (!savedMsg) return;
    savedMsg.textContent = text;
    savedMsg.classList.toggle("is-warning", isWarning);
    savedMsg.classList.add("vis");

    window.setTimeout(() => {
      savedMsg.classList.remove("vis");
      savedMsg.classList.remove("is-warning");
    }, timeout);
  };

  const syncStorageMode = (announce = true) => {
    const selectedMode = Array.from(storageModeRadios).find((radio) => radio.checked)?.value;
    storageEnabled = selectedMode === "save";

    if (btnSave) btnSave.disabled = !storageEnabled;

    if (storageEnabled) {
      const storedData = readStoredData();
      if (!loadedFromStorage && hasData(storedData)) {
        if (hasCurrentValues()) {
          if (announce && storageModeStatus) {
            storageModeStatus.textContent =
              "Lokale Speicherung ist aktiv. Bereits gespeicherte Daten wurden nicht automatisch geladen, damit aktuelle Eingaben nicht überschrieben werden.";
          }
        } else if (load() && announce && storageModeStatus) {
          storageModeStatus.textContent =
            "Lokale Speicherung ist aktiv. Bereits gespeicherte Krisenplan-Daten wurden geladen.";
        }
      } else if (announce && storageModeStatus && !hasData(storedData)) {
        storageModeStatus.textContent =
          "Lokale Speicherung ist aktiv. Sie können den Plan jetzt bewusst auf diesem Gerät sichern.";
      }
      return;
    }

    if (storageModeStatus) {
      storageModeStatus.textContent = hasData(readStoredData())
        ? "Auf diesem Gerät gibt es bereits gespeicherte Krisenplan-Daten. Wählen Sie „Lokal auf diesem Gerät speichern“, um sie zu laden, oder löschen Sie sie vollständig."
        : "Lokale Speicherung ist aus. Der Plan bleibt nur in diesem Besuch sichtbar, bis Sie die Speicherung ausdrücklich aktivieren.";
    }
  };

  const save = () => {
    if (!storageEnabled) {
      if (storageModeStatus) {
        storageModeStatus.textContent =
          "Lokale Speicherung ist aus. Wählen Sie zuerst „Lokal auf diesem Gerät speichern“, wenn der Plan auf diesem Gerät bleiben soll.";
      }
      return;
    }

    const data = {};
    fields.forEach((field) => {
      if (field.value.trim()) data[field.name] = field.value.trim();
    });

    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      loadedFromStorage = true;
      setSavedMessage("Gespeichert ✓");
    } catch (error) {
      setSavedMessage("Speichern nicht möglich — privater Modus?", true);
    }
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

    loadedFromStorage = false;
    hideConfirm();
    updateProg();
    if (storageModeStatus) {
      storageModeStatus.textContent =
        "Alle lokal gespeicherten Krisenplan-Daten wurden von diesem Gerät gelöscht.";
    }
    setSavedMessage("Lokale Daten gelöscht.", false, 2200);
  };

  const showNextStepHint = () => {
    if (hintShown || lastFilled < 3 || !storageEnabled) return;
    hintShown = true;
    setSavedMessage(
      "Gespeichert ✓ — Drucken Sie den Plan und besprechen Sie ihn mit Ihrer Fachperson.",
      false,
      5000
    );
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      updateProg();
      if (!storageEnabled) return;
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(save, 1500);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!storageEnabled) {
      if (storageModeStatus) {
        storageModeStatus.textContent =
          "Bitte aktivieren Sie zuerst die lokale Speicherung, wenn der Plan auf diesem Gerät gesichert werden soll.";
      }
      return;
    }
    save();
    window.setTimeout(showNextStepHint, 2600);
  });

  if (btnPrint) {
    btnPrint.addEventListener("click", () => window.print());
  }

  if (btnReset) {
    btnReset.addEventListener("click", showConfirm);
  }

  if (btnLocalDelete) {
    btnLocalDelete.addEventListener("click", showConfirm);
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

  syncStorageMode(false);
  updateProg();

  storageModeRadios.forEach((radio) => {
    radio.addEventListener("change", () => syncStorageMode(true));
  });
})();
