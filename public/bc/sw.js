// Offline support for /bc/ only. Opens instantly from cache, refreshes in the background.
const CACHE = 'bc-20261111215908';
const CORE = ['./', './trip.enc', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('bc-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  const ours = url.origin === location.origin && url.pathname.startsWith('/bc/');
  if (!fonts && !ours) return;
  const key = (ours && req.mode === 'navigate') ? './' : req;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(key, {ignoreSearch: true});
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(key, res.clone());
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});
