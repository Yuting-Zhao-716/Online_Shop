const Product = require('../models/product');

async function getProductsPage(req,res,next){
    try{
        const products = await Product.findAllProducts();
        res.render('./productViews/all-products',{products: products});
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
    console.log('Hi there!');
    const productId=req.params.id;
    console.log(productId);
    try{
        const product=await Product.findOneProduct(productId);
        console.log(product);
  /*      res.render('./baseViews/index');*/
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