'use client';

import Container from '@/Components/Container';
import Slider from '@/Components/Slider';
import styles from './Trainers.module.scss'

const Trainers = ({ alias, fields }) => {
  console.log(alias, fields)
  const title = fields.find((item) => item.name === 'title');
  const list = fields.find((item) => item.name === 'list')?.childrens || [];

  const slides = list.map((item, index) => {
    const title = item.find((field) => field.name === 'title');
    const subtitle = item.find((field) => field.name === 'subtitle');
    const image = item.find((field) => field.name === 'image');

    return {
      id: index,
      image: image?.value || '',
      title: title?.value || '',
      text: subtitle?.value || '',
      alt: title?.value || '',
    };
  });

  return (
    <section id={alias} className={styles.trainers}>
      <Container size="XL">
        <Slider title={'Наши Тренера'} items={slides} />
      </Container>
    </section>
  );
};

export default Trainers;