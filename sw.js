const CACHE_NAME = 'gestione-spese-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Installa il Service Worker e salva i file in cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Quando l'app richiede un file, cercalo prima in cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se il file è in cache, restituiscilo, altrimenti scaricalo da internet
        return response || fetch(event.request);
      })
  );
});
