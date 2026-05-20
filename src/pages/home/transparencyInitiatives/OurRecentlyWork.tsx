import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // Autoplay যোগ করা হয়েছে

import OurRecentlyWorks from "./OurRecentlyWorks";
import Container from "../../../components/ui/Container";

const OurRecentlyWork = () => {
  const works = [
    {
      id: 1,
      image:
        "https://i0.wp.com/www.directrelief.org/wp-content/uploads/castaneira-27-1-e1606774727935.jpg?resize=1024%2C574&ssl=1",
      description:
        "Direct Relief is committed to supporting its global network of healthcare providers.",
      star: 4,
    },
    {
      id: 2,
      image:
        "https://www.ifrc.org/sites/default/files/styles/youtube_thumbnail_large/public/2024-04/p-mex0410.jpg?itok=IvgKX4Ae",
      description:
        "Success Relief Goods doesn't just provide essentials; they empower individuals to overcome adversity.",
      star: 4,
    },
    {
      id: 3,
      image:
        "https://www.ifrc.org/sites/default/files/styles/youtube_thumbnail_large/public/2024-04/p-sle1328.jpg?itok=z32rxA6C",
      description:
        "When setbacks threatened to derail my education, Success Relief Goods came to my rescue.",
      star: 4,
    },
    {
      id: 4,
      image:
        "https://www.mercycorps.org/sites/default/files/styles/tile_small_medium_2x/public/2024-02/ukraine-202310-emillstein-3224-2048px.webp?h=f42b6bbb&itok=kuUCS3jT",
      description:
        "With their scholarships and educational materials, I graduated college debt-free.",
      star: 4,
    },
  ];

  return (
    <section className=" overflow-hidden">
      <Container>
        {/* Header Section */}
        <div className="relative text-center mb-16 group">
          <span className="text-[#FDA4AF] font-black uppercase tracking-[0.4em] text-[10px] mb-2 block animate-pulse">
            Our Gallery
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Our Recently{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-[#FDA4AF]">
              Works
            </span>
          </h2>
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="h-1 w-12 bg-gradient-to-r from-[#FDA4AF] to-violet-400 rounded-full transition-all duration-500 group-hover:w-24" />
          </div>
        </div>

        {/* Swiper Implementation */}
        <Swiper
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={false}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={false}
          modules={[Pagination, Navigation, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="px-4 pb-20" // পেজিনেশনের জন্য প্যাডিং
        >
          {works.map((recent) => (
            <SwiperSlide key={recent.id} className="flex justify-center">
              <OurRecentlyWorks {...recent} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default OurRecentlyWork;
