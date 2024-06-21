import mark from "../../../../src/assets/images/mark.png";

type TTestimonials = {
  id: number;
  name: string;
  image: string;
  description: string;
  star: number;
};

const Testimonial = ({ testimonial }: { testimonial: TTestimonials }) => {
  const { name, image, description } = testimonial;
  return (
    // <div className=" card h-[550px] w-[80%] bg-base-100">
    //   <div className=" h-full rounded mx-auto ">
    //     <div className="w-40 h-40  border-8 border-white shadow-lg mx-auto">
    //       <img src={image} className="h-36 w-36" alt="" />
    //     </div>
    //     <div className="w-11 mx-auto">
    //       <img
    //         src={mark}
    //         className="border-4 border-white rounded-full bg-white shadow-lg mx-auto w-11 h-11 -mt-9 relative"
    //         alt=""
    //       />
    //     </div>
    //     <p className=" text-justify mt-4 ">{description}</p>
    //     <h2 className="text-2xl text-center mt-2">{name}</h2>
    //   </div>
    // </div>
    <div>
      <div className="card card-side bg-base-100 shadow-xl mb-10">
        <div className="hero-content flex-col lg:flex-row ">
          <img
            src={image}
            className="max-w-sm rounded-lg"
            style={{
              width: "350px",
              height: "350px",
            }}
          />
          <div className="">
            <h1 className="text-5xl font-bold lg:card-title">{name}</h1>
            <p className="lg:card-title">kasjdfklsdajkl</p>
            <div>
              <img
                src={mark}
                className=" -mt-3 absolute "
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "10px",
                  // marginTop: "50px",
                  transform: "rotate(180deg) translateY(-100%)",
                }}
              />
              <div className="p-4 lg:w-[800px]">
                <p className="py-6 p-10 items-center text-justify justify-center text-gray-500">
                  {description}
                </p>
              </div>
              <img
                src={mark}
                className=" ml-[470px] mt-[-250px] absolute lg:ml-[64%] lg:mt-[-170px]"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
