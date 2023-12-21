"use client";

import Container from "@/Components/Container";
import styles from "./TrainersSlider.module.scss";
import { useSession } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

import SliderControls from "@/Components/Slider/SliderControls";
import SectionTitle from "@/Components/SectionTitle";
import Button from "@/Components/Button";

const TrainersSlider = () => {
  const [slider, setSlider] = useState();
  const [activeIndexSlide, setIndexActiveSlide] = useState(1);
  const [sliderSettings, setSliderSettings] = useState(null);
  const [showMore, setShowMore] = useState(false);

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
        slidesPerView: 2.55,
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

  const handleShow = () => {
    setShowMore((prev) => !prev);

    console.log(1231);
  };

  useEffect(() => {
    setSliderSettings(sliderPcSettings);
  }, []);

  return (
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
      <Button
        size="m"
        label="Написать в Telegram"
        fullSize={true}
        icon={"icons/socials/telegram.svg"}
        onClick={handleShow}
      />
      {sliderSettings ? (
        <Swiper
          className={`swiper-container ${styles.slider}`}
          onSlideChange={onChangeSlide}
          onSwiper={handleInit}
          a11y={false}
          {...sliderSettings}
        >
          <SwiperSlide>
            <div className={styles["trainers-item"]} onClick={handleShow}>
              <div className={styles["trainers-item__img-wrapper"]}>
                <img
                  src="/images/advantagesjpeg.jpeg"
                  alt=""
                  className={styles["trainers-item__img"]}
                />
              </div>
              <div className={styles["trainers-item__text-wrapper"]}>
                <div className={styles["trainers-item__text-inner"]}>
                  <p className={styles["trainers-item__name"]}>Юлия Быкова</p>
                  <p className={styles["trainers-item__text"]}>
                    Стаж работы 8 лет. Набор мышечной массы…
                  </p>
                </div>
                <Button size="m" label="Подробнее" fullSize={true}></Button>
              </div>
              <div
                className={
                  showMore
                    ? styles["trainers-item__more-wrapper--active"]
                    : styles["trainers-item__more-wrapper"]
                }
              >
                <div className={styles["trainers-item__text-inner"]}>
                  <p className={styles["trainers-item__name"]}>Юлия Быкова</p>
                  <p className={styles["trainers-item__text"]}>
                    Стаж работы 5 лет
                  </p>
                </div>
                <ul className={styles["trainers-item__more-list"]}>
                  <li>Набор мышечной массы</li>
                  <li>Функциональный тренинг</li>
                  <li>Кроссфит</li>
                  <li>Гимнастика</li>
                </ul>
                <div className={styles["trainers-item__more-contact"]}>
                  <p className={styles["trainers-item__phone"]}>
                    +7 915 467 89 77
                  </p>
                  <Button
                    size="m"
                    label="Написать в Telegram"
                    fullSize={true}
                    icon={true}
                    onClick={handleShow}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles["trainers-item"]} onClick={handleShow}>
              <div className={styles["trainers-item__img-wrapper"]}>
                <img
                  src="/images/advantagesjpeg.jpeg"
                  alt=""
                  className={styles["trainers-item__img"]}
                />
              </div>
              <div className={styles["trainers-item__text-wrapper"]}>
                <div className={styles["trainers-item__text-inner"]}>
                  <p className={styles["trainers-item__name"]}>Юлия Быкова</p>
                  <p className={styles["trainers-item__text"]}>
                    Стаж работы 8 лет. Набор мышечной массы…
                  </p>
                </div>
                <Button size="m" label="Подробнее" fullSize={true}></Button>
              </div>
              <div
                className={
                  showMore
                    ? styles["trainers-item__more-wrapper--active"]
                    : styles["trainers-item__more-wrapper"]
                }
              >
                <div className={styles["trainers-item__text-inner"]}>
                  <p className={styles["trainers-item__name"]}>Юлия Быкова</p>
                  <p className={styles["trainers-item__text"]}>
                    Стаж работы 5 лет
                  </p>
                </div>
                <ul className={styles["trainers-item__more-list"]}>
                  <li>Набор мышечной массы</li>
                  <li>Функциональный тренинг</li>
                  <li>Кроссфит</li>
                  <li>Гимнастика</li>
                </ul>
                <div className={styles["trainers-item__more-contact"]}>
                  <p className={styles["trainers-item__phone"]}>
                    +7 915 467 89 77
                  </p>
                  <Button
                    size="m"
                    label="Написать в Telegram"
                    fullSize={true}
                    icon={true}
                    onClick={handleShow}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles["trainers-item"]} onClick={handleShow}>
              <div className={styles["trainers-item__img-wrapper"]}>
                <img
                  src="/images/advantagesjpeg.jpeg"
                  alt=""
                  className={styles["trainers-item__img"]}
                />
              </div>
              <div className={styles["trainers-item__text-wrapper"]}>
                <div className={styles["trainers-item__text-inner"]}>
                  <p className={styles["trainers-item__name"]}>Юлия Быкова</p>
                  <p className={styles["trainers-item__text"]}>
                    Стаж работы 8 лет. Набор мышечной массы…
                  </p>
                </div>
                <Button size="m" label="Подробнее" fullSize={true}></Button>
              </div>
              <div
                className={
                  showMore
                    ? styles["trainers-item__more-wrapper--active"]
                    : styles["trainers-item__more-wrapper"]
                }
              >
                <div className={styles["trainers-item__text-inner"]}>
                  <p className={styles["trainers-item__name"]}>Юлия Быкова</p>
                  <p className={styles["trainers-item__text"]}>
                    Стаж работы 5 лет
                  </p>
                </div>
                <ul className={styles["trainers-item__more-list"]}>
                  <li>Набор мышечной массы</li>
                  <li>Функциональный тренинг</li>
                  <li>Кроссфит</li>
                  <li>Гимнастика</li>
                </ul>
                <div className={styles["trainers-item__more-contact"]}>
                  <p className={styles["trainers-item__phone"]}>
                    +7 915 467 89 77
                  </p>
                  <Button
                    size="m"
                    label="Написать в Telegram"
                    fullSize={true}
                    icon={true}
                    onClick={handleShow}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles["trainers-item"]} onClick={handleShow}>
              <div className={styles["trainers-item__img-wrapper"]}>
                <img
                  src="/images/advantagesjpeg.jpeg"
                  alt=""
                  className={styles["trainers-item__img"]}
                />
              </div>
              <div className={styles["trainers-item__text-wrapper"]}>
                <div className={styles["trainers-item__text-inner"]}>
                  <p className={styles["trainers-item__name"]}>Юлия Быкова</p>
                  <p className={styles["trainers-item__text"]}>
                    Стаж работы 8 лет. Набор мышечной массы…
                  </p>
                </div>
                <Button size="m" label="Подробнее" fullSize={true}></Button>
              </div>
              <div
                className={
                  showMore
                    ? styles["trainers-item__more-wrapper--active"]
                    : styles["trainers-item__more-wrapper"]
                }
              >
                <div className={styles["trainers-item__text-inner"]}>
                  <p className={styles["trainers-item__name"]}>Юлия Быкова</p>
                  <p className={styles["trainers-item__text"]}>
                    Стаж работы 5 лет
                  </p>
                </div>
                <ul className={styles["trainers-item__more-list"]}>
                  <li>Набор мышечной массы</li>
                  <li>Функциональный тренинг</li>
                  <li>Кроссфит</li>
                  <li>Гимнастика</li>
                </ul>
                <div className={styles["trainers-item__more-contact"]}>
                  <p className={styles["trainers-item__phone"]}>
                    +7 915 467 89 77
                  </p>
                  <Button
                    size="m"
                    label="Написать в Telegram"
                    fullSize={true}
                    icon={true}
                    onClick={handleShow}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      ) : null}
    </div>
  );
};

export default TrainersSlider;
