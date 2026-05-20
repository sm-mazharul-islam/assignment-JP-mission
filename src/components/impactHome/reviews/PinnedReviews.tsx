import { useGetAllReviewsQuery } from "../../../redux/api/api";
import { Review } from "../../../pages/dashboard/dashboard/allReview/page";
import { motion } from "framer-motion";

export const PinnedReviews = () => {
  const { data: allReviews, isLoading } = useGetAllReviewsQuery(undefined);

  const pinnedReviews = allReviews?.filter(
    (r: Review) => r.isPinned && !r.isDeleted,
  );

  if (isLoading)
    return <div className="text-center py-10">Loading reviews...</div>;
  if (!pinnedReviews || pinnedReviews.length === 0) return null;

  return (
    <section className="py-16 overflow-hidden ">
      <h2 className="text-3xl font-black text-slate-900 text-center mb-12">
        Featured <span className="text-[#FDA4AF]">Community Voices</span>
      </h2>

      {/* লাইন ১: বাম থেকে ডানে (Left to Right) */}
      <div className="flex mb-6 overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 30, // গতি
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* লুপ কন্টিনিউ রাখার জন্য ৩ বার ম্যাপ করা হয়েছে */}
          {[...pinnedReviews, ...pinnedReviews, ...pinnedReviews].map(
            (r: Review, i: number) => (
              <div
                key={`${r._id}-${i}`}
                className="min-w-[320px] h-[180px] bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FDA4AF]"
                  />
                  <div>
                    <h4 className="font-black text-sm">{r.name}</h4>
                    <div className="flex text-[#FDA4AF] text-[10px]">
                      {"★".repeat(r.star)}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-xs italic line-clamp-3">
                  "{r.description}"
                </p>
              </div>
            ),
          )}
        </motion.div>
      </div>

      {/* লাইন ২: ডান থেকে বামে (Right to Left) - এটি একটু দেরিতে শুরু হবে */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...pinnedReviews, ...pinnedReviews, ...pinnedReviews].map(
            (r: Review, i: number) => (
              <div
                key={`${r._id}-rev-${i}`}
                className="min-w-[320px] h-[180px] bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FDA4AF]"
                  />
                  <div>
                    <h4 className="font-black text-sm">{r.name}</h4>
                    <div className="flex text-[#FDA4AF] text-[10px]">
                      {"★".repeat(r.star)}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-xs italic line-clamp-3">
                  "{r.description}"
                </p>
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
};
