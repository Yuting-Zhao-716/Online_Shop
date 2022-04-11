const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/products', productController.getAllMaterialsPage);

router.get('/products/others', productController.getOthersPage);

router.get('/products/:material/brands', productController.getBrandsByMaterialPage);

router.get('/products/:material/:brand/models', productController.getModelsByBrandPage);

router.get('/products/:material/:model/generations', productController.getGenerationsByModelPage);

router.get('/products/:material/:generation/parts', productController.getPartsByGenerationPage);

router.get('/products/:id',productController.getProductDetailPage);



module.exports=router;