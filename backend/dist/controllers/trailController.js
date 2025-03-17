"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrail = exports.updateTrail = exports.createTrail = exports.getTrailById = exports.getTrailsByBikePark = void 0;
const Trail_1 = __importDefault(require("../models/Trail"));
const BikePark_1 = __importDefault(require("../models/BikePark"));
// Get all trails for a bike park
const getTrailsByBikePark = async (req, res) => {
    try {
        const { bikeParkId } = req.params;
        const trails = await Trail_1.default.find({ bikeParkId })
            .sort({ difficulty: 1 });
        res.status(200).json(trails);
    }
    catch (error) {
        console.error('Error getting trails:', error);
        res.status(500).json({ message: 'Error getting trails', error });
    }
};
exports.getTrailsByBikePark = getTrailsByBikePark;
// Get a single trail by ID
const getTrailById = async (req, res) => {
    try {
        const { id } = req.params;
        const trail = await Trail_1.default.findById(id)
            .populate('bikeParkId', 'id name');
        if (!trail) {
            return res.status(404).json({ message: 'Trail not found' });
        }
        res.status(200).json(trail);
    }
    catch (error) {
        console.error('Error getting trail:', error);
        res.status(500).json({ message: 'Error getting trail', error });
    }
};
exports.getTrailById = getTrailById;
// Create a new trail
const createTrail = async (req, res) => {
    try {
        const { bikeParkId } = req.params;
        const trailData = { ...req.body, bikeParkId };
        // Verify bike park exists
        const bikePark = await BikePark_1.default.findById(bikeParkId);
        if (!bikePark) {
            return res.status(404).json({ message: 'Bike park not found' });
        }
        const newTrail = await Trail_1.default.create(trailData);
        res.status(201).json({
            message: 'Trail created successfully',
            trail: newTrail,
        });
    }
    catch (error) {
        console.error('Error creating trail:', error);
        res.status(500).json({ message: 'Error creating trail', error });
    }
};
exports.createTrail = createTrail;
// Update a trail
const updateTrail = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const trail = await Trail_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!trail) {
            return res.status(404).json({ message: 'Trail not found' });
        }
        res.status(200).json({
            message: 'Trail updated successfully',
            trail,
        });
    }
    catch (error) {
        console.error('Error updating trail:', error);
        res.status(500).json({ message: 'Error updating trail', error });
    }
};
exports.updateTrail = updateTrail;
// Delete a trail
const deleteTrail = async (req, res) => {
    try {
        const { id } = req.params;
        const trail = await Trail_1.default.findById(id);
        if (!trail) {
            return res.status(404).json({ message: 'Trail not found' });
        }
        await Trail_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Trail deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting trail:', error);
        res.status(500).json({ message: 'Error deleting trail', error });
    }
};
exports.deleteTrail = deleteTrail;
