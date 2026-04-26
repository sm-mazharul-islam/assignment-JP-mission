import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KitItem {
  id: string;
  label: string;
  icon: string;
  description: string;
  color: string;
}

const kitOptions: KitItem[] = [
  {
    id: "food",
    label: "Food Pack",
    icon: "🍚",
    description: "Dry rations & water",
    color: "from-orange-400 to-rose-500",
  },
  {
    id: "medical",
    label: "First Aid",
    icon: "💊",
    description: "Medicine & bandages",
    color: "from-blue-400 to-indigo-600",
  },
  {
    id: "shelter",
    label: "Shelter",
    icon: "⛺",
    description: "Tents & blankets",
    color: "from-teal-400 to-emerald-600",
  },
  {
    id: "baby",
    label: "Baby Care",
    icon: "🍼",
    description: "Milk & diapers",
    color: "from-violet-400 to-fuchsia-600",
  },
];

export const KitBuilder = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <section className="relative  px-6 overflow-hidden bg-white">
      {/* 1. Main Container with Soft White Depth */}
      <div className="max-w-6xl mx-auto bg-white border border-slate-100 rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]">
        {/* Soft Ambient Accents (Pastel Colors for White Theme) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 blur-[120px] rounded-full -ml-40 -mb-40 pointer-events-none" />

        {/* Header Section */}
        <div className="relative z-10 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[#FDA4AF] text-[10px] font-black uppercase tracking-[0.4em] mb-6"
          >
            Custom Donation
          </motion.div>
          <h3 className="text-slate-900 text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Build Your Own{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDA4AF] to-rose-400">
              Relief Kit
            </span>
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            Select the essential items you want to contribute. Our team will
            handle the packaging and logistics to reach families in need.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {kitOptions.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleItem(item.id)}
                className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 text-left overflow-hidden ${
                  isSelected
                    ? "bg-slate-900 border-slate-900 shadow-2xl shadow-slate-900/20"
                    : "bg-white border-slate-100 hover:border-[#FDA4AF]/30 hover:shadow-xl hover:shadow-slate-200/50"
                }`}
              >
                {/* Active Indicator Background */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      layoutId="activeGlow"
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10">
                  <div
                    className={`text-4xl mb-4 transform transition-transform duration-500 ${isSelected ? "scale-110" : "group-hover:scale-110"}`}
                  >
                    {item.icon}
                  </div>
                  <h4
                    className={`font-black text-xl mb-1 transition-colors duration-500 ${isSelected ? "text-white" : "text-slate-900"}`}
                  >
                    {item.label}
                  </h4>
                  <p
                    className={`text-xs font-medium transition-colors duration-500 ${isSelected ? "text-slate-300" : "text-slate-500"}`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Selection Checkmark */}
                <div
                  className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    isSelected
                      ? "bg-[#FDA4AF] border-[#FDA4AF]"
                      : "border-slate-100 bg-slate-50"
                  }`}
                >
                  {isSelected && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer Action */}
        <motion.div
          layout
          className="mt-16 flex flex-col items-center relative z-10"
        >
          <AnimatePresence>
            {selectedItems.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-12 py-5 bg-slate-900 hover:bg-[#FDA4AF] text-white font-black rounded-2xl shadow-2xl shadow-slate-900/20 transition-all active:scale-95 flex items-center gap-3 group"
              >
                Assemble Kit ({selectedItems.length})
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {selectedItems.length === 0 && (
            <p className="text-slate-300 text-xs font-bold uppercase tracking-widest">
              Select items to proceed
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
