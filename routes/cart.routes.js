const express = require('express');
const router= express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/', cartController.getCartPage);

router.post('/items',cartController.addItem);

router.patch('/items', cartController.updateCartItem);

module.exports=router;