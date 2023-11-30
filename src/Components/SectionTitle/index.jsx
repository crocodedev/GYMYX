import styles from "./SectionTitle.module.scss"

const SectionTitle = ({ title }) => {
  return <p className={styles.title}>{title}</p>
}

export default SectionTitle
