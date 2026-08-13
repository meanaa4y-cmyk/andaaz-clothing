import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function MobileBottomBar({ onOpenCart }) {
  const { cartCount, currentUser } = useStore();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center space-y-1 ${isActive ? "text-brand-primary" : "hover:text-brand-accent"}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-card/95 backdrop-blur-md border-t border-brand-border px-6 py-3 flex items-center justify-around text-stone-600 shadow-lg">
      <NavLink to="/" end className={linkClass}>
        <i className="fa-solid fa-house text-lg"></i>
        <span className="text-[10px] font-medium">Home</span>
      </NavLink>
      <NavLink to="/shop" className={linkClass}>
        <i className="fa-solid fa-shirt text-lg"></i>
        <span className="text-[10px] font-medium">Products</span>
      </NavLink>
      <NavLink to="/categories" className={linkClass}>
        <i className="fa-solid fa-layer-group text-lg"></i>
        <span className="text-[10px] font-medium">Categories</span>
      </NavLink>
      <button onClick={onOpenCart} className="flex flex-col items-center space-y-1 relative hover:text-brand-accent">
        <i className="fa-solid fa-bag-shopping text-lg"></i>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-brand-primary text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-medium">Bag</span>
      </button>
      <button
        onClick={() => navigate(currentUser ? "/profile" : "/auth")}
        className="flex flex-col items-center space-y-1 hover:text-brand-accent"
      >
        <i className="fa-regular fa-user text-lg"></i>
        <span className="text-[10px] font-medium">Account</span>
      </button>
    </div>
  );
}
