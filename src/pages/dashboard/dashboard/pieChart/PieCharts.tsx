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
import {
  Users,
  DollarSign,
  Box,
  ArrowUpRight,
  ShieldAlert,
  Heart,
} from "lucide-react";
import {
  useGetAllUsersQuery,
  useGetReliefGoodsQuery,
  useGetAllUsersHistoryQuery,
  UserAccount,
  TDonationLog,
} from "../../../../redux/api/api";

// 🎯 Recharts ইন্টারনাল defaultProps ওয়ার্নিং সাপ্রেস করার মেকানিজম
const silentConsoleError = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("defaultProps")) return;
  silentConsoleError(...args);
};

// Premium Bento Theme Luxurious Palette
const COLORS = [
  "#8B5CF6", // Deep Violet
  "#FF6B8B", // Rose Pink
  "#3B82F6", // Electric Blue
  "#10B981", // Emerald Green
  "#F59E0B", // Amber Gold
  "#EC4899", // Neon Pink
  "#06B6D4", // Cyber Cyan
];

interface ReliefGood {
  _id?: string;
  id?: string | number;
  title: string;
  category: string;
  amount: number | string;
  raisedAmount?: number | string;
  description: string;
  image: string;
}

interface APIResponse<T> {
  success?: boolean;
  data?: T[];
  result?: T[];
}

interface IBarChartItem {
  name: string;
  amount: number;
}

const PieCharts = () => {
  // 📡 RTK Query Central Live API Nodes
  const {
    data: reliefGoods,
    isLoading: goodsLoading,
    isError: goodsError,
  } = useGetReliefGoodsQuery(undefined);
  const {
    data: globalHistory,
    isLoading: historyLoading,
    isError: historyError,
  } = useGetAllUsersHistoryQuery();
  const {
    data: systemUsers,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUsersQuery(undefined);

  if (goodsLoading || historyLoading || usersLoading) {
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
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 min-h-[460px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (goodsError || historyError || usersError) {
    return (
      <div className="min-h-[200px] flex justify-center items-center bg-rose-50 border border-rose-100 rounded-2xl p-6">
        <p className="text-rose-500 font-bold text-sm">
          ⚠️ Server Synchronization Failure. Please verify MongoDB architecture
          or RTK query tags.
        </p>
      </div>
    );
  }

  // 🛡️ Data Sanitization Layer
  let goodsData: ReliefGood[] = [];
  if (Array.isArray(reliefGoods)) {
    goodsData = reliefGoods;
  } else if (reliefGoods && typeof reliefGoods === "object") {
    const response = reliefGoods as APIResponse<ReliefGood>;
    if (Array.isArray(response.data)) goodsData = response.data;
    else if (Array.isArray(response.result)) goodsData = response.result;
  }

  let usersData: UserAccount[] = [];
  if (Array.isArray(systemUsers)) {
    usersData = systemUsers;
  } else if (systemUsers && typeof systemUsers === "object") {
    const response = systemUsers as APIResponse<UserAccount>;
    if (Array.isArray(response.data)) usersData = response.data;
    else if (Array.isArray(response.result)) usersData = response.result;
  }

  // 🔒 ফিল্টারিং: শুধুমাত্র PAID ট্রানজেকশনগুলো আলাদা করা হলো
  const validPaidLogs = (globalHistory || []).filter(
    (log: TDonationLog) => log.status === "PAID",
  );

  // 📊 ডাইনামিক পাই চার্ট ডাটা ম্যাপিং
  const pieChartData = goodsData
    .map((item, idx) => ({
      name: item.title,
      value: Number(item.raisedAmount || 0),
      fill: COLORS[idx % COLORS.length],
    }))
    .filter((item) => item.value > 0);

  // মোট প্লাটফর্ম কালেকশন সামেশন
  const platformTotalInflow = validPaidLogs.reduce(
    (sum, log) => sum + (Number(log.amount) || 0),
    0,
  );
  const totalRegisteredUsers = usersData.length;
  const totalUniqueCampaigns = goodsData.length;

  // 📈 বার চার্ট প্রসেসিং: শেষ ৫টি লেটেস্ট ট্রানজেকশনের গ্রাফিকাল ভেলোসিটি ভিউ
  const barChartData: IBarChartItem[] = validPaidLogs
    .slice(0, 5)
    .reverse()
    .map((log) => ({
      name: log.transactionId.slice(0, 8),
      amount: Number(log.amount) || 0,
    }));

  const finalBarChartData =
    barChartData.length > 0
      ? barChartData
      : [
          { name: "Node Alpha", amount: 0 },
          { name: "Node Beta", amount: 0 },
        ];

  return (
    <div className="space-y-8 py-2">
      {/* 👑 TOP MASTER CONTROL BANNER */}
      <div className="relative text-left bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-md overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#FDA4AF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-[#FDA4AF] font-black uppercase tracking-[0.2em] text-[9px] flex items-center gap-1">
              <ShieldAlert size={12} /> Root Administrative Command Hub
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            System Logistics Dashboard
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Unified control center tracking gross inflows, product-scope
            funding, and global validation streams.
          </p>
        </div>
        <div className="flex gap-2 items-center shrink-0 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
            Live Synchronized Ledger
          </span>
        </div>
      </div>

      {/* 📊 BENTO SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Gross Platform Inflow */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform text-left">
          <div className="space-y-1">
            <span className="text-slate-400 text-xs font-black uppercase tracking-wider block">
              Cumulative System Inflow
            </span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight flex items-center">
              <DollarSign
                size={24}
                className="text-emerald-500 -ml-1 shrink-0"
              />
              {platformTotalInflow}
            </h3>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500">
            <ArrowUpRight size={24} />
          </div>
        </div>

        {/* Card 2: Total Active Campaigns */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform text-left">
          <div className="space-y-1">
            <span className="text-slate-400 text-xs font-black uppercase tracking-wider block">
              Ecosystem Node Tracks
            </span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {totalUniqueCampaigns}{" "}
              <span className="text-xs text-slate-400 font-bold uppercase">
                Campaigns
              </span>
            </h3>
          </div>
          <div className="p-4 bg-violet-50 rounded-2xl text-violet-500">
            <Box size={24} />
          </div>
        </div>

        {/* Card 3: Registered Users Counter */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform text-left">
          <div className="space-y-1">
            <span className="text-slate-400 text-xs font-black uppercase tracking-wider block">
              Verified Core Profiles
            </span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {totalRegisteredUsers}{" "}
              <span className="text-xs text-slate-400 font-bold uppercase">
                Accounts
              </span>
            </h3>
          </div>
          <div className="p-4 bg-rose-50 rounded-2xl text-[#fb7185]">
            <Users size={24} />
          </div>
        </div>
      </div>

      {/* 📈 DUAL CHARTS ACCENT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 🎨 Left Side: Live Donation Revenue Share (Pie) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-between min-h-[460px] hover:shadow-md transition-all duration-500 group">
          <div className="w-full text-left border-b border-slate-50 pb-4 mb-2">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Donation Capital Allocation
            </h3>
            <p className="text-slate-400 text-[11px] font-medium mt-0.5">
              Proportional distribution of capital safely loaded into campaign
              vaults.
            </p>
          </div>

          <div className="w-full h-[280px] relative flex items-center justify-center">
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={pieChartData}
                    cx="50%"
                    cy="45%"
                    innerRadius="68%"
                    outerRadius="90%"
                    paddingAngle={4}
                    stroke="none"
                    // 🎯 ফিক্স নোড ১: অবচিত এরর সৃষ্টিকারী 'expandOnHover' প্রপটি বাদ দেওয়া হলো
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        className="cursor-pointer focus:outline-none transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      borderRadius: "1rem",
                      color: "#fff",
                      border: "none",
                      fontSize: "11px",
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.3)",
                    }}
                    itemStyle={{ color: "#FDA4AF" }}
                    // 🎯 ফিক্স নোড ২: অব্যবহৃত 'props' সরিয়ে শুধু রিকোয়ার্ড প্যারামিটার রাখা হলো (eslint ফিক্স)
                    formatter={(value: number, name: string) => [
                      `$${value} Injected`,
                      `${name}`,
                    ]}
                  />
                  <Legend
                    iconType="circle"
                    verticalAlign="bottom"
                    iconSize={8}
                    wrapperStyle={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: "#64748b",
                      paddingTop: "15px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <span className="text-slate-400 text-xs font-black uppercase tracking-widest">
                No Funds Channeled Yet
              </span>
            )}

            <div className="absolute inset-0 m-auto w-24 h-24 flex flex-col items-center justify-center pointer-events-none translate-y-[-8px]">
              <span className="text-slate-400 text-[8px] font-bold uppercase tracking-widest">
                Aggregate
              </span>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-violet-600 to-emerald-500 tracking-tighter">
                ${platformTotalInflow}
              </span>
              <span className="text-slate-400 text-[8px] font-bold uppercase">
                Revenue
              </span>
            </div>
          </div>
        </div>

        {/* 📊 Right Side: Dynamic Bar Chart mapped to Transaction Blocks */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 min-h-[460px] hover:shadow-md transition-all duration-500 flex flex-col justify-between">
          <div className="w-full text-left border-b border-slate-50 pb-4 mb-6">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Inflow Velocity Stream
            </h3>
            <p className="text-slate-400 text-[11px] font-medium mt-0.5">
              Time-series tracking the cash volume of the last 5 transaction
              hashes.
            </p>
          </div>

          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={finalBarChartData}
                margin={{ top: 25, right: 10, left: -25, bottom: 10 }}
                barSize={16}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                    fontWeight: "800",
                    fontFamily: "monospace",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(15, 23, 42, 0.02)", radius: 10 }}
                  contentStyle={{
                    background: "#0f172a",
                    borderRadius: "1rem",
                    color: "#fff",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.3)",
                  }}
                  formatter={(value: number) => [
                    `$${value}`,
                    "Amount Received",
                  ]}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#adminDashboardGlow)"
                  radius={[8, 8, 0, 0]}
                  label={{
                    position: "top",
                    fill: "#64748b",
                    fontSize: 10,
                    fontWeight: "800",
                    formatter: (v: number) => (v > 0 ? `$${v}` : ""),
                  }}
                />
                <defs>
                  <linearGradient
                    id="adminDashboardGlow"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                    <stop
                      offset="100%"
                      stopColor="#FF6B8B"
                      stopOpacity={0.35}
                    />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 📝 BOTTOM SECTION: LIVE SECURED TRANSACTION STRINGS & OPERATIONAL ACCOUNT ACCESS LEVELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        {/* 1. Live Paid Transactions History Cluster */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-800">
                Latest System Inflows
              </h3>
              <p className="text-slate-400 text-[10px]">
                Real-time cryptographic confirmation records pooling from global
                accounts.
              </p>
            </div>
            <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2.5 py-1 rounded-xl">
              Live Audit Feed
            </span>
          </div>
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
            {validPaidLogs.length > 0 ? (
              validPaidLogs
                .slice(0, 5)
                .map((log: TDonationLog, idx: number) => (
                  <div
                    key={log._id || idx}
                    className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                        <Heart size={16} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate max-w-[170px] sm:max-w-xs uppercase">
                          {log.campaignTitle || "General Fund Allocation"}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono block truncate">
                          Txn: {log.transactionId}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-black text-emerald-600 shrink-0">
                      +${log.amount}
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-xs text-slate-400 py-12 text-center font-medium">
                No verified audit records inside this scope.
              </p>
            )}
          </div>
        </div>

        {/* 2. Central Profiles Gateways Access List */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-800">
                Operational Gateways
              </h3>
              <p className="text-slate-400 text-[10px]">
                Ecosystem encryption tokens and structural identity access level
                logs.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-xl">
              Live Accounts
            </span>
          </div>
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
            {usersData.length > 0 ? (
              usersData.map((usr: UserAccount, index: number) => (
                <div
                  key={usr._id || index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FDA4AF] to-[#fb7185] text-white flex items-center justify-center text-[10px] font-black shrink-0 uppercase">
                      {(usr.name || "US").substring(0, 2)}
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {usr.name || "Anonymous User"}
                      </h4>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[160px] sm:max-w-xs font-mono">
                        {usr.email}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shrink-0 ${usr.role === "admin" ? "bg-rose-50 text-[#fb7185] border border-rose-100" : "bg-slate-200 text-slate-600"}`}
                  >
                    {usr.role || "user"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-12 text-center font-medium">
                No active identity records found inside system files.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
