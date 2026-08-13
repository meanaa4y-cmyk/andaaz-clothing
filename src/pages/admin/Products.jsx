import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import ProductModal from "../../components/admin/ProductModal";
import SafeImage from "../../components/shared/SafeImage";

export default function Products() {
  const { products, deleteProduct } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    if (searchParams.get("add")) {
      setEditProduct(null);
      setModalOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
            Catalog Control &bull; Add, Edit, Delete
          </span>
          <h1 className="font-luxury text-3xl font-bold text-stone-900 mt-1">Manage Products</h1>
        </div>
        <button
          onClick={openAdd}
          className="bg-brand-accent text-brand-primary px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition shadow"
        >
          <i className="fa-solid fa-plus mr-2"></i> Add New Product
        </button>
      </div>
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 uppercase">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-right">Actions (Edit / Delete)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50">
                  <td className="p-3 flex items-center space-x-3">
                    <SafeImage src={p.img} className="w-10 h-10 rounded-lg object-cover" alt={p.name} />
                    <span className="font-bold text-stone-900">{p.name}</span>
                  </td>
                  <td className="p-3">
                    <span className="bg-stone-100 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">${Number(p.price || 0).toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`font-bold ${p.stock < 10 ? "text-red-600" : "text-emerald-600"}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <button
                      onClick={() => openEdit(p)}
                      className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} editProduct={editProduct} />
    </section>
  );
}
