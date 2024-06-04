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
        if (!localFilePath) {
            console.log("File path not available");
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });

        if (response && response.url) {
            console.log("File is uploaded on Cloudinary", response.url);
            fs.unlinkSync(localFilePath); // Delete the local file after upload
            return response;
        } else {
            console.log("No URL returned from Cloudinary", response);
            fs.unlinkSync(localFilePath); // Delete the local file in case of error
            return null;
        }
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath); // Delete the local file in case of error
        throw error;
    }
};

module.exports = { uploadOnCloudinary };