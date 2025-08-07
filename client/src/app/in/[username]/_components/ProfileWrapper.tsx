"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useEffect, useState } from "react";
import ProfileContent from "./ProfileContent";
import axios from "axios";

export default function ProfileWrapper() {
  const router = useRouter();
  const { username: currentProfileUsername } = useParams() as {
    username: string;
  };
  const { data: loggedInuser } = useSelector((state: RootState) => state.user);
  const [profile, setProfile] = useState(loggedInuser);

  useEffect(() => {
    if (!currentProfileUsername) {
      router.push("/");
    }
  }, [currentProfileUsername]);

  const isCurrentUser = loggedInuser?.username === currentProfileUsername;

  useEffect(() => {
    if (!currentProfileUsername) return;
    const fetchOthersProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/user/profile/${currentProfileUsername}`,
          {
            withCredentials: true,
          }
        );
        setProfile(res.data.user);
      } catch (err: unknown) {
        const error = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };

        console.error(
          "Failed to fetch user profile:",
          error?.response?.data?.message || error?.message || "Unknown error"
        );
      }
    };

    if (!isCurrentUser) {
      fetchOthersProfile();
    } else {
      setProfile(loggedInuser);
    }
  }, [currentProfileUsername, loggedInuser]);

  return profile ? (
    <ProfileContent
      profile={profile}
      isCurrentUser={isCurrentUser}
      currentProfileUsername={currentProfileUsername}
    />
  ) : null;
}
