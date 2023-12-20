import NavigationBack from "@/Sections/NavigationBack"
import BookingSignUpHeading from "@/Sections/Booking/BookingSignUpHeading"
import CheckoutContent from "@/Sections/Checkout/CheckoutContent"

const Checkout = () => {
  return (
    <>
      <NavigationBack
        buttonLabel={"Вернуться к выбору"}
        link={"/account/booking/sign-up/choose-time"}
      />
      <BookingSignUpHeading showButtonEditGym={false} headingTitle={"Оплата"} />
      <CheckoutContent />
    </>
  )
}

export default Checkout
