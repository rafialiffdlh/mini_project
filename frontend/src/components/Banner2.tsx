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
    <div className="md:mt-40 px-2 mx-auto max-w-7xl">
      <img
        src="https://assets.loket.com/images/temporary/20240801/1722478231_Tl8YOL.jpg"
        alt=""
        className=""
      />
    </div>
  );
};
export default Banner;
