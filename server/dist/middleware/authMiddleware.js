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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const blackListTokenModel_1 = __importDefault(require("../models/blackListTokenModel"));
const AppError_1 = require("../utils/AppError");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token) {
            return next(new AppError_1.AppError("No token provided. Not authorized.", 401));
        }
        const isBlacklisted = yield blackListTokenModel_1.default.findOne({ token });
        if (isBlacklisted) {
            return next(new AppError_1.AppError("Token has been revoked. Please log in again.", 401));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "defaultSecret");
        const user = yield userModel_1.default.findById(decoded.id).select("-password");
        if (!user) {
            return next(new AppError_1.AppError("User not found. Not authorized.", 401));
        }
        req.user = user;
        next();
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        next(new AppError_1.AppError(errorMessage, 500));
    }
});
exports.authMiddleware = authMiddleware;
