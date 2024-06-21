import { Link } from "react-router-dom";
import notfound from "../../assets/images/not found.png";
const NotFoundPage = () => {
  return (
    <>
      <div className="mx-auto items-center justify-center flex m-44">
        <img width="50%" src={notfound} alt="" />
      </div>
      <Link className="items-center justify-center mx-auto flex pb-12" to="/">
        <button className=" border-rose-300 border p-2 bg-slate-500 text-red-400 font-bold w-[100px]">
          Go Back
        </button>
      </Link>
    </>
  );
};

export default NotFoundPage;
