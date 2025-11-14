// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiiEhGTToiR-cgeH5YxPLZi72Jp9KV9v0",
  authDomain: "week7-demo-985d6.firebaseapp.com",
  projectId: "week7-demo-985d6",
  storageBucket: "week7-demo-985d6.firebasestorage.app",
  messagingSenderId: "777445952076",
  appId: "1:777445952076:web:daf4f618e8afa1f57142e9",
  measurementId: "G-K18YF9S5YD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
