const Listing = require('../models/listing.model');

async function createListing(listingData) {
    const newListing = await Listing.create(listingData);
    return newListing;
}

module.exports = { createListing };