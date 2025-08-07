import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { Post } from "../models/postModel";
import User from "../models/userModel";
import { AppError } from "../utils/AppError";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { content } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const author = req.user._id;
    const newPost = new Post({ content, author });
    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    next(new AppError(errorMessage, 500));
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find().populate("author", "name bio username");
    // Shuffle posts using Fisher–Yates algorithm
    for (let i = posts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [posts[i], posts[j]] = [posts[j], posts[i]];
    }
    res.status(200).json({ posts });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    next(new AppError(errorMessage, 500));
  }
};

export const getPostsByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await Post.find({ author: user._id }).populate(
      "author",
      "name bio username"
    );
    res.status(200).json(posts);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    next(new AppError(errorMessage, 500));
  }
};
