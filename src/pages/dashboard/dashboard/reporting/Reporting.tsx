import { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  //   Cell,
} from "recharts";
import {
  FileText,
  Download,
  TrendingUp,
  AlertTriangle,
  Percent,
  ArrowUpRight,
  Shield,
} from "lucide-react";

import { toast } from "sonner";
import { useGetReportingAnalyticsQuery } from "../../../../redux/api/api";

// Recharts ইন্টারনাল defaultProps অবচিত ওয়ার্নিং চিরতরে বন্ধ করার মেকানিজম
const silentConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("defaultProps")) return;
  silentConsoleError(...args);
};

interface AuditLog {
  camp: string;
  receivedStock: number;
  distributedStock: number;
  damagedStock: number;
}

interface APIResponse<T> {
  success?: boolean;
  data?: T[];
  result?: T[];
}

export default function Reporting() {
  const [reportRange, setReportRange] = useState<string>("monthly");
  const [currentUserRole, setCurrentUserRole] = useState<string>("user");

  // টোকেন থেকে রিয়েল-টাইম রোল ডিটেকশন লজিক
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
          const decoded = JSON.parse(jsonPayload);
          if (decoded.role) setCurrentUserRole(decoded.role);
        }
      } catch (error) {
        console.error("Token translation error in reporting:", error);
      }
    }
  }, []);

  // RTK Query ডাইনামিক সার্ভার ডাটা ট্রিগার
  const {
    data: analyticsData,
    isLoading,
    isError,
  } = useGetReportingAnalyticsQuery(reportRange);

  // CSV Spreadsheet Export Functionality (Type-Safe)
  const exportToCSV = (data: AuditLog[]) => {
    if (!data || data.length === 0) {
      toast.error("No active dataset detected to construct spreadsheet.");
      return;
    }
    const headers = [
      "Sector/Category,Total Inflow Stock,Distributed Packages,Attrition Damaged\n",
    ];
    const rows = data.map(
      (row) =>
        `${row.camp},${row.receivedStock},${row.distributedStock},${row.damagedStock}\n`,
    );
    const blob = new Blob([...headers, ...rows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Live_Ecosystem_Audit_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Ecosystem Spreadsheet downloaded successfully!");
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#fb7185]"></span>
      </div>
    );
  }

  if (isError || !analyticsData) {
    return (
      <div className="min-h-[200px] flex justify-center items-center bg-rose-50 border border-rose-100 rounded-2xl p-6">
        <p className="text-rose-500 font-bold text-sm">
          ⚠️ Server sync failed. Please check MongoDB aggregation routes.
        </p>
      </div>
    );
  }

  // Data Normalization Protection
  let cleanData: AuditLog[] = [];
  if (Array.isArray(analyticsData)) {
    cleanData = analyticsData;
  } else if (analyticsData && typeof analyticsData === "object") {
    const response = analyticsData as APIResponse<AuditLog>;
    if (Array.isArray(response.data)) cleanData = response.data;
    else if (Array.isArray(response.result)) cleanData = response.result;
  }

  // Matrix Calculations
  const totalReceived = cleanData.reduce(
    (acc: number, curr: AuditLog) => acc + (Number(curr.receivedStock) || 0),
    0,
  );
  const totalDistributed = cleanData.reduce(
    (acc: number, curr: AuditLog) => acc + (Number(curr.distributedStock) || 0),
    0,
  );
  const totalDamaged = cleanData.reduce(
    (acc: number, curr: AuditLog) => acc + (Number(curr.damagedStock) || 0),
    0,
  );
  const efficiencyRate =
    totalReceived > 0
      ? ((totalDistributed / totalReceived) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-8 py-2 text-left animate-fade-in">
      {/* TOP COMMAND CONTROL HEADER */}
      <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#FDA4AF]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-50 border border-rose-100">
              <span className="text-[#fb7185] font-black uppercase tracking-[0.2em] text-[9px]">
                Centralized Integrity Logs
              </span>
            </div>
            <span
              className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 ${
                currentUserRole === "admin"
                  ? "bg-slate-900 text-white"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
              }`}
            >
              <Shield size={10} />{" "}
              {currentUserRole === "admin" ? "Auditor Panel" : "Volunteer View"}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Logistics & Transparency Reports
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Real-time synchronized data sheet connecting administrators and
            field personnel seamlessly.
          </p>
        </div>

        {/* Filters and Actions triggers */}
        <div className="flex flex-wrap gap-3 items-center z-10 shrink-0">
          <select
            value={reportRange}
            onChange={(e) => setReportRange(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs px-4 py-3 rounded-2xl focus:outline-none focus:border-[#FDA4AF] cursor-pointer animate-none"
          >
            <option value="weekly">Last 7 Days</option>
            <option value="monthly">Current Month</option>
            <option value="yearly">Full Fiscal Year</option>
          </select>

          <button
            onClick={() => window.print()}
            className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all shadow-md active:scale-95"
            title="Print Audit Report"
          >
            <FileText size={18} />
          </button>
          <button
            onClick={() => exportToCSV(cleanData)}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all active:scale-95"
            title="Export Spreadsheet"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* STATS QUANTITY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
          <div className="space-y-2">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
              Net Storage Turnover
            </span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {totalReceived}{" "}
              <span className="text-xs text-slate-400 font-medium">
                / {totalDistributed} Pcs
              </span>
            </h3>
          </div>
          <div className="p-4 bg-violet-50 rounded-2xl text-violet-500">
            <TrendingUp size={22} />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
          <div className="space-y-2">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
              Coverage Efficiency
            </span>
            <h3 className="text-3xl font-black text-emerald-500 tracking-tight">
              {efficiencyRate}%
            </h3>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500">
            <Percent size={22} />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
          <div className="space-y-2">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
              Reported Attrition / Damage
            </span>
            <h3 className="text-3xl font-black text-rose-500 tracking-tight">
              {totalDamaged}{" "}
              <span className="text-xs text-rose-400 font-medium">
                Units Lost
              </span>
            </h3>
          </div>
          <div className="p-4 bg-rose-50 rounded-2xl text-[#fb7185]">
            <AlertTriangle size={22} />
          </div>
        </div>
      </div>

      {/* DUAL DATA CHARTS GRAPH PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Composed Chart Visual Container */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 min-h-[460px] flex flex-col justify-between">
          <div className="w-full text-left border-b border-slate-50 pb-4 mb-6">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Stock Inflow vs Outflow Density
            </h3>
          </div>
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={cleanData}
                margin={{ top: 10, right: -5, left: -25, bottom: 0 }}
              >
                <CartesianGrid stroke="#f8fafc" vertical={false} />
                <XAxis
                  dataKey="camp"
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
                  cursor={{ fill: "rgba(139, 92, 246, 0.02)", radius: 8 }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "11px",
                    fontWeight: "700",
                    paddingTop: "10px",
                  }}
                />
                <Bar
                  dataKey="receivedStock"
                  name="Cargo Received"
                  fill="#8B5CF6"
                  radius={[6, 6, 0, 0]}
                  barSize={14}
                />
                <Line
                  type="monotone"
                  dataKey="distributedStock"
                  name="Dispatched Securely"
                  stroke="#FF6B8B"
                  strokeWidth={3}
                  dot={{ fill: "#FF6B8B", r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Camp Ledger Ledger List */}
        <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 min-h-[460px] flex flex-col justify-between">
          <div className="w-full text-left border-b border-slate-50 pb-4 mb-4">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Ecosystem Ledger
            </h3>
          </div>
          <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[300px] pr-1">
            {cleanData.map((log: AuditLog, index: number) => (
              <div
                key={index}
                className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100/50 flex items-center justify-between hover:bg-slate-100/50 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-black text-slate-800 tracking-tight truncate max-w-[120px]">
                    {log.camp}
                  </h4>
                  <span className="text-[10px] text-rose-500 font-semibold block mt-0.5">
                    Damaged: {log.damagedStock} Pcs
                  </span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <span className="text-xs font-black text-slate-700 block">
                      {log.distributedStock}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold block">
                      /{log.receivedStock} U
                    </span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
