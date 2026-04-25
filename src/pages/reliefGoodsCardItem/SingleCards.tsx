import { Link } from "react-router-dom";
import { useGetReliefGoodsQuery } from "../../redux/api/api";
import SingleCard, { TPackage } from "./SingleCard";

const SingleCards = () => {
  const {
    data: reliefGoods,
    isLoading,
    isError,
  } = useGetReliefGoodsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <span className="loading loading-spinner loading-lg text-[#FDA4AF]"></span>
        <p className="text-slate-400 font-medium animate-pulse">
          Fetching Relief Packages...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 font-bold">
          Failed to load relief goods. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-50/30">
      {/* Header Section */}
      <div className="text-center mb-16 px-4">
        <h4 className="text-[#FDA4AF] font-bold tracking-[0.2em] uppercase text-xs mb-3">
          Immediate Support
        </h4>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
          Relief <span className="text-violet-400">Goods</span>
        </h1>
        <div className="flex justify-center items-center gap-4">
          <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#FDA4AF] rounded-full" />
          <div className="w-2 h-2 bg-[#FDA4AF] rounded-full" />
          <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#FDA4AF] rounded-full" />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {reliefGoods?.data?.slice(0, 6).map((item: TPackage) => (
            <SingleCard key={item._id} {...item} />
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-20 flex justify-center">
          <Link to="/relief-goods">
            <button className="group relative px-10 py-4 bg-white border-2 border-[#FDA4AF] text-[#FDA4AF] hover:bg-[#FDA4AF] hover:text-white font-black rounded-2xl transition-all duration-300 shadow-xl shadow-[#FDA4AF]/10 flex items-center gap-3 overflow-hidden">
              <span className="relative z-10 text-lg">
                View All Relief Goods
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom Decorative Divider */}
      <div className="mt-24 border-b border-slate-100 w-3/4 mx-auto" />
    </div>
  );
};

export default SingleCards;
