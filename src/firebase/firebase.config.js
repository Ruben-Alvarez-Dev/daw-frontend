import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDhYQqr1ufgwubz8eJVSSubVats1_fW3yo",
  authDomain: "daw-reservations.firebaseapp.com",
  projectId: "daw-reservations",
  storageBucket: "daw-reservations.appspot.com",
  messagingSenderId: "702345073279",
  appId: "1:702345073279:web:08ca26a0b69ac033dde54a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);