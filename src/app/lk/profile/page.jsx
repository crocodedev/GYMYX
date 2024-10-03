'use client';

import ProfilePersonalData from '@/Sections/Account/ProfilePersonalData';
import ProfileHeading from '@/Sections/Account/ProfileHeading';
import ProfileTrainings from '@/Sections/Account/ProfileTrainings';
import ProfileStats from '@/Sections/Account/ProfileStats';
import ProfileContactOptions from '@/Sections/Account/ProfileContactOptions';
import ProfileContacts from '@/Sections/Account/ProfileContacts';
import ProfileMailing from '@/Sections/Account/ProfileMailing';
import ProfileTextField from '@/Sections/Account/ProfileTextField';

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getUserData } from '@/Utils/updateDataUser';

const Profile = () => {
  const { data: sessionData, update } = useSession();

  useEffect(() => {
    getUserData(sessionData?.user?.accessToken).then(data => {
      if(data?.data) update(data?.data)
      else signOut({ callbackUrl: '/lk/login' });
    })
  }, [])

  return (
    <div className="account-page-wrapper">
      <ProfileHeading />
      <ProfilePersonalData />
      <ProfileTrainings isShowTranfer={false}/>
      <ProfileStats />
      <ProfileContactOptions>
        <ProfileMailing />
        <ProfileContacts />
      </ProfileContactOptions>
      <ProfileTextField />
    </div>
  );
};

export default Profile;
