import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Award,
  ShieldCheck,
  Flame,
  //   HeartHandshake,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useGetReliefGoodsQuery } from "../../../../redux/api/api";

// 🎯 Recharts ইন্টারনাল defaultProps অবচিত ওয়ার্নিং চিরতরে বন্ধ করার মেকানিজম
const silentConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("defaultProps")) return;
  silentConsoleError(...args);
};

// Premium Cozy Palette for User Experience
const COLORS = ["#FF6B8B", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"];

interface ReliefGood {
  _id?: string;
  id?: string | number;
  title: string;
  category: string;
  amount: number | string;
  description: string;
  image: string;
}

interface APIResponse<T> {
  success?: boolean;
  data?: T[];
  result?: T[];
}

const UserPieCharts = () => {
  // 🎯 RTK Query থেকে গ্লোবাল ডাটা রিসিভ (পরবর্তীতে ইউজারের পার্সোনাল ট্র্যাকিং ম্যাপের জন্য)
  const {
    data: reliefGoods,
    isLoading,
    isError,
  } = useGetReliefGoodsQuery(undefined);

  if (isLoading) {
    return (
      <div className="space-y-8 py-4 animate-pulse">
        <div className="h-28 bg-slate-100 rounded-[2.5rem] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="bg-white border border-slate-100 min-h-[400px] rounded-[2.5rem]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !reliefGoods) {
    return (
      <div className="min-h-[200px] flex justify-center items-center bg-rose-50 border border-rose-100 rounded-2xl p-6">
        <p className="text-rose-500 font-bold text-sm">
          ⚠️ Failed to load your personalized contribution token.
        </p>
      </div>
    );
  }

  // 🛡️ Data Guard
  let goodsData: ReliefGood[] = [];
  if (Array.isArray(reliefGoods)) {
    goodsData = reliefGoods;
  } else if (reliefGoods && typeof reliefGoods === "object") {
    const response = reliefGoods as APIResponse<ReliefGood>;
    if (Array.isArray(response.data)) goodsData = response.data;
    else if (Array.isArray(response.result)) goodsData = response.result;
  }

  // ইউজার স্পেসিফিক কন্ট্রিবিউশন ডামি ক্যালকুলেশন (লাইভ ডাটার সামঞ্জস্য রেখে)
  const userContributedItems = goodsData.slice(0, 3).map((item, idx) => ({
    name: item.title,
    value: Math.floor((Number(item.amount) || 10) * 0.3), // ইউজার ৩০% কন্ট্রিবিউট করেছে ডামি লজিক
    fill: COLORS[idx % COLORS.length],
  }));

  const totalUserContributions = userContributedItems.reduce(
    (acc, curr) => acc + curr.value,
    0,
  );

  // 📈 ওয়ার্ক প্রোগ্রেস টাইমলাইন চার্ট ডাটা
  const progressTimeline = [
    { name: "Week 1", operations: 2, packages: 5 },
    { name: "Week 2", operations: 4, packages: 12 },
    { name: "Week 3", operations: 7, packages: totalUserContributions - 8 },
    { name: "Week 4", operations: 9, packages: totalUserContributions },
  ];

  return (
    <div className="space-y-8 py-2">
      {/* 👑 USER WELCOME BANNER (BENTO ACCENT) */}
      <div className="relative text-left bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-xl overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FDA4AF] to-[#fb7185] flex items-center justify-center text-white shadow-lg shadow-rose-500/20 shrink-0">
            <Award size={28} className="animate-bounce" />
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 mb-1.5 rounded-md bg-white/10 border border-white/10">
              <span className="text-[#FDA4AF] font-black uppercase tracking-[0.15em] text-[8px]">
                Volunteer Command Profile
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Welcome back, Human Agent!
            </h2>
            <p className="text-slate-400 text-xs mt-0.5 font-medium">
              Thank you for making a difference. Here is your operational
              progress report.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center shrink-0">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider">
              Verified Responder
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
            <Flame size={14} className="text-amber-400" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider">
              14 Days Streak
            </span>
          </div>
        </div>
      </div>

      {/* 📊 CORE OPERATIONAL PROGRESS SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 🎨 1. Your Contribution Shares (Pie) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.01)] border border-slate-100 flex flex-col items-center justify-between min-h-[460px] group transition-all hover:shadow-[0_30px_70px_rgba(251,113,133,0.04)]">
          <div className="w-full text-left border-b border-slate-50 pb-4">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Your Supply Shares
            </h3>
            <p className="text-slate-400 text-[11px] font-medium">
              Proportion of packages personally distributed by you.
            </p>
          </div>

          <div className="w-full h-[240px] relative flex items-center justify-center my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userContributedItems}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="68%"
                  outerRadius="90%"
                  paddingAngle={4}
                  stroke="none"
                >
                  {userContributedItems.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      className="focus:outline-none cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    borderRadius: "1rem",
                    color: "#fff",
                    border: "none",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#FDA4AF" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Center Count */}
            <div className="absolute inset-0 m-auto w-24 h-24 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                Handed Over
              </span>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-violet-500 tracking-tighter">
                {totalUserContributions}
              </span>
              <span className="text-slate-400 text-[9px] font-semibold">
                Packages
              </span>
            </div>
          </div>

          {/* Mini Labels Grid */}
          <div className="w-full grid grid-cols-2 gap-2 border-t border-slate-50 pt-3">
            {userContributedItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[11px] font-bold text-slate-600 truncate"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="truncate">
                  {item.name}: {item.value} Pcs
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 📈 2. Work Performance Velocity (Area Chart) */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.01)] border border-slate-100 min-h-[460px] flex flex-col justify-between transition-all hover:shadow-[0_30px_70px_rgba(139,92,246,0.04)]">
          <div className="w-full text-left border-b border-slate-50 pb-4 mb-4">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Work Progress Velocity
            </h3>
            <p className="text-slate-400 text-[11px] font-medium">
              Timeline metrics reflecting your weekly execution growth.
            </p>
          </div>

          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={progressTimeline}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="userGlowArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f8fafc"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: "700" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    borderRadius: "1rem",
                    color: "#fff",
                    border: "none",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="packages"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#userGlowArea)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 📋 USER TASK LOGIC & REWARDS TRACKER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Active Assignments Checklist */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-800">
                Your Action Register
              </h3>
              <p className="text-slate-400 text-[10px]">
                Assigned logistics tasks and validation statuses.
              </p>
            </div>
            <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2.5 py-1 rounded-xl">
              Personal Log
            </span>
          </div>

          <div className="space-y-3.5">
            {[
              {
                task: "Verify package batch #091 for Dhaka Slum camp",
                status: "Completed",
                time: "2 hours ago",
                done: true,
              },
              {
                task: "Allocate 5 Gallons clean water tokens to Area B",
                status: "Completed",
                time: "Yesterday",
                done: true,
              },
              {
                task: "Update distribution audit logs in /supplies gate",
                status: "Pending Action",
                time: "Awaiting",
                done: false,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3.5 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`p-1.5 rounded-xl shrink-0 ${item.done ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"}`}
                  >
                    {item.done ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Clock size={16} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4
                      className={`text-xs font-bold truncate ${item.done ? "text-slate-500 line-through" : "text-slate-800"}`}
                    >
                      {item.task}
                    </h4>
                    <span className="text-[9px] text-slate-400 block font-medium mt-0.5">
                      {item.time}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${item.done ? "bg-emerald-100/60 text-emerald-600" : "bg-amber-100/60 text-amber-600"}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Honor Badge Milestones */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-800">
                Earned Endorsements
              </h3>
              <p className="text-slate-400 text-[10px]">
                Ecosystem badges unlocked via rescue operations.
              </p>
            </div>
            <span className="text-[10px] font-black text-violet-500 bg-violet-50 px-2.5 py-1 rounded-xl">
              Badges
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              {
                name: "First Responder",
                desc: "1st Mission done",
                icon: "🌱",
                active: true,
              },
              {
                name: "Life Saver",
                desc: "Distributed 20+ Pcs",
                icon: "💖",
                active: true,
              },
              {
                name: "Camp Commander",
                desc: "Reach 100+ stock",
                icon: "👑",
                active: false,
              },
            ].map((badge, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center transition-all ${badge.active ? "bg-slate-50/50 border-slate-100 hover:bg-slate-50" : "bg-slate-50/20 border-dashed border-slate-200 opacity-40 select-none"}`}
              >
                <span className="text-2xl mb-1.5 block">{badge.icon}</span>
                <h4 className="text-[10px] font-black text-slate-800 leading-tight tracking-tight">
                  {badge.name}
                </h4>
                <p className="text-[8px] text-slate-400 mt-0.5 font-medium">
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPieCharts;
