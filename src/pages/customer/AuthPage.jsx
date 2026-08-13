import { useNavigate } from "react-router-dom";
import AuthModal from "../../components/shared/AuthModal";

export default function AuthPage() {
  const navigate = useNavigate();
  return (
    <div>
      <AuthModal open={true} onClose={() => navigate("/")} />
    </div>
  );
}
