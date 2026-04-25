import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Change background on scroll for that premium feel
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      <li>
        <Link
          to="/relief-goods"
          className="hover:text-[#FDA4AF] transition-colors"
        >
          All Relief Goods
        </Link>
      </li>
      <li>
        <Link to="/our-work" className="hover:text-[#FDA4AF] transition-colors">
          Our Work
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard"
          className="hover:text-[#FDA4AF] transition-colors"
        >
          Dashboard
        </Link>
      </li>
    </>
  );

  return (
    <div
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-5"
      }`}
    >
      <div className="navbar container mx-auto px-4 md:px-12">
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost lg:hidden ${isScrolled ? "text-slate-900" : "text-white"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white rounded-[2rem] w-64 gap-2 border border-slate-100"
            >
              {navLinks}
              <div className="divider my-1"></div>
              <li>
                <Link
                  to="/login"
                  className="btn bg-[#FDA4AF] border-none text-white hover:bg-rose-400 rounded-xl"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FDA4AF] blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
              <img className="w-10 md:w-12 relative" src={logo} alt="Logo" />
            </div>
            <span
              className={`hidden md:block font-black tracking-tighter text-xl ${isScrolled ? "text-slate-900" : "text-white"}`}
            >
              RELIEF<span className="text-[#FDA4AF]">GOODS</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul
            className={`menu menu-horizontal px-1 gap-8 font-bold tracking-wide ${isScrolled ? "text-slate-600" : "text-white/90"}`}
          >
            {navLinks}
          </ul>
        </div>

        {/* Action Button */}
        <div className="navbar-end">
          <Link
            to="/login"
            className={`hidden lg:flex btn px-8 rounded-2xl font-black border-none transition-all active:scale-95 ${
              isScrolled
                ? "bg-[#FDA4AF] text-white hover:bg-rose-400 shadow-lg shadow-rose-200"
                : "bg-white text-slate-900 hover:bg-[#FDA4AF] hover:text-white"
            }`}
          >
            Login
          </Link>

          {/* Tablet/Mobile Login Icon for better UX */}
          <Link
            to="/login"
            className="lg:hidden btn btn-ghost btn-circle text-[#FDA4AF]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
