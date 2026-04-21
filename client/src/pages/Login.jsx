import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showSuccess } from "../utils/toast";
import Loader from "../components/Loader";
import { Eye, EyeOff } from "lucide-react";

const TAB_LOGIN = "login";
const TAB_REGISTER = "register";

const s = {
  page: {
    minHeight: "100svh",
    display: "flex",
    flexDirection: "column",
    background: "#18191C",
    fontFamily: "Inter, sans-serif",
  },
  topZone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: "40px 20px 24px",
  },
  logoMark: {
    width: 72, height: 72,
    borderRadius: 20,
    background: "#F1452A",
    boxShadow: "0 8px 24px rgba(232,93,58,0.30)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  logoLetter: { fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1 },
  logoTitle: { fontSize: 28, fontWeight: 800, color: "#FEFCFC", letterSpacing: "-0.5px", margin: 0, textAlign: "center" },
  logoSub: { fontSize: 15, color: "rgba(254,252,252,0.40)", margin: 0, textAlign: "center" },
  bottomCard: {
    background: "#2A2D33",
    borderRadius: "28px 28px 0 0",
    padding: "24px 20px 40px",
  },
  tabStrip: {
    display: "flex",
    background: "#1E2023",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: (active) => ({
    flex: 1, height: 36, border: "none",
    borderRadius: 9,
    fontFamily: "Inter, sans-serif",
    fontSize: 15,
    fontWeight: active ? 700 : 400,
    color: active ? "#FEFCFC" : "rgba(254,252,252,0.40)",
    background: active ? "#3A3D44" : "transparent",
    cursor: "pointer",
    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
    transition: "all 0.15s",
  }),
  fieldGroup: { marginBottom: 14 },
  label: {
    display: "block",
    fontSize: 13,
    color: "rgba(254,252,252,0.40)",
    marginBottom: 2,
  },
  input: {
    width: "100%",
    height: 36,
    background: "#2A2D33",
    border: "1.5px solid rgba(254,252,252,0.15)",
    borderRadius: 6,
    color: "#FEFCFC",
    fontSize: 15,
    padding: "0 10px",
    boxSizing: "border-box",
    fontFamily: "Inter, sans-serif",
    outline: "none",
  },
  inputWrap: { position: "relative" },
  eyeBtn: {
    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer",
    color: "rgba(254,252,252,0.40)", display: "flex", alignItems: "center",
  },
  forgotLink: {
    display: "block",
    textAlign: "right",
    fontSize: 13,
    color: "#F1452A",
    marginTop: 6,
    textDecoration: "none",
    cursor: "pointer",
  },
  error: {
    fontSize: 14,
    color: "#F1452A",
    background: "rgba(241,69,42,0.10)",
    border: "1px solid rgba(241,69,42,0.25)",
    borderRadius: 8,
    padding: "8px 12px",
    marginBottom: 14,
  },
  btnPrimary: {
    width: "100%",
    height: 42,
    background: "#F1452A",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    fontSize: 17,
    fontWeight: 700,
    fontFamily: "Inter, sans-serif",
    cursor: "pointer",
    marginTop: 4,
    transition: "opacity 0.15s",
  },
};

export const Login = () => {
  const [tab, setTab] = useState(TAB_LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (tab === TAB_LOGIN) {
      const res = await login({ email, password });
      if (res.ok) {
        showSuccess("Bentornato!");
        navigate("/dashboard");
      } else {
        setError(res.message);
      }
    } else {
      setError("La registrazione non è ancora disponibile.");
    }

    setLoading(false);
  };

  return (
    <div style={s.page}>
      <div style={s.topZone}>
        <div style={s.logoMark}>
          <span style={s.logoLetter}>G</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={s.logoTitle}>GymLog</p>
          <p style={s.logoSub}>Il tuo diario di allenamento</p>
        </div>
      </div>

      <div style={s.bottomCard}>
        <div style={s.tabStrip}>
          <button style={s.tab(tab === TAB_LOGIN)} onClick={() => { setTab(TAB_LOGIN); setError(null); }}>
            Accedi
          </button>
          <button style={s.tab(tab === TAB_REGISTER)} onClick={() => { setTab(TAB_REGISTER); setError(null); }}>
            Registrati
          </button>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {tab === TAB_REGISTER && (
              <div style={s.fieldGroup}>
                <label style={s.label}>Nome completo</label>
                <input
                  style={s.input}
                  type="text"
                  placeholder="Nicolas Brazzo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  autoComplete="name"
                />
              </div>
            )}

            <div style={s.fieldGroup}>
              <label style={s.label}>Email</label>
              <input
                style={s.input}
                type="email"
                placeholder="nome@esempio.it"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div style={s.fieldGroup}>
              <label style={s.label}>Password</label>
              <div style={s.inputWrap}>
                <input
                  style={{ ...s.input, paddingRight: 36 }}
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={tab === TAB_LOGIN ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  style={s.eyeBtn}
                  onClick={() => setShowPwd((v) => !v)}
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {tab === TAB_LOGIN && (
                <span style={s.forgotLink}>Password dimenticata?</span>
              )}
            </div>

            {error && <div style={s.error}>{error}</div>}

            <button type="submit" style={s.btnPrimary}>
              {tab === TAB_LOGIN ? "Accedi" : "Crea account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
