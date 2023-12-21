"use client"

import Container from "@/Components/Container"
import styles from "./TrainingTabs.module.scss"

const TrainingTabs = ({ items, selectedTab, handleChangeTab }) => {
  return (
    <section className={styles["training-tabs"]}>
      <Container>
        <div className={styles["training-tabs__btns"]}>
          {items.map(({ title }, index) => (
            <div
              key={title}
              onClick={() => handleChangeTab(index)}
              className={`${styles["training-tabs__btn"]} ${
                selectedTab === index ? styles["active"] : ""
              }`}
            >
              {title}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TrainingTabs
