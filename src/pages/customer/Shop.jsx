import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../../components/shared/ProductCard";

const CATEGORIES = [
  { key: "all", label: "All Items" },
  { key: "Men", label: "Men's Edit" },
  { key: "Women", label: "Women's Couture" },
  { key: "Unisex", label: "Accessories" },
];

export default function Shop() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState(searchParams.get("cat") || "all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) setActiveCat(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = activeCat === "all" ? products : products.filter((p) => p.category === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, activeCat, query]);

  const selectCategory = (key) => {
    setActiveCat(key);
    setSearchParams(key === "all" ? {} : { cat: key });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">Full Catalog</span>
        <h1 className="font-luxury text-3xl md:text-4xl font-bold text-brand-primary mt-1">
          The ANDAAZ Boutique
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-brand-card p-4 rounded-2xl border border-brand-border mb-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => selectCategory(c.key)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${
                activeCat === c.key
                  ? "bg-brand-primary text-white shadow-md"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search garments..."
            className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent pl-10"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-stone-400 text-xs"></i>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="col-span-full py-12 text-center text-stone-400 text-xs">
          No luxury items found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
