import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50/50 py-12 px-4">
      {/* Main Card */}
      <div className="card w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(253,164,175,0.15)] border border-slate-100 overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FDA4AF] to-[#fb7185]" />

        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-800">Welcome Back</h2>
            <p className="text-slate-500 text-sm mt-2">
              Log in to continue your relief mission
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
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
                className="input input-bordered w-full rounded-2xl focus:border-[#FDA4AF] focus:outline-none bg-slate-50 border-slate-200 transition-all px-6"
              />
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="label flex justify-between">
                <span className="label-text font-bold text-slate-700">
                  Password
                </span>
                <span className="label-text-alt text-[#FDA4AF] font-semibold cursor-pointer hover:underline">
                  Forget Password?
                </span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full rounded-2xl focus:border-[#FDA4AF] focus:outline-none bg-slate-50 border-slate-200 transition-all px-6"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn border-none w-full bg-[#FDA4AF] hover:bg-[#fb7185] text-white rounded-2xl font-bold text-lg h-14 mt-4 shadow-lg shadow-[#FDA4AF]/30 transition-all"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm">
              New to Relief Project?{" "}
              <Link
                className="text-[#FDA4AF] font-bold hover:underline"
                to="/register"
              >
                Create new account
              </Link>
            </p>
          </div>

          <div className="divider my-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
            OR
          </div>

          {/* Social Login */}
          <button className="btn btn-outline border-slate-200 hover:bg-slate-50 hover:text-slate-800 hover:border-[#FDA4AF] w-full rounded-2xl h-14 font-bold flex items-center justify-center gap-3 transition-all">
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

export default Login;
