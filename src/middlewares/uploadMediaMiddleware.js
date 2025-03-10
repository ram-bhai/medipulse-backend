const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// ✅ Cloudinary Storage Configuration
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

// Export Middleware for Single & Multiple Uploads
exports.uploadSingle = upload.single("profilePicture"); // Expects `profilePicture`
exports.uploadMultiple = upload.array("medicalRecords", 10); // Expects `medicalRecords`
