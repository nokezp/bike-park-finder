"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.get('/bikepark/:bikeParkId', eventController_1.getEventsByBikePark);
router.get('/:id', eventController_1.getEventById);
// Protected routes (admin only in a real app)
router.post('/bikepark/:bikeParkId', authMiddleware_1.protect, eventController_1.createEvent);
router.put('/:id', authMiddleware_1.protect, eventController_1.updateEvent);
router.delete('/:id', authMiddleware_1.protect, eventController_1.deleteEvent);
exports.default = router;
