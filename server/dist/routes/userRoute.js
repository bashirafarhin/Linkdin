"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/profile", authMiddleware_1.authMiddleware, userController_1.getLoggedInUserProfile);
router.get("/profile/:username", authMiddleware_1.authMiddleware, [(0, express_validator_1.param)("username").trim().notEmpty().withMessage("Username is required")], userController_1.getUserProfileByUsername);
router.patch("/profile", [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),
    (0, express_validator_1.body)("bio")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Bio must be at most 100 characters"),
], authMiddleware_1.authMiddleware, userController_1.updateUserProfile);
exports.default = router;
