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
exports.updateUserProfile = exports.getLoggedInUserProfile = exports.getUserProfileByUsername = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const AppError_1 = require("../utils/AppError");
const express_validator_1 = require("express-validator");
const getUserProfileByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const user = yield userModel_1.default.findOne({ username }).select("_id name email username bio");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserProfileByUsername = getUserProfileByUsername;
const getLoggedInUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ user: req.user });
});
exports.getLoggedInUserProfile = getLoggedInUserProfile;
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const userId = req.user._id;
        const { name, bio } = req.body;
        const user = yield userModel_1.default.findByIdAndUpdate(userId, { name, bio }, { new: true, runValidators: true }).select("name email bio");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Profile updated", user });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        next(new AppError_1.AppError(errorMessage, 500));
    }
});
exports.updateUserProfile = updateUserProfile;
