'use client';

import ProfilePersonalData from '@/Sections/Account/ProfilePersonalData';
import ProfileHeading from '@/Sections/Account/ProfileHeading';
import ProfileTrainings from '@/Sections/Account/ProfileTrainings';
import ProfileStats from '@/Sections/Account/ProfileStats';
import ProfileContactOptions from '@/Sections/Account/ProfileContactOptions';
import ProfileContacts from '@/Sections/Account/ProfileContacts';
import ProfileMailing from '@/Sections/Account/ProfileMailing';
import ProfileTextField from '@/Sections/Account/ProfileTextField';
import ProfileBalace from '@/Components/Account/Profile/ProfileBalace';
import ProfileGid from '@/Sections/Account/ProfileGid';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import ProfileLogoutHeader from '@/Components/Account/Profile/ProfileLogoutHeader';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/Utils/updateDataUser';
import { uniqueUserData } from '@/Utils/helpers';

const Profile = () => {
  const { data: sessionData, update } = useSession();
  const [modalBirthisShow, setModalBirthisShow] = useState(false)
  const router = useRouter()
  
  const userData = () => {
    if(sessionData?.user?.accessToken) {
      getUserData(sessionData?.user?.accessToken)
      .then(data => {
        if(data?.data) update(data?.data)
        else signOut({ callbackUrl: '/lk/login' });
      })
    }
  }

  const modalHandlerClick = () => {
    router.push('/lk/profile/edit')
  }

  useEffect(() => {
    if(sessionData?.user?.accessToken) {
      uniqueUserData()
    }

    if(sessionData?.user) {
      setModalBirthisShow(!sessionData?.user?.birth)
    }
    userData()
  }, [sessionData?.user?.accessToken])

  return (
    <>
    {modalBirthisShow && (
      <Modal text={'Укажите свою дату рождения, чтобы мы могли радовать вас каждый год :)'}>
        <Button
          onClick={modalHandlerClick}
          fullSize={true}
          size="l"
          label="Редактировать"
          variant="blue-gradient"
          disabledShadow={true}
        />
      </Modal>
    )}

      <div className="account-page-wrapper">
        <ProfileLogoutHeader/>
        <ProfileHeading />
        <ProfileBalace/>
        {/* <ProfilePersonalData /> */}
        <ProfileTrainings isShowTranfer={true}/>
        <ProfileGid/>
        <ProfileStats />
        <ProfileContactOptions>
          <ProfileMailing />
          <ProfileContacts />
        </ProfileContactOptions>
        <ProfileTextField />
      </div>
    </>
  );
};

export default Profile;
