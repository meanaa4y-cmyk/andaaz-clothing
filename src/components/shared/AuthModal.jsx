import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import ModalPortal from "./ModalPortal";

// TODO (Firebase): wire handleSubmit to
//   signInWithEmailAndPassword(auth, email, password) for login
//   createUserWithEmailAndPassword(auth, email, password) for register
export default function AuthModal({ open, onClose }) {
  const { handleAuthSubmit } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await handleAuthSubmit({ mode, name, email, password });
    setSubmitting(false);
    if (result.ok) {
      onClose();
      navigate("/profile");
    }
  };

  return (
    <ModalPortal>
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-card w-full max-w-md rounded-3xl p-8 shadow-2xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-black text-lg"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-primary flex items-center justify-center text-brand-accent font-luxury text-xl font-bold shadow-md">
            A
          </div>
          <h3 className="font-luxury text-2xl font-bold text-brand-primary">
            {mode === "login" ? "Welcome to ANDAAZ" : "Create Account"}
          </h3>
          <p className="text-xs text-stone-500 mt-1">Sign in to your account or register</p>
        </div>
        <div className="flex bg-brand-background p-1 rounded-xl mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold ${
              mode === "login" ? "bg-brand-card shadow-sm" : "text-stone-500"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold ${
              mode === "register" ? "bg-brand-card shadow-sm" : "text-stone-500"
            }`}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
                placeholder="Alex Morgan"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
              placeholder="alex@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-background border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-brand-primary transition shadow-md disabled:opacity-60"
          >
            {submitting ? "Please wait..." : mode === "login" ? "Sign In" : "Register Account"}
          </button>
        </form>
      </div>
    </div>
    </ModalPortal>
  );
}
