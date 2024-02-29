// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDOifGWRhejMLKVwWuaDghqvKkyyxNAGrA",
  authDomain: "pettres-sales-system-654d9.firebaseapp.com",
  projectId: "pettres-sales-system-654d9",
  storageBucket: "pettres-sales-system-654d9.appspot.com",
  messagingSenderId: "1036047670984",
  appId: "1:1036047670984:web:e1991fdb5bff8f03af4ffd",
  measurementId: "G-936TYXWJ2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)