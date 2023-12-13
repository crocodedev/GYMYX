import ProfilePersonalData from "@/Sections/Account/ProfilePersonalData"
import ProfileHeading from "@/Sections/Account/ProfileHeading"
import ProfileTrainings from "@/Sections/Account/ProfileTrainings"
import ProfileStats from "@/Sections/Account/ProfileStats"
import ProfileContactOptions from "@/Sections/Account/ProfileContactOptions"
import ProfileContacts from "@/Sections/Account/ProfileContacts"
import ProfileMailing from "@/Sections/Account/ProfileMailing"
import ProfileTextField from "@/Sections/Account/ProfileTextField"

import Modal from "@/Components/Modal"
import Button from "@/Components/Button"

const Profile = () => {
  return (
    <div className="account-page-wrapper">
      {/* <Modal handleClose={null} text={"Вы точно хотите отменить тренировку?"}>
        <Button fullSize={true} size="l" label="Да" variant="blue" />
        <Button fullSize={true} size="l" label="Нет" variant="black" />
      </Modal> */}
      <ProfileHeading />
      <ProfilePersonalData />
      <ProfileTrainings />
      <ProfileStats />
      <ProfileContactOptions>
        <ProfileMailing />
        <ProfileContacts />
      </ProfileContactOptions>
      <ProfileTextField />
    </div>
  )
}

export default Profile
