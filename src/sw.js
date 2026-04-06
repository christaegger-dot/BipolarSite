// BipolarSite Service Worker — Offline-Cache for emergency + crisis plan
// Cache version is bumped on each deploy so old caches get purged
const CACHE_NAME = 'bipolarsite-v4';

const PRECACHE_URLS = [
  '/notfall/',
  '/tools/krisenplan/',
  '/css/shared.css',
  '/css/tools.css',
  '/css/tokens.css',
  '/fonts/fonts.css',
  '/fonts/dm-sans-variable.woff2',
  '/fonts/dm-serif-display-400.woff2',
  '/js/nav.js'
];

// HTML pages that should use network-first (always show latest content)
const HTML_URLS = ['/notfall/', '/tools/krisenplan/'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Only handle same-origin GET requests
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  const isHTML = HTML_URLS.some(u => url.pathname === u || url.pathname === u.replace(/\/$/, ''));
  const isPrecached = PRECACHE_URLS.some(u => url.pathname === u || url.pathname === u.replace(/\/$/, ''));

  if (isHTML) {
    // Network-first for HTML pages: always try to fetch the latest version,
    // fall back to cache only when offline
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request, { ignoreSearch: true }))
    );
  } else if (isPrecached) {
    // Cache-first for static assets (CSS, fonts, JS) — fast loading,
    // updated when the SW itself updates (new CACHE_NAME)
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(cached => cached || fetch(event.request))
    );
  }
});
