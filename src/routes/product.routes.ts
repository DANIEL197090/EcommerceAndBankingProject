import express from 'express';
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import upload from '../middleware/upload.middleware';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes (Requires Login)
router.use(protect);

// Restricted routes (Requires Admin)
router.post('/', authorize('admin'), upload.single('image'), createProduct);
router.put('/:id', authorize('admin'), upload.single('image'), updateProduct);
router.delete('/:id', authorize('admin'), deleteProduct);

export default router;
