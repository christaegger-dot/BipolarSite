// BipolarSite Service Worker — Offline-Cache for emergency + crisis plan
const CACHE_NAME = 'bipolarsite-v2';
const PRECACHE_URLS = [
  '/notfall/',
  '/tools/krisenplan/',
  '/css/shared.css',
  '/css/tools.css',
  '/css/tokens.css',
  '/css/overrides.css',
  '/fonts/fonts.css',
  '/fonts/dm-sans-variable.woff2',
  '/fonts/dm-serif-display-400.woff2',
  '/js/nav.js'
];

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

  // Cache-first for precached URLs
  const isPrecached = PRECACHE_URLS.some(u => url.pathname === u || url.pathname === u.replace(/\/$/, ''));
  if (isPrecached) {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  }
});
