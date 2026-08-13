import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function Profile() {
  const { currentUser, handleLogout } = useStore();
  const navigate = useNavigate();

  const name = currentUser?.name || "Guest Visitor";
  const email = currentUser?.email || "Please sign in to view your details";
  const initial = name.charAt(0).toUpperCase();

  const onLogout = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
          Account Dashboard
        </span>
        <h1 className="font-luxury text-3xl font-bold text-brand-primary mt-1">User Profile</h1>
      </div>
      <div className="bg-brand-card p-8 rounded-3xl border border-brand-border shadow-sm">
        <div className="flex items-center space-x-6 pb-6 border-b border-brand-border mb-6">
          <div className="w-20 h-20 rounded-full bg-brand-primary text-brand-accent flex items-center justify-center font-luxury text-3xl font-bold border-2 border-brand-accent">
            {initial}
          </div>
          <div>
            <h3 className="font-luxury font-bold text-2xl text-brand-primary">{name}</h3>
            <p className="text-xs text-stone-500 mt-0.5">{email}</p>
            <span className="inline-block mt-2 bg-brand-accent/20 text-brand-accent text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              VIP Member
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-brand-background rounded-2xl border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-stone-500">
              Default Shipping Address
            </span>
            <p className="text-xs font-medium text-stone-800 mt-1">
              123 Luxury Avenue, Suite 4B, New York, NY 10001
            </p>
          </div>
          <div className="p-4 bg-brand-background rounded-2xl border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-stone-500">
              Preferred Currency
            </span>
            <p className="text-xs font-medium text-stone-800 mt-1">USD ($)</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onLogout}
            className="bg-red-50 text-brand-secondary border border-red-200 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-secondary hover:text-white transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}
