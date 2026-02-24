const express = require("express");
const mongoose = require("mongoose");

const app = express();

async function connectDB() {
    mongoose.connect("mongodb://localhost:27017/wanderlust");
}

connectDB()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
