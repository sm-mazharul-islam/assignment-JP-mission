import { useParams } from "react-router-dom";
import { useGetReliefGoodsByIdQuery } from "../../redux/api/api";

const AllReliefGoodsDetail = () => {
  const { id } = useParams();
  console.log(id);
  const {
    data: reliefGoods,
    isLoading,
    isError,
  } = useGetReliefGoodsByIdQuery(id);
  console.log(reliefGoods);
  console.log(reliefGoods);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <div className="hero  bg-base-100 ">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <div>
                <img
                  src=""
                  style={{ width: "488px", height: "565px" }}
                  alt=""
                />
              </div>

              <div className="grid grid-rows-1 grid-flow-col gap-4 mr-9">
                {/* {image.map((img) => {
                  return (
                    <figure>
                      <img
                        src={img.url}
                        style={{
                          width: "150px",
                          height: "100px",
                          marginTop: "10px",
                        }}
                        alt=""
                        onClick={() => setMainImage(img)}
                      />
                    </figure>
                  );
                })} */}
              </div>
            </div>

            <div className="m-9">
              <h1 className="text-5xl font-bold">{reliefGoods.title}</h1>
              <p className="py-2">Write your comment</p>
              <p className="py-2 text-[15px]">Not Available</p>
              <div className="card-actions  justify-start text-center">
                <del className="text-xl font-bold">MRP:$ 250</del>
                <p className="px-4 text-xl font-bold">MRP: $5000</p>
              </div>
              <p className="py-4 text-xl">description</p>
              {/* <p className="py-2 ">
                {" "}
                Quantity:
                <button
                  className="btn btn-outline p-3 border-2 m-2 "
                  onClick={() => setIncrease()}
                >
                  +
                </button>
                <span className="p-3 border-2">{amount}</span>
                <button
                  className="btn btn-outline p-3 border-2 m-2"
                  onClick={() => setDecrease()}
                >
                  -
                </button>
              </p> */}

              <button className="btn btn-outline  my-2">Add To Cart</button>
              <br />
              <button className="btn btn-outline  my-2">Add To Wishlist</button>
              <br />
              <button className="btn btn-outline  my-2">Ask a Question</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReliefGoodsDetail;
