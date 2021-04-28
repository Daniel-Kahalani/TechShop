import cloudinary from "cloudinary";
if (process.env.NODE_ENV !== "production") {
    const dotenv = await import('dotenv');
    dotenv.config();
}

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export default (cloudinary)