import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, User, Dumbbell, ClipboardList, LogOut } from "lucide-react";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ClipboardList, label: "Schede", path: "/workout-sheets" },
  { icon: Dumbbell, label: "Allenamento", path: "/start-workout" },
  { icon: User, label: "Profilo", path: "/profile" },
];

const GymLogMark = () => (
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
    <span className="text-primary-foreground font-black text-xs tracking-tighter select-none">GL</span>
  </div>
);

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <aside
      className={[
        "hidden md:flex flex-col",
        "fixed left-0 top-0 z-50 h-full bg-sidebar",
        "transition-all duration-300 ease-in-out border-r border-sidebar-border",
        isOpen ? "w-64" : "w-16",
      ].join(" ")}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-4 overflow-hidden">
        <div className="flex items-center gap-3">
          <GymLogMark />
          {isOpen && (
            <span className="text-sidebar-foreground font-bold text-base whitespace-nowrap tracking-tight">
              GymLog
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-0.5">
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground/60 hover:bg-white/10 hover:text-sidebar-foreground",
              ].join(" ")
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {isOpen && (
              <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      {user && (
        <div className="border-t border-sidebar-border p-3">
          <div className={["flex items-center gap-3", isOpen ? "" : "justify-center"].join(" ")}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
              {user.first_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
            </div>
            {isOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sidebar-foreground text-xs font-medium truncate">
                    {user.first_name || user.email}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors p-1 rounded"
                  title="Esci"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export const MobileHeader = () => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-sidebar border-b border-sidebar-border flex items-center px-4">
      <div className="flex items-center gap-2.5">
        <GymLogMark />
        <span className="text-sidebar-foreground font-bold text-lg tracking-tight">GymLog</span>
      </div>
    </header>
  );
};

export const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border safe-area-pb">
      <div className="grid h-16 grid-cols-4">
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "flex flex-col items-center justify-center gap-1 py-2 transition-colors",
                isActive ? "text-primary" : "text-sidebar-foreground/50",
              ].join(" ")
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
