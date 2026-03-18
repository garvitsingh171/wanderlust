const {
    createListing,
    getAllListings,
    getListingById,
    updateListingById,
    deleteListingById,
} = require('../services/listing.service');
const { createListingSchema, updateListingSchema } = require('../validations/listing.validation');
const { apiResponse } = require('../utils/apiResponse');

function parseJsonField(value, fallback) {
    if (value === undefined || value === null) return fallback;
    if (typeof value !== 'string') return value;

    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

function buildUploadedImageUrls(req) {
    const files = req.files || [];
    return files.map((file) => `${req.protocol}://${req.get('host')}/uploads/listing-images/${file.filename}`);
}

async function createListingController(req, res, next) {
    try {
        const uploadedImageUrls = buildUploadedImageUrls(req);

        const rawPayload = {
            title: req.body.title,
            description: req.body.description,
            pricePerNight: Number(req.body.pricePerNight),
            location: parseJsonField(req.body.location, {}),
            amenities: parseJsonField(req.body.amenities, []),
            images: uploadedImageUrls.length > 0
                ? uploadedImageUrls
                : parseJsonField(req.body.images, []),
        };

        const { error, value } = createListingSchema.validate(rawPayload, {
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
        const listing = await getListingById(req.params.id);
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

async function updateListingController(req, res, next) {
    try {
        const uploadedImageUrls = buildUploadedImageUrls(req);
        const updates = {};

        if (req.body.title !== undefined) updates.title = req.body.title;
        if (req.body.description !== undefined) updates.description = req.body.description;
        if (req.body.pricePerNight !== undefined) updates.pricePerNight = Number(req.body.pricePerNight);

        if (req.body.location !== undefined) {
            updates.location = parseJsonField(req.body.location, {});
        }

        if (req.body.amenities !== undefined) {
            updates.amenities = parseJsonField(req.body.amenities, []);
        }

        if (uploadedImageUrls.length > 0) {
            updates.images = uploadedImageUrls;
        } else if (req.body.images !== undefined) {
            updates.images = parseJsonField(req.body.images, []);
        }

        const { error, value } = updateListingSchema.validate(updates, {
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

        const listing = await updateListingById(req.params.id, value);
        return res.status(200).json(apiResponse({
            success: true,
            message: 'Listing updated successfully',
            data: listing,
        }));
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

async function deleteListingController(req, res, next) {
    try {
        await deleteListingById(req.params.id);
        return res.status(200).json(apiResponse({
            success: true,
            message: 'Listing deleted successfully',
            data: null,
        }));
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

module.exports = {
    createListingController,
    getAllListingsController,
    getListingByIdController,
    updateListingController,
    deleteListingController,
};