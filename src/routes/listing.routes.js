const express = require('express');
const { requireAuth } = require('../middleware/auth.middleware');
const { createListingController, getAllListingsController, getListingByIdController } = require('../controllers/listing.controller');

const router = express.Router();

router.post('/', requireAuth ,createListingController);
router.get('/', getAllListingsController);
router.get('/:id', getListingByIdController);
// router.patch('/listings/:id', "");
// router.delete('/listings/:id', "");

module.exports = router;