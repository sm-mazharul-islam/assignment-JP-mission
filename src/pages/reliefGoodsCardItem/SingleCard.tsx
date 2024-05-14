import { Link } from "react-router-dom";

// "title": "Baby Care Package",
//       "category": "Baby Supplies",
//       "amount": "1 Package",
//       "amount_money": "$40",
//       "description": {
//         "items": [
//           "20 diapers",
//           "2 packs of baby wipes",
//           "5 jars of baby food",
//           "1 baby blanket"
//         ]
//       },
//       "image_url": "https://example.com/baby_care_image.jpg",
//       "extra_data": {
//         "reason": "To cater to the special needs of infants and young children."
//       }

// type TReliefGoodsCardProps = {
//   _id: string;
//   category: string;
//   title: string;
//   description: string;
//   image_url: string;
// };

export type TPackage = {
  _id: string;
  title: string;
  category: string;
  item: string;
  amount: number;
  description: string;
  image: string;
  reason: string;
};

const SingleCard = ({ _id, title, image, category, amount }: TPackage) => {
  // const { title } = item;
  return (
    <>
      <div>
        <div className="card min-w-full h-[550px] bg-base-100 shadow-xl">
          <div>
            <img className=" rounded-xl h-[400px] " alt="example" src={image} />

            <div className="">
              <h2 className="text-2xl  text-center font-bold">{title}</h2>
              <p className="pt-2 text-center text-xl">Category: {category}</p>
            </div>
            <div className=" justify-center items-end flex gap-x-24">
              <p className="text-xl pt-2">
                Amount: <span className="font-bold"></span>${amount}
              </p>
              <Link className="flex " to={`/relief-goods/${_id}`}>
                <button className="  text-md bg-violet-400 flex  rounded-md text-white-500 font-bold p-[5px] mt-4 ">
                  View Detail
                  <svg
                    className="w-[30px] h-[25px]"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
