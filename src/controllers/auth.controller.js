const { registerSchema } = require('../validations/auth.validation');
const { registerUser } = require('../services/auth.service');
const { apiResponse } = require('../utils/apiResponse');

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

module.exports = { register };