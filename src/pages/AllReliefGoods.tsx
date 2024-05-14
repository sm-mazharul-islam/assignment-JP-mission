import Container from "../components/ui/Container";
import { useGetReliefGoodsQuery } from "../redux/api/api";
import SingleCard from "./reliefGoodsCardItem/SingleCard";

const AllReliefGoods = () => {
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
    <Container>
      <div>
        <div className="  grid  grid-rows-1 justify-center lg:grid-cols-3 md:grid-cols-2 md:p-4  gap-10  ">
          {reliefGoods?.data?.map((item) => (
            <SingleCard key={item._id} {...item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllReliefGoods;
