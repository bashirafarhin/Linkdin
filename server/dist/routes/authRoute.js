"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.check)("name", "Name is required").isLength({ min: 2 }),
    (0, express_validator_1.check)("email", "Valid email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password must be at least 6 characters").isLength({
        min: 6,
    }),
    (0, express_validator_1.check)("password", "Must include at least one uppercase letter").matches(/[A-Z]/),
    (0, express_validator_1.check)("password", "Must include at least one lowercase letter").matches(/[a-z]/),
    (0, express_validator_1.check)("password", "Must include at least one number").matches(/[0-9]/),
    (0, express_validator_1.check)("password", "Must include at least one special character").matches(/[!@#$%^&*(),.?":{}|<>]/),
], authController_1.register);
router.post("/login", [
    (0, express_validator_1.check)("email", "Valid email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").notEmpty(),
], authController_1.login);
router.post("/logout", authController_1.logout);
exports.default = router;
