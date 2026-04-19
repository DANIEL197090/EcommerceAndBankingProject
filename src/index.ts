import 'dotenv/config';
import connectDB from './config/db';
import app from './app';

// Connect to Database and start server
const startServer = async () => {
    await connectDB();
    
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', (err: any) => {
        console.log('UNHANDLED REJECTION! 💥 Shutting down...');
        console.log(err.name, err.message);
        server.close(() => {
            process.exit(1);
        });
    });
};

startServer();
