import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="Logo"
                className="w-12 transition-transform duration-500 group-hover:rotate-[360deg]"
              />
              <span className="font-black text-2xl tracking-tighter text-white">
                RELIEF<span className="text-[#FDA4AF]">GOODS</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Empowering communities through transparent and efficient relief
              distribution. Together, we bring hope to those who need it most.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FDA4AF] hover:text-white transition-all cursor-pointer"
                >
                  <div className="w-4 h-4 bg-current rounded-full opacity-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Navigation
            </h6>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  to="/relief-goods"
                  className="hover:text-[#FDA4AF] transition-colors"
                >
                  All Relief Goods
                </Link>
              </li>
              <li>
                <Link
                  to="/our-work"
                  className="hover:text-[#FDA4AF] transition-colors"
                >
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-[#FDA4AF] transition-colors"
                >
                  Volunteer Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-[#FDA4AF] transition-colors"
                >
                  Partner Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Get in Touch
            </h6>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-[#FDA4AF] font-bold">Email:</span>
                <span>support@reliefgoods.org</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FDA4AF] font-bold">Hotline:</span>
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-start gap-3 leading-relaxed">
                <span className="text-[#FDA4AF] font-bold">HQ:</span>
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
            <div className="relative z-10">
              <h6 className="text-white font-black mb-4">Stay Updated</h6>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Join our newsletter to receive the latest updates on our
                distribution drives.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FDA4AF] transition-colors"
                />
                <button className="bg-[#FDA4AF] text-slate-950 font-black py-3 rounded-xl hover:bg-rose-400 transition-all active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl group-hover:bg-violet-600/30 transition-all" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {currentYear}{" "}
            <span className="text-[#FDA4AF]">ReliefGoods</span>. All rights
            reserved.
          </p>
          <div className="flex gap-8 text-xs text-slate-500 font-medium">
            <Link to="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
