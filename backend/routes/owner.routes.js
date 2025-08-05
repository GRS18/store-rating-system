const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth.middleware');
const ownerController = require('../controllers/owner.controller');

router.get('/dashboard', authenticateToken, ownerController.getDashboard);

module.exports = router;