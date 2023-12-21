import ProfileEditHeading from "@/Sections/Account/ProfileEditHeading"
import CreateProfile from "@/Sections/Login/CreateProfile"

const LoginCreateProfile = () => {
  return (
    <div className="account-page-wrapper">
      <ProfileEditHeading isButtonBack={false} sectionTitle={"Добавить данные профиля"} />
      <CreateProfile />
    </div>
  )
}

export default LoginCreateProfile
