(() => {
  const MINI_PLAN_KEY = 'puk_modul8_mini_plan';
  const miniPlanNumber = document.getElementById('miniPlanNumber');
  const miniPlanDocument = document.getElementById('miniPlanDocument');
  const miniPlanStep = document.getElementById('miniPlanStep');
  const miniPlanSave = document.getElementById('miniPlanSave');
  const miniPlanClear = document.getElementById('miniPlanClear');
  const miniPlanStatus = document.getElementById('miniPlanStatus');
  const miniPlanStorageConsent = document.getElementById('miniPlanStorageConsent');
  const miniPlanSummary = document.getElementById('miniPlanSummary');
  const miniPlanSummaryNumber = document.getElementById('miniPlanSummaryNumber');
  const miniPlanSummaryDocument = document.getElementById('miniPlanSummaryDocument');
  const miniPlanSummaryStep = document.getElementById('miniPlanSummaryStep');
  let miniPlanLoaded = false;

  const readMiniPlan = () => {
    try {
      return JSON.parse(localStorage.getItem(MINI_PLAN_KEY) || 'null');
    } catch {
      return null;
    }
  };

  const writeMiniPlan = (data) => {
    try {
      localStorage.setItem(MINI_PLAN_KEY, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  };

  const clearMiniPlanStorage = () => {
    try {
      localStorage.removeItem(MINI_PLAN_KEY);
    } catch {}
  };

  const renderMiniPlanSummary = (data) => {
    if (!miniPlanSummary || !miniPlanSummaryNumber || !miniPlanSummaryDocument || !miniPlanSummaryStep) {
      return;
    }

    if (!data || (!data.number && !data.document && !data.step)) {
      miniPlanSummary.hidden = true;
      miniPlanSummaryNumber.textContent = '—';
      miniPlanSummaryDocument.textContent = '—';
      miniPlanSummaryStep.textContent = '—';
      return;
    }

    miniPlanSummary.hidden = false;
    miniPlanSummaryNumber.textContent = data.number || '—';
    miniPlanSummaryDocument.textContent = data.document || '—';
    miniPlanSummaryStep.textContent = data.step || '—';
  };

  const loadMiniPlan = () => {
    const saved = readMiniPlan();
    if (!saved || !miniPlanNumber || !miniPlanDocument || !miniPlanStep || !miniPlanStatus) return false;

    miniPlanNumber.value = saved.number || '';
    miniPlanDocument.value = saved.document || '';
    miniPlanStep.value = saved.step || '';
    renderMiniPlanSummary(saved);
    miniPlanStatus.textContent = 'Ihr zuletzt gespeicherter Mini-Plan wurde geladen.';
    miniPlanLoaded = true;
    return true;
  };

  const miniPlanHasStoredData = () => {
    const saved = readMiniPlan();
    return Boolean(saved && (saved.number || saved.document || saved.step));
  };

  const miniPlanHasCurrentValues = () =>
    Boolean(
      miniPlanNumber?.value.trim() ||
        miniPlanDocument?.value ||
        miniPlanStep?.value.trim()
    );

  const syncMiniPlanConsentState = (announce = true) => {
    if (!miniPlanSave || !miniPlanStatus || !miniPlanStorageConsent) return;

    const consentEnabled = miniPlanStorageConsent.checked;
    miniPlanSave.disabled = !consentEnabled;

    if (consentEnabled) {
      if (!miniPlanLoaded && miniPlanHasStoredData()) {
        if (miniPlanHasCurrentValues()) {
          if (announce) {
            miniPlanStatus.textContent =
              'Lokale Speicherung ist aktiv. Bereits gespeicherte Inhalte wurden nicht automatisch geladen, damit aktuelle Eingaben nicht überschrieben werden.';
          }
        } else if (!loadMiniPlan() && announce) {
          miniPlanStatus.textContent = 'Lokale Speicherung ist aktiv. Sie können den Mini-Plan jetzt auf diesem Gerät sichern.';
        }
      } else if (announce && !miniPlanHasStoredData()) {
        miniPlanStatus.textContent = 'Lokale Speicherung ist aktiv. Sie können den Mini-Plan jetzt auf diesem Gerät sichern.';
      }
      return;
    }

    if (miniPlanHasStoredData()) {
      miniPlanStatus.textContent =
        'Auf diesem Gerät gibt es einen gespeicherten Mini-Plan. Aktivieren Sie die lokale Speicherung, um ihn zu laden, oder löschen Sie ihn direkt.';
    } else if (announce) {
      miniPlanStatus.textContent =
        'Lokale Speicherung ist aus. Der Mini-Plan bleibt nur im aktuellen Besuch sichtbar, bis Sie ihn bewusst speichern.';
    }
  };

  if (
    miniPlanSave &&
    miniPlanClear &&
    miniPlanNumber &&
    miniPlanDocument &&
    miniPlanStep &&
    miniPlanStatus &&
    miniPlanStorageConsent
  ) {
    syncMiniPlanConsentState(false);

    miniPlanStorageConsent.addEventListener('change', () => {
      syncMiniPlanConsentState(true);
    });

    miniPlanSave.addEventListener('click', () => {
      if (!miniPlanStorageConsent.checked) {
        miniPlanStatus.textContent =
          'Bitte aktivieren Sie zuerst die lokale Speicherung, wenn der Mini-Plan auf diesem Gerät bleiben soll.';
        return;
      }

      const data = {
        number: miniPlanNumber.value.trim(),
        document: miniPlanDocument.value,
        step: miniPlanStep.value.trim(),
      };

      if (!data.number && !data.document && !data.step) {
        miniPlanStatus.textContent = 'Bitte zuerst mindestens ein Feld ausfüllen.';
        renderMiniPlanSummary(null);
        return;
      }

      if (writeMiniPlan(data)) {
        miniPlanStatus.textContent = 'Mini-Plan lokal auf diesem Gerät gespeichert.';
        renderMiniPlanSummary(data);
        miniPlanLoaded = true;
      } else {
        miniPlanStatus.textContent = 'Speichern war in diesem Browser gerade nicht möglich.';
      }
    });

    miniPlanClear.addEventListener('click', () => {
      miniPlanNumber.value = '';
      miniPlanDocument.value = '';
      miniPlanStep.value = '';
      clearMiniPlanStorage();
      renderMiniPlanSummary(null);
      miniPlanLoaded = false;
      miniPlanStatus.textContent = 'Mini-Plan von diesem Gerät gelöscht.';
    });
  }

  if (miniPlanStatus && !miniPlanStorageConsent && miniPlanHasStoredData()) {
    miniPlanStatus.textContent =
      'Auf diesem Gerät gibt es einen gespeicherten Mini-Plan. Aktivieren Sie die lokale Speicherung, um ihn zu laden, oder löschen Sie ihn direkt.';
  }
})();
