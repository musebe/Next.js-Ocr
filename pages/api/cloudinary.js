var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  let uploaded_url = '';
  const fileStr = req.body.data;

  if (req.method === 'POST') {
    try {
      const uploadedResponse = await cloudinary.uploader.upload_large(fileStr, {
        chunk_size: 6000000,
      });
      uploaded_url = uploadedResponse.secure_url;
    } catch (error) {
      console.log(error);
    }
    res.status(200).json({ data: uploaded_url });
    console.log('complete!');
  }
}
