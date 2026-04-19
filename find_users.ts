import mongoose from 'mongoose';
import User from './src/models/user.model';
import 'dotenv/config';

const findUsers = async () => {
    try {
        if (!process.env.DB_URL) throw new Error('DB_URL not defined');
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to DB');
        
        const users = await User.find({}, '_id name email role wallet');
        console.log(JSON.stringify(users, null, 2));
        
        await mongoose.connection.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

findUsers();
