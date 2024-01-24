'use client';

import Link from 'next/link';
import Container from '@/Components/Container';
import styles from './Footer.module.scss';
import Image from 'next/image';

const Footer = ({ data }) => {
  const fields = data.fields;
  const logo = fields.find((field) => field.name === 'logo')?.value || '';
  const socials = fields.find((field) => field.name === 'socials')?.value || [];
  const nav = fields.find((field) => field.name === 'nav')?.childrens || [];
  const phone_number = fields.find((field) => field.name === 'phone_number')?.value || '';

  return (
    <footer className={styles.footer}>
      <Container size="xlf">
        <div className={styles.footer__wrapper}>
          <img className={styles.footer__bg} src="/images/footer_bg.png" alt="" />

          <div className={styles['footer__inner-wrapper']}>
            <div className={styles.footer__leftside}>
              <div className={styles.footer__logo}>
                <Image src={logo} width={700} height={120} quality={100} alt="footer logo" loading="lazy" />
              </div>
              <div className={styles.footer__socials}>
                {socials.map((item) => {
                  const url = item.find((field) => field.name === 'url')?.value || '';
                  const image = item.find((field) => field.name === 'image')?.value?.src || '';
                  return (
                    <Link key={url} href={url} className={styles['footer__socials-item']}>
                      <Image src={image} width={60} height={60} quality={100} alt="social logo" loading="lazy" />
                    </Link>
                  );
                })}
              </div>
              <div className={styles.footer__copyright}>
                <p>© GYMYX {new Date().getFullYear()}</p>
              </div>
            </div>
            <div className={styles.footer__info}>
              <p className={styles['footer__info-tel']}>{phone_number}</p>
              <div className={styles['footer__info-links']}>
                {nav.map((item) => {
                  const title = item.find((field) => field.name === 'title')?.value || '';
                  const url = item.find((field) => field.name === 'url')?.value || '';
                  return (
                    <Link key={url} href={url} className={styles['footer__info-link']}>
                      {title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
