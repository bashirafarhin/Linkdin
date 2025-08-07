"use client";

import React from "react";
import PostCardLayout from "./PostCardLayout";
import PostTime from "./PostTime";

type PostCardProps = {
  name: string;
  bio?: string;
  content: string;
  username: string;
  createdAt: string;
};

export default function PostCard(props: PostCardProps) {
  return (
    <PostCardLayout
      {...props}
      time={<PostTime createdAt={props.createdAt} />}
    />
  );
}
