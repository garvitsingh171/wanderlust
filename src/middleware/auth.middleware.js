const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            const err = new Error('Unauthorized: No token provided');
            err.statusCode = 401;
            throw err;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        err.statusCode = 401;
        next(error);
    }
}

module.exports = { requireAuth };