"use client";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  return (
    <div className="md:mt-24 mt-14 mx-auto max-w-7xl">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/65/2023/10/27/maxresdefault-2-4010764341.jpg"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://png.pngtree.com/thumb_back/fw800/background/20240109/pngtree-a-compelling-movie-poster-background-image_15605697.jpg"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://akcdn.detik.net.id/visual/2022/06/07/film-ivanna-2022_169.jpeg?w=650"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Banner;
