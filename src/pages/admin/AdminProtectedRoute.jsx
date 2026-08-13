import { Navigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

// Guards every /admin/* route. Requires a signed-in Firebase user AND
// the local "signed in through the admin screen" flag, so a customer
// who is merely logged into their shopping account can't reach /admin
// just by typing the URL.
export default function AdminProtectedRoute({ children }) {
  const { currentUser, authLoading } = useStore();
  const isAdminSession = localStorage.getItem("andaaz_admin_auth") === "true";

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-400 text-xs uppercase tracking-widest">
        Loading...
      </div>
    );
  }

  if (!currentUser || !isAdminSession) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
