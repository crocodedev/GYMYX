import GidItem from "@/Components/Account/Gid/GidItem"
import Container from "@/Components/Container"

import styles from "./GidList.module.scss"

const GidList = ({ items = [] }) => {
  return (
    <section className={styles["grid-list"]}>
      <Container>
        <div className={styles["grid-list__wrapper"]}>
          {items.map(({ tags, id, ...rest }) => (
            <GidItem key={id} {...rest} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default GidList
