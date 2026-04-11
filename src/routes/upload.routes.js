const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/upload.controller');
const upload = require('../middleware/upload.middleware');
const { protect } = require('../middleware/auth.middleware');

// Protect the endpoint (optional, but professional)
router.use(protect);

// Upload endpoint
// Field name for form-data: 'image'
router.post('/', upload.single('image'), uploadImage);

module.exports = router;
