const Product = require('../models/product');
const Category = require('../models/category');

async function getBrandsPage(req,res,next){
    try{
        const brands = await Category.findAllBrands();
        res.render('./productViews/all-brands',{brands:brands});
    }
    catch (e) {
        next(e);
    }
}

async function getModelsByBrandPage(req,res,next){
    const brand=req.params.brand;
    let models;
    try{
        models=await Category.findModelByBrand(brand);
    }catch (e) {
        next(e);
        return;
    }
    res.render('./productViews/all-models',{models:models});

}
async function getGenerationsByModelPage(req,res,next){
    const model=req.params.model;
    let generations;
    try{
        generations=await Category.findGenerationByModel(model);
    }catch (e) {
        next(e);
        return;
    }
    res.render('./productViews/all-generations',{generations:generations});

}
async function getPartsByGenerationPage(req,res,next){
    const generation=req.params.generation;
    let products;
    try{
        products=await Product.findAllProductsByGeneration(generation);
    }catch (e) {
        next(e);
        return;
    }
    res.render('./productViews/all-products',{products:products});

}

async function getProductByCategoryPage(req,res,next){
    const category=req.params.category;
    try{
        const products = await Product.findAllProductsByCategory(category);
        res.render('./productViews/products-by-category',{products: products,category:category});
    }
    catch (e) {
        next(e);
    }
}

async function getProductDetailPage(req,res,next){
    const productId=req.params.id;
    try{
        const product=await Product.findOneProduct(productId);
        res.render('./productViews/product-details',{product:product});
    }catch (e) {
        next(e);
    }
}



module.exports={
    getBrandsPage:getBrandsPage,
    getProductDetailPage:getProductDetailPage,
    getProductByCategoryPage:getProductByCategoryPage,
    getModelsByBrandPage:getModelsByBrandPage,
    getGenerationsByModelPage:getGenerationsByModelPage,
    getPartsByGenerationPage:getPartsByGenerationPage,
}