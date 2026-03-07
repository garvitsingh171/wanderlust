const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/wanderlust");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

connectToDB();

module.exports = { connectToDB };