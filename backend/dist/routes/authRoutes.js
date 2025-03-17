"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
// Protected routes
router.get('/profile', authMiddleware_1.protect, authController_1.getProfile);
router.put('/profile', authMiddleware_1.protect, authController_1.updateProfile);
exports.default = router;
