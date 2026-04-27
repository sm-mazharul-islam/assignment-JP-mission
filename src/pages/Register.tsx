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
    console.log("A. Frontend Submit Clicked. Data:", formData);

    try {
      console.log("B. Calling registerUser mutation...");
      const response = await registerUser(formData).unwrap();

      console.log("C. Mutation Success Response:", response);
      toast.success("Welcome! Account created.");
      navigate("/login");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      console.error("D. Mutation Catch Block Error:", error);
      toast.error(error.data?.message || "Check console for connection error");
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
                onChange={handleChange}
                className="input input-bordered rounded-2xl bg-slate-50"
                placeholder="John Doe"
              />
            </div>

            <div className="form-control">
              <label className="label-text font-bold mb-2">Email</label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="input input-bordered rounded-2xl bg-slate-50"
                placeholder="example@gmail.com"
              />
            </div>

            <div className="form-control">
              <label className="label-text font-bold mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="input input-bordered rounded-2xl bg-slate-50"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={isLoading}
              className="btn border-none w-full bg-[#FDA4AF] hover:bg-[#fb7185] text-white rounded-2xl font-bold h-14 mt-4"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link className="text-[#FDA4AF] font-bold" to="/login">
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
