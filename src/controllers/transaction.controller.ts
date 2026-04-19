import { Request, Response, NextFunction } from 'express';
import Transaction from '../models/transaction.model';
import User from '../models/user.model';
import mongoose from 'mongoose';

// @desc    Transfer money to another user
// @route   POST /api/transactions/transfer
// @access  Private
export const transferMoney = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { recipientAccountNumber, amount, description } = req.body;

        if (!recipientAccountNumber || !amount) {
            res.status(400);
            throw new Error('Please provide recipient account number and amount');
        }

        if (amount <= 0) {
            res.status(400);
            throw new Error('Transfer amount must be greater than zero');
        }

        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized');
        }

        // 1. Check if sender exists and has enough balance
        const sender = await User.findById(req.user.id).session(session);
        if (!sender) {
            res.status(404);
            throw new Error('Sender not found');
        }

        if (sender.wallet.balance < amount) {
            res.status(400);
            throw new Error('Insufficient balance');
        }

        // 2. Check if recipient exists
        const recipient = await User.findOne({ 'wallet.accountNumber': recipientAccountNumber }).session(session);
        if (!recipient) {
            res.status(404);
            throw new Error('Recipient account number not found');
        }

        if (sender.id.toString() === recipient.id.toString()) {
            res.status(400);
            throw new Error('You cannot transfer money to yourself');
        }

        // 3. Perform the transfer
        sender.wallet.balance -= Number(amount);
        recipient.wallet.balance += Number(amount);

        await sender.save({ session });
        await recipient.save({ session });

        // 4. Create transaction record
        const reference = `TRF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const transactions = await Transaction.create([
            {
                sender: sender._id,
                receiver: recipient._id,
                amount: Number(amount),
                description: description || 'Transfer',
                reference,
                type: 'transfer',
                status: 'completed'
            }
        ], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: 'Transfer successful',
            transaction: transactions[0],
            newBalance: sender.wallet.balance
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

// @desc    Get user transactions (debit and credit)
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized');
        }

        const transactions = await Transaction.find({
            $or: [
                { sender: req.user.id },
                { receiver: req.user.id }
            ]
        })
        .populate('sender', 'name email wallet.accountNumber')
        .populate('receiver', 'name email wallet.accountNumber')
        .sort({ createdAt: -1 });

        // Enhance the response to clarify debit/credit from the user's perspective
        const enhancedTransactions = transactions.map((tx: any) => {
            const isDebit = tx.sender._id.toString() === (req.user as any).id.toString();
            return {
                ...tx.toObject(),
                transactionType: isDebit ? 'debit' : 'credit'
            };
        });

        res.status(200).json(enhancedTransactions);
    } catch (error) {
        next(error);
    }
};
