import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  glow: string;
}

const events: TimelineEvent[] = [
  {
    year: "2023",
    title: "Founded in Dhaka",
    description:
      "The spark of an idea at Bangladesh University that became a mission for humanity.",
    color: "from-amber-400 to-rose-500",
    icon: "🌱",
    glow: "rgba(251, 191, 36, 0.3)",
  },
  {
    year: "2024",
    title: "Regional Expansion",
    description:
      "Spreading hope across the nation, reaching the most remote corners of the country.",
    color: "from-violet-500 to-indigo-600",
    icon: "🚀",
    glow: "rgba(139, 92, 246, 0.3)",
  },
  {
    year: "2026",
    title: "Global Impact",
    description:
      "Breaking borders with a digital platform that connects 10k+ hearts worldwide.",
    color: "from-[#FDA4AF] to-rose-600",
    icon: "🌍",
    glow: "rgba(253, 164, 175, 0.4)",
  },
];

export const Timeline = () => {
  return (
    <section className="py-24 md:py-20 px-4 md:px-6 relative bg-transparent overflow-hidden">
      {/* 1. RESPONSIVE CONNECTING LINE: 
          Left-aligned on Mobile (left-8), Center-aligned on Desktop (left-1/2) 
      */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-slate-200 to-transparent -translate-x-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Left aligned on mobile, center on desktop */}
        <header className="text-left md:text-center mb-24 md:mb-44 ml-12 md:ml-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[#FDA4AF] text-[10px] font-black uppercase tracking-[0.4em] mb-4 md:mb-6"
          >
            Our Journey
          </motion.div>
          <h2 className="text-slate-950 font-black text-4xl md:text-8xl tracking-tighter leading-tight md:leading-[0.9]">
            The Path of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-[#FDA4AF] to-amber-500">
              Big Hearts.
            </span>
          </h2>
        </header>

        {/* Timeline Events */}
        <div className="space-y-24 md:space-y-48">
          {events.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className={`relative flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-start md:items-center justify-between gap-8 md:gap-16`}
            >
              {/* LARGE GHOST YEAR BACKGROUND: 
                  Scaled down on mobile (text-6xl) to prevent content overlap 
              */}
              <div className="flex-1 text-left md:text-center relative select-none pointer-events-none ml-12 md:ml-0">
                <motion.span
                  whileInView={{ scale: 1.1, opacity: 0.08 }}
                  className="text-slate-950 font-black text-6xl md:text-[14rem] tracking-tighter leading-none opacity-5 inline-block transition-all duration-1000"
                >
                  {event.year}
                </motion.span>
              </div>

              {/* ICON NODE: 
                  Aligned with the line on mobile (left-0), Center on desktop 
              */}
              <div className="absolute left-[3px] md:left-1/2 -translate-x-1/2 top-4 md:top-1/2 -translate-y-1/2 z-20">
                <div className="relative group">
                  {/* Orbiting Ring (Hidden on tiny screens to avoid clutter) */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      ease: "linear",
                    }}
                    className="absolute -inset-3 md:-inset-4 border border-dashed border-slate-200 rounded-full group-hover:border-[#FDA4AF]/50 transition-colors hidden sm:block"
                  />

                  {/* The Icon Bubble: Smaller on Mobile */}
                  <div className="relative w-10 h-10 md:w-16 md:h-16 rounded-full bg-white shadow-xl border border-slate-50 flex items-center justify-center text-xl md:text-3xl overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                      style={{ backgroundColor: event.glow }}
                    />
                    <span className="relative z-10 drop-shadow-sm">
                      {event.icon}
                    </span>
                  </div>
                </div>
              </div>

              {/* CONTENT CARD:
                  Margins adjusted to clear the icon node on mobile 
              */}
              <div
                className={`flex-1 w-full text-left pl-16 md:pl-0 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative p-8 md:p-14 bg-white rounded-[2rem] md:rounded-[3.5rem] border border-slate-100 shadow-[0_40px_100px_rgba(0,0,0,0.02)] hover:shadow-[0_50px_120px_rgba(253,164,175,0.12)] transition-all duration-700 group"
                >
                  <h4
                    className={`text-xl md:text-4xl font-black mb-2 md:mb-4 tracking-tight transition-colors duration-500 text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${event.color}`}
                  >
                    {event.title}
                  </h4>
                  <p className="text-slate-500 text-sm md:text-xl font-medium leading-relaxed max-w-sm ml-0 md:mx-auto lg:mx-0">
                    {event.description}
                  </p>

                  {/* Progress Dot */}
                  <div
                    className={`mt-6 md:mt-8 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${event.color} mx-0 md:mx-0 ${index % 2 === 0 ? "" : "md:ml-auto md:mr-0"}`}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Accent */}
        <div className="flex flex-col items-start md:items-center mt-32 md:mt-40 ml-12 md:ml-0">
          <div className="w-[1px] h-20 md:h-24 bg-gradient-to-b from-slate-200 to-transparent" />
          <p className="text-slate-300 font-black text-[8px] md:text-[9px] uppercase tracking-[0.5em] mt-6">
            Next Chapter 2027
          </p>
        </div>
      </div>
    </section>
  );
};
