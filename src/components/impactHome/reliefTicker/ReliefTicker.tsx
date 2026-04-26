export const ReliefTicker = () => {
  const tickerItems = [
    "🚨 Emergency: Clean Water needed for 500 families in Sylhet",
    "📦 Volunteer drive starting tomorrow at 9:00 AM",
    "💊 Medical supplies reaching Chittagong Hub shortly",
    "📢 Join our campaign: Every Mile Every Smile",
  ];

  return (
    <div className="relative bg-[#FDA4AF] py-4 flex overflow-hidden border-b border-rose-300 group shadow-md select-none">
      <div className="absolute left-0 top-0 bottom-0 px-6 bg-slate-900 text-white z-20 flex items-center font-black text-[10px] md:text-xs tracking-[0.2em] shadow-2xl skew-x-[-15deg] -ml-2">
        <span className="skew-x-[15deg] animate-pulse">LIVE UPDATES</span>
      </div>

      <div className="flex whitespace-nowrap">
        <div className="flex animate-smooth-scroll items-center">
          {tickerItems.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-slate-900 font-black uppercase tracking-[0.15em] text-xs md:text-sm mx-10">
                {item}
              </span>
              <span className="w-2 h-2 bg-slate-900 rounded-full opacity-30" />
            </div>
          ))}
        </div>

        <div
          className="flex animate-smooth-scroll items-center"
          aria-hidden="true"
        >
          {tickerItems.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-slate-900 font-black uppercase tracking-[0.15em] text-xs md:text-sm mx-10">
                {item}
              </span>
              <span className="w-2 h-2 bg-slate-900 rounded-full opacity-30" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FDA4AF] to-transparent z-10 pointer-events-none" />
    </div>
  );
};
