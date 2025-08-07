"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/Redux/reducer/userReducer";
import { updateProfileSchema } from "@/lib/validations/updateProfile";
import { AppDispatch } from "@/Redux/store";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  username: string;
}

type ProfileInfoProps = {
  user: UserProfile;
  isCurrentUser: boolean;
};

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

const ProfileInfo = ({ user, isCurrentUser }: ProfileInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        bio: user.bio,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UpdateProfileInput) => {
    dispatch(updateProfile(data));
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-white rounded-md shadow-lg overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-teal-400 relative">
        {/* Profile Image */}
        <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/user.png"
            alt="Profile"
            priority
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-12 px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-1 bg-gray-100 p-2"
        >
          <input
            type="text"
            disabled={!isEditing}
            {...register("name")}
            // className="text-xl font-semibold w-full border rounded px-2 py-1"
            className={`text-xl font-semibold w-full ${
              isEditing ? "border px-2 py-1 rounded" : "border-none p-0"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}

          <textarea
            disabled={!isEditing}
            placeholder="No bio"
            {...register("bio")}
            // className="text-sm text-gray-600 w-full border rounded px-2 py-1"
            className={`text-sm text-gray-600 w-full ${
              isEditing ? "border px-2 py-1 rounded" : "border-none p-0"
            }`}
          />
          {errors.bio && (
            <p className="text-xs text-red-500">{errors.bio.message}</p>
          )}

          {/* Submit Button (Save) */}
          {isCurrentUser && isEditing && (
            <div className="flex gap-2 flex-wrap">
              <button
                type="submit"
                className="px-4 py-1 text-sm border rounded-full font-medium hover:bg-gray-50"
              >
                Save
              </button>
            </div>
          )}
        </form>

        {/* Edit Button (Outside form to avoid triggering submit) */}
        {isCurrentUser && !isEditing && (
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-1 text-sm border rounded-full font-medium hover:bg-gray-50"
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <span>{user.email}</span>
          <span>•</span>
          <span>{user.username}</span>
        </div>

        <p className="text-sm text-blue-600 mt-2">223 connections</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
