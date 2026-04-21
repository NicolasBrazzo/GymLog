import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, User, ClipboardList, LogOut } from "lucide-react";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ClipboardList, label: "Schede", path: "/workout-sheets" },
  { icon: User, label: "Profilo", path: "/profile" },
];

const GymLogMark = () => (
  <div
    style={{
      width: 32, height: 32, borderRadius: 8,
      background: "#F1452A",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      boxShadow: "0 4px 12px rgba(241,69,42,0.30)",
    }}
  >
    <span style={{ color: "#fff", fontWeight: 800, fontSize: 13, letterSpacing: "-0.5px" }}>G</span>
  </div>
);

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();

  return (
    <aside
      style={{
        position: "fixed", left: 0, top: 0, zIndex: 50,
        height: "100%",
        background: "#1E2023",
        borderRight: "1px solid rgba(254,252,252,0.10)",
        width: isOpen ? 220 : 60,
        transition: "width 0.25s ease",
        display: "flex", flexDirection: "column",
      }}
      className="hidden md:flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div style={{
        height: 60, display: "flex", alignItems: "center",
        padding: "0 14px", gap: 10,
        borderBottom: "1px solid rgba(254,252,252,0.10)",
        overflow: "hidden",
      }}>
        <GymLogMark />
        {isOpen && (
          <span style={{ color: "#FEFCFC", fontWeight: 800, fontSize: 16, letterSpacing: "-0.5px", whiteSpace: "nowrap" }}>
            GymLog
          </span>
        )}
      </div>

      <nav style={{ flex: 1, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 2 }}>
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 10px",
              borderRadius: 10,
              textDecoration: "none",
              color: isActive ? "#F1452A" : "rgba(254,252,252,0.40)",
              background: isActive ? "rgba(241,69,42,0.10)" : "transparent",
              transition: "all 0.15s",
              overflow: "hidden",
              whiteSpace: "nowrap",
            })}
          >
            <item.icon size={20} style={{ flexShrink: 0 }} />
            {isOpen && (
              <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div style={{ borderTop: "1px solid rgba(254,252,252,0.10)", padding: "10px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              background: "rgba(241,69,42,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#F1452A",
            }}>
              {user.first_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
            </div>
            {isOpen && (
              <>
                <span style={{ flex: 1, fontSize: 12, color: "#FEFCFC", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {user.first_name || user.email}
                </span>
                <button
                  onClick={logout}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(254,252,252,0.40)", padding: 4 }}
                  title="Esci"
                >
                  <LogOut size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export const BottomNav = () => (
  <nav
    style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      height: 72,
      background: "rgba(30,32,35,0.97)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(254,252,252,0.10)",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
    }}
    className="md:hidden"
  >
    {MENU_ITEMS.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        style={({ isActive }) => ({
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 2, textDecoration: "none",
          color: isActive ? "#F1452A" : "rgba(254,252,252,0.40)",
          transition: "color 0.15s",
        })}
      >
        <item.icon size={22} />
        <span style={{ fontSize: 11, fontWeight: 400, lineHeight: 1 }}>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);
