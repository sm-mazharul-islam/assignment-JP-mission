import { Outlet } from "react-router-dom";
// import DashboardHome from "../../pages/dashboard/dashboard/DashboardHome";

const DashboardLayout = () => {
  return (
    <div>
      {/* <DashboardHome></DashboardHome> */}
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
