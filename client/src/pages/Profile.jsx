import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";

export const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: "100svh", background: "#212327", fontFamily: "Inter, sans-serif", padding: "60px 16px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FEFCFC", margin: "0 0 20px", letterSpacing: "-0.5px" }}>
        Profilo
      </h1>

      {/* Avatar + info */}
      <div style={{
        background: "#2A2D33", border: "1.5px solid rgba(254,252,252,0.08)",
        borderRadius: 14, padding: "20px 16px", marginBottom: 12,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "rgba(241,69,42,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, fontWeight: 700, color: "#F1452A", flexShrink: 0,
        }}>
          {user?.first_name?.[0]?.toUpperCase() || <User size={24} style={{ color: "#F1452A" }} />}
        </div>
        <div>
          <p style={{ fontSize: 17, fontWeight: 700, color: "#FEFCFC", margin: "0 0 2px" }}>
            {user?.first_name || "—"}
          </p>
          <p style={{ fontSize: 14, color: "rgba(254,252,252,0.40)", margin: 0 }}>
            {user?.email || "—"}
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        style={{
          width: "100%", height: 42, borderRadius: 10,
          background: "#2E3238", border: "1.5px solid rgba(254,252,252,0.15)",
          color: "#FEFCFC", fontSize: 15, fontWeight: 500,
          fontFamily: "Inter, sans-serif", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        <LogOut size={16} />
        Esci dall'account
      </button>
    </div>
  );
};
