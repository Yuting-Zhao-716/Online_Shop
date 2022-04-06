const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.get('/category-management', categoryController.getCategoryManagementPage);

router.get('/category-management/new', categoryController.getNewCategoryPage);

router.post('/category-management/new', categoryController.postNewCategory);

router.post('/category-management', categoryController.deleteCategory);

module.exports=router;