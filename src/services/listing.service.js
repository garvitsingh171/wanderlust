const Listing = require('../models/listing.model');

async function createListing(listingData) {
    const newListing = await Listing.create(listingData);
    return newListing;
}

async function getAllListings() {
    return (await Listing.find()).sort({ createdAt: -1 }).populate('host', 'username email');
}

async function getListingsById(listingId) {
    const listing = await Listing.findById(listingId).populate('host', 'username email');

    if (!listing) {
        const error = new Error('Listing not found');
        error.statusCode = 404;
        throw error;
    }

    return listing;
}

module.exports = { createListing, getAllListings, getListingsById };