// Offline support for /bc/ only.
// Online: always fetch the newest files first (bypassing the 10-minute GitHub cache); if the network
// is slow or missing, fall back to the saved copy after a few seconds. Offline: the saved copy.
const CACHE = 'bc-20261111221307';
const CORE = ['./', './trip.enc', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(CORE.map(u => new Request(u, {cache: 'reload'}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('bc-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
const timeout = ms => new Promise((_, reject) => setTimeout(() => reject(new Error('slow')), ms));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  const ours = url.origin === location.origin && url.pathname.startsWith('/bc/');
  if (!fonts && !ours) return;
  if (fonts) {
    e.respondWith(caches.open(CACHE).then(async cache => (await cache.match(req)) ||
      fetch(req).then(res => { cache.put(req, res.clone()); return res; })));
    return;
  }
  const key = req.mode === 'navigate' ? './' : url.pathname.endsWith('/') ? './' : req.url.split('?')[0];
  e.respondWith(caches.open(CACHE).then(async cache => {
    const network = fetch(url.pathname, {cache: 'no-cache'}).then(res => {
      if (res.ok) cache.put(key, res.clone());
      return res;
    });
    try {
      return await Promise.race([network, timeout(4000)]);
    } catch (error) {
      const saved = await cache.match(key, {ignoreSearch: true});
      return saved || network;
    }
  }));
});
