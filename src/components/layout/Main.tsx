import { Outlet, useLocation } from "react-router-dom";
import Footer from "../ui/footer/Footer";
import Navbar from "../ui/Header/Navbar";
import NavbarTwo from "../ui/Header/NavbarTwo";
import { ReliefTicker } from "../impactHome/reliefTicker/ReliefTicker";

const Main = () => {
  const location = useLocation();

  const floatingNavPaths = [
    "/register",
    "/login",
    "/relief-goods",
    "/our-work",
  ];
  const isFloatingNav = floatingNavPaths.includes(location.pathname);
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  return (
    <div className="flex flex-col min-h-screen">
      {/* FIXED HEADER: Stays on top of everything */}
      <header className="fixed top-0 left-0 w-full z-[100] flex flex-col">
        {isFloatingNav ? (
          <NavbarTwo />
        ) : (
          <>
            {isHomePage && <ReliefTicker />}
            <Navbar />
          </>
        )}
      </header>
      <main
        className={`flex-grow ${
          isFloatingNav ? "pt-[170px]" : isHomePage ? "pt-0" : "pt-[70px]"
        }`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Main;
