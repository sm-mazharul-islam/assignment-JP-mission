import { motion } from "framer-motion";

interface InventoryItem {
  label: string;
  value: number;
  status: string;
  color: string;
  isUrgent?: boolean;
}

const inventoryData: InventoryItem[] = [
  {
    label: "Food Packs",
    value: 85,
    status: "Healthy",
    color: "bg-emerald-400",
  },
  {
    label: "Medicine",
    value: 20,
    status: "Urgent",
    color: "bg-[#FDA4AF]",
    isUrgent: true,
  },
  {
    label: "Shelter Kits",
    value: 65,
    status: "Stable",
    color: "bg-violet-400",
  },
];

export const Inventory = () => {
  return (
    <div className="max-w-3xl mx-auto py-24 px-6 relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FDA4AF]/5 blur-[120px] rounded-full pointer-events-none" />

      <header className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[#FDA4AF] text-[10px] font-black uppercase tracking-[0.5em] block mb-4"
        >
          Live Logistics
        </motion.span>
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter"
        >
          Inventory{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
            Health.
          </span>
        </motion.h4>
      </header>

      <div className="space-y-10 relative z-10">
        {inventoryData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.8 }}
            className="group"
          >
            {/* Label Row */}
            <div className="flex justify-between items-end mb-4">
              <div>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.isUrgent ? "border-rose-100 bg-rose-50 text-rose-500 animate-pulse" : "border-slate-100 bg-slate-50 text-slate-400"}`}
                >
                  {item.status}
                </span>
                <h5 className="text-slate-900 font-bold text-lg mt-2 tracking-tight group-hover:text-[#FDA4AF] transition-colors">
                  {item.label}
                </h5>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">
                  {item.value}%
                </span>
                <span className="text-slate-400 text-[10px] block font-bold uppercase tracking-tighter">
                  {item.isUrgent ? "Remaining" : "Stocked"}
                </span>
              </div>
            </div>

            {/* Progress Track */}
            <div className="h-4 bg-slate-100/50 backdrop-blur-sm rounded-full overflow-hidden p-1 border border-slate-100">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                className={`h-full rounded-full relative ${item.color} shadow-lg`}
              >
                {/* Liquid Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />

                {/* Flowing Pulse for Urgent items */}
                {item.isUrgent && (
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2"
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Meta */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-12 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]"
      >
        Last Updated: Real-time via Warehouse API
      </motion.p>
    </div>
  );
};
