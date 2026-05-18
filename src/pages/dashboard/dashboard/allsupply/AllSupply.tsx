import { Link } from "react-router-dom";
import {
  useGetReliefGoodsQuery,
  useDeleteReliefGoodsMutation,
} from "../../../../redux/api/api";
import { useState } from "react";
import { toast } from "sonner";
import { Edit3, Trash2, AlertTriangle, X } from "lucide-react";

type TReliefGoodsTableProps = {
  _id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
  image: string;
  reason: string;
};

interface ItemType {
  _id: string;
  title: string;
}

const AllSupply = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

  const {
    data: reliefGoods,
    isLoading,
    isError,
  } = useGetReliefGoodsQuery(undefined);

  const [deleteReliefGoods] = useDeleteReliefGoodsMutation();

  const handleDeleteClick = (item: ItemType) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItem && selectedItem._id) {
      try {
        await deleteReliefGoods(selectedItem._id).unwrap();
        toast.success(`${selectedItem.title} deleted successfully!`);
      } catch (err) {
        toast.error("Failed to delete the item.");
      } finally {
        setShowPopup(false);
        setSelectedItem(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#fb7185]"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500 font-bold bg-red-50 px-6 py-3 rounded-2xl border border-red-100">
          Failed to load relief goods supplies. Please check server connection.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full max-w-[1400px] mx-auto transition-all duration-300">
      {/* SECTION HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
          Inventory <span className="text-[#fb7185]">Supplies</span>
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1 font-medium">
          Manage, refine, or remove dynamic relief goods allocation structures.
        </p>
      </div>

      {/* 🖥️ DESKTOP & TABLET VIEW: GLASSMORPHIC TABLE */}
      <div className="hidden md:block overflow-hidden bg-white/60 backdrop-blur-md rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-5 px-6">Title</th>
              <th className="py-5 px-4">Category</th>
              <th className="py-5 px-4 text-center">Amount</th>
              <th className="py-5 px-4 text-center">Edit</th>
              <th className="py-5 px-6 text-center">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[14px] font-semibold text-slate-700">
            {reliefGoods?.data?.map((item: TReliefGoodsTableProps) => (
              <tr
                key={item._id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="py-4 px-6 font-bold text-slate-800 max-w-[220px] truncate">
                  {item.title}
                </td>
                <td className="py-4 px-4">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                    {item.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-center font-black text-slate-900">
                  <span className="text-[#fb7185] font-bold mr-0.5">$</span>
                  {item.amount.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-center">
                  <Link to={`/dashboard/edit-supply/${item._id}`}>
                    <button className="p-2 mx-auto rounded-xl hover:bg-purple-50 text-purple-500 hover:text-purple-600 transition-all active:scale-95 flex items-center justify-center">
                      <Edit3 size={18} />
                    </button>
                  </Link>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="p-2 mx-auto rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all active:scale-95 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 MOBILE VIEW: SINGLE COMPACT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {reliefGoods?.data?.map((item: TReliefGoodsTableProps) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl p-5 border border-slate-100 shadow-md shadow-slate-100/40 relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="h-1.5 w-full bg-[#FDA4AF]/40 absolute top-0 left-0" />

            <div className="space-y-2 mt-1">
              <span className="text-[10px] uppercase tracking-widest font-black text-[#fb7185] bg-rose-50 px-2.5 py-0.5 rounded-md">
                {item.category}
              </span>
              <h3 className="text-base font-black text-slate-800 tracking-tight truncate pt-1">
                {item.title}
              </h3>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100/50 mt-3">
                <span className="text-xs font-bold text-slate-400">
                  Total Value
                </span>
                <span className="text-base font-black text-slate-900">
                  <span className="text-[#fb7185] font-extrabold">$</span>
                  {item.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CARD ACTION BUTTONS */}
            <div className="flex items-center gap-3 mt-5 pt-3 border-t border-slate-50">
              <Link
                className="flex-1"
                to={`/dashboard/edit-supply/${item._id}`}
              >
                <button className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-600 font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
                  <Edit3 size={14} /> Edit Info
                </button>
              </Link>
              <button
                onClick={() => handleDeleteClick(item)}
                className="flex-1 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🚨 MODERN CLEAN CONFIRMATION MODAL */}
      {showPopup && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          {/* Blur Overlay Backdrop */}
          <div
            onClick={handleCancelDelete}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Card Window Container */}
          <div className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl border border-slate-100 p-6 overflow-hidden transform scale-100 transition-all duration-300">
            <button
              onClick={handleCancelDelete}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center mb-4 shadow-sm">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                Confirm Destruction
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Are you absolutely sure you want to permanently remove{" "}
                <span className="text-slate-700 font-bold">
                  "{selectedItem?.title}"
                </span>
                ? This process cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelDelete}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs tracking-wider transition-colors uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs tracking-wider shadow-lg shadow-red-500/20 transition-all active:scale-95 uppercase"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSupply;
