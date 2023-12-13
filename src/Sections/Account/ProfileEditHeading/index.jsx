import Container from "@/Components/Container"
import Link from "next/link"
import styles from "./ProfileEditHeading.module.scss"

const ProfileEditHeading = ({ buttonLabel, sectionTitle }) => {
  return (
    <section className={styles["profile-edit-heading"]}>
      <Container size="M">
        <div className={styles["profile-edit-heading__wrapper"]}>
          {buttonLabel && (
            <Link
              href={"/account/profile"}
              className={styles["profile-edit-heading__btn"]}
            >
              <span className={styles["profile-edit-heading__btn-icon"]}>
                <img src="/icons/arrow-2.svg" />
              </span>
              <p className={styles["profile-edit-heading__btn-text"]}>
                {buttonLabel}
              </p>
            </Link>
          )}
          <p className={styles["profile-edit-heading__title"]}>
            {sectionTitle}
          </p>
        </div>
      </Container>
    </section>
  )
}

export default ProfileEditHeading
