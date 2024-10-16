'use client';

import BookingSignUpHeading from '@/Sections/Account/Booking/BookingSignUpHeading';
import BookingSignUpTags from '@/Sections/Account/Booking/BookingSignUpTags';
import BookingSignUpContent from '@/Sections/Account/Booking/BookingSignUpContent';
import BookingSteps from '@/Sections/Account/Booking/BookingSteps';
import NavigationBack from '@/Sections/Account/NavigationBack';
import BookingTimePricing from '@/Sections/Account/Booking/BookingTimePricing';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const variants = [
  { value: '00:00', bgColor: '#7B92FF' },
  { value: '08:00', bgColor: '#294AE7' },
  { value: '13:00', bgColor: '#1E318A' },
  { value: '19:00', bgColor: '#061641' },
];

const checkIsOnlyTraining = (data) => {
  let result = true;
  data.forEach(({ time }) => {
    if (!!time.length) {
      result = false;
      return;
    }
  });

  return result;
};

const ChooseTime = () => {
  const { data: sessionData } = useSession();
  const { gym, visitDate } = useSelector((state) => state.booking);
  const [pricesVariants, setPricesVariants] = useState([]);
  const balanceCount = sessionData?.user?.balance || 0
  const [balance, setBalence] = useState(balanceCount)

  useEffect(() => {
    console.log(gym?.prices)
    setCountBalace()
    if (gym?.prices && sessionData) {
      let variantsTemp = [];

      if (!sessionData.user.is_new) {
        variantsTemp = gym.prices.map((item, index) => {
          return { ...item, bgColor: variants[index]?.bgColor };
        });
      } else {
        if (!checkIsOnlyTraining(visitDate)) {
          variantsTemp = gym.prices.map((item, index) => {
            return { ...item, bgColor: variants[index]?.bgColor };
          });
        } else {
          variantsTemp = [
            {
              start: '00:00:00',
              end: '23:00:00',
              price: gym?.min_price,
              bgColor: variants[0]?.bgColor,
            },
          ];
        }
      } else {
        variantsTemp = gym.prices.map((item, index) => {
          return { ...item, bgColor: variants[index]?.bgColor };
        });
      }
      setPricesVariants(variantsTemp);
    }
  }, [gym, sessionData, visitDate]);

  const setCountBalace = () => {
    const countTime = visitDate.reduce((acc, el) => acc + el.time.length ,0)
    setBalence(balanceCount - countTime)
  }

  return (
    <>
      <NavigationBack buttonLabel={'Вернуться к выбору дней'} link={'/lk/booking/sign-up'} />
      <BookingSignUpHeading showButtonEditGym={false} headingTitle={'Запишитесь на тренировки'} />
      <BookingSignUpTags change={false}/>
      <BookingSignUpContent gymIsShow={false}>
        <BookingTimePricing variants={pricesVariants} change={false}/>
        <BookingSteps stepNumber={2} stepTitle={'Выберите время'} balance={balance} packageIsActive={balanceCount > 0}/>
      </BookingSignUpContent>
    </>
  );
};

export default ChooseTime;
