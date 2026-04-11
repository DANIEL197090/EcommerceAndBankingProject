const express = require('express');
const router = express.Router();
const { generateAccountNumber, fundWallet } = require('../controllers/wallet.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.get('/generate-account', protect, authorize('admin'), generateAccountNumber);
router.post('/fund', protect, authorize('admin'), fundWallet);

module.exports = router;
