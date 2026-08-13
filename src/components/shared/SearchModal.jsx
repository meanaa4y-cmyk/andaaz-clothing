import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import SafeImage from "./SafeImage";
import ModalPortal from "./ModalPortal";

export default function SearchModal({ open, onClose }) {
  const { products } = useStore();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  if (!open) return null;

  const matched = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const goToProduct = (id) => {
    onClose();
    setQuery("");
    navigate(`/shop/product/${id}`);
  };

  return (
    <ModalPortal>
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 p-4" onClick={onClose}>
      <div
        className="bg-brand-card w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3 border-b border-brand-border pb-4">
          <i className="fa-solid fa-magnifying-glass text-stone-400"></i>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for luxury wear..."
            className="w-full text-sm focus:outline-none bg-transparent"
          />
          <button onClick={onClose} className="text-stone-400 hover:text-black">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
          {!query.trim() ? (
            <p className="text-xs text-stone-400 text-center py-4">
              Start typing to search ANDAAZ catalog...
            </p>
          ) : (
            matched.map((p) => (
              <div
                key={p.id}
                onClick={() => goToProduct(p.id)}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-brand-background cursor-pointer transition"
              >
                <SafeImage src={p.img} className="w-12 h-12 rounded-lg object-cover" alt={p.name} />
                <div>
                  <h4 className="font-luxury font-bold text-xs text-brand-primary">{p.name}</h4>
                  <p className="text-[11px] text-brand-accent font-semibold">${p.price.toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </ModalPortal>
  );
}
