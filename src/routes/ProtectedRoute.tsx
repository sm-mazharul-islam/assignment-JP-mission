import { Navigate, useLocation } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdminRoute?: boolean;
}

export default function ProtectedRoute({
  children,
  isAdminRoute = false,
}: ProtectedRouteProps) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const user = JSON.parse(window.atob(base64));

    // 🔴 ডিবাগিং এর জন্য: ব্রাউজার কনসোলে চেক করো 'role' ঠিকঠাক প্রিন্ট হচ্ছে কিনা
    console.log("Current Logged In User Payload:", user);

    if (isAdminRoute && user.role !== "admin") {
      console.log("❌ Admin route blocked! User role is:", user.role);
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
