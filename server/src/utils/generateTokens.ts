import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "defaultSecret", {
    expiresIn: "30m",
  });
};

export const sendAccessToken = (res: Response, token: string) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
};
