require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return console.log("File path not available");
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        console.log("File is uploaded on Cloudinary", response.url);
        fs.unlinkSync(localFilePath); // Delete the local file after upload
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the local file in case of error
        throw error;
    }
};

module.exports = { uploadOnCloudinary };