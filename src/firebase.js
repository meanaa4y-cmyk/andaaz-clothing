import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArCtKKJyqmCJMLQENZWMdpt19HPakCkJI",
  authDomain: "andaaz-clothing.firebaseapp.com",
  projectId: "andaaz-clothing",
  storageBucket: "andaaz-clothing.firebasestorage.app",
  messagingSenderId: "456848676670",
  appId: "1:456848676670:web:f0e4d897fb498f74c3be6f",
  measurementId: "G-SK6VBMJ0WP",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
