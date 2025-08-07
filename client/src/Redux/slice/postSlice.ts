import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllPosts,
  fetchPostsByUsername,
  addPost,
} from "../reducer/postReducer";

export interface Post {
  _id: string;
  author: {
    name: string;
    bio?: string;
    username: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface PostState {
  data: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  data: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(fetchPostsByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostsByUsername.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchPostsByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user's posts";
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.data.unshift(action.payload); // add new post at top
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add post";
      });
  },
});

export default postSlice.reducer;
