const multer = require('multer');

function errorHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    if (err.message === 'Only image files are allowed!') {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
}

module.exports = { errorHandler };