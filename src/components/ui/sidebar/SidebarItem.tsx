// import React, { useContext } from "react";
// import { SidebarContext } from "../../../pages/dashboard/dashboard/DashboardHome";

// interface SidebarItemProps {
//   icon: JSX.Element;
//   text: string;
//   active: boolean;
//   onClick: () => void;
//   alert?: boolean;
//   expanded?: boolean; // New prop for expanded state
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({
//   icon,
//   text,
//   active,
//   onClick,
//   alert = false,
// }) => {
//   const { expanded } = useContext(SidebarContext);
//   return (
//     <li
//       className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
//         active
//           ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//           : "hover:bg-indigo-50 text-gray-600"
//       }`}
//       onClick={onClick}
//     >
//       {icon}
//       <span className="overflow-hidden transition-all w-52 ml-3">{text}</span>
//       {alert && (
//         <div
//           className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
//             active ? "" : "top-2"
//           }`}
//         ></div>
//       )}

//       {!active && (
//         <div
//           className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
//         >
//           {text}
//         </div>
//       )}

//       {expanded && ( // Conditionally render based on expanded prop
//         <div
//           className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm -translate-x-3 transition-all`}
//         >
//           {text}
//         </div>
//       )}
//     </li>
//   );
// };

// export default SidebarItem;

// export function SidebarItem({ icon, text, active, alert }) {
//   const { expanded } = useContext(SidebarContext);
//   return (
//     <li
//       className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
//         active
//           ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//           : "hover:bg-indigo-50 text-gray-600"
//       }`}
//     >
//       {icon}
//       <span
//         className={`overflow-hidden transition-all ${
//           expanded ? "w-52 ml-3" : "w-0"
//         }`}
//       >
//         {text}
//       </span>
//       {alert && (
//         <div
//           className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
//             expanded ? "" : "top-2"
//           }`}
//         ></div>
//       )}

//       {!expanded && (
//         <div
//           className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
//         >
//           {text}
//         </div>
//       )}
//     </li>
//   );
// }

// SidebarItem.js

import React, { useState } from "react";

const SidebarItem = ({ icon, text, alert, onClick }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    onClick(); // Execute the onClick handler from props
    setActive(true); // Set active state locally
  };

  return (
    <div
      className={`flex items-center space-x-2 p-4 cursor-pointer ${
        active ? "bg-gray-200" : ""
      }`}
      onClick={handleClick}
    >
      {icon}
      <span className="text-sm">{text}</span>
      {alert && <span className="ml-auto bg-red-500 rounded-full w-2 h-2" />}
    </div>
  );
};

export default SidebarItem;
