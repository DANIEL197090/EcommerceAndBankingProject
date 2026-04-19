import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.DB_URL) {
            throw new Error("DB_URL is not defined in .env file");
        }
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`❌ Database Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
