import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-64">
        <Navbar />

        <div className="p-4 pb-24 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />

    </div>
  );
}

export default MainLayout;