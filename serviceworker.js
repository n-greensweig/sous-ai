const CACHE_NAME = 'sous-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.webmanifest',
  '/serviceworker.js',
  '/fonts/LibreFranklin-VariableFont_wght.woff2',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png',
  '/images/food/chicken.webp',
  '/images/food/salmon.webp',
  '/images/food/generic-plate.webp',
];

// Install Event - Cache Assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Event - Cleanup Old Caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        )
      )
  );
});

// Fetch Event - Serve Cached Assets
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(networkResponse => {
            // Optionally, cache new resources here
            // e.g., cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          .catch(error => {
            console.error('Error fetching:', error);
            // Optionally, return a fallback page here
          });
      })
  );
});
