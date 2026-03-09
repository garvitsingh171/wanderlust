const { createListing, getAllListings, getListingsById } = require('../services/listing.service');
const { createListingSchema } = require('../validations/listing.validation');
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
            validationError.statusCode = 400;
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
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

async function getAllListingsController(req, res, next) {
    try {
        const listings = await getAllListings();
        return res.status(200).json(apiResponse({
            success: true,
            message: 'Listings retrieved successfully',
            data: listings,
        }));
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

async function getListingByIdController(req, res, next) {
    try {
        const listing = await getListingsById(req.params.id);
        return res.status(200).json(apiResponse({
            success: true,
            message: 'Listing retrieved successfully',
            data: listing,
        }));
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

module.exports = { createListingController, getAllListingsController, getListingByIdController };