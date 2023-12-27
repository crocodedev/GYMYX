"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import AdvantagesItem from "../Advantages/AdvantagesItem";
import SectionTitle from "../SectionTitle";
import SliderControls from "./SliderControls";
import styles from "./Slider.module.scss";
import "swiper/css";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

import { EffectCards } from "swiper/modules";

const sliderMobileSettings = {
  effect: "cards",
  centeredSlides: true,
  loop: true,
};

const sliderPcSettings = {
  spaceBetween: 25,
  slidesPerView: 2.2,

  breakpoints: {
    992: {
      spaceBetween: 25,
      slidesPerView: 3.2,
    },

    1200: {
      spaceBetween: 35,
      slidesPerView: 3,
    },

    1400: {
      spaceBetween: 40,
      slidesPerView: 3,
    },
  },
};

const Slider = ({ title, items }) => {
  const [slider, setSlider] = useState();
  const [activeIndexSlide, setIndexActiveSlide] = useState(1);
  const [sliderSettings, setSliderSettings] = useState(null);

  const nextSlide = () => {
    slider.slideNext();
    setIndexActiveSlide(slider.activeIndex + 1);
  };

  const prevSlide = () => {
    slider.slidePrev();
    setIndexActiveSlide(slider.activeIndex + 1);
  };

  const onChangeSlide = (e) => {
    setIndexActiveSlide(e.activeIndex + 1);
  };

  const handleInit = (e) => {
    setSlider(e);
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 992px)").matches;
    setSliderSettings(isMobile ? sliderMobileSettings : sliderPcSettings);
  }, []);

  return (
    <>
      <div className={styles.slider__heading}>
        <SectionTitle title={title} />
        {items.length > 3 && (
          <SliderControls
            handleNextSlide={nextSlide}
            handlePrevSlide={prevSlide}
            activeSlide={activeIndexSlide}
            countSlides={slider?.slides?.length}
          />
        )}
      </div>
      {sliderSettings && (
        <Swiper
          modules={[EffectCards]}
          className={`swiper-container ${styles.slider}`}
          onSlideChange={onChangeSlide}
          onSwiper={handleInit}
          {...sliderSettings}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <AdvantagesItem props={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Slider;
