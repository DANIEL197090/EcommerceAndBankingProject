const mongoose = require('mongoose');
const User = require('./src/models/user.model');
require('dotenv').config();

const testFund = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to DB');
        
        const userId = "69d6188e2379771a4ee9edd9"; // John Ikenna
        const user = await User.findById(userId);
        
        if (!user) {
            console.log('User not found');
            return;
        }
        
        console.log('Current balance:', user.wallet.balance);
        user.wallet.balance += 100;
        
        console.log('Saving user...');
        await user.save();
        console.log('Save successful. New balance:', user.wallet.balance);
        
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error occurred:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
};

testFund();
