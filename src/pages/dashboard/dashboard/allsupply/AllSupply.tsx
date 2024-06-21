import { Link } from "react-router-dom";
import {
  useGetReliefGoodsQuery,
  useDeleteReliefGoodsMutation,
} from "../../../../redux/api/api";
import { MouseEventHandler, useState } from "react";
type TReliefGoodsTableProps = {
  _id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
  image: string;
  reason: string;
};

interface ItemType {
  _id: string;
  title: string;
}

const AllSupply = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const {
    data: reliefGoods,
    isLoading,
    isError,
  } = useGetReliefGoodsQuery(undefined);
  // console.log(reliefGoods);

  const [deleteReliefGoods] = useDeleteReliefGoodsMutation();

  // const handleDelete = async (item) => {
  //   try {
  //     await deleteReliefGoods(item).unwrap();
  //     toast.success("Item deleted successfully");
  //   } catch (error) {
  //     toast.error("Error deleting item");
  //   }
  // };

  const handleAcceptClick = (item: ItemType) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleConfirmDelete: MouseEventHandler<HTMLButtonElement> = () => {
    if (selectedItem && selectedItem._id) {
      deleteReliefGoods(selectedItem._id);
      setShowPopup(false);
      setSelectedItem(null);
    }
  };

  const handleDeny = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Loading...</p>;
  }
  // const deleteHandler = (id) => {
  //   deleteReliefGoods(id);
  // };
  return (
    <div>
      <div className=" p-5 lg:w-[1300px] lg:h-full ">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className=" w-full">
            <thead>
              <tr className="text-2xl">
                <th className="w-20 text-center">Title</th>
                <th className="text-center">Category</th>
                <th className="w-24 text-center">Amount</th>
                <th className="w-24 text-center">Edit</th>
                <th className="w-32 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xl">
              {reliefGoods?.data?.map((item: TReliefGoodsTableProps) => (
                <tr>
                  <td className="whitespace-nowrap text-center">
                    {item.title}
                  </td>
                  <td className="whitespace-nowrap text-center">
                    {item.category}
                  </td>
                  <td className="whitespace-nowrap text-center">
                    <span className="font-bold">$</span>
                    {item.amount}
                  </td>
                  <td className="whitespace-nowrap text-center">
                    <Link to={`/dashboard/edit-supply/${item._id}`}>
                      <button>
                        <svg
                          className="w-[25px] text-purple-500"
                          fill="none"
                          key={item._id}
                          strokeWidth="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          ></path>
                        </svg>
                      </button>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap text-center">
                    <div>
                      <button onClick={() => handleAcceptClick(item)}>
                        <svg
                          className="w-[25px] text-red-500"
                          fill="none"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Are you sure you want to delete {selectedItem?.title}</span>
            <div>
              <button className="btn btn-sm" onClick={handleDeny}>
                Deny
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleConfirmDelete}
              >
                Accept
              </button>
            </div>
          </div> */}

          {showPopup && (
            <div role="alert" className="toast toast-top toast-left">
              <div className="alert bg-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div className="stroke-info shrink-0 w-96 h-45">
                  <span className="ml-[8px] justify-center text-[20px] text-white">
                    Are you sure you want to delete {selectedItem?.title} ?
                  </span>
                  <div className="flex gap-56">
                    <button className="btn btn-sm" onClick={handleDeny}>
                      Deny
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={handleConfirmDelete}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden ">
          {reliefGoods?.data?.map((item: TReliefGoodsTableProps) => (
            <div className="bg-white space-y-3 p-4 rounded-lg shadow">
              <div className=" space-x-2 text-sm">
                <div>
                  {/* <Link to="" className="text-blue-500 font-old hover:underline">
                  Donate Now extend package
                </Link> */}
                </div>

                <div className=" text-gray-500">
                  <p className="text-center">Title: {item.title}</p>
                </div>
                {/* <div>...</div> */}
              </div>
              <div className="text-sm text-gray-700">
                <p className="text-center">Category : {item.category}</p>
              </div>
              <div className="text-center text-sm font-medium text-black">
                total: {item.amount}
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <div>
                  <button className=" p-[3px]">Edit</button>
                </div>

                <div>
                  <button
                    onClick={() => deleteReliefGoods(item._id)}
                    className="ml-[240px] p-[4px] border border-red-500 bg-red-800 text-white"
                  >
                    Del
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllSupply;
