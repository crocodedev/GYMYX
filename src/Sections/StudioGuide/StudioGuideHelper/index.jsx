import styles from './StudioGuideHelper.module.scss'

import Container from '@/Components/Container'
import StudioGuideHelperItem from './StudioGuideHelperItem'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

const StudioGuideHelper = ({data}) => {
  const title = data.find(el => el.name == 'title')?.value
  const items = data.find(el => el.type == 'object')?.childrens

  const sliderPcSettings = {
    slidesPerView: 3,
    mousewheel: {
      thresholdDelta: 70,
      forceToAxis: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.5,
      },
      425: {
        slidesPerView: 1.9,
      },
      576: {
        slidesPerView: 2.5,
      },
      768: {
        slidesPerView: 3,
      },
    },
  };

  return (
    <div className={styles['studio-guide-helper']}>
      <Container>
        <div className={styles['studio-guide-helper__inner']}>
          <h2 className={styles['studio-guide-helper__title']}>{title}</h2>
          <div className={styles['studio-guide-helper__items']}>
            <Swiper
              className={styles['studio-guide-helper__slider']}
              a11y={false}
              modules={[Mousewheel]}
              mousewheel={true}
              {...sliderPcSettings}
            >

              {items.map((item, i) => (
                <SwiperSlide key={i} className={styles['studio-guide-helper__slide']}>
                  <StudioGuideHelperItem itemData={item} key={i}/>
                </SwiperSlide>
              ))}
            </Swiper>
            
          </div>
        </div>
      </Container>
    </div>
  )
}

export default StudioGuideHelper