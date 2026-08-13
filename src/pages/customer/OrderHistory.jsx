import { useStore } from "../../context/StoreContext";

export default function OrderHistory() {
  const { orders } = useStore();

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
          Purchases
        </span>
        <h1 className="font-luxury text-3xl font-bold text-brand-primary mt-1">
          Order History &amp; Tracking
        </h1>
      </div>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-brand-card p-8 rounded-3xl border border-brand-border text-center text-stone-400 text-xs">
            No past orders found.
          </div>
        ) : (
          orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-brand-card p-6 rounded-3xl border border-brand-border shadow-sm"
            >
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <div>
                  <span className="font-mono text-xs font-bold text-brand-accent">{ord.id}</span>
                  <span className="text-xs text-stone-500 ml-2">&bull; {ord.date}</span>
                </div>
                <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {ord.status}
                </span>
              </div>
              <div className="py-4 space-y-2">
                {ord.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-stone-700">
                    <span>
                      {i.qty}x {i.name} ({i.size})
                    </span>
                    <span className="font-semibold">${(i.price * i.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-brand-border flex justify-between items-center text-xs font-bold">
                <span>Total Amount</span>
                <span className="font-luxury text-base text-brand-accent">
                  ${ord.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
