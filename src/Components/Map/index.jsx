"use client"

import { useState, useEffect } from "react"

import Button from "../Button"
import Container from "../Container"
import Select from "../Select"
import styles from "./Map.module.scss"
import MapArea from "./MapArea"

const MAP_PLACEMARK = [
  {
    id: 1,
    coords: "55.695804, 37.485664",
    title: "Раменки",
    subtitle: "Фитнес-клуб в ЖК Небо. Площадь — 1000 кв. м.",
    address: "г. Москва, Мичуринский пр., 56",
  },
  {
    id: 2,
    coords: "55.751474, 37.618900",
    title: "Кремль",
    subtitle: "Кремль",
    address: "Ивановская площадь, Москва",
  },
  {
    id: 3,
    coords: "55.158136, 30.213884",
    title: "CODE.",
    subtitle: "CODE. IT компания",
    address: "улица Чкалова, 56А, Витебск",
  },
]

const Map = () => {
  const [currentPlacemark, setCurrentPlacemark] = useState()

  useEffect(() => {
    setCurrentPlacemark(MAP_PLACEMARK[0])
  }, [])

  return (
    <section id="map" className={styles.map}>
      <Container>
        <div className={styles.map__wrapper}>
          <MapArea
            currentPlacemark={currentPlacemark}
            Placemarks={MAP_PLACEMARK}
          />
          <div className={styles.map__content}>
            <Select onChange={setCurrentPlacemark} childrens={MAP_PLACEMARK} />
            <div className={styles.map__info}>
              <p className={styles.map__title}>{currentPlacemark?.title}</p>
              <p className={styles.map__subtitle}>
                {currentPlacemark?.subtitle}
              </p>
              <p className={styles.map__text}>{currentPlacemark?.address}</p>
            </div>
            <Button
              className={styles.map__btn}
              size="l"
              variant="blue"
              label="Выбрать"
              icon="arrow"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Map
