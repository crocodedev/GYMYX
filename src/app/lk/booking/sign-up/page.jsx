'use client';

import BookingSignUpHeading from '@/Sections/Account/Booking/BookingSignUpHeading';
import BookingCalendar from '@/Sections/Account/Booking/BookingCalendar';
import BookingSteps from '@/Sections/Account/Booking/BookingSteps';
import { useSelector } from 'react-redux';
import BookingSignUpContent from '@/Sections/Account/Booking/BookingSignUpContent';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getUserData } from '@/Utils/updateDataUser';
import BookingModal from '@/Sections/Account/Booking/BookingModal';
import { useDispatch } from 'react-redux';
import { updateBookingData } from '@/redux/bookingSlice';

const BookingSignUp = () => {
  const dispatch = useDispatch();
  const { data: sessionData, update } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const { gym, gyms, variant } = useSelector((state) => state.booking);
  const [activeGym, setActiveGym] = useState(gym)

  const handlerCloseModal = () => {
    setShowModal(false)
  }

  const updateGym = (gym, gyms) => {
      dispatch(
        updateBookingData({
          gym,
          gyms,
          variant: null,
          visitDate: null,
          currentDate: 0,
          avaliableTimesCurrentDay: [],
          loading: false,
        })
      );
    }

  const handleChangeGym = (gymData) => {
    setActiveGym(gymData)
    updateGym(gymData, gyms)
    setShowModal(false)
  };

  useEffect(() => {
    if (sessionData?.user?.accessToken) {
      const existingGym = gyms.find((gymx) => gymx.id === gym?.id);
      if (existingGym) {
        updateGym(existingGym, gyms)
      } else {
        setActiveGym(gyms[0])
        if (gyms.length > 1) {
          setShowModal(true);
        } else {
          updateGym(gyms[0], gyms)
        }
      }
      getUserData(sessionData?.user?.accessToken)
        .then(res => {
          if (res?.data) {
            setBalance(res?.data?.balance)
          }
        })
    }
  }, [sessionData])

  return (
    <>
      {showModal && (
        <BookingModal 
          gyms={gyms} 
          activeGym={activeGym} 
          closeModal={handlerCloseModal} 
          changeGym={handleChangeGym} 
        />
      )}

      <BookingSignUpHeading
        handleChangeGym={() => setShowModal((prev) => !prev)}
        gymTitle={gym?.name}
        showButtonEditGym={true}
        headingTitle={'Запишитесь на тренировки'}
        isShowGymButton={false}
      />
      <BookingSignUpContent gymTitle={gym?.name} gymIsShowButton={false} handleChangeGym={() => setShowModal((prev) => !prev)}>
        <BookingCalendar change={false} userIsFix={!!sessionData?.user?.is_fix}/>
        <BookingSteps stepNumber={1} stepTitle={'Выберите день'} balance={balance} packageIsActive={balance > 0}/>
      </BookingSignUpContent>
    </>
  );
};

export default BookingSignUp;
