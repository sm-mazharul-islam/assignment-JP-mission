import { useState } from "react";
import {
  History,
  DollarSign,
  Calendar,
  Clock,
  Layers,
  ArrowUpRight,
  Users,
  ShieldAlert,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetAllUsersHistoryQuery } from "../../../../redux/api/api";

interface TDonationLog {
  _id?: string;
  userEmail: string;
  campaignTitle: string;
  category: string;
  amount?: number;
  donateAmount?: number;
  timestamp?: string;
}

const AdminHistoryDashboard = () => {
  // 📡 Step 1: Extract real-time centralized data ledger from server nodes
  const {
    data: globalHistory = [],
    isLoading,
    isError,
  } = useGetAllUsersHistoryQuery();

  // 🎛️ Step 2: Search, Filter, and Pagination States
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  // 🎯 Step 3: Extract Unique Categories dynamically for the selection dropdown
  const categoriesList = [
    "All",
    ...new Set(globalHistory.map((log: TDonationLog) => log.category)),
  ];

  // 🔍 Step 4: Apply Search and Filter Transformations
  const filteredHistory = globalHistory.filter((log: TDonationLog) => {
    const matchesSearch =
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || log.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 📊 Step 5: Compute Matrices based on filtered array context
  const totalSystemTransactions = filteredHistory.length;

  const totalGlobalFunded = filteredHistory.reduce(
    (sum: number, log: TDonationLog) => {
      const currentAmount = log.amount || log.donateAmount || 0;
      return sum + Number(currentAmount);
    },
    0,
  );

  const uniqueDonorsCount = new Set(
    filteredHistory.map((log: TDonationLog) => log.userEmail),
  ).size;

  // 📑 Step 6: Client Side Pagination Layout Slicing
  const totalPages = Math.ceil(totalSystemTransactions / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedHistory = filteredHistory.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Helper functions for page switches
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 md:space-y-10 max-w-7xl mx-auto text-left animate-fade-in">
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
            and filter values.
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
            responder metrics.
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
            safely balanced inside scope.
          </p>
        </div>
      </div>

      {/* 🔍 FILTER AND SEARCH TOOLBAR LAYER */}
      <div className="bg-white border border-slate-100 p-4 md:p-6 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Bar Input Container */}
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
              setCurrentPage(1); // Reset page context back to initial view node
            }}
            className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 rounded-2xl pl-12 pr-4 py-3 text-sm font-semibold focus:outline-none transition-colors"
          />
        </div>

        {/* Classification Selection Dropdown Drop */}
        <div className="relative md:col-span-4 w-full flex items-center gap-2">
          <Filter className="text-slate-400 shrink-0" size={16} />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none transition-colors cursor-pointer appearance-none"
          >
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📄 CENTRALIZED GENERAL TABLE VIEWPORT */}
      <div className="bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col justify-between min-h-[500px]">
        <div>
          <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-50/50">
            <div className="space-y-0.5">
              <h2 className="text-base md:text-lg font-black uppercase text-slate-900 tracking-tight">
                Master Audit Sequence
              </h2>
              <p className="text-slate-400 text-xs font-medium">
                Real-time dynamic feed pooling transaction hashes from all
                account matrices
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
              <table className="table w-full text-left border-collapse min-w-[850px]">
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
                    <th className="p-4 md:p-5 tracking-wider">Time Node</th>
                    <th className="p-4 md:p-5 tracking-wider text-right pr-6">
                      Value Channeled
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs md:text-sm font-medium text-slate-700">
                  {paginatedHistory.map((log: TDonationLog, index: number) => {
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
                        {/* Sponsor Node (Email Address) */}
                        <td className="p-4 md:p-5 font-mono text-xs text-slate-500 pl-6 select-all max-w-[180px] truncate">
                          {log.userEmail}
                        </td>

                        {/* Campaign Details Title */}
                        <td className="p-4 md:p-5 font-black text-slate-900 uppercase max-w-xs truncate group-hover:text-amber-500 transition-colors">
                          {log.campaignTitle}
                        </td>

                        {/* Category Classification Badge */}
                        <td className="p-4 md:p-5">
                          <span className="px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/50">
                            {log.category}
                          </span>
                        </td>

                        {/* Date Block */}
                        <td className="p-4 md:p-5 text-slate-500 font-semibold whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                            {verifiedDate}
                          </div>
                        </td>

                        {/* Time Block */}
                        <td className="p-4 md:p-5 text-slate-400 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] md:text-xs">
                            <Clock
                              size={13}
                              className="text-slate-300 shrink-0"
                            />
                            {verifiedTime}
                          </div>
                        </td>

                        {/* Inflow Amount Value */}
                        <td className="p-4 md:p-5 text-right font-black text-emerald-600 text-sm md:text-base pr-6 whitespace-nowrap">
                          +${log.amount || log.donateAmount || 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 📑 FOOTER PAGINATION WORKSPACE GATEWAY */}
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

            {/* Pagination Controls Configuration Block */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 hover:border-slate-300 rounded-xl bg-white text-slate-600 hover:text-slate-800 disabled:opacity-40 disabled:hover:border-slate-200 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dynamic Action Buttons Array mapping */}
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
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                          currentPage === page
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800"
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  );
                })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 hover:border-slate-300 rounded-xl bg-white text-slate-600 hover:text-slate-800 disabled:opacity-40 disabled:hover:border-slate-200 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHistoryDashboard;
