import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  color: string;
  icon: string;
}

const stats: StatItem[] = [
  {
    label: "Families Helped",
    value: 12450,
    suffix: "",
    color: "from-[#FDA4AF] to-rose-500",
    icon: "❤️",
  },
  {
    label: "Relief Goods Sent",
    value: 85,
    suffix: "k+",
    color: "from-violet-500 to-indigo-600",
    icon: "📦",
  },
  {
    label: "Active Volunteers",
    value: 1200,
    suffix: "",
    color: "from-teal-400 to-emerald-600",
    icon: "🤝",
  },
];

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="relative p-6 bg-transparent text-center flex flex-col items-center justify-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl shadow-xl shadow-current/10 relative z-10`}
      >
        <span className="drop-shadow-md">{stat.icon}</span>
      </motion.div>

      <h3
        className={`text-6xl md:text-7xl font-black mb-2 tracking-tighter bg-gradient-to-b ${stat.color} bg-clip-text text-transparent`}
      >
        {inView ? (
          <CountUp
            start={0}
            end={stat.value}
            duration={2.5}
            separator=","
            suffix={stat.suffix}
          />
        ) : (
          "0"
        )}
      </h3>

      <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
        {stat.label}
      </p>

      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: "2.5rem" } : { width: 0 }}
        className={`h-1 mt-4 rounded-full bg-gradient-to-r ${stat.color} opacity-40`}
      />
    </motion.div>
  );
};

export const ImpactStats = () => {
  return (
    <section className="py-40 px-6 relative bg-transparent overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* --- GORGEOUS HEADER SECTION --- */}
        <div className="text-center mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-[#FDA4AF]/20 bg-[#FDA4AF]/5 text-[#FDA4AF] text-[10px] font-black uppercase tracking-[0.3em] mb-2"
          >
            Live Impact Tracking
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-[1.1] p-4"
          >
            Our Shared{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDA4AF] via-rose-500 to-violet-500">
              Milestones
            </span>{" "}
            <br />
            of Humanity.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium"
          >
            Transparent data showing how your contributions are transforming
            lives across the region in real-time.
          </motion.p>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
