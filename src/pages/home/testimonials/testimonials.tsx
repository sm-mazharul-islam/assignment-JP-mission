import React from "react";
import Testimonial from "./testimonial";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "./testimonial.css";

const Testimonials = () => {
  const clientReview = [
    {
      id: 1,
      name: "anna mary",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6dLNupXEgveO-w1vX8Gy31ibUTVVq4vlqLSKwKpbxNg&s",
      description:
        "During a time of crisis, Success Relief Goods stepped in with not just supplies, but hope. Their support helped me rebuild my life after losing everything. Today, I'm not just surviving, I'm thriving, all thanks to their unwavering commitment to our success.",
      star: 4,
    },
    {
      id: 2,
      name: "anna mary",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Woman_in_Tunisia.jpg/220px-Woman_in_Tunisia.jpg",
      description:
        "Success Relief Goods doesn't just provide essentials; they empower individuals to overcome adversity. Their mentorship programs and resources have equipped me with the skills and confidence to pursue my dreams. I'm now running my own business, living proof that their aid fosters true success.",
      star: 4,
    },
    {
      id: 3,
      name: "anna mary",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtsHjP3hNXOMVDnmfxKGvpV_JID7g4R_KVqYG_MhHBRqJPBmSpD-ZXzqxKGbp5IuNmY4c&usqp=CAU",
      description:
        "When setbacks threatened to derail my education, Success Relief Goods came to my rescue. With their scholarships and educational materials, I graduated college debt-free. Their belief in my potential gave me the tools to forge a successful career in a competitive industry.",
      star: 4,
    },
    {
      id: 4,
      name: "anna mary",
      image:
        "https://media.istockphoto.com/id/174813729/photo/happy-senior-woman-with-hands-on-chest.jpg?s=612x612&w=0&k=20&c=q-rj35PpsEnXWj-sG2YI0bPltI2thHgnb04f3Vz9z2E=",
      description:
        "As a community leader, I've witnessed firsthand the impact of Success Relief Goods on families in need. Their holistic approach doesn't just address immediate challenges; it lays the groundwork for long-term success. Thanks to their assistance, our community is stronger and more resilient than ever.",
      star: 4,
    },
    {
      id: 5,
      name: "anna mary",
      image: "https://i.ibb.co/NTDwNc7/image.webp",
      description:
        "After a natural disaster left my family homeless, Success Relief Goods provided more than just shelter and sustenance. Their financial assistance and job placement services enabled us to rebuild our lives from the ground up. Today, we're thriving in our new home, grateful for their support in our journey to success.",
      star: 4,
    },
    {
      id: 6,
      name: "anna mary",
      image: "https://i.ibb.co/NTDwNc7/image.webp",
      description:
        "Success Relief Goods doesn't just offer handouts; they offer a lifeline. Their entrepreneurship programs gave me the tools and mentorship I needed to turn my passion into a profitable business. Thanks to their support, I'm not just surviving—I'm thriving, making a positive impact in my community.",
      star: 4,
    },
  ];

  return (
    <div>
      {/* <img
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "70px",
          marginBottom: "-55px",
          marginTop: "10px",
        }}
        src="https://i.ibb.co/PGSXyL3/section-title-1.png"
        alt=""
      /> */}
      <h2 className="text-3xl text-center mt-8">Testimonials</h2>
      <div className="divider w-[30%] mx-auto "></div>
      <div className="divider w-[20%] mx-auto -mt-[20px]"></div>
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
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        // onSwiper={setSwiperRef}
        centeredSlides={false}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper max-w-[1440px] mx-auto mt-20 "
      >
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[1440px] mx-auto mt-28">
          {clientReview.map((testimonial) => (
            <SwiperSlide className="swiper-slide1">
              <Testimonial
                key={testimonial.id}
                testimonial={testimonial}
              ></Testimonial>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Testimonials;
