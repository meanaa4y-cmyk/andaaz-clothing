import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";

import CustomerLayout from "./pages/customer/CustomerLayout";
import Home from "./pages/customer/Home";
import Shop from "./pages/customer/Shop";
import Categories from "./pages/customer/Categories";
import ProductDetail from "./pages/customer/ProductDetail";
import Wishlist from "./pages/customer/Wishlist";
import Checkout from "./pages/customer/Checkout";
import Confirmation from "./pages/customer/Confirmation";
import Profile from "./pages/customer/Profile";
import OrderHistory from "./pages/customer/OrderHistory";
import AuthPage from "./pages/customer/AuthPage";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminAuth from "./pages/admin/AdminAuth";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Inventory from "./pages/admin/Inventory";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Sales from "./pages/admin/Sales";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/product/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation/:orderId" element={<Confirmation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/auth" element={<AuthPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminAuth />} />

          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="sales" element={<Sales />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
