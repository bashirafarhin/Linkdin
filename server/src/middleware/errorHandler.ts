import { Response } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (err: Error | AppError, res: Response) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
};
