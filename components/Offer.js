import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules"; 

export default function OfferHeadline() {
  return (
    <div className="offerHeadline">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide>
          <div className="offerText">Worldwide shipping!</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="offerText">Free Shipping on all orders above $50</div>
        </SwiperSlide>
      </Swiper>
      <hr id="myhrbar1z" />
    </div>
  );
}
