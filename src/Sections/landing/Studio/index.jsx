'use client';

import styles from './Studio.module.scss';
import BorderLabel from '@/Components/BorderLabel';

import Container from '@/Components/Container';
import SectionTitle from '@/Components/SectionTitle';

const Studio = ({ alias, fields }) => {
  const title = fields.find((item) => item.name === 'title')?.value;
  const model = fields.find((item) => item.name === '3dmodel')?.value;

  return (
    <section className={styles.studio}>
      <Container size="XL">
        <div className={styles['studio__wrapper']}>
          <div className={styles['studio__title-wrapper']}>
            <SectionTitle title={title} width="content"></SectionTitle>
            <BorderLabel label={'3d модель'}></BorderLabel>
          </div>
          <iframe src={model} frameborder="0" className={styles['studio__iframe']}></iframe>
        </div>
      </Container>
    </section>
  );
};

export default Studio;
