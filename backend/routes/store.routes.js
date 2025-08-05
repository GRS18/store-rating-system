const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, storeController.getAllStores);
router.post('/:id/rate', authenticateToken, storeController.submitRating);

module.exports = router;