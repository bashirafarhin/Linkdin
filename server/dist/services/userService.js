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
exports.validateUser = exports.comparePasswords = exports.hashPassword = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const AppError_1 = require("../utils/AppError");
const generateUsername = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const base = name.trim().toLowerCase().replace(/\s+/g, "");
    let username = base;
    let count = 1;
    while (yield userModel_1.default.findOne({ username })) {
        username = `${base}${count}`;
        count++;
    }
    return username;
});
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield userModel_1.default.findOne({ email });
    if (existingUser) {
        throw new AppError_1.AppError("User already exists", 400);
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const username = yield generateUsername(name);
    const newUser = yield userModel_1.default.create({
        name,
        email,
        username,
        password: hashedPassword,
    });
    return newUser;
});
exports.registerUser = registerUser;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
const comparePasswords = (password, hashed) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.compare(password, hashed);
});
exports.comparePasswords = comparePasswords;
const validateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new AppError_1.AppError("Invalid email or password", 400);
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new AppError_1.AppError("Invalid email or password", 400);
    }
    return user;
});
exports.validateUser = validateUser;
