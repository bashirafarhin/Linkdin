import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPosts = createAsyncThunk("posts/fetchAll", async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/post`, {
    withCredentials: true,
  });
  return res.data.posts;
});

// 👤 Fetch posts by user ID
export const fetchPostsByUsername = createAsyncThunk(
  "posts/fetchByUsername",
  async (username: string) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/post/username/${username}`
    );
    return res.data;
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (content: string) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/post`,
      {
        content,
      },
      {
        withCredentials: true,
      }
    );
    return res.data.post;
  }
);
