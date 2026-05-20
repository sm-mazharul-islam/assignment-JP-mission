import { useState } from "react";
import {
  useGetAllReviewsQuery,
  usePinReviewMutation,
  useDeleteReviewMutation,
} from "../../../../redux/api/api";
export interface Review {
  _id: string;
  name: string;
  image: string;
  description: string;
  star: number;
  isPinned: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export const AllReviewPage = () => {
  const { data: allReviews, isLoading } = useGetAllReviewsQuery(undefined);
  const [pinReview] = usePinReviewMutation();
  const [softDeleteReview] = useDeleteReviewMutation();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handlePin = async (id: string, currentStatus: boolean) => {
    try {
      await pinReview({ id, isPinned: !currentStatus }).unwrap();
    } catch (error) {
      console.error("Failed to pin:", error);
    }
  };

  if (isLoading)
    return <div className="text-center p-10 font-bold">Loading...</div>;

  return (
    <div className="p-4 md:p-10 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-black text-slate-900 mb-8">
        Review Management
      </h1>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {allReviews
          ?.filter((r: Review) => !r.isDeleted) // এখানে 'any' এর বদলে 'Review' ব্যবহার করা হয়েছে
          .map((r: Review) => (
            <div
              key={r._id}
              className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FDA4AF]"
                />
                <div>
                  <p className="font-black text-lg text-slate-900">{r.name}</p>
                  <p className="text-slate-500 text-sm italic">
                    "{r.description}"
                  </p>
                  <p className="text-[10px] uppercase font-bold text-[#FDA4AF] mt-1">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePin(r._id, r.isPinned)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                    r.isPinned
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {r.isPinned ? "★ Pinned" : "☆ Pin"}
                </button>

                <button
                  onClick={() => setSelectedId(r._id)}
                  className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Confirmation Modal */}
      {selectedId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-[2rem] max-w-sm w-full text-center">
            <h3 className="text-2xl font-black mb-4">Confirm Removal</h3>
            <p className="text-slate-500 mb-8">This review will be hidden.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedId(null)}
                className="flex-1 py-4 bg-slate-100 font-bold rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  softDeleteReview(selectedId);
                  setSelectedId(null);
                }}
                className="flex-1 py-4 bg-[#FDA4AF] text-white font-bold rounded-2xl"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
