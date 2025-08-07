"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store";
import { addPost } from "@/Redux/reducer/postReducer";
import Image from "next/image";

type CreatePostProps = {
  onPostSuccess: () => void;
};

const postSchema = z.object({
  post: z
    .string()
    .min(1, "Post cannot be empty")
    .max(200, "Max 200 characters"),
});

type PostInput = z.infer<typeof postSchema>;

export default function CreatePost({ onPostSuccess }: CreatePostProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
  });

  const { data: user } = useSelector((state: RootState) => state.user);

  const onSubmit = async (data: PostInput) => {
    await dispatch(addPost(data.post));
    onPostSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center space-x-3">
        <Image
          width={10}
          height={10}
          priority
          src="/user.png"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="font-semibold text-sm">{user?.name || "Guest"}</div>
      </div>

      <textarea
        {...register("post")}
        placeholder="What's on your mind?"
        className="w-full border border-gray-300 rounded-lg p-3 outline-none resize-none"
        rows={4}
      />
      {errors.post && (
        <p className="text-red-500 text-sm">{errors.post.message}</p>
      )}

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold transition ${
          !isValid ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        Post
      </button>
    </form>
  );
}
