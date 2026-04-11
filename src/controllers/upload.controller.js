const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Upload an image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin or Authenticated User - you choose)
const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error('No file uploaded');
        }

        const result = await uploadToCloudinary(req.file.path, 'products');

        if (!result) {
            res.status(500);
            throw new Error('Image upload to Cloudinary failed');
        }

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,
            originalName: req.file.originalname,
            size: req.file.size
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadImage
};
