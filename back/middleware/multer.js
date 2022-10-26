const multer = require("multer")

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(" ").join("_").split(".")[0];
      const extension = MIME_TYPES[file.mimetype];
      if(!extension) {
        return callback(new Error('Uniquement format photo autorisé'))
      }
      callback(null, name + Date.now() + "." + extension);
    }
  });

module.exports = multer({ storage: storage }).single("image");