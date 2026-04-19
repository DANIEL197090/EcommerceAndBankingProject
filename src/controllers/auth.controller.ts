import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import mongoose from 'mongoose';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Create user data
        const userData: any = {
            name,
            email,
            password,
            role: role || 'user'
        };

        // Initialize wallet for non-admin users
        if (userData.role === 'user') {
            userData.wallet = {
                balance: 0,
                accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString()
            };
        }

        // Create user
        const user = await User.create(userData);

        if (user) {
            const response: any = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id as mongoose.Types.ObjectId)
            };

            if (user.role === 'user') {
                response.wallet = user.wallet;
            }

            res.status(201).json(response);
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            const response: any = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id as mongoose.Types.ObjectId)
            };

            if (user.role === 'user') {
                response.wallet = user.wallet;
            }

            res.json(response);
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// Generate JWT
const generateToken = (id: mongoose.Types.ObjectId): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};
