import { useSession } from "next-auth/react";
import Loading from "@/Components/Loading";
import Container from "@/Components/Container";
import TrainersSlider from "@/Sections/Account/Trainers/TrainersSlider";

export const getTrainersData = async () => {
  const res = await fetch("https://gymyx.cro.codes/api/pages/trainers");

  const response = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return response;
};

const Trainings = async () => {
  return (
    <section className="trainers-page-wrapper">
      <Container>
        <TrainersSlider />
      </Container>
    </section>
  );
};

export default Trainings;
