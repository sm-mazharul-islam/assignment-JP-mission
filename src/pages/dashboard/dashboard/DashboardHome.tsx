// import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";

// import { createContext, useContext, useState } from "react";

// const SidebarContext = createContext({ expanded: true });

// export default function Sidebar({ children }) {
//   const [expanded, setExpanded] = useState(true);
//   return (
//     <>
//       <aside className="h-screen">
//         <nav className="h-full flex flex-col bg-white border-r shadow-sm">
//           <div className="p-4 pb-2 flex justify-between items-center">
//             <img
//               src=""
//               className={`overflow-hidden transition-all ${
//                 expanded ? "w-32" : "w-0"
//               }`}
//             />
//             <button
//               onClick={() => setExpanded((curr) => !curr)}
//               className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
//             >
//               {expanded ? <ChevronFirst /> : <ChevronLast />}
//             </button>
//           </div>

//           <SidebarContext.Provider value={{ expanded }}>
//             <ul className="flex-1 px-3">{children}</ul>
//           </SidebarContext.Provider>

//           <div className="border-t flex p-3">
//             <img src="" className="w-10 h-10 rounded-md" />
//             <div
//               className={`flex justify-between items-center overflow-hidden transition-all ${
//                 expanded ? "w-52 ml-3" : "w-0"
//               } `}
//             >
//               <div className="leading-4">
//                 <h4 className="font-semibold">constGenius</h4>
//                 <span className="text-xs text-gray-600">
//                   constgenius@gmail.com
//                 </span>
//               </div>
//               <MoreVertical size={20} />
//             </div>
//           </div>
//         </nav>
//       </aside>
//     </>
//   );
// }

// // todo this is the real code and now i'm editing this code

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

import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import React from "react";

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({ expanded: true });

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (text: string) => {
    setActiveItem(text);
  };

  return (
    <aside className="bg-white border-r shadow-sm min-h-screen md:min-h-screen lg:min-h-screen flex flex-col">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src=""
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {React.Children.map(children, (child) =>
              React.cloneElement(child as React.ReactElement, {
                active: (child as React.ReactElement).props.text === activeItem,
                onClick: () =>
                  handleItemClick((child as React.ReactElement).props.text),
                alert: (child as React.ReactElement).props.text === activeItem, // Only active item has alert
              })
            )}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img src="" className="w-10 h-10 rounded-md" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            } `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">constGenius</h4>
              <span className="text-xs text-gray-600">
                constgenius@gmail.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}
// import { useContext } from "react";
// import { SidebarContext } from "./DashboardHome"; // Adjust the import according to your file structure

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  alert: boolean;
  onClick: () => void;
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  onClick,
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      onClick={onClick}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
