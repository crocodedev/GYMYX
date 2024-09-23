'use client';

import { useState, useRef } from 'react';
import styles from './TrainersItem.module.scss';
import Button from '@/Components/Button';
import Image from 'next/image';
import BtnPlay from '@/Components/Video/BtnPlay';

const TrainersItem = ({ data, className }) => {
  const fio = data.find((field) => field.name === 'fio');
  const description = data.find((field) => field.name === 'description');
  const experience = data.find((field) => field.name === 'experience');
  const directions = data.find((field) => field.name === 'directions');
  const phone = data.find((field) => field.name === 'phone');
  const image = data.find((field) => field.name === 'image');
  const video = data.find((field) => field.name === 'video');
  
  const videoRef = useRef(null)

  const [showMore, setShowMore] = useState(false);
  const [videoIsPlay, setVideoIsPlay] = useState(false)

  const handleShow = () => {
    setShowMore((prev) => !prev);
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleVideoEnd = () => {
    videoRef.current.load()
  }

  const formattedPhoneNumber = phone.value.replace(/^(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');

  return (
    <div className={className}>
      <div className={styles['trainers-item__img-wrapper']}>
        {/* <BtnPlay/> */}
        {/* {video 
        ? <video ref={videoRef} className={styles['advantages-item__video']} playsInline webkit-playsinline poster={image} onEnded={handleVideoEnd} onPause={() => setVideoIsPlay(false)} onPlay={() => setVideoIsPlay(true)}>
            <source src={video} type="video/mp4"/>
          </video>
        : <Image src={image} width={500} height={800} quality={100} alt={title} loading="lazy" />
        } */}

        <Image className={styles['trainers-item__img']} width={500} height={800} src={image.value} alt={description.value} quality={100} loading="lazy" />
        {/* <img src={image.value} alt={description.value} className={styles['trainers-item__img']} /> */}
      </div>
      <div className={styles['trainers-item__text-wrapper']}>
        <div className={styles['trainers-item__text-inner']}>
          <p className={styles['trainers-item__name']}>{fio.value}</p>
          <p className={styles['trainers-item__text']}>{description.value}</p>
        </div>
        <Button size="sl" label="Подробнее" fullSize={true} onClick={handleShow} disabledShadow={true}></Button>
      </div>
      <div
        className={showMore ? styles['trainers-item__more-wrapper--active'] : styles['trainers-item__more-wrapper']}
        onClick={handleShow}
      >
        <div className={styles['trainers-item__text-inner']}>
          <p className={styles['trainers-item__name']}>{fio.value}</p>
          <p className={styles['trainers-item__text']}>Стаж работы {experience?.value} лет</p>
        </div>
        <ul className={styles['trainers-item__more-list']}>
          {directions.value.split(',').map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <div className={styles['trainers-item__more-contact']}>
          <a
            className={styles['trainers-item__phone']}
            href={`tel:${phone.value.split(' ').join('')}`}
            target="_blank"
            onClick={(e) => handleClick(e)}
          >
            {formattedPhoneNumber}
          </a>{' '}
          <a href={`https://t.me/${phone.value.split(' ').join('')}`} target="_blank" onClick={(e) => handleClick(e)}>
            <Button size="sl" label="Написать в Telegram" fullSize={true} icon={'telegram'} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrainersItem;
