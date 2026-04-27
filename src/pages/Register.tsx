import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterUserMutation } from "../redux/api/api";

const Register = () => {
  const navigate = useNavigate();
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
      const response = await registerUser(formData).unwrap();

      if (response.success) {
        toast.success("Welcome! Account created.");
        navigate("/login");
      }
    } catch (err) {
      // Type assertion to fix the 'unexpected any' error
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
            <div className="form-control">
              <label className="label-text font-bold mb-2">Full Name</label>
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div className="form-control">
              <label className="label-text font-bold mb-2">Email</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none"
                placeholder="example@gmail.com"
              />
            </div>

            <div className="form-control">
              <label className="label-text font-bold mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered rounded-2xl bg-slate-50 border-slate-200 focus:border-[#FDA4AF] focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={isLoading}
              className="btn border-none w-full bg-[#FDA4AF] hover:bg-[#fb7185] text-white rounded-2xl font-bold h-14 mt-4 transition-all active:scale-95"
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                className="text-[#FDA4AF] font-bold hover:underline"
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
