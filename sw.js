const CACHE = 'rcboker-v4';
const CORE = ['./', 'index.html', 'manifest.json', 'img/logo.jpg', 'img/icono.jpg', 'img/hero.webp', 'img/civil.webp', 'img/familiar.webp', 'img/laboral.webp', 'img/biblioteca.webp', 'img/justicia.webp'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
