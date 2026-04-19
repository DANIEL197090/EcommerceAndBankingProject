import { Request, Response, NextFunction } from 'express';
import Product from '../models/product.model';
import { uploadToCloudinary } from '../utils/cloudinary';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            res.status(404);
            throw new Error(`Product not found with id of ${id}`);
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let productData = { ...req.body };

        // Handle image upload if file is present
        if (req.file) {
            const cloudinaryRes = await uploadToCloudinary(req.file.path, 'products');
            if (cloudinaryRes) {
                productData.image = cloudinaryRes.secure_url;
            }
        }

        const product = await Product.create(productData);
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };

        // Handle image upload if file is present
        if (req.file) {
            const cloudinaryRes = await uploadToCloudinary(req.file.path, 'products');
            if (cloudinaryRes) {
                updateData.image = cloudinaryRes.secure_url;
            }
        }

        const product = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!product) {
            res.status(404);
            throw new Error(`Product not found with id of ${id}`);
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404);
            throw new Error(`Product not found with id of ${id}`);
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });
    } catch (error) {
        next(error);
    }
};
