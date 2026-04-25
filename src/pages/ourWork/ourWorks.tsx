import Container from "../../components/ui/Container";
import OurWork from "./OurWork";

const OurWorks = () => {
  const reliefCategories = [
    {
      id: 1,
      title: "Recovery Help",
      description:
        "Providing aid to individuals and communities recovering from natural disasters or emergencies.",
      image_url:
        "https://web.sociolib.com/relief/wp-content/uploads/sites/18/2023/06/rel8.png",
    },
    {
      id: 2,
      title: "Save the Earth",
      description:
        "Supporting environmental conservation efforts aimed at preserving the planet for future generations.",
      image_url: "https://i.ibb.co/DVh2rY0/rel9.png",
    },
    {
      id: 3,
      title: "Human Rights",
      description:
        "Advocating for and supporting initiatives that protect and uphold human rights for all individuals.",
      image_url: "https://i.ibb.co/9bkTvrM/rel10.png",
    },
    {
      id: 4,
      title: "Blood Donation",
      description:
        "Encouraging voluntary blood donations to save lives and support healthcare systems.",
      image_url: "https://i.ibb.co/SNsxYmm/rel28.png",
    },
    {
      id: 5,
      title: "Medicine",
      description:
        "Providing essential medicines and healthcare supplies to underserved communities.",
      image_url: "https://i.ibb.co/g3qQ6GJ/rel29.png",
    },
    {
      id: 6,
      title: "Emergency",
      description:
        "Responding swiftly to urgent situations and providing immediate assistance to those affected.",
      image_url: "https://i.ibb.co/v153RCX/rel30.png",
    },
    {
      id: 7,
      title: "Social Donation",
      description:
        "Supporting various social causes such as poverty alleviation and food security.",
      image_url: "https://i.ibb.co/g6fyVVf/rel33.png",
    },
    {
      id: 8,
      title: "Healthcare",
      description:
        "Strengthening healthcare systems and providing access to quality medical services.",
      image_url: "https://i.ibb.co/CJVrJfC/rel34.png",
    },
    {
      id: 9,
      title: "Education",
      description:
        "Promoting access to education and learning opportunities for children and adults alike.",
      image_url:
        "https://web.sociolib.com/relief/wp-content/uploads/sites/18/2023/06/rel35.png",
    },
    {
      id: 10,
      title: "Gift for Kids",
      description:
        "Providing joy and support to children through gifts, toys, and educational materials.",
      image_url:
        "https://web.sociolib.com/relief/wp-content/uploads/sites/18/2023/06/rel36.png",
    },
    {
      id: 11,
      title: "Financial Help",
      description:
        "Offering financial assistance and resources to individuals and families facing economic challenges.",
      image_url:
        "https://web.sociolib.com/relief/wp-content/uploads/sites/18/2023/06/rel37.png",
    },
    {
      id: 12,
      title: "Spread the Love",
      description:
        "Encouraging acts of kindness, compassion, and generosity to create positive ripple effects.",
      image_url:
        "https://web.sociolib.com/relief/wp-content/uploads/sites/18/2023/06/rel38.png",
    },
  ];

  return (
    <section className=" bg-white overflow-hidden">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24 relative">
          {/* Decorative blur element */}
          <div className="absolute -top-20 w-64 h-64 bg-[#FDA4AF]/10 blur-[100px] -z-10 rounded-full" />

          <span className="px-6 py-2 rounded-full bg-[#FDA4AF]/10 text-[#FDA4AF] text-xs font-bold uppercase tracking-widest mb-6">
            Our Relief Programs
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Making a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDA4AF] to-[#F87171]">
              Difference
            </span>{" "}
            <br />
            One Step at a Time
          </h2>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-12 h-1.5 bg-[#FDA4AF] rounded-full" />
            <div className="w-3 h-3 bg-[#FDA4AF] rounded-full animate-pulse" />
            <div className="w-12 h-1.5 bg-[#FDA4AF] rounded-full" />
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {reliefCategories.map((category) => (
            <OurWork key={category.id} {...category} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurWorks;
