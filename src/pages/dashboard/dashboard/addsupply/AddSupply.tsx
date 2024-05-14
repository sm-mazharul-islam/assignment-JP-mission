import { FormEvent, useState } from "react";
import { useAddReliefGoodsMutation } from "../../../../redux/api/api";
import "./AddSupply.css";

const AddSupply = () => {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  const [image, setImage] = useState("");
  const [reason, setReason] = useState("");

  const [addReliefGoods, { data, isLoading, isError, isSuccess }] =
    useAddReliefGoodsMutation();
  console.log({ data, isLoading, isSuccess, isError });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    form.reset();

    const reliefGoodsData = {
      title,
      category,
      item,
      description,
      amount,
      image,
      reason,
    };
    addReliefGoods(reliefGoodsData);
  };

  return (
    <div className="border shadow-lg bg-slate-200 lg:p-4 mt-40">
      <div>
        <h1 className="divider text-center text-xl font-bold m-8 ">
          Add New Supply
        </h1>
        <form onSubmit={onSubmit}>
          <div className="m-4">
            <input
              onBlur={(e) => setTitle(e.target.value)}
              id="title"
              placeholder="Add Title"
              className="input input-bordered w-[350px]  lg:w-[700px] mb-3 "
              required
            />
            <br />
            <input
              onBlur={(e) => setCategory(e.target.value)}
              id="category"
              placeholder="Add Category"
              className="input input-bordered w-[350px] lg:w-[700px] mb-3"
              required
            />
            <br />
            <input
              onBlur={(e) => setItem(e.target.value)}
              id="item"
              placeholder="Add Item"
              className="input input-bordered w-[350px] lg:w-[700px] mb-3"
              required
            />
            <br />
            <input
              onBlur={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Add Description"
              className="input input-bordered w-[350px]  lg:w-[700px] mb-3 "
              required
            />
            <br />
            <input
              onBlur={(e) => setReason(e.target.value)}
              id="reason"
              placeholder="Reason For"
              className="input input-bordered w-[350px]  lg:w-[700px] mb-3 "
              required
            />
            <br />
            <input
              onBlur={(e) => setAmount(parseInt(e.target.value))}
              id="amount"
              placeholder="Add Amount"
              className="input input-bordered w-[350px]  lg:w-[700px] mb-3 "
              required
            />
            <br />
            <input
              onBlur={(e) => setImage(e.target.value)}
              id="image"
              placeholder="Add Image"
              className="input input-bordered w-[350px]  lg:w-[700px] "
              required
            />
          </div>
          <div className="text-center">
            <button className=" text-xl btn border-y-stone-500 m-4  mx-auto">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupply;
