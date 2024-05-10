// import React from "react";

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// // import required modules
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "./OurRecentlyWork.css";
// import { useGetRecentWorksQuery } from "../../../redux/api/api";
// import OurRecentlyWorks from "./OurRecentlyWorks";

// const OurRecentlyWork = () => {
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
//   // const ourRecentWork = [
//   //   {

//   //     image:
//   //       "https://i0.wp.com/www.directrelief.org/wp-content/uploads/castaneira-27-1-e1606774727935.jpg?resize=1024%2C574&ssl=1",
//   //     description:
//   //       "Direct Relief is committed to supporting its global network of healthcare providers as they respond to critical health issues in their communities.",
//   //     star: 4,
//   //   },
//   //   {

//   //     image:
//   //       "https://www.ifrc.org/sites/default/files/styles/youtube_thumbnail_large/public/2024-04/p-mex0410.jpg?itok=IvgKX4Ae",
//   //     description:
//   //       "Success Relief Goods doesn't just provide essentials; they empower individuals to overcome adversity. Their mentorship programs and resources have equipped me with the skills and confidence to pursue my dreams. I'm now running my own business, living proof that their aid fosters true success.",
//   //     star: 4,
//   //   },
//   //   {

//   //     image:
//   //       "https://www.ifrc.org/sites/default/files/styles/youtube_thumbnail_large/public/2024-04/p-sle1328.jpg?itok=z32rxA6C",
//   //     description:
//   //       "When setbacks threatened to derail my education, Success Relief Goods came to my rescue. With their scholarships and educational materials, I graduated college debt-free. Their belief in my potential gave me the tools to forge a successful career in a competitive industry.",
//   //     star: 4,
//   //   },
//   //   {

//   //     image:
//   //       "https://www.mercycorps.org/sites/default/files/styles/tile_small_medium_2x/public/2024-02/ukraine-202310-emillstein-3224-2048px.webp?h=f42b6bbb&itok=kuUCS3jT",
//   //     description:
//   //       "When setbacks threatened to derail my education, Success Relief Goods came to my rescue. With their scholarships and educational materials, I graduated college debt-free. Their belief in my potential gave me the tools to forge a successful career in a competitive industry.",
//   //     star: 4,
//   //   },
//   // ];
//   return (
//     <div>
//       <img
//         style={{
//           display: "block",
//           marginLeft: "auto",
//           marginRight: "auto",
//           width: "70px",
//           marginBottom: "-55px",
//           marginTop: "10px",
//         }}
//         src="https://i.ibb.co/PGSXyL3/section-title-1.png"
//         alt=""
//       />
//       <div className="divider w-[30%] mx-auto "></div>
//       <div className=" w-[20%] mx-auto -mt-[20px]"></div>
//       <h2 className="text-3xl text-center mt-8 font-bold">Recently Work</h2>
//       {/* <Divider></Divider> */}
//       <Swiper
//         loop={true}
//         pagination={{ clickable: true }}
//         slidesPerView={3}
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//             spaceBetween: 10,
//           },
//           640: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           1024: {
//             slidesPerView: 3,
//             spaceBetween: 10,
//           },
//         }}
//         // autoplay={{
//         //   delay: 3000,
//         //   disableOnInteraction: false,
//         // }}
//         spaceBetween={10}
//         // onSwiper={setSwiperRef}
//         centeredSlides={false}
//         navigation={true}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="mySwiper max-w-[1440px] mx-auto mt-20 "
//       >
//         <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[1440px] mx-auto mt-28">
//           {reliefGoods?.data?.map((recentWork) => (
//             <SwiperSlide className="swiper-slide1">
//               <OurRecentlyWorks
//                 key={recentWork._id}
//                 recentWork={recentWork}
//               ></OurRecentlyWorks>
//             </SwiperSlide>
//           ))}
//         </div>
//       </Swiper>
//     </div>
//   );
// };

// export default OurRecentlyWork;
