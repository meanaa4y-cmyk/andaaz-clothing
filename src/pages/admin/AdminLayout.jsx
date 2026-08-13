import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import Toast from "../../components/shared/Toast";

export default function AdminLayout() {
  return (
    <div>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
      <Toast />
    </div>
  );
}
