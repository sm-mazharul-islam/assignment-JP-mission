import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-rose-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
            >
              <li>
                <Link to="/relief-goods">All Relief goods</Link>
              </li>
              <li>
                <Link to="#">About</Link>
              </li>

              <li>
                <Link to="/our-work">OurWork</Link>
              </li>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/login">login</Link>{" "}
              </li>
            </ul>
          </div>

          <Link to="/" className="text-xl lg:ml-40">
            <img className=" w-[50px]" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-end lg:mr-36 hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[20px] font-bold text-gray-800">
            <li>
              <Link to="/relief-goods">All Relief goods</Link>
            </li>
            <li>
              <Link to="/our-work">OurWork</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/login">login</Link>{" "}
            </li>
          </ul>
        </div>
        {/* <div className="navbar-end">
          <a className="btn">Button</a>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
