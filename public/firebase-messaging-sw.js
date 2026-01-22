// public/firebase-messaging-sw.js

// Firebase imports
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDjd-Gp0Pl8_FeqUkmN4AveQgg5t_6KxMw",
  authDomain: "pwa-demo-2c62a.firebaseapp.com",
  projectId: "pwa-demo-2c62a",
  storageBucket: "pwa-demo-2c62a.firebasestorage.app",
  messagingSenderId: "1000009780116",
  appId: "1:1000009780116:web:620d32840a77302646dd81"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: '/Icons/icon-192.png',
    badge: '/Icons/icon-192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ RECOMMENDED: Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received.');
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});