import { Outlet } from "react-router-dom";
import { Sidebar, BottomNav, MobileHeader } from "../components/Side.jsx";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      <Sidebar />
      <main className="min-h-screen pt-14 pb-16 md:pt-0 md:pb-0 md:ml-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
