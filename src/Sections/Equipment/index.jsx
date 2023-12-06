import Container from "@/Components/Container"
import SectionTitle from "@/Components/SectionTitle"
import EquipmentItem from "@/Components/Equipment/EquipmentItem"

import styles from "./Equipment.module.scss"

const ITEMS = [
  {
    id: 1,
    title: "Весы",
    image: "/images/equipment/Equipment-1.png",
    content: "Отслеживайте результаты продуктивных тренировок",
  },
  {
    id: 2,
    title: "Станция",
    image: "/images/equipment/Equipment-2.png",
    content: "Тренировки под любимую музыку стали еще проще ",
  },
  {
    id: 3,
    title: "Кондиционер",
    image: "/images/equipment/Equipment-3.png",
    content: "Подстройте температуру под себя ",
  },
  {
    id: 4,
    title: "Рама и штанга",
    image: "/images/equipment/Equipment-4.png",
    content: "Используйте во время силовых тренировок",
  },
  {
    id: 5,
    title: "Беговая дорожка",
    image: "/images/equipment/Equipment-5.png",
    content: "Незаменимый инструмент для комфортного и эффективного кардио. Бегайте, не смотря на погодные условия.",
  },
  {
    id: 6,
    title: "Скамья и гантели",
    image: "/images/equipment/Equipment-6.png",
    content: "Универсальные тренажеры для комплексной тренировки",
  },
  {
    id: 7,
    title: "Для разминки",
    image: "/images/equipment/Equipment-7.png",
    content: "Для здоровой поясницы и разминки",
  },
  {
    id: 8,
    title: "Функционал",
    image: "/images/equipment/Equipment-8.png",
    content: "Для интенсивных и функциональных тренировок",
  },
]

const Equipment = () => {
  return (
    <section id="gym" className={styles.equipment}>
      <Container>
        <SectionTitle title="Оборудование в зале" />
        <div className={styles.equipment__grid}>
          {ITEMS.map(({ id, ...props }) => (
            <EquipmentItem key={id} props={...props} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Equipment
