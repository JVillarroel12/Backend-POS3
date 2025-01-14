const express = require('express');
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator')

const router = express.Router();

router.post(
    '/login', 
    [body('user').notEmpty().isString(), body('password').notEmpty().isString()], 
    authController.login
);

router.post('/register', [body('user').notEmpty().isString(),body('password').notEmpty().isString()], authController.createUser);
  
module.exports = router;