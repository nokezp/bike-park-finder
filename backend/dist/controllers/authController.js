"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Register a new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // Set admin status for specific email (for testing purposes)
        const isAdmin = email === 'admin@example.com';
        // Create new user
        const user = await User_1.default.create({
            username,
            email,
            password,
            isAdmin
        });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'bWlfc2VjcmV0X2tleV9leGFtcGxlXzEyMzQ1Njc4OTAhQkM=', { expiresIn: '30d' });
        // Return user data without password
        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
        };
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: userData,
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};
exports.register = register;
// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'bWlfc2VjcmV0X2tleV9leGFtcGxlXzEyMzQ1Njc4OTAhQkM=', { expiresIn: '30d' });
        // Return user data without password
        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
        };
        res.status(200).json({
            message: 'Login successful',
            token,
            user: userData,
        });
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};
exports.login = login;
// Get current user profile
const getProfile = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const user = await User_1.default.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};
exports.getProfile = getProfile;
// Update user profile
const updateProfile = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { username, email, bio, profileImageUrl } = req.body;
        const user = await User_1.default.findByIdAndUpdate(userId, { username, email, bio, profileImageUrl }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'Profile updated successfully',
            user,
        });
    }
    catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', error });
    }
};
exports.updateProfile = updateProfile;
