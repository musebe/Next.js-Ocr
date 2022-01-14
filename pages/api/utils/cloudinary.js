require('dotenv').config();
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: PRIVATE,
    api_key: process.env.PRIVATE,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
});

module.exports = { cloudinary };