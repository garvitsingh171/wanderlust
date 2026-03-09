const express = require('express');
const { requireAuth } = require('../middleware/auth.middleware');
const { requireListingOwner } = require('../middleware/listingOwner.middleware');
const {
	createListingController,
	getAllListingsController,
	getListingByIdController,
	updateListingController,
	deleteListingController,
} = require('../controllers/listing.controller');

const router = express.Router();

router.post('/', requireAuth ,createListingController);
router.get('/', getAllListingsController);
router.get('/:id', getListingByIdController);
router.patch('/:id', requireAuth, requireListingOwner, updateListingController);
router.delete('/:id', requireAuth, requireListingOwner, deleteListingController);

module.exports = router;