import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import SafeImage from "../../components/shared/SafeImage";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist } = useStore();
  const navigate = useNavigate();
  const [size, setSize] = useState("M");

  const p = products.find((item) => String(item.id) === String(id));

  if (!p) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16 text-center text-stone-400 text-xs">
        Product not found.
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <button
        onClick={() => navigate("/shop")}
        className="text-xs font-semibold text-stone-600 hover:text-black flex items-center space-x-1 mb-6"
      >
        <i className="fa-solid fa-arrow-left"></i> <span>Back to Catalog</span>
      </button>
      <div className="bg-brand-card rounded-3xl border border-brand-border overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="bg-brand-background rounded-2xl overflow-hidden aspect-[4/5] relative shadow-inner">
          <SafeImage src={p.img} alt={p.name} className="w-full h-full object-cover" />
          <span className="absolute top-4 left-4 bg-brand-card/95 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full text-brand-primary shadow-sm">
            {p.category}
          </span>
        </div>
        <div className="flex flex-col justify-between py-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">
              ANDAAZ Masterpiece
            </span>
            <h1 className="font-luxury text-3xl md:text-4xl font-bold text-brand-primary mt-1 mb-3">
              {p.name}
            </h1>
            <div className="flex items-center space-x-3 mb-4">
              <span className="font-luxury text-2xl font-bold text-brand-accent">
                ${p.price.toFixed(2)}
              </span>
              {p.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ${p.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-6">{p.desc}</p>
            <p className="text-xs font-semibold text-stone-500 mb-6">
              Stock Available: <span className="text-stone-900">{p.stock} units</span>
            </p>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Select Size
              </label>
              <div className="flex space-x-2">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSize(sz)}
                    className={`px-4 py-2 rounded-xl border border-brand-border text-xs font-bold ${
                      sz === size
                        ? "bg-brand-primary text-white border-brand-primary shadow-md"
                        : "bg-brand-background text-stone-800"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-brand-border">
            <button
              onClick={() => addToCart(p, size)}
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-brand-primary transition shadow-md"
            >
              Add to Shopping Bag
            </button>
            <button
              onClick={() => toggleWishlist(p.id)}
              className="w-full border border-brand-border py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-background transition flex items-center justify-center space-x-2"
            >
              <i className="fa-regular fa-heart"></i> <span>Save to Wishlist</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
