import { createBrowserRouter } from "react-router-dom";
import Main from "../components/layout/Main";

// import Login from "../pages/login/Login";
import Register from "../pages/Register";
import AllReliefGoods from "../pages/AllReliefGoods";
import Home from "../pages/home/home/Home";
import DashboardHome from "../pages/dashboard/dashboard/DashboardHome";

import OurWorks from "../pages/ourWork/ourWorks";
import AllReliefGoodsDetail from "../pages/reliefGoodsCardItem/AllReliefGoodsDetail";
import AllSupply from "../pages/dashboard/dashboard/allsupply/AllSupply";
import AddSupply from "../pages/dashboard/dashboard/addsupply/AddSupply";
import Login from "../pages/login/Login";
import PieCharts from "../pages/dashboard/dashboard/pieChart/PieCharts";
import EditSupply from "../pages/dashboard/dashboard/editsupply/EditSupply";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/relief-goods",
        element: <AllReliefGoods></AllReliefGoods>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/our-work",
        element: <OurWorks></OurWorks>,
      },
      {
        path: "/relief-goods/:id",
        element: <AllReliefGoodsDetail></AllReliefGoodsDetail>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardHome />,
    children: [
      {
        path: "supplies",
        element: <AllSupply />,
      },
      {
        path: "create-supply",
        element: <AddSupply />,
      },
      {
        path: "pie-chart",
        element: <PieCharts />,
      },
      {
        path: "edit-supply",
        element: <EditSupply />,
      },
    ],
  },

  // element: (
  //   <PrivateRoute>
  //     <Dashboard></Dashboard>
  //   </PrivateRoute>
  // ),
]);
export default router;
