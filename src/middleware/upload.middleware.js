const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(process.cwd(), 'uploads/listing-images');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '-');
        cb(null, `${Date.now()}-${safeName}`);
    }
})

const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);

    }
}

const uploadListingImages = multer({
    storage: storage,
    limits: {
        files: 5,
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: fileFilter,
});

module.exports = { uploadListingImages };