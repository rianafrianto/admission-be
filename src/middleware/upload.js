const multer = require("multer");

// Set up Multer storage to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
