import Button from "@/Components/Button"
import Container from "@/Components/Container"
import ProfileField from "@/Components/Account/Profile/ProfileField"
import styles from "./ProfileEditForm.module.scss"

const ProfileEditForm = () => {
  return (
    <section className={styles["profile-edit-form"]}>
      <Container size="M">
        <div className={styles["profile-edit-form__wrapper"]}>
          <div className={styles["profile-edit-form__data"]}>
            <label className={styles["profile-edit-form__avatar"]}>
              <input type="file" />
              <img src="/images/hero.png" alt="" />
            </label>
            <div className={styles["profile-edit-form__data-col"]}>
              <ProfileField prefix="Имя" />
              <ProfileField prefix="Фамилия" />
            </div>
          </div>
          <div className={styles["profile-edit-form__contacts"]}>
            <p className={styles["profile-edit-form__contacts-title"]}>
              Контакты
            </p>
            <div className={styles["profile-edit-form__row"]}>
              <ProfileField type="tel" prefix="Телефон" />
              <ProfileField type="email" prefix="E-mail" />
            </div>
          </div>
          <Button
            size="l"
            label={"Сохранить"}
            variant="blue"
            fullSize={true}
          />
        </div>
      </Container>
    </section>
  )
}

export default ProfileEditForm
