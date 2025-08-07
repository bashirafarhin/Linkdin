"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsByUsername = exports.getAllPosts = exports.createPost = void 0;
const express_validator_1 = require("express-validator");
const postModel_1 = require("../models/postModel");
const userModel_1 = __importDefault(require("../models/userModel"));
const AppError_1 = require("../utils/AppError");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        const { content } = req.body;
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const author = req.user._id;
        const newPost = new postModel_1.Post({ content, author });
        yield newPost.save();
        res.status(201).json({ message: "Post created", post: newPost });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        next(new AppError_1.AppError(errorMessage, 500));
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.Post.find().populate("author", "name bio username");
        res.status(200).json({ posts });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        next(new AppError_1.AppError(errorMessage, 500));
    }
});
exports.getAllPosts = getAllPosts;
const getPostsByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const user = yield userModel_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const posts = yield postModel_1.Post.find({ author: user._id }).populate("author", "name bio username");
        res.status(200).json(posts);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        next(new AppError_1.AppError(errorMessage, 500));
    }
});
exports.getPostsByUsername = getPostsByUsername;
