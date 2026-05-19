import { useState, useEffect } from "react";
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
  Copy,
  Check,
  Eye,
  X,
  Fingerprint,
} from "lucide-react";
import {
  useGetUserHistoryQuery,
  TDonationLog,
} from "../../../../redux/api/api";

interface IDecodedToken {
  email?: string;
}

const UserHistoryDashboard = () => {
  const [loggedUserEmail, setLoggedUserEmail] = useState<string>("");
  const [selectedLog, setSelectedLog] = useState<TDonationLog | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 🔒 Step 1: Securely decode session token context
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
          const decoded = JSON.parse(jsonPayload) as IDecodedToken;
          if (decoded?.email) {
            setLoggedUserEmail(decoded.email.trim().toLowerCase());
          }
        }
      } catch (err) {
        console.error("Dashboard identity compilation error:", err);
      }
    }
  }, []);

  // 📡 Step 2: Extract real-time historical ledger for this specific email node
  const {
    data: historyData = [],
    isLoading,
    isError,
  } = useGetUserHistoryQuery(loggedUserEmail, {
    skip: !loggedUserEmail,
  });

  // 📋 Copy to Clipboard Handler
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

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

  // 🎯 Step 3: Compute Advanced Analytics Matrices
  const totalDonationsCount = historyData.length;

  const totalAmountSpent = (historyData as TDonationLog[]).reduce(
    (sum: number, log: TDonationLog) => {
      const currentAmount = log.amount || 0;
      return sum + Number(currentAmount);
    },
    0,
  );

  const donationRate =
    totalDonationsCount > 0
      ? Math.round(totalAmountSpent / totalDonationsCount)
      : 0;

  const sliceUpdatedTenProducts = (historyData as TDonationLog[]).slice(0, 10);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 md:space-y-10 max-w-7xl mx-auto text-left animate-fade-in relative">
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
          <span className="text-rose-300 select-all">
            {loggedUserEmail || "anonymous@responder.node"}
          </span>
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
            <table className="table w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-black uppercase border-b border-slate-100">
                  <th className="p-4 md:p-5 tracking-wider pl-6">
                    Campaign Details
                  </th>
                  <th className="p-4 md:p-5 tracking-wider">Classification</th>
                  <th className="p-4 md:p-5 tracking-wider">Date Node</th>
                  <th className="p-4 md:p-5 tracking-wider">Time Node</th>
                  <th className="p-4 md:p-5 tracking-wider text-center">
                    Verification
                  </th>
                  <th className="p-4 md:p-5 tracking-wider text-right pr-6">
                    Action Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs md:text-sm font-medium text-slate-700">
                {sliceUpdatedTenProducts.map(
                  (log: TDonationLog, index: number) => {
                    const dateObj = log.createdAt
                      ? new Date(log.createdAt)
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

                    const unsafeLog = log as unknown as Record<string, unknown>;
                    const categoryText =
                      typeof unsafeLog.category === "string"
                        ? (unsafeLog.category as string)
                        : "General Relief";

                    return (
                      <tr
                        key={log._id || index}
                        className="hover:bg-slate-50/70 transition-colors group"
                      >
                        {/* Campaign Title */}
                        <td className="p-4 md:p-5 font-black text-slate-900 uppercase max-w-xs truncate pl-6 group-hover:text-[#fb7185] transition-colors">
                          {log.campaignTitle || "Unknown Campaign"}
                        </td>

                        {/* Classification Category */}
                        <td className="p-4 md:p-5">
                          <span className="px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-violet-50 text-violet-600 border border-violet-100/40">
                            {categoryText}
                          </span>
                        </td>

                        {/* Date Node */}
                        <td className="p-4 md:p-5 text-slate-500 font-semibold whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                            {verifiedDate}
                          </div>
                        </td>

                        {/* Time Node */}
                        <td className="p-4 md:p-5 text-slate-400 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] md:text-xs">
                            <Clock
                              size={13}
                              className="text-slate-300 shrink-0"
                            />
                            {verifiedTime}
                          </div>
                        </td>

                        {/* Ledger Status Indicator */}
                        <td className="p-4 md:p-5 text-center whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest ${log.status === "PAID" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}
                          >
                            {log.status || "PENDING"}
                          </span>
                        </td>

                        {/* Amount & Inspector Action Gateway */}
                        <td className="p-4 md:p-5 text-right pr-6 whitespace-nowrap space-x-3">
                          <span className="font-black text-emerald-600 text-sm md:text-base inline-block vertical-middle">
                            +${log.amount || 0}
                          </span>
                          <button
                            onClick={() => setSelectedLog(log)}
                            className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-widest"
                          >
                            <Eye size={12} />
                            View
                          </button>
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

      {/* 🚀 LAYER 4: PREMIUM GLASSMORPHISM LEDGER DETAIL MODAL CLUSTER */}
      {selectedLog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-lg bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-2xl space-y-6 overflow-hidden text-left">
            {/* Top Indicator Accent Decorator */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-400 via-violet-500 to-emerald-400" />

            {/* Modal Header Row */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                  <Fingerprint size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-slate-900 tracking-tight">
                    Audit Node Inspector
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Secured Central Infrastructure Record
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full bg-slate-50 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Core Segment Layout Block */}
            <div className="space-y-4 text-xs md:text-sm font-semibold text-slate-700">
              {/* Campaign Scope Title Row */}
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                  Target Campaign Title
                </span>
                <p className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 font-black text-slate-900 uppercase">
                  {selectedLog.campaignTitle}
                </p>
              </div>

              {/* Transaction ID Cryptographic Node (Fully Copy-Free Infrastructure) */}
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                  Transaction Hash (Verified)
                </span>
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-950 font-mono text-rose-300 text-xs break-all shadow-inner relative group">
                  <span className="flex-1 select-all pr-8 tracking-tight font-bold">
                    {selectedLog.transactionId}
                  </span>
                  <button
                    onClick={() => handleCopyText(selectedLog.transactionId)}
                    className="absolute right-2 p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all active:scale-95 cursor-pointer"
                    title="Copy Transaction Hash"
                  >
                    {copiedId === selectedLog.transactionId ? (
                      <Check size={12} className="text-emerald-400" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                </div>
              </div>

              {/* Grid Metadata Row: Campaign ID & User Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Core Asset Key (_id)
                  </span>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 font-mono text-[11px] text-slate-600 break-all">
                    {selectedLog._id}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Authorized Node Agent
                  </span>
                  <div
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-slate-800 font-mono text-[11px] truncate"
                    title={selectedLog.email}
                  >
                    {selectedLog.email}
                  </div>
                </div>
              </div>

              {/* Grid Flow Row: Amount - Status - Time Stamps */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Capital Injected
                  </span>
                  <p className="text-xl font-black text-emerald-600">
                    ${selectedLog.amount}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Ledger Status
                  </span>
                  <span className="inline-block mt-1 px-2.5 py-0.5 text-[9px] font-black rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-widest">
                    {selectedLog.status}
                  </span>
                </div>
                <div className="space-y-0.5 col-span-2 sm:col-span-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Settlement Time
                  </span>
                  <p className="text-[11px] font-mono text-slate-500 mt-1 font-bold">
                    {selectedLog.paidAt
                      ? new Date(selectedLog.paidAt).toLocaleTimeString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Primary Exit Gateway Button */}
            <button
              onClick={() => setSelectedLog(null)}
              className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-2xl transition-all shadow-md active:scale-[0.99] cursor-pointer"
            >
              Dismiss Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHistoryDashboard;
