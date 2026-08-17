import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function AdminHeader() {
  const { setRole, showToast } = useStore();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `admin-nav pb-1 border-b-2 transition ${
      isActive ? "text-brand-accent border-brand-accent" : "text-stone-400 hover:text-white border-transparent"
    }`;

  const exitToStore = () => {
    setRole("customer");
    navigate("/");
  };

  const logoutAdmin = () => {
    // Only clears the admin session flag - the customer's Firebase
    // account (if any) stays signed in, since admin and customer
    // share the same auth session underneath.
    localStorage.removeItem("andaaz_admin_auth");
    setRole("customer");
    showToast("Logged out of admin console.");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-brand-accent text-brand-primary font-bold flex items-center justify-center font-luxury text-xl">
            A
          </div>
          <div>
            <span className="font-luxury text-xl font-bold tracking-widest block leading-none">
              ANDAAZ ADMIN
            </span>
            <span className="text-[9px] uppercase tracking-widest text-brand-accent">
              Store Management Console
            </span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider">
          <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/admin/products" className={linkClass}>Products</NavLink>
          <NavLink to="/admin/inventory" className={linkClass}>Inventory</NavLink>
          <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
          <NavLink to="/admin/customers" className={linkClass}>Customers</NavLink>
          <NavLink to="/admin/sales" className={linkClass}>Sales Analytics</NavLink>
        </nav>
        <div className="flex items-center space-x-2">
          <button
            onClick={exitToStore}
            className="bg-brand-accent text-brand-primary px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition shadow"
          >
            Exit to Store
          </button>
          <button
            onClick={logoutAdmin}
            className="bg-transparent border border-stone-700 text-stone-300 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 hover:text-white transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
