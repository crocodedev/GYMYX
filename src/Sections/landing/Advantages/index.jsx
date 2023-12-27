"use client";

import Container from "@/Components/Container";
import Slider from "@/Components/Slider";
import styles from "./Advantages.module.scss";

const Advantages = ({ alias, fields }) => {
  const title = fields.find((item) => item.name === "title");
  const list = fields.find((item) => item.name === "list")?.value || [];

  const slides = list.map((item, index) => {
    const title = item.find((field) => field.name === "title");
    const subtitle = item.find((field) => field.name === "subtitle");
    const image = item.find((field) => field.name === "image");

    return {
      id: index,
      image: image?.value?.src || "",
      title: title?.value || "",
      text: subtitle?.value || "",
      alt: title?.value || "",
    };
  });

  return (
    <section id={alias} className={styles.advantages}>
      <Container size="XL">
        <Slider title={title?.value} items={slides} />
      </Container>
    </section>
  );
};

export default Advantages;
