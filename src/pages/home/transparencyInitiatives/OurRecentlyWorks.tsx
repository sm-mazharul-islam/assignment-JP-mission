type SuccessReliefGoods = {
  id: number;
  image: string;
  description: string;
  star: number;
};

const OurRecentlyWorks = ({ image, description }: SuccessReliefGoods) => {
  return (
    <>
      <div
        style={{ background: "#F2F2F2F2" }}
        className="h-[600px] w-[100%] mb-16 "
      >
        <img
          className="w-[50%]"
          style={{ width: "100%", height: "400px" }}
          src={image}
          alt=""
        />
        <p className="text-justify text-md">{description}</p>
        {/* <button className="underline decoration-sky-500">See More </button> */}
      </div>
    </>
  );
};

export default OurRecentlyWorks;
