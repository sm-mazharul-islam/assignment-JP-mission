import Testimonial from "./testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

// CRITICAL: Ensure these styles are imported

const clientReview = [
  {
    id: 1,
    name: "Emily",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    description:
      "During a time of crisis, they stepped in with hope. Their support helped me rebuild my life from the ground up.",
    star: 5,
  },
  {
    id: 2,
    name: "James",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    description:
      "Success Relief Goods doesn't just provide essentials; they empower individuals to overcome adversity.",
    star: 5,
  },
  {
    id: 3,
    name: "Chloe",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    description:
      "I'm now running my own business, living proof that their aid fosters true success.",
    star: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[#FDA4AF] text-[9px] font-black uppercase tracking-[0.4em] mb-6"
          >
            Kind Feedback
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-none">
            Trust in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-[#FDA4AF]">
              Big Hearts.
            </span>
          </h2>
        </div>

        {/* --- FIXED SWIPER WRAPPER --- */}
        <div className="max-w-4xl mx-auto relative group">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade" // Swaps slides in place instead of sliding them
            fadeEffect={{ crossFade: true }} // Prevents seeing the previous slide behind the current one
            loop={true}
            speed={800}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            slidesPerView={1}
            centeredSlides={true}
            // Removed !overflow-visible to fix the peeking text issue
            className="testimonial-swiper rounded-[4rem]"
          >
            {clientReview.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="bg-white">
                <Testimonial testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
