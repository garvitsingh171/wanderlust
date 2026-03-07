const app = require('./src/app');
const { connectToDB } = require('./src/config/db');

async function startServer() {
    try {
        await connectToDB();
        app.listen(3000, () => {
            console.log("Server is running at http://localhost:3000");
        });
    } catch (error) {
        console.error("Failed to start server", error);
    }
}

startServer();
