// import { useGetReliefGoodsQuery } from "../../../../redux/api/api";
// import AllSupply from "./AllSupply";

// const AllSupplys = () => {
//   const {
//     data: reliefGoods,
//     isLoading,
//     isError,
//   } = useGetReliefGoodsQuery(undefined);
//   // console.log(reliefGoods);
//   if (isLoading) {
//     return <p>Loading...</p>;
//   }
//   if (isError) {
//     return <p>Loading...</p>;
//   }
//   return (
//     <div>
//       <div>
//         {reliefGoods?.data?.map((item) => (
//           <AllSupply key={item._id} {...item} />

//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllSupplys;
