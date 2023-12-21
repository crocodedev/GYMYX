import Container from "@/Components/Container"
import Link from "next/link"
import NavigationBack from "@/Sections/Account/NavigationBack"
import styles from "./ProfileEditHeading.module.scss"

const ProfileEditHeading = ({ isButtonBack = true, buttonLabel, sectionTitle }) => {
  return (
    <section className={styles["profile-edit-heading"]}>
      {isButtonBack && <NavigationBack containerSize="M" buttonLabel={buttonLabel} link={"/account/profile"} />}
      <Container size="M">
        <div className={styles["profile-edit-heading__wrapper"]}>
          <p className={styles["profile-edit-heading__title"]}>
            {sectionTitle}
          </p>
        </div>
      </Container>
    </section>
  )
}

export default ProfileEditHeading
