import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Users, Briefcase, Box, Heart } from "lucide-react";
import {
  useGetRecentWorksQuery,
  useGetReliefGoodsQuery,
} from "../../../../redux/api/api";

// 🎯 Recharts ইন্টারনাল defaultProps অবচিত ওয়ার্নিং চিরতরে বন্ধ করার মেকানিজম
const silentConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("defaultProps")) return;
  silentConsoleError(...args);
};

// Premium Bento Theme Vibrant Palette
const COLORS = [
  "#FF6B8B",
  "#8B5CF6",
  "#EC4899",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#06B6D4",
];

interface ReliefGood {
  _id?: string;
  id?: string | number;
  title: string;
  category: string;
  amount: number | string;
  description: string;
  image: string;
}

interface RecentWork {
  _id?: string;
  title: string;
  location?: string;
  budget?: number | string;
}

// 🎯 RTK Query রেসপন্স অবজেক্ট ফরম্যাট হ্যান্ডেল করার জন্য কাস্টম ইন্টারফেস
interface APIResponse<T> {
  success?: boolean;
  data?: T[];
  result?: T[];
}

interface TooltipPayload {
  payload: ReliefGood;
  value: number;
  dataKey: string;
  name: string;
  color: string;
  fill: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

// 👑 Premium Dark Glassmorphic Tooltip
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 max-w-[260px] md:max-w-xs transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={
              item.image ||
              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150"
            }
            alt={item.title}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/20"
          />
          <div className="min-w-0">
            <p className="text-sm font-bold text-white tracking-tight truncate">
              {item.title}
            </p>
            <span className="inline-block px-2 py-0.5 mt-1 rounded-md bg-white/10 text-[#FDA4AF] text-[9px] font-black uppercase tracking-widest">
              {item.category}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-1">
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
            Quantity
          </span>
          <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            {item.amount} Pcs
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const PieCharts = () => {
  // 🎯 RTK Query API Integrations
  const {
    data: reliefGoods,
    isLoading: goodsLoading,
    isError: goodsError,
  } = useGetReliefGoodsQuery(undefined);
  const {
    data: recentWorks,
    isLoading: worksLoading,
    isError: worksError,
  } = useGetRecentWorksQuery(undefined);

  // 💎 Premium Glow Skeleton Loading Animation
  if (goodsLoading || worksLoading) {
    return (
      <div className="space-y-8 py-4 animate-pulse">
        <div className="h-28 bg-slate-100 rounded-[2.5rem] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 bg-slate-100 rounded-3xl w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 min-h-[460px] flex flex-col justify-between items-center"
            />
          ))}
        </div>
      </div>
    );
  }

  if (goodsError || worksError) {
    return (
      <div className="min-h-[200px] flex justify-center items-center bg-rose-50 border border-rose-100 rounded-2xl p-6">
        <p className="text-rose-500 font-bold text-sm">
          ⚠️ Server Synchronization Error. Please verify MongoDB connection or
          RTK Tags.
        </p>
      </div>
    );
  }

  // 🛡️ Data Sanitization & Fallback Guard (স্পেলিং এরর ফিক্সড)
  let goodsData: ReliefGood[] = [];
  if (Array.isArray(reliefGoods)) {
    goodsData = reliefGoods;
  } else if (reliefGoods && typeof reliefGoods === "object") {
    const response = reliefGoods as APIResponse<ReliefGood>;
    if (Array.isArray(response.data)) goodsData = response.data;
    else if (Array.isArray(response.result)) goodsData = response.result;
  }

  let worksData: RecentWork[] = [];
  if (Array.isArray(recentWorks)) {
    worksData = recentWorks;
  } else if (recentWorks && typeof recentWorks === "object") {
    const response = recentWorks as APIResponse<RecentWork>;
    if (Array.isArray(response.data)) worksData = response.data;
    else if (Array.isArray(response.result)) worksData = response.result;
  }

  const formattedGoods: ReliefGood[] = goodsData.map((item: ReliefGood) => ({
    ...item,
    amount: Number(item.amount) || 0,
  }));

  // Analytical Metrics Calculations
  const totalSuppliesCount = formattedGoods.reduce(
    (acc: number, curr: ReliefGood) => acc + (Number(curr.amount) || 0),
    0,
  );
  const totalRecentWorksCount = worksData.length;
  const totalRegisteredUsers = 12;

  return (
    <div className="space-y-8 py-2">
      {/* 👑 TOP BANNER BENOT ACCENT */}
      <div className="relative text-left bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#FDA4AF]/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-rose-50 border border-rose-100">
            <span className="text-[#fb7185] font-black uppercase tracking-[0.2em] text-[9px]">
              RTK Query Core Control Hub
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            System Logistics Dashboard
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Unified center live syncing distributed stocks, camp operations, and
            ecosystem status.
          </p>
        </div>
        <div className="flex gap-2 items-center shrink-0 bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Synced Live with Tag ["supplies"]
          </span>
        </div>
      </div>

      {/* 📊 BENTO SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Total Supplies */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-transform duration-300">
          <div className="space-y-2">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
              Total Supply Stock
            </span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {totalSuppliesCount}{" "}
              <span className="text-xs text-slate-400 font-medium">Units</span>
            </h3>
          </div>
          <div className="p-4 bg-rose-50 rounded-2xl text-[#fb7185]">
            <Box size={24} />
          </div>
        </div>

        {/* Card 2: Recent Works */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-transform duration-300">
          <div className="space-y-2">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
              Deployment Missions
            </span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {totalRecentWorksCount}{" "}
              <span className="text-xs text-slate-400 font-medium">
                Projects
              </span>
            </h3>
          </div>
          <div className="p-4 bg-violet-50 rounded-2xl text-violet-500">
            <Briefcase size={24} />
          </div>
        </div>

        {/* Card 3: Users */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-transform duration-300">
          <div className="space-y-2">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
              Registered Access Tokens
            </span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {totalRegisteredUsers}{" "}
              <span className="text-xs text-slate-400 font-medium">
                Profiles
              </span>
            </h3>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500">
            <Users size={24} />
          </div>
        </div>
      </div>

      {/* 📈 DUAL GRAPHS PANEL SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 🎨 Pie Chart Card */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-center justify-between min-h-[460px] hover:shadow-[0_30px_70px_rgba(251,113,133,0.05)] transition-all duration-500 group">
          <div className="w-full text-left border-b border-slate-50 pb-4 mb-2">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Distribution Volumetrics
            </h3>
            <p className="text-slate-400 text-[11px] font-medium mt-0.5">
              Proportional tracking across emergency sectors.
            </p>
          </div>

          <div className="w-full h-[260px] relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="amount"
                  isAnimationActive={true}
                  data={formattedGoods}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="88%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {formattedGoods.map((item: ReliefGood, index: number) => (
                    <Cell
                      key={item._id || index}
                      fill={COLORS[index % COLORS.length]}
                      className="cursor-pointer focus:outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "#64748b",
                    paddingTop: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Absolute Indicators */}
            <div className="absolute inset-0 m-auto w-24 h-24 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Aggregate
              </span>
              <span className="text-xl font-black text-slate-800 tracking-tighter">
                {totalSuppliesCount}
              </span>
              <span className="text-slate-400 text-[9px] font-semibold">
                Units
              </span>
            </div>
          </div>
        </div>

        {/* 📊 Modern Bar Chart Card */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 min-h-[460px] hover:shadow-[0_30px_70px_rgba(139,92,246,0.05)] transition-all duration-500 flex flex-col justify-between">
          <div className="w-full text-left border-b border-slate-50 pb-4 mb-6">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Itemized Density Metrics
            </h3>
            <p className="text-slate-400 text-[11px] font-medium mt-0.5">
              Granular stock volume graph per token asset.
            </p>
          </div>

          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedGoods}
                margin={{ top: 10, right: 10, left: -25, bottom: 40 }}
                barSize={13}
              >
                <CartesianGrid
                  strokeDasharray="0 0"
                  stroke="#f8fafc"
                  vertical={false}
                />
                <XAxis
                  dataKey="title"
                  tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: "700" }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(251, 113, 133, 0.02)", radius: 8 }}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#premiumOverviewGlow)"
                  radius={[7, 7, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="premiumOverviewGlow"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FF6B8B" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 📝 BOTTOM SECTION: DEPLOYMENTS & OPERATIONAL ACCOUNTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Recent Works Deployment Table */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-800">
                Deployment Missions
              </h3>
              <p className="text-slate-400 text-[10px]">
                Active disaster recovery and supply chains tracing.
              </p>
            </div>
            <span className="text-[10px] font-bold text-violet-500 bg-violet-50 px-2.5 py-1 rounded-xl">
              Live Sync
            </span>
          </div>
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
            {worksData.length > 0 ? (
              worksData.map((work: RecentWork, idx: number) => (
                <div
                  key={work._id || idx}
                  className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500">
                      <Heart size={16} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate max-w-[180px] md:max-w-xs">
                        {work.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {work.location || "National Target"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-700 shrink-0">
                    ${work.budget || "Active"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No operational missions found in database.
              </p>
            )}
          </div>
        </div>

        {/* 2. Operational User Accounts */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-800">
                Operational Gateways
              </h3>
              <p className="text-slate-400 text-[10px]">
                Ecosystem encryption tokens and access levels.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-xl">
              Security Node
            </span>
          </div>
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
            {[
              {
                name: "S M Mazharul Islam Masum",
                email: "masum@gmail.com",
                role: "admin",
              },
              {
                name: "Test Administrator",
                email: "test1@gmail.com",
                role: "admin",
              },
              {
                name: "General User Access",
                email: "test2@gmail.com",
                role: "user",
              },
            ].map((usr, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FDA4AF] to-[#fb7185] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    {usr.name.substring(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {usr.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[160px] sm:max-w-xs">
                      {usr.email}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shrink-0 ${usr.role === "admin" ? "bg-rose-50 text-[#fb7185]" : "bg-slate-200 text-slate-600"}`}
                >
                  {usr.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
