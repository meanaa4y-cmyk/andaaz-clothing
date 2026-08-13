import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function Checkout() {
  const { cart, cartTotal, processCheckout } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    city: "",
    postal: "",
  });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = processCheckout(form);
    navigate(`/confirmation/${orderId}`);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
            Secure Checkout
          </span>
          <h1 className="font-luxury text-3xl font-bold text-brand-primary mt-1">
            Complete Your Order
          </h1>
        </div>
        <button
          onClick={() => navigate("/shop")}
          className="text-xs font-semibold text-stone-600 hover:text-black flex items-center space-x-1"
        >
          <i className="fa-solid fa-arrow-left"></i> <span>Back to Shop</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-brand-card p-8 rounded-3xl border border-brand-border shadow-sm">
          <h3 className="font-luxury font-bold text-xl mb-6 text-brand-primary">
            Shipping Information
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase tracking-wider">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={form.fname}
                  onChange={handleChange("fname")}
                  className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
                  placeholder="Alex"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase tracking-wider">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={form.lname}
                  onChange={handleChange("lname")}
                  className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
                  placeholder="Morgan"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
                placeholder="alex@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase tracking-wider">
                Delivery Address
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={handleChange("address")}
                className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
                placeholder="123 Luxury Avenue, Suite 4B"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase tracking-wider">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange("city")}
                  className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase tracking-wider">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={form.postal}
                  onChange={handleChange("postal")}
                  className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
                  placeholder="10001"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-brand-primary transition shadow-md mt-4 disabled:opacity-50"
            >
              Place Order Now (${cartTotal.toFixed(2)})
            </button>
          </form>
        </div>
        <div className="bg-brand-card p-6 rounded-3xl border border-brand-border h-fit shadow-sm">
          <h3 className="font-luxury font-bold text-lg mb-4 text-brand-primary">Order Summary</h3>
          <div className="space-y-4 max-h-60 overflow-y-auto mb-4 divide-y divide-brand-border">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between items-center py-2 text-xs">
                <div>
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-stone-500 block">
                    Qty: {item.qty} | Size: {item.size}
                  </span>
                </div>
                <span className="font-bold text-brand-accent">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-border pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span className="text-brand-accent font-semibold">Complimentary</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-brand-primary pt-2 border-t border-brand-border">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
