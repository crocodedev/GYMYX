'use client';

import styles from './GidePage.module.scss'
import PageHeading from '@/Sections/Account/PageHeading';
import GidList from '@/Sections/Account/Gid/GidList';
import { useState, useEffect } from 'react';
import Loading from '@/Components/Loading';
import { useSession } from 'next-auth/react';
import GideFilter from '@/Sections/Gide/GideFilter';
import GideSwitcher from '@/Sections/Gide/GideSwitcher';
import { getAllTags, sortByFavorites } from './helper';

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

const GidePage = () => {
  const [tags, setTags] = useState([]);
  const { data: sessionData } = useSession();
  const [activeTags, setActiveTags] = useState([]);
  const [gids, setGids] = useState([]);
  const [gidsData, setGidsData] = useState({exercise: [], complex: []})
  const [loading, setLoading] = useState(true);
  const [switcherIdActive, setSwitcherIdActive] = useState(0)

  const SWITCHER_DATA = [
    {title: 'упражнения'},
    {title: 'комплекс'},
  ]

  useEffect(() => {
    if (!sessionData?.user?.accessToken) return;
    setLoading(true);
    getGids(sessionData?.user?.accessToken).then(res => {
      if (res?.data) {
        console.log(res?.data)
        setGids(res?.data);
        setTags(getAllTags(res?.data))
      }
      setLoading(false);
    });
  }, [sessionData]);

  useEffect(() => {
    setGidsData(prev => ({
      exercise: sortByFavorites(gids.filter(gid => gid?.type == 'exercise')), 
      complex: sortByFavorites(gids.filter(gid => gid?.type == 'complex')),
    }))
  }, [gids])

  const updateData = (id = -1) => {
    if (id > -1) {
      const findedIndex = gids.findIndex((item) => item.id === id);
      let tempGids = [...gids];
      tempGids[findedIndex].isFavorited = !tempGids[findedIndex].isFavorited;
      tempGids = sortByFavorites(tempGids)
      setGids(tempGids);
    }
  };

  if (loading) return <Loading full_screen={true} />;
  return (
    <div className={styles['gide-page']}>
      <PageHeading title={'Онлайн гид'} />
      <GideSwitcher data={SWITCHER_DATA} activeId={switcherIdActive} handlerClick={setSwitcherIdActive}/>

      {!switcherIdActive && (
        <GideFilter tags={tags} activeTags={activeTags} setActiveTags={setActiveTags}/>
      )}
      
      <GidList 
        activeTags={!switcherIdActive ? activeTags : []}
        items={!switcherIdActive ? gidsData.exercise : gidsData.complex} 
        updateData={updateData} 
      />
    </div>
  );
};

export default GidePage;