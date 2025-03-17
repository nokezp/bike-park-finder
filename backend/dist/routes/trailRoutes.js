"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trailController_1 = require("../controllers/trailController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.get('/bikepark/:bikeParkId', trailController_1.getTrailsByBikePark);
router.get('/:id', trailController_1.getTrailById);
// Protected routes (admin only in a real app)
router.post('/bikepark/:bikeParkId', authMiddleware_1.protect, trailController_1.createTrail);
router.put('/:id', authMiddleware_1.protect, trailController_1.updateTrail);
router.delete('/:id', authMiddleware_1.protect, trailController_1.deleteTrail);
exports.default = router;
