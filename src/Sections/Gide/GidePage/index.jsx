'use client';

import styles from './GidePage.module.scss'
import PageHeading from '@/Sections/Account/PageHeading';
import NavigationTabs from '@/Sections/Account/NavigationTabs';
import GidList from '@/Sections/Account/Gid/GidList';
import { useState, useEffect, useRef } from 'react';
import Loading from '@/Components/Loading';
import Container from '@/Components/Container';
import { useSession } from 'next-auth/react';
import GideFilter from '@/Sections/Gide/GideFilter';
import GideSwitcher from '@/Sections/Gide/GideSwitcher';

export const getGids = async (token) => {
  const result = await fetch('/api/gids/get-gids', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
};

const GidePage = ({isShowFilter = true}) => {
  const [tags, setTags] = useState([]);
  const { data: sessionData } = useSession();
  const [activeTags, setActiveTags] = useState([]);
  const [renderedItems, setRenderedItems] = useState([]);
  const [gids, setGids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [switcherIdActive, setSwitcherIdActive] = useState(0)
  const firstInit = useRef(false);

  const SWITCHER_DATA = [
    {title: 'упражнения'},
    {title: 'комплекс'},
  ]

  useEffect(() => {
    if (!sessionData?.user?.accessToken) return;
    // if (firstInit.current) return;
    // firstInit.current = true;
    setLoading(true);
    getGids(sessionData?.user?.accessToken).then(res => {
      if (res?.data) {
        // console.log(res.data)
        const sortedData = res?.data.slice().sort((a, b) => (b.isFavorited ? 1 : -1) - (a.isFavorited ? 1 : -1));
        console.log(sortedData)
        setGids(sortedData);
      }
      setLoading(false);
    });
  }, [sessionData]);

  

  const updateData = (id = -1) => {
    if (id > -1) {
      const findedIndex = gids.findIndex((item) => item.id === id);
      const tempGids = [...gids];

      tempGids[findedIndex].isFavorited = !tempGids[findedIndex].isFavorited;

      tempGids.sort((a, b) => {
        if (a.isFavorited && !b.isFavorited) {
          return -1;
        } else if (!a.isFavorited && b.isFavorited) {
          return 1;
        } else {
          return b.id - a.id;
        }
      });

      setGids(tempGids);
    }
  };

  // useEffect(() => {
  //   const uniqueTags = [];

  //   gids.forEach(({ tags }) => {
  //     tags.forEach((tag) => {
  //       uniqueTags[tag] = { title: tag };
  //     });
  //   });

  //   const uniqueTagsArray = Object.values(uniqueTags);
  //   setTags(uniqueTagsArray);
  // }, [gids]);

  // useEffect(() => {
  //   if (activeTag !== null) {
  //     const tag = tags[activeTag];

  //     const resultItems = gids.filter((item) => item.tags.includes(tag.title));

  //     setRenderedItems(resultItems);
  //   } else {
  //     setRenderedItems(gids);
  //   }
  // }, [activeTag, tags, gids]);

  // const handleChangeTag = (index) => {
  //   if (activeTag === null) {
  //     setActiveTag(index);
  //   } else {
  //     setActiveTag(index === activeTag ? null : index);
  //   }
  // };

  if (loading) return <Loading full_screen={true} />;
  return (
    <div className={styles['gide-page']}>
      <PageHeading title={'Онлайн гид'} />
      <GideSwitcher data={SWITCHER_DATA} activeId={switcherIdActive} handlerClick={setSwitcherIdActive}/>

      {isShowFilter && (
        <GideFilter 
            tags
            activeTags
            setActiveTags={setActiveTags}
        />
      )}
      
      {!!gids?.length ? (
        <GidList 
          items={!!renderedItems?.length ? renderedItems : gids} 
          updateData={updateData} 
        />
      ) : (
        <Container>
          <p style={{ color: 'white' }}>{'Пока что здесь пусто :('}</p>
        </Container>
      )}
    </div>
  );
};

export default GidePage;