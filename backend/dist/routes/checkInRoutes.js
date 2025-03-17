"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkInController_1 = require("../controllers/checkInController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.get('/bikepark/:bikeParkId', checkInController_1.getCheckInsByBikePark);
// Protected routes
router.post('/bikepark/:bikeParkId', authMiddleware_1.protect, checkInController_1.createCheckIn);
router.delete('/:checkInId', authMiddleware_1.protect, checkInController_1.deleteCheckIn);
router.get('/user', authMiddleware_1.protect, checkInController_1.getUserCheckIns);
exports.default = router;
