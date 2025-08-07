"use client";

import PostCard from "../../../components/PostCard/PostCard";
import { fetchAllPosts } from "@/Redux/reducer/postReducer";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader";

export default function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: posts,
    loading,
    error,
  } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!posts)
    return <p className="mx-auto text-center text-gray-400">No posts yet</p>;

  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      {posts?.map((post) => (
        <PostCard
          key={post._id}
          name={post.author.name}
          bio={post.author.bio}
          username={post.author.username}
          content={post.content}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}
