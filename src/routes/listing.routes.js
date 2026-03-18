const express = require('express');
const { requireAuth } = require('../middleware/auth.middleware');
const { requireListingOwner } = require('../middleware/listingOwner.middleware');
const { uploadListingImages } = require('../middleware/upload.middleware');
const {
	createListingController,
	getAllListingsController,
	getListingByIdController,
	updateListingController,
	deleteListingController,
} = require('../controllers/listing.controller');

const router = express.Router();

router.post('/', requireAuth, uploadListingImages.array('images', 5), createListingController);
router.get('/', getAllListingsController);
router.get('/:id', getListingByIdController);
router.patch('/:id', requireAuth, requireListingOwner, uploadListingImages.array('images', 5), updateListingController);
router.delete('/:id', requireAuth, requireListingOwner, deleteListingController);

module.exports = router;