// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-a0349.firebaseapp.com",
  projectId: "pet-a0349",
  storageBucket: "pet-a0349.firebasestorage.app",
  messagingSenderId: "827624469927",
  appId: "1:827624469927:web:d616dbb010bd2968bdf282",
  measurementId: "G-FCQTVPTD0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
//const analytics = getAnalytics(app);