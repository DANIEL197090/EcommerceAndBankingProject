import express from 'express';
import { generateAccountNumber, fundWallet, getWalletBalance } from '../controllers/wallet.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = express.Router();

router.get('/balance', protect, getWalletBalance);
router.get('/generate-account', protect, authorize('admin'), generateAccountNumber);
router.post('/fund', protect, authorize('admin'), fundWallet);

export default router;
