import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger effect as soon as the user starts scrolling
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      <li>
        <Link
          to="/relief-goods"
          className="hover:text-[#FDA4AF] transition-all duration-300"
        >
          All Relief Goods
        </Link>
      </li>
      <li>
        <Link
          to="/our-work"
          className="hover:text-[#FDA4AF] transition-all duration-300"
        >
          Our Work
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard"
          className="hover:text-[#FDA4AF] transition-all duration-300"
        >
          Dashboard
        </Link>
      </li>
    </>
  );

  return (
    <nav
      className={`w-full transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="navbar container mx-auto px-6 md:px-12 flex items-center justify-between min-h-0">
        {/* Navbar Start: Logo & Mobile Menu */}
        <div className="navbar-start flex items-center overflow-visible">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost lg:hidden p-0 mr-4 h-9 w-9 min-h-0 ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow-2xl bg-white rounded-2xl w-64 gap-3 border border-slate-100"
            >
              {navLinks}
              <div className="divider my-1"></div>
              <li>
                <Link
                  to="/login"
                  className="btn btn-sm bg-[#FDA4AF] border-none text-white rounded-xl"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* LOGO SECTION WITH GLOW */}
          <Link
            to="/"
            className="relative flex items-center justify-center group h-12 w-12 lg:h-14 lg:w-14"
          >
            {/* Initial Highlight Glow: Visible only when NOT scrolled */}
            {!isScrolled && (
              <div className="absolute inset-0 bg-[#FDA4AF]/40 rounded-full blur-2xl animate-pulse z-0 pointer-events-none" />
            )}

            {/* The Logo Image: Z-index 50 ensures it stays on top */}
            <img
              className="w-10 md:w-12 h-auto relative z-50 transition-transform duration-500 group-hover:scale-110 object-contain bg-gray-100"
              src={logo}
              alt="Big Hearts Logo"
              // Fallback if image fails to load
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </Link>
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul
            className={`menu menu-horizontal px-1 gap-8 font-bold tracking-wide uppercase text-[11px] transition-colors duration-500 ${
              isScrolled ? "text-slate-600" : "text-white/90"
            }`}
          >
            {navLinks}
          </ul>
        </div>

        {/* Navbar End: CTA Button */}
        <div className="navbar-end flex items-center">
          <Link
            to="/login"
            className={`hidden lg:flex btn btn-sm px-8 rounded-full font-black border-none transition-all active:scale-95 text-[11px] ${
              isScrolled
                ? "bg-slate-900 text-white hover:bg-[#FDA4AF]"
                : "bg-white text-slate-900 hover:bg-[#FDA4AF] hover:text-white shadow-xl shadow-white/10"
            }`}
          >
            LOGIN
          </Link>

          <Link
            to="/login"
            className={`lg:hidden btn btn-ghost btn-circle h-9 w-9 min-h-0 flex items-center justify-center ${
              isScrolled ? "text-[#FDA4AF]" : "text-white"
            }`}
          >
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
