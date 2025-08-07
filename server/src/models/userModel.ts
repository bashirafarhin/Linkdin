import mongoose, { Schema, InferSchemaType } from "mongoose";
import { Document } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    bio: {
      type: String,
      default: "",
      maxlength: [100, "Bio must not exceed 100 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

export default mongoose.model<UserDocument>("User", userSchema);
