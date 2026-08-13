// One-time seeding script — run this ONCE to populate your empty Firestore
// database with the starter catalog, so the app has something to show.
//
// Usage:
//   node scripts/seed.js
//
// Safe to re-run: it uses setDoc with a fixed doc id per item, so it will
// just overwrite the same documents instead of duplicating them.

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initialProducts, initialOrders, initialCustomers } from "../src/data/mockData.js";

const firebaseConfig = {
  apiKey: "AIzaSyArCtKKJyqmCJMLQENZWMdpt19HPakCkJI",
  authDomain: "andaaz-clothing.firebaseapp.com",
  projectId: "andaaz-clothing",
  storageBucket: "andaaz-clothing.firebasestorage.app",
  messagingSenderId: "456848676670",
  appId: "1:456848676670:web:f0e4d897fb498f74c3be6f",
  measurementId: "G-SK6VBMJ0WP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Seeding products...");
  for (const p of initialProducts) {
    const { id, ...rest } = p;
    await setDoc(doc(db, "products", String(id)), rest);
  }

  console.log("Seeding orders...");
  for (const o of initialOrders) {
    const { id, ...rest } = o;
    await setDoc(doc(db, "orders", id), rest);
  }

  console.log("Seeding customers...");
  for (const c of initialCustomers) {
    const { id, ...rest } = c;
    await setDoc(doc(db, "customers", String(id)), rest);
  }

  console.log("Done! Your Firestore database now has starter data.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
