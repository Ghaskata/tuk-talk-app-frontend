import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


//device notification valu
const firebaseConfig = {
  apiKey: "AIzaSyCTDr3MajlsccP873hT72wVTQz0dX3aDb0",
  authDomain: "device-notification-209a2.firebaseapp.com",
  projectId: "device-notification-209a2",
  storageBucket: "device-notification-209a2.appspot.com",
  messagingSenderId: "10591629349",
  appId: "1:10591629349:web:009b02fd94ddabf2784fcc",
  measurementId: "G-S470L6N9PQ",
};

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);





export { app, authentication };
