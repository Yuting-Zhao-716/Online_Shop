const Product = require('../models/product');


function getAllMaterialsPage(req,res){
    res.render('./productViews/all-materials');
}

async function getBrandsByMaterialPage(req,res,next){
    const material=req.params.material;
    try{
        const brands = await Product.findAllBrandsByMaterial(material);
        res.render('./productViews/all-brands',{brands:brands,material:material});
    }
    catch (e) {
        next(e);
    }
}

async function getModelsByBrandPage(req,res,next){
    const brand=req.params.brand;
    const material=req.params.material;
    let models;
    try{
        models = await Product.findAllModelsByBrandMaterial(brand, material);
    }catch (e) {
        next(e);
        return;
    }
    res.render('./productViews/all-models',{models:models,material:material});

}
async function getGenerationsByModelPage(req,res,next){
    const material=req.params.material;
    const model=req.params.model;
    let generations;
    try{
        generations = await Product.findAllGenerationsByModelMaterial(model, material);
    }catch (e) {
        next(e);
        return;
    }
    res.render('./productViews/all-generations',{generations:generations,material});

}
async function getPartsByGenerationPage(req,res,next){
    const material=req.params.material;
    const generation=req.params.generation;
    let products;
    try{
        products = await Product.findAllPartsByGenerationMaterial(generation, material);
    }catch (e) {
        next(e);
        return;
    }
    res.render('./productViews/all-products',{products:products});

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
async function getOthersPage(req,res,next){
    try{
        const products=await Product.findOthersProducts();

        res.render('./productViews/all-products',{products:products});
    }catch (e){
        next(e);
    }

}


module.exports={

    getProductDetailPage:getProductDetailPage,
    getModelsByBrandPage:getModelsByBrandPage,
    getGenerationsByModelPage:getGenerationsByModelPage,
    getPartsByGenerationPage:getPartsByGenerationPage,
    getAllMaterialsPage:getAllMaterialsPage,
    getBrandsByMaterialPage:getBrandsByMaterialPage,
    getOthersPage:getOthersPage
}