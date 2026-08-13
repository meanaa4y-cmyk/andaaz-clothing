# ANDAAZ — React + Firebase Project

Converted from the original single-file HTML into a real React (Vite) project,
now wired up to a live Firebase backend (Firestore + Authentication).

## Run it

```bash
npm install
npm run dev
```

## First-time setup: seed your database

Your Firestore project starts empty. Run this once to populate it with the
starter catalog (products, sample orders, sample customers):

```bash
node scripts/seed.js
```

Safe to re-run — it overwrites the same documents rather than duplicating them.

## Firestore security rules

For development, open your Firestore rules (Firebase Console → Firestore
Database → Rules) so the app can read/write. A reasonable starting point:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{id} { allow read: if true; allow write: if request.auth != null; }
    match /orders/{id}   { allow read, write: if true; }
    match /customers/{id}{ allow read, write: if true; }
  }
}
```

Tighten these before going to production (e.g. only allow admins to write
products, only let users read their own orders).

## Firebase Authentication

Email/Password sign-in is already enabled and wired in
`src/context/StoreContext.jsx`:
- **Register** → `createUserWithEmailAndPassword`
- **Sign in** → `signInWithEmailAndPassword`
- **Sign out** → `signOut`
- Auth state is tracked live via `onAuthStateChanged`.

Make sure Email/Password is enabled in Firebase Console → Authentication →
Sign-in method (you mentioned you've already done this).

## What's connected to Firebase now

| Data | Before | Now |
|---|---|---|
| Products | mock array | Firestore `products` collection, live via `onSnapshot` |
| Orders | mock array | Firestore `orders` collection, live via `onSnapshot`; checkout writes a real order |
| Customers | mock array | Firestore `customers` collection, live via `onSnapshot` |
| Admin Add/Edit/Delete product | local state mutation | `setDoc` / `updateDoc` / `deleteDoc` |
| Stock adjust / schedule status | local state mutation | `updateDoc` |
| Order status update | local state mutation | `updateDoc` |
| Login / Register / Logout | fake local user object | real Firebase Auth |

Cart and Wishlist remain client-side (per browser session) — that's normal
for a shopping cart; you can optionally persist them per-user in Firestore
later (e.g. a `carts/{uid}` doc) if you want cross-device carts.

## Project structure

```
src/
  firebase.js                <- Firebase app/config (Firestore + Auth)
  data/mockData.js           <- only used by scripts/seed.js now
  context/StoreContext.jsx   <- Firestore listeners + Firebase Auth + all app actions
  components/
    shared/                  <- ProductCard, CartDrawer, Toast, SearchModal, AuthModal, TopBar
    customer/                 <- CustomerHeader, MobileBottomBar
    admin/                    <- AdminHeader, ProductModal
  pages/
    customer/                 <- Home, Shop, Categories, ProductDetail, Wishlist,
                                  Checkout, Confirmation, Profile, OrderHistory, AuthPage
    admin/                     <- Dashboard, Products, Inventory, Orders, Customers, Sales
  App.jsx                     <- routes (react-router-dom)
scripts/
  seed.js                     <- one-time Firestore seeding script
```
