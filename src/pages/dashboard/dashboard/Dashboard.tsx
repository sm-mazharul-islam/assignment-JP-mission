// import { Link } from "react-router-dom";
// import DashboardLayout from "../../../components/layout/DashboardLayout";

// const Dashboard = () => {
//   return (
//     <div className="drawer lg:drawer-open ">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content flex flex-col items-center justify-center">
//         {/* Page content here */}

//         <label
//           htmlFor="my-drawer-2"
//           className="btn bg-orange-200 w-[400px]  drawer-button lg:hidden text-xl "
//         >
//           <span className="text-neutral-700"> Open Dashboard Nav</span>
//         </label>
//         <DashboardLayout />
//       </div>
//       <div className="drawer-side ">
//         <label
//           htmlFor="my-drawer-2"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>
//         <ul className="menu p-4 w-80 min-h-full  bg-orange-200 text-xl ">
//           {/* Sidebar content here */}
//           <li className="mt-[50px]">
//             <div className="flex gap-8">
//               <svg
//                 className="w-[25px]  text-indigo-400 "
//                 fill="none"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
//                 ></path>
//               </svg>
//               <p className="text-indigo-400 text-3xl">Dashboard</p>
//             </div>
//           </li>
//           <span className="divider"></span>
//           {/* <li>
//             <div className="flex gap-8">
//               <svg
//                 className="w-[25px] "
//                 fill="none"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
//                 ></path>
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
//                 ></path>
//               </svg>
//               <Link to="pie-chart">pie chart</Link>
//             </div>
//           </li>
//           <span className="divider"></span> */}
//           <li>
//             <div className="flex gap-8">
//               <svg
//                 className="w-[25px] "
//                 data-slot="icon"
//                 fill="none"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//                 aria-hidden="true"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
//                 ></path>
//               </svg>
//               <Link to="supplies">All Supply</Link>
//             </div>
//           </li>
//           <span className="divider"></span>
//           <li>
//             <div className="flex gap-8">
//               <svg
//                 className="w-[25px] "
//                 fill="none"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
//                 ></path>
//               </svg>
//               <Link to="create-supply">Add Supply</Link>
//             </div>
//           </li>
//           <span className="divider"></span>
//           <li>
//             <div className="flex gap-8">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="size-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
//                 />
//               </svg>

//               <Link to="add-review">Review</Link>
//             </div>
//           </li>
//           <span className="divider"></span>

//           <li className="mx-auto">
//             <div>
//               <Link to="/" className="flex gap-8">
//                 <svg
//                   className="w-[25px] text-indigo-400"
//                   fill="none"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
//                   ></path>
//                 </svg>
//                 <p className="text-indigo-400">Back</p>
//               </Link>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// Sidebar.tsx

// Sidebar.tsx

// Dashboard.tsx

// DashboardHome.tsx

// Dashboard.tsx

// DashboardHome.tsx

// import React, { useState } from "react";
// // import SidebarItem from "./SidebarItem";
// import {
//   LayoutDashboard,
//   Home,
//   StickyNote,
//   Layers,
//   Flag,
//   Calendar,
//   LifeBuoy,
//   Settings,
// } from "lucide-react";
// import DashboardHome from "./DashboardHome";
// import SidebarItem from "../../../components/ui/sidebar/SidebarItem";

// const Dashboard: React.FC = () => {
//   const [activeItem, setActiveItem] = useState<string>("Home");

//   const handleItemClick = (text: string) => {
//     setActiveItem(text);
//   };

//   return (
//     <div className="flex">
//       <DashboardHome>
//         <SidebarItem
//           icon={<Home size={20} />}
//           text="Home"
//           active={activeItem === "Home"}
//           onClick={() => handleItemClick("Home")}
//           alert
//         />
//         <SidebarItem
//           icon={<LayoutDashboard size={20} />}
//           text="Dashboard"
//           active={activeItem === "Dashboard"}
//           onClick={() => handleItemClick("Dashboard")}
//         />
//         <SidebarItem
//           icon={<StickyNote size={20} />}
//           text="Projects"
//           active={activeItem === "Projects"}
//           onClick={() => handleItemClick("Projects")}
//           alert
//         />
//         <SidebarItem
//           icon={<Calendar size={20} />}
//           text="Calendar"
//           active={activeItem === "Calendar"}
//           onClick={() => handleItemClick("Calendar")}
//         />
//         <SidebarItem
//           icon={<Layers size={20} />}
//           text="Tasks"
//           active={activeItem === "Tasks"}
//           onClick={() => handleItemClick("Tasks")}
//         />
//         <SidebarItem
//           icon={<Flag size={20} />}
//           text="Reporting"
//           active={activeItem === "Reporting"}
//           onClick={() => handleItemClick("Reporting")}
//         />
//         <hr className="my-3" />
//         <SidebarItem
//           icon={<Settings size={20} />}
//           text="Settings"
//           active={activeItem === "Settings"}
//           onClick={() => handleItemClick("Settings")}
//         />
//         <SidebarItem
//           icon={<LifeBuoy size={20} />}
//           text="Help"
//           active={activeItem === "Help"}
//           onClick={() => handleItemClick("Help")}
//         />
//       </DashboardHome>
//     </div>
//   );
// };

// export default Dashboard;

//? llksafjsdkfjks
// import {
//   LayoutDashboard,
//   Home,
//   StickyNote,
//   Layers,
//   Flag,
//   Calendar,
//   LifeBuoy,
//   Settings,
// } from "lucide-react";
// import Sidebar, { SidebarItem } from "./DashboardHome";

// function Dashboard() {
//   return (
//     <>
//       <div className="flex">
//         <Sidebar>
//           <SidebarItem icon={<Home size={20} />} text="Home" alert />
//           <SidebarItem
//             icon={<LayoutDashboard size={20} />}
//             text="Dashboard"
//             active
//           />
//           <SidebarItem icon={<StickyNote size={20} />} text="Projects" alert />
//           <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
//           <SidebarItem icon={<Layers size={20} />} text="Tasks" />
//           <SidebarItem icon={<Flag size={20} />} text="Reporting" />
//           <hr className="my-3" />
//           <SidebarItem icon={<Settings size={20} />} text="Settings" />
//           <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
//         </Sidebar>
//       </div>
//     </>
//   );
// }

// export default Dashboard;

import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./DashboardHome";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../components/layout/DashboardLayout";

function Dashboard() {
  return (
    <>
      <div className="flex">
        <Sidebar>
          <Link to="/dashboard">
            <SidebarItem
              icon={<Home size={20} />}
              text="Pie Chart"
              active={false}
              alert={false}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Link>
          <Link to="supplies">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="All Supply"
              active={false}
              alert={false}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Link>
          <Link to="create-supply">
            <SidebarItem
              icon={<StickyNote size={20} />}
              text="Add Supply"
              active={false}
              alert={false}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Link>
          <SidebarItem
            icon={<Calendar size={20} />}
            text="Calendar"
            active={false}
            alert={false}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Link to="add-review">
            <SidebarItem
              icon={<Layers size={20} />}
              text="Review"
              active={false}
              alert={false}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Link>
          <SidebarItem
            icon={<Flag size={20} />}
            text="Reporting"
            active={false}
            alert={false}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <hr className="my-3" />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
            active={false}
            alert={false}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Help"
            active={false}
            alert={false}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Sidebar>
        <div className="flex-1 p-4">
          <DashboardLayout />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
