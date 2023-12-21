import NavigationBack from "@/Sections/Account/NavigationBack"
import BookingSignUpHeading from "@/Sections/Account/Booking/BookingSignUpHeading"
import CheckoutContent from "@/Sections/Account/Checkout/CheckoutContent"

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
