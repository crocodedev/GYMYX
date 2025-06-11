import Image from 'next/image';
import styles from './AboutUsItem.module.scss';

const AboutUsItem = ({ title, text }) => {
  return (
    <div className={styles['About-us-item']}>
      <picture className={styles['About-us-item__img']}>
        <source media="(max-width: 992px)" srcSet="/images/about-us-item-bg-second.png" />
        <Image src="/images/about-us-item-bg.png" alt="about-us-item-bg" layout='fill' unoptimized />
      </picture>
      <p className={styles['About-us-item__title']}>{title}</p>
      <p className={styles['About-us-item__text']}>{text}</p>
    </div>
  );
};

export default AboutUsItem;
