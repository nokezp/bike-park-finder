"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const photoVideoController_1 = require("../controllers/photoVideoController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.get('/bikepark/:bikeParkId', photoVideoController_1.getPhotosByBikePark);
// Protected routes
router.post('/bikepark/:bikeParkId/upload', authMiddleware_1.protect, photoVideoController_1.uploadPhotoVideo);
router.delete('/:id', authMiddleware_1.protect, photoVideoController_1.deletePhotoVideo);
exports.default = router;
