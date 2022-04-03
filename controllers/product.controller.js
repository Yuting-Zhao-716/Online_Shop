const Product = require('../models/product');

async function getProductsPage(req,res,next){
    try{
        const categories = await Product.findAllCategory();
        res.render('./productViews/all-products',{categories:categories});
    }
    catch (e) {
        next(e);
    }
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
    getProductsPage:getProductsPage,
    getProductDetailPage:getProductDetailPage,
    getProductByCategoryPage:getProductByCategoryPage,
}