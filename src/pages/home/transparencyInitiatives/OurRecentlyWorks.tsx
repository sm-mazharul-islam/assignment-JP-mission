type SuccessReliefGoods = {
  id: number;
  image: string;
  description: string;
  star: number;
};

const OurRecentlyWorks = ({ image, description }: SuccessReliefGoods) => {
  return (
    <div className="group relative w-full max-w-[400px] bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_60px_-20px_rgba(253,164,175,0.3)] transition-all duration-700 hover:-translate-y-3 overflow-hidden flex flex-col h-full">
      {/* Image Container with Elegant Rounded Corners */}
      <div className="relative h-[280px] overflow-hidden m-5 rounded-[2rem]">
        <img
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          src={image}
          alt="Relief Work"
        />
        {/* Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDA4AF]/20 to-transparent" />
      </div>

      {/* Content Area */}
      <div className="px-8 pb-10 pt-2 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-1.5 w-10 bg-[#FDA4AF] rounded-full shadow-lg shadow-[#FDA4AF]/40" />
          <span className="text-[#FDA4AF] text-[10px] font-black uppercase tracking-[0.2em]">
            Recent Success
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed text-justify mb-8 flex-grow line-clamp-3 font-medium">
          {description}
        </p>

        {/* Gorgeous Button */}
        <button className="group/btn self-start flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#FDA4AF] transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20">
          <span>Read Story</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OurRecentlyWorks;
