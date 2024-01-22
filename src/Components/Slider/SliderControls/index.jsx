import { useEffect, useMemo, useState } from 'react';

import styles from './SliderControls.module.scss';

const SliderControls = ({ handlePrevSlide, handleNextSlide, activeSlide, countSlides }) => {
  return (
    <div className={styles['slider-controls']}>
      <p className={styles['slider-controls__counter']}>
        {activeSlide}/{countSlides}
      </p>
      <div className={styles['slider-controls__btns']}>
        <button onClick={handlePrevSlide} className={styles['slider-controls__btn']} aria-label="Предыдущий слайд">
          <img src="/icons/arrow.svg" alt="" />
        </button>
        <button
          onClick={handleNextSlide}
          className={`${styles['slider-controls__btn']} ${styles['slider-controls__btn-right']}`}
          aria-label="Следующий слайд"
        >
          <img src="/icons/arrow.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default SliderControls;
