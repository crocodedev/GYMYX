"use client";

import Container from "@/Components/Container";
import styles from "./ProfileTrainings.module.scss";
import { useSession } from "next-auth/react";

import { canDelete, cancelBooking, getTrainingData } from "./helpers";

import { useState, useEffect } from "react";
import Loading from "@/Components/Loading";
import { formatDate, formatTime } from "@/Utils/helpers";

const ProfileTrainings = () => {
  const { data: sessionData } = useSession();
  const [closestTraining, setClosestTraining] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateData();
  }, [sessionData, sessionData]);

  useEffect(() => {
    if (!sessionData) return;

    getTrainingData(sessionData?.user?.accessToken).then(({ data }) => {
      function parseDateTime(date, time) {
        return new Date(`${date}T${time}`);
      }

      if (data) {
        const sortedData = data.sort((a, b) => {
          const dateA = parseDateTime(a.date, a.time);
          const dateB = parseDateTime(b.date, b.time);
          return dateA - dateB;
        });

        const closestTraining = sortedData[0];
        setClosestTraining(closestTraining);
      }
      setLoading(false);
    });
  }, [sessionData]);

  const updateData = () => {
    if (!sessionData) return;

    getTrainingData(sessionData?.user?.accessToken).then(({ data }) => {
      function parseDateTime(date, time) {
        return new Date(`${date}T${time}`);
      }

      if (data) {
        const sortedData = data.sort((a, b) => {
          const dateA = parseDateTime(a.date, a.time);
          const dateB = parseDateTime(b.date, b.time);
          return dateA - dateB;
        });

        const closestTraining = sortedData[0];

        setClosestTraining(closestTraining);
      }
      setLoading(false);
    });
    setLoading(false);
  };

  const handleDeleteItem = (id) => {
    cancelBooking(sessionData?.user?.accessToken, id).then((data) => {
      if (data.data.status) {
        updateData();
      }
    });
  };

  if (loading) return <Loading full_screen={true} />;
  if (!closestTraining) return;

  return (
    <section className={styles["profile-trainings"]}>
      <Container size="M">
        <div className={styles["profile-trainings__wrapper"]}>
          <div className={styles["profile-trainings__object"]}>
            <img src="/icons/icon.svg" />
          </div>
          <div
            className={styles["profile-trainings__btn"]}
            onClick={() => handleDeleteItem(closestTraining?.id)}
          >
            <img src="/icons/cross.svg" alt="" />
          </div>
          <div className={styles["profile-trainings__content"]}>
            <div className={styles["profile-trainings__date"]}>
              <p className={styles["profile-trainings__date-value"]}>
                {formatDate(closestTraining.date)}
              </p>
              <div className={styles["profile-trainings__date-time"]}>
                {formatTime(closestTraining.time)}
              </div>
            </div>
            <div className={styles["profile-trainings__col"]}>
              <p className={styles["profile-trainings__title"]}>
                {closestTraining?.gym?.name || ""}
              </p>
              <p className={styles["profile-trainings__text"]}>
                {closestTraining?.gym?.address || ""}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfileTrainings;
