import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { AppError } from "../utils/AppError";

const generateUsername = async (name: string): Promise<string> => {
  const base = name.trim().toLowerCase().replace(/\s+/g, "");
  let username = base;
  let count = 1;
  while (await User.findOne({ username })) {
    username = `${base}${count}`;
    count++;
  }
  return username;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const username = await generateUsername(name);
  const newUser = await User.create({
    name,
    email,
    username,
    password: hashedPassword,
  });
  return newUser;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};

export const validateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 400);
  }
  return user;
};
