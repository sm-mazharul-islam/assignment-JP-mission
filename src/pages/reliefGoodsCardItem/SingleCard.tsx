import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, HeartHandshake } from "lucide-react";

// 🎯 ১. টাইপ ডেফিনিশনে raisedAmount প্রপার্টি যুক্ত করা হয়েছে যা ডাটাবেজ থেকে আসবে
export type TPackage = {
  _id: string;
  title: string;
  category: string;
  item: string;
  amount: number; // টার্গেট গোল (Goal)
  raisedAmount?: number; // 👈 ডাটাবেজের লাইভ অনুদান ট্র্যাকিং ফিল্ড
  description: string;
  image: string;
  reason: string;
};

const SingleCard = ({
  _id,
  title,
  image,
  category,
  amount,
  raisedAmount, // 👈 ডিকনস্ট্রাকশনে রিয়েল ফিল্ড রিসিভ করা হচ্ছে
  description,
}: TPackage) => {
  // 🎯 ২. [LIVE METRIC INTERPOLATION]: সিমুলেটেড মক ডাটা বাদ দিয়ে রিয়েল ক্যালকুলেশন
  const targetAmount = amount || 0;
  const currentRaised = raisedAmount || 0; // ডাটাবেজে আগে থেকে জমা হওয়া আসল টাকা

  // পার্সেন্টেজ জেনারেটর (সর্বোচ্চ ১০০% প্রোটেকশন সহ)
  const progressPercent =
    targetAmount > 0
      ? Math.min(Math.round((currentRaised / targetAmount) * 100), 100)
      : 0;

  return (
    <div className="group relative border border-slate-200/60 rounded-[2.5rem] transition-all duration-500 hover:border-pink-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:-translate-y-2 overflow-hidden flex flex-col h-full cursor-default">
      {/* 🏷️ Top Badge Overlay (Vibrant Accented Glassmorphism) */}
      <div className="absolute top-5 left-5 z-20">
        <span className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-slate-800 text-[9px] font-black uppercase tracking-widest border border-slate-200/40 shadow-sm block">
          {category}
        </span>
      </div>

      {/* 🖼️ Image Container with Kinetic Motion */}
      <div className="relative h-64 overflow-hidden m-3 rounded-[2rem] bg-slate-50">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={title}
          src={image}
        />
        {/* Subtle Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* 📄 Content Area */}
      <div className="p-6 flex flex-col flex-grow text-left space-y-4">
        {/* Title & Badge */}
        <div className="space-y-1.5">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#fb7185] transition-colors duration-300 line-clamp-1">
            {title}
          </h2>
          <p className="text-slate-400 text-[11px] font-medium leading-relaxed line-clamp-2">
            {description ||
              "Emergency relief distribution program targeting highly vulnerable community sectors in impact nodes."}
          </p>
        </div>

        {/* 📊 [CRITICAL TRUST METRIC]: Live Progress Status Connected to MongoDB */}
        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
            <span className="text-emerald-500 flex items-center gap-1">
              <ShieldCheck size={12} /> {progressPercent}% Funded
            </span>
            <span className="text-slate-400">Target Goal</span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/10">
            <div
              className="h-full bg-gradient-to-r from-[#fb7185] via-violet-500 to-violet-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Ledger Numbers Balance (Live Data Stream) */}
          <div className="flex justify-between items-baseline pt-0.5">
            <p className="text-slate-900 font-black text-base">
              ${currentRaised}{" "}
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                Raised
              </span>
            </p>
            <p className="text-slate-500 font-bold text-xs">
              of ${targetAmount}
            </p>
          </div>
        </div>

        {/* 🚀 Interactive Footer Trigger Area */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between w-full">
          {/* Trust Badge */}
          <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
            <HeartHandshake size={16} className="text-[#fb7185]/80" />
            <span className="text-[9px] font-black uppercase tracking-widest block">
              Verified Node
            </span>
          </div>

          {/* Action Trigger Link */}
          <Link to={`/relief-goods/${_id}`} className="shrink-0">
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-xl flex items-center gap-1.5 transition-all active:scale-95 group/btn shadow-sm">
              Details
              <ArrowUpRight
                size={14}
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
