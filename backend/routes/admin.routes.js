const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authenticateToken = require('../middlewares/auth.middleware');

const { isAdmin } = adminController;

router.use(authenticateToken, isAdmin); 

router.get('/dashboard', adminController.getDashboardStats);
router.get('/users', adminController.getUsers);
router.get('/stores', adminController.getStores);
router.post('/user', adminController.addUser);
router.post('/store', adminController.addStore);

module.exports = router;