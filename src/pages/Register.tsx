import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterUserMutation } from "../redux/api/api";

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 🎯 Standardizing input data payload before sending to backend database node
      const submitPayload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const response = await registerUser(submitPayload).unwrap();

      // 🎯 [FLEXIBLE RESPONSE MAPPING]: Safely checking for token structure patterns
      const token =
        response?.token || response?.data?.token || response?.accessToken;
      const isSuccess = response?.success || (token ? true : false);

      if (isSuccess) {
        if (token) {
          // 🔒 Save session security context in local storage for automated header handling
          localStorage.setItem("token", token);
          toast.success("Account created! Welcome to the dashboard.");

          // ✅ Hard redirect to force quick state synchronization over system layout contexts
          window.location.href = "/dashboard";
        } else {
          toast.success("Welcome! Account created successfully.");
          window.location.href = "/login";
        }
      } else {
        toast.error(
          "Account created, but authentication mapping failed. Please log in manually.",
        );
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Registration operational failure:", err);
      const error = err as { data?: { message?: string } };
      toast.error(
        error.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50/50 py-12 px-4">
      <div className="card w-full max-w-md bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-[#FDA4AF] to-[#fb7185]" />
        <div className="p-10">
          <h2 className="text-3xl font-black text-center text-slate-800 mb-8">
            Join Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="form-control">
              <label className="label-text font-bold mb-2 text-slate-700">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none w-full p-4 h-12"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label-text font-bold mb-2 text-slate-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none w-full p-4 h-12"
                placeholder="example@gmail.com"
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label-text font-bold mb-2 text-slate-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none w-full p-4 h-12"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="btn border-none w-full bg-[#FDA4AF] hover:bg-[#fb7185] text-white rounded-2xl font-bold h-14 mt-4 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="loading loading-spinner h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                className="text-[#FDA4AF] font-bold hover:underline transition-colors hover:text-[#fb7185]"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
