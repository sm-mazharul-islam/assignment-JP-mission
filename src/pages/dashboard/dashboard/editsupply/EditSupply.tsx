import React, { useState } from "react";
import { useUpdateSuppliesMutation } from "../../../../redux/api/api";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Supply,
  updateSupply,
} from "../../../../redux/features/reliefGoodsSlice";
import { toast } from "sonner";
import {
  FileText,
  Tag,
  Package,
  DollarSign,
  AlignLeft,
  HelpCircle,
  Image,
  ArrowLeft,
  Save,
} from "lucide-react";

interface SupplyProps {
  _id: string;
  title: string;
  category: string;
  item: string;
  amount: number;
  description: string;
  image: string;
  reason: string;
}

const EditSupply: React.FC<SupplyProps> = ({
  title: initialTitle,
  description: initialDescription,
  _id,
  item: initialItem,
  image: initialImage,
  category: initialCategory,
  reason: initialReason,
  amount: initialAmount,
}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔒 Controlled state variables initialized from properties
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);
  const [item, setItem] = useState(initialItem);
  const [amount, setAmount] = useState(initialAmount);
  const [description, setDescription] = useState(initialDescription);
  const [reason, setReason] = useState(initialReason);
  const [image, setImage] = useState(initialImage);

  // 📡 RTK Query Mutation Hook
  const [updateSupplies, { isLoading: isUpdating }] =
    useUpdateSuppliesMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData: Partial<Supply> = {
      title: title.trim(),
      category: category.trim(),
      item: item.trim(),
      amount: Number(amount) || 0,
      description: description.trim(),
      reason: reason.trim(),
      image: image.trim(),
    };

    try {
      // 1. Local Slice Cache Update Synchronization
      dispatch(updateSupply({ id: _id, updatedData }));

      // 2. Transmit Overwrite Stream to Centralized Server Instance
      await updateSupplies({ id: id || _id, data: updatedData }).unwrap();

      toast.success("Supply node configurations synchronized successfully!");

      // Navigate back to supplies log directory safely
      navigate("/dashboard/supplies");
    } catch (error) {
      console.error("Mutation Sync Error:", error);
      toast.error("Failed to commit updates to the centralized ledger.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-left animate-fade-in">
      {/* 🧭 NAVIGATION SUB-HEADER */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#fb7185] transition-colors group"
      >
        <ArrowLeft
          size={14}
          className="transform group-hover:-translate-x-1 transition-transform"
        />
        Back to Inventory
      </button>

      {/* 👑 MAIN CONTAINER CARD */}
      <div className="bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] shadow-xl overflow-hidden">
        {/* Decorative Top Accent Pipeline */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FDA4AF] to-[#fb7185]" />

        <div className="p-6 md:p-10 space-y-8">
          {/* Section Typography Header */}
          <div className="space-y-1">
            <span className="px-3 py-1 bg-rose-50 border border-rose-100 rounded-xl text-[#fb7185] font-black text-[10px] uppercase tracking-wider">
              Management Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-800">
              Modify Supply Node
            </h1>
            <p className="text-slate-400 text-xs font-medium">
              Update operational specifications and budget variables for supply
              token ID:{" "}
              <span className="font-mono text-[#fb7185] font-bold">
                {_id.slice(-6)}
              </span>
            </p>
          </div>

          {/* 📄 FORM SCHEMA CORE OBJECTS */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Field 1: Title Input */}
              <div className="form-control space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileText size={14} className="text-slate-400" /> Supply
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Emergency Source Filter Kits"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none transition-all shadow-sm"
                  required
                />
              </div>

              {/* Field 2: Category Input */}
              <div className="form-control space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Tag size={14} className="text-slate-400" /> Operational
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Water Utilities"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none transition-all shadow-sm"
                  required
                />
              </div>

              {/* Field 3: Specific Item Name Input */}
              <div className="form-control space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Package size={14} className="text-slate-400" /> Manifest Pack
                  Item
                </label>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  placeholder="e.g., L2 Filtration Core Membrane"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none transition-all shadow-sm"
                  required
                />
              </div>

              {/* Field 4: Amount Evaluation Input */}
              <div className="form-control space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <DollarSign size={14} className="text-slate-400" /> Target
                  Budget Requirement ($)
                </label>
                <input
                  type="number"
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  placeholder="Enter dynamic valuation caps"
                  min="1"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Field 5: Unified Image Reference Uniform Link */}
            <div className="form-control space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Image size={14} className="text-slate-400" /> Package Viewport
                Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/hosted-supply-vector.jpg"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none transition-all shadow-sm"
                required
              />
            </div>

            {/* Field 6: Description Paragraph Area Input */}
            <div className="form-control space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <AlignLeft size={14} className="text-slate-400" /> Comprehensive
                Package Manifest Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe logistics parameters and allocation constraints..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] rounded-2xl p-4 text-sm font-medium focus:outline-none transition-all shadow-sm h-28 resize-none"
                required
              />
            </div>

            {/* Field 7: Deployment Justification/Reason Area Input */}
            <div className="form-control space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <HelpCircle size={14} className="text-slate-400" /> Strategic
                Deployment Justification / Urgent Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Specify target group demographic data and why this node requires funding allocation..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#FDA4AF] rounded-2xl p-4 text-sm font-medium focus:outline-none transition-all shadow-sm h-24 resize-none"
                required
              />
            </div>

            {/* 🔘 ACTION INTERACT PANEL BLOCK */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <span className="loading loading-spinner h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Syncing Ledger...
                  </>
                ) : (
                  <>
                    <Save size={14} /> Commit Overwrites
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSupply;
