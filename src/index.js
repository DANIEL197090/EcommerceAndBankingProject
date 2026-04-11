require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

// Connect to Database and start server
const startServer = async () => {
    await connectDB();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();
// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
