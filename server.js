const app = require('./src/app');
require('dotenv').config();

const { connectToDB } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server", error);
    }
}

startServer();
