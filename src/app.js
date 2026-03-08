const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
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

app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

module.exports = app;