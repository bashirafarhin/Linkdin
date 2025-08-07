import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (val: string) => val.length > 0,
        message: "Content cannot be empty or just spaces",
      },
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
