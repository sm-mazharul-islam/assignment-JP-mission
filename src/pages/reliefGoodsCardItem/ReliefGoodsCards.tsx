import { useGetReliefGoodsByIdQuery } from "../../redux/api/api";

const ReliefGoodsCards = () => {
  // From Server
  const {
    data: reliefGoods,
    isLoading,
    isError,
  } = useGetReliefGoodsByIdQuery(undefined);
  console.log(reliefGoods);

  // console.log(reliefGoods);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{reliefGoods.title}</h1>
    </div>
  );
};

export default ReliefGoodsCards;
