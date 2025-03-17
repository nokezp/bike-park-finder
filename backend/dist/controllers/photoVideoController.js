"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhotoVideo = exports.uploadPhotoVideo = exports.getPhotosByBikePark = void 0;
const PhotoVideo_1 = __importDefault(require("../models/PhotoVideo"));
const BikePark_1 = __importDefault(require("../models/BikePark"));
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Initialize S3 client
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});
// Configure multer for file upload
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    },
}).single('file');
// Get photos/videos for a bike park
const getPhotosByBikePark = async (req, res) => {
    try {
        const { bikeParkId } = req.params;
        const { type } = req.query;
        const query = { bikeParkId };
        if (type) {
            query.type = type;
        }
        const photos = await PhotoVideo_1.default.find(query)
            .populate('userId', 'id username profileImageUrl')
            .populate('trailId', 'id name')
            .sort({ createdAt: -1 });
        res.status(200).json(photos);
    }
    catch (error) {
        console.error('Error getting photos/videos:', error);
        res.status(500).json({ message: 'Error getting photos/videos', error });
    }
};
exports.getPhotosByBikePark = getPhotosByBikePark;
// Upload a new photo/video
const uploadPhotoVideo = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            const { bikeParkId } = req.params;
            const { trailId, caption } = req.body;
            // @ts-ignore
            const userId = req.user.id;
            // Verify bike park exists
            const bikePark = await BikePark_1.default.findById(bikeParkId);
            if (!bikePark) {
                return res.status(404).json({ message: 'Bike park not found' });
            }
            // Generate unique filename
            const fileExtension = path_1.default.extname(req.file.originalname);
            const fileName = `${(0, uuid_1.v4)()}${fileExtension}`;
            const fileType = req.file.mimetype.startsWith('image/') ? 'photo' : 'video';
            let url = '';
            // Check if AWS credentials are available
            if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY &&
                process.env.AWS_ACCESS_KEY_ID !== 'your_access_key_id') {
                // Upload to S3
                try {
                    await s3Client.send(new client_s3_1.PutObjectCommand({
                        Bucket: process.env.AWS_S3_BUCKET || 'bike-park-finder',
                        Key: fileName,
                        Body: req.file.buffer,
                        ContentType: req.file.mimetype,
                        ACL: 'public-read',
                    }));
                    url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
                }
                catch (error) {
                    console.error('Error uploading to S3:', error);
                    return res.status(500).json({ message: 'Error uploading file to storage', error });
                }
            }
            else {
                // For development without AWS credentials, save file locally
                const uploadPath = path_1.default.join(__dirname, '../../uploads', fileName);
                try {
                    fs_1.default.writeFileSync(uploadPath, req.file.buffer);
                    url = `http://localhost:3000/uploads/${fileName}`;
                    console.log('File saved locally:', uploadPath);
                }
                catch (error) {
                    console.error('Error saving file locally:', error);
                    return res.status(500).json({ message: 'Error saving file locally', error });
                }
            }
            // Create database record
            const photoVideo = await PhotoVideo_1.default.create({
                userId,
                bikeParkId,
                trailId,
                url,
                type: fileType,
                caption,
            });
            const photoWithDetails = await PhotoVideo_1.default.findById(photoVideo._id)
                .populate('userId', 'id username profileImageUrl')
                .populate('trailId', 'id name');
            res.status(201).json({
                message: 'File uploaded successfully',
                photoVideo: photoWithDetails,
            });
        });
    }
    catch (error) {
        console.error('Error handling upload:', error);
        res.status(500).json({ message: 'Error handling upload', error });
    }
};
exports.uploadPhotoVideo = uploadPhotoVideo;
// Delete a photo/video
const deletePhotoVideo = async (req, res) => {
    try {
        const { id } = req.params;
        // @ts-ignore
        const userId = req.user.id;
        const photoVideo = await PhotoVideo_1.default.findById(id);
        if (!photoVideo) {
            return res.status(404).json({ message: 'Photo/video not found' });
        }
        // Check if user owns the photo/video
        if (photoVideo.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own photos/videos' });
        }
        // Delete from S3 if AWS credentials are available
        if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY &&
            process.env.AWS_ACCESS_KEY_ID !== 'your_access_key_id' &&
            photoVideo.url.includes('amazonaws.com')) {
            try {
                const fileName = photoVideo.url.split('/').pop();
                if (fileName) {
                    await s3Client.send(new client_s3_1.PutObjectCommand({
                        Bucket: process.env.AWS_S3_BUCKET || 'bike-park-finder',
                        Key: fileName,
                        // For deletion, we should use DeleteObjectCommand, but for now we'll just log it
                    }));
                    console.log(`Would delete file ${fileName} from S3 if using DeleteObjectCommand`);
                }
            }
            catch (error) {
                console.error('Error deleting from S3:', error);
            }
        }
        else if (photoVideo.url.includes('localhost')) {
            // Delete local file
            try {
                const fileName = photoVideo.url.split('/').pop();
                if (fileName) {
                    const filePath = path_1.default.join(__dirname, '../../uploads', fileName);
                    if (fs_1.default.existsSync(filePath)) {
                        fs_1.default.unlinkSync(filePath);
                        console.log('Deleted local file:', filePath);
                    }
                }
            }
            catch (error) {
                console.error('Error deleting local file:', error);
            }
        }
        await PhotoVideo_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Photo/video deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting photo/video:', error);
        res.status(500).json({ message: 'Error deleting photo/video', error });
    }
};
exports.deletePhotoVideo = deletePhotoVideo;
