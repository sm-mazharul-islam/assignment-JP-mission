import { Outlet, useLocation } from "react-router-dom";
import Footer from "../ui/footer/Footer";
import Navbar from "../ui/Header/Navbar";
import NavbarTwo from "../ui/Header/NavbarTwo";

const Main = () => {
  const location = useLocation();

  const floatingNavPaths = ["/relief-goods", "/our-work"];

  const isFloatingNav = floatingNavPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {isFloatingNav ? <NavbarTwo /> : <Navbar />}

      <main className={`flex-grow ${isFloatingNav ? "pt-32" : "pt-0"}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Main;
