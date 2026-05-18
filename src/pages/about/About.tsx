import {
  Heart,
  ShieldCheck,
  Users,
  Target,
  ArrowUpRight,
  Flame,
  Globe,
} from "lucide-react";

export default function AboutPage() {
  const statistics = [
    {
      label: "Active Camps Managed",
      value: "24+",
      icon: (
        <Globe className="text-violet-400 group-hover:rotate-[360deg] transition-transform duration-1000 ease-out" />
      ),
      accent: "from-violet-500/10 to-indigo-500/5",
      border: "hover:border-violet-400/40",
    },
    {
      label: "Packages Delivered",
      value: "142K+",
      icon: (
        <Flame className="text-rose-400 group-hover:scale-110 transition-transform duration-500" />
      ),
      accent: "from-rose-500/10 to-orange-500/5",
      border: "hover:border-rose-400/40",
    },
    {
      label: "Verified Responders",
      value: "1,200+",
      icon: (
        <Users className="text-emerald-400 group-hover:-translate-y-1 transition-transform duration-500" />
      ),
      accent: "from-emerald-500/10 to-teal-500/5",
      border: "hover:border-emerald-400/40",
    },
  ];

  const coreValues = [
    {
      title: "Radical Transparency",
      desc: "Every single unit of relief food, clothing, or medical supply is tracked in our centralized ledger. Anyone, from volunteers to global donors, can inspect inflow velocity.",
      icon: (
        <ShieldCheck
          size={24}
          className="text-emerald-400 group-hover:rotate-6 transition-transform"
        />
      ),
      glow: "group-hover:shadow-emerald-500/10",
    },
    {
      title: "Humanitarian First",
      desc: "We clear political or bureaucratic gridlocks. When a crisis strikes, our automated deployment dispatch engine routes supplies directly to the impacted slum or camp nodes.",
      icon: (
        <Heart
          size={24}
          className="text-rose-400 group-hover:scale-110 transition-transform"
        />
      ),
      glow: "group-hover:shadow-rose-500/10",
    },
    {
      title: "Data-Driven Logistics",
      desc: "By combining live inventory calculations with real-time field reporting, we minimize cargo wastage and optimize turnover density by up to 96%.",
      icon: (
        <Target
          size={24}
          className="text-violet-400 group-hover:rotate-45 transition-transform duration-500"
        />
      ),
      glow: "group-hover:shadow-violet-500/10",
    },
  ];

  return (
    <div className="text-slate-800 font-sans overflow-hidden relative animate-fade-in [animation-duration:1s]">
      {/* 🔮 Multi-Layered Neon Ambient Orbs (Zero Black/White Traps) */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px]  to-transparent rounded-full blur-[100px] pointer-events-none animate-pulse [animation-duration:6s]" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/15 via-sky-400/10 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse [animation-duration:8s]" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-[90px] pointer-events-none" />

      {/* 👑 VISIONARY HERO ACCENT */}
      <header className="max-w-6xl mx-auto px-6 text-center space-y-8 relative pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200/40 bg-gradient-to-r from-violet-50/40 to-rose-50/40 backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fb7185] animate-pulse" />
          <span className="text-violet-600 font-black uppercase tracking-[0.2em] text-[9px]">
            Ecosystem Moniker: BigHearts
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase animate-slide-up">
          Architecting <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb7185]  to-sky-300">
            Crisis Integrity
          </span>
        </h1>

        <p className="text-slate-500 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed tracking-wide">
          An open-source, ultra-transparent logistics ecosystem engineered to
          clear bureaucratic bottlenecks, optimize camp supply turnover, and
          safely map assets.
        </p>
      </header>

      {/* 📊 FLOATING GRADIENT METRICS GRID */}
      <section className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {statistics.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 md:p-8 flex items-center justify-between text-left group bg-gradient-to-br ${stat.accent} backdrop-blur-md border border-slate-200/40 rounded-[2rem] shadow-[0_15px_35px_-15px_rgba(0,0,0,0.03)] ${stat.border} transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.06)]`}
            >
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block transition-colors duration-300 group-hover:text-slate-600">
                  {stat.label}
                </span>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                  {stat.value}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/60 border border-slate-100 backdrop-blur-sm flex items-center justify-center shadow-inner transition-transform duration-500">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🗺️ THE SPLIT ECOSYSTEM STORY */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left relative z-10">
        {/* Left Side Text Block */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/10 to-indigo-500/5 border border-violet-200/30">
            <span className="text-violet-600 font-black uppercase tracking-[0.2em] text-[9px] block">
              Our Sovereign Mission
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Bridging the gap between immediate donors and real-time camp
            requirements.
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed">
            During devastating flash floods or seasonal urban slums poverty
            spikes, transparency is the first casualty. Traditional ledger
            channels lose focus, assets vanish into bureaucratic processing
            black holes, and victims receive logistics days after the disaster
            peaks.
          </p>
          <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed">
            We engineered a secure platform that updates every 3 seconds. When
            an administrator commits an allotment, the entire framework logs it
            down to the exact camp coordinates, ensuring unmatched distribution
            efficiency.
          </p>
        </div>

        {/* Right Side Fluid-Glass Block */}
        <div className="lg:col-span-5 p-8 md:p-10 bg-gradient-to-br from-white/40 via-white/10 to-transparent border border-white/40 rounded-[2.5rem] shadow-xl min-h-[360px] flex flex-col justify-between group backdrop-blur-xl transition-all duration-500 hover:border-slate-300/60">
          <div className="space-y-4">
            <span className="text-[9px] font-black uppercase bg-gradient-to-r from-rose-500/10 to-orange-500/10 text-rose-500 border border-rose-200/30 px-2.5 py-1 rounded-md tracking-widest inline-block">
              Infrastructure Node
            </span>
            <h3 className="text-xl font-black tracking-tight leading-snug text-slate-900 uppercase">
              "We measure our progression metrics not by fiscal balance sheets,
              but by the absolute reduction of allocation latency."
            </h3>
          </div>

          <div className="border-t border-slate-200/80 pt-6 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                S M Mazharul Islam
              </h4>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                Lead Architect, BigHearts
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/80 border border-slate-200/60 flex items-center justify-center text-slate-800 shadow-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ BLUEPRINT VALUES PANEL */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-200/60 relative z-10">
        <div className="space-y-12">
          <div className="text-left space-y-1.5">
            <span className="text-[#fb7185] font-black uppercase tracking-[0.2em] text-[9px] block tracking-widest">
              Operational Protocols
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
              Ecosystem Blueprint Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className={`p-6 lg:p-8 space-y-4 group rounded-3xl border border-slate-200/30 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm transition-all duration-500 hover:bg-white/60 hover:border-slate-300/60 hover:shadow-lg ${value.glow}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:border-slate-900">
                  {value.icon}
                </div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase transition-colors duration-300 group-hover:text-[#fb7185]">
                  {value.title}
                </h3>
                <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 CALL TO ACTION CHROMATIC OUTLINE TERMINAL */}
      <section className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="p-1 rounded-[3rem] bg-gradient-to-r from-rose-400/30 via-violet-500/20 to-sky-400/30 shadow-xl backdrop-blur-md">
          <div className="rounded-[2.9rem] p-8 md:p-14 space-y-6 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl text-center">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="text-3xl font-black tracking-tight md:text-5xl text-slate-900 uppercase leading-none">
                Ready to verify or scale deployment pipelines?
              </h2>
              <p className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-wider max-w-lg mx-auto">
                Join as a verified field volunteer or set up a regular donor
                node to synchronize emergency relief packages live with MongoDB.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button className="flex-1 bg-gradient-to-r from-[#fb7185] to-violet-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl active:scale-95 transition-all shadow-md shadow-violet-500/10">
                  Access Live Registry
                </button>
                <button className="flex-1 border border-slate-300 hover:border-slate-900 bg-white/50 text-slate-900 font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl active:scale-95 transition-all">
                  Contact HQ Nodes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎨 GLOW MOTION ACCENT MODULE */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out both; }
        .animate-slide-up { animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>
    </div>
  );
}
