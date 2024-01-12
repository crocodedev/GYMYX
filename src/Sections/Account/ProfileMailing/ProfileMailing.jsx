'use client';
import ProfileBlockTitle from '@/Components/Account/Profile/ProfileBlockTitle';
import Checkbox from '@/Components/Checkbox';
import { useEffect, useState } from 'react';
import styles from './ProfileMailing.module.scss';
import { changeSubscribe, deleteSubscribe } from './helpers';
import { useSession } from 'next-auth/react';
import { getUserData, ITEMS } from '.';

export const ProfileMailing = () => {
  const { data: sessionData } = useSession();
  const [activeVariant, setActiveVariant] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    updateData();
  }, [sessionData, sessionData]);

  const updateData = () => {
    if (sessionData) {
      getUserData(sessionData?.user?.accessToken);
    }
  };

  const removeFromArray = (arr, itemToRemove) => {
    return arr.filter((item) => item !== itemToRemove);
  };

  const toggleVariant = (value) => {
    if (loadingSubmit) return;

    // Оптимистичное обновление
    setActiveVariant((prevActiveVariant) => [...prevActiveVariant, value]);
    // setLoadingSubmit(true);
    if (value !== 'none') {
      if (activeVariant.includes(value.toString())) {
        deleteSubscribe(sessionData?.user?.accessToken, value)
          .then((data) => {
            if (!data.data.success) {
              // Откатываем обновление
              setActiveVariant((prevActiveVariant) => removeFromArray(prevActiveVariant, value));
            }
          })
          .finally(() => setLoadingSubmit(false));
      } else {
        changeSubscribe(sessionData?.user?.accessToken, value)
          .then((data) => {
            if (!data.data.success) {
              // Откатываем обновление
              setActiveVariant((prevActiveVariant) => removeFromArray(prevActiveVariant, value));
            }
          })
          .finally(() => setLoadingSubmit(false));
      }
    } else {
      // Обновляем состояние для 'email' и 'phone' мгновенно
      setActiveVariant((prevActiveVariant) => removeFromArray(prevActiveVariant, 'email'));
      setActiveVariant((prevActiveVariant) => removeFromArray(prevActiveVariant, 'phone'));

      // Запросы на сервер (можно обработать успешные и неуспешные случаи)
      const deleteEmail = deleteSubscribe(sessionData?.user?.accessToken, 'email');
      const deletePhone = deleteSubscribe(sessionData?.user?.accessToken, 'phone');

      Promise.all([deleteEmail, deletePhone]).finally(() => setLoadingSubmit(false));
    }
  };

  return (
    <section className={styles['profile-mailing']}>
      <div className={styles['profile-mailing__wrapper']}>
        <ProfileBlockTitle label={'Рассылка'} />
        <div className={styles['profile-mailing__list']}>
          {ITEMS.map(({ id, label, value }) => (
            <Checkbox
              key={id}
              value={value}
              isActive={activeVariant.includes(value)}
              toggleActive={() => toggleVariant(value)}
              label={label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
