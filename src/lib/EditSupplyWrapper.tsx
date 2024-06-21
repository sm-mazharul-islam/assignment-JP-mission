import { useParams } from "react-router-dom";
import EditSupply from "../pages/dashboard/dashboard/editsupply/EditSupply";

export const EditSupplyWrapper = () => {
  // Simulate fetching supply data based on route parameter
  const { id } = useParams<{ id: string }>();

  // Replace these values with actual data fetched from backend
  const supplyData = {
    _id: id || "",
    title: "",
    category: "",
    item: "",
    amount: 0,
    description: "",
    image: "",
    reason: "",
  };

  return (
    <EditSupply
      _id={supplyData._id}
      title={supplyData.title}
      category={supplyData.category}
      item={supplyData.item}
      amount={supplyData.amount}
      description={supplyData.description}
      image={supplyData.image}
      reason={supplyData.reason}
    />
  );
};
