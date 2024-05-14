import { Link } from "react-router-dom";
import { useGetReliefGoodsQuery } from "../../redux/api/api";
import SingleCard, { TPackage } from "./SingleCard";

const SingleCards = () => {
  // From Server
  const {
    data: reliefGoods,
    isLoading,
    isError,
  } = useGetReliefGoodsQuery(undefined);
  // console.log(reliefGoods);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>Welcome to the SingleCards page</h1>
      <div className="  grid  grid-rows-1 justify-center lg:grid-cols-3 md:grid-cols-2 md:p-4  gap-10  ">
        {reliefGoods?.data?.slice(0, 6).map((item: TPackage) => (
          <SingleCard key={item._id} {...item} />
        ))}
      </div>
      <Link to="/relief-goods">
        <button className="mx-auto  items-center justify-center flex btn bg-rose-300 text-white text-xl m-4">
          View All Relief goods
        </button>
      </Link>
      <span className="divider"></span>
    </div>
  );
};

export default SingleCards;
