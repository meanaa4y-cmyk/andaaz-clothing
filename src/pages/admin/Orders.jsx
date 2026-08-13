import { useStore } from "../../context/StoreContext";

const STATUS_OPTIONS = ["Processing", "Shipped", "Delivered", "Cancelled"];

export default function Orders() {
  const { orders, updateOrderStatus } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
          Fulfillment &bull; Customer Orders
        </span>
        <h1 className="font-luxury text-3xl font-bold text-stone-900 mt-1">Manage Orders</h1>
      </div>
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-6 text-center text-stone-400 text-xs">No orders recorded.</div>
          ) : (
            orders.map((o) => (
              <div
                key={o.id}
                className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs text-brand-primary">{o.id}</span>
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      {o.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-stone-900 mt-1">
                    {o.customer} ({o.email})
                  </h4>
                  <span className="text-[10px] text-stone-500">
                    {o.date} &bull; Total: ${Number(o.total || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    className="text-xs bg-white border border-stone-300 rounded-lg px-3 py-1.5 font-bold text-stone-800 focus:outline-none focus:border-brand-accent"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
