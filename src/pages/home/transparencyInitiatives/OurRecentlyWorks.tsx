type SuccessReliefGoods = {
  id: number;
  image: string;
  description: string;
  star: number;
};

const OurRecentlyWorks = ({ image, description }: SuccessReliefGoods) => {
  return (
    <div className="group relative w-full max-w-[400px] bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(253,164,175,0.2)] transition-all duration-500 hover:-translate-y-4 overflow-hidden flex flex-col h-full">
      {/* Image Container with Zoom Effect */}
      <div className="relative h-[350px] overflow-hidden m-4 rounded-[2.5rem]">
        <img
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          src={image}
          alt="Relief Work"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <span className="text-white font-bold tracking-widest uppercase text-xs">
            Featured Success
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-8 pb-10 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-8 bg-[#FDA4AF] rounded-full" />
          <p className="text-[#FDA4AF] text-xs font-black uppercase tracking-widest">
            Recent Impact
          </p>
        </div>

        <p className="text-slate-500 text-base leading-relaxed text-justify line-clamp-4 flex-grow mb-8">
          {description}
        </p>

        {/* Premium Button Style */}
        <button className="group/btn self-start flex items-center gap-2 text-violet-500 font-black text-sm uppercase tracking-wider hover:text-violet-600 transition-colors">
          <span className="relative">
            See More
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-violet-400 transition-all duration-300 group-hover/btn:w-full" />
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
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
