import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function CustomerHeader({ onOpenSearch, onOpenCart, onOpenMobileMenu }) {
  const { wishlist, cartCount, currentUser, setRole } = useStore();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (currentUser) navigate("/profile");
    else navigate("/auth");
  };

  const navLinkClass = ({ isActive }) =>
    `cust-nav-link pb-1 font-medium transition border-b-2 ${
      isActive
        ? "text-brand-primary border-brand-accent font-semibold"
        : "text-stone-600 hover:text-brand-accent border-transparent"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-brand-background/95 backdrop-blur-md border-b border-brand-border transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button onClick={onOpenMobileMenu} className="md:hidden text-2xl text-brand-primary focus:outline-none">
          <i className="fa-solid fa-bars"></i>
        </button>

        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-11 h-11 rounded-full bg-brand-primary flex items-center justify-center text-brand-accent font-luxury text-2xl font-bold border-2 border-brand-accent shadow-md group-hover:rotate-12 group-hover:scale-110 transition duration-300">
            A
          </div>
          <div>
            <span className="font-luxury text-2xl md:text-3xl font-bold tracking-widest text-brand-primary block leading-none">
              ANDAAZ
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-accent block mt-1 font-semibold">
              Style &bull; Culture &bull; You
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 font-medium text-sm tracking-wide">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/shop" className={navLinkClass}>Products</NavLink>
          <NavLink to="/categories" className={navLinkClass}>Categories</NavLink>
          <NavLink to="/orders" className={navLinkClass}>Order History</NavLink>
        </nav>

        <div className="flex items-center space-x-5 text-lg">
          <button onClick={onOpenSearch} className="text-stone-700 hover:text-brand-accent transition" title="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <button
            onClick={() => navigate("/wishlist")}
            className="relative text-stone-700 hover:text-brand-accent transition hidden md:block"
            title="Wishlist"
          >
            <i className="fa-regular fa-heart"></i>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-accent text-brand-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>
          <button onClick={onOpenCart} className="relative text-stone-700 hover:text-brand-accent transition" title="Bag">
            <i className="fa-solid fa-bag-shopping"></i>
            <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>
          <button
            onClick={handleAccountClick}
            className="hidden md:flex items-center space-x-1.5 text-xs font-semibold bg-brand-primary text-white px-4 py-2.5 rounded-full hover:bg-brand-accent hover:text-brand-primary transition shadow-md"
          >
            <i className="fa-regular fa-user mr-1"></i>
            <span>{currentUser ? currentUser.name.split(" ")[0] : "Account"}</span>
          </button>
          <button
            onClick={() => { setRole("admin"); navigate("/admin"); }}
            className="hidden lg:block text-[10px] uppercase tracking-wider text-stone-400 hover:text-brand-accent border border-stone-300 rounded-full px-3 py-1.5"
            title="Admin Portal"
          >
            Admin
          </button>
        </div>
      </div>
    </header>
  );
}
