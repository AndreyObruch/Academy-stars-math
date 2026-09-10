/* АКАДЕМИЯ ЗВЁЗДНЫХ МАТЕМАТИКОВ v4.7 — service worker (P2: офлайн) */
const CACHE_NAME = 'cosmo-quest-v4.7';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/backgrounds/stars-bg.png',
  '/backgrounds/login-bg.jpg',
  '/backgrounds/level-1.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .catch(err => console.warn('Precache частичный:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  // API не кэшируем: задачи и профили всегда из сети
  if (event.request.url.includes('/api/')) return;
  // Навигация: network-first, офлайн-фоллбэк на кэш index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('/index.html', copy));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }
  // Статика: stale-while-revalidate — кэш сразу, обновление фоном
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const network = fetch(event.request).then(response => {
          const sameOrigin = event.request.url.startsWith(self.location.origin);
          if (response.ok && (sameOrigin || response.type === 'cors')) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(() => cached);
        return cached || network;
      })
    )
  );
});