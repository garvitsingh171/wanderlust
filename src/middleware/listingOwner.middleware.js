const mongoose = require('mongoose');
const Listing = require('../models/listing.model');

async function requireListingOwner(req, res, next) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('Invalid listing id');
            error.statusCode = 400;
            throw error;
        }

        const listing = await Listing.findById(id);

        if (!listing) {
            const error = new Error('Listing not found');
            error.statusCode = 404;
            throw error;
        }

        if (String(listing.host) !== req.user.userId) {
            const error = new Error('Forbidden: You are not the owner of this listing');
            error.statusCode = 403;
            throw error;
        }

        req.listing = listing;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { requireListingOwner };
