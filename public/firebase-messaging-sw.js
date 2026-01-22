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

// messaging.onBackgroundMessage((payload) => {
//   self.registration.showNotification(
//     payload.data?.title || "Notification",
//     { body: payload.data?.body || "New message" }
//   );
// });
