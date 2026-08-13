import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import ProductModal from "../../components/admin/ProductModal";
import SafeImage from "../../components/shared/SafeImage";

const STATUS_OPTIONS = [
  { value: "Active", label: "Active Couture" },
  { value: "Coming Soon", label: "Coming Soon" },
  { value: "Finished", label: "Finished / Out" },
  { value: "Pre-Order", label: "Pre-Order" },
];

export default function Inventory() {
  const { products, adjustStock, updateProductSchedule, deleteProduct } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const openAdd = () => {
    setEditProduct(null);
    setModalOpen(true);
  };
  const openEdit = (p) => {
    setEditProduct(p);
    setModalOpen(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
            Stock &amp; Schedule Control
          </span>
          <h1 className="font-luxury text-3xl font-bold text-stone-900 mt-1">
            Manage Inventory &amp; Schedules
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={openAdd}
            className="bg-brand-accent text-brand-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition shadow"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Full Product
          </button>
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="space-y-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200 gap-4"
            >
              <div className="flex items-center space-x-3">
                <SafeImage src={p.img} className="w-12 h-12 rounded-xl object-cover bg-stone-200" alt={p.name} />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{p.name}</h4>
                  <span className="text-[10px] text-stone-500">
                    Cat: {p.category} &bull; Price: ${p.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase text-stone-500">Status:</span>
                  <select
                    value={p.scheduleStatus}
                    onChange={(e) => updateProductSchedule(p.id, e.target.value)}
                    className="text-xs bg-white border border-stone-300 rounded-lg px-2.5 py-1 font-bold text-stone-800 focus:outline-none focus:border-brand-accent"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      p.stock < 10 ? "text-red-600 bg-red-50" : "text-emerald-600 bg-emerald-50"
                    }`}
                  >
                    {p.stock} Qty
                  </span>
                  <button
                    onClick={() => adjustStock(p.id, 5)}
                    className="bg-stone-200 text-stone-800 w-7 h-7 rounded-lg text-xs font-bold hover:bg-stone-300 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => adjustStock(p.id, -5)}
                    className="bg-stone-200 text-stone-800 w-7 h-7 rounded-lg text-xs font-bold hover:bg-stone-300 transition"
                  >
                    -
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} editProduct={editProduct} />
    </section>
  );
}
