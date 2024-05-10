import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="h-[500px] flex justify-center items-center card w-96 bg-base-100 shadow-xl mx-auto m-11 t4">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <p className="text-red-500"></p>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
            />
            <p className="text-red-500"></p>
          </div>

          <input
            className="btn btn-accent w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          <p className="text-red-600"></p>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Register;
