import { useStore } from "../../context/StoreContext";
import ProductCard from "../../components/shared/ProductCard";

export default function Wishlist() {
  const { wishlist } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
          Saved Favorites
        </span>
        <h1 className="font-luxury text-3xl md:text-4xl font-bold text-brand-primary mt-1">
          Your Wishlist
        </h1>
      </div>
      {wishlist.length === 0 ? (
        <div className="col-span-full py-12 text-center text-stone-400 text-xs">
          Your wishlist is currently empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
