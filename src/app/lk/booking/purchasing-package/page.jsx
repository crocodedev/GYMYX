'use client';

import BookingSignUpHeading from "@/Sections/Account/Booking/BookingSignUpHeading"
import NavigationBack from "@/Sections/Account/NavigationBack"
import BookingPackages from "@/Sections/Account/Booking/BookingPackages"
import Modal from "@/Components/Modal"
import Button from "@/Components/Button"
import { useState } from "react"
import { useSelector } from "react-redux"
import Loading from "@/Components/Loading"

const PurchasingPackages = () => {
  const [showModal, setShowModal] = useState(false)
  const { gym } = useSelector((state) => state.booking);
  const [loadIsShow, setLoadIsShow] = useState(true)

  return (
    <>
    {loadIsShow && <Loading full_screen={true} background={false}/>}
    
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

    <NavigationBack buttonLabel={'Назад'} link={'/lk/booking'} />
    <BookingSignUpHeading
        handleChangeGym={() => setShowModal((prev) => !prev)}
        gymTitle={gym?.name}
        headingTitle={'Выбирете пакет тренировок'}
        showButtonEditGym={false}
      />
    <BookingPackages setLoadIsShow={setLoadIsShow}/>
    </>
  )
}

export default PurchasingPackages