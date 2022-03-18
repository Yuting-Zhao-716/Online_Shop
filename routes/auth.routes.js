const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/signup', authController.getSignupPage);

router.post('/signup', authController.postSignupPage);

router.get('/login', authController.getLoginPage);

router.post('/login', authController.postLoginPage);

router.post('/logout', authController.postLogout);

module.exports=router;