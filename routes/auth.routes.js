const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/signup', authController.getSignupPage);

router.post('/signup', authController.postSignupPage);

module.exports=router;