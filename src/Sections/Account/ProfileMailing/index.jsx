"use client";

import ProfileBlockTitle from "@/Components/Account/Profile/ProfileBlockTitle";
import Checkbox from "@/Components/Checkbox";
import { useEffect, useState } from "react";

import styles from "./ProfileMailing.module.scss";
import { changeSubscribe } from "./helpers";
import { useSession } from "next-auth/react";

const ITEMS = [
  { id: 1, label: "E-mail", value: "email" },
  { id: 2, label: "Sms", value: "sms" },
  { id: 3, label: "Не получать рассылку", value: "none" },
];

const ProfileMailing = () => {
  const { data: sessionData } = useSession();
  const [activeVariant, setActiveVariant] = useState([]);

  const toggleVariant = (value) => {
    setActiveVariant((prev) => {
      if (value === "none") {
        return ["none"];
      } else {
        const updatedArray = prev.includes("none")
          ? prev.filter((item) => item !== "none")
          : prev;

        if (updatedArray.includes(value)) {
          return updatedArray.filter((item) => item !== value);
        } else {
          return [...updatedArray, value];
        }
      }
    });

    console.log(value);
    changeSubscribe(sessionData?.user?.accessToken, "phone").then((data) => {
      if (data.data.success) {
      }
    });
  };

  console.log(activeVariant);

  return (
    <section className={styles["profile-mailing"]}>
      <div className={styles["profile-mailing__wrapper"]}>
        <ProfileBlockTitle label={"Рассылка"} />
        <div className={styles["profile-mailing__list"]}>
          {ITEMS.map(({ id, label, value }) => (
            <Checkbox
              key={id}
              value={value}
              isActive={activeVariant.includes(value)}
              toggleActive={() => toggleVariant(value)}
              label={label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileMailing;
