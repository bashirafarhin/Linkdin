import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as userService from "../services/userService";
import { AppError } from "../utils/AppError";
import blackListTokenModel from "../models/blackListTokenModel";
import { generateAccessToken, sendAccessToken } from "../utils/generateTokens";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError("Validation failed", 400);
    }
    const { name, email, password } = req.body;
    const user = await userService.registerUser(name, email, password);
    const accessToken = generateAccessToken(user._id.toString());
    sendAccessToken(res, accessToken);
    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError("Validation failed", 400);
    }
    const { email, password } = req.body;
    const user = await userService.validateUser(email, password);
    const accessToken = generateAccessToken(user._id.toString());
    sendAccessToken(res, accessToken);
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.accessToken;
    if (token) {
      await blackListTokenModel.create({ token });
    }
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
