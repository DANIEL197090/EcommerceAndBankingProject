import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

// @desc    Generate random 10 digit account number
// @route   GET /api/wallet/generate-account
// @access  Private/Admin
export const generateAccountNumber = (req: Request, res: Response): void => {
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    res.status(200).json({ accountNumber });
};

// @desc    Fund a user wallet
// @route   POST /api/wallet/fund
// @access  Private/Admin
export const fundWallet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

// @desc    Get current user wallet balance
// @route   GET /api/wallet/balance
// @access  Private
export const getWalletBalance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized');
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        res.status(200).json({
            balance: user.wallet.balance
        });
    } catch (error) {
        next(error);
    }
};
