import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { Star, MessageSquare, Send, Loader2, User } from "lucide-react";
import { useAppSelector } from "../../../../redux/hook";
import { useAddReviewMutation } from "../../../../redux/api/api";

const AddReview = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [addReview] = useAddReviewMutation(); // মিউটেশন হুক
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      return toast.error("Please provide a brief comment.");
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        userName: user?.name || "Anonymous User",
        userImage: user?.image || "",
        rating,
        comment,
        createdAt: new Date().toISOString(),
        isPinned: false, // ডিফল্ট মান
        isDeleted: false, // ডিফল্ট মান
      };

      // ✅ মিউটেশন কল করা হচ্ছে
      await addReview(reviewData).unwrap();

      toast.success("Thank you! Your community review was published.");
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Failed to post review:", err);
      toast.error("Failed to post review. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl overflow-hidden relative">
        <div className="h-2 w-full bg-gradient-to-r from-[#FDA4AF] to-[#fb7185]" />

        {isSubmitting && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-2">
            <Loader2 className="animate-spin text-[#fb7185]" size={36} />
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
              Publishing...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          <div className="flex items-center gap-4 bg-slate-100/50 p-4 rounded-2xl">
            {user?.image ? (
              <img
                src={user.image}
                alt="user"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#FDA4AF]"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#FDA4AF] flex items-center justify-center text-white">
                <User size={24} />
              </div>
            )}
            <div>
              <h3 className="font-black text-slate-800">
                {user?.name || "Anonymous User"}
              </h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Community Contributor
              </p>
            </div>
          </div>

          <div className="text-center">
            <label className="block font-bold text-slate-700 mb-4">
              Overall Experience Rating
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  type="button"
                  key={starIndex}
                  onClick={() => setRating(starIndex)}
                  onMouseEnter={() => setHoverRating(starIndex)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    size={32}
                    className={`transition-all ${
                      (
                        hoverRating
                          ? starIndex <= hoverRating
                          : starIndex <= rating
                      )
                        ? "fill-amber-400 text-amber-400 scale-110"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <MessageSquare size={18} className="text-[#fb7185]" />
              <label>Write Your Review</label>
            </div>
            <textarea
              required
              value={comment}
              onChange={handleCommentChange}
              placeholder="How was your experience with the relief package? Share your thoughts..."
              className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] outline-none transition-all min-h-[140px]"
            />
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-[#FDA4AF] hover:bg-[#fb7185] text-white py-4 rounded-2xl font-black tracking-widest text-sm shadow-xl shadow-[#FDA4AF]/20 transition-all active:scale-[0.98] uppercase flex items-center justify-center gap-2"
          >
            <Send size={16} /> Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
