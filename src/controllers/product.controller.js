const Product = require('../models/product.model');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
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
const getProduct = async (req, res, next) => {
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
const createProduct = async (req, res, next) => {
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
const updateProduct = async (req, res, next) => {
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
const deleteProduct = async (req, res, next) => {
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

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
};