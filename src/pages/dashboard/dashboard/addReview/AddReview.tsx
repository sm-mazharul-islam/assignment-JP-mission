import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { Star, MessageSquare, Send, Loader2 } from "lucide-react";
import reviewBanner from "./../../../../assets/images/rating.png";

const AddReview = () => {
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
      return toast.error("Please provide a brief comment before submitting.");
    }

    setIsSubmitting(true);

    try {
      // Fake network response timer delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success("Thank you! Your community review was published.");
      setComment("");
      setRating(5);
    } catch (err) {
      toast.error("Failed to post review. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen lg:min-h-[85vh] flex items-center justify-center p-4 md:p-8 transition-all duration-300">
      {/* RESPONSIVE FLEX LAYOUT BOX STRUCTURE CONTAINER */}
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-16 max-w-5xl w-full p-0">
        {/* 🖥️ DESKTOP EXCLUSIVE ILLUSTRATION SECTION (Hides perfectly on mobile view context) */}
        <div className="text-center lg:text-left hidden lg:block lg:w-1/2 select-none">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#FDA4AF]/20 rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none" />
            <img
              src={reviewBanner}
              alt="Review feedback illustration"
              className="w-full max-w-sm xl:max-w-md mx-auto transition-transform duration-500 group-hover:scale-[1.03] object-contain relative z-10"
            />
          </div>
        </div>

        {/* 📱 CARD INTERFACE CONTEXT: Becomes primary standalone screen focus layout on mobile devices */}
        <div className="card w-full max-w-md lg:w-1/2 bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
          <div className="h-2 w-full bg-gradient-to-r from-[#FDA4AF] to-[#fb7185]" />

          {/* DYNAMIC ACTION HOVER SHIELD OVERLAY LOADING BAR */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-2">
              <Loader2 className="animate-spin text-[#fb7185]" size={36} />
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                Publishing Review...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
            {/* COMPONENT TYPOGRAPHY IDENTITY SCRIPT */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                Share Your <span className="text-[#fb7185]">Feedback</span>
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1 font-medium leading-relaxed">
                Your direct insight optimizes relief operations and keeps the
                platform secure.
              </p>
            </div>

            {/* DYNAMIC DUAL RATING POINTER STAR SELECTION ARRAY ROW */}
            <div className="form-control">
              <label className="label-text font-bold text-slate-700 mb-2.5 block text-center lg:text-left">
                Overall Experience Rating
              </label>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 bg-slate-50/70 border border-slate-100 p-4 rounded-2xl w-fit mx-auto lg:mx-0">
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const activeStar = hoverRating
                    ? starIndex <= hoverRating
                    : starIndex <= rating;
                  return (
                    <button
                      type="button"
                      key={starIndex}
                      onClick={() => setRating(starIndex)}
                      onMouseEnter={() => setHoverRating(starIndex)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-all active:scale-75 focus:outline-none"
                    >
                      <Star
                        size={26}
                        strokeWidth={activeStar ? 0 : 2}
                        className={`transition-colors duration-200 cursor-pointer 
                          ${activeStar ? "fill-amber-400 text-amber-400 drop-shadow-sm" : "text-slate-300 hover:text-amber-300"}
                        `}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-black text-slate-400 ml-2 w-12 text-center bg-white border border-slate-200/60 py-0.5 px-1.5 rounded-md shadow-2xs">
                  {rating}.0 / 5
                </span>
              </div>
            </div>

            {/* DETAILED USER STATEMENT FEEDBACK TEXTBOX SECTION */}
            <div className="form-control w-full">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-2">
                <MessageSquare size={16} className="text-[#fb7185]" />
                <label className="label-text font-bold text-slate-700">
                  Write Your Review
                </label>
              </div>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={handleCommentChange}
                placeholder="What did you think of the relief goods package process? Share your review statements here..."
                className="textarea textarea-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none font-semibold text-sm transition-all p-4 leading-relaxed resize-none min-h-[120px]"
              />
            </div>

            {/* SUBMIT EXECUTION DISPATCH ACCENT BUTTON */}
            <div className="pt-2">
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn border-none w-full bg-[#FDA4AF] hover:bg-[#fb7185] text-white rounded-2xl font-black tracking-wider text-sm h-14 shadow-xl shadow-[#FDA4AF]/20 transition-all active:scale-[0.98] uppercase flex items-center justify-center gap-2"
              >
                <Send size={15} /> Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
