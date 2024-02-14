'use client';

import Image from 'next/image';

import Button from '@/Components/Button';
import Container from '@/Components/Container';
import styles from './Hero.module.scss';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Hero = ({ alias, fields }) => {
  const sesstion = useSession();
  const image = fields.find((item) => item.name === 'image');
  const image_mobile = fields.find((item) => item.name === 'image_mobile');
  const title = fields.find((item) => item.name === 'title');
  const subtitle = fields.find((item) => item.name === 'subtitle');
  const price = fields.find((item) => item.name === 'price');
  const [isMobile, setMobile] = useState(false);

  const [imgPath, setImagePath] = useState('/images/hero_11.webp');
  const [imgPathMobile, setImagePathMobile] = useState('/images/first_screen_m.png');

  const setImages = () => {
    if (image) {
      setImagePath(image.value);
    }

    if (image_mobile) {
      setImagePathMobile(image_mobile.value);
    }
  };

  useEffect(() => {
    setImages();
  }, []);

  useEffect(() => {
    // Function to update mobile state based on window width
    const handleResize = () => {
      setMobile(window.matchMedia('(max-width: 992px)').matches);
    };

    // Initial check for window width
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id={alias} className={styles.hero}>
      <picture className={styles.hero__img}>
        {isMobile ? <img src={imgPathMobile} alt={title.value} /> : <img src={imgPath} alt={title.value} />}
      </picture>
      <div className={styles['hero__content-wrapper']}>
        <Container size="XL">
          <div className={styles.hero__content}>
            <h1 className={styles.hero__title}>{title?.value}</h1>
            <h2 className={styles.hero__subtitle}>{subtitle?.value}</h2>
            <div className={styles.hero__info}>
              <p className={styles.hero__price}>
                от
                <span className={styles['hero__price-value']}>
                  {price?.value} <span className={styles['hero__price-prefix']}>₽/час</span>
                </span>
              </p>
              {isMobile ? (
                <Link href={'/lk/login'}>
                  <Button size="l" variant="blue" label={'Записаться'} />
                </Link>
              ) : (
                <Link href={'/lk/login'}>
                  <Button size="l" variant="black" label={'Записаться'} />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
