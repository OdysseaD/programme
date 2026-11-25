// Service worker of the programme page: Web Push notifications only (no offline cache).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', ev => ev.waitUntil(self.clients.claim()));
self.addEventListener('push', ev => {
  let d = {};
  try { d = ev.data ? ev.data.json() : {}; } catch (e) { d = {body: ev.data && ev.data.text()}; }
  ev.waitUntil(self.registration.showNotification(d.title || 'Programme culturel', {
    body: d.body || '', icon: 'icon-192.png', data: {url: d.url || self.registration.scope}}));
});
self.addEventListener('notificationclick', ev => {
  ev.notification.close();
  const url = (ev.notification.data && ev.notification.data.url) || self.registration.scope;
  ev.waitUntil(self.clients.openWindow(url));
});
