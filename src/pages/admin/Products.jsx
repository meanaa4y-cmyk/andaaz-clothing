import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import ProductModal from "../../components/admin/ProductModal";
import SafeImage from "../../components/shared/SafeImage";

const CATEGORY_OPTIONS = ["All", "Men", "Women", "Unisex"];

export default function Products() {
  const { products, deleteProduct } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (searchParams.get("add") === "1") {
      setEditProduct(null);
      setModalOpen(true);
      searchParams.delete("add");
      setSearchParams(searchParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAdd = () => {
    setEditProduct(null);
    setModalOpen(true);
  };
  const openEdit = (p) => {
    setEditProduct(p);
    setModalOpen(true);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
            Catalog Management
          </span>
          <h1 className="font-luxury text-3xl font-bold text-stone-900 mt-1">All Products</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={openAdd}
            className="bg-brand-accent text-brand-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition shadow"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-brand-accent"
            />
          </div>
          <div className="flex items-center space-x-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition ${
                  category === c
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400 text-sm">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200 gap-4"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <SafeImage
                    src={p.img}
                    className="w-14 h-14 rounded-xl object-cover bg-stone-200 shrink-0"
                    alt={p.name}
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-stone-900 truncate">{p.name}</h4>
                    <span className="text-[10px] text-stone-500">
                      {p.category} &bull; ${Number(p.price || 0).toFixed(2)}
                    </span>
                    <div className="mt-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                          p.stock < 10 ? "text-red-600 bg-red-50" : "text-emerald-600 bg-emerald-50"
                        }`}
                      >
                        {p.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
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
            ))}
          </div>
        )}
      </div>

      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} editProduct={editProduct} />
    </section>
  );
}
