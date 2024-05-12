// type TReliefGoodsTableProps = {
//   _id: string;
//   title: string;
//   category: string;
//   amount_money: string;
//   description: string;
//   image: string;
//   reason: string;
// };

const AllSupply = ({ title, category, amount_money }) => {
  return (
    <div>
      <div className=" p-5  lg:h-full bg-gray-100">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className=" w-full">
            <thead>
              <tr>
                <th className="w-20">Title</th>
                <th className="">Category</th>
                <th className="w-24">Amount</th>
                <th className="w-24">Edit</th>
                <th className="w-32">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="whitespace-nowrap">{title}</td>
                <td className="whitespace-nowrap">{category}</td>
                <td className="whitespace-nowrap">{amount_money}</td>
                <td className="whitespace-nowrap">
                  <button>Edit</button>
                </td>
                <td className="whitespace-nowrap">
                  <button>Del</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden bg-red-500">
          <div className="bg-white space-y-3 p-4 rounded-lg shadow">
            <div className=" space-x-2 text-sm">
              <div>
                {/* <Link to="" className="text-blue-500 font-old hover:underline">
                  Donate Now extend package
                </Link> */}
              </div>

              <div className=" text-gray-500">
                <p className="text-center">Title: {title}</p>
              </div>
              {/* <div>...</div> */}
            </div>
            <div className="text-sm text-gray-700">
              <p className="text-center">Category : {category}</p>
            </div>
            <div className="text-center text-sm font-medium text-black">
              total: {amount_money}
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <div>
                <button className=" p-[3px]">Edit</button>
              </div>

              <div>
                <button className="ml-[260px] p-[3px] border border-red-50">
                  Del
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSupply;
