"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store";
import { fetchPostsByUsername } from "@/Redux/reducer/postReducer";
import PostCard from "@/components/PostCard/PostCard";

interface Props {
  username: string;
}

const ProfilePosts = ({ username }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: posts,
    loading,
    error,
  } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (username) {
      dispatch(fetchPostsByUsername(username));
    }
  }, [dispatch, username]);

  if (loading) return <p className="text-gray-500">Loading posts...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!posts || posts.length === 0)
    return <p className="text-gray-400">No posts yet</p>;

  return (
    <div className="mt-10 space-y-4 flex flex-col items-center justify-center">
      {posts.map((post) => (
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
};

export default ProfilePosts;
