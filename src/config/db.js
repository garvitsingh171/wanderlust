const mongoose = require('mongoose');

async function connectToDB() {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
}

module.exports = { connectToDB };