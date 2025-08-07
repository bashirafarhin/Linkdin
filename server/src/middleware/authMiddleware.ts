import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import BlacklistToken from "../models/blackListTokenModel";
import { AppError } from "../utils/AppError";

interface JwtPayload {
  id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return next(new AppError("No token provided. Not authorized.", 401));
    }
    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
      return next(
        new AppError("Token has been revoked. Please log in again.", 401)
      );
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret"
    ) as JwtPayload;
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new AppError("User not found. Not authorized.", 401));
    }
    req.user = user;
    next();
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    next(new AppError(errorMessage, 500));
  }
};
