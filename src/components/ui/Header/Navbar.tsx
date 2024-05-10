// import { useState } from "react";
// import { NavLink } from "react-router-dom";

// import { Link } from "react-router-dom";

// const Navbar = () => {
// const [isOpen, setIsOpen] = useState(false);
//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };
// return (
//     <header classNameName="bg-dark-background sticky top-0 z-20 mx-auto flex w-full items-center justify-between border-b border-gray-500 p-8  ">
//       <Logo />
//       <Nav />
//     </header>
//   );
// };

// export default Navbar;

// export const Logo = () => {
//   return (
//     <div classNameName="logo w-16 h-16">
//       <img
//         src="https://kodeforest.net/wp-demo/disaster-relief/wp-content/themes/disaster-relief/images/logo.png"
//         alt=""
//       />
//     </div>
//   );
// };

// export const NavLinks = () => {
//   return (
//     <>
//       <NavLink to="/relief-goods">All Relief Goods</NavLink>
//       <NavLink to="/login">Login</NavLink>
//       <NavLink to="/dashboard">Dashboard</NavLink>
//     </>
//   );
// };

// export const Nav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <nav classNameName="w-1/3">
//       <div classNameName="flex justify-between">
//         <NavLinks />
//         <div>
//           <button onClick={toggleNavbar}>

//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

//     <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
//       <div className="flex-1 flex justify-between items-center">
//         <img
//           src="https://kodeforest.net/wp-demo/disaster-relief/wp-content/themes/disaster-relief/images/logo.png"
//           alt=""
//         />
//       </div>

//       <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
//         <svg
//           className="fill-current text-blue-500"
//           xmlns="http://www.w3.org/2000/svg"
//           width="20"
//           height="20"
//           viewBox="0 0 20 20"
//         >
//           <title>menu</title>
//           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
//         </svg>
//       </label>
//       <input className="hidden" type="checkbox" id="menu-toggle" />

//       <div
//         className="hidden lg:flex lg:items-center lg:w-auto w-full"
//         id="menu"
//       >
//         <nav>
//           <ul className="  lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0 p-1">
//             <li>
//               <a
//                 className="lg:p-4 py-3 px-5 block border-b-2 border-transparent hover:border-indigo-400"
//                 href="#"
//               >
//                 Start Coding
//               </a>
//             </li>
//             <li>
//               <a
//                 className="lg:p-4 py-3 px-5 block border-b-2 border-transparent hover:border-indigo-400"
//                 href="#"
//               >
//                 Search
//               </a>
//             </li>
//             <li>
//               <a
//                 className="lg:p-4 py-3 px-5 block border-b-2 border-transparent hover:border-indigo-400"
//                 href="#"
//               >
//                 Explore
//               </a>
//             </li>
//             <li>
//               <a
//                 className="lg:p-4 py-3 px-5 block border-b-2 border-transparent hover:border-indigo-400 lg:mb-0 mb-2"
//                 href="#"
//               >
//                 Login
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };
// export default Navbar;
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <header>
      <div className="logo">
        {/* <h2>Logo</h2> */}
        <Link to="/">
          <img
            className=" logo"
            src="https://kodeforest.net/wp-demo/disaster-help/wp-content/uploads/2017/05/charity-logo.png"
            alt=""
          />
        </Link>
      </div>
      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      <nav>
        <ul>
          <li>
            <Link to="/relief-goods">All Relief goods</Link>
          </li>
          {/* <li>
            <Link to="#">About</Link>
          </li> */}
          <li>
            <Link to="/our-work">OurWork</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>
    </header>
  );
};

export default Navbar;
