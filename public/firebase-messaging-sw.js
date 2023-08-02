// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyClww0STh9PA1fe7_Ha5NFdRLeLhjFRJrI",
    authDomain: "itm-tap-cell-portal.firebaseapp.com",
    projectId: "itm-tap-cell-portal",
    storageBucket: "itm-tap-cell-portal.appspot.com",
    messagingSenderId: "1043937639532",
    appId: "1:1043937639532:web:bb07242c83652232bc2c49",
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // Customize the notification here and display it
    console.log(payload)
    const notificationOptions = {
      body: payload.data.body,
      icon: './ITM_LOGO.png', // Replace with the path to your notification icon
      data:payload.data
    };
  
    self.registration.showNotification(payload.data.title, notificationOptions);
  });

  self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification

    // Get the custom link from the notification data
    const clickAction = event.notification.data.link || 'https://itmtapcell.netlify.app/user/mails'; // Replace with your default URL
    event.waitUntil(clients.openWindow(clickAction));
});  