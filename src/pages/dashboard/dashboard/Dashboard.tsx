import { useState, useEffect } from "react";
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

import PieCharts from "./pieChart/PieCharts";
import UserPieCharts from "./pieChart/UserPieCharts";
import DashboardLayout from "../../../components/layout/DashboardLayout";

function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        if (base64Url) {
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            window
              .atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join(""),
          );

          const decodedUser = JSON.parse(jsonPayload);

          console.log("Dashboard Mounted/Updated. Token Payload:", decodedUser);

          if (decodedUser && decodedUser.role) {
            setUserRole(decodedUser.role);
          } else {
            setUserRole("user");
          }
        }
      } catch (error) {
        console.error("Dashboard Token decoding error:", error);
        setUserRole("user");
      }
    } else {
      setUserRole("user");
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      {/* মোবাইল মেনু বাটন */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-[60] p-2 bg-[#FDA4AF] text-white rounded-xl shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* সাইডবার কন্টেইনার */}
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
              text="Over View"
              alert={false}
              active={isActive("/dashboard")}
            />
          </Link>

          {/* 🔴 ADMIN-ONLY SIDEBAR LINKS */}
          {userRole === "admin" && (
            <>
              <Link to="supplies" onClick={() => setIsMobileMenuOpen(false)}>
                <SidebarItem
                  icon={<LayoutDashboard size={20} />}
                  text="All Supply"
                  alert={false}
                  active={isActive("/dashboard/supplies")}
                />
              </Link>
              <Link
                to="create-supply"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <SidebarItem
                  icon={<StickyNote size={20} />}
                  text="Add Supply"
                  alert={false}
                  active={isActive("/dashboard/create-supply")}
                />
              </Link>
            </>
          )}

          <Link to="calender" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<Calendar size={20} />}
              text="Calendar"
              active={isActive("/dashboard/calender")}
              alert={false}
            />
          </Link>

          <Link to="add-review" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<Layers size={20} />}
              text="Review"
              alert={false}
              active={isActive("/dashboard/add-review")}
            />
          </Link>

          <Link to="reporting" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<Flag size={20} />}
              text="Reporting"
              alert={false}
              active={isActive("/dashboard/reporting")}
            />
          </Link>
          <hr className="my-3 border-slate-100" />
          {/* 🟢 SHARED SETTINGS LINK IN SIDEBAR */}
          <Link to="setting" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<Settings size={20} />}
              text="Settings"
              alert={false}
              active={isActive("/dashboard/setting")}
            />
          </Link>
          <Link to="help" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<LifeBuoy size={20} />}
              text="Help"
              alert={false}
              active={isActive("/dashboard/help")}
            />
          </Link>
          <Link to="/">
            <SidebarItem
              icon={<LifeBuoy size={20} />}
              text="Back to Home"
              alert={false}
              active={false}
            />
          </Link>
        </Sidebar>
      </div>

      {/* মোবাইল ওভারলে ব্যাকড্রপ */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {location.pathname === "/dashboard" ? (
            userRole === "admin" ? (
              <PieCharts />
            ) : (
              <UserPieCharts />
            )
          ) : (
            <div className="fade-in-content">
              <DashboardLayout />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
