const Listing = require('../models/listing.model');

async function createListing(listingData) {
    const newListing = await Listing.create(listingData);
    return newListing;
}

async function getAllListings() {
    return (await Listing.find()).sort({ createdAt: -1 }).populate('host', 'username email');
}

async function getListingById(listingId) {
    const listing = await Listing.findById(listingId).populate('host', 'username email');

    if (!listing) {
        const error = new Error('Listing not found');
        error.statusCode = 404;
        throw error;
    }

    return listing;
}

async function updateListingById(listingId, updates) {
    const listing = await Listing.findByIdAndUpdate(listingId, updates, {
        new: true,
        runValidators: true,
    }).populate('host', 'username email');

    if (!listing) {
        const error = new Error('Listing not found');
        error.statusCode = 404;
        throw error;
    }

    return listing;
}

async function deleteListingById(listingId) {
    const listing = await Listing.findByIdAndDelete(listingId);

    if (!listing) {
        const error = new Error('Listing not found');
        error.statusCode = 404;
        throw error;
    }

    return listing;
}

module.exports = {
    createListing,
    getAllListings,
    getListingById,
    updateListingById,
    deleteListingById,
};