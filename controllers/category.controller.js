const Category = require('../models/category');

async function getCategoryManagementPage(req, res, next) {
    let categoryList;
    try {
        categoryList = await Category.findAllRecords();
        console.log(categoryList);
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
        console.log(newCategory);
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

module.exports = {
    getCategoryManagementPage: getCategoryManagementPage,
    getNewCategoryPage: getNewCategoryPage,
    postNewCategory:postNewCategory,
    deleteCategory:deleteCategory
}