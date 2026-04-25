import { Link } from "react-router-dom";

export type TPackage = {
  _id: string;
  title: string;
  category: string;
  item: string;
  amount: number;
  description: string;
  image: string;
  reason: string;
};

const SingleCard = ({ _id, title, image, category, amount }: TPackage) => {
  return (
    <div className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(167,139,250,0.2)] transition-all duration-500 hover:-translate-y-3 overflow-hidden flex flex-col h-full">
      {/* Top Badge Overlay */}
      <div className="absolute top-5 left-5 z-20">
        <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-black uppercase tracking-widest shadow-sm">
          {category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-72 overflow-hidden m-3 rounded-[2rem]">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={title}
          src={image}
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-slate-800 leading-tight group-hover:text-violet-500 transition-colors">
            {title}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-1 w-8 bg-[#FDA4AF] rounded-full" />
            <p className="text-slate-500 text-sm font-medium italic">
              Essential Aid
            </p>
          </div>
        </div>

        {/* Pricing & Button Area */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
          <div>
            <p className="text-xs uppercase text-slate-400 font-bold tracking-tighter">
              Required Amount
            </p>
            <p className="text-2xl font-black text-slate-900">
              <span className="text-[#FDA4AF]">$</span>
              {amount}
            </p>
          </div>

          <Link to={`/relief-goods/${_id}`}>
            <button className="group/btn relative flex items-center gap-2 bg-violet-400 hover:bg-violet-500 text-white px-5 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-violet-200 active:scale-95">
              <span>Details</span>
              <svg
                className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform"
                fill="none"
                strokeWidth="2.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
