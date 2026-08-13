import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

// Admin sign in / register screen. Uses the same Firebase Auth backend
// as the customer side (handleAuthSubmit), then flags this session as
// an admin session so AdminProtectedRoute lets it through.
export default function AdminAuth() {
  const { handleAuthSubmit, setRole } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await handleAuthSubmit({ mode, name, email, password });
    setSubmitting(false);
    if (result.ok) {
      localStorage.setItem("andaaz_admin_auth", "true");
      setRole("admin");
      navigate("/admin");
    } else {
      setError(result.error?.replace("Firebase: ", "") || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-primary flex items-center justify-center text-brand-accent font-luxury text-xl font-bold shadow-md">
            A
          </div>
          <h3 className="font-luxury text-2xl font-bold text-brand-primary">
            {mode === "login" ? "Admin Sign In" : "Create Admin Account"}
          </h3>
          <p className="text-xs text-stone-500 mt-1">ANDAAZ Store Management Console</p>
        </div>
        <div className="flex bg-stone-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold ${
              mode === "login" ? "bg-white shadow-sm" : "text-stone-500"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold ${
              mode === "register" ? "bg-white shadow-sm" : "text-stone-500"
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
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
                placeholder="Store Admin"
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
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
              placeholder="admin@andaaz.com"
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
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-[11px] text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-brand-primary transition shadow-md disabled:opacity-60"
          >
            {submitting ? "Please wait..." : mode === "login" ? "Sign In" : "Register Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
