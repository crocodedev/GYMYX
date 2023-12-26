"use client";

import Container from "@/Components/Container";
import styles from "./TrainersSlider.module.scss";
import Loading from "@/Components/Loading";
import { useSession } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";

import SliderControls from "@/Components/Slider/SliderControls";
import SectionTitle from "@/Components/SectionTitle";
import TrainersItem from "../TrainersItem";
import { getTrainersData } from "@/app/account/trainers/page";

const TrainersSlider = () => {
  const [dataTrainers, setDataTrainers] = useState();
  const [slider, setSlider] = useState();
  const [activeIndexSlide, setIndexActiveSlide] = useState(1);
  const [sliderSettings, setSliderSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const sliderPcSettings = {
    spaceBetween: 25,
    slidesPerView: 2.2,

    breakpoints: {
      0: {
        slidesPerView: 3,
      },
      992: {
        spaceBetween: 25,
        slidesPerView: 2.2,
      },

      1200: {
        spaceBetween: 35,
        slidesPerView: 2.2,
      },

      1400: {
        spaceBetween: 40,
        slidesPerView: 2.4,
      },
    },
  };

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
    isMobile ? handleInit : setSliderSettings(sliderPcSettings);

    getTrainersData().then((dataTrainers) => {
      setDataTrainers(dataTrainers.data.modules[0].section.fields[0]);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading full_screen={true} />;

  return (
    <div className={styles["trainers-slider"]}>
      <div className={styles["trainers-slider__title-wrapper"]}>
        <SectionTitle title={"Тренеры"} />
        {sliderSettings ? (
          <SliderControls
            handleNextSlide={nextSlide}
            handlePrevSlide={prevSlide}
            activeSlide={activeIndexSlide}
            countSlides={slider?.slides?.length}
          />
        ) : null}
      </div>

      {sliderSettings ? (
        <Swiper
          className={`swiper-container ${styles.slider}`}
          onSlideChange={onChangeSlide}
          onSwiper={handleInit}
          a11y={false}
          autoHeight
          {...sliderSettings}
        >
          {dataTrainers.value.map((dataTrainers, index) => (
            <SwiperSlide
              className={styles["trainers-item"]}
              key={dataTrainers[0].value}
            >
              <TrainersItem data={dataTrainers} key={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles["trainers-slider__items"]}>
          {dataTrainers.value.map((dataTrainers, index) => (
            <TrainersItem
              key={index}
              className={styles["trainers-item"]}
              data={dataTrainers}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainersSlider;
