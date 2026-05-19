const app = document.querySelector('[data-search-app]');

if (app) {
  const form = app.querySelector('[data-search-form]');
  const input = app.querySelector('[data-search-input]');
  const clearButton = app.querySelector('[data-search-clear]');
  const status = app.querySelector('[data-search-status]');
  const results = app.querySelector('[data-search-results]');
  let pagefindPromise = null;
  let activeRequest = 0;
  let debounceTimer = null;

  const loadPagefind = () => {
    if (!pagefindPromise) {
      pagefindPromise = import('/pagefind/pagefind.js');
    }
    return pagefindPromise;
  };

  const setStatus = (message) => {
    status.textContent = message;
  };

  const clearResults = () => {
    results.replaceChildren();
  };

  const setClearButtonState = (query) => {
    if (clearButton) {
      clearButton.hidden = query.trim().length === 0;
    }
  };

  const createResult = (data) => {
    const article = document.createElement('article');
    article.className = 'search-result';

    const title = document.createElement('h2');
    title.className = 'search-result-title';
    const link = document.createElement('a');
    link.className = 'pagefind-ui__result-link';
    link.href = data.url;
    link.textContent = data.meta?.title || data.url;
    title.append(link);

    const excerpt = document.createElement('p');
    excerpt.className = 'search-result-excerpt';
    excerpt.innerHTML = data.excerpt || 'Kein Auszug verfügbar.';

    const url = document.createElement('p');
    url.className = 'search-result-url';
    url.textContent = data.url;

    article.append(title, excerpt, url);
    return article;
  };

  const updateUrl = (query) => {
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  };

  const runSearch = async (query) => {
    const normalizedQuery = query.trim();
    activeRequest += 1;
    const requestId = activeRequest;
    updateUrl(normalizedQuery);

    if (!normalizedQuery) {
      clearResults();
      setStatus('Geben Sie einen Begriff ein, um die Website zu durchsuchen.');
      setClearButtonState('');
      return;
    }

    setClearButtonState(normalizedQuery);
    setStatus('Suche läuft…');
    clearResults();

    try {
      const pagefind = await loadPagefind();
      const response = await pagefind.search(normalizedQuery);
      if (requestId !== activeRequest) return;

      const resultData = await Promise.all(
        response.results.slice(0, 12).map((result) => result.data())
      );
      if (requestId !== activeRequest) return;

      if (response.results.length === 0) {
        setStatus(`Keine Ergebnisse für «${normalizedQuery}».`);
        return;
      }

      setStatus(
        response.results.length === 1
          ? '1 Ergebnis gefunden.'
          : `${response.results.length} Ergebnisse gefunden.`
      );
      results.replaceChildren(...resultData.map(createResult));
    } catch (error) {
      clearResults();
      setStatus('Die Suche konnte gerade nicht geladen werden.');
      console.error(error);
    }
  };

  const queueSearch = (query) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => runSearch(query), 250);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    runSearch(input.value);
  });

  input.addEventListener('input', () => {
    setClearButtonState(input.value);
    queueSearch(input.value);
  });

  clearButton?.addEventListener('click', () => {
    input.value = '';
    activeRequest += 1;
    updateUrl('');
    clearResults();
    setStatus('Geben Sie einen Begriff ein, um die Website zu durchsuchen.');
    setClearButtonState('');
    input.focus();
  });

  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
  setClearButtonState(initialQuery);
  if (initialQuery) {
    input.value = initialQuery;
    runSearch(initialQuery);
  }
}
