"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, [
    (0, express_validator_1.body)("content")
        .trim()
        .notEmpty()
        .withMessage("Post content cannot be empty")
        .isLength({ min: 1 })
        .withMessage("Post must contain at least 1 character"),
], postController_1.createPost);
router.get("/", postController_1.getAllPosts);
router.get("/username/:username", [(0, express_validator_1.param)("username").isString().withMessage("Invalid username")], postController_1.getPostsByUsername);
exports.default = router;
