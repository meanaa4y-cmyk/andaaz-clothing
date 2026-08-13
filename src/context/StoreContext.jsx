import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { dashboardBaseStats } from "../data/mockData";

// ============================================================================
// StoreContext -- single source of truth for the whole app.
// Backed by real Firebase: Firestore for products/orders/customers,
// Firebase Auth for sign in / register / sign out.
//
// Firestore collections used: "products", "orders", "customers"
// Run `node scripts/seed.js` once to populate an empty database.
// ============================================================================

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [role, setRole] = useState("customer");
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  // ---------- Live Firestore listeners ----------
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      setProducts(
        snap.docs.map((d) => {
          const data = d.data();
          return { id: /^\d+$/.test(d.id) ? Number(d.id) : d.id, ...data };
        })
      );
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => (a.date < b.date ? 1 : -1));
      setOrders(list);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "customers"), (snap) => {
      setCustomers(
        snap.docs.map((d) => {
          const data = d.data();
          return { id: /^\d+$/.test(d.id) ? Number(d.id) : d.id, ...data };
        })
      );
    });
    return () => unsub();
  }, []);

  // ---------- Auth state ----------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ name: user.displayName || user.email.split("@")[0], email: user.email });
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // ---------- Wishlist (local, per-session) ----------
  const toggleWishlist = useCallback(
    (id) => {
      const p = products.find((item) => item.id === id);
      setWishlist((wl) => {
        const exists = wl.some((item) => item.id === id);
        if (exists) {
          showToast(`Removed ${p?.name ?? "item"} from wishlist`);
          return wl.filter((item) => item.id !== id);
        } else {
          showToast(`Added ${p?.name ?? "item"} to wishlist`);
          return [...wl, p];
        }
      });
    },
    [products, showToast]
  );

  // ---------- Cart (local, per-session) ----------
  const addToCart = useCallback(
    (product, size) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id && item.size === size);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id && item.size === size ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prev, { ...product, size, qty: 1 }];
      });
      showToast(`Added ${product.name} (${size}) to bag`);
    },
    [showToast]
  );

  const quickAddToCart = useCallback(
    (id) => {
      const p = products.find((item) => item.id === id);
      if (p) addToCart(p, "M");
    },
    [products, addToCart]
  );

  const updateQty = useCallback((index, delta) => {
    setCart((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], qty: next[index].qty + delta };
      if (next[index].qty <= 0) next.splice(index, 1);
      return next;
    });
  }, []);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  // ---------- Checkout -> writes a real order doc to Firestore ----------
  const processCheckout = useCallback(
    async ({ fname, lname, email }) => {
      const newOrderId = `AND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder = {
        customer: `${fname} ${lname}`,
        email,
        date: "Today, August 2026",
        total: cartTotal,
        status: "Processing",
        items: [...cart],
      };
      await setDoc(doc(db, "orders", newOrderId), newOrder);
      setCart([]);
      showToast("Order placed successfully!");
      return newOrderId;
    },
    [cart, cartTotal, showToast]
  );

  // ---------- Auth: Firebase Email/Password ----------
  const handleAuthSubmit = useCallback(
    async ({ mode, name, email, password }) => {
      try {
        if (mode === "register") {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          if (name) await updateProfile(cred.user, { displayName: name });
          showToast(`Welcome, ${name || email.split("@")[0]}!`);
        } else {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          showToast(`Welcome back, ${cred.user.displayName || email.split("@")[0]}!`);
        }
        return { ok: true };
      } catch (err) {
        showToast(err.message.replace("Firebase: ", ""));
        return { ok: false, error: err.message };
      }
    },
    [showToast]
  );

  const handleLogout = useCallback(async () => {
    await signOut(auth);
    showToast("Successfully signed out.");
  }, [showToast]);

  // ---------- Admin: Products (Firestore CRUD) ----------
  const addOrUpdateProduct = useCallback(
    async (data, editId) => {
      if (editId) {
        await updateDoc(doc(db, "products", String(editId)), data);
        showToast("Product updated successfully!");
      } else {
        const newProd = {
          originalPrice: null,
          isSale: false,
          scheduleStatus: "Active",
          ...data,
        };
        const newId = String(Date.now());
        await setDoc(doc(db, "products", newId), newProd);
        showToast("New full product added successfully!");
      }
    },
    [showToast]
  );

  const deleteProduct = useCallback(
    async (id) => {
      const p = products.find((item) => item.id === id);
      await deleteDoc(doc(db, "products", String(id)));
      showToast(`${p?.name ?? "Product"} deleted.`);
    },
    [products, showToast]
  );

  const adjustStock = useCallback(
    async (id, amount) => {
      const p = products.find((item) => item.id === id);
      if (!p) return;
      await updateDoc(doc(db, "products", String(id)), { stock: p.stock + amount });
      showToast(`Stock updated for ${p.name}`);
    },
    [products, showToast]
  );

  const updateProductSchedule = useCallback(
    async (id, status) => {
      const p = products.find((item) => item.id === id);
      await updateDoc(doc(db, "products", String(id)), { scheduleStatus: status });
      if (p) showToast(`Schedule status for ${p.name} updated to ${status}`);
    },
    [products, showToast]
  );

  // ---------- Admin: Orders ----------
  const updateOrderStatus = useCallback(
    async (id, status) => {
      await updateDoc(doc(db, "orders", id), { status });
      showToast(`Order ${id} status updated to ${status}`);
    },
    [showToast]
  );

  // ---------- Admin: Dashboard stats ----------
  const dashboardStats = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + o.total, 0) + dashboardBaseStats.baseRevenue;
    return {
      totalRevenue: revenue,
      totalOrders: orders.length,
      activeProducts: products.length,
      registeredCustomers: customers.length + dashboardBaseStats.baseCustomers,
    };
  }, [orders, products, customers]);

  const value = {
    products,
    orders,
    customers,
    cart,
    wishlist,
    currentUser,
    authLoading,
    role,
    setRole,
    toast,
    showToast,
    toggleWishlist,
    addToCart,
    quickAddToCart,
    updateQty,
    cartTotal,
    cartCount,
    processCheckout,
    handleAuthSubmit,
    handleLogout,
    addOrUpdateProduct,
    deleteProduct,
    adjustStock,
    updateProductSchedule,
    updateOrderStatus,
    dashboardStats,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
