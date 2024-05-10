import { useGetReliefGoodsQuery } from "../../redux/api/api";
import SingleCard from "./SingleCard";

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
        {reliefGoods?.data?.map((item) => (
          <SingleCard key={item._id} {...item} />
        ))}
      </div>
      <button className="mx-auto  items-center justify-center flex">
        View All Relief goods
      </button>
    </div>
  );
};

export default SingleCards;
