"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.logout = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const userService = __importStar(require("../services/userService"));
const AppError_1 = require("../utils/AppError");
const blackListTokenModel_1 = __importDefault(require("../models/blackListTokenModel"));
const generateTokens_1 = require("../utils/generateTokens");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new AppError_1.AppError("Validation failed", 400);
        }
        const { name, email, password } = req.body;
        const user = yield userService.registerUser(name, email, password);
        const accessToken = (0, generateTokens_1.generateAccessToken)(user._id.toString());
        (0, generateTokens_1.sendAccessToken)(res, accessToken);
        return res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                username: user.username,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new AppError_1.AppError("Validation failed", 400);
        }
        const { email, password } = req.body;
        const user = yield userService.validateUser(email, password);
        const accessToken = (0, generateTokens_1.generateAccessToken)(user._id.toString());
        (0, generateTokens_1.sendAccessToken)(res, accessToken);
        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                username: user.username,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (token) {
            yield blackListTokenModel_1.default.create({ token });
        }
        res.clearCookie("accessToken");
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        next(err);
    }
});
exports.logout = logout;
