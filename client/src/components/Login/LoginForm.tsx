"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/lib/validations/auth";
import type { AppDispatch, RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/Redux/reducer/userReducer";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loader from "../ui/Loader";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      router.push("/feed");
    }
  }, [data, router]);

  const onSubmit = async (formData: LoginSchemaType) => {
    await dispatch(loginUser(formData));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col items-center w-full max-w-md mx-auto"
    >
      <div className="w-full">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border border-gray-500 px-4 py-2 rounded-[20px]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full">
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border border-gray-500 px-4 py-2 rounded-[20px]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-[20px] hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </form>
  );
}
