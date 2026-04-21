import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, BottomNav } from "../components/Side.jsx";

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-svh" style={{ background: "#18191C" }}>
      {/* Desktop only */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 w-full pb-18 md:pb-0 md:ml-15">
        <Outlet />
      </main>

      {/* Mobile only */}
      <BottomNav />
    </div>
  );
};
