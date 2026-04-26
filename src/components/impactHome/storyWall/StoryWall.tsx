import { motion } from "framer-motion";

interface StoryItem {
  type: "image" | "quote";
  content: string;
  author?: string;
  role?: string;
  color?: string;
  span?: string;
}

const stories: StoryItem[] = [
  {
    type: "image",
    content: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    span: "md:row-span-2",
  },
  {
    type: "quote",
    content:
      "The smile on a child's face when they receive food is my biggest reward.",
    author: "S M Mazharul Islam",
    role: "Lead Coordinator",
    color: "bg-violet-600",
  },
  {
    type: "image",
    content: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
  },
  {
    type: "image",
    content: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
  },
  {
    type: "quote",
    content:
      "Transparency isn't just a policy; it's the foundation of every life we touch.",
    author: "Big Hearts Team",
    role: "Vision 2026",
    color: "bg-rose-500",
  },
  {
    type: "image",
    content:
      "https://t4.ftcdn.net/jpg/01/11/97/27/360_F_111972750_JWDtEKMw6JMlEFzBuODQzeOH1FnbyOB8.jpg",
    span: "md:col-span-2",
  },
];

export const StoryWall = () => {
  return (
    <section className="py-10 px-6 bg-transparent">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#FDA4AF] font-black uppercase tracking-[0.5em] text-xs block mb-4"
          >
            Voices of Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none"
          >
            Stories from the <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-[#FDA4AF]">
              Heart of Change.
            </span>
          </motion.h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative rounded-[2.5rem] overflow-hidden group shadow-sm hover:shadow-2xl hover:shadow-[#FDA4AF]/10 transition-all duration-700 ${story.span || ""}`}
            >
              {story.type === "image" ? (
                <>
                  <img
                    src={story.content}
                    alt="Relief Story"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <p className="text-white font-bold tracking-widest text-xs uppercase">
                      Field Operations 2026
                    </p>
                  </div>
                </>
              ) : (
                <div
                  className={`${story.color} h-full p-10 flex flex-col justify-center relative overflow-hidden`}
                >
                  {/* Decorative Quote Icon */}
                  <div className="absolute top-[-20px] right-[-10px] text-[150px] text-white/10 font-serif pointer-events-none">
                    “
                  </div>

                  <p className="text-2xl md:text-3xl italic font-serif text-white leading-snug relative z-10">
                    "{story.content}"
                  </p>

                  <div className="mt-8 flex items-center gap-4 relative z-10">
                    <div className="w-10 h-1 bg-white/30 rounded-full" />
                    <div>
                      <p className="text-white font-black uppercase tracking-widest text-xs">
                        {story.author}
                      </p>
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-tighter">
                        {story.role}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
