const CACHE_NAME = 'skysafe-v3';
const ASSETS = [
  '/pages/dashboard.html',
  '/pages/login.html',
  '/pages/register.html',
  '/pages/alert.html',
  '/pages/forecast.html',
  '/pages/Map.html',
  '/pages/trip.html',
  '/css/global.css',
  '/js/broadcast.js',
  '/js/dashboard.js',
  '/js/auth.js'
];

// Install Service Worker
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    }).then(() => clients.claim())
  );
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
    data: { url: '/dashboard.html' },
    sound: 'https://www.soundjay.com/mechanical/siren-1.mp3'
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
