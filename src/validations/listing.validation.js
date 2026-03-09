const Joi = require('joi');

const createListingSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().trim(),
    description: Joi.string().min(10).max(1000).required().trim(),
    pricePerNight: Joi.number().min(0).required(),
    location: Joi.object({
        city: Joi.string().required().trim(),
        state: Joi.string().required().trim(),
        country: Joi.string().required().trim(),
    }).required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    amenties: Joi.array().items(Joi.string()).default([]),
    host: Joi.string().required(),
})

module.exports = { createListingSchema };