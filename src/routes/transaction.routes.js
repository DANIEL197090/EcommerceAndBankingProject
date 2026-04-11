const express = require('express');
const router = express.Router();
const { transferMoney, getTransactions } = require('../controllers/transaction.controller');
const { protect } = require('../middleware/auth.middleware');

// All transaction routes are protected
router.use(protect);

router.post('/transfer', transferMoney);
router.get('/', getTransactions);

module.exports = router;
