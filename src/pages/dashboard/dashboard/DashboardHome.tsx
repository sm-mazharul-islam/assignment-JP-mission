import { ChevronFirst, ChevronLast, MoreVertical, LogOut } from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({ expanded: true });

interface SidebarProps {
  children: React.ReactNode;
}

interface DecodedUser {
  name?: string;
  email?: string;
  role?: string;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [profile, setProfile] = useState<DecodedUser>({
    name: "Loading...",
    email: "...",
    role: "user",
  });

  const navigate = useNavigate();

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

          const decoded: DecodedUser = JSON.parse(jsonPayload);

          setProfile({
            name: decoded.name || decoded.email?.split("@")[0] || "User Token",
            email: decoded.email || "No Email",
            role: decoded.role || "user",
          });
        }
      } catch (error) {
        console.error("Sidebar profile decode error:", error);
      }
    }
  }, []);

  const handleItemClick = (text: string) => {
    setActiveItem(text);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // ইউজারের নামের প্রথম দুই ক্যারেক্টার দিয়ে অ্যাভাটার জেনারেট করা
  const avatarLetters = profile.name
    ? profile.name.substring(0, 2).toUpperCase()
    : "US";

  return (
    <aside className="bg-white border-r shadow-sm min-h-screen flex flex-col relative">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* TOP BRANDING BAR */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
          >
            <span className="text-lg font-black tracking-tighter text-slate-800 uppercase">
              BIG<span className="text-[#fb7185]">HEARTS</span>
            </span>
          </div>
          <button
            onClick={() => setExpanded((curr: boolean) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* ITEMS NAVIGATION LIST */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return null;

              const itemProps = child.props.text
                ? child.props
                : child.props.children?.props || {};
              const itemText = itemProps.text;

              if (!itemText) return child;

              const isCurrentActive = itemText === activeItem;

              return React.cloneElement(child as React.ReactElement, {
                children: React.isValidElement(child.props.children)
                  ? React.cloneElement(
                      child.props.children as React.ReactElement,
                      {
                        active: isCurrentActive,
                        alert: isCurrentActive,
                      },
                    )
                  : child.props.children,
                active: isCurrentActive,
                onClick: () => handleItemClick(itemText),
                alert: isCurrentActive,
              });
            })}
          </ul>
        </SidebarContext.Provider>

        {/* PROFILE SECTION WITH LOGOUT POPUP (NOW 100% DYNAMIC) */}
        <div className="border-t flex p-3 relative items-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FDA4AF] to-[#fb7185] flex items-center justify-center text-white font-black text-xs shrink-0 select-none shadow-sm">
            {avatarLetters}
          </div>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded
                ? "w-52 ml-3 opacity-100"
                : "w-0 opacity-0 pointer-events-none"
            } `}
          >
            <div className="leading-4 max-w-[120px] truncate">
              {/* লাইভ ডিকোডেড নাম */}
              <h4 className="font-bold text-slate-800 truncate text-xs uppercase tracking-wide">
                {profile.name}
              </h4>
              {/* লাইভ ডিকোডেড রোল ব্যাজ বা ইমেইল */}
              <span className="text-[10px] font-black text-[#fb7185] uppercase tracking-wider block mt-0.5">
                {profile.role}
              </span>
              <span className="text-[9px] text-gray-400 truncate block">
                {profile.email}
              </span>
            </div>

            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-1 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors relative"
            >
              <MoreVertical size={20} />
            </button>

            {/* FLOATING DROPDOWN POPUP MENU */}
            {showDropdown && (
              <div className="absolute bottom-14 right-2 w-44 bg-white rounded-2xl p-2 shadow-2xl border border-slate-100 z-[3000] flex flex-col font-bold text-slate-700 text-xs">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:bg-rose-50/50 py-2.5 px-3 rounded-xl transition-all w-full text-left font-bold"
                >
                  <LogOut size={16} />
                  Logout Account
                </button>
              </div>
            )}
          </div>

          {/* ICON-ONLY LOGOUT BUTTON FOR COLLAPSED STATE */}
          {!expanded && (
            <button
              onClick={handleLogout}
              className="absolute top-1/2 -translate-y-1/2 left-full -translate-x-12 ml-4 p-2 bg-rose-50 hover:bg-rose-100 text-[#fb7185] rounded-xl opacity-100 transition-opacity z-[2000] shadow-sm border border-rose-100/50"
              title="Logout Account"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  icon,
  text,
  active = false,
  alert = false,
  onClick,
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  const dynamicClasses = active
    ? "bg-[#fb7185]/10 text-[#fb7185]"
    : "hover:bg-slate-50 text-slate-500 hover:text-slate-800";

  return (
    <li
      onClick={onClick}
      className={`relative flex items-center py-2.5 px-3 my-1 font-bold text-xs rounded-xl cursor-pointer transition-all group select-none tracking-wide ${dynamicClasses}`}
    >
      <div
        className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-105"}`}
      >
        {icon}
      </div>

      <span
        className={`overflow-hidden transition-all duration-300 whitespace-nowrap font-semibold tracking-wide ${
          expanded ? "w-52 ml-3 opacity-100" : "w-0 opacity-0"
        }`}
      >
        {text}
      </span>

      {alert && (
        <div
          className={`absolute right-3 w-1.5 h-1.5 rounded-full bg-[#fb7185] ring-2 ring-white transition-all ${
            expanded ? "" : "top-2.5 right-2.5"
          }`}
        />
      )}

      {!expanded && (
        <div className="absolute left-full rounded-xl px-3 py-2 ml-6 bg-slate-900 text-white text-[10px] uppercase font-black whitespace-nowrap tracking-widest invisible opacity-0 -translate-x-3 transition-all duration-200 pointer-events-none z-[2000] group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 shadow-xl">
          {text}
        </div>
      )}
    </li>
  );
}
