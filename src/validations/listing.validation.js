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
    amenities: Joi.array().items(Joi.string()).default([]),
});

const updateListingSchema = Joi.object({
    title: Joi.string().min(3).max(100).trim(),
    description: Joi.string().min(10).max(1000).trim(),
    pricePerNight: Joi.number().min(0),
    location: Joi.object({
        city: Joi.string().trim(),
        state: Joi.string().trim(),
        country: Joi.string().trim(),
    }),
    images: Joi.array().items(Joi.string().uri()).min(1),
    amenities: Joi.array().items(Joi.string()),
}).min(1);

module.exports = { createListingSchema, updateListingSchema };