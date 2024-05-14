import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import "./OurRecentlyWork.css";

import OurRecentlyWorks from "./OurRecentlyWorks";

const OurRecentlyWork = () => {
  //   const {
  //     data: reliefGoods,
  //     isLoading,
  //     isError,
  //   } = useGetRecentWorksQuery(undefined);

  //   console.log(reliefGoods);
  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }
  //   if (isError) {
  //     return <p>Loading...</p>;
  //   }
  const works = [
    {
      id: 1,
      image:
        "https://i0.wp.com/www.directrelief.org/wp-content/uploads/castaneira-27-1-e1606774727935.jpg?resize=1024%2C574&ssl=1",
      description:
        "Direct Relief is committed to supporting its global network of healthcare providers as they respond to critical health issues in their communities.",
      star: 4,
    },
    {
      id: 2,
      image:
        "https://www.ifrc.org/sites/default/files/styles/youtube_thumbnail_large/public/2024-04/p-mex0410.jpg?itok=IvgKX4Ae",
      description:
        "Success Relief Goods doesn't just provide essentials; they empower individuals to overcome adversity. Their mentorship programs and resources have equipped me with the skills and confidence to pursue my dreams.",
      star: 4,
    },
    {
      id: 3,
      image:
        "https://www.ifrc.org/sites/default/files/styles/youtube_thumbnail_large/public/2024-04/p-sle1328.jpg?itok=z32rxA6C",
      description:
        "When setbacks threatened to derail my education, Success Relief Goods came to my rescue. With their scholarships and educational materials, I graduated college debt-free. ",
      star: 4,
    },
    {
      id: 4,
      image:
        "https://www.mercycorps.org/sites/default/files/styles/tile_small_medium_2x/public/2024-02/ukraine-202310-emillstein-3224-2048px.webp?h=f42b6bbb&itok=kuUCS3jT",
      description:
        "When setbacks threatened to derail my education, Success Relief Goods came to my rescue. With their scholarships and educational materials, I graduated college debt-free.",
      star: 4,
    },
  ];
  return (
    <div>
      <h2 className="text-3xl text-center mt-8 font-bold">Recently Work</h2>
      {/* <Divider></Divider> */}
      <span className="divider"></span>
      <Swiper
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        spaceBetween={10}
        // onSwiper={setSwiperRef}
        centeredSlides={false}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper max-w-[1440px] mx-auto mt-20 "
      >
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[1440px] mx-auto mt-28">
          {works.map((recent) => (
            <SwiperSlide className="swiper-slide1">
              <OurRecentlyWorks key={recent.id} {...recent}></OurRecentlyWorks>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default OurRecentlyWork;
