'use client';

import styles from './StudioGuideSlider.module.scss';
import Loading from '@/Components/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState, useEffect } from 'react';
import { Mousewheel } from 'swiper/modules';

import SliderControls from '@/Components/Slider/SliderControls';
import TrainersItem from '@/Sections/Account/Trainers/TrainersItem';
import { getTrainersData } from '@/app/lk/trainers/page';
import PageHeading from '@/Sections/Account/PageHeading';
import StudioGuideSlide from '../StudioGuideSlide';

const StudioGuideSlider = ({isShowVideo = false, items}) => {
  const [dataTrainers, setDataTrainers] = useState(items);
  const [slider, setSlider] = useState();
  const [activeIndexSlide, setIndexActiveSlide] = useState(1);
  const [sliderSettings, setSliderSettings] = useState(null);
  const [endSlider, setEndSlider] = useState(false);
  const [startSlider, setStartSlider] = useState(true);
  const [loading, setLoading] = useState(true);

  console.log(items)

  const sliderPcSettings = {
    spaceBetween: 25,
    slidesPerView: 2.2,
    mousewheel: {
      thresholdDelta: 70,
      forceToAxis: true,
    },
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
        slidesPerView: 2.656,
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
    e.activeIndex > 0 ? setStartSlider(false) : setStartSlider(true);
    e.activeIndex === e.slides.length - 2 ? setEndSlider(true) : setEndSlider(false);
  };

  const handleInit = (e) => {
    setSlider(e);
  };

  // const sortForVideo = (data) => {
  //   return data.sort((a, b) => {
  //     const aHasValidVideo = a.some(item => item.name === 'video' && item.value.trim() !== '');
  //     const bHasValidVideo = b.some(item => item.name === 'video' && item.value.trim() !== '');
  //     if (aHasValidVideo && !bHasValidVideo) return -1;
  //     if (!aHasValidVideo && bHasValidVideo) return 1;
  //     return 0;
  //   });
  // }

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 992px)').matches;
    isMobile ? handleInit : setSliderSettings(sliderPcSettings);
  }, []);

  return (
    <div className={styles['trainers-slider']}>
      <div className={styles['trainers-slider__title-wrapper']}>
        {sliderSettings ? (
          <SliderControls
            handleNextSlide={nextSlide}
            handlePrevSlide={prevSlide}
            activeSlide={activeIndexSlide}
            countSlides={slider?.slides?.length}
            isTrainers={true}
            isShowCount={false}
          />
        ) : null}
      </div>

      {sliderSettings ? (
        <Swiper
          className={`swiper-container ${endSlider ? styles.slider__end : styles.slider} ${
            startSlider ? styles.slider__start__end : styles.slider__start
          }`}
          onSlideChange={onChangeSlide}
          onSwiper={handleInit}
          a11y={false}
          modules={[Mousewheel]}
          mousewheel={true}
          {...sliderSettings}
        >
          {dataTrainers.map((item, i) => (
            <SwiperSlide className={styles['trainers-item']} key={i}>
              {/* <TrainersItem data={dataTrainers} key={index} isShowVideo={isShowVideo}/> */}
              <StudioGuideSlide data={item}/>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles['trainers-slider__items']}>
          {dataTrainers.map((item, i) => (
            <StudioGuideSlide data={item} key={i}/>
            // <TrainersItem key={index} className={styles['trainers-item']} data={dataTrainers} isShowVideo={isShowVideo}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudioGuideSlider;