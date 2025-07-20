import fs from 'fs';
import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

config({ path: './.env' })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "hospitalManagement"
        })

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;

    } catch (error) {

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId)
        return response;

    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return null;
    }
};

const getPublicIdfromUrl = (url) => {
    const matches = url.match(/\/v\d+\/(.+?)\.(jpg|jpeg|png|gif|webp|svg)/i);

    return matches ? matches[1] : null
};

export { uploadOnCloudinary, deleteFromCloudinary, getPublicIdfromUrl };