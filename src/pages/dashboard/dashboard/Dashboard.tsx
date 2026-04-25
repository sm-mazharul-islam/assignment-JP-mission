import { useState } from "react";
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./DashboardHome";
import { Link, useLocation } from "react-router-dom";
import DashboardLayout from "../../../components/layout/DashboardLayout";

function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      {/* 1. Mobile Hamburger Toggle */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-[60] p-2 bg-[#FDA4AF] text-white rounded-xl shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 2. Sidebar with Responsive Logic */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar>
          <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<Home size={20} />}
              text="Pie Chart"
              alert={false}
              active={isActive("/dashboard")}
              onClick={() => {}}
            />
          </Link>
          <Link to="supplies" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="All Supply"
              alert={false}
              active={isActive("/dashboard/supplies")}
              onClick={() => {}}
            />
          </Link>
          <Link to="create-supply" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<StickyNote size={20} />}
              text="Add Supply"
              alert={false}
              active={isActive("/dashboard/create-supply")}
              onClick={() => {}}
            />
          </Link>
          <SidebarItem
            icon={<Calendar size={20} />}
            text="Calendar"
            active={false}
            alert={false}
            onClick={() => {}}
          />
          <Link to="add-review" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<Layers size={20} />}
              text="Review"
              alert={false}
              active={isActive("/dashboard/add-review")}
              onClick={() => {}}
            />
          </Link>
          <SidebarItem
            icon={<Flag size={20} />}
            text="Reporting"
            alert={false}
            active={false}
            onClick={() => {}}
          />
          <hr className="my-3 border-slate-100" />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
            alert={false}
            active={false}
            onClick={() => {}}
          />
          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Help"
            alert={false}
            active={false}
            onClick={() => {}}
          />
        </Sidebar>
      </div>

      {/* 3. Backdrop for Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* 4. Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          <DashboardLayout />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
