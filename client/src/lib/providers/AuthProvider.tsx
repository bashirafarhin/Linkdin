"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store";
import { userActions } from "@/Redux/slice/userSlice";
import Loader from "@/components/ui/Loader";
import axios from "axios";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!user) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/user/profile`,
            { withCredentials: true }
          );
          dispatch(userActions.setUser(res.data.user));
        }
      } catch (error) {
        router.replace("/");
        return;
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, [user, dispatch, router]);

  if (loading) return <Loader />;

  return <>{children}</>;
};

export default AuthProvider;
