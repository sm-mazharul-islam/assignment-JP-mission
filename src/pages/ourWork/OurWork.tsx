const OurWork = ({ someCategories }) => {
  const { title, description, image_url } = someCategories;
  return (
    <div>
      <img className="w-[200px] mx-auto" src={image_url} alt="" />
      <h1 className="text-4xl text-center font-bold">{title}</h1>
      <p className="text-xl text-center  mt-4">{description}</p>
    </div>
  );
};

export default OurWork;
