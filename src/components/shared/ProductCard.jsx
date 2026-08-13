import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import SafeImage from "./SafeImage";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, quickAddToCart } = useStore();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bg-brand-card rounded-3xl border border-brand-border overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between transform hover:-translate-y-2">
      <div
        className="relative overflow-hidden bg-brand-background aspect-[4/5] cursor-pointer"
        onClick={() => navigate(`/shop/product/${product.id}`)}
      >
        <SafeImage
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
        <span className="absolute top-3 left-3 bg-brand-card/95 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-brand-primary shadow-sm">
          {product.category}
        </span>
        {product.isSale && (
          <span className="absolute top-3 right-3 bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm animate-pulse">
            Sale
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3
            onClick={() => navigate(`/shop/product/${product.id}`)}
            className="font-luxury font-bold text-lg text-brand-primary hover:text-brand-accent transition cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">{product.desc}</p>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-border">
          <div className="flex items-center space-x-2">
            <span className="font-luxury font-bold text-lg text-brand-accent">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-9 h-9 rounded-xl border border-brand-border flex items-center justify-center hover:bg-brand-background transition ${
                isWishlisted ? "text-brand-secondary border-brand-secondary bg-red-50" : "text-stone-600"
              }`}
            >
              <i className={`${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart text-xs`}></i>
            </button>
            <button
              onClick={() => quickAddToCart(product.id)}
              className="bg-brand-primary text-white w-9 h-9 rounded-xl flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition shadow"
            >
              <i className="fa-solid fa-plus text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
