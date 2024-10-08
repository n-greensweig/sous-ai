const CACHE_NAME = 'sous-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/offline.html',
    '/app.webmanifest',
    '/serviceworker.js',
    '/fonts/LibreFranklin-VariableFont_wght.woff2',
    '/images/avatars/sous.png',
    '/images/food/chicken.webp',
    '/images/food/salmon.webp',
    '/images/food/generic-plate.webp',
];

// Install Event - Cache Assets
self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching assets');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate Event - Cleanup Old Caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(cacheNames =>
                Promise.all(
                    cacheNames.map(cacheName => {
                        if (!cacheWhitelist.includes(cacheName)) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                )
            )
    );
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            console.log('Serving from cache:', event.request.url);
            return response;
          }
          console.log('Fetching from network:', event.request.url);
          return fetch(event.request)
            .then(networkResponse => {
              // Optionally, cache new resources
              return networkResponse;
            })
            .catch(error => {
              console.error('Error fetching:', error);
              // Serve offline page for navigation requests
              if (event.request.mode === 'navigate') {
                return caches.match('/offline.html');
              }
            });
        })
    );
  });  