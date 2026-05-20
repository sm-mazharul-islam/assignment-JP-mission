import { useParams } from "react-router-dom";

import { useState } from "react";

import DetailsQuestion from "../../components/ui/detailsQuestion/DetailsQuestion";

import { toast } from "sonner";

import { jwtDecode } from "jwt-decode"; // 🎯 JWT Decoder

import {
  ShieldCheck,
  Tag,
  DollarSign,
  Quote,
  HelpCircle,
  ArrowRight,
  HeartHandshake,
  Info,
  CheckCircle2,
  X,
  Loader2,
} from "lucide-react";

import {
  useGetReliefGoodsByIdQuery,
  useInitiatePaymentMutation, // 🎯 SSLCommerz পেমেন্ট ইনিশিয়েট হুক যুক্ত করা হলো
} from "../../redux/api/api";

// 🎯 টোকেনের ভেতরের ইমেইল অবজেক্ট টাইপ ডিক্লেয়ারেশন

interface IDecodedToken {
  email?: string;

  exp?: number;

  iat?: number;
}

// 🎯 RTK Query এরর রেসপন্সের টাইপ সেফগার্ড

// interface IRtkQueryError {

//   data?: {

//     error?: string;

//   };

// }

const AllReliefGoodsDetail = () => {
  const { id } = useParams();

  const [customAmount, setCustomAmount] = useState<number>(10);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 📡 ১. RTK Query দিয়ে নির্দিষ্ট রিলিফ গুডসের লাইভ ডাটা রিড করা

  const {
    data: reliefGoods,

    isLoading,

    isError,
  } = useGetReliefGoodsByIdQuery(id);

  // 📡 ২. ডোনেশন পেমেন্ট গেটওয়ে গেট ট্রিপল-হ্যান্ডশেক ট্রিগার হুক

  const [initiatePayment, { isLoading: isDonating }] =
    useInitiatePaymentMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#fb7185]"></span>
      </div>
    );
  }

  if (isError || !reliefGoods) {
    return (
      <div className="min-h-[400px] flex justify-center items-center text-rose-500 font-bold">
        ⚠️ Failed to load relief package details.
      </div>
    );
  }

  const targetAmount = reliefGoods?.amount || reliefGoods?.data?.amount || 0;

  const raisedAmount =
    reliefGoods?.raisedAmount || reliefGoods?.data?.raisedAmount || 0;

  const campaignTitle =
    reliefGoods?.title || reliefGoods?.data?.title || "Relief Package Aid";

  const campaignCategory =
    reliefGoods?.category || reliefGoods?.data?.category || "General Aid";

  // কত টাকা আর বাকি আছে তা হিসাব করা

  const remainingAmount = targetAmount - raisedAmount;

  // লাইভ প্রোগ্রেস পার্সেন্টেজ জেনারেটর

  const progressPercent =
    targetAmount > 0
      ? Math.min(Math.round((raisedAmount / targetAmount) * 100), 100)
      : 0;

  // ফান্ড কি ফুল ফিলাপ হয়েছে কিনা চেক করা

  const isFullyFunded = raisedAmount >= targetAmount && targetAmount > 0;

  // 🎯 ৪. লোকাল স্টোরেজের টোকেন থেকে সরাসরি ইমেইল ডিকোড করা

  const token = localStorage.getItem("token");

  let loggedUserEmail = "anonymous@responder.node"; // ডিফল্ট ফলব্যাক মেইল

  if (token) {
    try {
      const decoded = jwtDecode<IDecodedToken>(token);

      if (decoded?.email) {
        loggedUserEmail = decoded.email.trim().toLowerCase(); // 👈 সফলভাবে আসল ইমেইল রিসিভ হলো
      }
    } catch (err) {
      console.error("Token decoding operational flaw:", err);
    }
  }

  const handleDonationSubmit = async () => {
    if (isFullyFunded) {
      setIsModalOpen(true);

      return;
    }

    if (customAmount <= 0) {
      toast.error("Please enter a valid donation amount.");

      return;
    }

    if (customAmount > remainingAmount) {
      toast.error(
        `Over-budget alert! You can only donate up to $${remainingAmount}.`,
      );

      return;
    }

    try {
      // 🚀 এবার এপিআই টাইপ ম্যাচ করায় এখানে কোনো এরর দেখাবে না

      const response = await initiatePayment({
        id: id as string, // 🎯 টাইপ কাস্টিং সেফগার্ড

        amount: customAmount,

        email: loggedUserEmail,

        campaignTitle: campaignTitle,
      }).unwrap();

      if (response?.url) {
        window.location.replace(response.url);
      } else {
        toast.error("Gateway handshake failed.");
      }
    } catch (err: unknown) {
      console.error("Ledger mutation error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-20 text-left relative">
      {/* 🚀 MAIN CONTENT GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* 🖼️ LEFT ASPECT: IMAGE VIEWPORT */}

        <div className="w-full lg:col-span-5 lg:sticky lg:top-28 lg:h-fit">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#fb7185] to-violet-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

            <div className="relative bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src={reliefGoods?.image || reliefGoods?.data?.image}
                className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                alt="Relief Package Node"
              />

              <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/50 flex items-center gap-2 shadow-sm">
                <ShieldCheck className="text-emerald-500" size={18} />

                <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">
                  Verified Aid Node
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 📄 RIGHT ASPECT: DETAILS & ACTIONS */}

        <div className="w-full lg:col-span-7 space-y-10">
          {/* Header & Category */}

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-4 py-1 rounded-full bg-rose-50 border border-rose-100 text-[#fb7185] text-[10px] font-black uppercase tracking-[0.2em]">
                {campaignCategory}
              </span>

              <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <Tag size={12} /> ID: {id?.slice(-6)}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              {campaignTitle}
            </h1>
          </div>

          {/* THANK YOU MESSAGE SECTION */}

          {isFullyFunded && (
            <div className="p-6 rounded-[2rem] bg-emerald-50 border-2 border-emerald-200/80 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2.5 text-emerald-600">
                <CheckCircle2 size={24} className="shrink-0" />

                <h3 className="text-xl font-black uppercase tracking-tight">
                  Mission Accomplished!
                </h3>
              </div>

              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Thank you so much to all our incredible sponsors! The target
                goal for this specific relief node has been fully achieved. Your
                immense generosity triggers the immediate dispatch and
                deployment of these vital supplies to families in the impact
                zone.
              </p>
            </div>
          )}

          {/* 📊 IMPACT & FUNDING MATRIX */}

          <div className="p-8 rounded-[2.5rem] border border-slate-200/60 bg-slate-50/30 space-y-6">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Target Requirements
                </p>

                <p className="text-4xl font-black text-slate-900 flex items-center">
                  <DollarSign className="text-[#fb7185]" size={28} />{" "}
                  {targetAmount}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`text-2xl font-black ${isFullyFunded ? "text-emerald-500" : "text-violet-600"}`}
                >
                  {progressPercent}%
                </p>

                <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest text-right">
                  Funded Density
                </p>
              </div>
            </div>

            {/* Live Progress Bar */}

            <div className="w-full h-3 bg-slate-200/50 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${isFullyFunded ? "from-emerald-400 to-emerald-600" : "from-[#fb7185] via-violet-500 to-violet-600"} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Live Counter Display */}

            <div className="flex justify-between items-center text-xs font-bold pt-0.5">
              <p className="text-slate-900">
                ${raisedAmount}{" "}
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Raised
                </span>
              </p>

              <p className="text-slate-400">of ${targetAmount}</p>
            </div>

            {/* LIVE REMAINING BUDGET BALANCE */}

            {!isFullyFunded && (
              <div className="text-[11px] font-bold text-slate-500 bg-white/60 border border-slate-200/40 px-4 py-2 rounded-xl w-fit flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Only{" "}
                <span className="text-[#fb7185] font-black">
                  ${remainingAmount}
                </span>{" "}
                more needed to complete this operation node.
              </div>
            )}

            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium border-t border-slate-100/80 pt-3">
              <Info size={14} className="text-violet-500" />

              <span>
                Directly benefiting over 15+ families in high-impact crisis
                nodes.
              </span>
            </div>
          </div>

          {/* Description & Manifest */}

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
                Package Manifest
              </h3>

              <p className="text-slate-500 text-base leading-relaxed font-medium">
                {reliefGoods?.description || reliefGoods?.data?.description}
              </p>
            </div>

            {/* Quote/Reason Section */}

            <div className="relative p-8 border-l-4 border-[#fb7185] bg-rose-50/30 rounded-r-3xl">
              <Quote
                className="absolute top-4 right-6 text-rose-100"
                size={40}
              />

              <p className="text-slate-700 italic font-medium leading-relaxed relative z-10">
                "{reliefGoods?.reason || reliefGoods?.data?.reason}"
              </p>
            </div>
          </div>

          {/* 🔘 ACTION GATEWAYS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {/* Donate/Help Card */}

            <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <HeartHandshake size={20} />
                </div>

                <h4 className="font-black text-sm uppercase text-slate-900">
                  Sponsor This Aid
                </h4>

                <p className="text-[11px] text-slate-400 font-medium">
                  Cover the requirements for this package and trigger immediate
                  deployment via secure gateway.
                </p>

                {/* Amount Input Box */}

                <div className="relative mt-2">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                    $
                  </span>

                  <input
                    type="number"
                    value={customAmount || ""}
                    disabled={isFullyFunded}
                    max={remainingAmount}
                    onChange={(e) =>
                      setCustomAmount(Number(e.target.value) || 0)
                    }
                    min="1"
                    className="w-full bg-slate-50 border border-slate-200/80 focus:border-violet-400 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* DONATION BUTTON LAYER */}

              {isFullyFunded ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-2xl transition-all cursor-pointer mt-4"
                >
                  Fully Funded (Check Status)
                </button>
              ) : (
                <button
                  onClick={handleDonationSubmit}
                  disabled={isDonating}
                  className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                >
                  {isDonating ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Connecting
                      Gateway...
                    </>
                  ) : (
                    `Proceed to Pay $${customAmount || 0}`
                  )}
                </button>
              )}
            </div>

            {/* Request/Apply Card */}

            <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#fb7185] flex items-center justify-center">
                  <Info size={20} />
                </div>

                <h4 className="font-black text-sm uppercase text-slate-900">
                  Request Assistance
                </h4>

                <p className="text-[11px] text-slate-400 font-medium">
                  Are you a responder representing this node? Submit a formal
                  request.
                </p>
              </div>

              <button className="w-full border border-slate-900 text-slate-900 font-bold text-xs uppercase tracking-widest py-4 rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95 mt-auto">
                Apply for Aid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 💬 Q&A SECTION */}

      <div className="mt-24 pt-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
              <HelpCircle size={24} />
            </div>

            <h2 className="text-3xl font-black text-slate-900 uppercase leading-none">
              Inquiries & <br /> Clarifications
            </h2>

            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Have questions regarding the logistics, items, or deployment
              timeline? Our verified node administrators are ready to assist.
            </p>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <textarea
              placeholder="Enter your inquiry regarding this specific relief package..."
              className="w-full h-32 bg-slate-50 border border-slate-200 focus:border-violet-400 rounded-3xl p-6 text-sm font-medium focus:outline-none transition-colors"
            ></textarea>

            <div className="flex justify-end mt-4">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl flex items-center gap-2 shadow-lg shadow-violet-200 active:scale-95 transition-all">
                Submit Inquiry <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <DetailsQuestion />
        </div>
      </div>

      {/* FULL FUNDED POP-UP MODAL CONTAINER */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] max-w-md w-full p-6 md:p-8 shadow-2xl relative space-y-6 transform scale-100 transition-all text-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Full Fund Received!
              </h3>

              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                This relief operation is already 100% funded. We are no longer
                accepting financial logs for this specific node. Please explore
                our other active campaigns to support families in need!
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all active:scale-95 shadow-sm"
            >
              Back to Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReliefGoodsDetail;
