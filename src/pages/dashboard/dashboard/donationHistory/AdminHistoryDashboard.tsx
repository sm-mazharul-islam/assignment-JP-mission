import { useState } from "react";
import {
  History,
  DollarSign,
  Calendar,
  Layers,
  ArrowUpRight,
  Users,
  ShieldAlert,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Fingerprint,
  Copy,
  Check,
} from "lucide-react";
// 🎯 এপিআই স্লাইস থেকে সরাসরি অফিশিয়াল 'TDonationLog' টাইপটি ইম্পোর্ট করা হলো
import {
  useGetAllUsersHistoryQuery,
  TDonationLog,
} from "../../../../redux/api/api";

const AdminHistoryDashboard = () => {
  // 📡 Step 1: Extract real-time centralized data ledger from server nodes
  const {
    data: globalHistory = [],
    isLoading,
    isError,
  } = useGetAllUsersHistoryQuery();

  // 🎛️ Step 2: Search, Filter, Pagination & Modal States
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedLog, setSelectedLog] = useState<TDonationLog | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const itemsPerPage = 10;

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
        ⚠️ Failed to parse centralized user ledger nodes from server.
      </div>
    );
  }

  // 📋 Copy to Clipboard Infrastructure Handler
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 🎯 Step 3: Extract Unique Categories dynamically for the selection dropdown
  const categoriesList = [
    "All",
    ...new Set(
      globalHistory.map((log: TDonationLog) => {
        const unsafeLog = log as unknown as Record<string, unknown>;
        return typeof unsafeLog.category === "string"
          ? unsafeLog.category
          : "General Relief";
      }),
    ),
  ];

  // 🔍 Step 4: Apply Search, Filter Transformations and Chronological Sorting (Latest First)
  const filteredHistory = globalHistory.filter((log: TDonationLog) => {
    const targetEmail = log.email || "";
    const targetTitle = log.campaignTitle || "";

    const matchesSearch =
      targetEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      targetTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const unsafeLog = log as unknown as Record<string, unknown>;
    const logCategory =
      typeof unsafeLog.category === "string"
        ? unsafeLog.category
        : "General Relief";
    const matchesCategory =
      selectedCategory === "All" || logCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 📊 Step 5: Compute Advanced Administrative Matrices Based on Active Dataset
  const totalSystemTransactions = filteredHistory.length;

  const totalGlobalFunded = filteredHistory.reduce(
    (sum: number, log: TDonationLog) => {
      const currentAmount = log.amount || 0;
      return sum + Number(currentAmount);
    },
    0,
  );

  const uniqueDonorsCount = new Set(
    filteredHistory.map((log: TDonationLog) => log.email?.trim().toLowerCase()),
  ).size;

  // 📑 Step 6: Client Side Pagination Layout Slicing
  const totalPages = Math.ceil(totalSystemTransactions / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedHistory = filteredHistory.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 md:space-y-10 max-w-7xl mx-auto text-left animate-fade-in relative">
      {/* 👑 TOP MASTER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="space-y-1 z-10">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-amber-400 font-black flex items-center gap-1">
            <ShieldAlert size={12} /> Global Root Administration
          </p>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2">
            Centralized System Ledger
          </h1>
        </div>
        <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-[11px] md:text-xs font-mono text-amber-400 z-10 w-fit">
          Status:{" "}
          <span className="animate-pulse">● Live Monitoring Active</span>
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-500 rounded-full blur-[80px] opacity-10 pointer-events-none" />
      </div>

      {/* 📊 GLOBAL CORE METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Metric 1: System Wide Log Density */}
        <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Global Log Volume
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {totalSystemTransactions}{" "}
                <span className="text-xs text-slate-400 font-bold uppercase">
                  Entries
                </span>
              </h3>
            </div>
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <History size={20} />
            </div>
          </div>
          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Layers size={12} className="text-slate-300" /> Matches your search
            and filter boundaries.
          </p>
        </div>

        {/* Metric 2: Total System Unique Donors */}
        <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Unique System Users
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center">
                {uniqueDonorsCount}{" "}
                <span className="text-xs text-slate-400 font-bold uppercase ml-1.5">
                  Accounts
                </span>
              </h3>
            </div>
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
          </div>
          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Layers size={12} className="text-slate-300" /> Active verified
            responder matrices pool.
          </p>
        </div>

        {/* Metric 3: Total Gross Platform Inflow */}
        <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between relative overflow-hidden group sm:col-span-2 lg:col-span-1 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Platform Cumulative Inflow
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center">
                <DollarSign
                  className="text-emerald-500 -ml-1 shrink-0"
                  size={26}
                />{" "}
                {totalGlobalFunded}
              </h3>
            </div>
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <ArrowUpRight size={14} className="text-emerald-500" /> Gross value
            safely balanced inside ledger state.
          </p>
        </div>
      </div>

      {/* 🔍 FILTER AND SEARCH TOOLBAR LAYER */}
      <div className="bg-white border border-slate-100 p-4 md:p-6 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Input Box */}
        <div className="relative md:col-span-8 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by Sponsor Email or Campaign Title..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 rounded-2xl pl-12 pr-4 py-3 text-sm font-semibold focus:outline-none transition-colors"
          />
        </div>

        {/* Classification Selection Dropdown */}
        <div className="relative md:col-span-4 w-full flex items-center gap-2">
          <Filter className="text-slate-400 shrink-0" size={16} />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none transition-colors cursor-pointer"
          >
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📄 CENTRALIZED TABLE VIEWPORT COMPONENT */}
      <div className="bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col justify-between min-h-[500px]">
        <div>
          <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-50/50">
            <div className="space-y-0.5">
              <h2 className="text-base md:text-lg font-black uppercase text-slate-900 tracking-tight">
                Master Audit Sequence
              </h2>
              <p className="text-slate-400 text-xs font-medium">
                Central secure framework data indexing incoming transaction
                blocks globally
              </p>
            </div>
            <span className="px-3 py-1 text-[9px] md:text-[10px] font-black bg-slate-200/60 rounded-full uppercase tracking-wider text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {paginatedHistory.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-medium text-sm">
              No matching system-wide records located inside the active
              filtration boundaries.
            </div>
          ) : (
            <div className="overflow-x-auto w-full scrollbar-thin">
              <table className="table w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[11px] font-black uppercase border-b border-slate-100">
                    <th className="p-4 md:p-5 tracking-wider pl-6">
                      Sponsor Node
                    </th>
                    <th className="p-4 md:p-5 tracking-wider">
                      Target Campaign
                    </th>
                    <th className="p-4 md:p-5 tracking-wider">
                      Classification
                    </th>
                    <th className="p-4 md:p-5 tracking-wider">Date Node</th>
                    <th className="p-4 md:p-5 tracking-wider text-center">
                      Status
                    </th>
                    <th className="p-4 md:p-5 tracking-wider text-right pr-6">
                      Value Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs md:text-sm font-medium text-slate-700">
                  {paginatedHistory.map((log: TDonationLog, index: number) => {
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
                        {/* User Email Node */}
                        <td
                          className="p-4 md:p-5 font-mono text-xs text-slate-500 pl-6 select-all max-w-[170px] truncate"
                          title={log.email}
                        >
                          {log.email}
                        </td>

                        {/* Campaign Target Title */}
                        <td className="p-4 md:p-5 font-black text-slate-900 uppercase max-w-xs truncate group-hover:text-amber-500 transition-colors">
                          {log.campaignTitle}
                        </td>

                        {/* Classification Category Badge */}
                        <td className="p-4 md:p-5">
                          <span className="px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/50">
                            {categoryText}
                          </span>
                        </td>

                        {/* Chronological Date/Time Stamp */}
                        <td className="p-4 md:p-5 text-slate-500 font-semibold whitespace-nowrap">
                          <div
                            className="flex items-center gap-1.5"
                            title={verifiedTime}
                          >
                            <Calendar
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                            {verifiedDate}
                          </div>
                        </td>

                        {/* Transaction Verification Block */}
                        <td className="p-4 md:p-5 text-center whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest ${log.status === "PAID" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}
                          >
                            {log.status || "PENDING"}
                          </span>
                        </td>

                        {/* Quantitative Output Value and Inspector Trigger */}
                        <td className="p-4 md:p-5 text-right pr-6 whitespace-nowrap space-x-3">
                          <span className="font-black text-emerald-600 text-sm md:text-base inline-block vertical-middle">
                            +${log.amount || 0}
                          </span>
                          <button
                            onClick={() => setSelectedLog(log)}
                            className="p-2 bg-slate-950 hover:bg-slate-900 text-white rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-widest"
                          >
                            <Eye size={12} />
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 📑 FOOTER PAGINATION INFRASTRUCTURE GATEWAY */}
        {filteredHistory.length > 0 && (
          <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-400">
              Showing{" "}
              <span className="text-slate-700 font-black">
                {indexOfFirstItem + 1}
              </span>{" "}
              to{" "}
              <span className="text-slate-700 font-black">
                {Math.min(indexOfLastItem, totalSystemTransactions)}
              </span>{" "}
              of{" "}
              <span className="text-slate-700 font-black">
                {totalSystemTransactions}
              </span>{" "}
              operation workflows
            </span>

            {/* Pagination Button Layout Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 hover:border-slate-300 rounded-xl bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1,
                )
                .map((page, index, array) => {
                  const showEllipsis = index > 0 && page - array[index - 1] > 1;

                  return (
                    <div key={page} className="flex items-center gap-2">
                      {showEllipsis && (
                        <span className="text-slate-400 font-bold text-xs px-1">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${currentPage === page ? "bg-slate-950 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"}`}
                      >
                        {page}
                      </button>
                    </div>
                  );
                })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 hover:border-slate-300 rounded-xl bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🚀 ADMINISTRATIVE MASTER GLASSMORPHISM AUDIT MODAL LAYER */}
      {selectedLog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-lg bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-2xl space-y-6 overflow-hidden text-left">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-slate-900 to-emerald-400" />

            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center">
                  <Fingerprint size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-slate-900 tracking-tight">
                    Root Audit Inspector
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Platform Security Ledger Review
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

            {/* Content Field Structure Stack */}
            <div className="space-y-4 text-xs md:text-sm font-semibold text-slate-700">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                  Target Campaign Title
                </span>
                <p className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 font-black text-slate-900 uppercase">
                  {selectedLog.campaignTitle}
                </p>
              </div>

              {/* Transaction Hash Input Node (Copy Secured) */}
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                  Transaction Hash ID
                </span>
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-950 font-mono text-amber-400 text-xs break-all relative group">
                  <span className="flex-1 select-all pr-8 tracking-tight font-bold">
                    {selectedLog.transactionId}
                  </span>
                  <button
                    onClick={() => handleCopyText(selectedLog.transactionId)}
                    className="absolute right-2 p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all active:scale-95 cursor-pointer"
                  >
                    {copiedId === selectedLog.transactionId ? (
                      <Check size={12} className="text-emerald-400" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                </div>
              </div>

              {/* Advanced Asset and Identity References */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Cryptographic Log Key (_id)
                  </span>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 font-mono text-[11px] text-slate-600 break-all">
                    {selectedLog._id}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Sponsor Node Profile Address
                  </span>
                  <div
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-slate-800 font-mono text-[11px] truncate select-all"
                    title={selectedLog.email}
                  >
                    {selectedLog.email}
                  </div>
                </div>
              </div>

              {/* Inflow Quantitative Status Layout Block */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Platform Value Channeled
                  </span>
                  <p className="text-xl font-black text-emerald-600">
                    ${selectedLog.amount}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Ledger Integrity State
                  </span>
                  <span className="inline-block mt-1 px-2.5 py-0.5 text-[9px] font-black rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-widest">
                    {selectedLog.status}
                  </span>
                </div>
                <div className="space-y-0.5 col-span-2 sm:col-span-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                    Settlement Stamp
                  </span>
                  <p className="text-[11px] font-mono text-slate-500 mt-1 font-bold">
                    {selectedLog.paidAt
                      ? new Date(selectedLog.paidAt).toLocaleTimeString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Exit Action Control Button */}
            <button
              onClick={() => setSelectedLog(null)}
              className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-2xl transition-all shadow-md active:scale-[0.99] cursor-pointer"
            >
              Dismiss System Audit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHistoryDashboard;
