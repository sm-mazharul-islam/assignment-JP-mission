import { ReactNode, useState } from "react";

// 1. Define the Prop Types
interface SidebarItemProps {
  icon: ReactNode; // Allows Lucide icons, SVG, or components
  text: string; // The label for the item
  alert?: boolean; // Optional boolean for the red dot
  onClick: () => void; // Function that returns nothing
}

const SidebarItem = ({ icon, text, alert, onClick }: SidebarItemProps) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    onClick(); // Execute the parent's function
    setActive(true); // Set local active state
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center space-x-2 p-4 cursor-pointer transition-colors duration-200 rounded-lg
        ${
          active
            ? "bg-[#FDA4AF]/20 text-[#FDA4AF] font-bold"
            : "hover:bg-slate-100 text-slate-600"
        }
      `}
    >
      {/* Icon size and color can be controlled here */}
      <div className={`${active ? "text-[#FDA4AF]" : "text-slate-400"}`}>
        {icon}
      </div>

      <span className="text-sm tracking-wide">{text}</span>

      {alert && (
        <span className="ml-auto bg-[#FDA4AF] rounded-full w-2 h-2 animate-pulse" />
      )}
    </div>
  );
};

export default SidebarItem;
