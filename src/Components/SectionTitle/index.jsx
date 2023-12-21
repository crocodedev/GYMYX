import styles from "./SectionTitle.module.scss"

const SectionTitle = ({ align = "center", title }) => {
  return (
    <p
      className={`${styles.title} ${
        align === "center" && styles["title--center"]
      }`}
    >
      {title}
    </p>
  )
}

export default SectionTitle
