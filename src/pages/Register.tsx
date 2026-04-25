import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50/50 py-12 px-4">
      {/* Main Card */}
      <div className="card w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(253,164,175,0.15)] border border-slate-100 overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FDA4AF] to-[#fb7185]" />

        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-800">Join Us</h2>
            <p className="text-slate-500 text-sm mt-2">
              Start your journey of spreading kindness
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Name Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-slate-700">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full rounded-2xl focus:border-[#FDA4AF] focus:outline-none bg-slate-50 border-slate-200 transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-slate-700">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="input input-bordered w-full rounded-2xl focus:border-[#FDA4AF] focus:outline-none bg-slate-50 border-slate-200 transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-slate-700">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full rounded-2xl focus:border-[#FDA4AF] focus:outline-none bg-slate-50 border-slate-200 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn border-none w-full bg-[#FDA4AF] hover:bg-[#fb7185] text-white rounded-2xl font-bold text-lg h-14 mt-4 shadow-lg shadow-[#FDA4AF]/30 transition-all"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link
                className="text-[#FDA4AF] font-bold hover:underline"
                to="/login"
              >
                Please Login
              </Link>
            </p>
          </div>

          <div className="divider my-8 text-slate-400 text-xs font-bold">
            OR
          </div>

          {/* Social Login */}
          <button className="btn btn-outline border-slate-200 hover:bg-slate-50 hover:text-slate-800 hover:border-[#FDA4AF] w-full rounded-2xl h-14 font-bold flex items-center gap-3 transition-all">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg"
              alt="google"
              className="w-5 h-5"
            />
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
