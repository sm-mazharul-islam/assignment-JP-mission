import { Navigate, useLocation } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdminRoute?: boolean;
  isUserRoute?: boolean; // 🎯 সাধারণ ইউজার রাউট ট্র্যাক করার Fresh প্রপার্টি
}

export default function ProtectedRoute({
  children,
  isAdminRoute = false,
  isUserRoute = false, // 🎯 ডিফল্ট ভ্যালু ফলব্যাক সেট করা হলো false
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

    // 🛡️ অ্যাডমিন রাউট প্রোটেকশন গেটওয়ে
    if (isAdminRoute && user.role !== "admin") {
      console.log("❌ Admin route blocked! User role is:", user.role);
      return <Navigate to="/dashboard" replace />;
    }

    // 🛡️ 🎯 [THE CORE FIX]: ইউজার এক্সক্লুসিভ রাউট প্রোটেকশন গেটওয়ে
    // যদি রাউটটি শুধু সাধারণ ইউজারের জন্য হয় (isUserRoute === true) এবং লগইন করা ব্যক্তি যদি অ্যাডমিন হয়, তবে তাকে ব্লক করবে
    if (isUserRoute && user.role === "admin") {
      console.log("❌ User route blocked for Admin! Redirecting back...");
      return <Navigate to="/dashboard" replace />; // অ্যাডমিনকে ড্যাশবোর্ডের মেইন রুটে পাঠিয়ে দেবে
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
