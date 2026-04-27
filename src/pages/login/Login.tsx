import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginUserMutation } from "../../redux/api/api";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  // 1. Local State for Form Inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 2. Update state when user types
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("A. Attempting Login with:", formData.email);

    try {
      // Trigger the mutation
      const response = await loginUser(formData).unwrap();

      console.log("B. Login Success Response:", response);
      toast.success("Welcome back!");
      navigate("/"); // Redirect to home/dashboard
    } catch (err) {
      const error = err as { data?: { message?: string } };
      console.error("C. Login Error:", error);
      toast.error(error.data?.message || "Login failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50/50 py-12 px-4">
      <div className="card w-full max-w-md bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-[#FDA4AF] to-[#fb7185]" />

        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-800">Welcome Back</h2>
            <p className="text-slate-500 text-sm mt-2">
              Log in to continue your mission
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="form-control w-full">
              <label className="label-text font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <div className="flex justify-between mb-2">
                <label className="label-text font-bold text-slate-700">
                  Password
                </label>
                <span className="text-xs text-[#FDA4AF] font-bold cursor-pointer hover:underline">
                  Forget Password?
                </span>
              </div>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none"
              />
            </div>

            {/* Login Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="btn border-none w-full bg-[#FDA4AF] hover:bg-[#fb7185] text-white rounded-2xl font-bold text-lg h-14 mt-4"
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm">
              New to Relief Project?{" "}
              <Link
                className="text-[#FDA4AF] font-bold hover:underline"
                to="/register"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
