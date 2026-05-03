const CACHE_NAME = 'skysafe-v1';
const ASSETS = [
  '/frontend/pages/dashboard.html',
  '/frontend/css/global.css',
  '/frontend/js/broadcast.js'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Fetch (Offline support)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Background Notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.description || 'Emergency Broadcast',
    icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    requireInteraction: true,
    data: { url: '/frontend/pages/dashboard.html' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '🚨 EMERGENCY', options)
  );
});

// Notification Click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
