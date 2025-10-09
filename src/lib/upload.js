const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/temp'); // folder sementara
  },
  filename: (req, file, cb) => {
    // Gunakan nama asli file
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;