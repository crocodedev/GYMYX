"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/Components/Loading";
import Container from "@/Components/Container";
import TrainersSlider from "@/Sections/Account/Trainers/TrainersSlider";

// export const getTrainingData = async (token) => {
//   const result = await fetch("/api/booking/get-bookings", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ token }),
//   });

//   const response = await result.json();
//   if (!response.error) {
//     return response;
//   }
// };

const Training = () => {
  return (
    <section className="trainers-page-wrapper">
      <Container>
        <TrainersSlider />
      </Container>
    </section>
  );
};

export default Training;
