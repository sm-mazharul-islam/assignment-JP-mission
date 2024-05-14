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
    <div className="drawer lg:drawer-open ">
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
        <ul className="menu p-4 w-80 min-h-full  bg-orange-200 text-xl ">
          {/* Sidebar content here */}
          <li className="mt-[50px]">
            <div className="flex gap-8">
              <svg
                className="w-[25px] "
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                ></path>
              </svg>
              <Link to="pie-chart">Pie Chart</Link>
            </div>
          </li>
          <span className="divider"></span>
          <li>
            <div className="flex gap-8">
              <svg
                className="w-[25px] "
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                ></path>
              </svg>
              <Link to="supplies">All Supply</Link>
            </div>
          </li>
          <span className="divider"></span>
          <li>
            <div className="flex gap-8">
              <svg
                className="w-[25px] "
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                ></path>
              </svg>
              <Link to="create-supply">Add Supply</Link>
            </div>
          </li>
          <span className="divider"></span>
          <li className="mx-auto">
            <Link to="/">
              <svg
                className="w-[25px]"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                ></path>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
