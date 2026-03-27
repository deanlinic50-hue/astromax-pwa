const CACHE_NAME = 'astro-widget-v1';

// Instalacija: Samo osnovne stvari koje se ne mijenjaju često
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        './manifest.json',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

// Dohvaćanje: "Network First" strategija
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request) // Uvijek prvo pokušaj dohvatiti s interneta
      .catch(() => {
        return caches.match(event.request); // Ako nema neta, vrati cache (ili ništa)
      })
  );
});