const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APP_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
});

/**
 * Upload an image to Cloudinary
 * @param {string} localFilePath Path to the file on local disk
 * @param {string} folder Folder in Cloudinary
 * @returns {Promise<object>} Cloudinary upload response
 */
const uploadToCloudinary = async (localFilePath, folder = 'products') => {
    try {
        if (!localFilePath) return null;

        // Upload the file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: folder
        });

        // File has been uploaded successfully, remove from local storage
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        // Remove the local file if upload failed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error('Cloudinary Upload Error:', error);
        return null;
    }
};

module.exports = {
    uploadToCloudinary
};
