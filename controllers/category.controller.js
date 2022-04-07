const Category = require('../models/category');
const {getGenerationsByModelPage} = require("./product.controller");

async function getCategoryManagementPage(req, res, next) {
    let categoryList;
    try {
        categoryList = await Category.findAllRecords();
    } catch (e) {
        next(e);
        return;
    }
    res.render('./categoryViews/all-category', {categoryList: categoryList});
}

function getNewCategoryPage(req, res, next) {
    res.render('./categoryViews/new-category');
}

async function postNewCategory(req,res,next){
    try{
        const newCategory = new Category(req.body.brand, req.body.model, req.body.generation);
        await newCategory.save();
    }
    catch (e) {
        next(e);
        return;
    }
    res.redirect('/category-management');
}

async function deleteCategory(req,res,next){
    try{
        await Category.delete(req.body.categoryId);
    }catch (e) {
        next(e);
        return;
    }
    res.json({
        message:'category deleted'
    })
}

async function findModelByBrand(req,res,next){
    let results;
    try{
        results = await Category.findModelByBrand(req.params.brand);
    }catch (e) {
        next(e);
        return;
    }
    res.json({
        message:'models found.',
        models:results
    });
}
async function findGenerationByModel(req,res,next){
    let results;
    try{
        results = await Category.findGenerationByModel(req.params.model);
    }catch (e) {
        next(e);
        return;
    }
    res.json({
        message:'models found.',
        generations:results
    });
}

module.exports = {
    getCategoryManagementPage: getCategoryManagementPage,
    getNewCategoryPage: getNewCategoryPage,
    postNewCategory:postNewCategory,
    deleteCategory:deleteCategory,
    findModelByBrand:findModelByBrand,
    findGenerationByModel:findGenerationByModel
}