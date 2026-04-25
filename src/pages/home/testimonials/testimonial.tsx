import mark from "../../../../src/assets/images/mark.png";

type TTestimonials = {
  id: number;
  name: string;
  image: string;
  description: string;
  star: number;
};

const Testimonial = ({ testimonial }: { testimonial: TTestimonials }) => {
  const { name, image, description, star } = testimonial;

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl mb-10 lg:w-[900px]">
        <div className="hero-content flex-col lg:flex-row ">
          <img
            src={image}
            className="max-w-sm rounded-lg"
            style={{
              width: "250px",
              height: "250px",
            }}
          />
          <div>
            <h1 className="text-2xl font-bold ">{name}</h1>
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
              <div className="p-4 ">
                <p className="py-6 p-10 items-center text-[12px] text-justify justify-center text-gray-500">
                  {description}
                </p>
              </div>
            </div>
            <div className="rating rating-lg rating-half">
              {[...Array(star)].map((_, index) => (
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-indigo-500"
                  value={index + 1}
                  checked={index < star}
                />
              ))}

              {/* {halfStar && (
                <input
                  type="radio"
                  name="rating-10"
                  className="mask mask-star-2 mask-half-1 bg-green-500"
                  value={fullStars + 1}
                  checked={true}
                />
              )} */}
            </div>
          </div>
          <img
            src={mark}
            className=" ml-[340px] mb-[-115px] absolute lg:ml-[820px] lg:mb-[100px] lg:bg-fixed"
            style={{
              width: "30px",
              height: "30px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
