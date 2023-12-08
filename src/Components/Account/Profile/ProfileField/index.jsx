import styles from "./ProfileField.module.scss"

const ProfileField = ({ readonly = false, value, prefix, type = "text" }) => {
  return (
    <div className={styles["profile-field"]}>
      <p className={styles["profile-field__label"]}>{prefix}</p>
      <input
        readOnly={readonly}
        value={value}
        className={styles["profile-field__field"]}
        type={type}
      />
    </div>
  )
}

export default ProfileField
