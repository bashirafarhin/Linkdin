"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/lib/validations/auth";
import PasswordRules from "./PasswordRules";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/Redux/reducer/userReducer";
import type { AppDispatch, RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.user
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      router.push("/feed");
    }
  }, [data, router]);

  const onSubmit = async (formData: RegisterSchemaType) => {
    await dispatch(registerUser(formData));
  };

  const passwordValue = watch("password") || "";
  const passwordError = errors.password?.message;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col items-center w-full max-w-md mx-auto"
    >
      <div className="w-full">
        <input
          type="name"
          placeholder="Full Name"
          {...register("name")}
          className="w-full border border-gray-500 px-4 py-2 rounded-[20px]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

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
      </div>

      <div className="w-full">
        <button
          disabled={!!errors.password ? true : false}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-[20px] hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Agree & Join
        </button>
      </div>
      <PasswordRules value={passwordValue} zodError={passwordError} />
    </form>
  );
}
