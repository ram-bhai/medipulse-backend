const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: "medipulse-media",
      resource_type: isVideo ? "video" : "image",
      format: isVideo ? "mp4" : "png",
      public_id: file.originalname.split(".")[0]
    };
  }
});

const upload = multer({ storage });

exports.uploadSingle = upload.single("profilePicture"); 
exports.uploadMultiple = upload.array("medicalRecords", 10);
