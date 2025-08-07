import { Router } from "express";
import { login, register, logout } from "../controllers/authController";
import { check } from "express-validator";

const router = Router();

router.post(
  "/register",
  [
    check("name", "Name is required").isLength({ min: 2 }),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("password", "Must include at least one uppercase letter").matches(
      /[A-Z]/
    ),
    check("password", "Must include at least one lowercase letter").matches(
      /[a-z]/
    ),
    check("password", "Must include at least one number").matches(/[0-9]/),
    check("password", "Must include at least one special character").matches(
      /[!@#$%^&*(),.?":{}|<>]/
    ),
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  login
);

router.post("/logout", logout);
export default router;
