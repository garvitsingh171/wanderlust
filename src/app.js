const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth.routes');
const listingRoutes = require('./routes/listing.routes');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to Wanderlust');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        ok: true,
        message: "Server is healthy",
        service: 'wanderlust-api',
        timestamp: new Date().toISOString(),
    });
});

app.use('/uploads/listing-images', express.static(path.join(process.cwd(), 'uploads/listing-images')));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/listings', listingRoutes);

app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

module.exports = app;