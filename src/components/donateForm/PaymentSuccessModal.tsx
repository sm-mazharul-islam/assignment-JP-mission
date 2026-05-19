import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowRight, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti"; // Optional: npm install canvas-confetti (গর্জিয়াস ইফেক্টের জন্য)

const PaymentSuccessModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL Query Parameter থেকে পেমেন্ট স্ট্যাটাস ট্র্যাক করা
  const paymentStatus = searchParams.get("payment_status");
  const transactionId = searchParams.get("txn");

  useEffect(() => {
    if (paymentStatus === "success") {
      setIsOpen(true);

      // 🎉 পপ-আপ খোলার সাথে সাথে গর্জিয়াস কনফেটি ড্রপ ইফেক্ট ট্রিগার হবে
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#fb7185", "#8b5cf6", "#10b981"],
        });
      } catch (err) {
        console.log("Confetti asset skipped.");
      }
    }
  }, [paymentStatus]);

  const handleCloseAndNavigate = () => {
    setIsOpen(false);
    navigate("/dashboard"); // ইউজারকে ড্যাশবোর্ডে নিয়ে যাবে
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fade-in">
      {/* 🚀 MAIN PREMIUM CARD CONTAINER */}
      <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] p-8 text-center shadow-2xl space-y-6 overflow-hidden group">
        {/* BACKGROUND GLOWS */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-rose-400/10 rounded-full blur-3xl group-hover:bg-rose-400/20 transition-colors duration-700"></div>
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-violet-400/10 rounded-full blur-3xl group-hover:bg-violet-400/20 transition-colors duration-700"></div>

        {/* 🏆 ICON BLOCK WITH RADIAL IMPACT */}
        <div className="relative w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner animate-bounce">
          <CheckCircle2 size={44} className="stroke-[2.5]" />
          <Sparkles
            className="absolute -top-1 -right-1 text-amber-400 animate-pulse"
            size={20}
          />
          <Heart
            className="absolute bottom-0 -left-1 text-rose-400 animate-pulse"
            size={16}
          />
        </div>

        {/* 📝 CONGRATULATIONS VERBIAGE LAYER */}
        <div className="space-y-3">
          <span className="px-4 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">
            Transaction Secured
          </span>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none pt-2">
            Congratulations & <br /> Thank You!
          </h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed px-2">
            Your generous financial allocation has been successfully recorded
            into the secure ledger network. By standing with us today, you have
            brought immediate relief, hope, and vital lifelines to families
            living within high-impact crisis zones.
          </p>
        </div>

        {/* 🔢 TRANSACTION INFRASTRUCTURE BOX */}
        {transactionId && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 text-left space-y-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
              Verified Ledger Reference
            </span>
            <p className="text-xs font-mono font-bold text-slate-700 tracking-tight break-all">
              {transactionId}
            </p>
          </div>
        )}

        {/* 🔘 ACTION GATEWAY BUTTON */}
        <button
          onClick={handleCloseAndNavigate}
          className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-slate-950/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
        >
          Go to Dashboard
          <ArrowRight
            size={14}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
