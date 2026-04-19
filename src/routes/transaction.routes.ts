import express from 'express';
import { transferMoney, getTransactions } from '../controllers/transaction.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// All transaction routes are protected
router.use(protect);

router.post('/transfer', transferMoney);
router.get('/', getTransactions);

export default router;
