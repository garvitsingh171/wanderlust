const express = require('express');
const { createListingController } = require('../controllers/listing.controller');

const router = express.Router();

router.post('/listings', createListingController);
router.get('/listings', "");
router.get('/listings/:id', "");
router.patch('/listings/:id', "");
router.delete('/listings/:id', "");

module.exports = router;