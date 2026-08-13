import { useStore } from "../../context/StoreContext";

export default function Customers() {
  const { customers } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
          Audience &bull; Registered Buyers
        </span>
        <h1 className="font-luxury text-3xl font-bold text-stone-900 mt-1">Manage Customers</h1>
      </div>
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="space-y-4">
          {customers.map((c) => (
            <div
              key={c.id}
              className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-xs text-stone-900">{c.name}</h4>
                <span className="text-[10px] text-stone-500">
                  {c.email} &bull; {c.ordersCount} orders placed
                </span>
              </div>
              <div className="text-right">
                <span className="font-luxury font-bold text-sm text-brand-accent">
                  ${Number(c.totalSpent || 0).toFixed(2)}
                </span>
                <span className="block text-[10px] text-stone-400">Total Spent</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
