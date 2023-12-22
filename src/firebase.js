// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBsmi1fpiECe3hKrI8ypDvBSU527TLmYr0",
  authDomain: "own-finance-tracker.firebaseapp.com",
  projectId: "own-finance-tracker",
  storageBucket: "own-finance-tracker.appspot.com",
  messagingSenderId: "4274355070",
  appId: "1:4274355070:web:af575d5fe42a286bce912f",
  measurementId: "G-DNEZGYP6GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };