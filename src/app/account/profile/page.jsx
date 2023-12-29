"use client";

import ProfilePersonalData from "@/Sections/Account/ProfilePersonalData";
import ProfileHeading from "@/Sections/Account/ProfileHeading";
import ProfileTrainings from "@/Sections/Account/ProfileTrainings";
import ProfileStats from "@/Sections/Account/ProfileStats";
import ProfileContactOptions from "@/Sections/Account/ProfileContactOptions";
import ProfileContacts from "@/Sections/Account/ProfileContacts";
import ProfileMailing from "@/Sections/Account/ProfileMailing";
import ProfileTextField from "@/Sections/Account/ProfileTextField";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

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

const Profile = () => {
  const isFirstUpdate = useRef(true);
  const { data: sessionData, update } = useSession();
  useEffect(() => {
    if (sessionData && isFirstUpdate.current) {
      isFirstUpdate.current = false;
      getUserData(sessionData?.user?.accessToken).then((data) => {
        if (data) {
          update(data);
        }
      });
    }
  }, [sessionData]);

  return (
    <div className="account-page-wrapper">
      <ProfileHeading />
      <ProfilePersonalData />
      <ProfileTrainings />
      <ProfileStats />
      <ProfileContactOptions>
        <ProfileMailing />
        <ProfileContacts />
      </ProfileContactOptions>
      <ProfileTextField />
    </div>
  );
};

export default Profile;
