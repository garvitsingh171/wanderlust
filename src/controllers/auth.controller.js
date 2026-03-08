const { registerSchema } = require('../validations/auth.validation');
const { registerUser } = require('../services/auth.service');
const { apiResponse } = require('../utils/apiResponse');
const { loginSchema } = require('../validations/auth.validation');
const { loginUser, getUserById } = require('../services/auth.service');
const { generateToken, setAuthCookie, clearAuthCookie } = require('../utils/token');

async function register(req, res, next) {
    try {
        const { error, value } = registerSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const validationError = new Error(
                error.details.map((d) => d.message).join(', ')
            );
            validationError.statusCode = 400;
            throw validationError;
        }

        const user = await registerUser(value);

        return res.status(201).json(apiResponse({
            success: true,
            message: 'User registered successfully',
            data: user,
        }));
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { error, value } = loginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const validationError = new Error(
                error.details.map((d) => d.message).join(', ')
            );
            validationError.statusCode = 400;
            throw validationError;
        }

        const user = await loginUser(value);
        const token = generateToken({
            userId: user._id,
            email: user.email,
        });

        setAuthCookie(res, token);

        return res.status(200).json(apiResponse({
            success: true,
            message: 'Login successful',
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        }));
    } catch (err) {
        next(err);
    }
}

async function me(req, res, next) {
    try {
        const user = await getUserById(req.user.userId);
        return res.status(200).json(apiResponse({
            success: true,
            message: 'Current user fetched',
            data: user,
        }));
    } catch (err) {
        next(err);
    }
}

async function logout(req, res, next) {
    try {
        clearAuthCookie(res);
        return res.status(200).json(apiResponse({
            success: true,
            message: 'Logged out successfully',
        }));
    } catch (err) {
        next(err);
    }
}

module.exports = { register, login, me, logout };