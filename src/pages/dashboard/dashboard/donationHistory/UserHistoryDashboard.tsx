import { jwtDecode } from "jwt-decode";
import {
  History,
  DollarSign,
  Activity,
  Calendar,
  Clock,
  Layers,
  ArrowUpRight,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useGetUserHistoryQuery } from "../../../../redux/api/api";

// 🎯 Strict Token payload schema signature
interface IDecodedToken {
  email?: string;
}

// 🎯 Strict relational mapping for individual transaction ledger items
interface TDonationLog {
  _id?: string;
  userEmail?: string;
  campaignTitle: string;
  category: string;
  amount?: number; // Direct structural value from database ledger
  donateAmount?: number; // Fallback variable key definition
  timestamp?: string;
}

const UserHistoryDashboard = () => {
  // 🔒 Step 1: Securely decode session token context to query records
  const token = localStorage.getItem("token");
  let loggedUserEmail = "anonymous@responder.node";

  if (token) {
    try {
      const decoded = jwtDecode<IDecodedToken>(token);
      if (decoded?.email) {
        loggedUserEmail = decoded.email.trim().toLowerCase();
      }
    } catch (err) {
      console.error("Dashboard identity compilation error:", err);
    }
  }

  // 📡 Step 2: Extract real-time historical ledger for this specific email node
  const {
    data: historyData = [],
    isLoading,
    isError,
  } = useGetUserHistoryQuery(loggedUserEmail, {
    skip: loggedUserEmail === "anonymous@responder.node",
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#fb7185]"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[400px] flex justify-center items-center text-rose-500 font-bold px-4 text-center">
        ⚠️ Failed to parse user ledger node arrays from server.
      </div>
    );
  }

  // 🎯 Step 3: Compute Advanced Analytics Matrices (Strictly Typed)
  const totalDonationsCount = historyData.length;

  // ✅ Fixed: Explicitly typed parameters without violating eslint 'no-explicit-any'
  const totalAmountSpent = (historyData as TDonationLog[]).reduce(
    (sum: number, log: TDonationLog) => {
      const currentAmount = log.amount || log.donateAmount || 0;
      return sum + Number(currentAmount);
    },
    0,
  );

  // Rate for Donation calculation (Average donation capacity matrix)
  const donationRate =
    totalDonationsCount > 0
      ? Math.round(totalAmountSpent / totalDonationsCount)
      : 0;

  // Slice maximum of 10 rows sorted chronologically (Latest records first)
  const sliceUpdatedTenProducts = [...(historyData as TDonationLog[])]
    .reverse()
    .slice(0, 10);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 md:space-y-10 max-w-7xl mx-auto text-left animate-fade-in">
      {/* 👑 TOP IDENTITY GREETING BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="space-y-1 z-10">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-rose-300 font-black">
            Secure Operations Control
          </p>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2">
            <UserCheck className="text-[#fb7185] shrink-0" size={26} />
            Personal Aid Ledger
          </h1>
        </div>
        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-[11px] md:text-xs font-mono max-w-full truncate z-10">
          Node-ID:{" "}
          <span className="text-rose-300 select-all">{loggedUserEmail}</span>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#fb7185] rounded-full blur-[80px] opacity-20 pointer-events-none" />
      </div>

      {/* 📊 CORE ANALYTICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Metric 1: Total Ledger Count */}
        <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Total Activities
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {totalDonationsCount}{" "}
                <span className="text-xs text-slate-400 font-bold uppercase">
                  Logs
                </span>
              </h3>
            </div>
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-rose-50 text-[#fb7185] flex items-center justify-center shrink-0">
              <History size={20} />
            </div>
          </div>
          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Layers size={12} className="text-slate-300" /> Total committed
            transaction density recorded.
          </p>
        </div>

        {/* Metric 2: Average Donation Rate */}
        <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Rate For Donation
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center">
                <DollarSign
                  className="text-violet-500 -ml-1 shrink-0"
                  size={26}
                />{" "}
                {donationRate}
                <span className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-normal ml-1">
                  / Avg Pack
                </span>
              </h3>
            </div>
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Activity size={12} className="text-violet-400 animate-pulse" />{" "}
            Efficiency density per supply allocation checkpoint.
          </p>
        </div>

        {/* Metric 3: Total Cumulative Contribution */}
        <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between relative overflow-hidden group sm:col-span-2 lg:col-span-1 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Cumulative Funding
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center">
                <DollarSign
                  className="text-emerald-500 -ml-1 shrink-0"
                  size={26}
                />{" "}
                {totalAmountSpent}
              </h3>
            </div>
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <ArrowUpRight size={14} className="text-emerald-500" /> Capital
            safely channeled into crisis zones.
          </p>
        </div>
      </div>

      {/* 📄 LEDGER HISTORY TIMELINE TABLE CONTAINER */}
      <div className="bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-50/50">
          <div className="space-y-0.5">
            <h2 className="text-base md:text-lg font-black uppercase text-slate-900 tracking-tight">
              Recent Activity Feed
            </h2>
            <p className="text-slate-400 text-xs font-medium">
              Displaying up to 10 latest updated node operations
            </p>
          </div>
          <span className="px-3 py-1 text-[9px] md:text-[10px] font-black bg-slate-200/60 rounded-full uppercase tracking-wider text-slate-600">
            Live Stream
          </span>
        </div>

        {sliceUpdatedTenProducts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium text-sm border-t border-slate-50">
            No active operational sequences recorded under this specific
            workspace node.
          </div>
        ) : (
          <div className="overflow-x-auto w-full scrollbar-thin">
            <table className="table w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-black uppercase border-b border-slate-100">
                  <th className="p-4 md:p-5 tracking-wider pl-6">
                    Campaign Details
                  </th>
                  <th className="p-4 md:p-5 tracking-wider">Classification</th>
                  <th className="p-4 md:p-5 tracking-wider">Date Node</th>
                  <th className="p-4 md:p-5 tracking-wider">Time Node</th>
                  <th className="p-4 md:p-5 tracking-wider text-right pr-6">
                    Fund Contributed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs md:text-sm font-medium text-slate-700">
                {sliceUpdatedTenProducts.map(
                  (log: TDonationLog, index: number) => {
                    const dateObj = log.timestamp
                      ? new Date(log.timestamp)
                      : new Date();
                    const verifiedDate = dateObj.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                    const verifiedTime = dateObj.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    });

                    return (
                      <tr
                        key={log._id || index}
                        className="hover:bg-slate-50/70 transition-colors group"
                      >
                        {/* Campaign Title Cell */}
                        <td className="p-4 md:p-5 font-black text-slate-900 uppercase max-w-xs truncate pl-6 group-hover:text-[#fb7185] transition-colors">
                          {log.campaignTitle}
                        </td>

                        {/* Category Classification Badge */}
                        <td className="p-4 md:p-5">
                          <span className="px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-violet-50 text-violet-600 border border-violet-100/40">
                            {log.category}
                          </span>
                        </td>

                        {/* Date Block Node */}
                        <td className="p-4 md:p-5 text-slate-500 font-semibold whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                            {verifiedDate}
                          </div>
                        </td>

                        {/* Time Block Node */}
                        <td className="p-4 md:p-5 text-slate-400 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] md:text-xs">
                            <Clock
                              size={13}
                              className="text-slate-300 shrink-0"
                            />
                            {verifiedTime}
                          </div>
                        </td>

                        {/* Amount Quantitative Ledger Display */}
                        <td className="p-4 md:p-5 text-right font-black text-emerald-600 text-sm md:text-base pr-6 whitespace-nowrap">
                          +${log.amount || log.donateAmount || 0}
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHistoryDashboard;
