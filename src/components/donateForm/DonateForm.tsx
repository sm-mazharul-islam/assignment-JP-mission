import React, { useState } from "react";
import {
  CreditCard,
  Loader2,
  DollarSign,
  ShieldCheck,
  Heart,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useInitiatePaymentMutation } from "../../redux/api/api";
import { jwtDecode } from "jwt-decode";

// 🎯 Strict Token payload schema signature
interface IDecodedToken {
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

interface IRtkQueryError {
  data?: {
    error?: string;
  };
}

export default function DonateForm() {
  const [amount, setAmount] = useState<number>(0);

  // 🔒 Step 1: Securely decode session token context
  const token = localStorage.getItem("token");
  let userEmail = "anonymous@responder.node";

  if (token) {
    try {
      const decoded = jwtDecode<IDecodedToken>(token);
      if (decoded?.email) {
        userEmail = decoded.email.trim().toLowerCase();
      }
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  }

  // 📡 Step 2: Hook up with RTK Query payment mutation node
  const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();

  // 💳 Step 3: SSLCommerz Gateway Integration Gateway Handler
  const handleSSLPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      return toast.error("Please specify a valid allocation budget.");
    }

    try {
      const response = await initiatePayment({
        id: "GENERAL_RELIEF_NODE",
        campaignId: "GENERAL_RELIEF_NODE",
        amount: Number(amount),
        email: userEmail,
        campaignTitle: "Emergency Relief Flood Pack",
      }).unwrap();

      if (response?.url) {
        window.location.replace(response.url);
      } else {
        toast.error("Gateway handshake failed.");
      }
    } catch (err: unknown) {
      const rtkError = err as IRtkQueryError;
      toast.error(
        rtkError?.data?.error ||
          "Network synchronization error during portal handshake.",
      );
    }
  };

  return (
    <div className="w-full px-4 py-8 flex justify-center items-center">
      {/* 🚀 PREMIUM GLOSS LAYOUT FORM CONTAINER */}
      <form
        onSubmit={handleSSLPayment}
        className="relative w-full max-w-sm bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 text-left shadow-2xl space-y-6 overflow-hidden group transition-all duration-500 hover:shadow-[0_40px_80px_rgba(251,113,133,0.06)]"
      >
        {/* PREMIUM BACKGROUND BLUR ACCENTS */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-rose-400/5 rounded-full blur-3xl group-hover:bg-rose-400/10 transition-colors duration-700 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-violet-400/5 rounded-full blur-3xl group-hover:bg-violet-400/10 transition-colors duration-700 pointer-events-none" />

        {/* 🏆 HEADER SEGMENT NODE */}
        <div className="space-y-2 relative border-b border-slate-50 pb-4">
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-[#fb7185] text-[9px] font-black uppercase tracking-[0.15em] flex items-center gap-1">
              <ShieldCheck size={10} /> Secure Node
            </span>
            <Sparkles
              className="text-amber-400 animate-pulse shrink-0"
              size={16}
            />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2 pt-1">
            <CreditCard size={20} className="text-[#fb7185] stroke-[2.5]" />{" "}
            Secure Gateway
          </h3>
          <p className="text-slate-400 text-[11px] font-medium truncate">
            Active Identity:{" "}
            <span className="font-mono text-slate-600 font-bold select-all">
              {userEmail}
            </span>
          </p>
        </div>

        {/* 💵 INPUT QUANTITATIVE MATRIX SEGMENT */}
        <div className="space-y-1.5 relative">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
            Amount Allocation (BDT)
          </label>
          <div className="relative rounded-2xl bg-slate-50 border border-slate-200 focus-within:border-[#FDA4AF] focus-within:bg-white transition-all shadow-inner group/input">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#fb7185] transition-colors">
              <DollarSign size={16} className="stroke-[2.5]" />
            </div>
            <input
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full bg-transparent text-slate-800 text-sm font-black pl-10 pr-4 py-4 focus:outline-none placeholder-slate-300 tracking-tight"
              min="1"
              required
            />
          </div>
          <span className="text-[9px] text-slate-400 font-medium pl-1 block">
            * Fully integrated with SSLCommerz centralized banking protocol.
          </span>
        </div>

        {/* 🔘 ACTION GATEWAY BUTTON TRIGGER */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-slate-950/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
        >
          {isLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Handshaking...
            </>
          ) : (
            <>
              Proceed to Gateway
              <Heart
                size={13}
                className="fill-white stroke-none group-hover/btn:scale-125 transition-transform duration-300"
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
