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
    <div className="md:mt-40 mt-20 mx-auto max-w-7xl">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-lg"
      >
        <SwiperSlide className="rounded-lg overflow-hidden">
          <img
            src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1690260495_PraZyu.jpg"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-lg overflow-hidden">
          <img
            src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1719380523_gdfP65.jpg"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-lg overflow-hidden">
          <img
            src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1721803506_tkCKPu.jpg"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Banner;
