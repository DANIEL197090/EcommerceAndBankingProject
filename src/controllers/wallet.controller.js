const User = require('../models/user.model');

// @desc    Generate random 10 digit account number
// @route   GET /api/wallet/generate-account
// @access  Private/Admin
const generateAccountNumber = (req, res) => {
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    res.status(200).json({ accountNumber });
};

// @desc    Fund a user wallet
// @route   POST /api/wallet/fund
// @access  Private/Admin
const fundWallet = async (req, res, next) => {
    try {
        const { userId, accountNumber, amount } = req.body;

        if ((!userId && !accountNumber) || !amount) {
            res.status(400);
            throw new Error('Please provide userId or accountNumber, and amount');
        }

        let user;
        if (userId) {
            user = await User.findById(userId);
        } else {
            user = await User.findOne({ 'wallet.accountNumber': accountNumber });
        }

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        if (user.role === 'admin') {
            res.status(400);
            throw new Error('Admin cannot have a wallet funded');
        }

        user.wallet.balance += Number(amount);
        await user.save();

        res.status(200).json({
            message: 'Wallet funded successfully',
            balance: user.wallet.balance
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    generateAccountNumber,
    fundWallet
};
