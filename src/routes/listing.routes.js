const express = require('express');
const { requireAuth } = require('../middleware/auth.middleware');
const { createListingController } = require('../controllers/listing.controller');

const router = express.Router();

router.post('/', requireAuth ,createListingController);
// router.get('/listings', "");
// router.get('/listings/:id', "");
// router.patch('/listings/:id', "");
// router.delete('/listings/:id', "");

module.exports = router;