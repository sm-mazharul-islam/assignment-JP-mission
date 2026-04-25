import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

export default function NavbarTwo() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // মোবাইলে মেনু ওপেন/ক্লোজ করার জন্য

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Relief", path: "/relief-goods" },
    { name: "Our Work", path: "/our-work" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] px-4 py-4 transition-all duration-500">
      <div
        className={`mx-auto max-w-7xl rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-500 border ${
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border-slate-100 py-3 px-5 md:px-8"
            : "bg-white border-transparent py-4 px-5 md:px-6 shadow-sm"
        } flex items-center justify-between flex-wrap`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-200 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
            <img
              className="w-10 md:w-14 relative transition-transform duration-500 group-hover:scale-110"
              src={logo}
              alt="Heart Logo"
            />
          </div>
          <span className="font-black text-xl md:text-2xl tracking-tighter text-slate-900">
            RELIEF<span className="text-[#FDA4AF]">GOODS</span>
          </span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-900 focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links - Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[14px] font-bold text-slate-600 uppercase tracking-widest transition-all hover:text-[#FDA4AF] relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FDA4AF] transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Action Button - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-black text-slate-900 hover:text-[#FDA4AF] transition-colors"
          >
            LOGIN
          </Link>
          <Link
            to="/donate"
            className="bg-[#FDA4AF] text-white px-7 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-rose-400 hover:shadow-[0_10px_20px_rgba(253,164,175,0.4)] transition-all active:scale-95"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="w-full lg:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col gap-4 border-t border-slate-100 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-slate-600 uppercase tracking-widest hover:text-[#FDA4AF]"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-black text-slate-900"
                >
                  LOGIN
                </Link>
                <Link
                  to="/donate"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#FDA4AF] text-white text-center py-3 rounded-xl font-black text-xs uppercase tracking-widest"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
