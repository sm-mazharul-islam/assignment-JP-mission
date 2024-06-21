// import { useState } from "react";
// import { useUpdateSuppliesMutation } from "../../../../redux/api/api";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";

// type TSupplyProps = {
//   _id: string;
//   title: string;
//   category: string;
//   item: string;
//   amount: number;
//   description: string;
//   image: string;
//   reason: string;
// };

// const EditSupply = ({
//   title,
//   description,
//   _id,
//   item,
//   image,
//   category,
//   reason,
//   amount,
// }: TSupplyProps) => {

//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch();

//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [item, setItem] = useState('');
//   const [amount, setAmount] = useState(0);
//   const [description, setDescription] = useState('');
//   const [reason, setReason] = useState('');
//   const [image, setImage] = useState('');

//   const [updateSupplies] = useUpdateSuppliesMutation();

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//   const updateData = () => {
//     const options = {

//         title,
//         description,
//         category,
//         image,
//         item,
//         reason,
//         amount,

//     };
//     dispatch(updateSupplies({ id, data: updatedData }));

//   };
//   return (
//     <div className="border shadow-lg bg-slate-200 lg:p-4 mt-40">
//       <div>
//         <h1 className="divider text-center text-xl font-bold m-8 ">
//           Edit Supply
//         </h1>
//         <form onChange={onSubmit}>
//           <div className="m-4">
//             <input
//               // onBlur={(e) => setTitle(e.target.value)}
//               id="title"
//               placeholder="Add Title"
//               className="input input-bordered w-[350px]  lg:w-[700px] mb-3 "
//               required
//             />
//             <br />
//             <input
//               // onBlur={(e) => setCategory(e.target.value)}
//               id="category"
//               placeholder="Add Category"
//               className="input input-bordered w-[350px] lg:w-[700px] mb-3"
//               required
//             />
//             <br />
//             <input
//               // onBlur={(e) => setItem(e.target.value)}
//               id="item"
//               placeholder="Add Item"
//               className="input input-bordered w-[350px] lg:w-[700px] mb-3"
//               required
//             />
//             <br />
//             <input
//               // onBlur={(e) => setDescription(e.target.value)}
//               id="description"
//               placeholder="Add Description"
//               className="input input-bordered w-[350px]  lg:w-[700px] mb-3 "
//               required
//             />
//             <br />
//             <input
//               // onBlur={(e) => setReason(e.target.value)}
//               id="reason"
//               placeholder="Reason For"
//               className="input input-bordered w-[350px]  lg:w-[700px] mb-3 "
//               required
//             />
//             <br />
//             <input
//               // onBlur={(e) => setAmount(parseInt(e.target.value))}
//               id="amount"
//               placeholder="Add Amount"
//               className="input input-bordered w-[350px]  lg:w-[700px] mb-3 "
//               required
//             />
//             <br />
//             <input
//               // onBlur={(e) => setImage(e.target.value)}
//               id="image"
//               placeholder="Add Image"
//               className="input input-bordered w-[350px]  lg:w-[700px] "
//               required
//             />
//           </div>
//           <div className="text-center">
//             <button className=" text-xl btn border-y-stone-500 m-4  mx-auto">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditSupply;

import React, { useState } from "react";
import { useUpdateSuppliesMutation } from "../../../../redux/api/api";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Supply,
  updateSupply,
} from "../../../../redux/features/reliefGoodsSlice";
import { toast } from "sonner";

interface SupplyProps {
  _id: string;
  title: string;
  category: string;
  item: string;
  amount: number;
  description: string;
  image: string;
  reason: string;
}

// interface UpdateSupplyData {
//   title?: string;
//   category?: string;
//   item?: string;
//   amount?: number;
//   description?: string;
//   image?: string;
//   reason?: string;
// }

// interface UpdateSupplyPayload {
//   id: string; // Type of the supply id (_id)
//   updatedData: Partial<SupplyProps>; // Type of the updated data for the supply
// }

const EditSupply: React.FC<SupplyProps> = ({
  title: initialTitle,
  description: initialDescription,
  _id,
  item: initialItem,
  image: initialImage,
  category: initialCategory,
  reason: initialReason,
  amount: initialAmount,
}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  // State variables for form inputs
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);
  const [item, setItem] = useState(initialItem);
  const [amount, setAmount] = useState(initialAmount);
  const [description, setDescription] = useState(initialDescription);
  const [reason, setReason] = useState(initialReason);
  const [image, setImage] = useState(initialImage);

  const [updateSupplies] = useUpdateSuppliesMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare data object to update supply
    const updatedData: Partial<Supply> = {
      title,
      category,
      item,
      amount,
      description,
      reason,
      image,
    };

    try {
      // Dispatch updateSupply action from Redux slice
      await dispatch(updateSupply({ id: _id, updatedData }));

      // Call the mutation hook to update supplies
      await updateSupplies({ id, data: updatedData });

      // Show success toast
      toast.success("Supply updated successfully", {
        // position: toast.POSITION.TOP_CENTER,
        // autoClose: 2000,
      });

      // Optionally reset form fields or perform other actions after successful update
    } catch (error) {
      // Show error toast
      toast.error("Failed to update supply", {
        // position: toast.POSITION.TOP_CENTER,
        // autoClose: 2000,
      });
    }
  };
  return (
    <div className="border shadow-lg bg-slate-200 lg:p-4 mt-40">
      <div>
        <h1 className="divider text-center text-xl font-bold m-8 ">
          Edit Supply
        </h1>
        <form onSubmit={onSubmit}>
          <div className="m-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              placeholder="Add Title"
              className="input input-bordered w-[350px] lg:w-[700px] mb-3"
              required
            />
            <br />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              placeholder="Add Category"
              className="input input-bordered w-[350px] lg:w-[700px] mb-3"
              required
            />
            <br />
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              id="item"
              placeholder="Add Item"
              className="input input-bordered w-[350px] lg:w-[700px] mb-3"
              required
            />
            <br />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Add Description"
              className="input input-bordered w-[350px] lg:w-[700px] mb-3"
              required
            />
            <br />
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              id="reason"
              placeholder="Reason For"
              className="input input-bordered w-[350px] lg:w-[700px] mb-3"
              required
            />
            <br />
            <input
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              id="amount"
              placeholder="Add Amount"
              className="input input-bordered w-[350px] lg:w-[700px] mb-3"
              required
            />
            <br />
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              id="image"
              placeholder="Add Image"
              className="input input-bordered w-[350px] lg:w-[700px]"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="text-xl btn border-y-stone-500 m-4 mx-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupply;
