importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js'
)

// Since import.meta.env isn’t available here,
// you must inject values at build time (Vite replaces them).
firebase.initializeApp({
  apiKey: "AIzaSyCRf4h9PDf5MZ57kZdjAfJgFP9llCvpIdo",
  authDomain: "devtinder-d97a6.firebaseapp.com",
  projectId: "devtinder-d97a6",
  storageBucket: "devtinder-d97a6.firebasestorage.app",
  messagingSenderId: "870615390626",
  appId: "1:870615390626:web:ce8c6c61332e82000c3afb",
  measurementId: "G-R2130ZH3SE"
})


const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Background message received:', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
