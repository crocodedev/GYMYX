'use client'

import styles from './TrainerSlide.module.scss';
import { useState, useRef } from 'react';
import Image from 'next/image';

const TrainreSlide = ({ props }) => {
  const { image, fio, description, experience, directions, phone, video } = props;

  const videoRef = useRef(null)
  const detailsRef = useRef(null)
  const [videoIsPlay, setVideoIsPlay] = useState(false)
  const [detailsIsShow, setDetailsIsShow] = useState(false)

  const playVideo = (e) => {
    e.stopPropagation()
    if(videoRef.current) {
      const video = videoRef.current
      if(videoIsPlay) {
        video.pause()
        setVideoIsPlay(false)
      } else {
        video.play()
        setVideoIsPlay(true)
      }
    }
  }

  const detailsShow = (e) => {
    e.stopPropagation()
    if(videoRef.current) {
      videoRef.current.pause()
      videoRef.current.load()
      setVideoIsPlay(false)
    }
    setDetailsIsShow(true)
  }

  const handleVideoEnd = () => {
    setVideoIsPlay(false);
    videoRef.current.load()
  };

  return (
    <div className={styles['slide']}>
      {video && 
        <div className={`${styles['slide__video_play']} ${videoIsPlay ? styles['slide__video_play--hidden'] : ''}`} onClick={playVideo}>
          <svg viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.3619 14.6075C31.6802 15.946 31.6802 19.2922 29.3619 20.6307L5.28858 34.5294C2.97025 35.8679 0.0723305 34.1948 0.0723305 31.5178L0.0723305 3.72037C0.0723305 1.04339 2.97025 -0.62972 5.28858 0.70877L29.3619 14.6075Z" fill="white"/>
          </svg>
        </div>}
      <div className={styles['slide__img']}>
        {video 
        ? <video ref={videoRef} className={styles['slide__video']} playsInline="" poster={image} onEnded={handleVideoEnd}>
            <source src={video} type="video/mp4"/>
          </video>
        : <Image src={image} width={500} height={800} quality={100} alt={fio} loading="lazy" />
        }
      </div>
      <div className={styles['slide__content']} onClick={playVideo}>
        <div className={`${styles['slide__content_inner']} ${videoIsPlay ? styles['slide__content_inner--hidden'] : ''}`}>
          <p className={styles['slide__name']}>{fio}</p>
          <p className={styles['slide__description']}>{description}</p>
        </div>
        <button className={styles['slide__btn']} type='button' onClick={detailsShow}>Подробнее</button>
      </div>
      <div ref={detailsRef} className={`${styles['slide__details']} ${detailsIsShow ? styles['slide__details--show'] : ''}`} onClick={() => setDetailsIsShow(false)}>
        <h3 className={styles['slide__details_fio']}>{fio}</h3>
        <p className={styles['slide__details_experience']}>Стаж работы: {experience} лет</p>
        <ul className={styles['slide__details_directions']}>
          {directions.split(',').map((el, index) => (
              <li key={index}>{el}</li>
            ))}
        </ul>
        <a href="/lk/login" className={styles['slide__btn']}>Записаться</a>
      </div>
    </div>
  );
};

export default TrainreSlide;