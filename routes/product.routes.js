const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/products', productController.getProductsPage);

router.get('/products/category/:category',productController.getProductByCategoryPage);

router.get('/products/:id',productController.getProductDetailPage);

module.exports=router;