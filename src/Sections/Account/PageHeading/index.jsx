import Container from "@/Components/Container"
import styles from "./PageHeading.module.scss"

const PageHeading = ({ title }) => {
  return (
    <section className={styles["page-heading"]}>
      <Container>
        <div className={styles["page-heading__wrapper"]}>
          <p className={styles["page-heading__title"]}>{title}</p>
        </div>
      </Container>
    </section>
  )
}

export default PageHeading
