"use client";

import { logoutUser } from "@/Redux/reducer/userReducer";
import { AppDispatch, RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HeaderActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    data: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.user);

  const handleClick = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <span className="text-sm text-gray-800 hover:text-blue-600 cursor-pointer">
            Join Premium
          </span>
          <button
            onClick={handleClick}
            disabled={loading}
            className="border border-red-600 text-red-600 px-4 py-1.5 text-sm rounded-full hover:bg-red-50 transition disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
          {error && <span className="text-sm text-red-600">{error}</span>}
        </>
      ) : (
        <>
          <span className="text-sm text-gray-800 hover:text-blue-600 cursor-pointer">
            Join now
          </span>
          <button className="border border-blue-600 text-blue-600 px-4 py-1.5 text-sm rounded-full hover:bg-blue-50 transition">
            Sign in
          </button>
        </>
      )}
    </div>
  );
};

export default HeaderActions;
