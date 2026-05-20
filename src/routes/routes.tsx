import { createBrowserRouter } from "react-router-dom";
import Main from "../components/layout/Main";
import Register from "../pages/Register";
import AllReliefGoods from "../pages/AllReliefGoods";
import Home from "../pages/home/home/Home";
import OurWorks from "../pages/ourWork/ourWorks";
import AllReliefGoodsDetail from "../pages/reliefGoodsCardItem/AllReliefGoodsDetail";
import AllSupply from "../pages/dashboard/dashboard/allsupply/AllSupply";
import AddSupply from "../pages/dashboard/dashboard/addsupply/AddSupply";
import Login from "../pages/login/Login";
import PieCharts from "../pages/dashboard/dashboard/pieChart/PieCharts";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import { EditSupplyWrapper } from "../lib/EditSupplyWrapper";
import AddReview from "../pages/dashboard/dashboard/addReview/AddReview";
import Dashboard from "../pages/dashboard/dashboard/Dashboard";
import CalenderPage from "../pages/dashboard/dashboard/calender/Calender";
import ProtectedRoute from "./ProtectedRoute";
import Reporting from "../pages/dashboard/dashboard/reporting/Reporting";
import HelpSection from "../pages/dashboard/dashboard/help/Help";
import SettingsSection from "../pages/dashboard/dashboard/settings/Settings";
import AboutPage from "../pages/about/About";
import UserHistoryDashboard from "../pages/dashboard/dashboard/donationHistory/UserHistoryDashboard";
import AdminHistoryDashboard from "../pages/dashboard/dashboard/donationHistory/AdminHistoryDashboard";
import { AllReviewPage } from "../pages/dashboard/dashboard/allReview/page";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
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
        path: "/about",
        element: <AboutPage></AboutPage>,
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
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      /* ==========================================
         🔴 ADMIN EXCLUSIVE ROUTES (Admins Only)
         ========================================== */
      {
        path: "supplies",
        element: (
          <ProtectedRoute isAdminRoute={true}>
            <AllSupply />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-supply",
        element: (
          <ProtectedRoute isAdminRoute={true}>
            <AddSupply />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-supply/:id",
        element: (
          <ProtectedRoute isAdminRoute={true}>
            <EditSupplyWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-review",
        element: (
          <ProtectedRoute isAdminRoute={true}>
            <AllReviewPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "all-user-history",
        element: (
          <ProtectedRoute isAdminRoute={true}>
            <AdminHistoryDashboard />
          </ProtectedRoute>
        ),
      },

      /* ==========================================
         🔵 USER ROUTES (Common for Both Admin & User)
         ========================================== */

      {
        path: "history",
        element: (
          <ProtectedRoute isUserRoute={true}>
            <UserHistoryDashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "calender",
        element: <CalenderPage />,
      },
      {
        path: "add-review",
        element: <AddReview />,
      },
      {
        path: "reporting",
        element: <Reporting />,
      },
      {
        path: "help",
        element: <HelpSection />,
      },
      {
        path: "setting",
        element: <SettingsSection />,
      },
      {
        index: true,
        element: <PieCharts />,
      },
    ],
  },
]);

export default router;
