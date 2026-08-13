import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function Dashboard() {
  const { orders, dashboardStats } = useStore();
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
            Admin Console &bull; Full Control
          </span>
          <h1 className="font-luxury text-3xl font-bold text-stone-900 mt-1">Store Dashboard</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/admin/products?add=1")}
            className="bg-brand-accent text-brand-primary px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition shadow"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Product
          </button>
          <button
            onClick={() => navigate("/admin/inventory")}
            className="bg-stone-800 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-700 transition"
          >
            Manage Inventory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <span className="text-xs font-bold uppercase text-stone-400">Total Revenue</span>
          <div className="font-luxury text-3xl font-bold text-stone-900 mt-2">
            ${Number(dashboardStats.totalRevenue || 0).toFixed(2)}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
            <i className="fa-solid fa-arrow-up"></i> +14.2% this month
          </span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <span className="text-xs font-bold uppercase text-stone-400">Total Orders</span>
          <div className="font-luxury text-3xl font-bold text-stone-900 mt-2">
            {dashboardStats.totalOrders}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
            <i className="fa-solid fa-arrow-up"></i> +6 new today
          </span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <span className="text-xs font-bold uppercase text-stone-400">Active Products</span>
          <div className="font-luxury text-3xl font-bold text-stone-900 mt-2">
            {dashboardStats.activeProducts}
          </div>
          <span className="text-xs text-stone-500 font-semibold mt-1 inline-block">
            Catalog active
          </span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <span className="text-xs font-bold uppercase text-stone-400">Registered Customers</span>
          <div className="font-luxury text-3xl font-bold text-stone-900 mt-2">
            {dashboardStats.registeredCustomers.toLocaleString()}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
            <i className="fa-solid fa-arrow-up"></i> +84 this week
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-luxury text-xl font-bold text-stone-900">
            Recent Store Orders &amp; Fulfillment
          </h3>
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-xs font-bold text-brand-secondary hover:underline"
          >
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 uppercase">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="hover:bg-stone-50">
                  <td className="p-3 font-mono font-bold">{o.id}</td>
                  <td className="p-3">{o.customer}</td>
                  <td className="p-3 text-stone-500">{o.date}</td>
                  <td className="p-3 font-bold">${Number(o.total || 0).toFixed(2)}</td>
                  <td className="p-3">
                    <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
