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

async function getUserData(token) {
  const response = await fetch("https://gymyx.cro.codes/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 10,
    },
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result?.data || null;
}

const ProfileMailing = () => {
  const { data: sessionData } = useSession();
  const [activeVariant, setActiveVariant] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    updateData();
  }, [sessionData, sessionData]);

  const updateData = () => {
    if (sessionData) {
      getUserData(sessionData?.user?.accessToken);
    }
  };

  const removeFromArray = (arr, itemToRemove) => {
    return arr.filter((item) => item !== itemToRemove);
  };

  const toggleVariant = (value) => {
    if (loadingSubmit) return;
    setLoadingSubmit(true);
    setActiveVariant((prevActiveVariant) => [...prevActiveVariant, value]);

    if (value != "none") {
      if (activeVariant.includes("none")) {
        setActiveVariant((prevActiveVariant) =>
          removeFromArray(prevActiveVariant, "none")
        );
      }

      activeVariant.includes(value.toString())
        ? deleteSubscribe(sessionData?.user?.accessToken, value).then(
            (data) => {
              if (data.data.success) {
                setActiveVariant((prevActiveVariant) =>
                  removeFromArray(prevActiveVariant, value)
                );
                updateData();
              }
              setLoadingSubmit(false);
            }
          )
        : changeSubscribe(sessionData?.user?.accessToken, value).then(
            (data) => {
              if (data.data.success) {
                setActiveVariant((prevActiveVariant) => [
                  ...prevActiveVariant,
                  value,
                ]);
                updateData();
              }
              setLoadingSubmit(false);
            }
          );
    } else {
      deleteSubscribe(sessionData?.user?.accessToken, "email").then((data) => {
        if (data.data.success) {
          setActiveVariant((prevActiveVariant) =>
            removeFromArray(prevActiveVariant, "email")
          );
          updateData();
        }
        setLoadingSubmit(false);
      });

      deleteSubscribe(sessionData?.user?.accessToken, "phone").then((data) => {
        if (data.data.success) {
          setActiveVariant((prevActiveVariant) =>
            removeFromArray(prevActiveVariant, "phone")
          );
          updateData();
        }
        setLoadingSubmit(false);
      });
    }
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
