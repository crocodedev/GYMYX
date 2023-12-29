"use client";

import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import BookingSignUpHeading from "@/Sections/Account/Booking/BookingSignUpHeading";
import BookingCalendar from "@/Sections/Account/Booking/BookingCalendar";
import BookingSteps from "@/Sections/Account/Booking/BookingSteps";
import { useSelector } from "react-redux";
import BookingSignUpContent from "@/Sections/Account/Booking/BookingSignUpContent";
import { useState } from "react";

const BookingSignUp = () => {
  const [showModal, setShowModal] = useState(false);
  const { gym, variant } = useSelector((state) => state.booking);

  return (
    <>
      {showModal && (
        <Modal
          handleClose={() => setShowModal((prev) => !prev)}
          text={"Извините, пока у нас только один зал :("}
        >
          <Button
            onClick={() => setShowModal((prev) => !prev)}
            fullSize={true}
            size="l"
            label="Понятно"
            variant="blue"
            disabledShadow={true}
          />
        </Modal>
      )}

      <BookingSignUpHeading
        handleChangeGym={() => setShowModal((prev) => !prev)}
        gymTitle={gym?.name}
        headingTitle={
          variant === "single"
            ? "Записаться на тренировку"
            : "Купить несколько тренировок"
        }
      />
      <BookingSignUpContent>
        <BookingCalendar />
        <BookingSteps stepNumber={1} stepTitle={"Выберите день"} />
      </BookingSignUpContent>
    </>
  );
};

export default BookingSignUp;
