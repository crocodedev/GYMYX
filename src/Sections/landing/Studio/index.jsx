'use client';

import styles from './Studio.module.scss';
// import BorderLabel from '@/Components/BorderLabel';
import Switcher from './Switcher'
import Container from '@/Components/Container';
import SectionTitle from '@/Components/SectionTitle';
import { useEffect, useState } from 'react';

const Studio = ({ alias, fields }) => {
  const [showStudio, setShowStudio] = useState(false);
  const title = fields.find((item) => item.name === 'title')?.value;
  const model = fields.find((item) => item.name === '3dmodel')?.value;
  const [switchActiveId, setSwitchActiveId] = useState(0)

  const switcherData = [
    {lable: '3d model', component: 'model'},
    {lable: 'видео', component: 'video'}
  ]

  const showStudioFc = () => {
    if (window.scrollY >= document.querySelector('#studio').getBoundingClientRect().top - 300) {
      if (showStudio === false) {
        setShowStudio(true);
      }
    }
  };

  const setActiveSwitcher = (id) => {
    setSwitchActiveId(id)
  }

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
            <div className={styles['studio__switcher']}>
              {switcherData.map((switcher, i) => {
                let position = null
                if(switcherData.length == 1) position = 'alone'
                else position = (i == switcherData.length-1) ? 'right' : !i ? 'left' : null;
                return <Switcher 
                active={switchActiveId == i} 
                label={switcher.lable} 
                position={position} 
                id={i} 
                setActive={setActiveSwitcher}/>
              })}
            </div>
          </div>
          <div className={`${styles['studio__content']}`}>
            {switcherData.map((switcher, i) => {
              return switcher.component == 'model' 
              ? showStudio ? <iframe src={model} frameborder="0" className={`${styles['studio__iframe']} ${i != switchActiveId ? styles['studio__iframe--hidden'] : ''}`}></iframe> : null
              : <iframe className={`${styles['studio__video']} ${i != switchActiveId ? styles['studio__video--hidden'] : ''}`} src="https://www.youtube.com/embed/dUP3_8I3MDo?si=Qjr494IoPvR0AcSq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Studio;
