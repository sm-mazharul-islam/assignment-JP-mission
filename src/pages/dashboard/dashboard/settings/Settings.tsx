import React, { useState, useEffect } from "react";
import { User, Shield, Key, Save, Mail } from "lucide-react";
import { toast } from "sonner";
import { useUpdateUserProfileMutation } from "../../../../redux/api/api";

interface DecodedUser {
  name: string;
  email: string;
  role: string;
}

export default function SettingsSection() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [password, setPassword] = useState<string>("");

  // RTK Query Profile Update Mutation Hook
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  // 🎯 ১. পেজ লোড হওয়ার সাথে সাথে লোকাল স্টোরেজের টোকেন ডিকোড করে ফর্ম ফিলাপ করা
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        if (base64Url) {
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            window
              .atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join(""),
          );
          const decoded: DecodedUser = JSON.parse(jsonPayload);

          if (decoded.name) setName(decoded.name);
          if (decoded.email) setEmail(decoded.email);
          if (decoded.role) setRole(decoded.role);
        }
      } catch (error) {
        console.error("Settings profile token loading error:", error);
      }
    }
  }, []);

  // 🎯 ২. ডাইনামিক ফর্ম সাবমিশন এবং গ্লোবাল স্টেট আপডেট হ্যান্ডলার
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Profile moniker/name cannot be empty.");
      return;
    }

    try {
      // ব্যাকেন্ড এপিআই কল করা হচ্ছে
      const response = await updateUserProfile({
        name: name.trim(),
        currentEmail: email, // ডাটাবেজে ইউজার খোঁজার ট্র্যাকিং আইডি
        password: password.trim() !== "" ? password : undefined, // পাসওয়ার্ড দিলে যাবে, না দিলে যাবে না
      }).unwrap();

      if (response.success && response.token) {
        // 🎯 [CRITICAL STEP]: নতুন জেনারেটেড টোকেনটি লোকাল স্টোরেজে রিপ্লেস করা হলো যেন সাইডবার ও ড্যাশবোর্ড লাইভ সিঙ্ক হয়
        localStorage.setItem("token", response.token);
        toast.success(
          "Identity metadata synced successfully! Reloading environment...",
        );
        setPassword("");

        // ড্যাশবোর্ডের লেআউট এবং সাইডবার অ্যাভাটার ইনস্ট্যান্ট আপডেট করার জন্য ১ সেকেন্ড পর পেজ অটো-রিলোড হবে
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.error("Profile mutation failure:", err);
      toast.error(
        "Failed to re-authenticate credentials or save modifications.",
      );
    }
  };

  return (
    <div className="space-y-8 py-2 text-left animate-fade-in">
      {/* 👑 TOP BRANDING ACCENT BANNER */}
      <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm overflow-hidden flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#FDA4AF]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-rose-50 border border-rose-100">
            <span className="text-[#fb7185] font-black uppercase tracking-[0.2em] text-[9px]">
              Secure Encryption Profile
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Account & Identity Settings
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Modify your public responder moniker, monitor clearance level, or
            hash security keys.
          </p>
        </div>
        <div className="p-4 bg-rose-50 rounded-2xl text-[#fb7185] shrink-0 self-start sm:self-center shadow-sm">
          <User size={24} />
        </div>
      </div>

      {/* 📊 BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Input Mutation Box (8 Columns Wide) */}
        <form
          onSubmit={handleProfileUpdate}
          className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6"
        >
          <div className="text-left border-b border-slate-50 pb-4 mb-2">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Identity Matrix
            </h3>
            <p className="text-slate-400 text-[11px] font-medium mt-0.5">
              Keep your credentials updated to ensure proper logging in relief
              sheets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Input Name Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Moniker / Public Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] focus:bg-white text-xs font-bold text-slate-700 px-4 py-3.5 pl-12 rounded-2xl focus:outline-none transition-colors"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            {/* Read-Only Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Core Identity Token (Email)
              </label>
              <div className="relative opacity-60 cursor-not-allowed">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-500 px-4 py-3.5 pl-12 rounded-2xl focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Password Input Field */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Cryptographic Key Shift (New Password)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                <Key size={16} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] focus:bg-white text-xs font-bold text-slate-700 px-4 py-3.5 pl-12 rounded-2xl focus:outline-none transition-colors"
                placeholder="Leave blank if you do not wish to modify security hashes"
              />
            </div>
          </div>

          {/* Form Trigger Button */}
          <div className="flex justify-end border-t border-slate-50 pt-4 mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <Save size={14} /> Commit Changes
                </>
              )}
            </button>
          </div>
        </form>

        {/* Right Card: Clearance Level Info (4 Columns Wide) */}
        <div className="lg:col-span-4 bg-slate-900 text-white p-6 md:p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden border border-slate-800 min-h-[360px] flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-[#FDA4AF] flex items-center justify-center">
              <Shield size={20} />
            </div>
            <h3 className="text-lg font-black tracking-tight text-white leading-snug">
              Ecosystem Clearance Level
            </h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Your security clearance index is hardlocked via the centralized
              server node. Email mutations or authority scaling require
              secondary admin encryption overrides.
            </p>
          </div>

          {/* Active Role Indicator Card */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-widest">
                Active Scope Role
              </span>
              <span className="text-xs font-black text-[#FDA4AF] uppercase tracking-wider block mt-0.5">
                {role} Token Node
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
