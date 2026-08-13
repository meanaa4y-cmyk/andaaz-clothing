import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/shared/TopBar";
import CustomerHeader from "../../components/customer/CustomerHeader";
import MobileBottomBar from "../../components/customer/MobileBottomBar";
import CartDrawer from "../../components/shared/CartDrawer";
import SearchModal from "../../components/shared/SearchModal";
import Toast from "../../components/shared/Toast";

export default function CustomerLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="pb-28 md:pb-0">
      <TopBar />
      <CustomerHeader
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenMobileMenu={() => {}}
      />
      <main>
        <Outlet />
      </main>
      <MobileBottomBar onOpenCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toast />
    </div>
  );
}
