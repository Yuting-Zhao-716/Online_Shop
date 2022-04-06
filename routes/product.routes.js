const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/products', productController.getBrandsPage);

router.get('/products/category/:category',productController.getProductByCategoryPage);

router.get('/products/:brand/models', productController.getModelsByBrandPage);

router.get('/products/:model/generations', productController.getGenerationsByModelPage);

router.get('/products/:generation/parts', productController.getPartsByGenerationPage);

router.get('/products/:id',productController.getProductDetailPage);

module.exports=router;