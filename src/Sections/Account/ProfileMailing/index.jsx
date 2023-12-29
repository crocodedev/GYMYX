"use client";

import ProfileBlockTitle from "@/Components/Account/Profile/ProfileBlockTitle";
import Checkbox from "@/Components/Checkbox";
import { useEffect, useState } from "react";

import styles from "./ProfileMailing.module.scss";
import { changeSubscribe, deleteSubscribe } from "./helpers";
import { useSession } from "next-auth/react";

const ITEMS = [
  { id: 1, label: "E-mail", value: "email" },
  { id: 2, label: "Sms", value: "phone" },
  { id: 3, label: "Не получать рассылку", value: "none" },
];

const ProfileMailing = () => {
  const { data: sessionData } = useSession();
  const [activeVariant, setActiveVariant] = useState([]);

  useEffect(() => {
    updateData();
  }, [sessionData, sessionData]);

  const updateData = () => {
    if (sessionData) setActiveVariant([...sessionData.user.subscriptions]);
  };

  const removeFromArray = (arr, itemToRemove) => {
    return arr.filter((item) => item !== itemToRemove);
  };

  const toggleVariant = (value) => {
    setActiveVariant((prevActiveVariant) => [...prevActiveVariant, value]);

    activeVariant.includes(value.toString())
      ? deleteSubscribe(sessionData?.user?.accessToken, value).then((data) => {
          if (data.data.success) {
            setActiveVariant((prevActiveVariant) =>
              removeFromArray(prevActiveVariant, value)
            );
            updateData();
          }
        })
      : changeSubscribe(sessionData?.user?.accessToken, value).then((data) => {
          if (data.data.success) {
            setActiveVariant((prevActiveVariant) => [
              ...prevActiveVariant,
              value,
            ]);

            updateData();
          }
        });
  };

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
