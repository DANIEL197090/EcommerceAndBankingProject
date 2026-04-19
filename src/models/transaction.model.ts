import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITransaction extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    amount: number;
    reference: string;
    description?: string;
    status: 'pending' | 'completed' | 'failed';
    type: 'transfer' | 'deposit' | 'withdrawal';
}

const transactionSchema = new Schema<ITransaction>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
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

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', transactionSchema);
export default Transaction;
