'use client';

import PageHeading from '@/Sections/Account/PageHeading';
import NavigationTabs from '@/Sections/Account/NavigationTabs';
import GidList from '@/Sections/Account/Gid/GidList';
import { useState, useEffect, useRef } from 'react';
import Loading from '@/Components/Loading';
import { useSession } from 'next-auth/react';
import GidePage from '@/Sections/Gide/GidePage';

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

const Gid = () => {
  const { data: sessionData } = useSession();
  const [gids, setGids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterIsShow, setFilterIsShow] = useState(true) 

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
        // console.log(sortedData)
        setGids(sortedData);
      }
      setLoading(false);
    });
  }, [sessionData]);

  return (
    <>
      {loading ? <Loading full_screen={true} /> : <GidePage filterIsShow={filterIsShow}/>}
    </>
  );
};

export default Gid;
