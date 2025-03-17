"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCheckIns = exports.deleteCheckIn = exports.createCheckIn = exports.getCheckInsByBikePark = void 0;
const CheckIn_1 = __importDefault(require("../models/CheckIn"));
const BikePark_1 = __importDefault(require("../models/BikePark"));
// Get recent check-ins for a bike park
const getCheckInsByBikePark = async (req, res) => {
    try {
        const { bikeParkId } = req.params;
        const checkIns = await CheckIn_1.default.find({ bikeParkId })
            .populate('userId', 'id username profileImageUrl')
            .sort({ createdAt: -1 })
            .limit(20);
        res.status(200).json(checkIns);
    }
    catch (error) {
        console.error('Error getting check-ins:', error);
        res.status(500).json({ message: 'Error getting check-ins', error });
    }
};
exports.getCheckInsByBikePark = getCheckInsByBikePark;
// Create a new check-in
const createCheckIn = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { bikeParkId } = req.params;
        const { note, weatherCondition, trailCondition } = req.body;
        // Make sure bike park exists
        const bikePark = await BikePark_1.default.findById(bikeParkId);
        if (!bikePark) {
            return res.status(404).json({ message: 'Bike park not found' });
        }
        const newCheckIn = await CheckIn_1.default.create({
            userId,
            bikeParkId,
            note,
            weatherCondition,
            trailCondition,
        });
        const checkInWithUserAndPark = await CheckIn_1.default.findById(newCheckIn._id)
            .populate('userId', 'id username profileImageUrl')
            .populate('bikeParkId', 'id name');
        res.status(201).json({
            message: 'Check-in created successfully',
            checkIn: checkInWithUserAndPark,
        });
    }
    catch (error) {
        console.error('Error creating check-in:', error);
        res.status(500).json({ message: 'Error creating check-in', error });
    }
};
exports.createCheckIn = createCheckIn;
// Delete a check-in
const deleteCheckIn = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { checkInId } = req.params;
        const checkIn = await CheckIn_1.default.findById(checkInId);
        if (!checkIn) {
            return res.status(404).json({ message: 'Check-in not found' });
        }
        // Check if user owns the check-in
        if (checkIn.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own check-ins' });
        }
        await CheckIn_1.default.findByIdAndDelete(checkInId);
        res.status(200).json({
            message: 'Check-in deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting check-in:', error);
        res.status(500).json({ message: 'Error deleting check-in', error });
    }
};
exports.deleteCheckIn = deleteCheckIn;
// Get user's check-in history
const getUserCheckIns = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const checkIns = await CheckIn_1.default.find({ userId })
            .populate('bikeParkId', 'id name imageUrl')
            .sort({ createdAt: -1 });
        res.status(200).json(checkIns);
    }
    catch (error) {
        console.error('Error getting user check-ins:', error);
        res.status(500).json({ message: 'Error getting user check-ins', error });
    }
};
exports.getUserCheckIns = getUserCheckIns;
