import express from 'express';
import {
  getExternalProducts,
  getExternalProduct,
  createExternalProduct,
  updateExternalProduct,
  deleteExternalProduct
} from '../controllers/external-product.controller';

const router = express.Router();

router.get('/', getExternalProducts);
router.get('/:id', getExternalProduct);
router.post('/', createExternalProduct);
router.put('/:id', updateExternalProduct);
router.delete('/:id', deleteExternalProduct);

export default router;
