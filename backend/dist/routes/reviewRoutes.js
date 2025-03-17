"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.get('/bikepark/:bikeParkId', reviewController_1.getReviewsByBikePark);
// Protected routes
router.post('/bikepark/:bikeParkId', authMiddleware_1.protect, reviewController_1.createReview);
router.put('/:reviewId', authMiddleware_1.protect, reviewController_1.updateReview);
router.delete('/:reviewId', authMiddleware_1.protect, reviewController_1.deleteReview);
exports.default = router;
