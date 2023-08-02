import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const config = {
  apiKey: "AIzaSyClww0STh9PA1fe7_Ha5NFdRLeLhjFRJrI",
  authDomain: "itm-tap-cell-portal.firebaseapp.com",
  projectId: "itm-tap-cell-portal",
  storageBucket: "itm-tap-cell-portal.appspot.com",
  messagingSenderId: "1043937639532",
  appId: "1:1043937639532:web:bb07242c83652232bc2c49",
  //measurementId: "G-3TNT72WRZ4",
};
firebase.initializeApp(config);
export const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    if (!("Notification" in window)) {
      reject(new Error("This browser does not support desktop notifications."));
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          messaging
            .getToken({vapidKey:'BE6jgKueelsQJ7qplkERJ3S8Ezy0qBrMATlC3GTINg4HKrRc1-v8aBwry669AyBzFN5OY1jY_sXZT_LXXAxzQY8'})
            .then((firebaseToken) => {
              resolve(firebaseToken);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(new Error("Permission for notifications denied."));
        }
      });
    }
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
