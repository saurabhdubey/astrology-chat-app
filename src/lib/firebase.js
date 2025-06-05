// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Make sure this line exists
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACjVlVxjOO0aRbs1I53CdbEbbjqJ45GuM",
  authDomain: "astrochat-24639.firebaseapp.com",
  projectId: "astrochat-24639",
  storageBucket: "astrochat-24639.firebasestorage.app",
  messagingSenderId: "220104849696",
  appId: "1:220104849696:web:f6e5d22503a3ba227aff45",
  measurementId: "G-X4SST3G2YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);