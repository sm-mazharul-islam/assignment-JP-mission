type SuccessReliefGoods = {
  id: number;
  image: string;
  description: string;
  star: number;
};

const OurRecentlyWorks = ({ image, description }: SuccessReliefGoods) => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl mb-10">
        <img
          className="w-[50%]"
          style={{ width: "100%", height: "400px" }}
          src={image}
          alt=""
        />
        <p className="text-justify text-md h-[200px] p-5">{description}</p>
        <button className="underline decoration-sky-500">See More </button>
      </div>
    </>
  );
};

export default OurRecentlyWorks;
