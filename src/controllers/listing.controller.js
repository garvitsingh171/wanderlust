const { createListing } = require('../services/listing.service');
const { createListingSchema } = require('../validation/listing.validation');
const { apiResponse } = require('../utils/apiResponse');

async function createListingController(req, res, next) {
    try {
        const { error, value } = createListingSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const validationError = new Error(
                error.details.map((d) => d.message).join(', ')
            );
            return next(validationError);
        }

        const newListing = await createListing({
            ...value,
            host: req.user.userId,
        });

        return res.status(201).json(apiResponse({
            success: true,
            message: 'Listing created successfully',
            data: newListing,
        }));
    } catch (error) {
        next(error);
    }
}

module.exports = { createListingController };