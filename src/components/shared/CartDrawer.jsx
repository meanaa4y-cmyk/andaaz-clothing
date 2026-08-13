import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import SafeImage from "./SafeImage";
import ModalPortal from "./ModalPortal";

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, cartTotal, showToast } = useStore();
  const navigate = useNavigate();

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      showToast("Your bag is empty.");
      return;
    }
    onClose();
    navigate("/checkout");
  };

  return (
    <ModalPortal>
    <div
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm ${open ? "" : "hidden"}`}
      onClick={onClose}
    >
      <div
        className={`absolute top-0 right-0 w-full max-w-md h-full bg-brand-card shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-brand-border">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-bag-shopping text-brand-accent animate-bounce"></i>
              <span className="font-luxury text-xl font-bold">Your Shopping Bag</span>
            </div>
            <button onClick={onClose} className="text-xl text-stone-500 hover:text-black">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto divide-y divide-brand-border">
            {cart.length === 0 ? (
              <div className="py-12 text-center text-stone-400 text-xs">
                Your shopping bag is currently empty.
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center justify-between py-3 space-x-4">
                  <div className="flex items-center space-x-3">
                    <SafeImage
                      src={item.img}
                      className="w-14 h-14 rounded-xl object-cover bg-brand-background shadow-sm"
                      alt={item.name}
                    />
                    <div>
                      <h4 className="font-luxury font-bold text-xs text-brand-primary line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-stone-500">
                        Size: <span className="font-semibold">{item.size}</span>
                      </p>
                      <p className="font-luxury font-bold text-xs text-brand-accent">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQty(index, -1)}
                      className="w-6 h-6 bg-brand-background rounded-md text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(index, 1)}
                      className="w-6 h-6 bg-brand-background rounded-md text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="pt-6 border-t border-brand-border">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-stone-600 uppercase tracking-wider">
              Subtotal:
            </span>
            <span className="font-luxury font-bold text-xl text-brand-primary">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          <button
            onClick={proceedToCheckout}
            className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-brand-primary transition shadow-md"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
    </ModalPortal>
  );
}
