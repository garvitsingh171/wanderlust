const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            const error = new Error('Unauthorized: No token provided');
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
}

module.exports = { requireAuth };