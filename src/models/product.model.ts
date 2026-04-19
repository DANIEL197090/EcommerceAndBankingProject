import mongoose, { Document, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    quantity: number;
    price: number;
    image?: string;
}

const productSchema = new mongoose.Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
);

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);
export default Product;
