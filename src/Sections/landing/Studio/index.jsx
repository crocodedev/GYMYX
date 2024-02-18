'use client';

import styles from './Studio.module.scss';
import BorderLabel from '@/Components/BorderLabel';

import Container from '@/Components/Container';
import SectionTitle from '@/Components/SectionTitle';
import { useEffect, useState } from 'react';
const Studio = ({ alias, fields }) => {
  const [showStudio, setShowStudio] = useState(false);
  const title = fields.find((item) => item.name === 'title')?.value;
  const model = fields.find((item) => item.name === '3dmodel')?.value;

  const showStudioFc = () => {
    if (window.scrollY >= document.querySelector('#studio').getBoundingClientRect().top - 300) {
      if (showStudio === false) {
        setShowStudio(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', showStudioFc);

    return () => window.removeEventListener('scroll', showStudioFc);
  }, []);

  return (
    <section id={alias} className={styles.studio}>
      <Container size="XL">
        <div className={styles['studio__wrapper']}>
          <div className={styles['studio__title-wrapper']}>
            <SectionTitle title={title} width="content"></SectionTitle>
            <BorderLabel label={'3d модель'}></BorderLabel>
          </div>
          {showStudio ? <iframe src={model} frameborder="0" className={styles['studio__iframe']}></iframe> : null}
        </div>
      </Container>
    </section>
  );
};

export default Studio;
