"use client";

import Container from "@/Components/Container";
import styles from "./ProfileTrainings.module.scss";
import { useSession } from "next-auth/react";

import { canDelete, cancelBooking, getTrainingData } from "./helpers";

import { useState, useEffect } from "react";
import Loading from "@/Components/Loading";
import { formatDate, formatTime } from "@/Utils/helpers";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";

const ProfileTrainings = () => {
  const { data: sessionData } = useSession();
  const [closestTraining, setClosestTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [curIdItem, setCurIdItem] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    updateData();
  }, [sessionData, sessionData]);

  useEffect(() => {
    updateData();
  }, [sessionData]);

  const updateData = () => {
    if (!sessionData) return;

    getTrainingData(sessionData?.user?.accessToken).then(({ data }) => {
      function parseDateTime(date, time) {
        return new Date(`${date}T${time}`);
      }

      if (data) {
        const sortedData = data
          .filter((item) => {
            const currentDate = new Date();
            const itemDate = parseDateTime(item.date, item.time);
            return itemDate > currentDate;
          })
          .sort((a, b) => {
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
        setLoadingDelete(false);
        handleShow();
      }
    });
  };

  const handleClickItem = (id) => {
    handleShow();
    setCurIdItem(id);
  };

  const handleShow = () => {
    setShowModal((prev) => !prev);
  };

  const handleClickDelete = () => {
    setLoadingDelete(true);
    handleDeleteItem(curIdItem);
  };

  if (loading) return <Loading full_screen={true} />;
  if (!closestTraining) return;

  return (
    <>
      {showModal && (
        <Modal
          handleClose={handleShow}
          text={"Вы точно хотите отменить тренировку?"}
        >
          <Button
            fullSize={true}
            size="l"
            label={!loadingDelete ? "Да" : "Загрузка"}
            variant="blue"
            onClick={handleClickDelete}
            disabledShadow={true}
          />
          <Button
            fullSize={true}
            size="l"
            label="Нет"
            variant="black"
            onClick={handleShow}
            disabledShadow={true}
          />
        </Modal>
      )}

      <section className={styles["profile-trainings"]}>
        <Container size="M">
          <div className={styles["profile-trainings__wrapper"]}>
            <div className={styles["profile-trainings__object"]}>
              <img src="/icons/icon.svg" />
            </div>
            <div
              className={styles["profile-trainings__btn"]}
              onClick={() => handleClickItem(closestTraining?.id)}
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
    </>
  );
};

export default ProfileTrainings;
