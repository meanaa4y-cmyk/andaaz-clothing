import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../../components/shared/ProductCard";

export default function Home() {
  const { products } = useStore();
  const navigate = useNavigate();
  const featured = products.slice(0, 4);

  return (
    <section className="animate-fade-in">
      <div className="relative bg-stone-900 text-white min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-55 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/60 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
          <span className="inline-block text-brand-accent text-xs uppercase tracking-[0.3em] font-bold mb-4 border border-brand-accent/40 px-6 py-2.5 rounded-full bg-brand-primary/60 backdrop-blur-md animate-float">
            Spring / Summer Couture 2026
          </span>
          <h1 className="font-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Where Tradition Meets <span className="italic font-normal text-brand-accent">Modern Grace</span>
          </h1>
          <p className="text-stone-300 text-base md:text-xl font-light max-w-2xl mx-auto mb-10 tracking-wide">
            Exquisitely handcrafted luxury attire designed for the discerning individual.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/shop")}
              className="w-full sm:w-auto bg-brand-accent text-brand-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition shadow-xl animate-glow"
            >
              Explore Collection
            </button>
            <button
              onClick={() => navigate("/categories")}
              className="w-full sm:w-auto border border-white/70 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/15 transition backdrop-blur-sm"
            >
              Browse Categories
            </button>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
              Curated Selection
            </span>
            <h2 className="font-luxury text-3xl md:text-4xl font-bold mt-1 text-brand-primary">
              Featured Masterpieces
            </h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="text-sm font-semibold tracking-wider uppercase text-brand-primary hover:text-brand-accent transition flex items-center space-x-2"
          >
            <span>View All</span> <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </section>
  );
}
