// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app);