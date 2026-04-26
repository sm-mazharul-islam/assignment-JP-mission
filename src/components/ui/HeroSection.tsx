import headerOne from "../../assets/images/header-1.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen lg:min-h-[100vh] flex items-center overflow-hidden bg-slate-950">
      {/* 1. BACKGROUND LAYER: 
          Started at top:0 to cover the area behind the transparent Navbar 
      */}
      <div className="absolute inset-0 z-0">
        <img
          src={headerOne}
          className="w-full h-full object-cover opacity-50 md:opacity-60"
          alt="Hero Relief"
        />
        {/* Mobile Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent md:hidden" />

        {/* Desktop Gradients */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* 2. CONTENT LAYER:
          Added pt-[120px] (mobile) and pt-[160px] (desktop) to ensure 
          content sits perfectly below your fixed Navbar and ReliefTicker.
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-[120px] pb-20 md:pt-[160px] md:pb-0">
        <div className="max-w-4xl text-center md:text-left">
          {/* Responsive Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 md:mb-8 mx-auto md:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FDA4AF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FDA4AF]"></span>
            </span>
            <span className="text-white/80 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
              Live Support Initiative
            </span>
          </div>

          {/* Cinematic Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-6">
            EMERGENCY <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDA4AF] to-violet-400">
              RELIEF
            </span>{" "}
            DISTRIBUTION
          </h1>

          {/* Responsive Subtext */}
          <p className="text-base md:text-xl lg:text-2xl text-slate-300 max-w-2xl leading-relaxed mb-8 md:mb-12 font-medium mx-auto md:mx-0">
            Join our Community Support Initiative. We are dedicated to providing
            essential goods and hope to those who need it most.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-6">
            <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#FDA4AF] hover:bg-rose-400 text-slate-950 font-black text-base md:text-lg rounded-2xl transition-all duration-300 shadow-xl shadow-rose-500/20 active:scale-95">
              Get Involved
            </button>

            <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-black text-base md:text-lg rounded-2xl transition-all duration-300 active:scale-95">
              Learn More
            </button>
          </div>

          {/* Stats Section */}
          <div className="mt-12 md:mt-16 flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 items-center border-t border-white/10 pt-10">
            <div className="text-center md:text-left">
              <p className="text-2xl md:text-3xl font-black text-white">12k+</p>
              <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest font-bold">
                Helped
              </p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div className="text-center md:text-left">
              <p className="text-2xl md:text-3xl font-black text-white">50+</p>
              <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest font-bold">
                Cities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Decorative Glow */}
      <div className="absolute right-[-10%] top-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-violet-600/10 md:bg-violet-600/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
    </section>
  );
};

export default HeroSection;
