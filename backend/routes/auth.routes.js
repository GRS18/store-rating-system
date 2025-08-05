const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


const registerValidation = [
  body('name').isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 characters'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('address').isLength({ max: 400 }).withMessage('Address too long'),
  body('password').matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be 8-16 chars, include uppercase and special char')
];


router.post('/register', registerValidation, authController.register);
router.post('/login', authController.login);

module.exports = router;