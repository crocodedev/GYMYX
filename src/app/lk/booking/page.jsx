'use client';

import BookingHero from '@/Sections/Account/Booking/BookingHero';
import BookingVariants from '@/Sections/Account/Booking/BookingVariants';
import BookingModal from '@/Sections/Account/Booking/BookingModal';

import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import Loading from '@/Components/Loading';
import { useDispatch } from 'react-redux';
import { updateBookingData } from '@/redux/bookingSlice';
import { useSession } from 'next-auth/react';

const getGyms = async (token) => {
  const result = await fetch('/api/booking/get-gyms', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
};

const Booking = () => {
  const dispatch = useDispatch();
  const { data: sessionData } = useSession();
  const hasFetchedGyms = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeGymAxios = useSelector((state) => state.booking.gym);
  const [activeGym, setActiveGym] = useState(activeGymAxios);
  const [isShowGyms, setIsShowGyms] = useState(false)

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

  const handleChangeGym = (gym) => {
    setActiveGym(gym)
    updateGym(gym, gyms)
    setIsShowGyms(false)
  };

  useEffect(() => {
    if (sessionData && !hasFetchedGyms.current) {
      hasFetchedGyms.current = true;
      getGyms(sessionData?.user?.accessToken).then(({ data }) => {
          if (data.length > 0) {
            setGyms(data);
            const existingGym = data.find((gym) => gym.id === activeGymAxios?.id);
            if (existingGym) {
              updateGym(existingGym, data)
            } else {
              setActiveGym(data[0])
              updateGym(data[0], data)
              if (data?.length > 1) {
                setIsShowGyms(true);
              }
            }
          }
        setLoading(false);
      });
    }
    
  }, [sessionData]);

  const handleButtonClick = () => {
    if(gyms.length > 1) setIsShowGyms(!isShowGyms)
    else setShowModal(true)
  }

  if (loading) {
    return <Loading full_screen={true} />;
  }

  return (
    <>
      {showModal && (
        <BookingModal closeModal={() => setShowModal(false)}/>
      )}
      <div className="booking-page__wrapper">
        <BookingHero 
          activeGym={activeGym} 
          gyms={gyms} 
          isShowGyms={isShowGyms} 
          handleButtonClick={handleButtonClick} 
          handleChangeGym={handleChangeGym}
        />
        <BookingVariants />
      </div>
    </>
  );
};

export default Booking;