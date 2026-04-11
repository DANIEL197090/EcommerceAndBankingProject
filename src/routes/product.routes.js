const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');

const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes (Requires Login)
router.use(protect);

// Restricted routes (Requires Admin)
router.post('/', authorize('admin'), upload.single('image'), createProduct);
router.put('/:id', authorize('admin'), upload.single('image'), updateProduct);
router.delete('/:id', authorize('admin'), deleteProduct);

module.exports = router;