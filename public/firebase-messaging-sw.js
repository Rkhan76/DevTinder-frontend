importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js'
)

firebase.initializeApp({
  apiKey: 'AIzaSyBM4_CtwNNCIEMyhMp0EVBX9-3yGCE9BTo',
  authDomain: 'devtinder-cb11e.firebaseapp.com',
  projectId: 'devtinder-cb11e',
  storageBucket: 'devtinder-cb11e.firebasestorage.app',
  messagingSenderId: '905570479315',
  appId: '1:905570479315:web:9385adc8d77b3dcb89f826',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Background message received:', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png', // change to your app icon
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
