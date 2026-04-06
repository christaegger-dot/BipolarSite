// BipolarSite Service Worker — Offline-Cache for emergency + crisis plan
const CACHE_NAME = 'bipolarsite-v5';

// Pages that MUST work offline
const OFFLINE_PAGES = [
  '/notfall/',
  '/tools/krisenplan/'
];

// Assets needed by those pages (fonts, CSS, JS)
const OFFLINE_ASSETS = [
  '/css/shared.css',
  '/css/tools.css',
  '/css/tokens.css',
  '/css/overrides.css',
  '/fonts/fonts.css',
  '/fonts/dm-sans-variable.woff2',
  '/fonts/dm-serif-display-400.woff2',
  '/js/nav.js'
];

const ALL_PRECACHE = [...OFFLINE_PAGES, ...OFFLINE_ASSETS];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ALL_PRECACHE))
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
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const isOfflinePage = OFFLINE_PAGES.some(p => pathname === p.replace(/\/$/, ''));
  const isOfflineAsset = OFFLINE_ASSETS.some(a => pathname === a);

  if (isOfflinePage) {
    // HTML emergency pages: cache-first (instant offline access)
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true })
        .then(cached => cached || fetch(event.request))
    );
  } else if (isOfflineAsset) {
    // CSS/JS/Fonts: network-first (always fresh when online, cache fallback for offline)
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request, { ignoreSearch: true }))
    );
  }
  // All other requests: no SW involvement, normal browser behavior
});
