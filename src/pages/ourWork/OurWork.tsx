type TSocialDonation = {
  id: number;
  title: string;
  description: string;
  image_url: string;
};

const OurWork = ({ title, description, image_url }: TSocialDonation) => {
  return (
    <div className="group relative h-full flex flex-col items-center p-9 bg-white rounded-[3.5rem] border border-slate-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(253,164,175,0.25)] hover:border-[#FDA4AF]/40 hover:-translate-y-5 overflow-hidden">
      {/* Soft Ambient Background Glow (Top Right) */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#FDA4AF]/5 rounded-full blur-3xl group-hover:bg-[#FDA4AF]/15 transition-all duration-700" />

      {/* Image Container */}
      <div className="relative mb-10 z-10">
        {/* Glow effect behind the image on hover */}
        <div className="absolute inset-0 bg-[#FDA4AF]/30 rounded-full blur-3xl scale-0 group-hover:scale-125 transition-transform duration-700 opacity-0 group-hover:opacity-100" />

        <div className="relative w-32 h-32 bg-slate-50 rounded-[2.5rem] p-7 flex items-center justify-center group-hover:bg-white group-hover:rotate-6 group-hover:shadow-xl transition-all duration-500">
          <img
            className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-500"
            src={image_url}
            alt={title}
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center relative z-10 flex-grow">
        <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-[#FDA4AF] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed font-medium px-2">
          {description}
        </p>
      </div>

      {/* Interactive Bottom Ornament */}
      <div className="mt-10 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
        <div className="h-1.5 w-1.5 rounded-full bg-[#FDA4AF]" />
        <div className="h-1 w-12 bg-[#FDA4AF] rounded-full" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#FDA4AF]" />
      </div>
    </div>
  );
};

export default OurWork;
