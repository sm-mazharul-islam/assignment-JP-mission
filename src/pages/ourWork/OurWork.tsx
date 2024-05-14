type TSocialDonation = {
  id: number;
  title: string;
  description: string;
  image_url: string;
};

const OurWork = ({ title, description, image_url }: TSocialDonation) => {
  return (
    <div>
      <img className="w-[200px] mx-auto" src={image_url} alt="" />
      <h1 className="text-4xl text-center font-bold">{title}</h1>
      <p className="text-xl text-center  mt-4">{description}</p>
    </div>
  );
};

export default OurWork;
