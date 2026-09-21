import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useLang } from "../../context/LangContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const { t } = useLang();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@drivo.eg");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      nav("/admin");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="card p-6 w-full max-w-sm space-y-4">
        <div className="text-3xl font-black text-center">
          DRIVO<span className="text-ember">.</span>
        </div>
        <div className="text-center text-white/60 text-sm">
          {t("admin.login")}
        </div>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "…" : t("admin.login")}
        </button>
      </form>
    </div>
  );
}
