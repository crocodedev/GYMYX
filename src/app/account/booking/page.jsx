"use client";

import BookingHero from "@/Sections/Account/Booking/BookingHero";
import BookingVariants from "@/Sections/Account/Booking/BookingVariants";

import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import { useEffect, useState } from "react";
import Loading from "@/Components/Loading";
import { useDispatch } from "react-redux";
import { updateBookingData } from "@/redux/bookingSlice";

const getGyms = async () => {
  const result = await fetch("/api/booking/get-gyms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
};

const Booking = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [gyms, setGyms] = useState([{}]);
  const [activeGym, setActiveGym] = useState({});
  const [loading, setLoading] = useState(true);

  const handleChangeGym = () => {
    //ПО УМОЛЧАНИЮ 1 ЗАЛ
    setShowModal((prev) => !prev);
    // if (gyms.length === 1 && !showModal) {
    //   setShowModal(true)
    // } else {
    //   if (showModal) {
    //     setShowModal(false)
    //   }
    // }
  };

  useEffect(() => {
    setLoading(true);
    getGyms().then(({ data }) => {
      if (data.length > 0) {
        setGyms(data);
        setActiveGym(data[0]);
        dispatch(
          updateBookingData({
            gym: data[0],
            variant: null,
            visitDate: null,
            currentDate: 0,
            avaliableTimesCurrentDay: [],
            loading: false,
          })
        );
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading full_screen={true} />;
  }

  return (
    <>
      {showModal && (
        <Modal
          handleClose={handleChangeGym}
          text={"Извините, пока у нас только один зал :("}
        >
          <Button
            onClick={handleChangeGym}
            fullSize={true}
            size="l"
            label="Понятно"
            variant="blue"
            disabledShadow={true}
          />
        </Modal>
      )}
      <BookingHero data={activeGym} handleButtonClick={handleChangeGym} />
      <BookingVariants />
    </>
  );
};

export default Booking;
