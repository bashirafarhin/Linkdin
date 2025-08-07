import express from "express";
import { body, param } from "express-validator";
import {
  createPost,
  getAllPosts,
  getPostsByUsername,
} from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Post content cannot be empty")
      .isLength({ min: 1 })
      .withMessage("Post must contain at least 1 character"),
  ],
  createPost
);

router.get("/", getAllPosts);

router.get(
  "/username/:username",
  [param("username").isString().withMessage("Invalid username")],
  getPostsByUsername
);

export default router;
