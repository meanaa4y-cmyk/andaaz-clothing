import { useNavigate, useParams } from "react-router-dom";

export default function Confirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <section className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="bg-brand-card p-10 rounded-3xl border border-brand-border shadow-lg">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent text-3xl animate-bounce">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Success</span>
        <h1 className="font-luxury text-3xl font-bold text-brand-primary mt-2 mb-4">Order Confirmed!</h1>
        <p className="text-xs text-stone-500 mb-6 font-mono">Order #{orderId}</p>
        <p className="text-stone-600 text-xs leading-relaxed mb-8">
          Thank you for shopping with ANDAAZ. Your luxury attire is being prepared for priority shipment.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/orders")}
            className="w-full sm:w-auto bg-brand-primary text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-brand-primary transition shadow-md"
          >
            View Order History
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto border border-brand-border text-stone-700 px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-background transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
}
