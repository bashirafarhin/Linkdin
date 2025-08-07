"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  username: string;
}

export const loginUser = createAsyncThunk<
  UserProfile,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/auth/login`,
      credentials,
      { withCredentials: true }
    );
    return res.data.user;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

export const registerUser = createAsyncThunk<
  UserProfile,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async (userData, thunkAPI) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/auth/register`,
      userData,
      { withCredentials: true }
    );
    return res.data.user;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Register failed"
    );
  }
});

export const logoutUser = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    return true;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
});

export const fetchProfileByUsername = createAsyncThunk<
  UserProfile,
  string, // username is passed as a string
  { rejectValue: string }
>("user/fetchProfileByUsername", async (username, thunkAPI) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/user/profile/${username}`,
      { withCredentials: true }
    );
    return res.data.user; // Adjust this if the API response structure is different
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch profile"
    );
  }
});

export const updateProfile = createAsyncThunk<
  UserProfile,
  Partial<UserProfile>,
  { rejectValue: string }
>("user/updateProfile", async (updatedData, thunkAPI) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/api/user/profile`,
      updatedData,
      { withCredentials: true }
    );
    return res.data.user;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update profile"
    );
  }
});
