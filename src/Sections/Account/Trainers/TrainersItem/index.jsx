'use client';

import { useState } from 'react';
import styles from './TrainersItem.module.scss';
import Button from '@/Components/Button';

const TrainersItem = ({ data, className }) => {
  console.log(data);
  const [showMore, setShowMore] = useState(false);

  const handleShow = () => {
    setShowMore((prev) => !prev);
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={className}>
      <div className={styles['trainers-item__img-wrapper']}>
        <img src={data[5].value} alt="" className={styles['trainers-item__img']} />
      </div>
      <div className={styles['trainers-item__text-wrapper']}>
        <div className={styles['trainers-item__text-inner']}>
          <p className={styles['trainers-item__name']}>{data[0].value}</p>
          <p className={styles['trainers-item__text']}>{data[1].value}</p>
        </div>
        <Button size="m" label="Подробнее" fullSize={true} onClick={handleShow} disabledShadow={true}></Button>
      </div>
      <div
        className={showMore ? styles['trainers-item__more-wrapper--active'] : styles['trainers-item__more-wrapper']}
        onClick={handleShow}
      >
        <div className={styles['trainers-item__text-inner']}>
          <p className={styles['trainers-item__name']}>{data[0].value}</p>
          <p className={styles['trainers-item__text']}>Стаж работы {data[2].value} лет</p>
        </div>
        <ul className={styles['trainers-item__more-list']}>
          {data[3].value.split(',').map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <div className={styles['trainers-item__more-contact']}>
          <a
            className={styles['trainers-item__phone']}
            href={`https://t.me/${data[4].value.split(' ').join('')}`}
            target="_blank"
            onClick={(e) => handleClick(e)}
          >
            {data[4].value}
          </a>{' '}
          <a href={`https://t.me/${data[4].value.split(' ').join('')}`} target="_blank" onClick={(e) => handleClick(e)}>
            <Button size="m" label="Написать в Telegram" fullSize={true} icon={'telegram'} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrainersItem;
