import { Outlet } from "react-router-dom";

import Footer from "../ui/footer/Footer";
import Navbar from "../ui/Header/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>

      {/* <Footer></Footer> */}
    </div>
  );
};

export default Main;
