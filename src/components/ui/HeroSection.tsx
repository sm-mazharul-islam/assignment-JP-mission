import headerOne from "../../assets/images/header-1.jpg";

// const contentStyle: React.CSSProperties = {
//   height: "500px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
//   width: "100%",
// };

const HeroSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2  ">
    <div className="  justify-center items-center bg-cyan-950 w-[80%] m-10 lg:m-0 lg:w-[100%] lg:p-20 text-white   ">
      <div className="lg:m-20">
        <div className="flex justify-center items-center ">
          <h2 className="text-4xl lg:text-5xl p-4 text-white font-bold m-4 flex mx-auto lg:m-0 text-center">
            EMERGENCY RELIEF DISTRIBUTION{" "}
          </h2>
        </div>
        <div>
          <p className="text-2xl text-center " style={{ color: "#D0D0D0" }}>
            Community Support Initiative: Relief Goods Distribution Program
          </p>
        </div>
        <div className="p-4 md:mt-4">
          <button className="mx-auto bg-rose-300 flex  rounded-lg text-white text-xl p-3">
            Get Involved
          </button>
        </div>
      </div>
    </div>
    <div>
      <div className=" ">
        <div className="bg-red-500  ">
          <img src={headerOne} className="md:h-[800px]" alt="" />
        </div>
        {/* <div>
          <img src={headerTwo} alt="" />
        </div>
        <div>
          <img src={headerThree}  alt="" />
        </div> */}
        {/* <div>
      <h3 style={contentStyle}>4</h3>
    </div> */}
      </div>
    </div>
  </div>
);

export default HeroSection;
