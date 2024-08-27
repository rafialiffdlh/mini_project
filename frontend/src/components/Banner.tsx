"use client";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="md:mt-40 px-2 mt-20 mx-auto max-w-7xl">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-xl"
      >
        <SwiperSlide className="rounded-xl overflow-hidden">
          <img
            src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1690260495_PraZyu.jpg"
            alt=""
            className=""
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-lg overflow-hidden">
          <img
            src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1719380523_gdfP65.jpg"
            alt=""
            className=""
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-lg overflow-hidden">
          <img
            src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1721803506_tkCKPu.jpg"
            alt=""
            className=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Banner;
