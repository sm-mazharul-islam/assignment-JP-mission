import mark from "../../../../src/assets/images/mark.png";

const Testimonial = ({ testimonial }) => {
  const { name, image, description, star } = testimonial;
  return (
    <div className=" card h-[550px] w-[80%] bg-base-100">
      <div className=" h-full rounded mx-auto ">
        <div className="w-40 h-40  border-8 border-white shadow-lg mx-auto">
          <img src={image} className="h-36 w-36" alt="" />
        </div>
        <div className="w-11 mx-auto">
          <img
            src={mark}
            className="border-4 border-white rounded-full bg-white shadow-lg mx-auto w-11 h-11 -mt-9 relative"
            alt=""
          />
        </div>
        <p className=" text-justify mt-4 ">{description}</p>
        <h2 className="text-2xl text-center mt-2">{name}</h2>
      </div>
    </div>
  );
};

export default Testimonial;
