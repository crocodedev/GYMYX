'use client';

import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import BookingSignUpHeading from '@/Sections/Account/Booking/BookingSignUpHeading';
import BookingCalendar from '@/Sections/Account/Booking/BookingCalendar';
import BookingSteps from '@/Sections/Account/Booking/BookingSteps';
import { useSelector } from 'react-redux';
import BookingSignUpContent from '@/Sections/Account/Booking/BookingSignUpContent';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const BookingSignUp = () => {
  const { data: sessionData } = useSession();
  const [showModal, setShowModal] = useState(false);
  const { gym, variant } = useSelector((state) => state.booking);
  const balance = sessionData?.user?.balance || 0

  return (
    <>
      {showModal && (
        <Modal handleClose={() => setShowModal((prev) => !prev)} text={'Извините, пока у нас только один зал :('}>
          <Button
            onClick={() => setShowModal((prev) => !prev)}
            fullSize={true}
            size="l"
            label="Понятно"
            variant="blue"
          />
        </Modal>
      )}

      <BookingSignUpHeading
        handleChangeGym={() => setShowModal((prev) => !prev)}
        gymTitle={gym?.name}
        headingTitle={variant === 'single' ? 'Записаться на тренировку' : 'Купить несколько тренировок'}
      />
      <BookingSignUpContent>
        <BookingCalendar change={false}/>
        <BookingSteps stepNumber={1} stepTitle={'Выберите день'} balance={balance} packageIsActive={balance > 0}/>
      </BookingSignUpContent>
    </>
  );
};

export default BookingSignUp;
