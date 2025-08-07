import { Router } from "express";
import {
  getUserProfileByUsername,
  getLoggedInUserProfile,
  updateUserProfile,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { param, body } from "express-validator";

const router = Router();

router.get("/profile", authMiddleware, getLoggedInUserProfile);

router.get(
  "/profile/:username",
  authMiddleware,
  [param("username").trim().notEmpty().withMessage("Username is required")],
  getUserProfileByUsername
);

router.patch(
  "/profile",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("bio")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Bio must be at most 100 characters"),
  ],
  authMiddleware,
  updateUserProfile
);

export default router;
