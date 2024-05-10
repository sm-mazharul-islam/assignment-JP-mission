// import { Link } from "react-router-dom";
// import DashboardLayout from "../../../components/layout/DashboardLayout";
// import Container from "../../../components/ui/Container";

import { Link } from "react-router-dom";
import DashboardLayout from "../../../components/layout/DashboardLayout";

// const Dashboard = () => {
//   const toggleBar = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     const sidebar = document.querySelector(".sidebar");
//     sidebar?.classList.toggle("left-[-300px]");
//   };
//   return (
//     <>
//       <Container>
//         <DashboardLayout></DashboardLayout>
//       </Container>
//       <span
//         className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
//         onClick={toggleBar}
//       >
//         <svg
//           className="w-[15%] px-2 bg-gray-900 rounded-md"
//           fill="none"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//           ></path>
//         </svg>
//       </span>
//       <div className="sidebar fixed top-0 bottom-0 lg:left-0 left-[-300px] p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
//         <div className="text-gray-100 text-xl">
//           <div className="p-2.5 mt-1 flex items-center">
//             <svg
//               className="w-[20%] px-2 py-1 bg-blue-600 rounded-md "
//               fill="none"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18 18 6M6 6l12 12"
//               ></path>
//             </svg>
//             <Link to="/">
//               <h1 className="font-bold text-gray-200 text-[15px] ml-3">
//                 Dashboard
//               </h1>
//             </Link>
//             <svg
//               className="w-[10%]  ml-20 cursor-pointer lg:hidden"
//               fill="none"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//               onClick={toggleBar}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18 18 6M6 6l12 12"
//               ></path>
//             </svg>
//           </div>
//           <hr className="my-2 text-gray-600" />
//         </div>
//         <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
//           <svg
//             className="w-[20%] text-sm "
//             fill="none"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18 18 6M6 6l12 12"
//             ></path>
//           </svg>
//           <input
//             type="text"
//             placeholder="Search"
//             className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
//           />
//         </div>
//         <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//           <svg
//             className="w-[20%] text-sm "
//             fill="none"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18 18 6M6 6l12 12"
//             ></path>
//           </svg>
//           <Link to="supplies">
//             <span className="text-[15px] ml-4 text-gray-200 ">All Supply</span>
//           </Link>
//         </div>
//         <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//           <svg
//             className="w-[20%] text-sm "
//             fill="none"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18 18 6M6 6l12 12"
//             ></path>
//           </svg>
//           <Link to="create-supply">
//             <span className="text-[15px] ml-4 text-gray-200 ">Add Supply</span>
//           </Link>
//         </div>
//         <hr className="my-2 text-gray-600" />

//         <div
//           className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
//           // onClick={toggleDropdown}
//         >
//           <svg
//             className="w-[20%] text-sm "
//             fill="none"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18 18 6M6 6l12 12"
//             ></path>
//           </svg>
//           <div className="flex justify-between w-full items-center">
//             <span className="text-[15px] ml-4 text-gray-200 ">Chatbox</span>
//             <span className="text-sm rotate-180" id="arrow"></span>
//             <svg
//               className="w-[20%] text-sm "
//               fill="none"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18 18 6M6 6l12 12"
//               ></path>
//             </svg>
//           </div>
//         </div>
//         <div
//           className="text-left text-sm font-thin mt-2 mx-auto text-gray-200"
//           id="submenu"
//         >
//           <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
//             Social
//           </h1>
//           <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
//             Personal
//           </h1>
//           <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
//             Friends
//           </h1>
//         </div>
//         <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//           <svg
//             className="w-[20%] text-sm "
//             fill="none"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18 18 6M6 6l12 12"
//             ></path>
//           </svg>
//           <span className="text-[15px] ml-4 text-gray-200 ">Logout</span>
//         </div>
//       </div>
//       {/* <Container>
//         <DashboardLayout />
//       </Container> */}
//     </>
//   );
// };

// export default Dashboard;

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open bg-orange-300">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <DashboardLayout />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-xl ">
          {/* Sidebar content here */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="supplies">All Supply</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
