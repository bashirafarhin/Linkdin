import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { AppError } from "../utils/AppError";
import { validationResult } from "express-validator";

export const getUserProfileByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select(
      "_id name email username bio"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const getLoggedInUserProfile = async (req: Request, res: Response) => {
  return res.status(200).json({ user: req.user });
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const userId = req.user._id;
    const { name, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio },
      { new: true, runValidators: true }
    ).select("name email bio");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    next(new AppError(errorMessage, 500));
  }
};
