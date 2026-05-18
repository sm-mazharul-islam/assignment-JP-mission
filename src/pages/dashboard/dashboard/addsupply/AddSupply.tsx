import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useAddReliefGoodsMutation } from "../../../../redux/api/api";
import { toast } from "sonner";
import { PlusCircle, Loader2 } from "lucide-react";

const AddSupply = () => {
  const [addReliefGoods, { isLoading, isSuccess, isError }] =
    useAddReliefGoodsMutation();

  // Centralized controlled form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    item: "",
    description: "",
    reason: "",
    amount: 0,
    image: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) || 0 : value,
    }));
  };

  // Handle successful or erroneous server interactions reactively
  useEffect(() => {
    if (isSuccess) {
      toast.success("Supply item added to inventory successfully!");
      setFormData({
        title: "",
        category: "",
        item: "",
        description: "",
        reason: "",
        amount: 0,
        image: "",
      });
    }
    if (isError) {
      toast.error("Failed to add supply item. Please try again.");
    }
  }, [isSuccess, isError]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      return toast.error("Please enter a valid amount greater than 0");
    }

    // Trigger the dynamic RTK mutation directly
    await addReliefGoods(formData);
  };

  return (
    <div className="min-h-screen lg:min-h-[85vh] flex items-center justify-center p-4 md:p-8 transition-all duration-300">
      {/* CARD WINDOW WRAPPER CONTAINER */}
      <div className="w-full max-w-xl lg:max-w-3xl bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
        <div className="h-2 w-full bg-gradient-to-r from-[#FDA4AF] to-[#fb7185]" />

        {/* LOADING STATE ACCENT OVERLAY */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-2">
            <Loader2 className="animate-spin text-[#fb7185]" size={40} />
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
              Saving Item...
            </p>
          </div>
        )}

        <div className="p-6 md:p-10">
          {/* CONTENT SECTION HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
              <PlusCircle className="text-[#fb7185]" size={28} /> Add New{" "}
              <span className="text-[#fb7185]">Supply</span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1 font-medium">
              Create and deploy new asset instances inside your global inventory
              structure.
            </p>
          </div>

          {/* MAIN DATA ARCHITECTURE FORM */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Supply Title */}
              <div className="form-control w-full">
                <label className="label-text font-bold text-slate-700 mb-2">
                  Supply Title
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Medical First Aid Kits"
                  className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none font-semibold text-sm transition-all h-12"
                />
              </div>

              {/* Category Selection Mapping */}
              <div className="form-control w-full">
                <label className="label-text font-bold text-slate-700 mb-2">
                  Category
                </label>
                <input
                  name="category"
                  type="text"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Medical Supplies"
                  className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none font-semibold text-sm transition-all h-12"
                />
              </div>

              {/* Item Type Identification */}
              <div className="form-control w-full">
                <label className="label-text font-bold text-slate-700 mb-2">
                  Specific Item
                </label>
                <input
                  name="item"
                  type="text"
                  required
                  value={formData.item}
                  onChange={handleChange}
                  placeholder="e.g., Bandages & Antiseptics"
                  className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none font-semibold text-sm transition-all h-12"
                />
              </div>

              {/* Total Financial Allocation Value */}
              <div className="form-control w-full">
                <label className="label-text font-bold text-slate-700 mb-2">
                  Amount (Value)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#fb7185] font-black text-sm">
                    $
                  </span>
                  <input
                    name="amount"
                    type="number"
                    required
                    value={formData.amount || ""}
                    onChange={handleChange}
                    placeholder="5000"
                    className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none font-black text-sm transition-all h-12 pl-8"
                  />
                </div>
              </div>
            </div>

            {/* Target Hosting Core Image URL */}
            <div className="form-control w-full">
              <label className="label-text font-bold text-slate-700 mb-2">
                Supply Image URL
              </label>
              <input
                name="image"
                type="url"
                required
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/images/supply-kit.jpg"
                className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none font-semibold text-sm transition-all h-12"
              />
            </div>

            {/* Short Tactical Description Field */}
            <div className="form-control w-full">
              <label className="label-text font-bold text-slate-700 mb-2">
                Brief Description
              </label>
              <input
                name="description"
                type="text"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a quick, concise high-level overview of the target materials."
                className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none font-semibold text-sm transition-all h-12"
              />
            </div>

            {/* Strategic Distribution Reason Statement */}
            <div className="form-control w-full">
              <label className="label-text font-bold text-slate-700 mb-2">
                Reason For Distribution
              </label>
              <textarea
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                placeholder="Elaborate extensively on the core deployment requirements and why this material is needed..."
                className="textarea textarea-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none font-semibold text-sm transition-all min-h-[100px] p-4 leading-relaxed"
              />
            </div>

            {/* SUBMIT EXECUTION TRIGGER */}
            <div className="pt-2">
              <button
                disabled={isLoading}
                type="submit"
                className="btn border-none w-full bg-[#FDA4AF] hover:bg-[#fb7185] text-white rounded-2xl font-black tracking-wider text-sm h-14 shadow-xl shadow-[#FDA4AF]/20 transition-all active:scale-[0.98] uppercase"
              >
                {isLoading ? "Publishing Object..." : "Deploy New Supply"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupply;
