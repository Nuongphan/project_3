const multer = require('multer')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const  cloudinary= require('cloudinary').v2;
require("dotenv").config();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  
  const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png"],
    params: {
      folder: "imageProducts",
    },
  });
  
const uploadCloud = multer({ storage});
  
module.exports = uploadCloud;
// module.exports = upload