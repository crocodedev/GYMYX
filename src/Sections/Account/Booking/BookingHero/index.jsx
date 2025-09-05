'use client'

import Button from '@/Components/Button';
import Container from '@/Components/Container';
import Image from 'next/image';
import styles from './BookingHero.module.scss';
import { useState, useEffect, useRef } from 'react';
import useScreenSize from '@/hooks/useScreenSize';
import BookingMap from '../BookingMap';

const BookingHero = ({ activeGym, gyms, isShowGyms, handleButtonClick, handleChangeGym }) => {
  const findActiveGym = gyms.find(gym => gym.id == activeGym.id)
  const [selectGym, setSelectGym] = useState(findActiveGym || {})
  const [placeMarks, setPlaceMarks] = useState(gyms);
  const [isOpenMap, setIsOpenMap] = useState(false)
  const [isShowMap, setIsShowMap] = useState(false)
  const gymsList = useRef(null)
  const { isMobile } = useScreenSize()

  const updateData = (objData) => {
    setPlaceMarks((prev) => {
      const isLocationExists = prev.some((item) => item.id === 'curPosition');
  
      if (!isLocationExists) {
        return [...prev, objData];
      }
  
      return prev;
    });
  };

  useEffect(() => {
    if (isShowGyms) {
      // Открываем карту
      setTimeout(() => {
        setIsOpenMap(true);
        setTimeout(() => {
          setIsShowMap(true);
        }, 100);
      }, 350);
    } else {
      // Закрываем карту
      setIsShowMap(false);
      setTimeout(() => {
        setIsOpenMap(false);
      }, 300);
    }
  }, [isShowGyms]);
  
  return (
    <section className={styles['booking-hero']}>
      <Container classTitle={styles['container']}>
        <div className={styles['main-card']}>
          {!isOpenMap ? null : (
            <div className={`${styles['map']} ${isShowMap ? styles['map--show'] : styles['map--hidden']}`} >
              <BookingMap currentGym={selectGym} Placemarks={placeMarks} updateData={updateData}/>
            </div>
          )}
          <div className={styles['preview']}>
            <div className={styles['preview__bg']}>
              <Image src={activeGym.image?.src || '/images/hero.png'} alt="gym image" width={1600} height={390} loading="lazy" />
            </div>
            <div className={styles['preview__content']}>
              <p className={styles.preview__title}>{activeGym.name}</p>
              <div className={styles.preview__info}>
                <span className={styles.preview__address}>{activeGym.address}</span>
                <span className={styles.preview__city}>{activeGym?.city || ''}</span>
              </div>
              <Button className={styles.preview__button} onClick={handleButtonClick} variant="blue" size="none" label={'Изменить студию'} />
            </div>
          </div>
        </div>
        <div 
          className={`${styles['gym-list']} ${isShowGyms ? styles['gym-list--show'] : styles['gym-list--hidden']}`}
          style={isMobile 
            ? isShowGyms && gymsList.current 
              ? { height: gymsList.current.scrollHeight }
              : { height: '0px'}
            : null
          }
        >
          <div className={styles['gym-list__inner']} ref={gymsList}>
            <ul className={styles['gym-list__items']}>
              {gyms.map((gym, i) => (
                <li className={`${styles['gym-list__item']} ${selectGym?.id === gym.id ? styles['gym-list__item--active'] : ''}`} key={i}>
                  <button type="button" className={styles['gym-list__item-btn']} onClick={() => setSelectGym(gym)}>
                    <span className={styles['gym-list__item-name']}>{gym.name}</span>
                    <span className={styles['gym-list__item-address']}>{gym.address}</span>
                  </button>
                </li>
              ))}
            </ul>
            <Button 
              className={styles['gym-list__button']} 
              size='static' 
              label={'Сохранить'} 
              variant='blue-gradient'
              onClick={() => handleChangeGym(selectGym)}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BookingHero;
