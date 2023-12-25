"use client"

import Container from "@/Components/Container"
import styles from "./TrainersSlider.module.scss"
import { useSession } from "next-auth/react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { useState, useEffect } from "react"

import SliderControls from "@/Components/Slider/SliderControls"
import SectionTitle from "@/Components/SectionTitle"
import TrainersItem from "../TrainersItem"

const TrainersSlider = ({ data }) => {
  const [slider, setSlider] = useState()
  const [activeIndexSlide, setIndexActiveSlide] = useState(1)
  const [sliderSettings, setSliderSettings] = useState(null)

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
        slidesPerView: 2.55,
      },
    },
  }

  const nextSlide = () => {
    slider.slideNext()
    setIndexActiveSlide(slider.activeIndex + 1)
  }

  const prevSlide = () => {
    slider.slidePrev()
    setIndexActiveSlide(slider.activeIndex + 1)
  }

  const onChangeSlide = (e) => {
    setIndexActiveSlide(e.activeIndex + 1)
  }

  const handleInit = (e) => {
    setSlider(e)
  }

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 992px)").matches
    isMobile ? handleInit : setSliderSettings(sliderPcSettings)
  }, [])

  return data ? (
    <div className={styles["trainers-slider"]}>
      <div className={styles["trainers-slider__title-wrapper"]}>
        <SectionTitle title={"Тренеры"} />
        <SliderControls
          handleNextSlide={nextSlide}
          handlePrevSlide={prevSlide}
          activeSlide={activeIndexSlide}
          countSlides={slider?.slides?.length}
        />
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
          {data.value.map((el, index) => (
            <SwiperSlide className={styles["trainers-item"]} key={index}>
              <TrainersItem data={el} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles["trainers-slider__items"]}>
          {data.value.map((el, index) => (
            <TrainersItem
              key={index}
              className={styles["trainers-item"]}
              data={el}
            />
          ))}
        </div>
      )}
    </div>
  ) : null
}

export default TrainersSlider