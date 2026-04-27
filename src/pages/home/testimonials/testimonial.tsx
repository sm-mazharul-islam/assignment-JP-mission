import { motion } from "framer-motion";
import mark from "../../../../src/assets/images/mark.png";

type TTestimonials = {
  id: number;
  name: string;
  image: string;
  description: string;
  star: number;
};

const Testimonial = ({ testimonial }: { testimonial: TTestimonials }) => {
  const { name, image, description, star } = testimonial;

  return (
    <div className="relative py-16 px-4">
      {/* The Main Card: Using Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-[3rem] p-8 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] relative"
      >
        {/* SMALL FLOATING IMAGE: repositioned to overlap the top border */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 md:left-14 md:translate-x-0">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative z-10"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Quote Badge attached to small image */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center shadow-lg z-20">
              <img
                src={mark}
                className="w-3 h-3 brightness-0 invert"
                alt="quote"
              />
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="mt-8 md:mt-0 space-y-6">
          {/* Rating Stars - Small & Sophisticated */}
          <div className="flex justify-center md:justify-start gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i < star ? "bg-[#FDA4AF]" : "bg-slate-200"}`}
              />
            ))}
          </div>

          {/* Description - Focused Typography */}
          <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed text-center md:text-left italic">
            "{description}"
          </p>

          {/* User Info */}
          <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
            <div className="h-px w-8 bg-[#FDA4AF] hidden md:block" />
            <div className="text-center md:text-left">
              <h4 className="text-base font-black text-slate-900 uppercase tracking-[0.2em]">
                {name}
              </h4>
              <p className="text-[#FDA4AF] font-bold text-[9px] uppercase tracking-[0.3em] mt-1">
                Community Member
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonial;
