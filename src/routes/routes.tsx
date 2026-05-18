// import { createBrowserRouter } from "react-router-dom";
// import Main from "../components/layout/Main";

// // import Login from "../pages/login/Login";
// import Register from "../pages/Register";
// import AllReliefGoods from "../pages/AllReliefGoods";
// import Home from "../pages/home/home/Home";

// import OurWorks from "../pages/ourWork/ourWorks";
// import AllReliefGoodsDetail from "../pages/reliefGoodsCardItem/AllReliefGoodsDetail";
// import AllSupply from "../pages/dashboard/dashboard/allsupply/AllSupply";
// import AddSupply from "../pages/dashboard/dashboard/addsupply/AddSupply";
// import Login from "../pages/login/Login";
// import PieCharts from "../pages/dashboard/dashboard/pieChart/PieCharts";
// import NotFoundPage from "../pages/notfound/NotFoundPage";
// import { EditSupplyWrapper } from "../lib/EditSupplyWrapper";
// import AddReview from "../pages/dashboard/dashboard/addReview/AddReview";
// import Dashboard from "../pages/dashboard/dashboard/Dashboard";
// import CalenderPage from "../pages/dashboard/dashboard/calender/Calender";

// const router = createBrowserRouter([
//   {
//     path: "*",
//     element: <NotFoundPage />,
//   },
//   {
//     path: "/",
//     element: <Main></Main>,
//     children: [
//       {
//         path: "/",
//         element: <Home></Home>,
//       },
//       {
//         path: "/relief-goods",
//         element: <AllReliefGoods></AllReliefGoods>,
//       },
//       {
//         path: "/login",
//         element: <Login></Login>,
//       },
//       {
//         path: "/register",
//         element: <Register></Register>,
//       },
//       {
//         path: "/our-work",
//         element: <OurWorks></OurWorks>,
//       },
//       {
//         path: "/relief-goods/:id",
//         element: <AllReliefGoodsDetail></AllReliefGoodsDetail>,
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//     children: [
//       {
//         path: "supplies",
//         element: <AllSupply />,
//       },
//       {
//         path: "create-supply",
//         element: <AddSupply />,
//       },
//       {
//         path: "calender",
//         element: <CalenderPage />,
//       },
//       {
//         path: "add-review",
//         element: <AddReview />,
//       },
//       {
//         index: true,
//         element: <PieCharts />,
//       },
//       {
//         path: "edit-supply/:id",
//         element: <EditSupplyWrapper />,
//       },
//     ],
//   },

//   // element: (
//   //   <PrivateRoute>
//   //     <Dashboard></Dashboard>
//   //   </PrivateRoute>
//   // ),
// ]);
// export default router;
//!
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
import ProtectedRoute from "./ProtectedRoute"; // ✅ আমাদের তৈরি করা গার্ডটি ইমপোর্ট করো

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
    // 🔐 COMMON PROTECTION: টোকেন না থাকলে কেউ ড্যাশবোর্ডের কোনো পেজে ঢুকতে পারবে না
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

      /* ==========================================
         🔵 USER ROUTES (Common for Both Admin & User)
         ========================================== */
      {
        path: "calender",
        element: <CalenderPage />,
      },
      {
        path: "add-review",
        element: <AddReview />,
      },
      {
        index: true,
        element: <PieCharts />,
      },
    ],
  },
]);

export default router;
