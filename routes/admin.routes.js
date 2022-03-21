const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware= require('../utility/image-upload');

router.get('/product-management', adminController.getProductManagementPage);

router.get('/product-management/new', adminController.getNewProductPage);

router.post('/product-management/new',imageUploadMiddleware ,adminController.postNewProduct);

router.get('/update-product/:id', adminController.getUpdateProductPage);

router.post('/update-product/:id',imageUploadMiddleware , adminController.postUpdatePage);

router.delete('/delete-product/:id', adminController.deleteProduct);

module.exports=router;