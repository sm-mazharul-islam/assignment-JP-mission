import { useParams } from "react-router-dom";
import { useGetReliefGoodsByIdQuery } from "../../redux/api/api";

const AllReliefGoodsDetail = () => {
  const { id } = useParams();
  // console.log(id);
  const {
    data: reliefGoods,
    isLoading,
    isError,
  } = useGetReliefGoodsByIdQuery(id);
  // console.log(reliefGoods);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Loading...</p>;
  }

  return (
    <div className="lg:m-[100px]">
      <div>
        <div className="hero  bg-base-100 ">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <div>
                <img
                  src={reliefGoods.image}
                  className="w-[100%] h-[500px] lg:w-[488px] lg:h-[565px]"
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
              <h1 className="text-2xl lg:text-5xl font-bold">
                {reliefGoods.title}
              </h1>
              <p className="py-2 ">Category: {reliefGoods.category}</p>

              <p className=" text-xl font-bold">USD: ${reliefGoods.amount}</p>

              <p className="py-4 text-xl">{reliefGoods.description}</p>
              <p className="py-4 text-xl">
                " {""}
                {reliefGoods.reason}
                {""}"
              </p>
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

              <button className="btn btn-outline  my-2">Ask a Question</button>
              <br />
              <textarea
                placeholder="Write your question"
                className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              ></textarea>
              <br />
              <button className="btn btn-outline  my-2">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReliefGoodsDetail;
