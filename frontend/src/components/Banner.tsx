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
    <div className="px-2 mt-8 mx-auto max-w-screen-xl">
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
        className="mySwiper rounded-xl "
      >
        <SwiperSlide className="rounded-xl overflow-hidden ">
          <img
            src="https://asset.tix.id/microsite_v2/d7af717c-482c-4003-8ebb-c0d0256db33e.webp"
            alt=""
            className=""
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-lg overflow-hidden">
          <img
            src="https://asset.tix.id/microsite_v2/466d047f-9ed4-4f40-9b23-8ed7677cca10.webp"
            alt=""
            className=""
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-lg overflow-hidden">
          <img
            src="https://asset.tix.id/microsite_v2/201a68fc-d339-4cc9-bb6f-5c3f324ad79d.webp"
            alt=""
            className=""
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-lg overflow-hidden">
          <img
            src="https://asset.tix.id/microsite_v2/c0ca475a-7eeb-44c4-b556-8adf89af790c.jpeg"
            alt=""
            className=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Banner;
