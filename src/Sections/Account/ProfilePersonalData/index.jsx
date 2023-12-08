import ProfileField from "@/Components/Account/Profile/ProfileField"
import Container from "@/Components/Container"

import styles from "./ProfilePersonalData.module.scss"

const ITEMS = [
  { id: 1, label: "Телефон", value: "+7 910 679 85 43" },
  { id: 2, label: "E-mail", value: "vnavolokin@gmail.com" },
]

const ProfilePersonalData = () => {
  return (
    <section>
      <Container size="M">
        <div className={styles["profile-personal-data__col"]}>
          {ITEMS.map(({ id, label, value }) => (
            <ProfileField
              readonly={true}
              key={id}
              prefix={label}
              value={value}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProfilePersonalData
