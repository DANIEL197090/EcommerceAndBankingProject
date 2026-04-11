const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        reference: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'completed'
        },
        type: {
            type: String,
            enum: ['transfer', 'deposit', 'withdrawal'],
            default: 'transfer'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);
