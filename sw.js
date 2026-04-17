const CACHE_NAME = 'tucercanias-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Usamos settled para que si falla un icono, el resto se guarde
      return Promise.allSettled(ASSETS.map(a => cache.add(a)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Si pedimos datos a Renfe o al Proxy, siempre red primero
  if (url.href.includes('renfe.com') || url.href.includes('thingproxy')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
  }
});