import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBjdVNjGiqJECC0mFivbkIWiND2aqtHfQ",
  authDomain: "toastmasters-portal.firebaseapp.com",
  projectId: "toastmasters-portal",
  storageBucket: "toastmasters-portal.firebasestorage.app",
  messagingSenderId: "769810000156",
  appId: "1:769810000156:web:4de6ba3aecd5ae380fb2d9",
  measurementId: "G-GSY8230N92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// EXPORT THE DATABASE INSTANCE (This line fixes the error!)
export const db = getFirestore(app);