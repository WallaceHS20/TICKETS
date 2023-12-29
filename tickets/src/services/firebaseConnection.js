
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYIkoR-Cjg4EV_GaMLRmep8eZJV1E_6yU",
  authDomain: "tickets-43cb7.firebaseapp.com",
  projectId: "tickets-43cb7",
  storageBucket: "tickets-43cb7.appspot.com",
  messagingSenderId: "879232019307",
  appId: "1:879232019307:web:47430fabefaf311717fa2e",
  measurementId: "G-JHLC6Z66QR"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp);

export { auth, storage, db}